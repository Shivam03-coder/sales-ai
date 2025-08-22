"use client";

import { useWidgetStore } from "@/store/use-widget-store";
import WidgetFooter from "../components/widget-footer";
import WidgetHeader from "../components/widget-header";
import WidgetAuthScreen from "../screens/widget-auth-screen";
import WidgetErrorScreen from "../screens/widget-error-screen";
import WidgetLoadingScreen from "../screens/widget-loading-screen";
import WidgetSelectionScreen from "../screens/widget-selection-screen";
import WidgetChatScreen from "../screens/widget-chat-screen";

interface Props {
  organizationId: string;
}

export const WidgetView = ({
  organizationId = "org_31TJE9yC73Ub7h3EtnhzFGclCiT",
}: Props) => {
  const { currentScreen } = useWidgetStore();

  const screenComponents: Record<string, React.ReactNode> = {
    error: <WidgetErrorScreen />,
    loading: <WidgetLoadingScreen organizationId={organizationId} />,
    auth: <WidgetAuthScreen organizationId={organizationId} />,
    voice: <p>TODO : VOICE</p>,
    inbox: <p>TODO : INBOX</p>,
    selection: <WidgetSelectionScreen />,
    chat: <WidgetChatScreen />,
    contact: <p>TODO : CONTACT</p>,
  };

  return (
    <main className="flex min-h-screen min-w-screen h-full w-full flex-col overflow-hidden rounded-xl border">
      <WidgetHeader>
        <WelcomeMessage />
      </WidgetHeader>

      <div className="flex flex-1">
        {screenComponents[currentScreen] ?? <p>Screen not found</p>}
      </div>
      <WidgetFooter />
    </main>
  );
};

function WelcomeMessage() {
  return (
    <div className="flex flex-col justify-between gap-y-2 px-2 py-6 font-semibold">
      <p className="font-semibold text-3xl">Hi there! 👋</p>
      <p className="text-lg">How can we help you today?</p>
    </div>
  );
}
