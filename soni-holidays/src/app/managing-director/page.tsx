export default function MDPage() {
  return (
    <div className="container py-12 grid md:grid-cols-3 gap-10">
      <div className="md:col-span-2 space-y-4">
        <h1 className="text-3xl font-bold mb-2">About the Managing Director</h1>
        <p className="text-gray-700">
          Basavaraj is an alumnus of Sainik School Bijapur, holds an MBA from Kousali Institute of
          Management, Dharwad, and is currently pursuing a PhD in Management and Tourism at the same
          institute. Formerly at Reliance Petroleum and President of Karnataka Adventure Club in the
          1990s, he brings decades of experience and a deep passion for travel.
        </p>
      </div>
      <aside className="card p-6 h-fit">
        <h3 className="font-semibold mb-2">Contact</h3>
        <p className="text-sm">Phone: <a href="tel:+917892353175">+91 78923 53175</a></p>
        <p className="text-sm">Email: <a href="mailto:nihar.hanagandi@gmail.com">nihar.hanagandi@gmail.com</a></p>
      </aside>
    </div>
  );
}