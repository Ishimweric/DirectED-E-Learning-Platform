import { z } from "zod";
import dotenv from 'dotenv';

dotenv.config();

// define the schema for environment variables using zod for validation.
const envSchema = z.object({
  NODE_ENV: z.enum(["development", "production"]).default("development"),
  PORT: z.string().default("5000"),
  MONGO_URI: z.string().min(1, { message: "MONGO_URI is required" }),
  JWT_SECRET: z.string().min(1, { message: "JWT_SECRET is required" }),
});

// parse and validate the environment variables.
const env = envSchema.parse(process.env);

// export the validated environment variables.
export default env;