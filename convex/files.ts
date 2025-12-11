import { v } from "convex/values";
import { action, mutation, query } from "./_generated/server";

//generate upload url
export const generateUploadUrl = action(async ({ storage }) => {
  return await storage.generateUploadUrl();
});

//save the storageId after upload
export const saveFile = mutation({
  args: { storageId: v.id("_storage") },
  handler: async (ctx, args) => {
    const id = await ctx.db.insert("files", {
      storageId: args.storageId,
      createdAt: Date.now(),
    });
    return id;
  },
});

//helper to get the file url
export const getFileUrl = query({
  args: { storageId: v.id("_storage") },
  handler: async (ctx, args) => {
    return await ctx.storage.getUrl(args.storageId);
  },
});
