"use client";

import { create } from "zustand";

export const CONTACT_SESSION_KEY = "sales-ai_contact_session";

interface ContactSessionState {
  sessions: Record<string, string | null>;
  setSession: (organizationId: string, sessionId: string | null) => void;
  getSession: (organizationId: string) => string | null;
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
              sessionId
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
        set((state) => ({
          sessions: { ...state.sessions, [organizationId]: sessionFromStorage },
        }));
        return sessionFromStorage;
      }
      return null;
    },
  })
);
