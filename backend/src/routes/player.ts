import express from "express";
import { 
  getLessonContent, 
  markLessonAsCompleted, 
  submitQuiz,
  getCourseProgress,
  getQuizByLessonId,
  createQuiz,
  getQuizAttempts,
} from "../controllers/PlayerController";
// import { protect } from "../middleware/authMiddleware";

const router = express.Router();
router.get("/lesson/:lessonId", getLessonContent);
router.get("/quizzes/:lessonId", getQuizByLessonId);
router.post("/quizzes", createQuiz);
router.post("/progress", markLessonAsCompleted);
router.get("/progress/course/:id", getCourseProgress);
router.post("/quiz/submit", submitQuiz);
router.get("/quiz-attempts/:quizId", getQuizAttempts);

export default router;
