DirectEd - E-Learning Platform

A comprehensive, full-stack e-learning platform built with modern web technologies to provide an engaging learning experience for students and powerful course management tools for instructors.
🚀 Features
For Students

Interactive Course Catalog: Browse and search courses with advanced filtering
Progress Tracking: Monitor your learning progress with visual indicators
Video Lessons: Watch lessons with integrated progress tracking
Interactive Quizzes: Test your knowledge with multiple question types
Certificates: Receive certificates upon course completion
AI Assistant: Get help from an AI-powered learning assistant

For Instructors

Course Management: Create and manage courses with rich content
Student Analytics: Track student progress and engagement metrics
Quiz Creation: Build interactive quizzes with various question types
Revenue Tracking: Monitor course earnings and enrollment statistics
Content Upload: Upload videos, documents, and other course materials

Platform Features

Role-Based Access: Separate experiences for students and instructors
Responsive Design: Works seamlessly on desktop, tablet, and mobile
Dark/Light Mode: Choose your preferred theme
Real-time Notifications: Stay updated with platform activities
Secure Authentication: JWT-based authentication with role protection

🛠 Technology Stack
Frontend

React 18 with TypeScript for type safety
Tailwind CSS for responsive styling
React Router for navigation
React Context for state management
Axios for API communication
Heroicons for beautiful icons

Backend

Node.js with Express.js server
TypeScript for type safety
MongoDB with Mongoose ODM
JWT for authentication
bcryptjs for password hashing
Cloudinary for file uploads
OpenAI API for AI assistant integration

Development Tools

Vite for fast development builds
Nodemon for automatic server restarts
Postman for API testing
MongoDB Atlas for cloud database

📦 Installation & Setup
Prerequisites

Node.js (v16 or higher)
MongoDB (local or Atlas cluster)
npm or yarn package manager

1. Clone the Repository
git clone https://github.com/your-username/directed-platform.git
cd directed-platform

2. Backend Setup
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env

# Edit .env with your configuration
# Add your MongoDB URI, JWT secret, Cloudinary credentials, etc.

# Start the development server
npm run dev

3. Frontend Setup
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env

# Edit .env with your API base URL
VITE_API_BASE_URL=http://localhost:3500

# Start the development server
npm run dev

4. Database Setup

Create a MongoDB database (local or using MongoDB Atlas)
Update the MONGO_URI in your backend .env file
The application will automatically create collections and indexes

⚙ Environment Variables
Backend (.env)
# Server Configuration
PORT=3500
NODE_ENV=development

# Database
MONGO_URI=mongodb://localhost:27017/directed

# Authentication
JWT_SECRET=your-jwt-secret-key
JWT_EXPIRE=7d

# File Uploads
CLOUDINARY_CLOUD_NAME=your-cloudinary-name
CLOUDINARY_API_KEY=your-cloudinary-key
CLOUDINARY_API_SECRET=your-cloudinary-secret

# AI Integration
OPENAI_API_KEY=your-openai-api-key

# Email Service (for notifications)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password

# Frontend URL (for CORS)
CLIENT_URL=http://localhost:3000

Frontend (.env)
VITE_API_BASE_URL=http://localhost:3500

🚦 Available Scripts
Backend Scripts
npm run dev      # Start development server with hot reload
npm run build    # Build for production
npm start        # Start production server
npm test         # Run tests

Frontend Scripts
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm test         # Run tests

📁 Project Structure
directed-platform/
├── backend/
│   ├── src/
│   │   ├── config/          # Database and third-party configurations
│   │   ├── controllers/     # Route controllers
│   │   ├── middleware/      # Custom middleware
│   │   ├── models/          # MongoDB models
│   │   ├── routes/          # API routes
│   │   ├── types/           # TypeScript type definitions
│   │   ├── utils/           # Utility functions
│   │   ├── app.ts           # Express app configuration
│   │   └── server.ts        # Server entry point
│   ├── .env                 # Environment variables
│   ├── package.json
│   └── tsconfig.json
│
└── frontend/
    ├── src/
    │   ├── components/      # Reusable UI components
    │   ├── contexts/        # React contexts for state management
    │   ├── pages/           # Page components
    │   ├── services/        # API services
    │   ├── types/           # TypeScript type definitions
    │   ├── utils/           # Utility functions
    │   └── main.tsx         # Application entry point
    ├── index.html
    ├── package.json
    ├── tsconfig.json
    └── vite.config.ts

📡 API Documentation
Authentication Endpoints

POST /api/auth/register - Register a new user
POST /api/auth/login - Login user
GET /api/auth/me - Get current user profile
POST /api/auth/forgotpassword - Request password reset
PUT /api/auth/resetpassword/:token - Reset password

Course Endpoints

GET /api/courses - Get all courses (with filtering)
GET /api/courses/featured - Get featured courses
GET /api/courses/:id - Get specific course
POST /api/courses - Create a course (instructor only)
PUT /api/courses/:id - Update a course (instructor only)
DELETE /api/courses/:id - Delete a course (instructor only)
POST /api/courses/:id/enroll - Enroll in a course (student only)

Lesson Endpoints

GET /api/lessons/:id - Get specific lesson
POST /api/lessons - Create a lesson (instructor only)
PUT /api/lessons/:id/progress - Update lesson progress (student only)

Quiz Endpoints

GET /api/quizzes/:id - Get specific quiz
POST /api/quizzes/:id/submit - Submit quiz answers (student only)
POST /api/quizzes - Create a quiz (instructor only)

User Endpoints

GET /api/student/dashboard - Get student dashboard data
GET /api/instructor/dashboard - Get instructor dashboard data
GET /api/notifications - Get user notifications
POST /api/notifications/mark-read - Mark notifications as read

For detailed API documentation with request/response examples, see API.md.
🚀 Deployment
Backend Deployment (Render/Railway)

Connect your repository to Render/Railway
Set up environment variables in the dashboard
Deploy from main branch

Frontend Deployment (Vercel/Netlify)

Connect your repository to Vercel/Netlify
Set build command: npm run build
Set output directory: dist
Add environment variable: VITE_API_BASE_URL=your-backend-url

Database Deployment (MongoDB Atlas)

Create a MongoDB Atlas account
Create a new cluster
Get connection string and update MONGO_URI

🤝 Contributing
We welcome contributions to DirectEd! Please follow these steps:

Fork the repository
Create a feature branch (git checkout -b feature/amazing-feature)
Commit your changes (git commit -m 'Add some amazing feature')
Push to the branch (git push origin feature/amazing-feature)
Open a Pull Request

Please read CONTRIBUTING.md for details on our code of conduct and the process for submitting pull requests.
