import "dotenv/config";
import { z } from "zod";

const envSchema = z.object({
  DATABASE_URL: z.string().min(1, "DATABASE_URL is required"),
  PORT: z.coerce.number().default(4000),
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  AUTH_SECRET: z.string().min(16).default("diginext-dev-auth-secret"),
  ADMIN_BOOTSTRAP_PASSWORD: z.string().min(8).default("DigiNext@123")
});

export const env = envSchema.parse(process.env);
