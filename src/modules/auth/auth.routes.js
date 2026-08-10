import { Router } from "express";
import { ZodError } from "zod";
import { asyncHandler } from "../../utils/async-handler.js";
import { prisma } from "../../lib/prisma.js";
import { loginSchema } from "./auth.schema.js";
import { requireAuth } from "../../middleware/auth.js";
import { signAdminToken, verifyPassword } from "../../utils/auth.js";

export const authRouter = Router();

authRouter.post(
  "/login",
  asyncHandler(async (req, res) => {
    try {
      const payload = loginSchema.parse(req.body);
      const admin = await prisma.admin.findUnique({
        where: { email: payload.email },
        select: {
          id: true,
          name: true,
          email: true,
          passwordHash: true,
          role: true,
          isActive: true
        }
      });

      if (!admin || !admin.isActive || !verifyPassword(payload.password, admin.passwordHash)) {
        const error = new Error("Invalid email or password");
        error.statusCode = 401;
        throw error;
      }

      const token = signAdminToken(admin);

      res.json({
        ok: true,
        data: {
          token,
          admin: {
            id: admin.id,
            name: admin.name,
            email: admin.email,
            role: admin.role
          }
        }
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

authRouter.get(
  "/me",
  requireAuth,
  asyncHandler(async (req, res) => {
    res.json({
      ok: true,
      data: req.admin
    });
  })
);

authRouter.put(
  "/password",
  requireAuth,
  asyncHandler(async (req, res) => {
    try {
      const { newPassword } = req.body;
      if (!newPassword || newPassword.length < 6) {
        const error = new Error("Password must be at least 6 characters long");
        error.statusCode = 400;
        throw error;
      }
      
      const { hashPassword } = await import("../../utils/auth.js");
      const passwordHash = hashPassword(newPassword);
      
      await prisma.admin.update({
        where: { id: req.admin.id },
        data: { passwordHash }
      });
      
      res.json({ ok: true, message: "Password updated successfully" });
    } catch (error) {
      throw error;
    }
  })
);
