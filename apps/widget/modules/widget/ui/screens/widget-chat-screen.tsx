"use client";
import React, { useEffect, useRef } from "react";
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
  AIMessageAvatar,
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
import { InfiniteScrollTrigger } from "@workspace/ui/components/infinite-scroll-trigger";
import { useInfiniteScroll } from "@workspace/ui/hooks/use-infinite-scroll";
const MessageSchema = z.object({
  content: z
    .string()
    .min(1, "Message cannot be empty")
    .max(500, "Message too long"),
});
import AvatarImage from "../../../assets/avatar.png";
import ChatbotImage from "../../../assets/chatbot.png";
type MessageForm = z.infer<typeof MessageSchema>;

const WidgetChatScreen = () => {
  const { organizationId } = useWidgetStore();
  const { conversationId } = useConversationStore();
  const { getSession } = useContactSessionStore();
  const contactSessionId = getSession(organizationId!);

  const messagesContainerRef = useRef<HTMLDivElement>(null);

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

  const { topElementRef, handleLoadMore, canLoadMore, isLoadingMore } =
    useInfiniteScroll({
      loadMore: messages.loadMore,
      loadSize: 10,
      status: messages.status,
    });

  const form = useForm<MessageForm>({
    resolver: zodResolver(MessageSchema),
    defaultValues: { content: "" },
  });

  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop =
        messagesContainerRef.current.scrollHeight;
    }
  }, [messages.results]);

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
    <AIConversation id="widget-chat">
      <AIConversationContent id="chat-messages">
        <InfiniteScrollTrigger
          canLoadMore={canLoadMore}
          onLoadMore={handleLoadMore}
          isLoadingMore={isLoadingMore}
          ref={topElementRef}
        />
        {toUIMessages(messages.results ?? []).map((msg) => (
          <AIMessage
            id={`msg-${msg.id}`}
            from={msg.role === "user" ? "user" : "assistant"}
            key={msg.id}
          >
            <AIMessageContent id={`msg-content-${msg.id}`}>
              {msg.text}
            </AIMessageContent>
            {msg.role === "assistant" ? (
              <AIMessageAvatar src={ChatbotImage.src ?? ChatbotImage} />
            ) : (
              <AIMessageAvatar src={AvatarImage.src ?? AvatarImage} />
            )}
          </AIMessage>
        ))}
      </AIConversationContent>
      <Form {...form}>
        <AIInput
          id="chat-input"
          onSubmit={form.handleSubmit(onSubmit)}
          className=" w-[99%]  flex my-4 shadow-2xl rounded-xl mx-auto"
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
                    form.reset();
                  }
                }}
              />
            )}
          />
          <AIInputToolbar id="chat-toolbar">
            <AIInputSubmit
              id="chat-submit"
              disabled={
                conversation?.status === "resolved" || !form.formState.isValid
              }
              type="submit"
              className="bg-primary"
            />
            <AIInputTools id="chat-tools" />
          </AIInputToolbar>
        </AIInput>
      </Form>
    </AIConversation>
  );
};

export default WidgetChatScreen;
