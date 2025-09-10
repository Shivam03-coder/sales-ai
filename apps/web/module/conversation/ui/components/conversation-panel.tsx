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
  ArrowRightCircle,
  ArrowUpIcon,
  CheckIcon,
  CornerUpLeft,
  MessageSquare,
} from "lucide-react";
import React, { useState } from "react";
import { Link } from "next-view-transitions";
import { cn } from "@workspace/ui/lib/utils";
import { usePathname } from "next/navigation";
import getGradient from "../../utils/get-gradient";
import { formatDistanceToNow } from "date-fns";
import getStatusColor from "../../utils/get-status";
import { getCountryFlagUrl } from "../../utils/get-country-flag";
import Image from "next/image";
import { InfiniteScrollTrigger } from "@workspace/ui/components/infinite-scroll-trigger";
import { useInfiniteScroll } from "@workspace/ui/hooks/use-infinite-scroll";

// Skeleton Components
const Skeleton = ({ className }: { className?: string }) => (
  <div className={cn("animate-pulse rounded-md bg-muted", className)} />
);

const ConversationSkeleton = () => (
  <div className="relative flex cursor-pointer items-center gap-3 shadow p-4 py-5 text-sm leading-tight">
    {/* Avatar Skeleton */}
    <div className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-full">
      <Skeleton className="h-12 w-12 rounded-full" />
      {/* Flag skeleton */}
      <Skeleton className="absolute bottom-0 right-0 h-5 w-5 rounded-full" />
    </div>

    {/* Content Skeleton */}
    <section className="flex w-full flex-col">
      <div className="flex-1 flex justify-between items-center">
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-3 w-16" />
      </div>

      <div className="mt-2 flex items-center justify-between gap-2">
        <div className="flex w-0 grow items-center gap-1">
          <Skeleton className="h-3 w-3" />
          <Skeleton className="h-3 w-48" />
        </div>
        <Skeleton className="h-4 w-4 rounded-full" />
      </div>
    </section>
  </div>
);

const ConversationPanel = () => {
  const [filter, setFilter] = useState<"unresolved" | "escalated" | "resolved">(
    "unresolved"
  );
  const pathName = usePathname();
  const conversations = usePaginatedQuery(
    api.private.conversation.getMany,
    { status: filter },
    { initialNumItems: 10 }
  );

  const {
    canLoadMore,
    handleLoadMore,
    isExhausted,
    isLoadingFirstPage,
    isLoadingMore,
    topElementRef,
  } = useInfiniteScroll({
    status: conversations.status,
    loadMore: conversations.loadMore,
    loadSize: 10,
  });

  const isLoading =
    conversations.status === "LoadingFirstPage" || isLoadingFirstPage;

  return (
    <div className="h-full w-full flex flex-col bg-background rounded-2xl ">
      <div className="flex items-center justify-between h-[53px] px-3 border-r-gray-400 shadow-blue-100 bg-muted/40">
        <h2 className="text-sm flex items-center gap-x-2 font-semibold text-foreground">
          <MessageSquare size={18} /> Conversations
        </h2>
        <Select
          value={filter}
          onValueChange={(value) =>
            setFilter(value as "unresolved" | "escalated" | "resolved")
          }
          disabled={isLoading}
        >
          <SelectTrigger
            className={cn(
              "h-8 w-[140px] border-none px-2 shadow-none ring-0 hover:bg-accent hover:text-accent-foreground focus-visible:ring-0",
              isLoading && "opacity-50 cursor-not-allowed"
            )}
          >
            <SelectValue placeholder="Filter" />
          </SelectTrigger>
          <SelectContent className="border-none shadow-md">
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
          {isLoading
            ? // Show skeleton loading state
              Array.from({ length: 8 }).map((_, index) => (
                <ConversationSkeleton key={index} />
              ))
            : // Show actual conversations
              conversations.results.map((conversation) => {
                const isLastMessageFromOperator =
                  conversation.lastMessage?.message?.role !== "user";

                const country = getCountryFromTimezone(
                  conversation.contactSession.metadata?.timezone as string
                );

                const countryFlagUrl = getCountryFlagUrl(
                  String(country?.countryCode)
                );

                const gradient = getGradient(conversation.contactSession.name);

                return (
                  <Link
                    key={conversation._id}
                    href={`/conversation/${conversation._id}`}
                    className={cn(
                      "relative flex cursor-pointer items-center gap-3 shadow p-4 py-5 text-sm leading-tight hover:bg-blue-50 transition-colors",
                      pathName === `/conversation/${conversation._id}` &&
                        "bg-blue-100"
                    )}
                  >
                    <div
                      className={cn(
                        "relative flex h-12 w-12 shrink-0 items-center justify-center rounded-full font-semibold text-white text-lg tracking-wide shadow-md bg-gradient-to-r animate-shine",
                        gradient
                      )}
                    >
                      <span className="select-none">
                        {conversation.contactSession.name
                          .charAt(0)
                          .toUpperCase()}
                      </span>

                      <Image
                        src={countryFlagUrl}
                        width={20}
                        height={20}
                        alt="country-flag"
                        className="absolute bottom-0 right-0 rounded-full border border-white shadow-sm"
                      />
                    </div>

                    {/* Name + Meta */}
                    <section className="flex w-full flex-col">
                      <div className="flex-1 flex justify-between items-center ">
                        <span className="font-medium">
                          {conversation.contactSession.name}
                        </span>
                        <span className="text-xs font-lexend text-gray-500">
                          {formatDistanceToNow(conversation._creationTime)}
                        </span>
                      </div>

                      <div className="mt-1 flex  items-center justify-between gap-2">
                        <div className="flex w-0 grow items-center gap-1">
                          {isLastMessageFromOperator && (
                            <CornerUpLeft className="size-3  shrink-0 text-muted-foreground" />
                          )}
                          <span
                            className={cn(
                              "line-clamp-1 text-muted-foreground text-xs",
                              !isLastMessageFromOperator &&
                                "font-bold text-black"
                            )}
                          >
                            {conversation.lastMessage?.text}
                          </span>
                        </div>
                        <ArrowRightCircle
                          className={getStatusColor(conversation.status)}
                        />
                      </div>
                    </section>
                  </Link>
                );
              })}

          {/* Loading more indicator */}
          {isLoadingMore && !isLoading && (
            <div className="p-4">
              <ConversationSkeleton />
            </div>
          )}

          {!isLoading && (
            <InfiniteScrollTrigger
              canLoadMore={canLoadMore}
              isLoadingMore={isLoadingMore}
              onLoadMore={handleLoadMore}
              ref={topElementRef}
            />
          )}
        </div>
      </ScrollArea>
    </div>
  );
};

export default ConversationPanel;
