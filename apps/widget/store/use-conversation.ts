import { Id } from "@workspace/server/_generated/dataModel";
import { create } from "zustand";

interface ConversationState {
  conversationId: Id<"conversations"> | null;
  setConversationId: (id: Id<"conversations"> | null) => void;
  reset: () => void;
}

export const useConversationStore = create<ConversationState>((set) => ({
  conversationId: null,
  setConversationId: (id) => set({ conversationId: id }),
  reset: () => set({ conversationId: null }),
}));
