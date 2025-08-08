import fs from 'node:fs';
import path from 'node:path';
import { Resend } from 'resend';
import nodemailer from 'nodemailer';

export type EmailInput = { to: string | string[]; subject: string; html: string; attachments?: { filename: string; content: Buffer | string; contentType?: string; }[] };

export async function sendEmail(input: EmailInput) {
  const from = process.env.EMAIL_FROM || 'Soni Holidays <noreply@soniholidays.in>';
  const replyTo = process.env.CONTACT_EMAIL || 'nihar.hanagandi@gmail.com';
  if (process.env.RESEND_API_KEY) {
    const resend = new Resend(process.env.RESEND_API_KEY);
    await resend.emails.send({ from, reply_to: replyTo, ...input });
    return { ok: true, provider: 'resend' } as const;
  }
  if (process.env.SMTP_HOST) {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT || 587),
      secure: false,
      auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
    });
    await transporter.sendMail({ from, replyTo, ...input });
    return { ok: true, provider: 'smtp' } as const;
  }
  // Local dev fallback: write .eml-like HTML file
  const dir = path.join(process.cwd(), 'public', 'tmp');
  fs.mkdirSync(dir, { recursive: true });
  const file = path.join(dir, `email-${Date.now()}.html`);
  fs.writeFileSync(file, input.html);
  return { ok: true, provider: 'file', file } as const;
}