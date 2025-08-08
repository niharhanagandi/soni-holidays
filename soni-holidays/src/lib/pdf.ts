import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';

export async function generateItineraryPdf(opts: {
  clientName: string;
  destinations: { name: string; duration?: string }[];
  dayByDay: { day: number; title: string; details: string }[];
}): Promise<Uint8Array> {
  const doc = await PDFDocument.create();
  const font = await doc.embedFont(StandardFonts.Helvetica);
  const page = doc.addPage([595.28, 841.89]);
  const { width, height } = page.getSize();
  page.drawRectangle({ x: 0, y: height - 120, width, height: 120, color: rgb(0.055, 0.227, 0.357) });
  page.drawText('Soni Holidays', { x: 40, y: height - 60, size: 28, font, color: rgb(1,1,1) });
  page.drawText('Premium customised tours across India and the world!', { x: 40, y: height - 90, size: 12, font, color: rgb(1,1,1) });
  page.drawText(`Specially curated for ${opts.clientName}`, { x: 40, y: height - 150, size: 16, font });
  const destNames = opts.destinations.map((d) => d.name).join(', ');
  page.drawText(`Destinations: ${destNames}`, { x: 40, y: height - 175, size: 12, font });

  let y = height - 210;
  for (const day of opts.dayByDay) {
    const text = `Day ${day.day}: ${day.title} — ${day.details}`;
    page.drawText(text.substring(0, 110), { x: 40, y, size: 11, font });
    y -= 18;
    if (y < 60) {
      doc.addPage();
      y = height - 60;
    }
  }
  return await doc.save();
}