import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ContactFormSection from './components/ContactFormSection';
import ContactInfoSection from './components/ContactInfoSection';

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-background">
      <Header transparent={false} />
      <div className="pt-24 pb-20">
        {/* Page header */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 mb-12">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-0.5 bg-primary rounded-full" />
            <span className="text-sm font-semibold text-primary uppercase tracking-widest">Get In Touch</span>
          </div>
          <h1 className="font-display text-4xl md:text-5xl font-semibold text-foreground mb-3">
            Let&apos;s find your<br />
            <span className="italic text-primary">perfect property</span>
          </h1>
          <p className="text-foreground-muted text-lg max-w-2xl">
            Whether you&apos;re buying, selling, renting, or investing — our expert agents are ready to guide you every step of the way.
          </p>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
            {/* Form — left, wider */}
            <div className="lg:col-span-3">
              <ContactFormSection />
            </div>
            {/* Info — right */}
            <div className="lg:col-span-2">
              <ContactInfoSection />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}