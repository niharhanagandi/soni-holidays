import Gallery from './Gallery';
import FAQ from './FAQ';

export default function DestinationSections({ d }: { d: any }) {
  return (
    <div className="space-y-10">
      <section className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <h2 className="text-2xl font-bold mb-2">Overview</h2>
          <p className="text-gray-700 mb-3">Best time: {d.bestTime}</p>
          <h3 className="font-semibold mb-2">Highlights</h3>
          <ul className="list-disc pl-5 space-y-1 text-gray-700">
            {d.highlights?.map((h: string, i: number) => <li key={i}>{h}</li>)}
          </ul>
        </div>
        <div className="card p-4 h-fit sticky top-24">
          <h3 className="font-semibold mb-2">Quick links</h3>
          <ul className="text-sm space-y-1">
            <li><a href="#itinerary">Itinerary</a></li>
            <li><a href="#inclusions">Inclusions</a></li>
            <li><a href="#exclusions">Exclusions</a></li>
            <li><a href="#faqs">FAQs</a></li>
            <li><a href="#gallery">Gallery</a></li>
          </ul>
          <a href="#enquire" className="btn-primary mt-4 block text-center">Customize this tour</a>
        </div>
      </section>

      <section id="itinerary">
        <h3 className="text-xl font-semibold mb-3">Day‑by‑day Itinerary</h3>
        <ol className="space-y-3">
          {d.dayByDay?.map((day: any) => (
            <li key={day.day} className="card p-4">
              <div className="font-semibold">Day {day.day}: {day.title}</div>
              <div className="text-gray-700">{day.details}</div>
            </li>
          ))}
        </ol>
      </section>

      <section id="inclusions" className="grid md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-xl font-semibold mb-2">Inclusions</h3>
          <ul className="list-disc pl-5 space-y-1 text-gray-700">
            {d.inclusions?.map((x: string, i: number) => <li key={i}>{x}</li>)}
          </ul>
        </div>
        <div id="exclusions">
          <h3 className="text-xl font-semibold mb-2">Exclusions</h3>
          <ul className="list-disc pl-5 space-y-1 text-gray-700">
            {d.exclusions?.map((x: string, i: number) => <li key={i}>{x}</li>)}
          </ul>
        </div>
      </section>

      <section id="faqs">
        <FAQ items={d.faqs || []} />
      </section>

      <section id="gallery">
        <h3 className="text-xl font-semibold mb-3">Gallery</h3>
        <Gallery images={d.gallery || []} />
      </section>

      <section id="enquire" className="bg-gray-50 p-6 rounded-2xl">
        <h3 className="text-xl font-semibold mb-3">Customize this tour</h3>
        <p className="text-gray-700 mb-3">Pricing varies based on dates, group size and hotel category. Request a tailored quote.</p>
        <a href="/trip-builder" className="btn-primary">Request a custom quote</a>
      </section>
    </div>
  );
}