import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const getSettings = query({
  args: { key: v.string() },
  handler: async (ctx, args) => {
    const settings = await ctx.db
      .query("settings")
      .withIndex("by_key", (q) => q.eq("key", args.key))
      .first();

    //default to true if settings doesn't exist
    return settings?.value ?? true;
  },
});

export const toggleSettings = mutation({
  args: { key: v.string() },
  handler: async (ctx, args) => {
    const exisiting = await ctx.db
      .query("settings")
      .withIndex("by_key", (q) => q.eq("key", args.key))
      .first();

    if (exisiting) {
      //Toggle existing value
      await ctx.db.patch(exisiting._id, { value: !exisiting.value });
      return !exisiting.value;
    } else {
      // Create new setting with false (toggled from default true)
      await ctx.db.insert("settings", { key: args.key, value: false });
      return false;
    }
  },
});
