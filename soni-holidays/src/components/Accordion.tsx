'use client';
import { useState } from 'react';

export default function Accordion({ items }: { items: { q: string; a: string }[] }) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="divide-y border rounded-2xl">
      {items.map((it, i) => (
        <div key={i}>
          <button
            className="w-full text-left p-4 font-medium"
            aria-expanded={open === i}
            onClick={() => setOpen(open === i ? null : i)}
          >
            {it.q}
          </button>
          {open === i && <div className="p-4 pt-0 text-gray-700">{it.a}</div>}
        </div>
      ))}
    </div>
  );
}