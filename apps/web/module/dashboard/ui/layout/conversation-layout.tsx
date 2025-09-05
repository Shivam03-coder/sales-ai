"use client";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@workspace/ui/components/resizable";
import React, { type ReactNode } from "react";
import ConversationPanle from "../components/conversation-panel";
const ConversationLayout = ({ children }: { children: ReactNode }) => {
  return (
    <ResizablePanelGroup className="h-full flex-1" direction="horizontal">
      <ResizablePanel defaultSize={30} maxSize={30} minSize={30}>
        <ConversationPanle />
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel className="h-full" defaultSize={70}>
        const he summation of all the number is s ame as the ebponfied coding
        round 36 may be will depriacte it by 3rd og july
      </ResizablePanel>
    </ResizablePanelGroup>
  );
};

export default ConversationLayout;
