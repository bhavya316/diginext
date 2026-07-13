import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import multer from "multer";
import { Router } from "express";
import { requireAuth } from "../../middleware/auth.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const brochureDirectory = path.resolve(__dirname, "../../../uploads/brochures");
const certificateDirectory = path.resolve(__dirname, "../../../uploads/certificates");
const teacherDirectory = path.resolve(__dirname, "../../../uploads/teachers");

fs.mkdirSync(brochureDirectory, { recursive: true });
fs.mkdirSync(certificateDirectory, { recursive: true });
fs.mkdirSync(teacherDirectory, { recursive: true });

function sanitizeFilename(value) {
  return value.replace(/[^a-zA-Z0-9.-]+/g, "-").replace(/-+/g, "-").toLowerCase();
}

const storage = multer.diskStorage({
  destination: (_req, _file, callback) => {
    callback(null, brochureDirectory);
  },
  filename: (_req, file, callback) => {
    const extension = path.extname(file.originalname || "").toLowerCase();
    const basename = path.basename(file.originalname || "brochure", extension);
    callback(null, `${Date.now()}-${sanitizeFilename(basename)}${extension}`);
  }
});

const upload = multer({
  storage,
  limits: {
    fileSize: 10 * 1024 * 1024
  },
  fileFilter: (_req, file, callback) => {
    const allowedExtensions = new Set([".pdf", ".doc", ".docx"]);
    const extension = path.extname(file.originalname || "").toLowerCase();

    if (!allowedExtensions.has(extension)) {
      callback(new Error("Only PDF, DOC, and DOCX brochures are allowed"));
      return;
    }

    callback(null, true);
  }
});

const certificateStorage = multer.diskStorage({
  destination: (_req, _file, callback) => {
    callback(null, certificateDirectory);
  },
  filename: (_req, file, callback) => {
    const extension = path.extname(file.originalname || "").toLowerCase();
    const basename = path.basename(file.originalname || "certificate", extension);
    callback(null, `${Date.now()}-${sanitizeFilename(basename)}${extension}`);
  }
});

const certificateUpload = multer({
  storage: certificateStorage,
  limits: {
    fileSize: 10 * 1024 * 1024
  },
  fileFilter: (_req, file, callback) => {
    const allowedExtensions = new Set([".jpg", ".jpeg", ".png", ".webp"]);
    const extension = path.extname(file.originalname || "").toLowerCase();

    if (!allowedExtensions.has(extension)) {
      callback(new Error("Only JPG, PNG, and WEBP certificate images are allowed"));
      return;
    }

    callback(null, true);
  }
});

const teacherPhotoStorage = multer.diskStorage({
  destination: (_req, _file, callback) => {
    callback(null, teacherDirectory);
  },
  filename: (_req, file, callback) => {
    const extension = path.extname(file.originalname || "").toLowerCase();
    const basename = path.basename(file.originalname || "teacher-photo", extension);
    callback(null, `${Date.now()}-${sanitizeFilename(basename)}${extension}`);
  }
});

const teacherPhotoUpload = multer({
  storage: teacherPhotoStorage,
  limits: {
    fileSize: 10 * 1024 * 1024
  },
  fileFilter: (_req, file, callback) => {
    const allowedExtensions = new Set([".jpg", ".jpeg", ".png", ".webp"]);
    const extension = path.extname(file.originalname || "").toLowerCase();

    if (!allowedExtensions.has(extension)) {
      callback(new Error("Only JPG, PNG, and WEBP teacher images are allowed"));
      return;
    }

    callback(null, true);
  }
});

export const uploadsRouter = Router();

uploadsRouter.post("/brochures", requireAuth, upload.single("brochure"), (req, res) => {
  if (!req.file) {
    res.status(400).json({
      ok: false,
      error: "Brochure file is required"
    });
    return;
  }

  const relativeUrl = `/uploads/brochures/${req.file.filename}`;
  const absoluteUrl = `${req.protocol}://${req.get("host")}${relativeUrl}`;

  res.status(201).json({
    ok: true,
    data: {
      filename: req.file.filename,
      originalName: req.file.originalname,
      url: relativeUrl,
      absoluteUrl
    }
  });
});

uploadsRouter.post("/certificates", requireAuth, certificateUpload.single("certificate"), (req, res) => {
  if (!req.file) {
    res.status(400).json({
      ok: false,
      error: "Certificate image is required"
    });
    return;
  }

  const relativeUrl = `/uploads/certificates/${req.file.filename}`;
  const absoluteUrl = `${req.protocol}://${req.get("host")}${relativeUrl}`;

  res.status(201).json({
    ok: true,
    data: {
      filename: req.file.filename,
      originalName: req.file.originalname,
      url: relativeUrl,
      absoluteUrl
    }
  });
});

uploadsRouter.post("/teachers", requireAuth, teacherPhotoUpload.single("teacher"), (req, res) => {
  if (!req.file) {
    res.status(400).json({
      ok: false,
      error: "Teacher image is required"
    });
    return;
  }

  const relativeUrl = `/uploads/teachers/${req.file.filename}`;
  const absoluteUrl = `${req.protocol}://${req.get("host")}${relativeUrl}`;

  res.status(201).json({
    ok: true,
    data: {
      filename: req.file.filename,
      originalName: req.file.originalname,
      url: relativeUrl,
      absoluteUrl
    }
  });
});
