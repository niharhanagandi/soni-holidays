const items = [
  {
    name: 'Shreya Kulkarni',
    text: 'Our college trip to Kerala was flawlessly planned. Comfortable hotels, punctual transport, and an engaging itinerary. Highly recommend Soni Holidays!',
  },
  {
    name: 'Prakash & Family',
    text: 'Rajasthan family tour was premium without being fussy. The team accommodated our senior citizens perfectly.',
  },
  {
    name: 'Amit (HR, TechCorp)',
    text: 'Corporate offsite in Goa executed end‑to‑end. Great venues, smooth logistics, and excellent value.',
  },
];

export default function Testimonials() {
  return (
    <section className="bg-gray-50 py-16">
      <div className="container">
        <h2 className="text-2xl font-bold mb-6">What our travelers say</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {items.map((t) => (
            <figure key={t.name} className="card p-6">
              <blockquote className="text-gray-700">“{t.text}”</blockquote>
              <figcaption className="mt-3 font-semibold">— {t.name}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

