'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';

interface Property {
  id: number;
  title: string;
  address: string;
  price: string;
  type: string;
  beds: number;
  baths: number;
  sqft: string;
  image: string;
  alt: string;
  badge?: string;
  colSpan?: string;
  rowSpan?: string;
}

// Bento grid audit (4-col grid):
// Row 1: [Sunset Ridge cs-2] + [Midtown Loft cs-1] + [Harbor View cs-1] = 2+1+1 = 4/4 ✓
// Row 2: [Maple Grove cs-1] + [Downtown cs-1] + [Lakeside cs-2] = 1+1+2 = 4/4 ✓

const featuredProperties: Property[] = [
{
  id: 1,
  title: 'Sunset Ridge Estate',
  address: '4821 Crestview Lane, Beverly Hills, CA 90210',
  price: '$3,450,000',
  type: 'For Sale',
  beds: 5,
  baths: 4,
  sqft: '4,820',
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_1ededd1c2-1773068969164.png",
  alt: 'Grand estate home with pool and manicured gardens, bright afternoon sunlight, lush greenery, open sky',
  badge: 'Featured',
  colSpan: 'md:col-span-2',
  rowSpan: ''
},
{
  id: 2,
  title: 'Midtown Loft',
  address: '310 W 52nd St, New York, NY 10019',
  price: '$1,290,000',
  type: 'For Sale',
  beds: 2,
  baths: 2,
  sqft: '1,640',
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_1e0e19bc4-1772132427610.png",
  alt: 'Modern urban loft interior with floor-to-ceiling windows and city view, bright airy natural light, white walls',
  badge: 'New',
  colSpan: 'md:col-span-1',
  rowSpan: ''
},
{
  id: 3,
  title: 'Harbor View Penthouse',
  address: '88 Harbor Blvd, Miami, FL 33132',
  price: '$5,200,000',
  type: 'For Sale',
  beds: 4,
  baths: 5,
  sqft: '6,100',
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_11b1036f7-1764678678342.png",
  alt: 'Luxury penthouse living room with panoramic ocean views, bright coastal light, white and blue interior',
  badge: 'Luxury',
  colSpan: 'md:col-span-1',
  rowSpan: ''
},
{
  id: 4,
  title: 'Maple Grove Family Home',
  address: '2204 Maple Grove Dr, Austin, TX 78701',
  price: '$875,000',
  type: 'For Sale',
  beds: 4,
  baths: 3,
  sqft: '2,950',
  image: "https://images.unsplash.com/photo-1630100628486-4ada8b7a5f20",
  alt: 'Charming suburban family home with green front lawn and blue sky, bright warm sunlight, welcoming curb appeal',
  colSpan: 'md:col-span-1',
  rowSpan: ''
},
{
  id: 5,
  title: 'Downtown Corner Suite',
  address: '1100 Main St #2204, Chicago, IL 60601',
  price: '$4,800/mo',
  type: 'For Rent',
  beds: 3,
  baths: 2,
  sqft: '1,900',
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_17f8ce432-1772774768946.png",
  alt: 'Modern downtown apartment with city skyline view, bright open layout, floor-to-ceiling windows, natural light',
  badge: 'Rent',
  colSpan: 'md:col-span-1',
  rowSpan: ''
},
{
  id: 6,
  title: 'Lakeside Investment Property',
  address: '775 Lakeshore Pkwy, Seattle, WA 98101',
  price: '$2,100,000',
  type: 'Investment',
  beds: 8,
  baths: 6,
  sqft: '5,400',
  image: "https://images.unsplash.com/photo-1720773813598-406affca8727",
  alt: 'Beautiful lakeside property with boat dock and mountain backdrop, bright clear day, lush Pacific Northwest landscape',
  badge: 'High Yield',
  colSpan: 'md:col-span-2',
  rowSpan: ''
}];


function PropertyCard({ property, index }: {property: Property;index: number;}) {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('animate-fade-in-up');
          observer.unobserve(el);
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={cardRef}
      className={`${property.colSpan} property-card bg-white rounded-3xl overflow-hidden border border-border-subtle opacity-100`}
      style={{ animationDelay: `${index * 0.1}s`, animationFillMode: 'forwards' }}>
      
      <Link href="/property-listings" className="block h-full">
        <div className="relative overflow-hidden" style={{ height: property.colSpan?.includes('2') ? 260 : 220 }}>
          <AppImage
            src={property.image}
            alt={property.alt}
            fill
            className="object-cover property-card-image"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" />
          
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent to-transparent" />

          {/* Badges */}
          <div className="absolute top-4 left-4 flex gap-2">
            {property.badge &&
            <span className={`text-xs font-semibold px-3 py-1 rounded-full ${
            property.badge === 'Luxury' ? 'bg-accent text-foreground' :
            property.badge === 'High Yield' ? 'bg-success text-white' :
            property.badge === 'Rent' ? 'bg-primary-light text-white' : 'bg-primary text-white'}`
            }>
                {property.badge}
              </span>
            }
            <span className="text-xs font-medium px-3 py-1 rounded-full bg-white/90 text-foreground">
              {property.type}
            </span>
          </div>

          {/* Price */}
          <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
            <div>
              <div className="text-xl font-bold text-white font-display">{property.price}</div>
              <div className="text-white/80 text-xs mt-0.5 line-clamp-1">{property.address}</div>
            </div>
            <button
              onClick={(e) => e.preventDefault()}
              className="w-9 h-9 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/40 transition-colors">
              
              <Icon name="HeartIcon" size={16} className="text-white" />
            </button>
          </div>
        </div>

        {/* Card body */}
        <div className="p-4">
          <h3 className="font-semibold text-foreground text-base mb-1">{property.title}</h3>
          <div className="flex items-center gap-4 text-sm text-foreground-muted">
            <span className="flex items-center gap-1">
              <Icon name="HomeIcon" size={14} className="text-primary" />
              {property.beds} beds
            </span>
            <span className="flex items-center gap-1">
              <Icon name="BeakerIcon" size={14} className="text-primary" />
              {property.baths} baths
            </span>
            <span className="flex items-center gap-1">
              <Icon name="ArrowsPointingOutIcon" size={14} className="text-primary" />
              {property.sqft} sqft
            </span>
          </div>
        </div>
      </Link>
    </div>);

}

export default function FeaturedListings() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = headerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('animate-fade-in-up');
          observer.unobserve(el);
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div ref={headerRef} className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10 opacity-100">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-0.5 bg-primary rounded-full" />
              <span className="text-sm font-semibold text-primary uppercase tracking-widest">Featured Properties</span>
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-semibold text-foreground leading-tight">
              Curated homes for<br />
              <span className="italic text-primary">every lifestyle</span>
            </h2>
          </div>
          <Link
            href="/property-listings"
            className="flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary-dark transition-colors group whitespace-nowrap">
            
            View all listings
            <Icon name="ArrowRightIcon" size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {featuredProperties.map((property, index) =>
          <PropertyCard key={property.id} property={property} index={index} />
          )}
        </div>
      </div>
    </section>);

}