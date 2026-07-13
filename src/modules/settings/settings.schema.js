import { z } from "zod";

export const upsertSettingSchema = z.object({
  key: z.string().min(2).max(120),
  valueJson: z.unknown()
});
