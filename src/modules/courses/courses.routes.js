import { Router } from "express";
import { ZodError } from "zod";
import { requireAuth } from "../../middleware/auth.js";
import { asyncHandler } from "../../utils/async-handler.js";
import { createCourseSchema, listCoursesQuerySchema, updateCourseSchema } from "./courses.schema.js";
import { createCourse, listCourses, updateCourse } from "./courses.service.js";

export const coursesRouter = Router();

coursesRouter.get(
  "/",
  asyncHandler(async (req, res) => {
    const filters = listCoursesQuerySchema.parse(req.query);
    const courses = await listCourses(filters);

    res.json({
      ok: true,
      data: courses
    });
  })
);

coursesRouter.post(
  "/",
  requireAuth,
  asyncHandler(async (req, res) => {
    try {
      const payload = createCourseSchema.parse(req.body);
      const course = await createCourse(payload);

      res.status(201).json({
        ok: true,
        data: course
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

coursesRouter.put(
  "/:id",
  requireAuth,
  asyncHandler(async (req, res) => {
    try {
      const id = BigInt(req.params.id);
      const payload = updateCourseSchema.parse(req.body);
      const course = await updateCourse(id, payload);

      res.json({
        ok: true,
        data: course
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
