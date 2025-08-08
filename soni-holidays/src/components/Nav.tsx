import Link from 'next/link';

export default function Nav() {
  return (
    <nav className="hidden md:flex items-center gap-6 text-sm">
      <Link href="/destinations">Destinations</Link>
      <Link href="/group-tours">Group Tours</Link>
      <Link href="/trip-builder">Trip Builder</Link>
      <Link href="/about">About</Link>
      <Link href="/contact">Contact</Link>
    </nav>
  );
}