import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import '@/app/(marketing)/globals.css';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Analytics } from '@/lib/analytics';
import CookieNotice from '@/app/(marketing)/cookie-notice';

const inter = Inter({ subsets: ['latin'] });
const playfair = Playfair_Display({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Soni Holidays — Premium customised tours across India and the world!',
  description:
    'Soni Holidays designs premium, fully-customised tours for students, corporates, and families across India and the world. Elegant service, seamless experiences.',
  openGraph: {
    title: 'Soni Holidays',
    description: 'Premium customised tours across India and the world!',
    type: 'website',
    images: [{ url: '/logo.png' }],
  },
  metadataBase: new URL(process.env.SITE_URL || 'http://localhost:3000'),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const tidioKey = process.env.TIDIO_PUBLIC_KEY || 'YOUR_TIDIO_KEY';
  return (
    <html lang="en">
      <body className={inter.className}>
        <Analytics />
        <Header />
        <main>{children}</main>
        <Footer />
        <a
          href="https://wa.me/917892353175"
          aria-label="WhatsApp"
          className="fixed bottom-5 right-5 z-40 rounded-full bg-green-500 text-white px-4 py-3 shadow-lg"
        >
          WhatsApp
        </a>
        <CookieNotice />
        {/* Tidio opt-in via env */}
        {process.env.NEXT_PUBLIC_TIDIO_SNIPPET && (
          <script
            dangerouslySetInnerHTML={{ __html: process.env.NEXT_PUBLIC_TIDIO_SNIPPET as string }}
          />
        )}
      </body>
    </html>
  );
}