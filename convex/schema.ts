import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

// The schema is entirely optional.
// You can delete this file (schema.ts) and the
// app will continue to work.
// The schema provides more precise TypeScript types.

export default defineSchema({
  //admin table
  admin: defineTable({
    email: v.string(),
    password: v.string(),
  }).index("by_email", ["email"]),

  files: defineTable({
    storageId: v.id("_storage"),
    createdAt: v.number(),
  }),
  //testimonial table
  testimonials: defineTable({
    name: v.string(),
    email: v.string(),
    companyName: v.string(),
    companyWebsite: v.string(),
    companyAddress: v.string(),
    profilePictureId: v.optional(v.id("_storage")),
    review: v.string(),
    isApproved: v.boolean(),
  })
    .index("by_email", ["email"])
    .index("by_approved", ["isApproved"]),
});
