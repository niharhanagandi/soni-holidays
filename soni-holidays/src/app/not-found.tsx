import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="container py-24 text-center space-y-4">
      <h1 className="text-4xl font-bold">Page not found</h1>
      <p className="text-gray-600">The page you are looking for doesn’t exist.</p>
      <div className="flex gap-3 justify-center">
        <Link className="btn-primary" href="/">Back to Home</Link>
        <Link className="btn-outline" href="/destinations">Explore Destinations</Link>
      </div>
    </div>
  );
}