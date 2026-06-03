'use client';

import React, { useEffect, useRef, useState } from 'react';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';

interface Testimonial {
  id: number;
  quote: string;
  name: string;
  role: string;
  location: string;
  image: string;
  alt: string;
  rating: number;
  outcome: string;
  outcomeLabel: string;
}

const testimonials: Testimonial[] = [
{
  id: 1,
  quote: "EstateHub made buying our first home completely stress-free. Our agent Marcus walked us through every step, and we closed in just 28 days. We got $40K under asking price — something I never thought possible in this market.",
  name: 'Priya Nair',
  role: 'First-Time Home Buyer',
  location: 'Austin, TX',
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_1c41622db-1763298467686.png",
  alt: 'Smiling South Asian woman in professional attire, warm natural light portrait',
  rating: 5,
  outcome: '$40K',
  outcomeLabel: 'Under asking price'
},
{
  id: 2,
  quote: "I was skeptical about managing investment properties remotely, but EstateHub's team gave me the data and confidence to acquire three multi-family units in Seattle. My portfolio is up 34% in 18 months.",
  name: 'Darnell Washington',
  role: 'Property Investor',
  location: 'Seattle, WA',
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_18d5bd88d-1763296665838.png",
  alt: 'Professional African American man in business attire, confident expression, office setting',
  rating: 5,
  outcome: '+34%',
  outcomeLabel: 'Portfolio growth in 18mo'
},
{
  id: 3,
  quote: "We needed 8,000 sqft of office space in downtown Chicago on a tight timeline. EstateHub's commercial team found us three qualified options within a week, and we signed a lease 40% below market rate.",
  name: 'Jennifer Kowalski',
  role: 'VP of Operations, NexaGroup',
  location: 'Chicago, IL',
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_1456eb2f9-1763294356174.png",
  alt: 'Professional woman with blonde hair in modern office, bright natural light, confident business portrait',
  rating: 5,
  outcome: '40%',
  outcomeLabel: 'Below market lease rate'
}];


export default function TestimonialsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const active = testimonials[activeIndex];

  return (
    <section ref={sectionRef} className="py-20 bg-background-alt">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-0.5 bg-primary rounded-full" />
              <span className="text-sm font-semibold text-primary uppercase tracking-widest">Client Stories</span>
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-semibold text-foreground">
              Real results from<br />
              <span className="italic text-primary">real clients</span>
            </h2>
          </div>
          <div className="flex items-center gap-2">
            {testimonials.map((_, i) =>
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              className={`transition-all duration-300 rounded-full ${
              i === activeIndex ? 'w-8 h-2.5 bg-primary' : 'w-2.5 h-2.5 bg-border hover:bg-primary-200'}`
              } />

            )}
          </div>
        </div>

        {/* Main testimonial */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
          {/* Featured testimonial */}
          <div className="lg:col-span-2 bg-white rounded-3xl overflow-hidden border border-border-subtle shadow-md">
            <div className="flex flex-col sm:flex-row h-full">
              {/* Photo */}
              <div className="relative w-full sm:w-64 flex-shrink-0 min-h-64">
                <AppImage
                  src={active.image}
                  alt={active.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, 256px" />
                
                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-foreground/20 sm:bg-gradient-to-r sm:from-transparent sm:to-foreground/10" />
              </div>

              {/* Content */}
              <div className="flex flex-col justify-between p-7 flex-1">
                <div>
                  <div className="flex gap-1 mb-4">
                    {Array.from({ length: active.rating }).map((_, i) =>
                    <Icon key={i} name="StarIcon" size={16} className="text-accent" variant="solid" />
                    )}
                  </div>
                  <blockquote className="text-foreground-muted text-base leading-relaxed italic mb-6">
                    &ldquo;{active.quote}&rdquo;
                  </blockquote>
                </div>
                <div className="flex items-end justify-between gap-4">
                  <div>
                    <div className="font-bold text-foreground">{active.name}</div>
                    <div className="text-sm text-foreground-muted">{active.role}</div>
                    <div className="flex items-center gap-1 mt-1 text-xs text-foreground-subtle">
                      <Icon name="MapPinIcon" size={12} />
                      {active.location}
                    </div>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <div className="text-3xl font-bold text-primary font-display">{active.outcome}</div>
                    <div className="text-xs text-foreground-muted">{active.outcomeLabel}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Side testimonials */}
          <div className="flex flex-col gap-4">
            {testimonials.
            filter((_, i) => i !== activeIndex).
            map((t) =>
            <button
              key={t.id}
              onClick={() => setActiveIndex(testimonials.indexOf(t))}
              className="testimonial-card bg-white rounded-2xl p-5 border border-border-subtle text-left hover:border-primary-200 transition-all">
              
                  <div className="flex items-start gap-3 mb-3">
                    <div className="relative w-10 h-10 rounded-xl overflow-hidden flex-shrink-0">
                      <AppImage src={t.image} alt={t.alt} fill className="object-cover" sizes="40px" />
                    </div>
                    <div>
                      <div className="font-semibold text-sm text-foreground">{t.name}</div>
                      <div className="text-xs text-foreground-subtle">{t.role}</div>
                    </div>
                    <div className="ml-auto text-right flex-shrink-0">
                      <div className="text-lg font-bold text-primary font-display">{t.outcome}</div>
                    </div>
                  </div>
                  <p className="text-xs text-foreground-muted line-clamp-2 italic">&ldquo;{t.quote}&rdquo;</p>
                </button>
            )}

            {/* CTA card */}
            <div className="bg-gradient-to-br from-primary to-primary-dark rounded-2xl p-5 text-white">
              <div className="text-2xl font-bold font-display mb-1">4,200+</div>
              <div className="text-white/80 text-sm mb-4">Verified 5-star reviews on Google and Zillow</div>
              <div className="flex gap-1">
                {Array.from({ length: 5 }).map((_, i) =>
                <Icon key={i} name="StarIcon" size={14} className="text-accent" variant="solid" />
                )}
                <span className="text-xs text-white/70 ml-1">4.9 / 5.0</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>);

}