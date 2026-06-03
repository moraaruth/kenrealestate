import React from 'react';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';
import Link from 'next/link';

const contactMethods = [
{
  icon: 'PhoneIcon',
  label: 'Call Us',
  value: '+1 (800) 555-0193',
  sub: 'Mon–Fri, 8am–7pm CT',
  href: 'tel:+18005550193',
  color: 'bg-primary-50 text-primary'
},
{
  icon: 'EnvelopeIcon',
  label: 'Email Us',
  value: 'hello@estatehub.com',
  sub: 'We reply within 2 hours',
  href: 'mailto:hello@estatehub.com',
  color: 'bg-primary-50 text-primary'
},
{
  icon: 'ChatBubbleLeftRightIcon',
  label: 'WhatsApp',
  value: '+1 (800) 555-0194',
  sub: 'Chat with an agent now',
  href: '#',
  color: 'bg-success/10 text-success'
}];


const offices = [
{
  city: 'New York',
  address: '1 World Trade Center, Suite 4200\nNew York, NY 10007',
  phone: '+1 (212) 555-0101'
},
{
  city: 'Los Angeles',
  address: '2049 Century Park East, Suite 1800\nLos Angeles, CA 90067',
  phone: '+1 (310) 555-0142'
},
{
  city: 'Chicago',
  address: '875 N Michigan Ave, Suite 3100\nChicago, IL 60611',
  phone: '+1 (312) 555-0178'
}];


const agents = [
{
  name: 'Marcus Thompson',
  role: 'Residential Specialist',
  location: 'Austin, TX',
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_1c47c67ca-1763301127645.png",
  alt: 'Professional African American male real estate agent in business attire, confident smile, office background',
  deals: '340+ deals closed'
},
{
  name: 'Aisha Patel',
  role: 'Commercial & Investment',
  location: 'New York, NY',
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_159352e9f-1763301725413.png",
  alt: 'Professional South Asian woman in business attire, confident expression, modern office setting',
  deals: '210+ deals closed'
},
{
  name: 'Carlos Rivera',
  role: 'Luxury Properties',
  location: 'Miami, FL',
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_15c79c91c-1763299900597.png",
  alt: 'Professional Hispanic male real estate agent with warm smile, business casual attire, bright office',
  deals: '180+ deals closed'
}];


export default function ContactInfoSection() {
  return (
    <div className="space-y-6">
      {/* Hero image */}
      <div className="relative h-52 rounded-3xl overflow-hidden">
        <AppImage
          src="https://img.rocket.new/generatedImages/rocket_gen_img_1f267e8c7-1773248660583.png"
          alt="Modern EstateHub office interior with blue accents and professional workspace, bright natural light, open floor plan"
          fill
          className="object-cover"
          sizes="(max-width: 1024px) 100vw, 40vw" />
        
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-foreground/20 to-transparent" />
        <div className="absolute bottom-5 left-5">
          <div className="text-white font-display text-xl font-semibold">Our Offices</div>
          <div className="text-white/70 text-sm">Serving clients across 28 states</div>
        </div>
      </div>

      {/* Contact methods */}
      <div className="bg-white rounded-3xl border border-border-subtle p-5 space-y-3">
        <h3 className="font-semibold text-foreground mb-4">Get in touch directly</h3>
        {contactMethods.map((method) =>
        <a
          key={method.label}
          href={method.href}
          className="flex items-center gap-4 p-3 rounded-2xl hover:bg-background transition-colors group">
          
            <div className={`w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 ${method.color}`}>
              <Icon name={method.icon as any} size={20} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-xs text-foreground-subtle mb-0.5">{method.label}</div>
              <div className="font-semibold text-foreground text-sm group-hover:text-primary transition-colors">{method.value}</div>
              <div className="text-xs text-foreground-subtle">{method.sub}</div>
            </div>
            <Icon name="ArrowRightIcon" size={14} className="text-foreground-subtle group-hover:text-primary group-hover:translate-x-0.5 transition-all flex-shrink-0" />
          </a>
        )}
      </div>

      {/* Office locations */}
      <div className="bg-white rounded-3xl border border-border-subtle p-5">
        <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
          <Icon name="MapPinIcon" size={16} className="text-primary" />
          Office Locations
        </h3>
        <div className="space-y-4">
          {offices.map((office) =>
          <div key={office.city} className="flex gap-3 pb-4 border-b border-border-subtle last:border-0 last:pb-0">
              <div className="w-8 h-8 rounded-lg bg-primary-50 flex items-center justify-center flex-shrink-0 mt-0.5">
                <Icon name="BuildingOfficeIcon" size={14} className="text-primary" />
              </div>
              <div>
                <div className="font-semibold text-sm text-foreground">{office.city}</div>
                <div className="text-xs text-foreground-muted whitespace-pre-line mt-0.5">{office.address}</div>
                <a href={`tel:${office.phone.replace(/\D/g, '')}`} className="text-xs text-primary hover:underline mt-1 block">
                  {office.phone}
                </a>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Featured agents */}
      <div className="bg-white rounded-3xl border border-border-subtle p-5">
        <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
          <Icon name="UsersIcon" size={16} className="text-primary" />
          Meet Our Agents
        </h3>
        <div className="space-y-3">
          {agents.map((agent) =>
          <div key={agent.name} className="flex items-center gap-3 p-2 rounded-2xl hover:bg-background transition-colors">
              <div className="relative w-12 h-12 rounded-xl overflow-hidden flex-shrink-0">
                <AppImage
                src={agent.image}
                alt={agent.alt}
                fill
                className="object-cover"
                sizes="48px" />
              
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-semibold text-sm text-foreground">{agent.name}</div>
                <div className="text-xs text-foreground-muted">{agent.role}</div>
                <div className="flex items-center gap-1 mt-0.5">
                  <Icon name="MapPinIcon" size={10} className="text-foreground-subtle" />
                  <span className="text-xs text-foreground-subtle">{agent.location}</span>
                </div>
              </div>
              <div className="text-right flex-shrink-0">
                <div className="text-xs font-semibold text-success">{agent.deals}</div>
                <Link
                href="/contact"
                className="text-xs text-primary hover:underline mt-0.5 block">
                
                  Contact
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Business hours */}
      <div className="bg-gradient-to-br from-primary to-primary-dark rounded-3xl p-5 text-white">
        <h3 className="font-semibold mb-4 flex items-center gap-2">
          <Icon name="ClockIcon" size={16} className="text-white/80" />
          Business Hours
        </h3>
        <div className="space-y-2">
          {[
          { day: 'Monday – Friday', hours: '8:00 AM – 7:00 PM CT' },
          { day: 'Saturday', hours: '9:00 AM – 5:00 PM CT' },
          { day: 'Sunday', hours: '10:00 AM – 3:00 PM CT' }].
          map((item) =>
          <div key={item.day} className="flex justify-between items-center text-sm">
              <span className="text-white/70">{item.day}</span>
              <span className="font-medium">{item.hours}</span>
            </div>
          )}
        </div>
        <div className="mt-4 pt-4 border-t border-white/15 flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
          <span className="text-sm text-white/80">Agents available now</span>
        </div>
      </div>
    </div>);

}