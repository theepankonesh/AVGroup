import type { Faq } from './services';
import {
  BUNDLE_RULES,
  CLEAN_SIZES,
  GRASS_PLANS,
  PW_DRIVEWAYS,
  RECURRING_DISCOUNTS,
  WINDOW_HOMES,
  money,
  seasonalMonthly,
} from '../config/pricing';

// Every number below comes from src/config/pricing.ts, so these answers update automatically.
const weekly = GRASS_PLANS.find((p) => p.id === 'weekly')!;
const oneTime = GRASS_PLANS.find((p) => p.id === 'one-time')!;
const single = PW_DRIVEWAYS.find((d) => d.id === 'driveway-single')!;
const double = PW_DRIVEWAYS.find((d) => d.id === 'driveway-double')!;
const large = PW_DRIVEWAYS.find((d) => d.id === 'driveway-large')!;
const bungalow = WINDOW_HOMES.find((h) => h.id === 'bungalow')!;
const twoStorey = WINDOW_HOMES.find((h) => h.id === 'two-storey')!;
const condo = CLEAN_SIZES.find((s) => s.id === 'condo')!.prices!;
const mid = CLEAN_SIZES.find((s) => s.id === '1500-2500')!.prices!;
const pct = (n: number) => `${Math.round(n * 100)}%`;
const two = BUNDLE_RULES.find((r) => r.minServices === 2)!.rate;
const three = BUNDLE_RULES.find((r) => r.minServices === 3)!.rate;

export const PRICING_FAQS: Faq[] = [
  {
    q: 'How much does grass cutting cost in Ottawa?',
    a: `Weekly grass cutting starts from ${money(weekly.prices.small)} + HST per cut for a small townhouse lawn and ${money(weekly.prices.standard)} + HST for a typical suburban lawn. One-time cuts start from ${money(oneTime.prices.small)} + HST. Prefer to pay monthly? Our Seasonal Plan for a standard lawn starts from ${money(seasonalMonthly('standard'))} + HST per month, May to October.`,
  },
  {
    q: 'How much does power washing a driveway cost?',
    a: `Driveway power washing starts from ${money(single.price)} + HST for a single-car driveway, ${money(double.price)} + HST for a double, and ${money(large.price)} + HST for a large or 3-car driveway. Oil stain treatment and interlock re-sanding can be added.`,
  },
  {
    q: 'How much is window cleaning in Ottawa?',
    a: `Exterior window cleaning starts from ${money(bungalow.prices.exterior)} + HST for a bungalow or townhouse (up to 15 windows) and ${money(twoStorey.prices.exterior)} + HST for a two-storey home. Interior and exterior together starts from ${money(bungalow.prices.both)} + HST.`,
  },
  {
    q: 'How much does a deep clean cost?',
    a: `A deep clean starts from ${money(condo.deep)} + HST for a 1–2 bedroom condo or apartment and ${money(mid.deep)} + HST for a 1,500–2,500 sq ft home. Homes over 2,500 sq ft are quoted individually.`,
  },
  {
    q: 'Do you charge HST?',
    a: 'Yes. All prices on our website are shown before tax, and 13% Ontario HST is added to your invoice.',
  },
  {
    q: 'Do you offer discounts for recurring service?',
    a: `Yes. Recurring house cleaning is ${pct(RECURRING_DISCOUNTS['bi-weekly'])} off bi-weekly and ${pct(RECURRING_DISCOUNTS.weekly)} off weekly, from the second visit onward. Book 2 services together and save ${pct(two)}, or 3 or more and save ${pct(three)}.`,
  },
];
