import { v } from "convex/values";
import { mutation } from "./_generated/server";

export const login = mutation({
  args: { email: v.string(), password: v.string() },
  handler: async (ctx, args) => {
    const admin = await ctx.db
      .query("admin")
      .withIndex("by_email", (q) => q.eq("email", args.email))
      .first();

    if (!admin) {
      throw new Error("Invalid credentials");
    }

    if (admin.password !== args.password) {
      throw new Error("Invaild credentials");
    }

    return {
      id: admin._id,
      email: admin.email,
    };
  },
});
