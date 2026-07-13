import { z } from "zod";

export const listCertificatesQuerySchema = z.object({
  cityId: z.coerce.bigint().optional(),
  includeHidden: z.coerce.boolean().optional()
});

export const createCertificateSchema = z.object({
  cityId: z.coerce.bigint().optional(),
  title: z.string().min(2).max(150),
  imageUrl: z.string().url().max(500),
  sortOrder: z.number().int().optional(),
  isVisible: z.boolean().optional()
});

export const updateCertificateSchema = createCertificateSchema.partial().extend({
  cityId: z.coerce.bigint().nullable().optional()
});
