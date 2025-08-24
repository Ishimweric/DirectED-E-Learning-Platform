import React from 'react';
import { Link } from 'react-router-dom';

const CallToAction: React.FC = () => {
  return (
    <section className="py-16 gradient-bg text-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Start Learning?</h2>
        <p className="text-xl mb-8 max-w-2xl mx-auto">
          Join thousands of learners who are already transforming their careers with DirectEd. Start your journey today.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/register"
            className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors"
          >
            Get Started Today
          </Link>
          <Link
            to="/courses"
            className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-blue-600 transition-colors"
          >
            View All Courses
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;