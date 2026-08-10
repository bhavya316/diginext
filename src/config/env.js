import dotenv from "dotenv";
import { z } from "zod";

dotenv.config({ override: true });

const host = process.env.DB_HOST || "localhost";
const port = process.env.DB_PORT || "3306";
const user = process.env.DB_USER || "root";
const password = process.env.DB_PASSWORD !== undefined ? process.env.DB_PASSWORD : "root";
const name = process.env.DB_NAME || "diginext_db";

const constructedUrl = `mysql://${user}:${password}@${host}:${port}/${name}`;

process.env.DATABASE_URL = constructedUrl;

const envSchema = z.object({
  DB_HOST: z.string().default("localhost"),
  DB_PORT: z.string().default("3306"),
  DB_USER: z.string().default("root"),
  DB_PASSWORD: z.string().default("root"),
  DB_NAME: z.string().default("diginext_db"),
  DATABASE_URL: z.string().default(constructedUrl),
  PORT: z.coerce.number().default(4000),
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  AUTH_SECRET: z.string().min(16).default("diginext-dev-auth-secret"),
  ADMIN_BOOTSTRAP_PASSWORD: z.string().min(8).default("DigiNext@123")
});

export const env = envSchema.parse(process.env);
