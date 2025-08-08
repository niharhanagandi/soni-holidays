import type { Handler } from '@netlify/functions';
import { z } from 'zod';
import { appendRow } from '../../src/lib/sheets';
import { sendEmail } from '../../src/lib/email';

const schema = z.object({
  name: z.string(),
  email: z.string().email(),
  phone: z.string(),
  travelDates: z.string().optional(),
  groupType: z.string(),
  destinations: z.string(),
  message: z.string(),
  source: z.string().optional(),
});

export const handler: Handler = async (event) => {
  if (event.httpMethod !== 'POST') return { statusCode: 405, body: 'Method Not Allowed' };
  const body = JSON.parse(event.body || '{}');
  const parsed = schema.safeParse(body);
  if (!parsed.success) return { statusCode: 400, body: JSON.stringify(parsed.error.flatten()) };
  const d = parsed.data;

  const timestamp = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });
  await appendRow('Leads_Contact', {
    timestamp,
    name: d.name,
    email: d.email,
    phone: d.phone,
    travelDates: d.travelDates || '',
    groupType: d.groupType,
    destinations: d.destinations,
    message: d.message,
    source: d.source || 'contact',
  });

  const toAdmin = process.env.EMAIL_TO || 'nihar.hanagandi@gmail.com';
  await sendEmail({
    to: toAdmin,
    subject: `New contact enquiry — ${d.name}`,
    html: `<h2>New enquiry</h2><p><b>Name:</b> ${d.name}</p><p><b>Email:</b> ${d.email}</p><p><b>Phone:</b> ${d.phone}</p><p><b>Travel dates:</b> ${d.travelDates || '-'} </p><p><b>Group type:</b> ${d.groupType}</p><p><b>Destinations:</b> ${d.destinations}</p><p>${d.message}</p>`,
  });
  await sendEmail({
    to: d.email,
    subject: 'Thanks for contacting Soni Holidays',
    html: `<p>Hi ${d.name},</p><p>Thanks for reaching out to Soni Holidays. Our travel specialist will contact you shortly.</p><p>Regards,<br/>Soni Holidays</p>`,
  });

  return { statusCode: 200, body: JSON.stringify({ ok: true }) };
};