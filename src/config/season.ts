import type { ServiceId } from '../data/services';

/**
 * SEASONAL SETTINGS: the single place to change seasonal promotions.
 *
 * - `outdoor` runs April–October (grass cutting, power washing, exterior windows).
 * - `indoor` runs November–March (cleaning, interior windows, book-early-for-spring).
 *
 * To force a season regardless of the date, set SEASON_OVERRIDE to 'outdoor' or 'indoor'.
 */

export type SeasonId = 'outdoor' | 'indoor';

export const SEASON_OVERRIDE: SeasonId | null = null;

/** Months (1–12) that count as the outdoor season. */
export const OUTDOOR_MONTHS = [4, 5, 6, 7, 8, 9, 10];

export interface SeasonSettings {
  /** Top promo bar */
  banner: { label: string; text: string; ctaLabel: string; ctaServices: ServiceId[] };
  /** Homepage hero pill */
  heroPill: string;
  /** Order of the 4 service cards on the homepage */
  featuredOrder: ServiceId[];
  /** Show the grass cutting plans on the homepage */
  showGrassPlans: boolean;
  /** Show the "Book Early for Spring" section on the homepage */
  showBookEarly: boolean;
}

export const SEASONS: Record<SeasonId, SeasonSettings> = {
  outdoor: {
    banner: {
      label: 'Outdoor season is open',
      text: 'Now booking weekly grass cutting, driveway & interlock power washing, and exterior window cleaning.',
      ctaLabel: 'Get a quote',
      ctaServices: ['grass-cutting'],
    },
    heroPill: 'Now booking: grass cutting, power washing & exterior windows',
    featuredOrder: ['grass-cutting', 'power-washing', 'window-cleaning', 'cleaning'],
    showGrassPlans: true,
    showBookEarly: false,
  },
  indoor: {
    banner: {
      label: 'Indoor season',
      text: 'Now booking deep cleaning, move-out cleaning, office cleaning, and interior window cleaning.',
      ctaLabel: 'Get a quote',
      ctaServices: ['cleaning'],
    },
    heroPill: 'Now booking: home & office cleaning and interior windows',
    featuredOrder: ['cleaning', 'window-cleaning', 'grass-cutting', 'power-washing'],
    showGrassPlans: false,
    showBookEarly: true,
  },
};

export function getSeasonId(date: Date = new Date()): SeasonId {
  if (SEASON_OVERRIDE) return SEASON_OVERRIDE;
  return OUTDOOR_MONTHS.includes(date.getMonth() + 1) ? 'outdoor' : 'indoor';
}

/** The spring the "book early" section refers to (next April). */
export function nextSpringYear(date: Date = new Date()): number {
  return date.getMonth() + 1 >= 4 ? date.getFullYear() + 1 : date.getFullYear();
}
