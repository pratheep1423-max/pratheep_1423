import React from 'react';
import { AboutSection } from '../components/about/AboutSection';
import { Testimonials } from '../components/testimonials/Testimonials';

export const AboutPage = () => {
  return (
    <div className="pt-20 bg-studio-bg min-h-screen space-y-0">
      <AboutSection />
      <Testimonials />
    </div>
  );
};
