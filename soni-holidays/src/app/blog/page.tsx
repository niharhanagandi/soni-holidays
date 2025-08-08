import Link from 'next/link';

const posts = [
  { slug: 'premium-custom-tours', title: 'How to plan a premium custom tour', excerpt: 'Simple steps to craft your dream itinerary.' },
  { slug: 'packing-tips', title: 'Packing tips for seamless travel', excerpt: 'What to pack for comfort and style.' },
];

export default function BlogPage() {
  return (
    <div className="container py-12">
      <h1 className="text-3xl font-bold mb-6">Blog</h1>
      <div className="grid md:grid-cols-2 gap-6">
        {posts.map((p) => (
          <Link key={p.slug} href={`/blog/${p.slug}`} className="card p-5 block">
            <h3 className="font-semibold mb-1">{p.title}</h3>
            <p className="text-gray-600 text-sm">{p.excerpt}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}