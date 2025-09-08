import { NextResponse } from 'next/server';
import { z } from 'zod';
import { createServerSupabase } from '@/lib/supabase-server';
import { appendRow } from '@/lib/sheets';
import { sendEmail } from '@/lib/email';

export const runtime = 'nodejs';

const LeadSchema = z.object({
  source_page: z.string().optional(),
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional(),
  trip_type: z.string().optional(),
  destination: z.string().optional(),
  start_date: z.string().optional(),
  end_date: z.string().optional(),
  budget: z.string().optional(),
  group_size: z.number().optional(),
  pace: z.string().optional(),
  notes: z.string().optional(),
});

export async function POST(req: Request) {
  try {
    const json = await req.json();
    const parse = LeadSchema.safeParse(json);
    if (!parse.success) {
      return NextResponse.json({ ok: false, error: parse.error.flatten() }, { status: 400 });
    }
    const data = parse.data;

    // 1) Save to Supabase
    try {
      const supabase = createServerSupabase();
      await supabase.from('leads').insert({
        source_page: data.source_page || 'unknown',
        name: data.name,
        email: data.email,
        phone: data.phone || '',
        trip_type: data.trip_type || '',
        destination: data.destination || '',
        start_date: data.start_date || '',
        end_date: data.end_date || '',
        budget: data.budget || '',
        group_size: data.group_size || null,
        pace: data.pace || '',
        notes: data.notes || '',
      } as any);
    } catch (err) {
      console.error('[leads] Supabase error', err);
    }

    // 2) Send Email
    try {
      const to = process.env.CONTACT_EMAIL || 'nihar.hanagandi@gmail.com';
      const subject = 'New Tour Enquiry – Soni Holidays';
      const html = `
        <h2>New enquiry</h2>
        <p><strong>Name:</strong> ${data.name}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Phone:</strong> ${data.phone || ''}</p>
        <p><strong>Trip Type:</strong> ${data.trip_type || ''}</p>
        <p><strong>Destination:</strong> ${data.destination || ''}</p>
        <p><strong>Dates:</strong> ${data.start_date || ''} – ${data.end_date || ''}</p>
        <p><strong>Budget:</strong> ${data.budget || ''}</p>
        <p><strong>Group size:</strong> ${data.group_size || ''}</p>
        <p><strong>Pace:</strong> ${data.pace || ''}</p>
        <p><strong>Notes:</strong> ${data.notes || ''}</p>
      `;
      await sendEmail({ to, subject, html });
    } catch (err) {
      console.error('[leads] Email error', err);
    }

    // 3) Google Sheets logging
    await appendRow('Leads', {
      source_page: data.source_page || 'unknown',
      name: data.name,
      email: data.email,
      phone: data.phone || '',
      trip_type: data.trip_type || '',
      destination: data.destination || '',
      start_date: data.start_date || '',
      end_date: data.end_date || '',
      budget: data.budget || '',
      group_size: data.group_size || '',
      pace: data.pace || '',
      notes: data.notes || '',
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('[leads] Unexpected error', err);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}

