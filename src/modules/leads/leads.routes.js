import { Router } from "express";
import { ZodError } from "zod";
import { requireAuth } from "../../middleware/auth.js";
import { asyncHandler } from "../../utils/async-handler.js";
import { createLeadSchema } from "./leads.schema.js";
import { createLead, listLeads } from "./leads.service.js";

export const leadsRouter = Router();

leadsRouter.get(
  "/",
  requireAuth,
  asyncHandler(async (req, res) => {
    const status = req.query.status ? String(req.query.status) : undefined;
    const cityId = req.query.cityId ? BigInt(String(req.query.cityId)) : undefined;
    const leads = await listLeads({ status, cityId });

    res.json({
      ok: true,
      data: leads
    });
  })
);

leadsRouter.post(
  "/",
  asyncHandler(async (req, res) => {
    try {
      const payload = createLeadSchema.parse(req.body);
      const lead = await createLead(payload);

      res.status(201).json({
        ok: true,
        data: lead
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
