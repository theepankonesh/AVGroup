import {
  CLEAN_ADDONS,
  CLEAN_SIZES,
  CLEAN_TYPES,
  COMMERCIAL_PLANS,
  GRASS_ADDONS,
  GRASS_PLANS,
  LAWN_SIZES,
  PW_DRIVEWAYS,
  PW_FENCE,
  PW_OIL_STAIN,
  PW_PACKAGE,
  PW_SURFACES,
  RECURRING_DISCOUNTS,
  SEASONAL_PLAN,
  WINDOW_ADDONS,
  WINDOW_HOMES,
  WINDOW_SCOPES,
  bundleRate,
  grassPlanName,
  money,
  seasonalMonthly,
  type CleanFrequency,
  type CleanSize,
  type CleanType,
  type CommercialPlanId,
  type DrivewayId,
  type GrassPlanId,
  type HomeType,
  type LawnSize,
  type PwSurfaceId,
  type WindowScope,
} from '../config/pricing';

export type EstimateServiceId = 'grass-cutting' | 'power-washing' | 'window-cleaning' | 'cleaning';

export interface EstimatorState {
  services: EstimateServiceId[];
  grass: { size: LawnSize; plan: GrassPlanId | 'seasonal'; addons: ('spring-cleanup' | 'fall-cleanup')[] };
  pw: { package: boolean; driveway: DrivewayId | 'none'; surfaces: PwSurfaceId[]; fence: boolean; fenceFeet: number; oilStain: boolean };
  windows: { home: HomeType; scope: WindowScope; screens: number; tracks: number };
  cleaning: {
    segment: 'residential' | 'commercial';
    size: CleanSize;
    type: CleanType;
    frequency: CleanFrequency;
    addons: ('oven' | 'fridge' | 'cabinets' | 'interior-windows')[];
    commercial: CommercialPlanId;
  };
}

export const DEFAULT_ESTIMATOR: EstimatorState = {
  services: [],
  grass: { size: 'standard', plan: 'weekly', addons: [] },
  pw: { package: false, driveway: 'driveway-double', surfaces: [], fence: false, fenceFeet: PW_FENCE.defaultFeet, oilStain: false },
  windows: { home: 'two-storey', scope: 'both', screens: 0, tracks: 0 },
  cleaning: { segment: 'residential', size: 'up-to-1500', type: 'deep', frequency: 'one-time', addons: [], commercial: 'small-office' },
};

export interface EstimateLine {
  label: string;
  /** null = custom quote */
  amount: number | null;
  /** e.g. "per cut", "/ month" */
  unit?: string;
}

export interface ServiceEstimate {
  serviceId: EstimateServiceId;
  name: string;
  lines: EstimateLine[];
  /** Sum of priced lines for this service (first visit / first payment) */
  subtotal: number;
  /** Ongoing price after the first visit, if different */
  ongoing?: string;
  customQuote: boolean;
}

export interface Estimate {
  services: ServiceEstimate[];
  pricedServiceCount: number;
  subtotal: number;
  discountRate: number;
  discount: number;
  total: number;
  hasCustomQuote: boolean;
}

const NAMES: Record<EstimateServiceId, string> = {
  'grass-cutting': 'Grass Cutting',
  'power-washing': 'Power Washing',
  'window-cleaning': 'Window Cleaning',
  cleaning: 'Residential & Commercial Cleaning',
};

const round2 = (n: number) => Math.round(n * 100) / 100;

function grassEstimate(s: EstimatorState['grass']): ServiceEstimate {
  const size = LAWN_SIZES.find((l) => l.id === s.size)!;
  const lines: EstimateLine[] = [];
  let ongoing: string | undefined;
  if (s.plan === 'seasonal') {
    const monthly = seasonalMonthly(s.size);
    lines.push({ label: `${SEASONAL_PLAN.name}, ${size.label.toLowerCase()} lawn (first month)`, amount: monthly, unit: '/ month' });
    ongoing = `${money(monthly)} / month for ${SEASONAL_PLAN.months} months`;
  } else {
    const plan = GRASS_PLANS.find((p) => p.id === s.plan)!;
    const price = plan.prices[s.size];
    lines.push({ label: `${plan.name}, ${size.label.toLowerCase()} lawn (first cut)`, amount: price, unit: 'per cut' });
    if (s.plan !== 'one-time') ongoing = `${money(price)} per cut, ${s.plan === 'weekly' ? 'every week' : 'every two weeks'}`;
  }
  for (const id of s.addons) {
    const a = GRASS_ADDONS.find((x) => x.id === id)!;
    lines.push({ label: a.label, amount: a.price });
  }
  return finish('grass-cutting', lines, ongoing);
}

function pwEstimate(s: EstimatorState['pw']): ServiceEstimate {
  const lines: EstimateLine[] = [];
  if (s.package) {
    lines.push({ label: `${PW_PACKAGE.label} (${PW_PACKAGE.detail.toLowerCase()})`, amount: PW_PACKAGE.price });
  } else {
    if (s.driveway !== 'none') {
      const d = PW_DRIVEWAYS.find((x) => x.id === s.driveway)!;
      lines.push({ label: d.label, amount: d.price });
    }
    for (const id of s.surfaces) {
      const x = PW_SURFACES.find((y) => y.id === id)!;
      lines.push({ label: x.label, amount: x.price });
    }
  }
  if (s.fence) {
    const feet = Math.max(0, Math.round(s.fenceFeet || 0));
    lines.push({ label: `${PW_FENCE.label}: ${feet} ${PW_FENCE.unit} × ${money(PW_FENCE.pricePerFoot)}`, amount: round2(feet * PW_FENCE.pricePerFoot) });
  }
  if (s.oilStain) lines.push({ label: 'Oil stain treatment', amount: PW_OIL_STAIN.price });
  return finish('power-washing', lines);
}

function windowEstimate(s: EstimatorState['windows']): ServiceEstimate {
  const home = WINDOW_HOMES.find((h) => h.id === s.home)!;
  const scope = WINDOW_SCOPES.find((x) => x.id === s.scope)!;
  const lines: EstimateLine[] = [{ label: `${scope.label}: ${home.label.toLowerCase()} (${home.detail.toLowerCase()})`, amount: home.prices[s.scope] }];
  const qty = { screens: s.screens, tracks: s.tracks };
  for (const a of WINDOW_ADDONS) {
    const n = Math.max(0, Math.round(qty[a.id] || 0));
    if (n > 0) lines.push({ label: `${a.label}: ${n} × ${money(a.price)}`, amount: n * a.price });
  }
  return finish('window-cleaning', lines);
}

function cleaningEstimate(s: EstimatorState['cleaning']): ServiceEstimate {
  const lines: EstimateLine[] = [];
  let ongoing: string | undefined;
  if (s.segment === 'commercial') {
    const p = COMMERCIAL_PLANS.find((x) => x.id === s.commercial)!;
    lines.push({ label: `Commercial: ${p.label.toLowerCase()} (${p.detail.toLowerCase()})`, amount: p.monthly, unit: p.monthly ? '/ month' : undefined });
    if (p.monthly) ongoing = `${money(p.monthly)} / month`;
    return finish('cleaning', lines, ongoing);
  }
  const size = CLEAN_SIZES.find((x) => x.id === s.size)!;
  const type = CLEAN_TYPES.find((x) => x.id === s.type)!;
  const price = size.prices ? size.prices[s.type] : null;
  lines.push({ label: `${type.label}: ${size.label.toLowerCase()}${s.type === 'standard' && s.frequency !== 'one-time' ? ' (first visit)' : ''}`, amount: price });
  if (price !== null && s.type === 'standard' && s.frequency !== 'one-time') {
    const rate = RECURRING_DISCOUNTS[s.frequency];
    ongoing = `${money(round2(price * (1 - rate)))} per visit, ${s.frequency} (${Math.round(rate * 100)}% off from the 2nd visit)`;
  }
  for (const id of s.addons) {
    const a = CLEAN_ADDONS.find((x) => x.id === id)!;
    lines.push({ label: a.label, amount: a.price });
  }
  return finish('cleaning', lines, ongoing);
}

function finish(serviceId: EstimateServiceId, lines: EstimateLine[], ongoing?: string): ServiceEstimate {
  const priced = lines.filter((l) => l.amount !== null);
  return {
    serviceId,
    name: NAMES[serviceId],
    lines,
    subtotal: round2(priced.reduce((sum, l) => sum + (l.amount as number), 0)),
    ongoing,
    customQuote: lines.some((l) => l.amount === null),
  };
}

/**
 * Estimated starting price = the first visit (or first monthly payment) of each selected service,
 * with the bundle discount (2 services 10%, 3+ services 15%) applied to the combined total.
 */
export function calculateEstimate(state: EstimatorState): Estimate {
  const services = state.services.map((id) => {
    switch (id) {
      case 'grass-cutting':
        return grassEstimate(state.grass);
      case 'power-washing':
        return pwEstimate(state.pw);
      case 'window-cleaning':
        return windowEstimate(state.windows);
      case 'cleaning':
        return cleaningEstimate(state.cleaning);
    }
  });
  const pricedServiceCount = services.filter((s) => s.subtotal > 0).length;
  const subtotal = round2(services.reduce((sum, s) => sum + s.subtotal, 0));
  const discountRate = bundleRate(pricedServiceCount);
  const total = Math.round(subtotal * (1 - discountRate));
  return {
    services,
    pricedServiceCount,
    subtotal,
    discountRate,
    discount: round2(subtotal - total),
    total,
    hasCustomQuote: services.some((s) => s.customQuote),
  };
}

/** Plain-text summary lines for the quote request. */
export function estimateSelections(e: Estimate): string[] {
  const out: string[] = [];
  for (const s of e.services) {
    for (const l of s.lines) out.push(`${s.name}: ${l.label}: ${l.amount === null ? 'custom quote' : `from ${money(l.amount)}${l.unit ? ` ${l.unit}` : ''} + HST`}`);
    if (s.ongoing) out.push(`${s.name}: then ${s.ongoing} + HST`);
  }
  if (e.discountRate > 0) out.push(`Bundle discount: ${Math.round(e.discountRate * 100)}% (${e.pricedServiceCount} services)`);
  out.push(`Estimated starting price: ${money(e.total)} + HST${e.hasCustomQuote ? ' (plus custom-quote items)' : ''}`);
  return out;
}

export { grassPlanName };
