import Card from '@/components/Card';
import Badge from '@/components/Badge';
import { destinations } from '@/content/destinations';

export default function DestinationsPage() {
  const domestic = destinations.filter((d) => d.region === 'Domestic');
  const international = destinations.filter((d) => d.region === 'International');
  return (
    <div className="container py-12 space-y-10">
      <section>
        <h1 className="text-3xl font-bold mb-6">Destinations</h1>
        <div className="flex gap-3 mb-6">
          <Badge>Domestic</Badge>
          <Badge>International</Badge>
          <Badge>4–7 days</Badge>
        </div>
        <h2 className="text-xl font-semibold mb-3">Trending in India</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {domestic.map((d) => (
            <Card key={d.slug} title={`${d.name} (${d.duration})`} description={d.highlights.slice(0,2).join(' • ')} image={d.gallery?.[0]} href={`/destinations/${d.slug}`} badge="Domestic" />
          ))}
        </div>
        <h2 className="text-xl font-semibold mb-3">International Picks</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {international.map((d) => (
            <Card key={d.slug} title={`${d.name} (${d.duration})`} description={d.highlights.slice(0,2).join(' • ')} image={d.gallery?.[0]} href={`/destinations/${d.slug}`} badge="International" />
          ))}
        </div>
      </section>
    </div>
  );
}