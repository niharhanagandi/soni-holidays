import ContactForm from '@/components/ContactForm';

export default function ContactPage() {
  return (
    <div className="container py-12 grid md:grid-cols-2 gap-10">
      <div>
        <h1 className="text-3xl font-bold mb-3">Contact</h1>
        <p className="text-gray-700 mb-6">We usually respond within a few hours. For urgent queries, call +91 78923 53175.</p>
        <ContactForm />
      </div>
      <div>
        <iframe
          title="Map"
          className="w-full h-96 rounded-2xl border"
          src="https://www.google.com/maps?q=Dharwad%2C%20Karnataka&output=embed"
        />
        <div className="mt-4 text-sm text-gray-600">Or WhatsApp us at <a href="https://wa.me/917892353175" className="underline">+91 78923 53175</a>.</div>
      </div>
    </div>
  );
}