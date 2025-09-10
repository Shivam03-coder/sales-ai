import ConversationLayout from "@/module/conversation/ui/layout/conversation-layout";
import React, { ReactNode } from "react";

const Layout = ({ children }: { children: ReactNode }) => {
  return <ConversationLayout>{children}</ConversationLayout>;
};

export default Layout;
