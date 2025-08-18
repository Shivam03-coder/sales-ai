"use client";

import { Button } from "@workspace/ui/components/button";
import { cn } from "@workspace/ui/lib/utils";
import { HomeIcon, InboxIcon } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@workspace/ui/components/tooltip";
import React from "react";

const WidgetFooter = () => {
  const screen = "selection"; // current screen state (replace with real state later)

  return (
    <footer className="flex items-center justify-between border-t bg-background/70 backdrop-blur-md">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className={cn(
                "h-14 flex-1 rounded-none transition-all duration-200",
                screen === "selection" && "bg-accent text-primary"
              )}
            >
              <HomeIcon
                className={cn(
                  "size-5 transition-colors",
                  screen === "selection" && "text-primary"
                )}
              />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="top" className="text-sm">
            Home
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className={cn(
                "h-14 flex-1 rounded-none transition-all duration-200",
                screen === "inbox" && "bg-accent text-primary"
              )}
            >
              <InboxIcon
                className={cn(
                  "size-5 transition-colors",
                  screen === "inbox" && "text-primary"
                )}
              />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="top" className="text-sm">
            Inbox
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </footer>
  );
};

export default WidgetFooter;
