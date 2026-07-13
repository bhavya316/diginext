import { z } from "zod";

const faqItemSchema = z.object({
  question: z.string().trim().min(1).max(255),
  answer: z.string().trim().min(1).max(5000),
  sortOrder: z.number().int().min(0).optional(),
  status: z.enum(["DRAFT", "PUBLISHED"]).optional()
});

export const listCoursesQuerySchema = z.object({
  cityId: z.coerce.bigint().optional(),
  status: z.enum(["DRAFT", "PUBLISHED"]).optional()
});

export const createCourseSchema = z.object({
  cityId: z.coerce.bigint(),
  title: z.string().min(2).max(150),
  slug: z.string().min(2).max(150),
  shortDescription: z.string().max(5000).optional(),
  durationText: z.string().max(100).optional(),
  deliveryMode: z.string().max(100).optional(),
  brochureUrl: z.string().url().max(500).optional().or(z.literal("")),
  sortOrder: z.number().int().optional(),
  isFeatured: z.boolean().optional(),
  status: z.enum(["DRAFT", "PUBLISHED"]).optional(),
  faqs: z.array(faqItemSchema).max(20).optional()
});

export const updateCourseSchema = createCourseSchema.partial().extend({
  cityId: z.coerce.bigint().optional()
});
