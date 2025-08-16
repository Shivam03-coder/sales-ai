"use client";

import * as React from "react";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@workspace/ui/components/sidebar";
import { GitCommit } from "lucide-react";

export function TeamSwitcher() {
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton size="lg" className="">
          <span className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded">
            <GitCommit className="size-4 text-white" />{" "}
          </span>
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-medium">TRUGENT</span>
            <span className="truncate text-[10px]">AI BASES SALES</span>
          </div>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
