"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const PlayerController_1 = require("../controllers/PlayerController");
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = express_1.default.Router();
router.get("/lesson/:lessonId", authMiddleware_1.protect, PlayerController_1.getLessonContent);
// route to mark a lesson as completed
router.post("/progress", authMiddleware_1.protect, PlayerController_1.markLessonAsCompleted);
// route to submit a quiz attempt.
router.post("/quiz/submit", authMiddleware_1.protect, PlayerController_1.submitQuiz);
exports.default = router;
//# sourceMappingURL=player.js.map