import { z } from "zod";

export const createLeadSchema = z.object({
  cityId: z.coerce.bigint().optional(),
  courseId: z.coerce.bigint().optional(),
  source: z.enum(["CALLBACK", "ENROLL", "CONTACT_FORM", "WHATSAPP", "MANUAL"]),
  name: z.string().min(2).max(120),
  email: z.string().email().max(190).optional().or(z.literal("")),
  phone: z.string().min(8).max(10),
  originLocation: z.string().max(120).optional(),
  interest: z.string().max(150).optional(),
  requestedAsset: z.enum(["BROCHURE", "CALLBACK"]).optional(),
  brochureUrl: z.string().url().max(500).optional().or(z.literal("")),
  message: z.string().max(5000).optional()
});
