"use client";

import { Button } from "@workspace/ui/components/button";
import { cn } from "@workspace/ui/lib/utils";
import { HomeIcon, InboxIcon } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@workspace/ui/components/tooltip";
import React from "react";
import { useWidgetStore } from "@/store/use-widget-store";
import { motion } from "framer-motion";

const WidgetFooter = () => {
  const { currentScreen, setScreen } = useWidgetStore();

  const navItems = [
    { id: "selection", label: "Home", icon: HomeIcon },
    { id: "inbox", label: "Inbox", icon: InboxIcon },
  ] as const;

  return (
    <footer className="relative flex items-center justify-around border-t bg-white/70 dark:bg-black/40 backdrop-blur-xl shadow-lg">
      <TooltipProvider>
        {navItems.map(({ id, label, icon: Icon }) => {
          const isActive = currentScreen === id;

          return (
            <Tooltip key={id}>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  onClick={() => setScreen(id)}
                  size="icon"
                  className={cn(
                    "relative h-14 flex-1 rounded-none transition-all duration-300",
                    "hover:bg-accent/20 hover:scale-105",
                    isActive && "text-primary"
                  )}
                >
                  {/* Animated active indicator bubble */}
                  {isActive && (
                    <motion.span
                      layoutId="activeNav"
                      className="absolute inset-0 bg-accent/30 dark:bg-accent/40 rounded-lg"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}

                  <Icon
                    className={cn(
                      "relative z-10 size-6 transition-colors",
                      isActive ? "text-primary" : "text-muted-foreground"
                    )}
                  />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="top" className="text-sm">
                {label}
              </TooltipContent>
            </Tooltip>
          );
        })}
      </TooltipProvider>
    </footer>
  );
};

export default WidgetFooter;
