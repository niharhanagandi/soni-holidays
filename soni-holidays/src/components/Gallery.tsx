export default function Gallery({ images }: { images: string[] }) {
  if (!images?.length) return null;
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
      {images.map((src, i) => (
        <img key={i} src={src} alt="Destination" className="rounded-xl object-cover h-40 w-full" />
      ))}
    </div>
  );
}