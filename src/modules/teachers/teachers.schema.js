import { z } from "zod";

export const listTeachersQuerySchema = z.object({
  cityId: z.coerce.bigint().optional(),
  includeHidden: z
    .union([z.boolean(), z.enum(["true", "false"])])
    .optional()
    .transform((value) => value === true || value === "true")
});

export const createTeacherSchema = z.object({
  cityId: z.coerce.bigint().optional().nullable(),
  name: z.string().min(2).max(150),
  photoUrl: z.string().url().max(500).optional().or(z.literal("")),
  linkedinUrl: z.string().url().max(500).optional().or(z.literal("")),
  employmentStatus: z.string().max(190).optional(),
  credentials: z.string().max(5000).optional(),
  sortOrder: z.number().int().optional(),
  isVisible: z.boolean().optional()
});

export const updateTeacherSchema = createTeacherSchema.partial().extend({
  cityId: z.coerce.bigint().optional().nullable()
});
