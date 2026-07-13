import { Router } from "express";
import { ZodError } from "zod";
import { requireAuth } from "../../middleware/auth.js";
import { asyncHandler } from "../../utils/async-handler.js";
import { upsertSettingSchema } from "./settings.schema.js";
import { listSettings, upsertSetting } from "./settings.service.js";

export const settingsRouter = Router();

settingsRouter.get(
  "/",
  asyncHandler(async (_req, res) => {
    const settings = await listSettings();

    res.json({
      ok: true,
      data: settings
    });
  })
);

settingsRouter.put(
  "/",
  requireAuth,
  asyncHandler(async (req, res) => {
    try {
      const payload = upsertSettingSchema.parse(req.body);
      const setting = await upsertSetting(payload);

      res.json({
        ok: true,
        data: setting
      });
    } catch (error) {
      if (error instanceof ZodError) {
        error.statusCode = 400;
        error.message = error.issues.map((issue) => issue.message).join(", ");
      }

      throw error;
    }
  })
);
