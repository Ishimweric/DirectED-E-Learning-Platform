import express from "express";
import { getLessonContent, markLessonAsCompleted, submitQuiz } from "../controllers/PlayerController";
import { protect } from "../middleware/authMiddleware";

const router = express.Router();

router.get("/lesson/:lessonId", protect, getLessonContent);
// route to mark a lesson as completed
router.post("/progress", protect, markLessonAsCompleted);
// route to submit a quiz attempt.
router.post("/quiz/submit", protect, submitQuiz);

export default router;