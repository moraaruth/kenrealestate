import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HeroSection from './components/HeroSection';
import FeaturedListings from './components/FeaturedListings';
import StatsSection from './components/StatsSection';
import PropertyCategories from './components/PropertyCategories';
import TestimonialsSection from './components/TestimonialsSection';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-background">
      <Header transparent={true} />
      <HeroSection />
      <FeaturedListings />
      <StatsSection />
      <PropertyCategories />
      <TestimonialsSection />
      <Footer />
    </main>
  );
}