"use client";

import { ArrowRightIcon, ArrowUpIcon, CheckIcon } from "lucide-react";
import { cn } from "@workspace/ui/lib/utils";

interface ConversationStatusIconProps {
  status: "unresolved" | "escalated" | "resolved";
}

const statusConfig = {
  resolved: {
    icon: CheckIcon,
    bgColor: "bg-green-500",
    textColor: "text-white",
  },
  unresolved: {
    icon: ArrowRightIcon,
    bgColor: "bg-destructive",
    textColor: "text-white",
  },
  escalated: {
    icon: ArrowUpIcon,
    bgColor: "bg-yellow-500",
    textColor: "text-black",
  },
};

const ConversationStatusIcon = ({ status }: ConversationStatusIconProps) => {
  const config = statusConfig[status];
  const Icon = config.icon;

  return (
    <span
      className={cn(
        "flex items-center justify-center h-6 w-6 rounded-full shrink-0",
        config.bgColor,
        config.textColor
      )}
    >
      <Icon className="h-4 w-4" />
    </span>
  );
};

export default ConversationStatusIcon