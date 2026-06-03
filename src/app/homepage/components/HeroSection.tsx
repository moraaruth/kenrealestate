'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';

const heroStats = [
{ value: '12,400+', label: 'Active Listings' },
{ value: '$2.8B', label: 'Sold in 2025' },
{ value: '98%', label: 'Client Satisfaction' }];


const quickSearchOptions = ['Buy', 'Rent', 'Commercial', 'Invest'];

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mediaRef = useRef<HTMLDivElement>(null);
  const titleLeftRef = useRef<HTMLHeadingElement>(null);
  const titleRightRef = useRef<HTMLHeadingElement>(null);
  const heroBgRef = useRef<HTMLDivElement>(null);
  const expandedContentRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState('Buy');
  const [locationValue, setLocationValue] = useState('');

  useEffect(() => {
    let animFrameId: number;

    const handleScroll = () => {
      if (!containerRef.current || !mediaRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const containerHeight = containerRef.current.offsetHeight;
      const viewportHeight = window.innerHeight;
      const scrolled = -rect.top;
      const maxScroll = containerHeight - viewportHeight;
      const progress = Math.min(Math.max(scrolled / maxScroll, 0), 1);

      // Expand media from small card → full viewport
      const startW = Math.min(340, window.innerWidth * 0.8);
      const startH = Math.min(460, window.innerHeight * 0.65);
      const endW = window.innerWidth;
      const endH = window.innerHeight;
      const currentW = startW + (endW - startW) * progress;
      const currentH = startH + (endH - startH) * progress;
      const currentRadius = Math.max(0, 24 - 24 * progress);

      mediaRef.current.style.width = `${currentW}px`;
      mediaRef.current.style.height = `${currentH}px`;
      mediaRef.current.style.borderRadius = `${currentRadius}px`;

      // Fade bg
      if (heroBgRef.current) {
        heroBgRef.current.style.opacity = `${1 - progress * 2}`;
      }

      // Fly titles off screen
      if (titleLeftRef.current) {
        titleLeftRef.current.style.transform = `translateX(${-progress * 110}vw)`;
        titleLeftRef.current.style.opacity = `${1 - progress * 2}`;
      }
      if (titleRightRef.current) {
        titleRightRef.current.style.transform = `translateX(${progress * 110}vw)`;
        titleRightRef.current.style.opacity = `${1 - progress * 2}`;
      }

      // Show expanded content
      if (expandedContentRef.current) {
        const contentOpacity = Math.max(0, (progress - 0.6) / 0.4);
        expandedContentRef.current.style.opacity = `${contentOpacity}`;
        expandedContentRef.current.style.pointerEvents = contentOpacity > 0.5 ? 'auto' : 'none';
      }
    };

    const onScroll = () => {
      cancelAnimationFrame(animFrameId);
      animFrameId = requestAnimationFrame(handleScroll);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    handleScroll();
    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(animFrameId);
    };
  }, []);

  return (
    <section id="expansion-hero-container" ref={containerRef}>
      <div id="expansion-hero-sticky" className="noise-overlay relative">
        {/* Background image — fades as media expands */}
        <div ref={heroBgRef} className="absolute inset-0 z-0 transition-none">
          <AppImage
            src="https://img.rocket.new/generatedImages/rocket_gen_img_164209056-1764850962493.png"
            alt="Luxury residential neighborhood with manicured lawns and blue sky, bright daylight, airy open suburban setting"
            fill
            priority
            className="object-cover"
            sizes="100vw" />
          
          <div className="absolute inset-0 bg-gradient-to-b from-foreground/20 via-foreground/10 to-foreground/40" />
        </div>

        {/* Expanding media */}
        <div
          ref={mediaRef}
          className="media-container"
          style={{ width: 340, height: 460 }}>
          
          <div className="relative w-full h-full">
            <AppImage
              src="https://img.rocket.new/generatedImages/rocket_gen_img_17f864eec-1764718171737.png"
              alt="Modern luxury home exterior at dusk, deep shadows, dramatic sky, dark blue twilight atmosphere, architectural lighting"
              fill
              priority
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw" />
            
            {/* Scrim for text legibility */}
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/30 to-transparent" />
          </div>
        </div>

        {/* Flying titles */}
        <div className="absolute inset-0 flex flex-col items-center justify-center z-40 pointer-events-none gap-2 px-4">
          <h1
            ref={titleLeftRef}
            className="font-display text-5xl md:text-7xl lg:text-8xl font-semibold text-white text-center leading-tight"
            style={{ mixBlendMode: 'normal' }}>
            
            Find Your
          </h1>
          <h2
            ref={titleRightRef}
            className="font-display text-5xl md:text-7xl lg:text-8xl font-semibold text-white text-center leading-tight italic"
            style={{ mixBlendMode: 'normal' }}>
            
            Perfect Home
          </h2>
        </div>

        {/* Expanded content — appears after expansion */}
        <div
          ref={expandedContentRef}
          className="absolute inset-0 flex flex-col items-center justify-end z-50 pb-12 px-4"
          style={{ opacity: 0, pointerEvents: 'none' }}>
          
          {/* Search card */}
          <div className="w-full max-w-3xl bg-white/95 backdrop-blur-xl rounded-3xl shadow-xl border border-white/60 p-5 md:p-6">
            {/* Tabs */}
            <div className="flex gap-1 mb-5 bg-background rounded-xl p-1">
              {quickSearchOptions.map((tab) =>
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 py-2 px-3 rounded-lg text-sm font-semibold transition-all duration-200 ${
                activeTab === tab ?
                'bg-primary text-white shadow-sm' :
                'text-foreground-muted hover:text-foreground'}`
                }>
                
                  {tab}
                </button>
              )}
            </div>

            {/* Search fields */}
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex-1 relative">
                <Icon name="MapPinIcon" size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-primary" />
                <input
                  type="text"
                  placeholder="City, neighborhood, or ZIP code"
                  value={locationValue}
                  onChange={(e) => setLocationValue(e.target.value)}
                  className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-border-subtle bg-background text-sm text-foreground form-input focus:border-primary" />
                
              </div>
              <div className="relative">
                <Icon name="HomeIcon" size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-primary" />
                <select className="pl-11 pr-8 py-3.5 rounded-xl border border-border-subtle bg-background text-sm text-foreground form-input focus:border-primary appearance-none min-w-[140px] cursor-pointer">
                  <option>Any Type</option>
                  <option>House</option>
                  <option>Condo</option>
                  <option>Townhouse</option>
                  <option>Commercial</option>
                </select>
              </div>
              <div className="relative">
                <Icon name="CurrencyDollarIcon" size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-primary" />
                <select className="pl-11 pr-8 py-3.5 rounded-xl border border-border-subtle bg-background text-sm text-foreground form-input focus:border-primary appearance-none min-w-[140px] cursor-pointer">
                  <option>Any Price</option>
                  <option>Under $500K</option>
                  <option>$500K–$1M</option>
                  <option>$1M–$2M</option>
                  <option>$2M+</option>
                </select>
              </div>
              <Link
                href="/property-listings"
                className="flex items-center justify-center gap-2 px-6 py-3.5 bg-primary text-white font-semibold rounded-xl hover:bg-primary-dark transition-all hover:shadow-blue hover:-translate-y-0.5 whitespace-nowrap text-sm">
                
                <Icon name="MagnifyingGlassIcon" size={18} />
                Search
              </Link>
            </div>

            {/* Quick stats */}
            <div className="flex items-center gap-6 mt-4 pt-4 border-t border-border-subtle">
              {heroStats.map((stat) =>
              <div key={stat.label} className="text-center flex-1">
                  <div className="text-base font-bold text-primary stat-number">{stat.value}</div>
                  <div className="text-xs text-foreground-subtle">{stat.label}</div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Scroll indicator — visible initially */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-2 text-white/70">
          <span className="text-xs font-medium tracking-widest uppercase">Scroll to explore</span>
          <div className="w-5 h-8 border-2 border-white/40 rounded-full flex items-start justify-center p-1">
            <div className="w-1 h-2 bg-white/60 rounded-full animate-bounce" />
          </div>
        </div>
      </div>
    </section>);

}