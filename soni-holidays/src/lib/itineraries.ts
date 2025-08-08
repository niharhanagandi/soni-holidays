import manali from '@/content/destinations/manali.json';
import delhiAgra from '@/content/destinations/delhi-agra.json';
import rajasthan from '@/content/destinations/rajasthan.json';
import gujarat from '@/content/destinations/gujarat.json';
import kashmir from '@/content/destinations/kashmir.json';
import kerala from '@/content/destinations/kerala.json';
import goa from '@/content/destinations/goa.json';
import dubai from '@/content/destinations/dubai.json';
import singapore from '@/content/destinations/singapore.json';
import malaysia from '@/content/destinations/malaysia.json';
import thailand from '@/content/destinations/thailand.json';
import bali from '@/content/destinations/bali.json';
import vietnam from '@/content/destinations/vietnam.json';
import srilanka from '@/content/destinations/sri-lanka.json';

export const destinations = [
  manali,
  delhiAgra,
  rajasthan,
  gujarat,
  kashmir,
  kerala,
  goa,
  dubai,
  singapore,
  malaysia,
  thailand,
  bali,
  vietnam,
  srilanka,
];

export function getDestinationBySlug(slug: string) {
  return destinations.find((d) => d.slug === slug);
}