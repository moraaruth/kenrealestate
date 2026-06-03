import React from 'react';
import Link from 'next/link';
import AppLogo from '@/components/ui/AppLogo';
import Icon from '@/components/ui/AppIcon';

const footerLinks = [
  { label: 'Buy', href: '/property-listings' },
  { label: 'Rent', href: '/property-listings' },
  { label: 'Commercial', href: '/property-listings' },
  { label: 'Invest', href: '/property-listings' },
  { label: 'Contact', href: '/contact' },
];

const socialLinks = [
  { icon: 'GlobeAltIcon', label: 'Twitter', href: '#' },
  { icon: 'BuildingOffice2Icon', label: 'LinkedIn', href: '#' },
  { icon: 'CameraIcon', label: 'Instagram', href: '#' },
];

export default function Footer() {
  return (
    <footer className="border-t border-border-subtle bg-white">
      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          {/* Logo + Links */}
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <Link href="/homepage" className="flex items-center gap-2">
              <AppLogo size={28} />
              <span className="font-display text-base font-semibold text-foreground">EstateHub</span>
            </Link>
            <nav className="flex flex-wrap items-center justify-center gap-1">
              {footerLinks.map((link, i) => (
                <React.Fragment key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm font-medium text-foreground-muted hover:text-foreground transition-colors px-2 py-1 rounded-lg hover:bg-primary-50 min-h-[44px] flex items-center"
                  >
                    {link.label}
                  </Link>
                  {i < footerLinks.length - 1 && (
                    <span className="text-border-subtle hidden sm:block">·</span>
                  )}
                </React.Fragment>
              ))}
            </nav>
          </div>

          {/* Social + Copyright */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              {socialLinks.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="w-9 h-9 rounded-xl border border-border-subtle flex items-center justify-center text-foreground-subtle hover:text-primary hover:border-primary hover:bg-primary-50 transition-all"
                >
                  <Icon name={s.icon as any} size={16} />
                </a>
              ))}
            </div>
            <span className="text-sm text-foreground-subtle">© 2026 EstateHub</span>
          </div>
        </div>

        {/* Legal row */}
        <div className="mt-6 pt-6 border-t border-border-subtle flex flex-wrap items-center justify-center gap-4">
          <Link href="#" className="text-xs text-foreground-subtle hover:text-foreground transition-colors">Privacy Policy</Link>
          <span className="text-border-subtle text-xs">·</span>
          <Link href="#" className="text-xs text-foreground-subtle hover:text-foreground transition-colors">Terms of Service</Link>
          <span className="text-border-subtle text-xs">·</span>
          <Link href="#" className="text-xs text-foreground-subtle hover:text-foreground transition-colors">Fair Housing</Link>
          <span className="text-border-subtle text-xs">·</span>
          <Link href="#" className="text-xs text-foreground-subtle hover:text-foreground transition-colors">Accessibility</Link>
        </div>
      </div>
    </footer>
  );
}