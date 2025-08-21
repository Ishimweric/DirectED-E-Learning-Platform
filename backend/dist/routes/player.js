"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const PlayerController_1 = require("../controllers/PlayerController");
// import { protect } from "../middleware/authMiddleware";
const router = express_1.default.Router();
// router.get("/lesson/:lessonId", protect, getLessonContent);
router.get("/lesson/:lessonId", PlayerController_1.getLessonContent);
// route to mark a lesson as completed
// router.post("/progress", protect, markLessonAsCompleted);
router.post("/progress", PlayerController_1.markLessonAsCompleted);
// route to submit a quiz attempt.
// router.post("/quiz/submit", protect, submitQuiz);
router.post("/quiz/submit", PlayerController_1.submitQuiz);
exports.default = router;
//# sourceMappingURL=player.js.map