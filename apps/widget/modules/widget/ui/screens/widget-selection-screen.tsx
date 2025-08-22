"use client";

import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card";
import { Button } from "@workspace/ui/components/button";
import { Phone, Mic, MessageSquare } from "lucide-react";
import { useWidgetStore } from "@/store/use-widget-store";
import { useContactSessionStore } from "@/store/use-session-store";
import { useMutation } from "convex/react";
import { api } from "@workspace/server/_generated/api";
import { Id } from "@workspace/server/_generated/dataModel";
import { useConversationStore } from "@/store/use-conversation";

const WidgetSelectionScreen = () => {
  const { setScreen, organizationId, setErrorMessage } = useWidgetStore();
  const { getSession } = useContactSessionStore();
  const createConversation = useMutation(api.public.conversation.create);
  const contactSessionId = getSession(organizationId as string);
  const [isPendingConverSation, setisPendingConverSation] = useState(false);
  const { setConversationId } = useConversationStore();
  const handleNewCoversation = async () => {
    setisPendingConverSation(true);
    if (!organizationId) {
      setScreen("error");
      setErrorMessage("Missing Organization Id");
      return;
    }
    if (!contactSessionId) {
      setScreen("auth");
    }
    try {
      const conversationId = await createConversation({
        contactSessionId: contactSessionId as Id<"contactSessions">,
        organizationId,
      });
      setConversationId(conversationId);
      setScreen("chat");
    } catch {
      setScreen("auth");
    } finally {
      setisPendingConverSation(false);
    }
  };

  return (
    <div className="flex flex-col w-[90%]  items-center justify-center mx-auto bg-white px-4 py-12 gap-8">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 ">
        <Card className="bg-white border border-gray-200 shadow-md hover:shadow-xl transition-all cursor-pointer">
          <CardHeader className="text-center">
            <MessageSquare className="mx-auto h-12 w-12 text-blue-600 mb-2" />
            <CardTitle className="text-lg font-semibold text-black">
              Chat Support
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-sm text-gray-600">
              Chat with our support team instantly and get answers quickly.
            </p>
            <Button
              className="mt-4 w-full bg-blue-600 text-white hover:bg-blue-700"
              onClick={() => handleNewCoversation()}
              disabled={isPendingConverSation}
            >
              Start Chat
            </Button>
          </CardContent>
        </Card>

        {/* Call Support */}
        <Card className="bg-white border border-gray-200 shadow-md hover:shadow-xl transition-all cursor-pointer">
          <CardHeader className="text-center">
            <Phone className="mx-auto h-12 w-12 text-blue-600 mb-2" />
            <CardTitle className="text-lg font-semibold text-black">
              Call Support
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-sm text-gray-600">
              Request a call from our support team and resolve issues directly.
            </p>
            <Button className="mt-4 w-full bg-blue-600 text-white hover:bg-blue-700">
              Request Call
            </Button>
          </CardContent>
        </Card>

        {/* Voice Call Support */}
        <Card className="bg-white border border-gray-200 shadow-md hover:shadow-xl transition-all cursor-pointer">
          <CardHeader className="text-center">
            <Mic className="mx-auto h-12 w-12 text-blue-600 mb-2" />
            <CardTitle className="text-lg font-semibold text-black">
              Voice Call Support
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-sm text-gray-600">
              Connect via voice call for instant live support without video.
            </p>
            <Button className="mt-4 w-full bg-blue-600 text-white hover:bg-blue-700">
              Start Voice
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default WidgetSelectionScreen;
