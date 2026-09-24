/**
 * Permanent (301) redirects from retired URLs to their replacements.
 * The same list lives in vercel.json (server-side 301s on Vercel). The build fails if the two
 * get out of sync. The app also redirects in the browser as a fallback.
 */
export const REDIRECTS: Record<string, string> = {
  // Old service pages
  '/services/landscaping-ottawa': '/services/grass-cutting-ottawa',
  '/services/residential-cleaning-ottawa': '/services/cleaning-services-ottawa#residential',
  '/services/commercial-cleaning-ottawa': '/services/cleaning-services-ottawa#commercial',
  '/commercial': '/services/cleaning-services-ottawa#commercial',

  // Old area pages
  '/landscaping-barrhaven': '/grass-cutting-barrhaven',
  '/landscaping-stittsville': '/grass-cutting-kanata',
  '/window-cleaning-orleans': '/window-cleaning-ottawa-east',

  // Duplicate contact URL
  '/quote': '/contact',

  // Retired landscaping-focused blog posts
  '/blog/spring-cleanup-checklist-ottawa-homeowners': '/blog/how-often-should-you-cut-your-grass-ottawa',
  '/blog/fall-yard-prep-ottawa-lawn-ready-for-winter': '/blog/how-often-should-you-cut-your-grass-ottawa',
};
