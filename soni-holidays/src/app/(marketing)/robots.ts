import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const site = process.env.SITE_URL || 'https://soniholidays.in';
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: `${site}/sitemap.xml`,
  };
}