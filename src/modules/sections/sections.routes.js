import { Router } from "express";
import { ZodError } from "zod";
import { requireAuth } from "../../middleware/auth.js";
import { asyncHandler } from "../../utils/async-handler.js";
import { createSectionSchema, listSectionsQuerySchema, updateSectionSchema } from "./sections.schema.js";
import { createSection, listSections, updateSection } from "./sections.service.js";

export const sectionsRouter = Router();

sectionsRouter.get(
  "/",
  asyncHandler(async (req, res) => {
    const filters = listSectionsQuerySchema.parse(req.query);
    const sections = await listSections(filters);

    res.json({
      ok: true,
      data: sections
    });
  })
);

sectionsRouter.post(
  "/",
  requireAuth,
  asyncHandler(async (req, res) => {
    try {
      const payload = createSectionSchema.parse(req.body);
      const section = await createSection(payload);

      res.status(201).json({
        ok: true,
        data: section
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

sectionsRouter.put(
  "/:id",
  requireAuth,
  asyncHandler(async (req, res) => {
    try {
      const id = BigInt(req.params.id);
      const payload = updateSectionSchema.parse(req.body);
      const section = await updateSection(id, payload);

      res.json({
        ok: true,
        data: section
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
