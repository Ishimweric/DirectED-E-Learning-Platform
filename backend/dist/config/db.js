"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const env_1 = __importDefault(require("./env"));
// This function establishes the connection to the MongoDB database.
const connectDB = async () => {
    try {
        const conn = await mongoose_1.default.connect(env_1.default.MONGO_URI);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    }
    catch (error) {
        console.error(`Error: ${error}`);
        process.exit(1); // Exit with a failure code if the connection fails.
    }
};
exports.default = connectDB;
//# sourceMappingURL=db.js.map