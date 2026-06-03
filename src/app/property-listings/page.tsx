import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PropertyListingsClient from './components/PropertyListingsClient';

export default function PropertyListingsPage() {
  return (
    <main className="min-h-screen bg-background">
      <Header transparent={false} />
      <div className="pt-24">
        <PropertyListingsClient />
      </div>
      <Footer />
    </main>
  );
}