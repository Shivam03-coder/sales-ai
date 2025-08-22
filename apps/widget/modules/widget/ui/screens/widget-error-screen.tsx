"use client";

import { useWidgetStore } from "@/store/use-widget-store";
import { Button } from "@workspace/ui/components/button";
import { AlertCircle } from "lucide-react";

export default function WidgetErrorScreen({
  onRetry,
}: {
  onRetry?: () => void;
}) {
  const { errorMessage } = useWidgetStore();
  return (
    <div className="flex flex-col items-center justify-center  w-full text-center px-4">
      <AlertCircle className="h-12 w-12 text-destructive mb-4" />
      <h1 className="text-lg font-semibold">
        {errorMessage || "Something went wrong"}
      </h1>
      <p className="text-sm text-muted-foreground mb-6">
        We couldn’t connect to Sales-AI. Please try again.
      </p>
      <Button variant="default" onClick={onRetry}>
        Retry
      </Button>
    </div>
  );
}
