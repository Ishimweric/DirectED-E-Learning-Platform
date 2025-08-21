import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

// Import the route files
import playerRoutes from "./routes/player";
import quizRoutes from './routes/quiz';
import studentDashboardRoutes from './routes/studentDashboard';
import connectDB from './config/db';

const app = express();

app.use(cors());
app.use(express.json());

// MongoDB Connection
connectDB();

app.use('/api/player', playerRoutes);
app.use('/api/quizzes', quizRoutes);
app.use('/api/student', studentDashboardRoutes);

app.get('/', (req, res) => {
  res.send('Course Platform API is running.');
});

const PORT = process.env.PORT || 3500;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
