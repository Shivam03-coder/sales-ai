"use client";

import { useWidgetStore } from "@/store/use-widget-store";
import { cn } from "@workspace/ui/lib/utils";
import { ReactNode } from "react";
import { ArrowLeft } from "lucide-react";
import { useContactSessionStore } from "@/store/use-session-store";
import { usePaginatedQuery, useQuery } from "convex/react";
import { api } from "@workspace/server/_generated/api";

const WidgetHeader = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  const { setScreen, currentScreen, organizationId } = useWidgetStore();

  return (
    <header
      className={cn(
        "bg-gradient-to-b from-primary mx-2 to-[#0b63f3] rounded-t-2xl mt-2 p-4 text-primary-foreground flex items-center gap-2",
        className
      )}
    >
      {currentScreen === "chat" && (
        <button
          onClick={() => setScreen("selection")}
          className="p-1 rounded hover:bg-white/20 transition-colors"
        >
          <ArrowLeft size={20} />
        </button>
      )}
      <div className="flex-1">{children}</div>
    </header>
  );
};

export default WidgetHeader;
