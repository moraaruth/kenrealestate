'use client';
/// <reference types="react" />

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import AppLogo from '@/components/ui/AppLogo';
import Icon from '@/components/ui/AppIcon';

interface NavItem {
  label: string;
  href: string;
  children?: { label: string; href: string; description?: string; icon?: string }[];
}

const navItems: NavItem[] = [
  {
    label: 'Buy',
    href: '/property-listings',
    children: [
      { label: 'Houses for Sale', href: '/property-listings', description: 'Single-family homes & estates', icon: 'HomeIcon' },
      { label: 'Condos & Apartments', href: '/property-listings', description: 'Urban living options', icon: 'BuildingOffice2Icon' },
      { label: 'New Construction', href: '/property-listings', description: 'Brand new developments', icon: 'BuildingStorefrontIcon' },
      { label: 'Luxury Properties', href: '/property-listings', description: 'Premium listings $1M+', icon: 'StarIcon' },
    ],
  },
  {
    label: 'Rent',
    href: '/property-listings',
    children: [
      { label: 'Apartments', href: '/property-listings', description: 'Studio to 4BR rentals', icon: 'BuildingOfficeIcon' },
      { label: 'Houses for Rent', href: '/property-listings', description: 'Single & multi-family rentals', icon: 'HomeModernIcon' },
      { label: 'Short-Term Rentals', href: '/property-listings', description: 'Monthly furnished options', icon: 'CalendarDaysIcon' },
    ],
  },
  {
    label: 'Commercial',
    href: '/property-listings',
    children: [
      { label: 'Office Spaces', href: '/property-listings', description: 'Downtown & suburban offices', icon: 'BuildingOffice2Icon' },
      { label: 'Retail Locations', href: '/property-listings', description: 'Storefronts & shopping centers', icon: 'ShoppingBagIcon' },
      { label: 'Industrial', href: '/property-listings', description: 'Warehouses & manufacturing', icon: 'TruckIcon' },
    ],
  },
  {
    label: 'Invest',
    href: '/property-listings',
    children: [
      { label: 'Investment Properties', href: '/property-listings', description: 'High-yield rental assets', icon: 'CurrencyDollarIcon' },
      { label: 'Multi-Family', href: '/property-listings', description: 'Duplexes to apartment buildings', icon: 'HomeModernIcon' },
      { label: 'REITs & Funds', href: '/property-listings', description: 'Diversified real estate investment', icon: 'ChartBarIcon' },
    ],
  },
  { label: 'Agents', href: '/contact' },
  { label: 'Contact', href: '/contact' },
];

interface HeaderProps {
  transparent?: boolean;
}

export default function Header({ transparent = false }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const isTransparent = transparent && !scrolled && !mobileOpen;

  return (
    <>
      <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-400 px-4 py-3`}>
        <nav
          className={`max-w-7xl mx-auto flex items-center justify-between rounded-2xl px-5 py-3 transition-all duration-300 ${
            isTransparent ? 'glass-nav' : 'glass-nav-solid'
          }`}
        >
          {/* Logo */}
          <Link href="/homepage" className="flex items-center gap-2.5 flex-shrink-0">
            <AppLogo size={36} />
            <span
              className={`font-display text-xl font-semibold tracking-tight transition-colors duration-300 ${
                isTransparent ? 'text-white' : 'text-foreground'
              }`}
            >
              EstateHub
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <div key={item.label} className="dropdown-trigger relative">
                {item.children ? (
                  <>
                    <button
                      className={`flex items-center gap-1 px-3 py-2 rounded-xl text-sm font-medium transition-all duration-200 hover:bg-primary-50 ${
                        isTransparent
                          ? 'text-white/90 hover:text-white hover:bg-white/10' :'text-foreground-muted hover:text-foreground'
                      }`}
                    >
                      {item.label}
                      <Icon name="ChevronDownIcon" size={14} className="opacity-60" />
                    </button>
                    <div className="dropdown-menu absolute top-full left-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-border-subtle p-2 z-50">
                      {item.children.map((child) => (
                        <Link
                          key={child.label}
                          href={child.href}
                          className="flex items-start gap-3 px-3 py-2.5 rounded-xl hover:bg-primary-50 transition-colors group"
                        >
                          {child.icon && (
                            <div className="mt-0.5 w-8 h-8 rounded-lg bg-primary-50 flex items-center justify-center flex-shrink-0 group-hover:bg-primary group-hover:text-white transition-colors">
                              <Icon name={child.icon as any} size={16} className="text-primary group-hover:text-white transition-colors" />
                            </div>
                          )}
                          <div>
                            <div className="text-sm font-medium text-foreground">{child.label}</div>
                            {child.description && (
                              <div className="text-xs text-foreground-subtle mt-0.5">{child.description}</div>
                            )}
                          </div>
                        </Link>
                      ))}
                    </div>
                  </>
                ) : (
                  <Link
                    href={item.href}
                    className={`px-3 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                      isTransparent
                        ? 'text-white/90 hover:text-white hover:bg-white/10' :'text-foreground-muted hover:text-foreground hover:bg-primary-50'
                    }`}
                  >
                    {item.label}
                  </Link>
                )}
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <Link
              href="/contact"
              className={`text-sm font-medium px-4 py-2 rounded-xl transition-all duration-200 ${
                isTransparent
                  ? 'text-white/90 hover:text-white hover:bg-white/10' :'text-foreground-muted hover:text-foreground'
              }`}
            >
              Sign In
            </Link>
            <Link
              href="/property-listings"
              className="text-sm font-semibold px-5 py-2.5 rounded-xl bg-primary text-white hover:bg-primary-dark transition-all duration-200 shadow-blue hover:shadow-lg hover:-translate-y-0.5"
            >
              Browse Listings
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className={`lg:hidden p-2 rounded-xl transition-colors ${
              isTransparent ? 'text-white hover:bg-white/10' : 'text-foreground hover:bg-primary-50'
            }`}
            aria-label="Toggle menu"
          >
            {mobileOpen ? (
              <Icon name="XMarkIcon" size={24} />
            ) : (
              <Icon name="Bars3Icon" size={24} />
            )}
          </button>
        </nav>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div
            ref={mobileMenuRef}
            className="lg:hidden mt-2 max-w-7xl mx-auto bg-white rounded-2xl border border-border-subtle shadow-xl overflow-hidden mobile-menu-enter"
          >
            <div className="p-4 space-y-1 max-h-[80vh] overflow-y-auto">
              {navItems.map((item) => (
                <div key={item.label}>
                  {item.children ? (
                    <>
                      <button
                        onClick={() => setMobileExpanded(mobileExpanded === item.label ? null : item.label)}
                        className="w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium text-foreground hover:bg-primary-50 transition-colors"
                      >
                        {item.label}
                        <Icon
                          name="ChevronDownIcon"
                          size={16}
                          className={`transition-transform duration-200 ${mobileExpanded === item.label ? 'rotate-180' : ''}`}
                        />
                      </button>
                      {mobileExpanded === item.label && (
                        <div className="pl-4 space-y-1 pb-2">
                          {item.children.map((child) => (
                            <Link
                              key={child.label}
                              href={child.href}
                              onClick={() => setMobileOpen(false)}
                              className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm text-foreground-muted hover:text-foreground hover:bg-primary-50 transition-colors"
                            >
                              {child.icon && <Icon name={child.icon as any} size={16} className="text-primary" />}
                              {child.label}
                            </Link>
                          ))}
                        </div>
                      )}
                    </>
                  ) : (
                    <Link
                      href={item.href}
                      onClick={() => setMobileOpen(false)}
                      className="block px-4 py-3 rounded-xl text-sm font-medium text-foreground hover:bg-primary-50 transition-colors"
                    >
                      {item.label}
                    </Link>
                  )}
                </div>
              ))}
              <div className="pt-3 border-t border-border-subtle space-y-2">
                <Link
                  href="/contact"
                  onClick={() => setMobileOpen(false)}
                  className="block w-full text-center px-4 py-3 rounded-xl text-sm font-medium text-foreground-muted border border-border-subtle hover:bg-primary-50 transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  href="/property-listings"
                  onClick={() => setMobileOpen(false)}
                  className="block w-full text-center px-4 py-3 rounded-xl text-sm font-semibold bg-primary text-white hover:bg-primary-dark transition-colors"
                >
                  Browse Listings
                </Link>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
}