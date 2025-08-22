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

type WidgetState = {
  currentScreen: WidgetScreen;
  organizationId: string | null;
  errorMessage: string | null;
  loadingMessage: string | null;
  setScreen: (screen: WidgetScreen) => void;
  setOrganizationId: (organizationId: string | null) => void;
  setErrorMessage: (message: string) => void;
  setLoadingMessage: (message: string) => void;
  reset: () => void;
};

export const useWidgetStore = create<WidgetState>((set) => ({
  currentScreen: "auth",
  organizationId: null,
  errorMessage: null,
  loadingMessage: null,

  setScreen: (screen) => set({ currentScreen: screen }),
  setOrganizationId: (organizationId) => set({ organizationId }),
  setErrorMessage: (message) =>
    set({ currentScreen: "error", errorMessage: message }),
  setLoadingMessage: (message) =>
    set({ currentScreen: "loading", loadingMessage: message }),
  reset: () =>
    set({
      currentScreen: "loading",
      organizationId: null,
      errorMessage: null,
      loadingMessage: null,
    }),
}));
