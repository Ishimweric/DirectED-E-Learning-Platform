"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const db_1 = __importDefault(require("./config/db"));
const player_1 = __importDefault(require("./routes/player"));
dotenv_1.default.config();
const app = (0, express_1.default)();
// Connect to the database
(0, db_1.default)();
// Middleware
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Routes
app.use("/api/player", player_1.default);
const PORT = process.env.PORT || 3500;
app.listen(PORT, () => console.log("Server running on port ${PORT}"));
//# sourceMappingURL=server.js.map