import { notFound } from 'next/navigation';

const map: Record<string, () => JSX.Element> = {
  'premium-custom-tours': () => (
    <article>
      <h1>How to plan a premium custom tour</h1>
      <p>Designing a personalised trip is easier than you think:</p>
      <ol>
        <li>Define your pace, interests and comfort level.</li>
        <li>Pick a season and a rough duration.</li>
        <li>Share preferences for hotels and transport.</li>
        <li>Leave the logistics to us at Soni Holidays.</li>
      </ol>
      <blockquote>Tip: Start planning 6–8 weeks in advance for the best rates.</blockquote>
    </article>
  ),
  'packing-tips': () => (
    <article>
      <h1>Packing tips for seamless travel</h1>
      <ul>
        <li>Carry light layers and a compact rain jacket.</li>
        <li>Keep medication and essentials in your cabin bag.</li>
        <li>Use packing cubes for organized luggage.</li>
        <li>Always keep digital copies of your IDs and tickets.</li>
      </ul>
    </article>
  ),
};

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const Comp = map[params.slug];
  if (!Comp) return notFound();
  return (
    <div className="container py-12 prose max-w-3xl">
      <Comp />
    </div>
  );
}