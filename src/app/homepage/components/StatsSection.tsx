'use client';

import React, { useEffect, useRef, useState } from 'react';
import Icon from '@/components/ui/AppIcon';

interface Stat {
  value: number;
  suffix: string;
  prefix?: string;
  label: string;
  description: string;
  icon: string;
}

const stats: Stat[] = [
  {
    value: 12400,
    suffix: '+',
    label: 'Active Listings',
    description: 'Residential, commercial & investment properties',
    icon: 'HomeIcon',
  },
  {
    value: 2.8,
    suffix: 'B',
    prefix: '$',
    label: 'Total Sales Volume',
    description: 'Closed transactions in 2025 alone',
    icon: 'CurrencyDollarIcon',
  },
  {
    value: 98,
    suffix: '%',
    label: 'Client Satisfaction',
    description: 'Based on 4,200+ verified reviews',
    icon: 'StarIcon',
  },
  {
    value: 340,
    suffix: '+',
    label: 'Expert Agents',
    description: 'Licensed professionals across 28 states',
    icon: 'UsersIcon',
  },
];

function StatCounter({ stat, triggered }: { stat: Stat; triggered: boolean }) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!triggered) return;
    const duration = 1800;
    const startTime = performance.now();
    const endValue = stat.value;

    const step = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCurrent(eased * endValue);
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [triggered, stat.value]);

  const formatted =
    stat.value >= 10000
      ? Math.floor(current).toLocaleString()
      : stat.value % 1 !== 0
      ? current.toFixed(1)
      : Math.floor(current).toString();

  return (
    <span className="stat-number">
      {stat.prefix}{formatted}{stat.suffix}
    </span>
  );
}

export default function StatsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [triggered, setTriggered] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTriggered(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-20 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary-dark to-[#0F2F80]" />
      {/* Blob decorations */}
      <div
        className="absolute -top-20 -right-20 w-80 h-80 bg-primary-light/20 blob-animate"
        style={{ filter: 'blur(40px)' }}
      />
      <div
        className="absolute -bottom-20 -left-20 w-96 h-96 bg-[#3B6EF0]/20 blob-animate"
        style={{ filter: 'blur(50px)', animationDelay: '3s' }}
      />

      {/* Sparkles overlay */}
      <div id="stats-sparkles" className="absolute inset-0 pointer-events-none z-10" />

      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-14">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-8 h-0.5 bg-white/40 rounded-full" />
            <span className="text-sm font-semibold text-white/70 uppercase tracking-widest">By The Numbers</span>
            <div className="w-8 h-0.5 bg-white/40 rounded-full" />
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-semibold text-white leading-tight">
            America's most trusted<br />
            <span className="italic">real estate platform</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className="bg-white/10 backdrop-blur-sm rounded-3xl p-6 border border-white/15 text-center hover:bg-white/15 transition-all duration-300 group"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <div className="w-12 h-12 rounded-2xl bg-white/15 flex items-center justify-center mx-auto mb-4 group-hover:bg-white/25 transition-colors">
                <Icon name={stat.icon as any} size={24} className="text-white" />
              </div>
              <div className="text-4xl md:text-5xl font-bold text-white font-display mb-2">
                <StatCounter stat={stat} triggered={triggered} />
              </div>
              <div className="text-white font-semibold mb-1">{stat.label}</div>
              <div className="text-white/60 text-sm">{stat.description}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}