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

const sessionSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Enter a valid email"),
});
type SessionTypes = z.infer<typeof sessionSchema>;

function WidgetAuthScreen({
  organizationId = "8398023012470174017281038",
}: {
  organizationId: string;
}) {
  const form = useForm<SessionTypes>({
    resolver: zodResolver(sessionSchema),
    defaultValues: {
      email: "",
      name: "",
    },
  });

  const createContactSession = useMutation(api.public.contact_session.create);

  async function onSubmit(values: SessionTypes) {
    if (!organizationId) return;
    const metadata: Doc<"contactSessions">["metadata"] = {
      userAgent: navigator.userAgent,
      language: navigator.language,
      languages: navigator.languages ? navigator.languages.join(",") : "",
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

    const conactSessionId = await createContactSession({
      ...values,
      organizationId,
      metadata,
    });
    console.log("🚀 ~ onSubmit ~ conactSessionId:", conactSessionId);
    try {
    } catch (error) {
      console.log("🚀 ~ onSubmit ~ error:", error);
    }
  }

  return (
    <div className="mx-auto my-auto w-full max-w-md rounded-2xl p-8">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white">Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Your name"
                    type="text"
                    className="text-white focus-visible:ring-blue-500"
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
                    placeholder="balamia@gmail.com"
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

export default WidgetAuthScreen;
