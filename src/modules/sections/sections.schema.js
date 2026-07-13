import { z } from "zod";

export const listSectionsQuerySchema = z.object({
  cityId: z.coerce.bigint().optional(),
  status: z.enum(["DRAFT", "PUBLISHED"]).optional(),
  sectionKey: z.string().max(80).optional()
});

export const createSectionSchema = z.object({
  cityId: z.coerce.bigint().optional(),
  sectionKey: z.string().min(2).max(80),
  title: z.string().max(255).optional(),
  subtitle: z.string().max(255).optional(),
  body: z.string().max(10000).optional(),
  contentJson: z.unknown().optional(),
  sortOrder: z.number().int().optional(),
  isVisible: z.boolean().optional(),
  status: z.enum(["DRAFT", "PUBLISHED"]).optional()
});

export const updateSectionSchema = createSectionSchema.partial();
