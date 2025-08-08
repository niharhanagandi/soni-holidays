export default function AboutPage() {
  return (
    <div className="container py-12 space-y-6">
      <h1 className="text-3xl font-bold">About Soni Holidays</h1>
      <p className="text-gray-700 max-w-3xl">
        Soni Holidays crafts premium, customised tours with a focus on comfort, culture and
        seamless planning. We specialise in student, corporate and family travel, and operate out of
        Dharwad, Karnataka.
      </p>
      <h2 className="text-xl font-semibold">Responsible Travel</h2>
      <p className="text-gray-700 max-w-3xl">We promote responsible tourism—supporting local communities, minimising waste, and respecting culture and nature.</p>
      <h2 className="text-xl font-semibold">Why travel with us?</h2>
      <ul className="list-disc pl-5 space-y-1 text-gray-700">
        <li>Tailor‑made itineraries designed by experts</li>
        <li>Handpicked hotels across categories</li>
        <li>Trusted local guides and safe transport</li>
        <li>Transparent pricing and responsive support</li>
      </ul>
    </div>
  );
}