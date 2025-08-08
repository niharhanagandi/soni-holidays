import Link from 'next/link';

export default function Card({ title, description, image, href, badge }: { title: string; description?: string; image?: string; href?: string; badge?: string; }) {
  const inner = (
    <div className="card overflow-hidden hover:shadow-md transition">
      {image && (
        <img src={image} alt="" className="h-44 w-full object-cover" />
      )}
      <div className="p-4">
        {badge && <span className="text-xs text-white bg-brand px-2 py-1 rounded">{badge}</span>}
        <h3 className="font-semibold mt-2">{title}</h3>
        {description && <p className="text-sm text-gray-600 mt-1 line-clamp-2">{description}</p>}
      </div>
    </div>
  );
  return href ? (
    <Link href={href as unknown as any} aria-label={title} className="block">{inner}</Link>
  ) : (
    inner
  );
}