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

  const allowedOrigins = [
    "https://diginext.school",
    "https://www.diginext.school",
    "https://www1.diginext.school",
    "https://admin.diginext.school",
    "http://localhost:3000",
    "http://localhost:3001",
    "http://localhost:3002",
    "http://localhost:3003",
    "http://localhost:3006",
    "http://localhost:5000"
  ];

  const corsOptions = {
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin) || origin.endsWith(".diginext.school") || origin.includes("diginext")) {
        return callback(null, true);
      }
      return callback(null, true);
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With", "Accept", "Origin"]
  };

  app.use(cors(corsOptions));
  app.options("*", cors(corsOptions));
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
