import express from "express";
import cors from "cors";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { apiRouter } from "./routes/index.js";
import { errorHandler, notFoundHandler } from "./middleware/error-handler.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const brochureDirectory = path.resolve(__dirname, "../uploads/brochures");
const certificateDirectory = path.resolve(__dirname, "../uploads/certificates");
const teacherDirectory = path.resolve(__dirname, "../uploads/teachers");

export function createApp() {
  const app = express();

  app.set("json replacer", (_key, value) => (typeof value === "bigint" ? value.toString() : value));

  fs.mkdirSync(brochureDirectory, { recursive: true });
  fs.mkdirSync(certificateDirectory, { recursive: true });
  fs.mkdirSync(teacherDirectory, { recursive: true });

  app.use(cors());
  app.use(express.json());
  app.use(
    "/uploads/brochures",
    express.static(brochureDirectory, {
      setHeaders(res, filePath) {
        res.setHeader("Content-Disposition", `attachment; filename="${path.basename(filePath)}"`);
      }
    })
  );
  app.use("/uploads/certificates", express.static(certificateDirectory));
  app.use("/uploads/teachers", express.static(teacherDirectory));

  app.get("/health", (_req, res) => {
    res.json({
      ok: true,
      service: "diginext-backend",
      timestamp: new Date().toISOString()
    });
  });

  app.use("/api/v1", apiRouter);
  app.use(notFoundHandler);
  app.use(errorHandler);

  return app;
}
