import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import Layout from './components/Layout';
import Footer from './components/Layout/Footer';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ForgotPasswordPage from './pages/ForgotPassword';
import CourseCatalog from './pages/CourseCatalog';
import CourseDetail from './pages/CourseDetail';
import LessonPlayer from './pages/LessonPlayer';
import ProgressPage from './pages/ProgressPage';
import InstructorProfile from './pages/InstructorProfile';
import InstructorDashboard from './pages/InstructorDashboard';
import './index.css';
import CreateCourse from './pages/CreateCourse';
import CreateLesson from './pages/CreateLesson';
import CreateQuiz from './pages/CreateQuiz';
import TakeQuiz from './pages/TakeQuiz';
import CertificatePage from './pages/CertificatePage';
import FloatingChatbot from './components/Layout/FloatingChatbot';


function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <Layout>
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/forgot-password" element={<ForgotPasswordPage />} />
                <Route path="/courses" element={<CourseCatalog />} />
                <Route path="/courses/:id" element={<CourseDetail />} />
                <Route path="/learn/:courseId/:lessonId" element={<LessonPlayer />} />
                <Route path="/learn/courseId" element={<LessonPlayer />}/>
                <Route path="/progress" element={<ProgressPage />} />
                <Route path="/instructor-profile" element={<InstructorProfile />} />
                <Route path="/instructor-dashboard" element={<InstructorDashboard/>}/>
                <Route path="/create-course" element={<CreateCourse />} />
                <Route path="/create-lesson/:courseId?" element={<CreateLesson/>} />
                <Route path="/create-quiz/:lessonId?" element={<CreateQuiz />} />
                <Route path="/quiz/:quizId" element={<TakeQuiz />} />
                <Route path="/certificate/:verificationCode" element={<CertificatePage/>} />
                <Route path="/certificate" element={<CertificatePage/>} />
            </Routes>
            <FloatingChatbot/>
            <Footer/>
          </Layout>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
