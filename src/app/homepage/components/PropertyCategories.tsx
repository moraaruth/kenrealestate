'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';

interface Category {
  title: string;
  subtitle: string;
  description: string;
  cta: string;
  image: string;
  alt: string;
  icon: string;
  count: string;
  accent: string;
}

const categories: Category[] = [
{
  title: 'Buy a Home',
  subtitle: 'Residential',
  description: 'Find your dream home from our curated selection of single-family homes, condos, and estates across the nation.',
  cta: 'Explore Homes',
  image: "https://images.unsplash.com/photo-1630100628486-4ada8b7a5f20",
  alt: 'Beautiful suburban home with white picket fence and blue sky, bright sunny day, green lawn, welcoming curb appeal',
  icon: 'HomeIcon',
  count: '8,200+ homes',
  accent: 'bg-primary'
},
{
  title: 'Rent a Property',
  subtitle: 'Rentals',
  description: 'Discover flexible rental options from furnished studios to spacious family homes — short and long-term leases available.',
  cta: 'Browse Rentals',
  image: "https://images.unsplash.com/photo-1695650581811-735993c8c294",
  alt: 'Modern apartment complex courtyard with pool and greenery, bright afternoon light, airy open design',
  icon: 'BuildingOfficeIcon',
  count: '3,100+ rentals',
  accent: 'bg-[#0EA5E9]'
},
{
  title: 'Commercial Space',
  subtitle: 'Commercial',
  description: 'Premium office, retail, and industrial spaces in high-traffic locations. Find the right space to grow your business.',
  cta: 'View Commercial',
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_1d1342fbb-1766936728417.png",
  alt: 'Modern open-plan office with floor-to-ceiling windows and city view, bright natural light, professional clean interior',
  icon: 'BuildingStorefrontIcon',
  count: '640+ spaces',
  accent: 'bg-accent'
},
{
  title: 'Invest in Real Estate',
  subtitle: 'Investment',
  description: 'High-yield investment properties, multi-family assets, and REITs with proven returns and expert portfolio guidance.',
  cta: 'Start Investing',
  image: "https://images.unsplash.com/photo-1687968054787-a1eb0ca35e23",
  alt: 'Luxury apartment building exterior with glass facade, bright sky, clean urban architecture, modern investment property',
  icon: 'ChartBarIcon',
  count: '480+ opportunities',
  accent: 'bg-success'
}];


export default function PropertyCategories() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const cards = sectionRef.current?.querySelectorAll('.category-card');
    if (!cards) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).classList.add('animate-fade-in-up');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    cards.forEach((card) => observer.observe(card));
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="pt-4 pb-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-3">
            <div className="w-8 h-0.5 bg-primary rounded-full" />
            <span className="text-sm font-semibold text-primary uppercase tracking-widest">All Property Types</span>
            <div className="w-8 h-0.5 bg-primary rounded-full" />
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-semibold text-foreground">
            Whatever you need,<br />
            <span className="italic text-primary">we have it</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {categories.map((cat, i) =>
          <div
            key={cat.title}
            className="category-card group relative bg-white rounded-3xl overflow-hidden border border-border-subtle property-card opacity-100"
            style={{ animationDelay: `${i * 0.12}s`, animationFillMode: 'forwards' }}>
            
              {/* Image */}
              <div className="relative h-52 overflow-hidden">
                <AppImage
                src={cat.image}
                alt={cat.alt}
                fill
                className="object-cover property-card-image"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw" />
              
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-foreground/20 to-transparent" />
                <div className={`absolute top-4 left-4 w-10 h-10 rounded-2xl ${cat.accent} flex items-center justify-center`}>
                  <Icon name={cat.icon as any} size={20} className="text-white" />
                </div>
                <div className="absolute bottom-4 left-4">
                  <span className="text-xs font-semibold text-white/80 uppercase tracking-widest">{cat.subtitle}</span>
                  <div className="text-white font-bold text-lg font-display">{cat.title}</div>
                </div>
              </div>

              {/* Body */}
              <div className="p-5">
                <p className="text-sm text-foreground-muted leading-relaxed mb-4">{cat.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-primary bg-primary-50 px-3 py-1.5 rounded-full">
                    {cat.count}
                  </span>
                  <Link
                  href="/property-listings"
                  className="flex items-center gap-1.5 text-sm font-semibold text-primary hover:text-primary-dark transition-colors group/link">
                  
                    {cat.cta}
                    <Icon name="ArrowRightIcon" size={14} className="group-hover/link:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>);

}