
export interface IQuestion {
  _id: string;
  questionText: string;
  options: string[]; // This will be an empty array for short-answer questions.
  correctAnswer?: string | string[]; // Omitted in the player-facing API.
}

export interface IQuiz {
  _id: string;
  lesson: string;
  questions: IQuestion[];
  createdAt: string;
  updatedAt: string;
}

export interface ISubmittedAnswer {
  questionId: string;
  submittedAnswer: string | string[];
}

export interface IQuizAttempt {
  quizId: string;
  score: number;
  timestamp: string;
}