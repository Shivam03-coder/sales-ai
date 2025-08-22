import { v } from "convex/values";
import { internalQuery } from "../../_generated/server";

export const getSession = internalQuery({
  args: {
    contactSessionId: v.id("contactSessions"),
  },
  async handler(ctx, args) {
    return await ctx.db.get(args.contactSessionId);
  },
});
