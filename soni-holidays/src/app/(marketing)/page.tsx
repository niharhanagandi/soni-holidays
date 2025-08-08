import Hero from '@/components/Hero';
import Card from '@/components/Card';
import { destinations } from '@/content/destinations';
import Link from 'next/link';

export default function HomePage() {
  const featured = destinations.slice(0, 6);
  return (
    <div>
      <Hero />
      <section className="container py-16">
        <div className="flex items-end justify-between mb-6">
          <h2 className="text-2xl font-bold">Featured Destinations</h2>
          <Link href="/destinations" className="btn-outline">View all</Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map((d) => (
            <Card
              key={d.slug}
              title={`${d.name} (${d.duration})`}
              description={d.highlights.slice(0, 3).join(' • ')}
              image={d.gallery?.[0]}
              href={`/destinations/${d.slug}`}
              badge={d.region}
            />
          ))}
        </div>
      </section>
      <section className="bg-gray-50 py-16">
        <div className="container grid md:grid-cols-3 gap-6">
          <div className="card p-6">
            <h3 className="font-semibold text-lg mb-2">Tailor‑made Premium Tours</h3>
            <p>Crafted to your pace, interests, and comfort with meticulous planning.</p>
          </div>
          <div className="card p-6">
            <h3 className="font-semibold text-lg mb-2">Trusted Expertise</h3>
            <p>Decades of experience curating student, corporate and family trips.</p>
          </div>
          <div className="card p-6">
            <h3 className="font-semibold text-lg mb-2">End‑to‑End Support</h3>
            <p>From enquiry to travel and beyond—our team is with you at every step.</p>
          </div>
        </div>
      </section>
      <section className="container py-16 text-center">
        <h2 className="text-2xl font-bold mb-4">Ready to plan your premium trip?</h2>
        <div className="flex items-center justify-center gap-4">
          <Link className="btn-primary" href="/trip-builder">Plan Your Trip</Link>
          <Link className="btn-outline" href="/contact">Talk to us</Link>
        </div>
      </section>
    </div>
  );
}