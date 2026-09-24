import React, { useMemo, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, Calculator, Check, Minus, Plus, Send } from 'lucide-react';
import {
  BUNDLE_TEXT,
  CLEAN_ADDONS,
  CLEAN_SIZES,
  CLEAN_TYPES,
  COMMERCIAL_PLANS,
  GRASS_ADDONS,
  GRASS_PLANS,
  LAWN_SIZES,
  PRICE_DISCLAIMER,
  PW_DRIVEWAYS,
  PW_FENCE,
  PW_OIL_STAIN,
  PW_PACKAGE,
  PW_SURFACES,
  RECURRING_DISCOUNTS,
  SEASONAL_PLAN,
  TAX_LABEL,
  WINDOW_ADDONS,
  WINDOW_HOMES,
  WINDOW_SCOPES,
  money,
  seasonalMonthly,
} from '../config/pricing';
import { SERVICES } from '../data/services';
import { DEFAULT_ESTIMATOR, calculateEstimate, estimateSelections, type EstimatorState, type EstimateServiceId } from '../lib/estimate';
import { useApp } from '../lib/router';
import { Eyebrow, ServiceIcon } from './ui';

// ---------------------------------------------------------------- small inputs (large tap targets)
type Opt<T extends string> = { value: T; label: string; sub?: string };

function Choice<T extends string>({ label, options, value, onChange, cols = 2 }: { label: string; options: Opt<T>[]; value: T; onChange: (v: T) => void; cols?: 2 | 3 | 4 }) {
  const grid = { 2: 'grid-cols-2', 3: 'grid-cols-1 sm:grid-cols-3', 4: 'grid-cols-2 sm:grid-cols-4' }[cols];
  return (
    <fieldset className="space-y-2">
      <legend className="text-sm font-bold text-slate-800">{label}</legend>
      <div role="radiogroup" className={`grid ${grid} gap-2`}>
        {options.map((o) => {
          const on = o.value === value;
          return (
            <button
              key={o.value}
              type="button"
              role="radio"
              aria-checked={on}
              onClick={() => onChange(o.value)}
              className={`min-h-14 rounded-xl border px-3 py-2.5 text-left cursor-pointer transition-colors ${
                on ? 'border-[#0A6FE0] bg-blue-50 ring-1 ring-[#0A6FE0]' : 'border-slate-300 bg-white hover:border-[#0A6FE0]'
              }`}
            >
              <span className="block text-sm font-bold text-[#0B1A2E]">{o.label}</span>
              {o.sub && <span className="block text-xs text-slate-600">{o.sub}</span>}
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}

const Toggle: React.FC<{ checked: boolean; onChange: (v: boolean) => void; label: string; sub?: string }> = ({ checked, onChange, label, sub }) => (
  <button
    type="button"
    role="checkbox"
    aria-checked={checked}
    onClick={() => onChange(!checked)}
    className={`w-full min-h-14 flex items-center gap-3 rounded-xl border px-3 py-2.5 text-left cursor-pointer transition-colors ${
      checked ? 'border-[#0A6FE0] bg-blue-50 ring-1 ring-[#0A6FE0]' : 'border-slate-300 bg-white hover:border-[#0A6FE0]'
    }`}
  >
    <span className={`w-6 h-6 rounded-md border-2 flex items-center justify-center shrink-0 ${checked ? 'bg-[#0A6FE0] border-[#0A6FE0] text-white' : 'border-slate-400'}`}>
      {checked && <Check className="w-4 h-4" aria-hidden="true" />}
    </span>
    <span>
      <span className="block text-sm font-bold text-[#0B1A2E]">{label}</span>
      {sub && <span className="block text-xs text-slate-600">{sub}</span>}
    </span>
  </button>
);

const Stepper: React.FC<{ label: string; sub?: string; value: number; onChange: (n: number) => void; step?: number; max?: number }> = ({ label, sub, value, onChange, step = 1, max = 999 }) => (
  <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-slate-300 bg-white px-3 py-2.5 min-h-14">
    <span className="min-w-40 flex-1">
      <span className="block text-sm font-bold text-[#0B1A2E]">{label}</span>
      {sub && <span className="block text-xs text-slate-600">{sub}</span>}
    </span>
    <span className="flex items-center gap-1.5 shrink-0">
      <button type="button" aria-label={`Decrease ${label}`} onClick={() => onChange(Math.max(0, value - step))} className="w-11 h-11 rounded-lg border border-slate-300 flex items-center justify-center hover:border-[#0A6FE0] cursor-pointer">
        <Minus className="w-4 h-4" aria-hidden="true" />
      </button>
      <input
        type="number"
        inputMode="numeric"
        min={0}
        max={max}
        aria-label={label}
        value={value}
        onChange={(e) => onChange(Math.min(max, Math.max(0, Math.round(Number(e.target.value) || 0))))}
        className="w-16 h-11 text-center rounded-lg border border-slate-300 text-base font-bold"
      />
      <button type="button" aria-label={`Increase ${label}`} onClick={() => onChange(Math.min(max, value + step))} className="w-11 h-11 rounded-lg border border-slate-300 flex items-center justify-center hover:border-[#0A6FE0] cursor-pointer">
        <Plus className="w-4 h-4" aria-hidden="true" />
      </button>
    </span>
  </div>
);

const ServiceCard: React.FC<{ id: EstimateServiceId; children: React.ReactNode }> = ({ id, children }) => (
  <div className="rounded-2xl border border-slate-200 bg-[#F4F6F9] p-4 sm:p-5 space-y-4">
    <h4 className="flex items-center gap-2 text-base font-bold font-montserrat text-[#0B1A2E]">
      <span className="text-[#0A6FE0]">
        <ServiceIcon id={id} className="w-5 h-5" />
      </span>
      {SERVICES.find((s) => s.id === id)!.name}
    </h4>
    {children}
  </div>
);

// ---------------------------------------------------------------- estimator
const STEPS = ['Choose services', 'Choose options', 'Add-ons'] as const;

export const Estimator: React.FC<{ id?: string; source: string }> = ({ id = 'estimate', source }) => {
  const { openQuote } = useApp();
  const [step, setStep] = useState(0);
  const [st, setSt] = useState<EstimatorState>(DEFAULT_ESTIMATOR);
  const topRef = useRef<HTMLDivElement>(null);
  const estimate = useMemo(() => calculateEstimate(st), [st]);

  const set = <K extends keyof EstimatorState>(key: K, patch: Partial<EstimatorState[K]>) =>
    setSt((prev) => ({ ...prev, [key]: { ...(prev[key] as object), ...patch } }));
  const toggleIn = <T,>(list: T[], v: T) => (list.includes(v) ? list.filter((x) => x !== v) : [...list, v]);
  const has = (id: EstimateServiceId) => st.services.includes(id);

  const go = (n: number) => {
    setStep(n);
    topRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const pwEmpty = has('power-washing') && estimate.services.find((s) => s.serviceId === 'power-washing')?.lines.length === 0;
  const canSend = st.services.length > 0 && (estimate.total > 0 || estimate.hasCustomQuote);

  const send = () =>
    openQuote({
      services: st.services,
      selections: estimateSelections(estimate),
      plan: has('grass-cutting') ? (st.grass.plan === 'seasonal' ? 'weekly' : st.grass.plan) : undefined,
      propertyType: has('cleaning') && st.cleaning.segment === 'commercial' ? 'commercial' : undefined,
      source: `${source}-estimator`,
    });

  const grassPrice = (plan: (typeof GRASS_PLANS)[number]) => plan.prices[st.grass.size];
  const cleanSize = CLEAN_SIZES.find((s) => s.id === st.cleaning.size)!;

  return (
    <section id={id} className="py-16 bg-white scroll-mt-20">
      <div ref={topRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-24">
        <div className="text-center max-w-2xl mx-auto mb-8 space-y-2">
          <Eyebrow>
            <span className="inline-flex items-center gap-1.5">
              <Calculator className="w-4 h-4" aria-hidden="true" /> Instant estimate
            </span>
          </Eyebrow>
          <h2 className="text-2xl sm:text-3xl font-bold font-montserrat text-[#0B1A2E]">Get an Instant Estimate</h2>
          <p className="text-slate-600 text-base">Pick your services and options to see a starting price. {BUNDLE_TEXT}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          {/* Wizard */}
          <div className="lg:col-span-2 rounded-2xl border border-slate-200 shadow-sm p-4 sm:p-6 space-y-6">
            <ol className="grid grid-cols-3 gap-2" aria-label="Steps">
              {STEPS.map((label, i) => (
                <li key={label}>
                  <button
                    type="button"
                    disabled={i > 0 && st.services.length === 0}
                    onClick={() => go(i)}
                    aria-current={step === i ? 'step' : undefined}
                    className={`w-full text-left rounded-lg px-2 py-2 border-b-4 cursor-pointer disabled:cursor-not-allowed ${step === i ? 'border-[#0A6FE0]' : i < step ? 'border-[#0A6FE0]/40' : 'border-slate-200'}`}
                  >
                    <span className="block text-xs font-semibold text-slate-500">Step {i + 1}</span>
                    <span className={`block text-sm font-bold ${step === i ? 'text-[#0B1A2E]' : 'text-slate-600'}`}>{label}</span>
                  </button>
                </li>
              ))}
            </ol>

            {/* STEP 1: services */}
            {step === 0 && (
              <div className="space-y-3">
                <p className="text-sm font-bold text-slate-800">Which services do you need? (choose all that apply)</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {SERVICES.map((s) => (
                    <Toggle key={s.id} checked={has(s.id)} onChange={() => setSt((p) => ({ ...p, services: toggleIn(p.services, s.id) }))} label={s.name} sub={s.seasonLabel} />
                  ))}
                </div>
              </div>
            )}

            {/* STEP 2: options */}
            {step === 1 && (
              <div className="space-y-4">
                {has('grass-cutting') && (
                  <ServiceCard id="grass-cutting">
                    <Choice label="Lawn size" cols={3} value={st.grass.size} onChange={(v) => set('grass', { size: v })} options={LAWN_SIZES.map((l) => ({ value: l.id, label: l.label, sub: l.detail }))} />
                    <Choice
                      label="How often?"
                      cols={2}
                      value={st.grass.plan}
                      onChange={(v) => set('grass', { plan: v })}
                      options={[
                        ...GRASS_PLANS.map((p) => ({ value: p.id, label: p.name, sub: `from ${money(grassPrice(p))} ${p.unit}` })),
                        { value: 'seasonal' as const, label: SEASONAL_PLAN.name, sub: `weekly cuts, from ${money(seasonalMonthly(st.grass.size))} / month` },
                      ]}
                    />
                  </ServiceCard>
                )}

                {has('power-washing') && (
                  <ServiceCard id="power-washing">
                    <Toggle checked={st.pw.package} onChange={(v) => set('pw', { package: v })} label={`${PW_PACKAGE.label} (${PW_PACKAGE.badge})`} sub={`${PW_PACKAGE.detail}, from ${money(PW_PACKAGE.price)}`} />
                    {!st.pw.package && (
                      <>
                        <Choice
                          label="Driveway"
                          cols={4}
                          value={st.pw.driveway}
                          onChange={(v) => set('pw', { driveway: v })}
                          options={[{ value: 'none' as const, label: 'No driveway' }, ...PW_DRIVEWAYS.map((d) => ({ value: d.id, label: d.label.replace(' driveway', ''), sub: `from ${money(d.price)}` }))]}
                        />
                        <div className="space-y-2">
                          <p className="text-sm font-bold text-slate-800">Other surfaces</p>
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                            {PW_SURFACES.map((x) => (
                              <Toggle key={x.id} checked={st.pw.surfaces.includes(x.id)} onChange={() => set('pw', { surfaces: toggleIn(st.pw.surfaces, x.id) })} label={x.label} sub={`from ${money(x.price)}`} />
                            ))}
                          </div>
                        </div>
                      </>
                    )}
                    <Toggle checked={st.pw.fence} onChange={(v) => set('pw', { fence: v })} label={PW_FENCE.label} sub={`from ${money(PW_FENCE.pricePerFoot)} / ${PW_FENCE.unit}`} />
                    {st.pw.fence && <Stepper label="Fence length" sub={PW_FENCE.unit} value={st.pw.fenceFeet} step={10} max={2000} onChange={(n) => set('pw', { fenceFeet: n })} />}
                    {pwEmpty && <p className="text-sm font-semibold text-amber-800">Choose at least one surface to see a power washing price.</p>}
                  </ServiceCard>
                )}

                {has('window-cleaning') && (
                  <ServiceCard id="window-cleaning">
                    <Choice label="Home type" cols={3} value={st.windows.home} onChange={(v) => set('windows', { home: v })} options={WINDOW_HOMES.map((h) => ({ value: h.id, label: h.label, sub: h.detail }))} />
                    <Choice
                      label="Which windows?"
                      value={st.windows.scope}
                      onChange={(v) => set('windows', { scope: v })}
                      options={WINDOW_SCOPES.map((sc) => ({ value: sc.id, label: sc.label, sub: `from ${money(WINDOW_HOMES.find((h) => h.id === st.windows.home)!.prices[sc.id])}` }))}
                    />
                  </ServiceCard>
                )}

                {has('cleaning') && (
                  <ServiceCard id="cleaning">
                    <Choice
                      label="Property"
                      value={st.cleaning.segment}
                      onChange={(v) => set('cleaning', { segment: v })}
                      options={[
                        { value: 'residential' as const, label: 'Residential', sub: 'Home, condo, apartment' },
                        { value: 'commercial' as const, label: 'Commercial', sub: 'Office, retail, plaza' },
                      ]}
                    />
                    {st.cleaning.segment === 'residential' ? (
                      <>
                        <Choice label="Home size" cols={2} value={st.cleaning.size} onChange={(v) => set('cleaning', { size: v })} options={CLEAN_SIZES.map((s) => ({ value: s.id, label: s.label, sub: s.prices ? undefined : 'Custom quote' }))} />
                        <Choice
                          label="Type of clean"
                          cols={3}
                          value={st.cleaning.type}
                          onChange={(v) => set('cleaning', { type: v })}
                          options={CLEAN_TYPES.map((t) => ({ value: t.id, label: t.label, sub: cleanSize.prices ? `from ${money(cleanSize.prices[t.id])}` : 'Custom quote' }))}
                        />
                        {st.cleaning.type === 'standard' && (
                          <Choice
                            label="How often?"
                            cols={3}
                            value={st.cleaning.frequency}
                            onChange={(v) => set('cleaning', { frequency: v })}
                            options={[
                              { value: 'one-time' as const, label: 'One-time' },
                              { value: 'bi-weekly' as const, label: 'Bi-weekly', sub: `${Math.round(RECURRING_DISCOUNTS['bi-weekly'] * 100)}% off from 2nd visit` },
                              { value: 'weekly' as const, label: 'Weekly', sub: `${Math.round(RECURRING_DISCOUNTS.weekly * 100)}% off from 2nd visit` },
                            ]}
                          />
                        )}
                      </>
                    ) : (
                      <Choice
                        label="Space"
                        cols={3}
                        value={st.cleaning.commercial}
                        onChange={(v) => set('cleaning', { commercial: v })}
                        options={COMMERCIAL_PLANS.map((p) => ({ value: p.id, label: p.label, sub: p.monthly ? `from ${money(p.monthly)} / month` : 'Custom quote' }))}
                      />
                    )}
                  </ServiceCard>
                )}
              </div>
            )}

            {/* STEP 3: add-ons */}
            {step === 2 && (
              <div className="space-y-4">
                {has('grass-cutting') && (
                  <ServiceCard id="grass-cutting">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {GRASS_ADDONS.map((a) => (
                        <Toggle key={a.id} checked={st.grass.addons.includes(a.id)} onChange={() => set('grass', { addons: toggleIn(st.grass.addons, a.id) })} label={a.label} sub={`from ${money(a.price)}`} />
                      ))}
                    </div>
                  </ServiceCard>
                )}
                {has('power-washing') && (
                  <ServiceCard id="power-washing">
                    <Toggle checked={st.pw.oilStain} onChange={(v) => set('pw', { oilStain: v })} label="Oil stain treatment" sub={`from ${money(PW_OIL_STAIN.price)}`} />
                  </ServiceCard>
                )}
                {has('window-cleaning') && (
                  <ServiceCard id="window-cleaning">
                    <Stepper label={`${WINDOW_ADDONS[0].label}`} sub={`${money(WINDOW_ADDONS[0].price)} per ${WINDOW_ADDONS[0].unit}`} value={st.windows.screens} max={200} onChange={(n) => set('windows', { screens: n })} />
                    <Stepper label={`${WINDOW_ADDONS[1].label}`} sub={`${money(WINDOW_ADDONS[1].price)} per ${WINDOW_ADDONS[1].unit}`} value={st.windows.tracks} max={200} onChange={(n) => set('windows', { tracks: n })} />
                  </ServiceCard>
                )}
                {has('cleaning') && (
                  <ServiceCard id="cleaning">
                    {st.cleaning.segment === 'residential' ? (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {CLEAN_ADDONS.map((a) => (
                          <Toggle key={a.id} checked={st.cleaning.addons.includes(a.id)} onChange={() => set('cleaning', { addons: toggleIn(st.cleaning.addons, a.id) })} label={a.label} sub={`from ${money(a.price)}`} />
                        ))}
                      </div>
                    ) : (
                      <p className="text-sm text-slate-600">No add-ons for commercial cleaning. We’ll confirm the scope on a free site walkthrough.</p>
                    )}
                  </ServiceCard>
                )}
              </div>
            )}

            {/* Live total on small screens + navigation */}
            <div className="lg:hidden rounded-xl bg-[#0B1A2E] text-white px-4 py-3 flex items-center justify-between" aria-live="polite">
              <span className="text-sm text-slate-300">Estimated starting price</span>
              <span className="text-xl font-extrabold font-montserrat">
                {money(estimate.total)} <span className="text-xs font-semibold text-slate-300">{TAX_LABEL}</span>
              </span>
            </div>
            <div className="flex items-center justify-between gap-3 pt-1">
              <button type="button" onClick={() => go(step - 1)} disabled={step === 0} className="min-h-12 px-5 rounded-lg border border-slate-300 font-bold text-sm text-slate-700 inline-flex items-center gap-2 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed">
                <ArrowLeft className="w-4 h-4" aria-hidden="true" /> Back
              </button>
              {step < STEPS.length - 1 ? (
                <button type="button" onClick={() => go(step + 1)} disabled={st.services.length === 0} className="min-h-12 px-6 rounded-lg bg-[#0A6FE0] hover:bg-[#0759b8] text-white font-bold text-sm inline-flex items-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed">
                  Next <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </button>
              ) : (
                <button type="button" onClick={send} disabled={!canSend} className="min-h-12 px-6 rounded-lg bg-[#0A6FE0] hover:bg-[#0759b8] text-white font-bold text-sm inline-flex items-center gap-2 cursor-pointer disabled:opacity-50">
                  <Send className="w-4 h-4" aria-hidden="true" /> Send Me an Exact Quote
                </button>
              )}
            </div>
          </div>

          {/* Estimate breakdown */}
          <aside className="rounded-2xl bg-[#0B1A2E] text-white p-5 sm:p-6 space-y-4 lg:sticky lg:top-24" aria-live="polite">
            <h3 className="text-lg font-bold font-montserrat">Your estimate</h3>
            {st.services.length === 0 ? (
              <p className="text-sm text-slate-300">Choose at least one service to see your starting price.</p>
            ) : (
              <ul className="space-y-3 text-sm">
                {estimate.services.map((s) => (
                  <li key={s.serviceId} className="space-y-1">
                    <p className="font-bold text-white">{s.name}</p>
                    {s.lines.length === 0 && <p className="text-amber-300">No options selected yet</p>}
                    {s.lines.map((l) => (
                      <p key={l.label} className="flex justify-between gap-3 text-slate-300">
                        <span>{l.label}</span>
                        <span className="whitespace-nowrap text-white">{l.amount === null ? 'Quote' : `${money(l.amount)}${l.unit ? ` ${l.unit}` : ''}`}</span>
                      </p>
                    ))}
                    {s.ongoing && <p className="text-xs text-[#7cc4ff]">Then {s.ongoing}</p>}
                  </li>
                ))}
              </ul>
            )}
            <div className="border-t border-white/15 pt-3 space-y-1 text-sm">
              <p className="flex justify-between text-slate-300">
                <span>Subtotal</span>
                <span>{money(estimate.subtotal)}</span>
              </p>
              {estimate.discountRate > 0 && (
                <p className="flex justify-between text-[#7cc4ff] font-semibold">
                  <span>Bundle discount ({Math.round(estimate.discountRate * 100)}%, {estimate.pricedServiceCount} services)</span>
                  <span>−{money(estimate.discount)}</span>
                </p>
              )}
              <p className="flex justify-between items-baseline pt-1">
                <span className="font-semibold">Estimated starting price</span>
                <span>
                  <span className="text-2xl font-extrabold font-montserrat">{money(estimate.total)}</span> <span className="text-xs text-slate-300">{TAX_LABEL}</span>
                </span>
              </p>
              {estimate.hasCustomQuote && <p className="text-xs text-amber-300">Plus items that need a custom quote.</p>}
              <p className="text-xs text-slate-400">Covers the first visit (or first monthly payment) of each service.</p>
            </div>
            <button type="button" onClick={send} disabled={!canSend} className="w-full min-h-12 rounded-lg bg-[#0A6FE0] hover:bg-[#0759b8] text-white font-bold text-sm inline-flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed">
              <Send className="w-4 h-4" aria-hidden="true" /> Send Me an Exact Quote
            </button>
            <p className="text-xs text-slate-400">{PRICE_DISCLAIMER}</p>
          </aside>
        </div>
      </div>
    </section>
  );
};

export default Estimator;
