import type { ServiceId } from './services';

/**
 * REVIEWS: add only real customer reviews (with the customer's permission).
 * The reviews section stays hidden on every page while this list is empty.
 */
export interface Review {
  author: string; // e.g. "Sarah M."
  location: string; // e.g. "Kanata"
  serviceId: ServiceId;
  rating: 1 | 2 | 3 | 4 | 5;
  text: string;
}

export const REVIEWS: Review[] = [];

/**
 * BEFORE / AFTER GALLERY: add real AV Group job photos.
 * Put image files in /public/images/gallery/ and reference them like '/images/gallery/driveway-before.webp'.
 * While `before`/`after` are empty, a clearly labelled placeholder is shown instead.
 */
export interface GalleryItem {
  id: string;
  serviceId: ServiceId;
  title: string;
  location: string;
  before?: string;
  after?: string;
}

export const GALLERY_ITEMS: GalleryItem[] = [
  { id: 'gc-1', serviceId: 'grass-cutting', title: 'Overgrown spring lawn → first cut of the season', location: 'Ottawa' },
  { id: 'gc-2', serviceId: 'grass-cutting', title: 'Ragged edges → crisp edged driveway line', location: 'Ottawa' },
  { id: 'pw-1', serviceId: 'power-washing', title: 'Salt-stained interlock → washed and re-sanded', location: 'Ottawa' },
  { id: 'pw-2', serviceId: 'power-washing', title: 'Green siding → soft-washed siding', location: 'Ottawa' },
  { id: 'wc-1', serviceId: 'window-cleaning', title: 'Hazy spring windows → streak-free glass', location: 'Ottawa' },
  { id: 'wc-2', serviceId: 'window-cleaning', title: 'Storefront fingerprints → spotless entrance', location: 'Ottawa' },
  { id: 'cl-1', serviceId: 'cleaning', title: 'Move-out kitchen → inspection-ready', location: 'Ottawa' },
  { id: 'cl-2', serviceId: 'cleaning', title: 'Office kitchen → cleaned and sanitized', location: 'Ottawa' },
];
