import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 mt-16">
      <div className="container py-10 grid md:grid-cols-4 gap-8">
        <div>
          <div className="flex items-center gap-2 font-semibold mb-3">
            <img src="/logo.png" alt="Soni Holidays" className="h-9 w-9" />
            <span>Soni Holidays</span>
          </div>
          <p className="text-sm text-gray-600">Premium customised tours across India and the world!</p>
        </div>
        <div>
          <h4 className="font-semibold mb-2">Company</h4>
          <ul className="space-y-1 text-sm">
            <li><Link href="/about">About</Link></li>
            <li><Link href="/managing-director">Managing Director</Link></li>
            <li><Link href="/group-tours">Group Tours</Link></li>
            <li><Link href="/blog">Blog</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-2">Legal</h4>
          <ul className="space-y-1 text-sm">
            <li><Link href="/privacy">Privacy</Link></li>
            <li><Link href="/terms">Terms</Link></li>
            <li><Link href="/refunds">Refunds</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-2">Contact</h4>
          <p className="text-sm text-gray-700">Dharwad, Karnataka, India</p>
          <p className="text-sm"><a href="tel:+917892353175">+91 78923 53175</a></p>
          <p className="text-sm"><a href="mailto:nihar.hanagandi@gmail.com">nihar.hanagandi@gmail.com</a></p>
        </div>
      </div>
      <div className="text-center text-xs text-gray-500 py-4 border-t">© {new Date().getFullYear()} Soni Holidays. All rights reserved.</div>
    </footer>
  );
}