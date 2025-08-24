import React from 'react';
import { FiUsers, FiClock, FiStar, FiTrendingUp } from 'react-icons/fi';

const BenefitsSection: React.FC = () => {
  const benefits = [
    {
      icon: <FiUsers className="w-8 h-8" />,
      title: 'Expert Instructors',
      description: 'Learn from industry professionals with years of real-world experience and proven track records in their fields.',
    },
    {
      icon: <FiClock className="w-8 h-8" />,
      title: 'Flexible Learning',
      description: 'Study at your own pace with 24/7 access to course materials, downloadable resources, and mobile compatibility.',
    },
    {
      icon: <FiStar className="w-8 h-8" />,
      title: 'Personalized Support',
      description: 'Get one-on-one guidance and feedback from dedicated mentors who are committed to your success.',
    },
    {
      icon: <FiTrendingUp className="w-8 h-8" />,
      title: 'Progress Tracking',
      description: 'Monitor your learning journey with detailed analytics, completion certificates, and skill assessment.',
    },
  ];

  return (
    <section className="py-16 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-4 dark:text-white">Why Choose DirectEd?</h2>
        <p className="text-lg text-center text-gray-600 dark:text-gray-300 mb-12 max-w-3xl mx-auto">
          Experience the benefits of our comprehensive learning platform designed for your success and career advancement.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => (
            <div key={index} className="text-center p-6 bg-gray-50 dark:bg-gray-800 rounded-lg hover:shadow-md transition-shadow">
              <div className="inline-flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300">
                {benefit.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2 dark:text-white">{benefit.title}</h3>
              <p className="text-gray-600 dark:text-gray-300">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;