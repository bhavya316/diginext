import { Router } from "express";
import { ZodError } from "zod";
import { requireAuth } from "../../middleware/auth.js";
import { asyncHandler } from "../../utils/async-handler.js";
import { createTeacherSchema, listTeachersQuerySchema, updateTeacherSchema } from "./teachers.schema.js";
import { createTeacher, deleteTeacher, listTeachers, updateTeacher } from "./teachers.service.js";

export const teachersRouter = Router();

teachersRouter.get(
  "/",
  asyncHandler(async (req, res) => {
    const filters = listTeachersQuerySchema.parse(req.query);
    const teachers = await listTeachers(filters);

    res.json({
      ok: true,
      data: teachers
    });
  })
);

teachersRouter.post(
  "/",
  requireAuth,
  asyncHandler(async (req, res) => {
    try {
      const payload = createTeacherSchema.parse(req.body);
      const teacher = await createTeacher(payload);

      res.status(201).json({
        ok: true,
        data: teacher
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

teachersRouter.put(
  "/:id",
  requireAuth,
  asyncHandler(async (req, res) => {
    try {
      const id = BigInt(String(req.params.id));
      const payload = updateTeacherSchema.parse(req.body);
      const teacher = await updateTeacher(id, payload);

      res.json({
        ok: true,
        data: teacher
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

teachersRouter.delete(
  "/:id",
  requireAuth,
  asyncHandler(async (req, res) => {
    const id = BigInt(req.params.id);
    await deleteTeacher(id);

    res.json({
      ok: true
    });
  })
);

