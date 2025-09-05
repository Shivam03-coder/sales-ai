"use client";
import getCountryFromTimezone from "@/utils/get-countryfrom-timezone";
import { api } from "@workspace/server/_generated/api";
import { ScrollArea } from "@workspace/ui/components/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@workspace/ui/components/select";
import { usePaginatedQuery } from "convex/react";
import {
  ArrowRight,
  ArrowUpIcon,
  CheckIcon,
  ListIcon,
  MessageSquare,
} from "lucide-react";
import React from "react";
import { Link } from "next-view-transitions";
import { cn } from "@workspace/ui/lib/utils";
import { usePathname } from "next/navigation";

const ConversationPanel = () => {
  const [filter, setFilter] = React.useState("all");
  const pathName = usePathname();
  const conversations = usePaginatedQuery(
    api.private.conversation.getMany,
    { status: undefined },
    { initialNumItems: 10 }
  );

  return (
    <div className="h-full w-full flex flex-col bg-background rounded-2xl ">
      {/* Header */}
      <div className="flex items-center justify-between h-[53px] px-3 border-r-gray-400 border-b bg-muted/40">
        <h2 className="text-sm flex items-center gap-x-2 font-semibold text-foreground">
          <MessageSquare size={18} /> Conversations
        </h2>
        <Select value={filter} onValueChange={setFilter}>
          <SelectTrigger className="h-8 w-[140px] border-none px-2 shadow-none ring-0 hover:bg-accent hover:text-accent-foreground focus-visible:ring-0">
            <SelectValue placeholder="Filter" />
          </SelectTrigger>
          <SelectContent className="border-none shadow-md">
            <SelectItem value="all">
              <div className="flex items-center gap-2">
                <ListIcon className="h-4 w-4" />
                <span>All</span>
              </div>
            </SelectItem>
            <SelectItem value="unresolved">
              <div className="flex items-center gap-2">
                <ArrowRight className="h-4 w-4 text-destructive" />
                <span>Unresolved</span>
              </div>
            </SelectItem>
            <SelectItem value="escalated">
              <div className="flex items-center gap-2">
                <ArrowUpIcon className="h-4 w-4 text-yellow-600" />
                <span>Escalated</span>
              </div>
            </SelectItem>
            <SelectItem value="resolved">
              <div className="flex items-center gap-2">
                <CheckIcon className="h-4 w-4 text-green-600" />
                <span>Resolved</span>
              </div>
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Scrollable Content */}
      <ScrollArea className="max-h-[calc(100vh-53px)]">
        <div className="flex w-full flex-1 flex-col text-sm">
          {conversations.results.map((conversation) => {
            const isLastMessageFromOperator =
              conversation.lastMessage?.message?.role !== "user";

            const country = getCountryFromTimezone(
              conversation.contactSession.metadata?.timezone as string
            );

            const countryFlagUrl = "/logo.svg";

            return (
              <Link
                className={cn(
                  "relative flex cursor-pointer items-start gap-3 border-b p-4 py-5 text-sm leading-tight hover:bg-blue-50",
                  pathName === `/conversation/${conversation._id}` &&
                    "bg-blue-100"
                )}
                key={conversation._id}
                href={`/conversation/${conversation._id}`}
              >
                pathName === `/conversation/${conversation._id}` &&
                "bg-blue-100"
                <div
                  className={cn(
                    "-translate-1/2 absolute top-1/2 left-0 h-[46%] w-1 rounded-full bg-neutral-300 opacity-0 transition-opacity",
                    pathName === `/conversation/${conversation._id}` &&
                      "opacity-100"
                  )}
                >
                  
                </div>
              </Link>
            );
          })}
        </div>
      </ScrollArea>
    </div>
  );
};

export default ConversationPanel;
