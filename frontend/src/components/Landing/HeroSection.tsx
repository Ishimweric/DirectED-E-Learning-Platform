import React from 'react';
import { Link } from 'react-router-dom';

const HeroSection: React.FC = () => {
  return (
    <section className="gradient-bg text-white py-20 h-[calc(100vh-75px)] flex w-full">
      <div className="container mx-auto px-4 w-2/3">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Empower Learners Through Accessible Education
          </h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90">
            Transform your future with expert-led courses, personalized learning paths, and a supportive community of learners and instructors worldwide.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/courses"
              className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors"
            >
              Browse Courses
            </Link>
            <Link
              to="/register"
              className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-blue-600 transition-colors"
            >
              Sign Up Free
            </Link>
          </div>
        </div>
      </div>
      <div className='w-1/3 p-5'>
        <img src={"../../../public/image.png"}/>
      </div>
    </section>
  );
};

export default HeroSection;