import { ConvexError, v } from "convex/values";
import { mutation } from "../_generated/server";

export const create = mutation({
  args: {
    organizationId: v.string(),
    contactSessionId: v.id("contactSessions"),
  },
  async handler(ctx, args) {
    const session = await ctx.db.get(args.contactSessionId);
    if (!session || session.expiresAt < Date.now()) {
      throw new ConvexError({
        code: "UNAUTHORiZED",
        message: "INVALID SESSION",
      });
    }

    const threadId = "12231312";

    const conversationId = await ctx.db.insert("conversations", {
      contactSessionId: session._id,
      status: "resolved",
      threadId,
      organizationId: args.organizationId,
    });

    return conversationId;
  },
});

export const getConversation = mutation({
  args: {
    conversationId: v.id("conversations"),
    contactSessionId: v.id("contactSessions"),
  },
  async handler(ctx, args) {
    const session = await ctx.db.get(args.contactSessionId);

    if (!session || session.expiresAt < Date.now()) {
      throw new ConvexError({
        code: "UNAUTHORiZED",
        message: "INVALID SESSION",
      });
    }

    const conversation = await ctx.db.get(args.conversationId);

    if (!conversation) null;
    return {
      _id: conversation?._id,
      status: conversation?.status,
      threadId: conversation?.threadId,
    };
  },
});
