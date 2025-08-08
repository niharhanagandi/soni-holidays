import type { Handler } from '@netlify/functions';
import { z } from 'zod';
import { appendRow } from '../../src/lib/sheets';
import { sendEmail } from '../../src/lib/email';
import { generateItineraryPdf } from '../../src/lib/pdf';
import { destinations as all } from '../../src/lib/itineraries';

const schema = z.object({
  name: z.string(),
  email: z.string().email(),
  phone: z.string(),
  dests: z.array(z.string()),
  startDate: z.string(),
  nights: z.number(),
  groupSize: z.number(),
  budgetRange: z.string(),
  hotelCategory: z.string(),
  interests: z.array(z.string()).optional(),
  transport: z.array(z.string()).optional(),
  mealPlan: z.string().optional(),
  special: z.string().optional(),
  source: z.string().optional(),
});

export const handler: Handler = async (event) => {
  if (event.httpMethod !== 'POST') return { statusCode: 405, body: 'Method Not Allowed' };
  const body = JSON.parse(event.body || '{}');
  const parsed = schema.safeParse(body);
  if (!parsed.success) return { statusCode: 400, body: JSON.stringify(parsed.error.flatten()) };
  const d = parsed.data;

  const timestamp = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });
  await appendRow('Leads_TripBuilder', { timestamp, ...d });

  // Build a suggested plan from first destination
  const chosen = all.filter((x) => d.dests.includes(x.slug));
  const primary = chosen[0] || all[0];
  const pdfBytes = await generateItineraryPdf({
    clientName: d.name,
    destinations: chosen.map((x) => ({ name: x.name, duration: x.duration })),
    dayByDay: primary.dayByDay,
  });

  const attachment = [{ filename: `Itinerary-${primary.slug}.pdf`, content: Buffer.from(pdfBytes), contentType: 'application/pdf' }];

  const adminTo = process.env.EMAIL_TO || 'nihar.hanagandi@gmail.com';
  await sendEmail({ to: adminTo, subject: `Trip request — ${d.name}`, html: `<p>${d.name} requested a custom trip.</p><pre>${JSON.stringify(d, null, 2)}</pre>`, attachments: attachment });
  await sendEmail({ to: d.email, subject: 'Your draft itinerary — Soni Holidays', html: `<p>Hi ${d.name},</p><p>Find attached a draft itinerary based on your preferences. We will refine it together.</p><p>Regards,<br/>Soni Holidays</p>`, attachments: attachment });

  return { statusCode: 200, body: JSON.stringify({ ok: true }) };
};