import { v } from "convex/values";
import { mutation } from "../_generated/server";
import { createClerkClient } from "@clerk/backend";

const clerkClient = createClerkClient({
  secretKey: process.env.CLERK_SECRET_KEY,
});

export const validate = mutation({
  args: {
    organizationId: v.string(),
  },
  async handler(_, args) {
    try {
      await clerkClient.organizations.getOrganization({
        organizationId: args.organizationId,
      });
      return {
        valid: true,
      };
    } catch (error) {
      return {
        valid: true,
        reason: "Organization not found",
      };
    }
  },
});
