"use client";

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@workspace/ui/components/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Input } from "@workspace/ui/components/input";
import { Button } from "@workspace/ui/components/button";
import { useMutation } from "convex/react";
import { api } from "@workspace/server/_generated/api";
import { Doc } from "@workspace/server/_generated/dataModel";
import { useContactSessionStore } from "@/store/use-session-store";
import { useWidgetStore } from "@/store/use-widget-store";

const sessionSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Enter a valid email"),
});
type SessionTypes = z.infer<typeof sessionSchema>;

export default function WidgetAuthScreen({
  organizationId,
}: {
  organizationId: string;
}) {
  const form = useForm<SessionTypes>({
    resolver: zodResolver(sessionSchema),
    defaultValues: { name: "", email: "" },
  });

  const createContactSession = useMutation(api.public.contact_session.create);
  const { setSession } = useContactSessionStore();
  const { setScreen, setLoadingMessage } = useWidgetStore();

  async function onSubmit(values: SessionTypes) {
    if (!organizationId) return;

    setLoadingMessage("Creating session...");

    const metadata: Doc<"contactSessions">["metadata"] = {
      userAgent: navigator.userAgent,
      language: navigator.language,
      languages: navigator.languages?.join(",") || "",
      platform: navigator.platform,
      vendor: navigator.vendor,
      screenResolution: `${screen.width}x${screen.height}`,
      viewportSize: `${window.innerWidth}x${window.innerHeight}`,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      timezoneOffset: new Date().getTimezoneOffset().toString(),
      cookieEnabled: navigator.cookieEnabled ? "true" : "false",
      referrer: document.referrer || "direct",
      currentUrl: window.location.href,
    };

    try {
      const contactSessionId = await createContactSession({
        ...values,
        organizationId,
        metadata,
      });
      if (contactSessionId) {
        setSession(organizationId, contactSessionId);
        setScreen("loading");
      }
    } catch (err) {
      console.error("Failed to create session", err);
      setScreen("auth");
    }
  }

  return (
    <div className="mx-auto my-auto w-[95%] lg:w-[70%] rounded-2xl p-8">
      <div className="flex flex-col items-center justify-center gap-1 px-2 py-4 text-center">
        <h1 className="text-2xl font-bold tracking-tight">SALES-AI</h1>
        <h2 className="text-base text-muted-foreground">
          Your smart sales assistant 💬
        </h2>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-black">Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Your name"
                    type="text"
                    className="text-black focus-visible:ring-blue-500"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-red-400" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white">Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="you@example.com"
                    type="email"
                    className="text-white focus-visible:ring-blue-500"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-red-400" />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="w-full rounded-lg bg-blue-600 py-2 font-semibold text-white hover:bg-blue-700"
          >
            Continue
          </Button>
        </form>
      </Form>
    </div>
  );
}
