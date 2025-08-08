import { DefaultSeoProps } from 'next-seo';

export const defaultSEO: DefaultSeoProps = {
  titleTemplate: '%s | Soni Holidays',
  defaultTitle: 'Soni Holidays',
  description: 'Premium customised tours across India and the world!',
  openGraph: {
    type: 'website',
    siteName: 'Soni Holidays',
  },
  twitter: { cardType: 'summary_large_image' },
  additionalLinkTags: [
    { rel: 'icon', href: '/logo.png' },
  ],
};