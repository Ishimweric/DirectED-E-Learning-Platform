import React from 'react';
import HeroSection from '../components/Landing/HeroSection';
import FeaturedCourses from '../components/Landing/FeaturedCourses';
import BenefitsSection from '../components/Landing/BenefitsSection';
import TestimonialsSection from '../components/Landing/TestimonialsSection';
import CallToAction from '../components/Landing/CallToAction';

const LandingPage: React.FC = () => {
  return (
    <div>
      <HeroSection />
      <FeaturedCourses />
      <BenefitsSection />
      <TestimonialsSection />
      <CallToAction />
    </div>
  );
};

export default LandingPage;