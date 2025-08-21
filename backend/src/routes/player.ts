import express from "express";
import { 
  getLessonContent, 
  markLessonAsCompleted, 
  submitQuiz,
  getCourseProgress,
  getQuizAttempts,
} from "../controllers/PlayerController";

// player-specific quiz-related imports
import { getQuizByLessonId } from "../controllers/quizController";


// import { protect } from "../middleware/authMiddleware";

const router = express.Router();

// Route for fetching lesson content
router.get("/lesson/:lessonId", getLessonContent);

// Route for marking a lesson as completed
router.post("/progress", markLessonAsCompleted);

// Route for getting overall course progress
router.get("/progress/course/:id", getCourseProgress);

// Route for submitting a quiz
router.post("/quiz/submit", submitQuiz);

// Route for getting a user's previous quiz attempts
router.get("/quiz-attempts/:quizId", getQuizAttempts);

// Route to fetch a quiz for a specific lesson (player-facing)
router.get("/quizzes/:lessonId", getQuizByLessonId);

export default router;
