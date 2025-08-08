import Link from 'next/link';

export default function Hero() {
  return (
    <section className="container pt-10 pb-16 grid md:grid-cols-2 gap-10">
      <div className="flex flex-col justify-center">
        <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
          Premium customised tours across India and the world!
        </h1>
        <p className="text-lg text-gray-700 mb-6">
          Travel elegantly with Soni Holidays—tailor‑made itineraries, handpicked stays, and
          seamless support.
        </p>
        <div className="flex gap-3">
          <Link href="/trip-builder" className="btn-primary">Plan Your Premium Trip</Link>
          <Link href="/destinations" className="btn-outline">Explore Destinations</Link>
        </div>
      </div>
      <div className="relative h-64 md:h-auto">
        <img
          src="https://images.unsplash.com/photo-1526772662000-3f88f10405ff?q=80&w=1200&auto=format&fit=crop"
          alt="Scenic travel collage"
          className="rounded-2xl w-full h-full object-cover shadow"
        />
      </div>
    </section>
  );
}