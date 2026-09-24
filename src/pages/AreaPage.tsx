import React from 'react';
import { ArrowRight, CheckCircle2, MapPin, Shield } from 'lucide-react';
import { INSURANCE_LINE } from '../config/site';
import { MIN_PRICE, TAX_LABEL, money } from '../config/pricing';
import { SERVICE_BY_ID, SERVICES } from '../data/services';
import { AREA_PAGES, type AreaPage as Area } from '../data/areas';
import { Link, useApp } from '../lib/router';
import { Breadcrumbs, CtaBanner, Eyebrow, FaqList, PhoneLink, Picture, QuoteButton, ReviewsSection } from '../components/ui';

export const AreaPage: React.FC<{ area: Area; path: string }> = ({ area: a, path }) => {
  const { openQuote } = useApp();
  const svc = SERVICE_BY_ID[a.serviceId];
  const sameService = AREA_PAGES.filter((x) => x.serviceId === a.serviceId && x.slug !== a.slug);
  // Other services available in the same community (by matching area name or shared communities)
  const sameArea = AREA_PAGES.filter(
    (x) => x.serviceId !== a.serviceId && x.communities.some((c) => a.communities.includes(c)),
  );
  const svcShort = svc.id === 'cleaning' ? 'Cleaning' : svc.name;

  return (
    <>
      <section className="relative bg-[#0B1A2E] text-white overflow-hidden">
        <div className="absolute inset-0">
          <Picture base={svc.image} alt={`${svc.name} in ${a.area}`} className="w-full h-full object-cover opacity-25" priority />
          <div className="absolute inset-0 bg-linear-to-r from-[#0B1A2E] via-[#0B1A2E]/90 to-[#0B1A2E]/40" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-24">
          <div className="max-w-3xl space-y-5">
            <Breadcrumbs path={path} />
            <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#1E9BFF]">
              <MapPin className="w-3.5 h-3.5" aria-hidden="true" /> {a.area} · {svc.seasonLabel}
            </p>
            <h1 className="text-3xl sm:text-5xl font-extrabold font-montserrat leading-tight">{a.h1}</h1>
            <p className="text-base sm:text-lg text-slate-200 leading-relaxed">{a.intro[0]}</p>
            <div className="pt-2 flex flex-col sm:flex-row gap-3">
              <QuoteButton services={[a.serviceId]} source={`area-hero-${a.slug}`} label={`Get a Free ${a.area} Quote`} />
              <PhoneLink
                track={`area-hero-${a.slug}`}
                className="bg-white/10 hover:bg-white/20 border border-white/25 text-white px-6 py-3.5 rounded-lg text-sm font-bold inline-flex items-center justify-center gap-2"
              />
            </div>
            <p className="flex items-center gap-2 text-sm text-slate-300">
              <Shield className="w-4 h-4 text-[#1E9BFF]" aria-hidden="true" /> {INSURANCE_LINE}
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-5 gap-12">
          <div className="lg:col-span-3 space-y-5">
            <p className="text-base text-slate-700 leading-relaxed">{a.intro[1]}</p>
            <h2 className="text-2xl sm:text-3xl font-bold font-montserrat text-[#0B1A2E]">{a.localHeading}</h2>
            {a.local.map((p) => (
              <p key={p.slice(0, 20)} className="text-base text-slate-700 leading-relaxed">
                {p}
              </p>
            ))}
            <div className="pt-2 space-y-3">
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Neighbourhoods we serve</h3>
              <ul className="flex flex-wrap gap-2">
                {a.neighbourhoods.map((n) => (
                  <li key={n} className="px-3 py-1.5 rounded-md bg-[#F4F6F9] border border-slate-200 text-sm text-slate-700">
                    {n}
                  </li>
                ))}
              </ul>
            </div>
            <p className="text-base text-slate-700">
              Full details on scope, pricing, and FAQs are on our main{' '}
              <Link href={svc.path} className="font-bold text-[#0A6FE0] hover:underline">
                {svc.name.toLowerCase()} in Ottawa
              </Link>{' '}
              page.
            </p>
          </div>

          <aside className="lg:col-span-2 bg-[#F4F6F9] rounded-2xl p-6 sm:p-8 border border-slate-200 space-y-5 h-fit">
            <h2 className="text-lg font-bold font-montserrat text-[#0B1A2E]">
              {svcShort} in {a.area}: what we do
            </h2>
            <ul className="space-y-3">
              {a.highlights.map((h) => (
                <li key={h} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#0A6FE0] shrink-0 mt-0.5" aria-hidden="true" />
                  <span className="text-[15px] text-slate-800">{h}</span>
                </li>
              ))}
            </ul>
            <p className="text-[15px] text-[#0B1A2E]">
              <span className="text-slate-600">Starting from </span>
              <span className="text-xl font-extrabold font-montserrat">{money(MIN_PRICE[a.serviceId])}</span>
              <span className="text-slate-600"> {TAX_LABEL}{a.serviceId === 'grass-cutting' ? ' per cut' : ''}</span>
              <Link href={`/pricing#${a.serviceId}`} className="block text-sm font-bold text-[#0A6FE0] hover:underline mt-1">
                See full pricing →
              </Link>
            </p>
            <button
              type="button"
              onClick={() => openQuote({ services: [a.serviceId], plan: a.serviceId === 'grass-cutting' ? 'weekly' : undefined, source: `area-aside-${a.slug}` })}
              className="w-full bg-[#0A6FE0] hover:bg-[#0759b8] text-white py-3.5 rounded-lg font-bold text-sm cursor-pointer"
            >
              Request a {a.area} Estimate
            </button>
          </aside>
        </div>
      </section>

      <ReviewsSection serviceId={a.serviceId} />

      <section className="py-16 bg-[#F4F6F9]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 space-y-2">
            <Eyebrow>{a.area} FAQ</Eyebrow>
            <h2 className="text-2xl sm:text-3xl font-bold font-montserrat text-[#0B1A2E]">
              {svcShort} in {a.area}: Common Questions
            </h2>
          </div>
          <FaqList faqs={a.faqs} />
        </div>
      </section>

      <section className="py-14 bg-white border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="space-y-4">
            <h2 className="text-lg font-bold font-montserrat text-[#0B1A2E]">{svc.name} in other areas</h2>
            <ul className="space-y-2">
              {sameService.map((x) => (
                <li key={x.slug}>
                  <Link href={x.path} className="inline-flex items-center gap-2 text-[15px] font-semibold text-[#0A6FE0] hover:underline py-1">
                    <MapPin className="w-4 h-4" aria-hidden="true" /> {svcShort} {x.area}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/areas" className="inline-flex items-center gap-2 text-[15px] font-semibold text-[#0A6FE0] hover:underline py-1">
                  All service areas <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h2 className="text-lg font-bold font-montserrat text-[#0B1A2E]">More services near {a.area}</h2>
            <ul className="space-y-2">
              {sameArea.map((x) => (
                <li key={x.slug}>
                  <Link href={x.path} className="inline-flex items-center gap-2 text-[15px] font-semibold text-[#0A6FE0] hover:underline py-1">
                    {SERVICE_BY_ID[x.serviceId].name} in {x.area}
                  </Link>
                </li>
              ))}
              {SERVICES.filter((s) => s.id !== a.serviceId && !sameArea.some((x) => x.serviceId === s.id)).map((s) => (
                <li key={s.id}>
                  <Link href={s.path} className="inline-flex items-center gap-2 text-[15px] font-semibold text-[#0A6FE0] hover:underline py-1">
                    {s.name} in Ottawa
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <CtaBanner
        source={`area-bottom-${a.slug}`}
        services={[a.serviceId]}
        title={`Get a Free ${svcShort} Quote in ${a.area}`}
        text={`Tell us your address in ${a.area} and what you need. We’ll send a clear, fixed price.`}
      />
    </>
  );
};

export default AreaPage;
