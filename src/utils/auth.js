import crypto from "node:crypto";
import { env } from "../config/env.js";

const TOKEN_TTL_SECONDS = 60 * 60 * 12;

function toBase64Url(input) {
  return Buffer.from(input).toString("base64url");
}

function fromBase64Url(input) {
  return Buffer.from(input, "base64url").toString("utf8");
}

export function hashPassword(password) {
  const salt = crypto.randomBytes(16).toString("hex");
  const derivedKey = crypto.scryptSync(password, salt, 64).toString("hex");
  return `scrypt:${salt}:${derivedKey}`;
}

export function verifyPassword(password, storedHash) {
  if (!storedHash) {
    return false;
  }

  if (storedHash === "replace-this-with-a-real-hash") {
    return password === env.ADMIN_BOOTSTRAP_PASSWORD;
  }

  const [scheme, salt, expectedKey] = storedHash.split(":");

  if (scheme !== "scrypt" || !salt || !expectedKey) {
    return false;
  }

  const passwordKey = crypto.scryptSync(password, salt, 64);
  const expectedBuffer = Buffer.from(expectedKey, "hex");

  if (passwordKey.length !== expectedBuffer.length) {
    return false;
  }

  return crypto.timingSafeEqual(passwordKey, expectedBuffer);
}

export function signAdminToken(admin) {
  const header = toBase64Url(JSON.stringify({ alg: "HS256", typ: "DGNX" }));
  const payload = toBase64Url(
    JSON.stringify({
      sub: String(admin.id),
      email: admin.email,
      role: admin.role,
      exp: Math.floor(Date.now() / 1000) + TOKEN_TTL_SECONDS
    })
  );
  const signature = crypto
    .createHmac("sha256", env.AUTH_SECRET)
    .update(`${header}.${payload}`)
    .digest("base64url");

  return `${header}.${payload}.${signature}`;
}

export function verifyAdminToken(token) {
  const [header, payload, signature] = String(token || "").split(".");

  if (!header || !payload || !signature) {
    throw new Error("Invalid token");
  }

  const expectedSignature = crypto
    .createHmac("sha256", env.AUTH_SECRET)
    .update(`${header}.${payload}`)
    .digest("base64url");

  if (signature !== expectedSignature) {
    throw new Error("Invalid token signature");
  }

  const decoded = JSON.parse(fromBase64Url(payload));

  if (!decoded.exp || decoded.exp < Math.floor(Date.now() / 1000)) {
    throw new Error("Token expired");
  }

  return decoded;
}
