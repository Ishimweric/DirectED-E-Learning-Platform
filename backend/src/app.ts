import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';

// Load env vars
dotenv.config();

// Import routes
import authRoutes from './routes/auth';
import courseRoutes from './routes/course';
import lessonRoutes from './routes/lesson';
import quizRoutes from './routes/quiz';
import studentRoutes from './routes/student';
import instructorRoutes from './routes/instructor';
import chatRoutes from './routes/chat';
import notificationRoutes from './routes/notification';
import uploadRoutes from './routes/upload';
import publicRoutes from './routes/public';
import progressRoutes from './routes/progress';
import certificateRoutes from './routes/Certificate';

// Import middleware
import { notFound, errorHandler } from './middleware/error';

const app = express();

// Security middleware
app.use(helmet());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});
app.use(limiter);

// CORS
app.use(cors({
  origin: [
  process.env.CLIENT_URL || "http://localhost:3000",
  "http://localhost:5173",
  "https://directed.netlify.app",
  "https://directed.netlify.app/"
  ],
  credentials: true,

}));

// Body parser middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/lessons', lessonRoutes);
app.use('/api/quizzes', quizRoutes);
app.use('/api/student', studentRoutes);
app.use('/api/instructor', instructorRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api', publicRoutes);
app.use('/api/progress', progressRoutes);
app.use('/api/certificates', certificateRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({ success: true, message: 'Server is running' });
});

// Error handling middleware
app.use(notFound);
app.use(errorHandler);

export default app;