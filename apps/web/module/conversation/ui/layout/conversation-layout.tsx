"use client";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@workspace/ui/components/resizable";
import React, { type ReactNode } from "react";
import ConversationPanle from "../components/conversation-panel";
import Image from "next/image";

const ConversationLayout = ({ children }: { children: ReactNode }) => {
  return (
    <ResizablePanelGroup className="h-full flex-1" direction="horizontal">
      <ResizablePanel defaultSize={30} maxSize={30} minSize={30}>
        <ConversationPanle />
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel className="h-full center" defaultSize={70}>
        {children}
      </ResizablePanel>
    </ResizablePanelGroup>
  );
};

export default ConversationLayout;
