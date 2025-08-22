"use client";

import { Id } from "@workspace/server/_generated/dataModel";
import { create } from "zustand";

export const CONTACT_SESSION_KEY = "sales-ai_contact_session";

interface ContactSessionState {
  sessions: Record<string, Id<"contactSessions"> | null>;
  setSession: (organizationId: string, sessionId: Id<"contactSessions"> | null) => void;
  getSession: (organizationId: string) => Id<"contactSessions"> | null;
}

export const useContactSessionStore = create<ContactSessionState>(
  (set, get) => ({
    sessions: {},

    setSession: (organizationId, sessionId) => {
      set((state) => {
        const updated = { ...state.sessions, [organizationId]: sessionId };

        if (typeof window !== "undefined") {
          if (sessionId !== null) {
            localStorage.setItem(
              CONTACT_SESSION_KEY + organizationId,
              sessionId as string // 👈 Convex Id is a string at runtime
            );
          } else {
            localStorage.removeItem(CONTACT_SESSION_KEY + organizationId);
          }
        }

        return { sessions: updated };
      });
    },

    getSession: (organizationId) => {
      const sessionFromState = get().sessions[organizationId];
      if (sessionFromState !== undefined) return sessionFromState;

      if (typeof window === "undefined") return null;

      const sessionFromStorage = localStorage.getItem(
        CONTACT_SESSION_KEY + organizationId
      );

      if (sessionFromStorage) {
        const id = sessionFromStorage as Id<"contactSessions">;
        set((state) => ({
          sessions: { ...state.sessions, [organizationId]: id },
        }));
        return id;
      }

      return null;
    },
  })
);
