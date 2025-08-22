"use client";

import { useContactSessionStore } from "@/store/use-session-store";
import { useWidgetStore } from "@/store/use-widget-store";
import { api } from "@workspace/server/_generated/api";
import { Id } from "@workspace/server/_generated/dataModel";
import { useAction, useMutation } from "convex/react";
import { Loader, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";

type InitSteps = "ORG" | "SESSION" | "DONE" | "SETTINGS";

export default function WidgetLoadingScreen({
  organizationId,
}: {
  organizationId: string;
}) {
  const {
    setErrorMessage,
    setLoadingMessage,
    loadingMessage,
    setScreen,
    setOrganizationId,
  } = useWidgetStore();

  const [step, setStep] = useState<InitSteps>("ORG");
  const [sessionValid, setSessionValid] = useState(false);
  const [contactSessionId, setContactSessionId] =
    useState<Id<"contactSessions"> | null>(null);

  const validateOrganization = useAction(api.public.organization.validate);
  const validateContactSession = useMutation(
    api.public.contact_session.validate
  );

  const { getSession } = useContactSessionStore();

  useEffect(() => {
    if (step !== "ORG") return;

    setLoadingMessage("Verifying organization...");

    if (!organizationId) {
      setErrorMessage("Organization Id is required");
      setScreen("error");
      return;
    }

    validateOrganization({ organizationId })
      .then((result) => {
        if (result.valid) {
          setOrganizationId(organizationId);

          if (typeof window !== "undefined") {
            const sessionId = getSession(organizationId);
            if (sessionId) {
              setContactSessionId(sessionId as Id<"contactSessions">);
              setStep("SESSION");
            } else {
              setStep("DONE");
            }
          }
        } else {
          setErrorMessage(result.reason || "Invalid configuration");
          setScreen("error");
        }
      })
      .catch(() => {
        setErrorMessage("Unable to verify organization");
        setScreen("error");
      });
  }, [
    step,
    organizationId,
    setErrorMessage,
    setScreen,
    setLoadingMessage,
    setStep,
    setOrganizationId,
    getSession,
    validateOrganization,
  ]);

  useEffect(() => {
    if (step !== "SESSION") return;
    if (!contactSessionId) return setStep("DONE");

    setLoadingMessage("Validating session...");

    const validate = async () => {
      try {
        const result = await validateContactSession({ contactSessionId });
        setSessionValid(!!result?.valid);
      } catch (error) {
        console.error("Session validation failed:", error);
        setSessionValid(false);
      } finally {
        setStep("DONE");
      }
    };

    validate();
  }, [step, contactSessionId, validateContactSession]);

  useEffect(() => {
    if (step !== "DONE") return;

    const hasValidSession = contactSessionId && sessionValid;
    setScreen(hasValidSession ? "selection" : "auth");
  }, [step, contactSessionId, sessionValid, setScreen]);

  return (
    <div className="flex flex-col items-center justify-center w-full text-center px-4">
      <Loader className="h-14 w-14 animate-spin text-primary mb-4" />
      <h1 className="text-lg font-semibold">Loading Sales-AI...</h1>
      <p className="text-sm text-muted-foreground">
        {loadingMessage || "Please wait while we connect your widget."}
      </p>
    </div>
  );
}
