"use client";
import React from "react";
import {
  AIConversation,
  AIConversationContent,
} from "@workspace/ui/ai/conversation";
import {
  AIInput,
  AIInputSubmit,
  AIInputTextarea,
  AIInputToolbar,
  AIInputTools,
} from "@workspace/ui/ai/input";
import {
  AIMessage,
  AIMessageContent,
} from "@workspace/ui/ai/message";
import { useWidgetStore } from "@/store/use-widget-store";
import { useConversationStore } from "@/store/use-conversation";
import { useContactSessionStore } from "@/store/use-session-store";
import { useQuery, useAction } from "convex/react";
import { api } from "@workspace/server/_generated/api";
import { toUIMessages, useThreadMessages } from "@convex-dev/agent/react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormField } from "@workspace/ui/components/form";

const MessageSchema = z.object({
  content: z
    .string()
    .min(1, "Message cannot be empty")
    .max(500, "Message too long"),
});

type MessageForm = z.infer<typeof MessageSchema>;

const WidgetChatScreen = () => {
  const { organizationId } = useWidgetStore();
  const { conversationId } = useConversationStore();
  const { getSession } = useContactSessionStore();
  const contactSessionId = getSession(organizationId!);

  const conversation = useQuery(
    api.public.conversation.getOne,
    conversationId && contactSessionId
      ? { conversationId, contactSessionId }
      : "skip"
  );

  const messages = useThreadMessages(
    api.public.messages.getMany,
    conversation?.threadId && contactSessionId
      ? { threadId: conversation.threadId, contactSessionId }
      : "skip",
    { initialNumItems: 10 }
  );

  const form = useForm<MessageForm>({
    resolver: zodResolver(MessageSchema),
    defaultValues: { content: "" },
  });

  const createMessage = useAction(api.public.messages.create);

  const onSubmit = async (values: MessageForm) => {
    if (!conversation || !contactSessionId) return;

    await createMessage({
      contactSessionId,
      prompt: values.content,
      threadId: conversation.threadId,
    });

    form.reset();
  };

  return (
   <div className="p-6">
     <AIConversation id="widget-chat">
      <AIConversationContent id="chat-messages">
        {toUIMessages(messages.results ?? []).map((msg) => (
          <AIMessage
            id={`msg-${msg.id}`}
            from={msg.role === "user" ? "user" : "assistant"}
            key={msg.id}
          >
            <AIMessageContent id={`msg-content-${msg.id}`}>
              {msg.text}
            </AIMessageContent>
          </AIMessage>
        ))}
      </AIConversationContent>
      <Form {...form}>
        <AIInput
          id="chat-input"
          onSubmit={form.handleSubmit(onSubmit)}
          className="rounded-none border-x-0 border-b-0"
        >
          <FormField
            control={form.control}
            name="content"
            disabled={conversation?.status === "resolved"}
            render={({ field }) => (
              <AIInputTextarea
                id="chat-textarea"
                {...field}
                disabled={conversation?.status === "resolved"}
                placeholder={
                  conversation?.status === "resolved"
                    ? "Conversation resolved"
                    : "Type a message..."
                }
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    form.handleSubmit(onSubmit)();
                  }
                }}
              />
            )}
          />
          <AIInputToolbar id="chat-toolbar">
            <AIInputTools id="chat-tools" />
            <AIInputSubmit
              id="chat-submit"
              disabled={
                conversation?.status === "resolved" || !form.formState.isValid
              }
              type="submit"
            />
          </AIInputToolbar>
        </AIInput>
      </Form>
    </AIConversation>
   </div>
  );
};

export default WidgetChatScreen;
