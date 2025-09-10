"use client";
import React, { useEffect, useRef } from "react";
import { Id } from "@workspace/server/_generated/dataModel";
import { useMutation, useQuery } from "convex/react";
import { api } from "@workspace/server/_generated/api";
import { Button } from "@workspace/ui/components/button";
import { MoreHorizontal } from "lucide-react";
import {
  AIConversation,
  AIConversationContent,
  AIConversationContentProps,
  AIConversationProps,
  AIConversationScrollButton,
} from "@workspace/ui/ai/conversation";
import {
  AIInput,
  AIInputButton,
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
import { Form, FormField } from "@workspace/ui/components/form";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toUIMessages, useThreadMessages } from "@convex-dev/agent/react";
import { useInfiniteScroll } from "@workspace/ui/hooks/use-infinite-scroll";
import { InfiniteScrollTrigger } from "@workspace/ui/components/infinite-scroll-trigger";
const formSchema = z.object({
  message: z.string().min(1, "Message is required"),
});
type FormValues = z.infer<typeof formSchema>;

const ConversationIdView = ({
  conversationId,
}: {
  conversationId: Id<"conversations">;
}) => {
  const conversation = useQuery(api.private.conversation.getOne, {
    conversationId,
  });

  const createMessage = useMutation(api.private.messages.create);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      message: "",
    },
  });

  const messages = useThreadMessages(
    api.private.messages.getMany,
    conversation?.threadId ? { threadId: conversation.threadId } : "skip",
    { initialNumItems: 10 }
  );

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages.results]);

  const { topElementRef, handleLoadMore, canLoadMore, isLoadingMore } =
    useInfiniteScroll({
      loadMore: messages.loadMore,
      loadSize: 10,
      status: messages.status,
    });

  const onSubmit = async () => {
    form.reset();
  };

  return (
    <div className="flex h-full w-full flex-col bg-muted">
      <header className="flex items-center justify-between border-b bg-background p-2.5">
        <Button size={"sm"} variant={"ghost"}>
          <MoreHorizontal />
        </Button>
      </header>
      <AIConversation className="max-h-[calc(100vh)] px-10">
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
              from={msg.role === "user" ? "assistant" : "user"}
              key={msg.id}
            >
              <AIMessageContent id={`msg-content-${msg.id}`}>
                {msg.text}
              </AIMessageContent>
              {msg.role === "user" ? (
                <AIMessageAvatar
                  src={"./avatar.png"}
                  name={conversation?.name}
                />
              ) : (
                <AIMessageAvatar src={"./logo.png"} />
              )}
            </AIMessage>
          ))}
          <div ref={messagesEndRef} />
        </AIConversationContent>
        <Form {...form}>
          <AIInput
            id="chat-input"
            onSubmit={form.handleSubmit(onSubmit)}
            className=" w-[99%]  flex my-4 shadow-2xl rounded-xl mx-auto"
          >
            <FormField
              control={form.control}
              name="message"
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
    </div>
  );
};

export default ConversationIdView;
