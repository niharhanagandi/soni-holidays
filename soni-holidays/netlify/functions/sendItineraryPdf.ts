import type { Handler } from '@netlify/functions';
import { generateItineraryPdf } from '../../src/lib/pdf';
import { getDestinationBySlug } from '../../src/lib/itineraries';

export const handler: Handler = async (event) => {
  const { slug = 'vietnam', name = 'Valued Guest' } = (event.queryStringParameters || {});
  const d = getDestinationBySlug(slug as string);
  if (!d) return { statusCode: 404, body: 'Not found' };
  const pdf = await generateItineraryPdf({ clientName: String(name), destinations: [{ name: d.name, duration: d.duration }], dayByDay: d.dayByDay });
  const b64 = Buffer.from(pdf).toString('base64');
  return { statusCode: 200, headers: { 'Content-Type': 'application/pdf', 'Content-Disposition': `inline; filename=Itinerary-${d.slug}.pdf` }, body: b64, isBase64Encoded: true };
};