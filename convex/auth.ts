import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export async function verifyAdmin(ctx: any, adminId: string) {
  const admin = await ctx.db.get(adminId);
  if (!admin) {
    throw new Error("Unauthorized: Invalid admin seesion");
  }
  return admin;
}

export const verifySession = query({
  args: { adminId: v.id("admin") },
  handler: async (ctx, args) => {
    try {
      const admin = await ctx.db.get(args.adminId);
      if (!admin) {
        return { valid: false };
      }
      return { valid: true, email: admin.email, id: admin._id };
    } catch (error) {
      return { valid: false };
    }
  },
});

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
