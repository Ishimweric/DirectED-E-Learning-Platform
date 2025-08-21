import express from "express";
import { getLessonContent, markLessonAsCompleted, submitQuiz } from "../controllers/PlayerController";
// import { protect } from "../middleware/authMiddleware";

const router = express.Router();

// router.get("/lesson/:lessonId", protect, getLessonContent);
router.get("/lesson/:lessonId", getLessonContent);
// route to mark a lesson as completed
// router.post("/progress", protect, markLessonAsCompleted);
router.post("/progress", markLessonAsCompleted);
// route to submit a quiz attempt.
// router.post("/quiz/submit", protect, submitQuiz);
router.post("/quiz/submit", submitQuiz);

export default router;