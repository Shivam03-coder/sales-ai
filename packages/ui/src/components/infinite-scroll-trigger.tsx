"use client";

import React from "react";
import { Button } from "@workspace/ui/components/button";
import { cn } from "@workspace/ui/lib/utils";

interface InfiniteScrollTriggerProps {
  canLoadMore: boolean;
  isLoadingMore: boolean;
  onLoadMore: () => void;
  loadMoreText?: string;
  noMoreText?: string;
  className?: string;
  ref?: React.Ref<HTMLDivElement>;
}

export const InfiniteScrollTrigger = ({
  canLoadMore,
  isLoadingMore,
  onLoadMore,
  loadMoreText = "Load More",
  noMoreText = "No More Items",
  className,
  ref,
}: InfiniteScrollTriggerProps) => {
  return (
    <div ref={ref} className={cn("flex justify-center py-4", className)}>
      {canLoadMore ? (
        <Button
          onClick={onLoadMore}
          disabled={isLoadingMore}
          className="px-6 py-2"
        >
          {isLoadingMore ? "Loading..." : loadMoreText}
        </Button>
      ) : (
        <span className="text-gray-500">{noMoreText}</span>
      )}
    </div>
  );
};
