import { create } from "zustand";

export const WIDGET_SCREENS = [
  "error",
  "loading",
  "selection",
  "voice",
  "auth",
  "inbox",
  "chat",
  "contact",
] as const;

export type WidgetScreen = (typeof WIDGET_SCREENS)[number];

export const CONTACT_SESSION_KEY = "echo_contact_session";

type WidgetState = {
  currentScreen: WidgetScreen;
  sessionKey: string | null;
  errorMessage: string | null;
  setScreen: (screen: WidgetScreen) => void;
  setSessionKey: (key: string) => void;
  setError: (message: string) => void;
  reset: () => void;
};

export const useWidgetStore = create<WidgetState>((set) => ({
  currentScreen: "loading",
  sessionKey: null,
  errorMessage: null,

  setScreen: (screen) => set({ currentScreen: screen }),
  setSessionKey: (key) => set({ sessionKey: key }),
  setError: (message) => set({ currentScreen: "error", errorMessage: message }),
  reset: () =>
    set({ currentScreen: "loading", sessionKey: null, errorMessage: null }),
}));
