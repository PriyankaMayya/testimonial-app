import { mutation } from "./_generated/server";
import { v } from "convex/values";

export const seedAdmin = mutation({
  args: {},
  handler: async (ctx) => {
    //check if admin already exists
    const existingAdmin = await ctx.db
      .query("admin")
      .withIndex("by_email", (q) => q.eq("email", "admin@example.com"))
      .first();

    if (existingAdmin) {
      return { message: "Admin already exists", admin: existingAdmin };
    }

    const adminId = await ctx.db.insert("admin", {
      email: "admin@example.com",
      password: "admin123",
    });

    return {
      message: "Admin created successfully",
      adminId,
      credentials: {
        email: "admin@example.com",
        password: "admin123",
      },
    };
  },
});
