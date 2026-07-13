import { Router } from "express";
import { authRouter } from "../modules/auth/auth.routes.js";
import { certificatesRouter } from "../modules/certificates/certificates.routes.js";
import { citiesRouter } from "../modules/cities/cities.routes.js";
import { coursesRouter } from "../modules/courses/courses.routes.js";
import { dashboardRouter } from "../modules/dashboard/dashboard.routes.js";
import { leadsRouter } from "../modules/leads/leads.routes.js";
import { sectionsRouter } from "../modules/sections/sections.routes.js";
import { settingsRouter } from "../modules/settings/settings.routes.js";
import { teachersRouter } from "../modules/teachers/teachers.routes.js";
import { uploadsRouter } from "../modules/uploads/uploads.routes.js";

export const apiRouter = Router();

apiRouter.get("/", (_req, res) => {
  res.json({
    ok: true,
    message: "DigiNext API v1",
    modules: ["dashboard", "cities", "courses", "certificates", "sections", "settings", "teachers", "leads"]
  });
});

apiRouter.use("/dashboard", dashboardRouter);
apiRouter.use("/auth", authRouter);
apiRouter.use("/cities", citiesRouter);
apiRouter.use("/courses", coursesRouter);
apiRouter.use("/certificates", certificatesRouter);
apiRouter.use("/sections", sectionsRouter);
apiRouter.use("/settings", settingsRouter);
apiRouter.use("/teachers", teachersRouter);
apiRouter.use("/leads", leadsRouter);
apiRouter.use("/uploads", uploadsRouter);
