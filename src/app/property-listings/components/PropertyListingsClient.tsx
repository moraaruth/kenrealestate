'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';

interface Property {
  id: number;
  title: string;
  address: string;
  city: string;
  state: string;
  price: number;
  priceDisplay: string;
  type: 'sale' | 'rent' | 'commercial' | 'investment';
  propertyType: string;
  beds: number;
  baths: number;
  sqft: number;
  images: {src: string;alt: string;}[];
  badge?: string;
  yearBuilt: number;
  garage: number;
  lat: number;
  lng: number;
  featured?: boolean;
}

const allProperties: Property[] = [
{
  id: 1,
  title: 'Sunset Ridge Estate',
  address: '4821 Crestview Lane',
  city: 'Beverly Hills',
  state: 'CA',
  price: 3450000,
  priceDisplay: '$3,450,000',
  type: 'sale',
  propertyType: 'House',
  beds: 5,
  baths: 4,
  sqft: 4820,
  images: [
  { src: "https://images.unsplash.com/photo-1719294608301-efa8ecd6c9a1", alt: 'Grand estate home with pool, bright afternoon sunlight, lush greenery, open sky' },
  { src: "https://img.rocket.new/generatedImages/rocket_gen_img_1dcd4b7c9-1773214629749.png", alt: 'Luxury interior with open floor plan and natural light' }],

  badge: 'Featured',
  yearBuilt: 2018,
  garage: 3,
  lat: 34.0736,
  lng: -118.4004,
  featured: true
},
{
  id: 2,
  title: 'Midtown Loft',
  address: '310 W 52nd St #2204',
  city: 'New York',
  state: 'NY',
  price: 1290000,
  priceDisplay: '$1,290,000',
  type: 'sale',
  propertyType: 'Condo',
  beds: 2,
  baths: 2,
  sqft: 1640,
  images: [
  { src: "https://img.rocket.new/generatedImages/rocket_gen_img_1e0e19bc4-1772132427610.png", alt: 'Modern loft interior with city views, bright natural light, white walls, open layout' },
  { src: "https://images.unsplash.com/photo-1628745277864-fa6f297bf88a", alt: 'Contemporary kitchen with island and stainless appliances, bright lighting' }],

  badge: 'New',
  yearBuilt: 2021,
  garage: 1,
  lat: 40.7614,
  lng: -73.9776
},
{
  id: 3,
  title: 'Harbor View Penthouse',
  address: '88 Harbor Blvd',
  city: 'Miami',
  state: 'FL',
  price: 5200000,
  priceDisplay: '$5,200,000',
  type: 'sale',
  propertyType: 'Penthouse',
  beds: 4,
  baths: 5,
  sqft: 6100,
  images: [
  { src: "https://img.rocket.new/generatedImages/rocket_gen_img_11b1036f7-1764678678342.png", alt: 'Luxury penthouse kitchen and living area with ocean views, bright coastal light' },
  { src: "https://img.rocket.new/generatedImages/rocket_gen_img_1b3ff500a-1769252092848.png", alt: 'Penthouse terrace with pool and panoramic city view, bright daylight' }],

  badge: 'Luxury',
  yearBuilt: 2020,
  garage: 2,
  lat: 25.7617,
  lng: -80.1918
},
{
  id: 4,
  title: 'Maple Grove Family Home',
  address: '2204 Maple Grove Dr',
  city: 'Austin',
  state: 'TX',
  price: 875000,
  priceDisplay: '$875,000',
  type: 'sale',
  propertyType: 'House',
  beds: 4,
  baths: 3,
  sqft: 2950,
  images: [
  { src: "https://images.unsplash.com/photo-1590192379251-6f99eb48f04c", alt: 'Charming suburban family home with green front lawn and blue sky, bright warm sunlight' },
  { src: "https://images.unsplash.com/photo-1713365759615-744df441891b", alt: 'Bright open living room with hardwood floors and natural light' }],

  yearBuilt: 2015,
  garage: 2,
  lat: 30.2672,
  lng: -97.7431
},
{
  id: 5,
  title: 'Downtown Corner Suite',
  address: '1100 Main St #2204',
  city: 'Chicago',
  state: 'IL',
  price: 4800,
  priceDisplay: '$4,800/mo',
  type: 'rent',
  propertyType: 'Apartment',
  beds: 3,
  baths: 2,
  sqft: 1900,
  images: [
  { src: "https://img.rocket.new/generatedImages/rocket_gen_img_17f8ce432-1772774768946.png", alt: 'Modern downtown apartment with city skyline view, bright open layout, floor-to-ceiling windows' },
  { src: "https://images.unsplash.com/photo-1608235376176-c11df9952002", alt: 'Contemporary living space with large windows and natural light' }],

  badge: 'Rent',
  yearBuilt: 2019,
  garage: 1,
  lat: 41.8781,
  lng: -87.6298
},
{
  id: 6,
  title: 'Lakeside Investment Property',
  address: '775 Lakeshore Pkwy',
  city: 'Seattle',
  state: 'WA',
  price: 2100000,
  priceDisplay: '$2,100,000',
  type: 'investment',
  propertyType: 'Multi-Family',
  beds: 8,
  baths: 6,
  sqft: 5400,
  images: [
  { src: "https://images.unsplash.com/photo-1553921621-ddd0cea3bfff", alt: 'Beautiful lakeside property with boat dock and mountain backdrop, bright clear day' },
  { src: "https://img.rocket.new/generatedImages/rocket_gen_img_1c9f1279b-1768679840278.png", alt: 'Multi-family property exterior with manicured landscaping' }],

  badge: 'High Yield',
  yearBuilt: 2012,
  garage: 4,
  lat: 47.6062,
  lng: -122.3321
},
{
  id: 7,
  title: 'Riverside Office Complex',
  address: '500 Commerce Plaza',
  city: 'Denver',
  state: 'CO',
  price: 3800000,
  priceDisplay: '$3,800,000',
  type: 'commercial',
  propertyType: 'Office',
  beds: 0,
  baths: 8,
  sqft: 12000,
  images: [
  { src: "https://img.rocket.new/generatedImages/rocket_gen_img_1ff50e13f-1767524750610.png", alt: 'Modern office interior with open floor plan and mountain views, bright natural light' },
  { src: "https://images.unsplash.com/photo-1612191974684-4fcce5b4fecc", alt: 'Contemporary commercial office building exterior, blue sky, modern architecture' }],

  badge: 'Commercial',
  yearBuilt: 2017,
  garage: 50,
  lat: 39.7392,
  lng: -104.9903
},
{
  id: 8,
  title: 'Parkview Townhouse',
  address: '88 Parkview Terrace',
  city: 'Boston',
  state: 'MA',
  price: 1150000,
  priceDisplay: '$1,150,000',
  type: 'sale',
  propertyType: 'Townhouse',
  beds: 3,
  baths: 2,
  sqft: 2100,
  images: [
  { src: "https://images.unsplash.com/photo-1502569200026-38eac4f33a1b", alt: 'Charming Boston townhouse with brick facade and blue sky, bright afternoon, historic neighborhood' },
  { src: "https://img.rocket.new/generatedImages/rocket_gen_img_1f21902d9-1772670657846.png", alt: 'Townhouse interior with exposed brick and hardwood floors, warm natural light' }],

  yearBuilt: 1998,
  garage: 1,
  lat: 42.3601,
  lng: -71.0589
},
{
  id: 9,
  title: 'Studio 34 — Artist Loft',
  address: '34 Industrial Way',
  city: 'Portland',
  state: 'OR',
  price: 2200,
  priceDisplay: '$2,200/mo',
  type: 'rent',
  propertyType: 'Studio',
  beds: 1,
  baths: 1,
  sqft: 780,
  images: [
  { src: "https://img.rocket.new/generatedImages/rocket_gen_img_1b0e74b61-1772196676526.png", alt: 'Stylish artist loft with exposed brick and large windows, bright natural light, creative open space' }],

  yearBuilt: 2010,
  garage: 0,
  lat: 45.5051,
  lng: -122.6750
},
{
  id: 10,
  title: 'Scottsdale Desert Villa',
  address: '1420 Desert Bloom Rd',
  city: 'Scottsdale',
  state: 'AZ',
  price: 2750000,
  priceDisplay: '$2,750,000',
  type: 'sale',
  propertyType: 'House',
  beds: 4,
  baths: 4,
  sqft: 4200,
  images: [
  { src: "https://img.rocket.new/generatedImages/rocket_gen_img_16f8effc6-1773048716502.png", alt: 'Modern desert villa with pool and mountain views, bright Arizona sunshine, lush landscaping' },
  { src: "https://img.rocket.new/generatedImages/rocket_gen_img_1dbf9af1f-1772191564685.png", alt: 'Desert villa backyard with infinity pool and sunset sky' }],

  badge: 'New',
  yearBuilt: 2022,
  garage: 3,
  lat: 33.4942,
  lng: -111.9261
},
{
  id: 11,
  title: 'Retail Corner — Midtown',
  address: '2200 Broadway Ave',
  city: 'Nashville',
  state: 'TN',
  price: 8500,
  priceDisplay: '$8,500/mo',
  type: 'commercial',
  propertyType: 'Retail',
  beds: 0,
  baths: 2,
  sqft: 3200,
  images: [
  { src: "https://img.rocket.new/generatedImages/rocket_gen_img_12a638202-1766959266777.png", alt: 'Modern retail storefront on busy street corner, bright daylight, high foot traffic location' }],

  badge: 'Commercial',
  yearBuilt: 2005,
  garage: 10,
  lat: 36.1627,
  lng: -86.7816
},
{
  id: 12,
  title: 'The Meridian — 2BR',
  address: '900 Meridian Blvd #410',
  city: 'San Francisco',
  state: 'CA',
  price: 6500,
  priceDisplay: '$6,500/mo',
  type: 'rent',
  propertyType: 'Apartment',
  beds: 2,
  baths: 2,
  sqft: 1380,
  images: [
  { src: "https://img.rocket.new/generatedImages/rocket_gen_img_1275a6411-1772132423753.png", alt: 'Contemporary San Francisco apartment with bay views, bright airy interior, modern finishes' }],

  badge: 'Rent',
  yearBuilt: 2020,
  garage: 1,
  lat: 37.7749,
  lng: -122.4194
}];


type SortOption = 'price-asc' | 'price-desc' | 'newest' | 'sqft-desc';
type ViewMode = 'grid' | 'map';

// Image gallery mini-slider
function PropertyImageSlider({ images, title }: {images: {src: string;alt: string;}[];title: string;}) {
  const [current, setCurrent] = useState(0);
  const [saved, setSaved] = useState(false);

  return (
    <div className="relative h-56 overflow-hidden group/img">
      <AppImage
        src={images[current].src}
        alt={images[current].alt}
        fill
        className="object-cover property-card-image transition-all duration-500"
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" />
      
      <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent to-transparent" />

      {/* Navigation arrows — show on hover */}
      {images.length > 1 &&
      <>
          <button
          onClick={(e) => {e.preventDefault();e.stopPropagation();setCurrent((c) => (c - 1 + images.length) % images.length);}}
          className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/80 flex items-center justify-center opacity-0 group-hover/img:opacity-100 transition-opacity hover:bg-white">
          
            <Icon name="ChevronLeftIcon" size={16} className="text-foreground" />
          </button>
          <button
          onClick={(e) => {e.preventDefault();e.stopPropagation();setCurrent((c) => (c + 1) % images.length);}}
          className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/80 flex items-center justify-center opacity-0 group-hover/img:opacity-100 transition-opacity hover:bg-white">
          
            <Icon name="ChevronRightIcon" size={16} className="text-foreground" />
          </button>
          {/* Dots */}
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1">
            {images.map((_, i) =>
          <button
            key={i}
            onClick={(e) => {e.preventDefault();e.stopPropagation();setCurrent(i);}}
            className={`rounded-full transition-all ${i === current ? 'w-4 h-1.5 bg-white' : 'w-1.5 h-1.5 bg-white/50'}`} />

          )}
          </div>
        </>
      }

      {/* Save button */}
      <button
        onClick={(e) => {e.preventDefault();e.stopPropagation();setSaved(!saved);}}
        className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/80 flex items-center justify-center hover:bg-white transition-colors">
        
        <Icon name="HeartIcon" size={16} className={saved ? 'text-red-500' : 'text-foreground-muted'} variant={saved ? 'solid' : 'outline'} />
      </button>
    </div>);

}

// Map view pin
function MapPin({ property, active, onClick }: {property: Property;active: boolean;onClick: () => void;}) {
  return (
    <button
      onClick={onClick}
      className={`absolute transition-all duration-200 ${active ? 'z-20 scale-110' : 'z-10 hover:scale-105'}`}
      style={{
        left: `${(property.lng + 130) / 80 * 100}%`,
        top: `${(50 - property.lat) / 35 * 100}%`,
        transform: 'translate(-50%, -100%)'
      }}>
      
      <div className={`px-2.5 py-1.5 rounded-xl text-xs font-bold shadow-lg border-2 transition-all ${
      active ? 'bg-primary text-white border-primary scale-110' : 'bg-white text-foreground border-white hover:border-primary hover:text-primary'}`
      }>
        {property.type === 'rent' ? property.priceDisplay.split('/')[0] : property.priceDisplay.replace('$', '$').split(',')[0] + (property.priceDisplay.includes(',') ? 'K+' : '')}
      </div>
    </button>);

}

export default function PropertyListingsClient() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeType, setActiveType] = useState<'all' | 'sale' | 'rent' | 'commercial' | 'investment'>('all');
  const [sortBy, setSortBy] = useState<SortOption>('price-desc');
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [priceMax, setPriceMax] = useState(6000000);
  const [bedsMin, setBedsMin] = useState(0);
  const [propertyTypeFilter, setPropertyTypeFilter] = useState('all');
  const [activeMapPin, setActiveMapPin] = useState<number | null>(null);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [page, setPage] = useState(1);
  const ITEMS_PER_PAGE = 9;

  const typeFilters = [
  { value: 'all', label: 'All' },
  { value: 'sale', label: 'For Sale' },
  { value: 'rent', label: 'For Rent' },
  { value: 'commercial', label: 'Commercial' },
  { value: 'investment', label: 'Investment' }];


  const propertyTypes = ['all', 'House', 'Condo', 'Apartment', 'Townhouse', 'Penthouse', 'Studio', 'Office', 'Retail', 'Multi-Family'];

  const bedOptions = [0, 1, 2, 3, 4, 5];

  const filtered = allProperties.
  filter((p) => {
    if (activeType !== 'all' && p.type !== activeType) return false;
    if (propertyTypeFilter !== 'all' && p.propertyType !== propertyTypeFilter) return false;
    if (bedsMin > 0 && p.beds < bedsMin) return false;
    if (activeType !== 'rent' && p.type !== 'rent' && p.price > priceMax) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return p.title.toLowerCase().includes(q) || p.city.toLowerCase().includes(q) || p.state.toLowerCase().includes(q) || p.address.toLowerCase().includes(q);
    }
    return true;
  }).
  sort((a, b) => {
    if (sortBy === 'price-asc') return a.price - b.price;
    if (sortBy === 'price-desc') return b.price - a.price;
    if (sortBy === 'newest') return b.yearBuilt - a.yearBuilt;
    if (sortBy === 'sqft-desc') return b.sqft - a.sqft;
    return 0;
  });

  const paginated = filtered.slice(0, page * ITEMS_PER_PAGE);
  const hasMore = paginated.length < filtered.length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-20">
      {/* Page header */}
      <div className="mb-8">
        <h1 className="font-display text-4xl md:text-5xl font-semibold text-foreground mb-2">
          Property Listings
        </h1>
        <p className="text-foreground-muted">
          {filtered.length} properties found across the United States
        </p>
      </div>

      {/* Search + controls bar */}
      <div className="bg-white rounded-2xl border border-border-subtle shadow-sm p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-3">
          {/* Search */}
          <div className="flex-1 relative">
            <Icon name="MagnifyingGlassIcon" size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-foreground-subtle" />
            <input
              type="text"
              placeholder="Search by city, neighborhood, or address..."
              value={searchQuery}
              onChange={(e) => {setSearchQuery(e.target.value);setPage(1);}}
              className="w-full pl-11 pr-4 py-3 rounded-xl border border-border-subtle bg-background text-sm text-foreground form-input" />
            
          </div>

          {/* Sort */}
          <div className="relative">
            <Icon name="BarsArrowDownIcon" size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground-subtle" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="pl-9 pr-8 py-3 rounded-xl border border-border-subtle bg-background text-sm text-foreground form-input appearance-none cursor-pointer min-w-[160px]">
              
              <option value="price-desc">Price: High to Low</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="newest">Newest First</option>
              <option value="sqft-desc">Largest First</option>
            </select>
          </div>

          {/* Filters toggle */}
          <button
            onClick={() => setFiltersOpen(!filtersOpen)}
            className={`flex items-center gap-2 px-4 py-3 rounded-xl border text-sm font-medium transition-all ${
            filtersOpen ? 'bg-primary text-white border-primary' : 'border-border-subtle text-foreground-muted hover:border-primary hover:text-primary'}`
            }>
            
            <Icon name="AdjustmentsHorizontalIcon" size={16} />
            Filters
          </button>

          {/* View toggle */}
          <div className="flex rounded-xl border border-border-subtle overflow-hidden">
            <button
              onClick={() => setViewMode('grid')}
              className={`px-4 py-3 transition-all ${viewMode === 'grid' ? 'bg-primary text-white' : 'text-foreground-muted hover:bg-primary-50'}`}>
              
              <Icon name="Squares2X2Icon" size={18} />
            </button>
            <button
              onClick={() => setViewMode('map')}
              className={`px-4 py-3 transition-all ${viewMode === 'map' ? 'bg-primary text-white' : 'text-foreground-muted hover:bg-primary-50'}`}>
              
              <Icon name="MapIcon" size={18} />
            </button>
          </div>
        </div>

        {/* Expanded filters */}
        {filtersOpen &&
        <div className="mt-4 pt-4 border-t border-border-subtle grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Price range */}
            <div>
              <label className="text-xs font-semibold text-foreground-muted uppercase tracking-wide mb-2 block">
                Max Price: {priceMax >= 6000000 ? 'Any' : `$${(priceMax / 1000000).toFixed(1)}M`}
              </label>
              <input
              type="range"
              min={500000}
              max={6000000}
              step={100000}
              value={priceMax}
              onChange={(e) => setPriceMax(Number(e.target.value))}
              className="w-full" />
            
            </div>

            {/* Property type */}
            <div>
              <label className="text-xs font-semibold text-foreground-muted uppercase tracking-wide mb-2 block">Property Type</label>
              <select
              value={propertyTypeFilter}
              onChange={(e) => setPropertyTypeFilter(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-border-subtle bg-background text-sm form-input">
              
                {propertyTypes.map((t) =>
              <option key={t} value={t}>{t === 'all' ? 'All Types' : t}</option>
              )}
              </select>
            </div>

            {/* Min beds */}
            <div>
              <label className="text-xs font-semibold text-foreground-muted uppercase tracking-wide mb-2 block">Min Bedrooms</label>
              <div className="flex gap-1">
                {bedOptions.map((b) =>
              <button
                key={b}
                onClick={() => setBedsMin(b)}
                className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${
                bedsMin === b ? 'bg-primary text-white' : 'bg-background border border-border-subtle text-foreground-muted hover:border-primary hover:text-primary'}`
                }>
                
                    {b === 0 ? 'Any' : `${b}+`}
                  </button>
              )}
              </div>
            </div>

            {/* Reset */}
            <div className="flex items-end">
              <button
              onClick={() => {setPriceMax(6000000);setBedsMin(0);setPropertyTypeFilter('all');setSearchQuery('');setActiveType('all');setPage(1);}}
              className="w-full py-2 rounded-xl border border-border-subtle text-sm font-medium text-foreground-muted hover:border-primary hover:text-primary transition-all">
              
                Reset All Filters
              </button>
            </div>
          </div>
        }
      </div>

      {/* Type filter chips */}
      <div className="flex flex-wrap gap-2 mb-6">
        {typeFilters.map((t) =>
        <button
          key={t.value}
          onClick={() => {setActiveType(t.value as any);setPage(1);}}
          className={`filter-chip px-4 py-2 rounded-full text-sm font-semibold border transition-all ${
          activeType === t.value ?
          'bg-primary text-white border-primary' : 'bg-white text-foreground-muted border-border-subtle hover:border-primary hover:text-primary'}`
          }>
          
            {t.label}
          </button>
        )}
        <span className="ml-auto text-sm text-foreground-subtle self-center">
          {filtered.length} results
        </span>
      </div>

      {/* Grid or Map view */}
      {viewMode === 'grid' ?
      <>
          {filtered.length === 0 ?
        <div className="text-center py-24">
              <Icon name="HomeIcon" size={48} className="text-border mx-auto mb-4" />
              <h3 className="font-display text-2xl text-foreground mb-2">No properties found</h3>
              <p className="text-foreground-muted">Try adjusting your filters or search terms.</p>
            </div> :

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {paginated.map((property) =>
          <div
            key={property.id}
            className="property-card bg-white rounded-3xl overflow-hidden border border-border-subtle">
            
                  <PropertyImageSlider images={property.images} title={property.title} />
                  <div className="p-5">
                    {/* Badges */}
                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {property.badge &&
                <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                property.badge === 'Luxury' ? 'bg-accent/15 text-accent-dark' :
                property.badge === 'High Yield' ? 'bg-success/15 text-success' :
                property.badge === 'Commercial' ? 'bg-foreground/10 text-foreground-muted' :
                'bg-primary-50 text-primary'}`
                }>
                          {property.badge}
                        </span>
                }
                      <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-background text-foreground-muted border border-border-subtle">
                        {property.propertyType}
                      </span>
                    </div>

                    <h3 className="font-display text-xl font-semibold text-foreground mb-1">{property.title}</h3>
                    <div className="flex items-center gap-1 text-sm text-foreground-muted mb-3">
                      <Icon name="MapPinIcon" size={14} className="text-primary flex-shrink-0" />
                      <span className="truncate">{property.address}, {property.city}, {property.state}</span>
                    </div>

                    {/* Stats row */}
                    <div className="flex items-center gap-4 text-sm text-foreground-muted pb-4 border-b border-border-subtle mb-4">
                      {property.beds > 0 &&
                <span className="flex items-center gap-1.5">
                          <Icon name="HomeIcon" size={14} className="text-primary" />
                          {property.beds} bd
                        </span>
                }
                      <span className="flex items-center gap-1.5">
                        <Icon name="BeakerIcon" size={14} className="text-primary" />
                        {property.baths} ba
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Icon name="ArrowsPointingOutIcon" size={14} className="text-primary" />
                        {property.sqft.toLocaleString()} sqft
                      </span>
                      {property.yearBuilt &&
                <span className="flex items-center gap-1.5 ml-auto text-xs text-foreground-subtle">
                          Built {property.yearBuilt}
                        </span>
                }
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="font-display text-2xl font-bold text-primary">{property.priceDisplay}</div>
                      <Link
                  href="/contact"
                  className="flex items-center gap-1.5 px-4 py-2 bg-primary text-white text-sm font-semibold rounded-xl hover:bg-primary-dark transition-all hover:shadow-blue hover:-translate-y-0.5">
                  
                        Inquire
                        <Icon name="ArrowRightIcon" size={14} />
                      </Link>
                    </div>
                  </div>
                </div>
          )}
            </div>
        }

          {hasMore &&
        <div className="text-center mt-10">
              <button
            onClick={() => setPage((p) => p + 1)}
            className="px-8 py-3 rounded-2xl border-2 border-primary text-primary font-semibold hover:bg-primary hover:text-white transition-all duration-200">
            
                Load More Properties ({filtered.length - paginated.length} remaining)
              </button>
            </div>
        }
        </> : (

      /* Map View */
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-5 min-h-[600px]">
          {/* Map */}
          <div className="lg:col-span-3 rounded-3xl overflow-hidden border border-border-subtle map-container map-grid relative min-h-[500px]">
            {/* Decorative map bg */}
            <div className="absolute inset-0 opacity-30">
              <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                    <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(27,79,216,0.15)" strokeWidth="1" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid)" />
              </svg>
            </div>

            {/* Map header */}
            <div className="absolute top-4 left-4 right-4 z-30 flex items-center justify-between">
              <div className="bg-white/90 backdrop-blur-sm rounded-xl px-4 py-2 text-sm font-medium text-foreground shadow-sm">
                <Icon name="MapPinIcon" size={14} className="inline mr-1 text-primary" />
                United States — {filtered.length} listings
              </div>
              <div className="bg-white/90 backdrop-blur-sm rounded-xl px-3 py-2 text-xs text-foreground-muted shadow-sm">
                Interactive map view
              </div>
            </div>

            {/* Pins */}
            {filtered.map((property) =>
          <MapPin
            key={property.id}
            property={property}
            active={activeMapPin === property.id}
            onClick={() => setActiveMapPin(activeMapPin === property.id ? null : property.id)} />

          )}

            {/* US outline decorative */}
            <div className="absolute inset-0 flex items-center justify-center opacity-10">
              <Icon name="MapIcon" size={200} className="text-primary" />
            </div>

            <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-xl px-3 py-2 text-xs text-foreground-muted">
              Click pins to view property details
            </div>
          </div>

          {/* Map sidebar — property list */}
          <div className="lg:col-span-2 space-y-3 max-h-[600px] overflow-y-auto pr-1">
            <div className="text-sm font-semibold text-foreground-muted mb-2 sticky top-0 bg-background py-2">
              {filtered.length} properties in view
            </div>
            {filtered.map((property) =>
          <div
            key={property.id}
            onClick={() => setActiveMapPin(activeMapPin === property.id ? null : property.id)}
            className={`bg-white rounded-2xl border transition-all cursor-pointer p-3 flex gap-3 ${
            activeMapPin === property.id ?
            'border-primary shadow-md' :
            'border-border-subtle hover:border-primary-200'}`
            }>
            
                <div className="relative w-20 h-20 rounded-xl overflow-hidden flex-shrink-0">
                  <AppImage
                src={property.images[0].src}
                alt={property.images[0].alt}
                fill
                className="object-cover"
                sizes="80px" />
              
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-sm text-foreground truncate">{property.title}</div>
                  <div className="text-xs text-foreground-muted truncate mb-1">{property.city}, {property.state}</div>
                  <div className="font-bold text-primary text-sm">{property.priceDisplay}</div>
                  <div className="flex items-center gap-2 text-xs text-foreground-subtle mt-1">
                    {property.beds > 0 && <span>{property.beds}bd</span>}
                    <span>{property.baths}ba</span>
                    <span>{property.sqft.toLocaleString()}sqft</span>
                  </div>
                </div>
              </div>
          )}
          </div>
        </div>)
      }
    </div>);

}