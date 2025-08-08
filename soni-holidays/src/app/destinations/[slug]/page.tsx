import { notFound } from 'next/navigation';
import DestinationSections from '@/components/DestinationSections';
import { getDestinationBySlug } from '@/content/destinations';

export async function generateStaticParams() {
  const { destinations } = await import('@/lib/itineraries');
  return destinations.map((d) => ({ slug: d.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const d = getDestinationBySlug(params.slug);
  return {
    title: `${d?.name} — ${d?.duration}`,
    description: d?.highlights?.slice(0, 3).join(' • ') || 'Premium customised tour',
  };
}

export default function DestinationPage({ params }: { params: { slug: string } }) {
  const d = getDestinationBySlug(params.slug);
  if (!d) return notFound();
  return (
    <div>
      <section className="relative h-72 md:h-96">
        <img src={d.gallery?.[0] || 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1600&auto=format&fit=crop'} alt={d.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-x-0 bottom-6 container text-white">
          <h1 className="text-3xl md:text-4xl font-bold">{d.name} <span className="text-brand-gold text-xl">{d.duration}</span></h1>
          <p className="max-w-2xl text-gray-200">{d.highlights?.slice(0,3).join(' • ')}</p>
        </div>
      </section>
      <section className="container py-10">
        <DestinationSections d={d} />
      </section>
    </div>
  );
}