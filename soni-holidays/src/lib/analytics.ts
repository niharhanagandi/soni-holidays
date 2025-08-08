'use client';
import { useEffect } from 'react';
import Plausible from 'plausible-tracker';

export function Analytics() {
  useEffect(() => {
    const domain = process.env.PLAUSIBLE_DOMAIN || 'soniholidays.in';
    const { trackPageview } = Plausible({ domain });
    trackPageview();
  }, []);
  return null;
}