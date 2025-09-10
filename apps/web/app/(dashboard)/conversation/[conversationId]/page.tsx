
import ConversationIdView from "@/module/conversation/ui/view/conversation-id-view";
import { Id } from "@workspace/server/_generated/dataModel";
import Image from "next/image";
import React from "react";

interface ConversationProps {
  params: {
    conversationId: Id<"conversations">;
  };
}

const Page = ({ params }: ConversationProps) => {
  const { conversationId } = params;

  if (!conversationId) {
    return <Image alt="logo.png" src="/logo.png" height={400} width={400} />;
  }

  return <ConversationIdView conversationId={conversationId} />;
};

export default Page;
