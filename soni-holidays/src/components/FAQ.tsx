import Accordion from './Accordion';

export default function FAQ({ items }: { items: { q: string; a: string }[] }) {
  if (!items?.length) return null;
  return (
    <section>
      <h3 className="text-xl font-semibold mb-3">FAQs</h3>
      <Accordion items={items} />
    </section>
  );
}