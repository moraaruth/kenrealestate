import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  return [
    {
      url: `${baseUrl}/homepage`,
      lastModified: new Date('2026-04-17'),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/property-listings`,
      lastModified: new Date('2026-04-17'),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date('2026-04-17'),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
  ];
}