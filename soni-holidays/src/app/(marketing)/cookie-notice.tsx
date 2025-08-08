'use client';
import { useEffect, useState } from 'react';

export default function CookieNotice() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    if (!localStorage.getItem('cookie-ok')) setShow(true);
  }, []);
  if (!show) return null;
  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-1/2 md:-translate-x-1/2 z-50 card p-4 flex items-center justify-between">
      <p className="text-sm text-gray-700">We use cookies for analytics to improve your experience.</p>
      <button className="btn-primary" onClick={() => { localStorage.setItem('cookie-ok', '1'); setShow(false); }}>OK</button>
    </div>
  );
}