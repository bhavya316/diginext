import { Router } from "express";
import { ZodError } from "zod";
import { requireAuth } from "../../middleware/auth.js";
import { asyncHandler } from "../../utils/async-handler.js";
import {
  createCertificateSchema,
  listCertificatesQuerySchema,
  updateCertificateSchema
} from "./certificates.schema.js";
import {
  createCertificate,
  deleteCertificate,
  listCertificates,
  updateCertificate
} from "./certificates.service.js";

export const certificatesRouter = Router();

certificatesRouter.get(
  "/",
  asyncHandler(async (req, res) => {
    const filters = listCertificatesQuerySchema.parse(req.query);
    const certificates = await listCertificates(filters);

    res.json({
      ok: true,
      data: certificates
    });
  })
);

certificatesRouter.get(
  "/admin/all",
  requireAuth,
  asyncHandler(async (_req, res) => {
    const certificates = await listCertificates({ includeHidden: true });

    res.json({
      ok: true,
      data: certificates
    });
  })
);

certificatesRouter.post(
  "/",
  requireAuth,
  asyncHandler(async (req, res) => {
    try {
      const payload = createCertificateSchema.parse(req.body);
      const certificate = await createCertificate(payload);

      res.status(201).json({
        ok: true,
        data: certificate
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

certificatesRouter.put(
  "/:id",
  requireAuth,
  asyncHandler(async (req, res) => {
    try {
      const id = BigInt(req.params.id);
      const payload = updateCertificateSchema.parse(req.body);
      const certificate = await updateCertificate(id, payload);

      res.json({
        ok: true,
        data: certificate
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

certificatesRouter.delete(
  "/:id",
  requireAuth,
  asyncHandler(async (req, res) => {
    const id = BigInt(req.params.id);
    await deleteCertificate(id);

    res.json({
      ok: true
    });
  })
);
