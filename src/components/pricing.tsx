import React, { useState } from 'react';
import { Building2, Check, Info, Tag } from 'lucide-react';
import {
  BUNDLE_EXAMPLES,
  BUNDLE_TEXT,
  CLEAN_ADDONS,
  CLEAN_SIZES,
  CLEAN_TYPES,
  COMMERCIAL_PLANS,
  GRASS_ADDONS,
  GRASS_INCLUDED,
  GRASS_PLANS,
  GRASS_SEASON,
  LAWN_SIZES,
  PRICE_DISCLAIMER,
  PW_DRIVEWAYS,
  PW_FENCE,
  PW_NOTE,
  PW_OIL_STAIN,
  PW_PACKAGE,
  PW_SURFACES,
  RECURRING_DISCOUNTS,
  RECURRING_NOTE,
  SEASONAL_PLAN,
  STOREFRONT,
  TAX_LABEL,
  WINDOW_ADDONS,
  WINDOW_HOMES,
  WINDOW_POPULAR,
  WINDOW_SCOPES,
  bundleTotals,
  money,
  seasonalMonthly,
  type LawnSize,
} from '../config/pricing';
import { SERVICE_BY_ID, type ServiceId } from '../data/services';
import { useApp, type QuoteDefaults } from '../lib/router';
import { Eyebrow, ServiceIcon } from './ui';

// ---------------------------------------------------------------- shared bits
/** "Starting from $50 + HST per cut" */
export const StartingFrom: React.FC<{ amount: number; unit?: string; big?: boolean; dark?: boolean }> = ({ amount, unit, big, dark }) => (
  <span className={dark ? 'text-white' : 'text-[#0B1A2E]'}>
    <span className={`text-sm ${dark ? 'text-slate-300' : 'text-slate-600'}`}>Starting from </span>
    <span className={`${big ? 'text-3xl' : 'text-lg'} font-extrabold font-montserrat`}>{money(amount)}</span>
    <span className={`text-sm font-semibold ${dark ? 'text-slate-300' : 'text-slate-600'}`}> {TAX_LABEL}</span>
    {unit && <span className={`text-sm ${dark ? 'text-slate-300' : 'text-slate-600'}`}> {unit}</span>}
  </span>
);

export const PriceDisclaimer: React.FC<{ dark?: boolean; className?: string }> = ({ dark, className = '' }) => (
  <p className={`flex items-start gap-2 text-sm ${dark ? 'text-slate-300' : 'text-slate-600'} ${className}`}>
    <Info className="w-4 h-4 mt-0.5 shrink-0" aria-hidden="true" />
    <span>{PRICE_DISCLAIMER}</span>
  </p>
);

const Badge: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <span className="inline-block bg-[#0A6FE0] text-white text-xs font-bold px-2.5 py-1 rounded-full whitespace-nowrap">{children}</span>
);

const useBook = () => {
  const { openQuote } = useApp();
  return (serviceId: ServiceId, selection: string, source: string, extra: Partial<QuoteDefaults> = {}) =>
    openQuote({ services: [serviceId], selections: [`${SERVICE_BY_ID[serviceId].name}: ${selection}`], source, ...extra });
};

const sel = (label: string, amount: number, unit?: string) => `${label}: from ${money(amount)}${unit ? ` ${unit}` : ''} ${TAX_LABEL}`;

const bookBtn =
  'w-full py-3 rounded-lg font-bold text-sm cursor-pointer transition-colors bg-[#0A6FE0] hover:bg-[#0759b8] text-white min-h-12';

// ---------------------------------------------------------------- 1. GRASS CUTTING
export const GrassPricing: React.FC<{ source: string; id?: string; heading?: string }> = ({
  source,
  id = 'plans',
  heading = 'Grass Cutting Plans & Prices',
}) => {
  const book = useBook();
  const [size, setSize] = useState<LawnSize>('standard');
  const sizeInfo = LAWN_SIZES.find((l) => l.id === size)!;
  const monthly = seasonalMonthly(size);

  return (
    <section id={id} className="py-16 bg-white scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-8 space-y-2">
          <Eyebrow>Season: {GRASS_SEASON}</Eyebrow>
          <h2 className="text-2xl sm:text-3xl font-bold font-montserrat text-[#0B1A2E]">{heading}</h2>
          <p className="text-slate-600 text-base">Every cut includes {GRASS_INCLUDED.join(', ').toLowerCase()}.</p>
        </div>

        {/* Lawn size selector */}
        <div role="radiogroup" aria-label="Lawn size" className="grid grid-cols-3 gap-2 max-w-2xl mx-auto mb-8">
          {LAWN_SIZES.map((l) => (
            <button
              key={l.id}
              type="button"
              role="radio"
              aria-checked={size === l.id}
              onClick={() => setSize(l.id)}
              className={`rounded-lg border px-2 py-3 text-center cursor-pointer min-h-14 ${
                size === l.id ? 'bg-[#0A6FE0] border-[#0A6FE0] text-white' : 'bg-white border-slate-300 text-slate-700 hover:border-[#0A6FE0]'
              }`}
            >
              <span className="block text-sm font-bold">{l.label} lawn</span>
              <span className={`block text-xs ${size === l.id ? 'text-blue-100' : 'text-slate-500'}`}>{l.detail}</span>
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {GRASS_PLANS.map((p) => (
            <div
              key={p.id}
              className={`relative rounded-2xl border p-6 flex flex-col gap-4 ${p.badge ? 'border-[#0A6FE0] shadow-lg ring-1 ring-[#0A6FE0]' : 'border-slate-200 shadow-xs'}`}
            >
              {p.badge && (
                <span className="absolute -top-3 left-6">
                  <Badge>{p.badge}</Badge>
                </span>
              )}
              <div className="space-y-1">
                <h3 className="text-xl font-bold font-montserrat text-[#0B1A2E]">{p.name}</h3>
                <p className="text-sm text-slate-600">{p.tagline}</p>
              </div>
              <StartingFrom amount={p.prices[size]} unit={p.unit} big />
              <p className="text-xs text-slate-500">{sizeInfo.label} lawn: {sizeInfo.detail.toLowerCase()}</p>
              <ul className="space-y-1.5 text-sm text-slate-700">
                {GRASS_INCLUDED.map((it) => (
                  <li key={it} className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-[#0A6FE0] mt-0.5 shrink-0" aria-hidden="true" />
                    {it}
                  </li>
                ))}
              </ul>
              <button
                type="button"
                onClick={() =>
                  book('grass-cutting', sel(`${p.name}, ${sizeInfo.label.toLowerCase()} lawn`, p.prices[size], p.unit), `${source}-grass-${p.id}`, { plan: p.id })
                }
                className={`mt-auto ${bookBtn}`}
              >
                Book This Plan
              </button>
            </div>
          ))}

          {/* Seasonal (monthly) plan */}
          <div className="rounded-2xl border border-slate-800 bg-[#0B1A2E] text-white p-6 flex flex-col gap-4">
            <div className="space-y-1">
              <h3 className="text-xl font-bold font-montserrat">{SEASONAL_PLAN.name}</h3>
              <p className="text-sm text-slate-300">{SEASONAL_PLAN.text}</p>
            </div>
            <StartingFrom amount={monthly} unit="/ month" big dark />
            <p className="text-xs text-slate-400">
              {sizeInfo.label} lawn: about {SEASONAL_PLAN.weeklyCuts} weekly cuts spread over {SEASONAL_PLAN.months} equal monthly payments.
            </p>
            <button
              type="button"
              onClick={() =>
                book('grass-cutting', sel(`${SEASONAL_PLAN.name} (weekly cuts, paid monthly), ${sizeInfo.label.toLowerCase()} lawn`, monthly, '/ month'), `${source}-grass-seasonal`, {
                  plan: 'weekly',
                })
              }
              className="mt-auto w-full py-3 rounded-lg font-bold text-sm cursor-pointer bg-white text-[#0B1A2E] hover:bg-slate-100 min-h-12"
            >
              Book Seasonal Plan
            </button>
          </div>
        </div>

        {/* Add-ons */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-3xl mx-auto">
          {GRASS_ADDONS.map((a) => (
            <div key={a.id} className="rounded-xl border border-slate-200 bg-[#F4F6F9] p-4 flex items-center justify-between gap-3">
              <div>
                <p className="font-bold text-[#0B1A2E]">{a.label}</p>
                <StartingFrom amount={a.price} />
              </div>
              <button
                type="button"
                onClick={() => book('grass-cutting', sel(a.label, a.price), `${source}-grass-${a.id}`)}
                className="shrink-0 px-4 py-2.5 rounded-lg border border-[#0A6FE0] text-[#0A6FE0] font-bold text-sm hover:bg-blue-50 cursor-pointer min-h-11"
              >
                Book
              </button>
            </div>
          ))}
        </div>
        <PriceDisclaimer className="mt-6 justify-center text-center" />
      </div>
    </section>
  );
};

// ---------------------------------------------------------------- 2. POWER WASHING
export const PowerWashingPricing: React.FC<{ source: string }> = ({ source }) => {
  const book = useBook();
  const rows: { label: string; amount: number; unit?: string; key: string }[] = [
    ...PW_DRIVEWAYS.map((d) => ({ label: d.label, amount: d.price, key: d.id })),
    ...PW_SURFACES.map((s) => ({ label: s.label, amount: s.price, key: s.id })),
    { label: PW_FENCE.label, amount: PW_FENCE.pricePerFoot, unit: `/ ${PW_FENCE.unit}`, key: 'fence' },
    { label: PW_OIL_STAIN.label, amount: PW_OIL_STAIN.price, key: 'oil-stain' },
  ];
  return (
    <div className="space-y-6">
      <div className="relative rounded-2xl border border-[#0A6FE0] ring-1 ring-[#0A6FE0] bg-white p-6 sm:p-7 shadow-lg flex flex-col md:flex-row md:items-center justify-between gap-5">
        <span className="absolute -top-3 left-6">
          <Badge>{PW_PACKAGE.badge}</Badge>
        </span>
        <div className="space-y-1">
          <h3 className="text-xl font-bold font-montserrat text-[#0B1A2E]">{PW_PACKAGE.label}</h3>
          <p className="text-sm text-slate-600">{PW_PACKAGE.detail}</p>
          <StartingFrom amount={PW_PACKAGE.price} big />
        </div>
        <button
          type="button"
          onClick={() => book('power-washing', sel(`${PW_PACKAGE.label} (${PW_PACKAGE.detail.toLowerCase()})`, PW_PACKAGE.price), `${source}-pw-package`)}
          className={`md:w-auto md:px-8 ${bookBtn}`}
        >
          Book the Package
        </button>
      </div>
      <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {rows.map((r) => (
          <li key={r.key} className="rounded-xl border border-slate-200 bg-white p-4 flex items-center justify-between gap-3">
            <div>
              <p className="font-semibold text-[#0B1A2E]">{r.label}</p>
              <StartingFrom amount={r.amount} unit={r.unit} />
            </div>
            <button
              type="button"
              onClick={() => book('power-washing', sel(r.label, r.amount, r.unit), `${source}-pw-${r.key}`)}
              className="shrink-0 px-4 py-2.5 rounded-lg border border-[#0A6FE0] text-[#0A6FE0] font-bold text-sm hover:bg-blue-50 cursor-pointer min-h-11"
            >
              Book
            </button>
          </li>
        ))}
      </ul>
      <p className="text-sm text-slate-700 font-semibold">{PW_NOTE}</p>
    </div>
  );
};

// ---------------------------------------------------------------- 3. WINDOW CLEANING
export const WindowPricing: React.FC<{ source: string }> = ({ source }) => {
  const book = useBook();
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {WINDOW_HOMES.map((h) => (
          <div key={h.id} className="rounded-2xl border border-slate-200 bg-white p-5 space-y-3 shadow-xs">
            <div>
              <h3 className="text-lg font-bold font-montserrat text-[#0B1A2E]">{h.label}</h3>
              <p className="text-sm text-slate-600">{h.detail}</p>
            </div>
            {WINDOW_SCOPES.map((sc) => {
              const popular = WINDOW_POPULAR.home === h.id && WINDOW_POPULAR.scope === sc.id;
              return (
                <button
                  key={sc.id}
                  type="button"
                  onClick={() =>
                    book('window-cleaning', sel(`${sc.label}, ${h.label.toLowerCase()} (${h.detail.toLowerCase()})`, h.prices[sc.id]), `${source}-wc-${h.id}-${sc.id}`)
                  }
                  className={`w-full text-left rounded-xl border p-3.5 cursor-pointer transition-colors min-h-14 ${
                    popular ? 'border-[#0A6FE0] ring-1 ring-[#0A6FE0] bg-blue-50/60' : 'border-slate-200 hover:border-[#0A6FE0]'
                  }`}
                >
                  <span className="flex items-center justify-between gap-2">
                    <span className="text-sm font-bold text-[#0B1A2E]">{sc.label}</span>
                    {popular && <Badge>{WINDOW_POPULAR.badge}</Badge>}
                  </span>
                  <StartingFrom amount={h.prices[sc.id]} />
                  <span className="block text-xs font-bold text-[#0A6FE0] mt-1">Book →</span>
                </button>
              );
            })}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {WINDOW_ADDONS.map((a) => (
          <div key={a.id} className="rounded-xl border border-slate-200 bg-[#F4F6F9] p-4">
            <p className="font-semibold text-[#0B1A2E]">Add-on: {a.label}</p>
            <StartingFrom amount={a.price} unit={`/ ${a.unit}`} />
          </div>
        ))}
        <div className="rounded-xl border border-slate-200 bg-[#F4F6F9] p-4 flex flex-col gap-2">
          <p className="font-semibold text-[#0B1A2E]">Commercial storefronts</p>
          <p className="text-sm text-slate-700">
            Recurring storefront plans <StartingFrom amount={STOREFRONT.from} unit={STOREFRONT.unit} />.
          </p>
          <button
            type="button"
            onClick={() =>
              book('window-cleaning', sel('Recurring storefront plan', STOREFRONT.from, STOREFRONT.unit), `${source}-wc-storefront`, { propertyType: 'commercial' })
            }
            className="self-start text-sm font-bold text-[#0A6FE0] hover:underline cursor-pointer py-1"
          >
            Request a quote →
          </button>
        </div>
      </div>
    </div>
  );
};

// ---------------------------------------------------------------- 4. CLEANING
export const CleaningPricing: React.FC<{ source: string }> = ({ source }) => {
  const book = useBook();
  const { openQuote } = useApp();
  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <h3 className="text-xl font-bold font-montserrat text-[#0B1A2E]">Residential cleaning (flat rate by home size)</h3>
        {/* Desktop table */}
        <div className="hidden md:block overflow-hidden rounded-2xl border border-slate-200 bg-white">
          <table className="w-full text-left">
            <thead className="bg-[#F4F6F9]">
              <tr>
                <th scope="col" className="p-4 text-sm font-bold text-slate-700">Home size</th>
                {CLEAN_TYPES.map((t) => (
                  <th key={t.id} scope="col" className={`p-4 text-sm font-bold ${t.badge ? 'text-[#0A6FE0]' : 'text-slate-700'}`}>
                    <span className="flex items-center gap-2">
                      {t.label} {t.badge && <Badge>{t.badge}</Badge>}
                    </span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {CLEAN_SIZES.map((s) => (
                <tr key={s.id} className="border-t border-slate-100">
                  <th scope="row" className="p-4 text-[15px] font-semibold text-[#0B1A2E]">{s.label}</th>
                  {CLEAN_TYPES.map((t) => (
                    <td key={t.id} className={`p-2 ${t.badge ? 'bg-blue-50/50' : ''}`}>
                      <button
                        type="button"
                        onClick={() =>
                          book(
                            'cleaning',
                            s.prices ? sel(`${t.label}, ${s.label.toLowerCase()}`, s.prices[t.id]) : `${t.label}, ${s.label.toLowerCase()}: custom quote`,
                            `${source}-clean-${s.id}-${t.id}`,
                            { propertyType: 'residential' },
                          )
                        }
                        className="w-full text-left rounded-lg p-2.5 hover:bg-white hover:ring-1 hover:ring-[#0A6FE0] cursor-pointer min-h-12"
                      >
                        {s.prices ? <StartingFrom amount={s.prices[t.id]} /> : <span className="font-bold text-[#0B1A2E]">Custom quote</span>}
                        <span className="block text-xs font-bold text-[#0A6FE0]">Book →</span>
                      </button>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Mobile cards */}
        <div className="md:hidden space-y-3">
          {CLEAN_SIZES.map((s) => (
            <div key={s.id} className="rounded-xl border border-slate-200 bg-white p-4 space-y-2">
              <p className="font-bold text-[#0B1A2E]">{s.label}</p>
              {CLEAN_TYPES.map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() =>
                    book(
                      'cleaning',
                      s.prices ? sel(`${t.label}, ${s.label.toLowerCase()}`, s.prices[t.id]) : `${t.label}, ${s.label.toLowerCase()}: custom quote`,
                      `${source}-clean-${s.id}-${t.id}`,
                      { propertyType: 'residential' },
                    )
                  }
                  className={`w-full flex items-center justify-between gap-3 text-left rounded-lg border p-3 cursor-pointer min-h-12 ${
                    t.badge ? 'border-[#0A6FE0] bg-blue-50/60' : 'border-slate-200'
                  }`}
                >
                  <span className="text-sm font-semibold text-slate-800">
                    {t.label} {t.badge && <span className="ml-1 text-xs font-bold text-[#0A6FE0]">({t.badge})</span>}
                  </span>
                  <span className="text-right">
                    {s.prices ? (
                      <span className="font-extrabold font-montserrat text-[#0B1A2E]">
                        {money(s.prices[t.id])} <span className="text-xs font-semibold text-slate-600">{TAX_LABEL}</span>
                      </span>
                    ) : (
                      <span className="font-bold text-[#0B1A2E] text-sm">Custom quote</span>
                    )}
                  </span>
                </button>
              ))}
              {s.prices && <p className="text-xs text-slate-500">Prices are “starting from” amounts. Tap an option to book.</p>}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="rounded-xl border border-slate-200 bg-[#F4F6F9] p-4 space-y-1">
            <p className="font-bold text-[#0B1A2E] flex items-center gap-2">
              <Tag className="w-4 h-4 text-[#0A6FE0]" aria-hidden="true" /> Recurring discounts
            </p>
            <p className="text-sm text-slate-700">
              Weekly: {Math.round(RECURRING_DISCOUNTS.weekly * 100)}% off · Bi-weekly: {Math.round(RECURRING_DISCOUNTS['bi-weekly'] * 100)}% off
            </p>
            <p className="text-xs text-slate-600">{RECURRING_NOTE}</p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-[#F4F6F9] p-4 space-y-1">
            <p className="font-bold text-[#0B1A2E]">Add-ons</p>
            <ul className="text-sm text-slate-700 grid grid-cols-1 sm:grid-cols-2 gap-x-4">
              {CLEAN_ADDONS.map((a) => (
                <li key={a.id}>
                  {a.label}: from {money(a.price)} {TAX_LABEL}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-xl font-bold font-montserrat text-[#0B1A2E] flex items-center gap-2">
          <Building2 className="w-5 h-5 text-[#0A6FE0]" aria-hidden="true" /> Commercial cleaning
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {COMMERCIAL_PLANS.map((p) => (
            <div key={p.id} className="rounded-2xl border border-slate-200 bg-white p-5 flex flex-col gap-3 shadow-xs">
              <div>
                <p className="font-bold text-[#0B1A2E]">{p.label}</p>
                <p className="text-sm text-slate-600">{p.detail}</p>
              </div>
              {p.monthly ? <StartingFrom amount={p.monthly} unit="/ month" /> : <p className="font-bold text-[#0B1A2E]">Custom quote</p>}
              <button
                type="button"
                onClick={() =>
                  openQuote({
                    services: ['cleaning'],
                    propertyType: 'commercial',
                    requestType: 'walkthrough',
                    selections: [
                      `Residential & Commercial Cleaning: ${p.monthly ? sel(`Commercial, ${p.label.toLowerCase()} (${p.detail.toLowerCase()})`, p.monthly, '/ month') : `Commercial, ${p.label.toLowerCase()}: custom quote`}`,
                    ],
                    source: `${source}-commercial-${p.id}`,
                  })
                }
                className={`mt-auto ${bookBtn}`}
              >
                Request a Site Walkthrough
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// ---------------------------------------------------------------- per-service wrapper (non-grass)
export const ServicePricing: React.FC<{ serviceId: Exclude<ServiceId, 'grass-cutting'>; source: string; id?: string; heading?: string; white?: boolean }> = ({
  serviceId,
  source,
  id = 'pricing',
  heading,
  white,
}) => {
  const svc = SERVICE_BY_ID[serviceId];
  return (
    <section id={id} className={`py-16 scroll-mt-24 ${white ? 'bg-white' : 'bg-[#F4F6F9] border-y border-slate-200'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="max-w-3xl space-y-2">
          <Eyebrow>Pricing</Eyebrow>
          <h2 className="text-2xl sm:text-3xl font-bold font-montserrat text-[#0B1A2E]">
            {heading ?? `${svc.id === 'cleaning' ? 'Cleaning' : svc.name} Prices in Ottawa`}
          </h2>
        </div>
        {serviceId === 'power-washing' && <PowerWashingPricing source={source} />}
        {serviceId === 'window-cleaning' && <WindowPricing source={source} />}
        {serviceId === 'cleaning' && <CleaningPricing source={source} />}
        <PriceDisclaimer />
      </div>
    </section>
  );
};

// ---------------------------------------------------------------- 5. BUNDLE & SAVE
export const BundleSection: React.FC<{ source: string }> = ({ source }) => {
  const { openQuote } = useApp();
  return (
    <section className="py-16 bg-[#0B1A2E] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <Eyebrow dark>Bundle &amp; Save</Eyebrow>
          <h2 className="text-2xl sm:text-3xl font-bold font-montserrat">Combine Services and Save</h2>
          <p className="text-slate-200 text-base font-semibold">{BUNDLE_TEXT}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {BUNDLE_EXAMPLES.map((b) => {
            const t = bundleTotals(b);
            return (
              <div key={b.title} className="rounded-2xl bg-white/5 border border-white/10 p-6 flex flex-col gap-4">
                <div className="flex items-center gap-2 text-[#1E9BFF]">
                  {b.services.map((id) => (
                    <span key={id} className="w-9 h-9 rounded-lg bg-[#0A6FE0]/20 flex items-center justify-center">
                      <ServiceIcon id={id} className="w-5 h-5" />
                    </span>
                  ))}
                  <span className="ml-auto text-xs font-bold bg-[#1E9BFF]/20 text-[#7cc4ff] px-2.5 py-1 rounded-full">Save {Math.round(t.rate * 100)}%</span>
                </div>
                <h3 className="text-lg font-bold font-montserrat">{b.title}</h3>
                <p className="text-sm text-slate-300 leading-relaxed">{b.text}</p>
                <ul className="text-sm text-slate-300 space-y-1">
                  {b.items.map((i) => (
                    <li key={i.label} className="flex justify-between gap-3">
                      <span>{i.label}</span>
                      <span className="whitespace-nowrap">{money(i.price)}</span>
                    </li>
                  ))}
                </ul>
                <div className="border-t border-white/10 pt-3 space-y-1">
                  <p className="flex justify-between text-sm text-slate-400">
                    <span>Regular total{b.period ? ` (${b.period})` : ''}</span>
                    <span className="line-through">{money(t.regular)}</span>
                  </p>
                  <p className="flex justify-between items-baseline">
                    <span className="text-sm text-slate-300">Bundle price</span>
                    <span>
                      <span className="text-sm text-slate-300">from </span>
                      <span className="text-2xl font-extrabold font-montserrat">{money(t.bundle)}</span>
                      <span className="text-sm text-slate-300"> {TAX_LABEL}</span>
                    </span>
                  </p>
                  <p className="text-right text-xs font-semibold text-[#7cc4ff]">You save {money(t.savings)}</p>
                </div>
                <button
                  type="button"
                  onClick={() =>
                    openQuote({
                      services: b.services,
                      selections: [
                        ...b.items.map((i) => `${i.label}: from ${money(i.price)} ${TAX_LABEL}`),
                        `${b.title}: bundle price from ${money(t.bundle)} ${TAX_LABEL}${b.period ? ` ${b.period}` : ''} (save ${Math.round(t.rate * 100)}%)`,
                      ],
                      source: `${source}-bundle`,
                    })
                  }
                  className="mt-auto w-full bg-[#0A6FE0] hover:bg-[#0759b8] text-white py-3 rounded-lg font-bold text-sm cursor-pointer min-h-12"
                >
                  Book This Bundle
                </button>
              </div>
            );
          })}
        </div>
        <PriceDisclaimer dark className="mt-8 justify-center text-center" />
      </div>
    </section>
  );
};
