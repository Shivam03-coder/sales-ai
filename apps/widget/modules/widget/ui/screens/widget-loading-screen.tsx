"use client";

import { Loader2 } from "lucide-react";

export default function WidgetLoadingScreen({
  organizationId = "8398023012470174017281038",
}: {
  organizationId?: string;
}) {
  return (
    <div className="flex flex-col items-center justify-center w-full text-center px-4">
      <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
      <h1 className="text-lg font-semibold">Loading Sales-AI...</h1>
      <p className="text-sm text-muted-foreground">
        Please wait while we connect your widget.
      </p>
    </div>
  );
}
