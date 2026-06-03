'use client';

import React, { useState } from 'react';
import Icon from '@/components/ui/AppIcon';

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  interest: string;
  budget: string;
  message: string;
  consent: boolean;
}

interface FormErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  message?: string;
}

const interestOptions = [
  'Buying a Home',
  'Selling a Property',
  'Renting a Property',
  'Investment Property',
  'Commercial Real Estate',
  'Property Valuation',
  'General Inquiry',
];

const budgetOptions = [
  'Under $300,000',
  '$300,000 – $600,000',
  '$600,000 – $1,000,000',
  '$1M – $2M',
  '$2M – $5M',
  '$5M+',
  'Not sure yet',
];

export default function ContactFormSection() {
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    interest: '',
    budget: '',
    message: '',
    consent: false,
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter avalid email address';
    }
    if (!formData.message.trim()) newErrors.message = 'Please tell us how we can help';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    // Mock submit delay — backend connection point
    await new Promise((resolve) => setTimeout(resolve, 1800));
    setSubmitting(false);
    setSubmitted(true);
  };

  const handleChange = (field: keyof FormData, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  if (submitted) {
    return (
      <div className="bg-white rounded-3xl border border-border-subtle shadow-sm p-10 text-center">
        <div className="w-20 h-20 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-6 animate-pulse-ring">
          <Icon name="CheckCircleIcon" size={40} className="text-success" variant="solid" />
        </div>
        <h2 className="font-display text-3xl font-semibold text-foreground mb-3">
          Message Received!
        </h2>
        <p className="text-foreground-muted mb-2 text-lg">
          Thank you for reaching out, <strong>{formData.firstName}</strong>.
        </p>
        <p className="text-foreground-muted mb-8">
          One of our agents will contact you within <strong>2 business hours</strong>. Check your inbox at <strong>{formData.email}</strong> for a confirmation.
        </p>
        <div className="bg-primary-50 rounded-2xl p-5 mb-8 text-left">
          <div className="text-sm font-semibold text-primary mb-3">Your inquiry summary</div>
          <div className="space-y-2 text-sm text-foreground-muted">
            {formData.interest && <div className="flex gap-2"><span className="text-foreground font-medium">Interest:</span>{formData.interest}</div>}
            {formData.budget && <div className="flex gap-2"><span className="text-foreground font-medium">Budget:</span>{formData.budget}</div>}
            <div className="flex gap-2"><span className="text-foreground font-medium">Message:</span><span className="line-clamp-2">{formData.message}</span></div>
          </div>
        </div>
        <button
          onClick={() => { setSubmitted(false); setFormData({ firstName: '', lastName: '', email: '', phone: '', interest: '', budget: '', message: '', consent: false }); }}
          className="px-6 py-3 rounded-xl border-2 border-primary text-primary font-semibold hover:bg-primary hover:text-white transition-all"
        >
          Submit Another Inquiry
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl border border-border-subtle shadow-sm p-6 md:p-8">
      <div className="mb-7">
        <h2 className="font-display text-2xl font-semibold text-foreground mb-1">Send us a message</h2>
        <p className="text-sm text-foreground-muted">We typically respond within 2 business hours.</p>
      </div>

      <form onSubmit={handleSubmit} noValidate className="space-y-5">
        {/* Name row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5" htmlFor="firstName">
              First Name <span className="text-red-400">*</span>
            </label>
            <input
              id="firstName"
              type="text"
              value={formData.firstName}
              onChange={(e) => handleChange('firstName', e.target.value)}
              placeholder="Priya"
              className={`w-full px-4 py-3 rounded-xl border text-sm text-foreground bg-background form-input ${
                errors.firstName ? 'border-red-300 focus:border-red-400' : 'border-border-subtle'
              }`}
            />
            {errors.firstName && (
              <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                <Icon name="ExclamationCircleIcon" size={12} />
                {errors.firstName}
              </p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5" htmlFor="lastName">
              Last Name <span className="text-red-400">*</span>
            </label>
            <input
              id="lastName"
              type="text"
              value={formData.lastName}
              onChange={(e) => handleChange('lastName', e.target.value)}
              placeholder="Nair"
              className={`w-full px-4 py-3 rounded-xl border text-sm text-foreground bg-background form-input ${
                errors.lastName ? 'border-red-300 focus:border-red-400' : 'border-border-subtle'
              }`}
            />
            {errors.lastName && (
              <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                <Icon name="ExclamationCircleIcon" size={12} />
                {errors.lastName}
              </p>
            )}
          </div>
        </div>

        {/* Email + Phone */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5" htmlFor="email">
              Email Address <span className="text-red-400">*</span>
            </label>
            <div className="relative">
              <Icon name="EnvelopeIcon" size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-foreground-subtle" />
              <input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleChange('email', e.target.value)}
                placeholder="priya@example.com"
                className={`w-full pl-11 pr-4 py-3 rounded-xl border text-sm text-foreground bg-background form-input ${
                  errors.email ? 'border-red-300 focus:border-red-400' : 'border-border-subtle'
                }`}
              />
            </div>
            {errors.email && (
              <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                <Icon name="ExclamationCircleIcon" size={12} />
                {errors.email}
              </p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5" htmlFor="phone">
              Phone Number
            </label>
            <div className="relative">
              <Icon name="PhoneIcon" size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-foreground-subtle" />
              <input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => handleChange('phone', e.target.value)}
                placeholder="(512) 555-0182"
                className="w-full pl-11 pr-4 py-3 rounded-xl border border-border-subtle text-sm text-foreground bg-background form-input"
              />
            </div>
          </div>
        </div>

        {/* Interest + Budget */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5" htmlFor="interest">
              I&apos;m interested in
            </label>
            <div className="relative">
              <Icon name="HomeIcon" size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-foreground-subtle pointer-events-none" />
              <select
                id="interest"
                value={formData.interest}
                onChange={(e) => handleChange('interest', e.target.value)}
                className="w-full pl-11 pr-8 py-3 rounded-xl border border-border-subtle text-sm text-foreground bg-background form-input appearance-none cursor-pointer"
              >
                <option value="">Select an option</option>
                {interestOptions.map((opt) => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5" htmlFor="budget">
              Budget range
            </label>
            <div className="relative">
              <Icon name="CurrencyDollarIcon" size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-foreground-subtle pointer-events-none" />
              <select
                id="budget"
                value={formData.budget}
                onChange={(e) => handleChange('budget', e.target.value)}
                className="w-full pl-11 pr-8 py-3 rounded-xl border border-border-subtle text-sm text-foreground bg-background form-input appearance-none cursor-pointer"
              >
                <option value="">Select a range</option>
                {budgetOptions.map((opt) => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Message */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-1.5" htmlFor="message">
            How can we help? <span className="text-red-400">*</span>
          </label>
          <textarea
            id="message"
            rows={5}
            value={formData.message}
            onChange={(e) => handleChange('message', e.target.value)}
            placeholder="Tell us about the property you're looking for — location, size, must-haves, timeline..."
            className={`w-full px-4 py-3 rounded-xl border text-sm text-foreground bg-background form-input resize-none ${
              errors.message ? 'border-red-300 focus:border-red-400' : 'border-border-subtle'
            }`}
          />
          {errors.message && (
            <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
              <Icon name="ExclamationCircleIcon" size={12} />
              {errors.message}
            </p>
          )}
          <div className="mt-1 text-xs text-foreground-subtle text-right">{formData.message.length} characters</div>
        </div>

        {/* Consent */}
        <label className="flex items-start gap-3 cursor-pointer group">
          <div className="relative mt-0.5 flex-shrink-0">
            <input
              type="checkbox"
              checked={formData.consent}
              onChange={(e) => handleChange('consent', e.target.checked)}
              className="sr-only"
            />
            <div
              className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all ${
                formData.consent ? 'bg-primary border-primary' : 'border-border group-hover:border-primary-200'
              }`}
            >
              {formData.consent && <Icon name="CheckIcon" size={12} className="text-white" />}
            </div>
          </div>
          <span className="text-sm text-foreground-muted leading-relaxed">
            I agree to be contacted by EstateHub agents regarding my inquiry. I understand I can opt out at any time. View our{' '}
            <a href="#" className="text-primary hover:underline">Privacy Policy</a>.
          </span>
        </label>

        {/* Submit */}
        <button
          type="submit"
          disabled={submitting}
          className={`w-full py-4 rounded-2xl text-base font-semibold transition-all duration-200 flex items-center justify-center gap-2 ${
            submitting
              ? 'bg-primary/70 text-white cursor-not-allowed' :'bg-primary text-white hover:bg-primary-dark hover:shadow-blue hover:-translate-y-0.5'
          }`}
        >
          {submitting ? (
            <>
              <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Sending your message...
            </>
          ) : (
            <>
              <Icon name="PaperAirplaneIcon" size={18} />
              Send Message
            </>
          )}
        </button>
      </form>
    </div>
  );
}