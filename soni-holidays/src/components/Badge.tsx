export default function Badge({ children }: { children: React.ReactNode }) {
  return <span className="inline-flex items-center rounded-full bg-gray-100 text-gray-700 text-xs px-3 py-1">{children}</span>;
}