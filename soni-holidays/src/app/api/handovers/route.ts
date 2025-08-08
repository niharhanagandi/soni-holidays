import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'edge';

export async function POST(req: NextRequest) {
  const data = await req.json();
  const r = await fetch(`${process.env.SITE_URL || ''}/.netlify/functions/submitTripBuilder`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: data.name || 'Guest',
      email: data.email || 'guest@example.com',
      phone: data.phone || '',
      dests: Array.isArray(data.dests) ? data.dests : [data.destination || 'manali'],
      startDate: data.startDate || '',
      nights: Number(data.nights || 5),
      groupSize: Number(data.groupSize || 2),
      budgetRange: data.budgetRange || '',
      hotelCategory: data.hotelCategory || 'Deluxe',
      interests: data.interests || [],
      transport: data.transport || [],
      mealPlan: data.mealPlan || '',
      special: data.special || '',
      source: 'tidio',
    }),
  });
  const ok = r.ok;
  return NextResponse.json({ ok });
}