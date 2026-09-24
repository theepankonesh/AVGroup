/**
 * PRICING: the single place to change every price on the website.
 *
 * - All prices are "starting from" amounts in Canadian dollars, before HST.
 * - Change a number here and it updates the service pages, /pricing, homepage plans and bundles,
 *   the instant estimator, and the price schema for Google.
 * - Values marked PLACEHOLDER were provided in [brackets] and still need the client's confirmation.
 */

export const CURRENCY = 'CAD';
export const TAX_LABEL = '+ HST';
export const PRICE_DISCLAIMER =
  'Final price confirmed after a free, no-obligation quote. Prices vary by property size, condition, and access.';

/** $50 → "$50", $2.5 → "$2.50", 1375 → "$1,375" */
export const money = (n: number) =>
  `$${Number.isInteger(n) ? n.toLocaleString('en-CA') : n.toLocaleString('en-CA', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

// =====================================================================================
// 1. GRASS CUTTING (per cut, by lawn size)
// =====================================================================================
export type LawnSize = 'small' | 'standard' | 'large';
export type GrassPlanId = 'weekly' | 'bi-weekly' | 'one-time';

export const GRASS_SEASON = 'May–October';

export const LAWN_SIZES: { id: LawnSize; label: string; detail: string }[] = [
  { id: 'small', label: 'Small', detail: 'Townhouse / front only' },
  { id: 'standard', label: 'Standard', detail: 'Typical suburban lot' },
  { id: 'large', label: 'Large', detail: 'Corner lot / ¼ acre+' },
];

export const GRASS_PLANS: {
  id: GrassPlanId;
  name: string;
  unit: string;
  badge?: string;
  tagline: string;
  prices: Record<LawnSize, number>;
}[] = [
  { id: 'weekly', name: 'Weekly Plan', unit: 'per cut', badge: 'Most Popular', tagline: 'A consistently sharp lawn all season.', prices: { small: 40, standard: 50, large: 65 } },
  { id: 'bi-weekly', name: 'Bi-Weekly Plan', unit: 'per cut', tagline: 'For smaller, shaded, or slower-growing lawns.', prices: { small: 45, standard: 58, large: 75 } },
  { id: 'one-time', name: 'One-Time Cut', unit: 'per cut', tagline: 'Vacations, move-ins, listings, or overgrown lawns.', prices: { small: 65, standard: 80, large: 100 } },
];

export const GRASS_INCLUDED = [
  'Mowing',
  'String trimming',
  'Edging along driveways and walkways',
  'Clippings blown off hard surfaces',
];

/** Seasonal Plan: weekly cuts paid monthly. Monthly = weekly price × cuts ÷ months, rounded. */
export const SEASONAL_PLAN = {
  name: 'Seasonal Plan',
  text: `Pay monthly. Weekly cuts, ${GRASS_SEASON}.`,
  weeklyCuts: 24,
  months: 6,
};
export const seasonalMonthly = (size: LawnSize) =>
  Math.round((GRASS_PLANS[0].prices[size] * SEASONAL_PLAN.weeklyCuts) / SEASONAL_PLAN.months);

export const GRASS_ADDONS: { id: 'spring-cleanup' | 'fall-cleanup'; label: string; price: number }[] = [
  { id: 'spring-cleanup', label: 'Spring Cleanup', price: 175 }, // PLACEHOLDER: confirm (given as $[175])
  { id: 'fall-cleanup', label: 'Fall Cleanup', price: 175 }, // PLACEHOLDER: confirm (given as $[175])
];

export const grassPlanName = (id: GrassPlanId | 'seasonal') =>
  id === 'seasonal' ? SEASONAL_PLAN.name : GRASS_PLANS.find((p) => p.id === id)!.name;

// =====================================================================================
// 2. POWER WASHING
// =====================================================================================
export type DrivewayId = 'driveway-single' | 'driveway-double' | 'driveway-large';
export type PwSurfaceId = 'interlock' | 'deck' | 'siding';

export const PW_DRIVEWAYS: { id: DrivewayId; label: string; price: number }[] = [
  { id: 'driveway-single', label: 'Single-car driveway', price: 125 },
  { id: 'driveway-double', label: 'Double-car driveway', price: 175 },
  { id: 'driveway-large', label: 'Large / 3-car driveway', price: 250 },
];

export const PW_SURFACES: { id: PwSurfaceId; label: string; price: number }[] = [
  { id: 'interlock', label: 'Interlock / patio', price: 175 },
  { id: 'deck', label: 'Deck (small to medium)', price: 150 },
  { id: 'siding', label: 'House siding (soft wash)', price: 375 },
];

export const PW_FENCE = { label: 'Fence', pricePerFoot: 2.5, unit: 'linear ft', defaultFeet: 100 };
export const PW_OIL_STAIN = { label: 'Oil stain treatment (add-on)', price: 50 };
export const PW_PACKAGE = {
  label: 'Full Property Package',
  detail: 'Driveway + walkway + patio/deck + siding',
  price: 499,
  badge: 'Best Value',
};
export const PW_NOTE = 'Soft wash used on siding and decks to protect surfaces.';

// =====================================================================================
// 3. WINDOW CLEANING
// =====================================================================================
export type HomeType = 'bungalow' | 'two-storey' | 'large';
export type WindowScope = 'exterior' | 'both';

export const WINDOW_HOMES: { id: HomeType; label: string; detail: string; prices: Record<WindowScope, number> }[] = [
  { id: 'bungalow', label: 'Bungalow / townhouse', detail: 'Up to 15 windows', prices: { exterior: 159, both: 249 } },
  { id: 'two-storey', label: 'Two-storey home', detail: '16–25 windows', prices: { exterior: 209, both: 329 } },
  { id: 'large', label: 'Large home', detail: '26+ windows', prices: { exterior: 279, both: 449 } },
];
export const WINDOW_SCOPES: { id: WindowScope; label: string }[] = [
  { id: 'exterior', label: 'Exterior Only' },
  { id: 'both', label: 'Interior + Exterior' },
];
export const WINDOW_POPULAR: { home: HomeType; scope: WindowScope; badge: string } = { home: 'two-storey', scope: 'both', badge: 'Most Popular' };

export const WINDOW_ADDONS: { id: 'screens' | 'tracks'; label: string; price: number; unit: string }[] = [
  { id: 'screens', label: 'Screen cleaning', price: 3, unit: 'screen' },
  { id: 'tracks', label: 'Track and sill detailing', price: 4, unit: 'window' },
];

export const STOREFRONT = { from: 40, unit: 'per visit' }; // PLACEHOLDER: confirm (given as $[40])

// =====================================================================================
// 4. RESIDENTIAL & COMMERCIAL CLEANING
// =====================================================================================
export type CleanSize = 'condo' | 'up-to-1500' | '1500-2500' | '2500-plus';
export type CleanType = 'standard' | 'deep' | 'move';
export type CleanFrequency = 'one-time' | 'bi-weekly' | 'weekly';

export const CLEAN_TYPES: { id: CleanType; label: string; badge?: string }[] = [
  { id: 'standard', label: 'Standard Clean' },
  { id: 'deep', label: 'Deep Clean', badge: 'Most Popular' },
  { id: 'move', label: 'Move-In / Move-Out' },
];

/** `prices: null` = custom quote */
export const CLEAN_SIZES: { id: CleanSize; label: string; prices: Record<CleanType, number> | null }[] = [
  { id: 'condo', label: 'Condo / apartment (1–2 bed)', prices: { standard: 139, deep: 229, move: 279 } },
  { id: 'up-to-1500', label: 'Home up to 1,500 sq ft', prices: { standard: 179, deep: 289, move: 349 } },
  { id: '1500-2500', label: 'Home 1,500–2,500 sq ft', prices: { standard: 229, deep: 369, move: 449 } },
  { id: '2500-plus', label: 'Home 2,500+ sq ft', prices: null },
];

/** Recurring discounts apply from the 2nd visit onward; the first visit is a full-price clean. */
export const RECURRING_DISCOUNTS: Record<Exclude<CleanFrequency, 'one-time'>, number> = {
  weekly: 0.1,
  'bi-weekly': 0.05,
};
export const RECURRING_NOTE = 'Applied from the 2nd visit onward; the first visit is a full-price clean.';

export const CLEAN_ADDONS: { id: 'oven' | 'fridge' | 'cabinets' | 'interior-windows'; label: string; price: number }[] = [
  { id: 'oven', label: 'Inside oven', price: 40 },
  { id: 'fridge', label: 'Inside fridge', price: 40 },
  { id: 'cabinets', label: 'Inside cabinets', price: 45 },
  { id: 'interior-windows', label: 'Interior windows', price: 50 },
];

export type CommercialPlanId = 'small-office' | 'medium-office' | 'custom';
export const COMMERCIAL_PLANS: { id: CommercialPlanId; label: string; detail: string; monthly: number | null }[] = [
  { id: 'small-office', label: 'Small office', detail: 'Under 1,000 sq ft', monthly: 299 },
  { id: 'medium-office', label: 'Medium office', detail: '1,000–5,000 sq ft', monthly: 699 },
  { id: 'custom', label: 'Larger spaces, retail, plazas & post-construction', detail: 'Custom quote after a free site walkthrough', monthly: null },
];

// =====================================================================================
// 5. BUNDLES
// =====================================================================================
/** Checked from the top: the first rule that matches the number of services wins. */
export const BUNDLE_RULES = [
  { minServices: 3, rate: 0.15 },
  { minServices: 2, rate: 0.1 },
];
export const bundleRate = (serviceCount: number) => BUNDLE_RULES.find((r) => serviceCount >= r.minServices)?.rate ?? 0;
export const BUNDLE_TEXT = 'Book 2 services and save 10%. Book 3 or more and save 15%.';

const driveway = (id: DrivewayId) => PW_DRIVEWAYS.find((d) => d.id === id)!.price;
const windows = (home: HomeType, scope: WindowScope) => WINDOW_HOMES.find((h) => h.id === home)!.prices[scope];
const cleaning = (size: CleanSize, type: CleanType) => CLEAN_SIZES.find((s) => s.id === size)!.prices![type];

export interface BundleExample {
  title: string;
  services: ('grass-cutting' | 'power-washing' | 'window-cleaning' | 'cleaning')[];
  items: { label: string; price: number }[];
  period?: string;
  text: string;
}

export const BUNDLE_EXAMPLES: BundleExample[] = [
  {
    title: 'Curb Appeal Bundle',
    services: ['power-washing', 'window-cleaning'],
    items: [
      { label: 'Power washing: double-car driveway', price: driveway('driveway-double') },
      { label: 'Exterior windows: two-storey home', price: windows('two-storey', 'exterior') },
    ],
    text: 'A clean driveway and sparkling windows in one visit. Perfect before listing or hosting.',
  },
  {
    title: 'Move-Out Bundle',
    services: ['cleaning', 'window-cleaning'],
    items: [
      { label: 'Move-out clean: home up to 1,500 sq ft', price: cleaning('up-to-1500', 'move') },
      { label: 'Interior + exterior windows: bungalow / townhouse', price: windows('bungalow', 'both') },
    ],
    text: 'Hand over the keys with confidence: the whole home cleaned and every window detailed.',
  },
  {
    title: 'Summer Care Bundle',
    services: ['grass-cutting', 'power-washing'],
    items: [
      { label: `Weekly grass cutting: standard lawn, ${SEASONAL_PLAN.weeklyCuts} cuts`, price: GRASS_PLANS[0].prices.standard * SEASONAL_PLAN.weeklyCuts },
      { label: 'Power washing: double-car driveway', price: driveway('driveway-double') },
    ],
    period: 'per season',
    text: `A sharp lawn all season (${GRASS_SEASON}) plus a spring driveway wash.`,
  },
];

export const bundleTotals = (b: BundleExample) => {
  const regular = b.items.reduce((sum, i) => sum + i.price, 0);
  const rate = bundleRate(b.services.length);
  const bundle = Math.round(regular * (1 - rate));
  return { regular, rate, bundle, savings: regular - bundle };
};

// =====================================================================================
// Lowest "starting from" price per service (used in text and Google price schema)
// =====================================================================================
export const MIN_PRICE = {
  'grass-cutting': Math.min(...GRASS_PLANS.flatMap((p) => Object.values(p.prices))),
  'power-washing': Math.min(...PW_DRIVEWAYS.map((d) => d.price), ...PW_SURFACES.map((s) => s.price)),
  'window-cleaning': Math.min(...WINDOW_HOMES.flatMap((h) => Object.values(h.prices))),
  cleaning: Math.min(...CLEAN_SIZES.flatMap((s) => (s.prices ? Object.values(s.prices) : []))),
} as const;
