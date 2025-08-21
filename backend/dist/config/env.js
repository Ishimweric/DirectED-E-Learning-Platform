"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// define the schema for environment variables using zod for validation.
const envSchema = zod_1.z.object({
    NODE_ENV: zod_1.z.enum(["development", "production"]).default("development"),
    PORT: zod_1.z.string().default("5000"),
    MONGO_URI: zod_1.z.string().min(1, { message: "MONGO_URI is required" }),
    JWT_SECRET: zod_1.z.string().min(1, { message: "JWT_SECRET is required" }),
});
// parse and validate the environment variables.
const env = envSchema.parse(process.env);
// export the validated environment variables.
exports.default = env;
//# sourceMappingURL=env.js.map