/**
 * Business details used everywhere on the site (header, footer, schema, forms).
 * Change a value here once and it updates on every page.
 *
 * Anything marked PLACEHOLDER must be replaced with the client's real,
 * verified information before launch.
 */

/**
 * Production domain, used for canonical URLs, Open Graph, schema, sitemap.xml and robots.txt.
 * Set VITE_SITE_URL in Vercel (e.g. https://www.yourdomain.ca, no trailing slash).
 */
export const SITE_URL = ((import.meta.env?.VITE_SITE_URL as string | undefined) || 'https://avgroupottawa.ca').replace(/\/+$/, ''); // PLACEHOLDER default

export const BUSINESS = {
  name: 'AV Group',
  tagline: 'Grass Cutting, Power Washing, Window & Property Cleaning in Ottawa',

  // PLACEHOLDER: 555 numbers are fictional. Replace both with the real business line.
  phoneDisplay: '(613) 555-0198',
  phoneHref: 'tel:+16135550198',
  phoneSchema: '+1-613-555-0198',

  email: 'contact@avgroupottawa.ca', // PLACEHOLDER: confirm this mailbox exists

  city: 'Ottawa',
  province: 'ON',
  region: 'Ontario',
  // Service-area business: no street address is published on purpose.
  areaLabel: 'Serving Ottawa & surrounding communities',

  hoursDisplay: 'Mon–Sat: 8:00 AM – 6:00 PM',
  hoursSchema: {
    days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    opens: '08:00',
    closes: '18:00',
  },

  // Commercial general liability coverage shown across the site.
  insuranceAmount: '$2M',
  // Leave empty to hide. PLACEHOLDER: e.g. '8+' once confirmed.
  yearsInBusiness: '',

  // Leave empty to hide the related link/button.
  googleBusinessUrl: '', // PLACEHOLDER: Google Business Profile URL
  googleReviewUrl: '', // PLACEHOLDER: "Write a review" short link from Google Business Profile
  social: {
    facebook: '', // PLACEHOLDER
    instagram: '', // PLACEHOLDER
  },

  // Set to true only once the business phone is WhatsApp-enabled.
  whatsappEnabled: false,
};

export const INSURANCE_LINE = `${BUSINESS.insuranceAmount} liability insurance & WSIB coverage`;

/** Communities served. `slug` pages exist only where listed in data/areas.ts. */
export const COMMUNITIES = [
  'Ottawa',
  'Kanata',
  'Nepean',
  'Barrhaven',
  'Orléans',
  'Gloucester',
  'Stittsville',
  'Manotick',
  'Riverside South',
  'Greely',
] as const;

/** Google Analytics 4 measurement ID (VITE_GA_ID). Leave unset to disable analytics. */
export const GA_ID = (import.meta.env?.VITE_GA_ID as string | undefined) ?? '';

/** Google Search Console HTML-tag verification code (VITE_GSC_VERIFICATION). Optional. */
export const GSC_VERIFICATION = (import.meta.env?.VITE_GSC_VERIFICATION as string | undefined) ?? '';
