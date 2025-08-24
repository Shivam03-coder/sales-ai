"use client";
import { useConversationStore } from "@/store/use-conversation";
import { useContactSessionStore } from "@/store/use-session-store";
import { useWidgetStore } from "@/store/use-widget-store";
import { api } from "@workspace/server/_generated/api";
import { Button } from "@workspace/ui/components/button";
import { usePaginatedQuery } from "convex/react";
import { formatDistanceToNow } from "date-fns";
import { MessageSquareIcon } from "lucide-react";
import ConversationStatusIcon from "@workspace/ui/components/conversation-status-icon";

const WidgetInboxScreen = () => {
  const { organizationId, setScreen } = useWidgetStore();
  const { getSession } = useContactSessionStore();
  const contactSessionId = getSession(organizationId || "");
  const { setConversationId } = useConversationStore();
  const conversations = usePaginatedQuery(
    api.public.conversation.getMany,
    contactSessionId ? { contactSessionId } : "skip",
    { initialNumItems: 10 }
  );

  return (
    <main className="flex flex-1 flex-col gap-y-4 p-4 overflow-y-auto">
      {conversations.results.length > 0 &&
        conversations.results.map((conversation) => (
          <Button
            className="h-20 w-full border-0 shadow-primary justify-between"
            key={conversation._id}
            onClick={() => {
              setConversationId(conversation._id);
              setScreen("chat");
            }}
            variant="outline"
          >
            <div className="flex w-full flex-col gap-4 overflow-hidden text-start">
              <div className="flex w-full items-center justify-between gap-x-2">
                <p className=" text-primary inline-flex items-center gap-x-2 text-xs">
                  <MessageSquareIcon className="text-primary" />
                  Chat
                </p>
                <p className="text-muted-foreground capitalize text-xs">
                  {formatDistanceToNow(conversation._creationTime)}
                </p>
              </div>
              <div className="w-full items-center flex justify-between gap-x-2">
                <p className="truncate text-sm">
                  {conversation.lastMessage?.text}
                </p>
                <ConversationStatusIcon status={conversation.status} />
              </div>
            </div>
          </Button>
        ))}
    </main>
  );
};

export default WidgetInboxScreen;
