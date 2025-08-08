import { MetadataRoute } from 'next';
import { destinations } from '@/content/destinations';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.SITE_URL || 'https://soniholidays.in';
  const pages: MetadataRoute.Sitemap = [
    '',
    '/about',
    '/managing-director',
    '/contact',
    '/trip-builder',
    '/group-tours',
    '/destinations',
    ...destinations.map((d) => `/destinations/${d.slug}`),
  ].map((p) => ({ url: `${base}${p}`, lastModified: new Date() }));
  return pages;
}