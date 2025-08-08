'use client';

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div className="container py-24 text-center space-y-4">
      <h1 className="text-3xl font-bold">Something went wrong</h1>
      <p className="text-gray-600">{error.message}</p>
      <button onClick={reset} className="btn-primary">Try again</button>
    </div>
  );
}