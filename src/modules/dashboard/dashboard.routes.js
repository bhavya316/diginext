import { Router } from "express";
import { requireAuth } from "../../middleware/auth.js";
import { asyncHandler } from "../../utils/async-handler.js";
import { getDashboardSnapshot } from "./dashboard.service.js";

export const dashboardRouter = Router();

dashboardRouter.get(
  "/",
  requireAuth,
  asyncHandler(async (_req, res) => {
    const dashboard = await getDashboardSnapshot();

    res.json({
      ok: true,
      data: dashboard
    });
  })
);
