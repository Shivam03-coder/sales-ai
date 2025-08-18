"use client";

import WidgetFooter from "../components/widget-footer";
import WidgetHeader from "../components/widget-header";

interface Props {
  organizationId: string;
}

export const WidgetView = ({ organizationId }: Props) => {
  return (
    <main className="flex min-h-screen min-w-screen h-full w-full flex-col overflow-hidden rounded-xl border ">
      <WidgetHeader>
        <WelcomeMessage />
      </WidgetHeader>
      <div className="flex flex-1">

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
