import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from "./config/db";
import playerRoutes from './routes/player';

dotenv.config();

const app = express();

// Connect to the database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/player", playerRoutes);

const PORT = process.env.PORT || 3500;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));