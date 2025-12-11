import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const submitTestimonial = mutation({
  args: {
    name: v.string(),
    email: v.string(),
    companyName: v.string(),
    companyWebsite: v.string(),
    companyAddress: v.string(),
    review: v.string(),
    profilePictureId: v.optional(v.id("_storage")),
  },
  handler: async (ctx, args) => {
    const testimonialId = await ctx.db.insert("testimonials", {
      ...args,
      isApproved: false,
    });
    return testimonialId;
  },
});

export const getAllTestimonials = query({
  handler: async (ctx) => {
    return await ctx.db.query("testimonials").order("desc").collect();
  },
});

export const approveTestimonials = mutation({
  args: { testimonialId: v.id("testimonials") },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.testimonialId, { isApproved: true });
    return { success: true };
  },
});

export const rejectTetstimonial = mutation({
  args: { testimonialId: v.id("testimonials") },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.testimonialId, { isApproved: false });
    return { success: true };
  },
});

export const deleteTestimonial = mutation({
  args: { testimonialId: v.id("testimonials") },
  handler: async (ctx, args) => {
    //1. Get the testimonial first to delete the profilepictureId
    const testimonial = await ctx.db.get(args.testimonialId);
    if (!testimonial) {
      throw new Error("Testimonial not found");
    }

    //2. Delete profile picture from storage if it exists
    if (testimonial.profilePictureId) {
      console.log(testimonial.profilePictureId);
      await ctx.storage.delete(testimonial.profilePictureId);
    }

    //also delete from files table
    const fileRecord = await ctx.db
      .query("files")
      .filter((q) => q.eq(q.field("storageId"), testimonial.profilePictureId))
      .first();

    if (fileRecord) {
      await ctx.db.delete(fileRecord._id);
    }

    await ctx.db.delete(args.testimonialId);
    return { success: true };
  },
});

export const getApprovedTestimonials = query({
  handler: async (ctx) => {
    return await ctx.db
      .query("testimonials")
      .withIndex("by_approved", (q) => q.eq("isApproved", true))
      .order("desc")
      .collect();
  },
});
