import Link from 'next/link';
import Nav from './Nav';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur border-b border-gray-200">
      <div className="container flex items-center justify-between h-16">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <img src="/logo.png" alt="Soni Holidays logo" className="h-9 w-9 object-contain" />
          <span>Soni Holidays</span>
        </Link>
        <Nav />
        <div className="hidden md:flex items-center gap-3">
          <a href="tel:+917892353175" className="btn-outline">Call</a>
          <Link href="/trip-builder" className="btn-primary">Enquire</Link>
        </div>
      </div>
    </header>
  );
}