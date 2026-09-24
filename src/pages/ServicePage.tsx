import React from 'react';
import { Building2, CheckCircle, CheckCircle2, Home, Shield } from 'lucide-react';
import { INSURANCE_LINE } from '../config/site';
import type { Service } from '../data/services';
import { GALLERY_ITEMS } from '../data/proof';
import { Link, useApp } from '../lib/router';
import {
  BeforeAfterCard,
  Breadcrumbs,
  CtaBanner,
  Eyebrow,
  FaqList,
  HowItWorks,
  OtherServices,
  PhoneLink,
  Picture,
  QuoteButton,
  ReviewsSection,
  ServiceAreaLinks,
} from '../components/ui';
import { GrassPricing, ServicePricing } from '../components/pricing';

export const ServicePage: React.FC<{ service: Service; path: string }> = ({ service: s, path }) => {
  const { openQuote } = useApp();
  const gallery = GALLERY_ITEMS.filter((g) => g.serviceId === s.id);
  const galleryItems = gallery.length
    ? gallery
    : s.galleryCaptions.map((title, i) => ({ id: `${s.id}-${i}`, serviceId: s.id, title, location: 'Ottawa' }));

  return (
    <>
      {/* HERO */}
      <section className="relative bg-[#0B1A2E] text-white overflow-hidden">
        <div className="absolute inset-0">
          <Picture base={s.image} alt={s.imageAlt} className="w-full h-full object-cover opacity-30" priority />
          <div className="absolute inset-0 bg-linear-to-r from-[#0B1A2E] via-[#0B1A2E]/90 to-[#0B1A2E]/30" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-24">
          <div className="max-w-3xl space-y-5">
            <Breadcrumbs path={path} />
            <p className="text-xs font-bold uppercase tracking-wider text-[#1E9BFF]">{s.seasonLabel}</p>
            <h1 className="text-3xl sm:text-5xl font-extrabold font-montserrat leading-tight">{s.h1}</h1>
            <p className="text-base sm:text-lg text-slate-200 leading-relaxed">{s.intro[0]}</p>
            <div className="pt-2 flex flex-col sm:flex-row gap-3">
              <QuoteButton services={[s.id]} source={`service-hero-${s.id}`} label={`Get a Free ${s.id === 'cleaning' ? 'Cleaning' : s.name} Quote`} />
              <PhoneLink
                track={`service-hero-${s.id}`}
                className="bg-white/10 hover:bg-white/20 border border-white/25 text-white px-6 py-3.5 rounded-lg text-sm font-bold inline-flex items-center justify-center gap-2"
              />
            </div>
            <p className="pt-1 flex items-center gap-2 text-sm text-slate-300">
              <Shield className="w-4 h-4 text-[#1E9BFF]" aria-hidden="true" />
              {INSURANCE_LINE}
            </p>
          </div>
        </div>
      </section>

      {/* INTRO + WHAT'S INCLUDED (or Residential | Commercial split for cleaning) */}
      {s.split ? (
        <>
          <section className="py-14 bg-white">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
              <p className="text-base sm:text-lg text-slate-700 leading-relaxed">{s.intro[1]}</p>
              <div className="flex flex-col sm:flex-row justify-center gap-3">
                <a href="#residential" className="px-5 py-3 rounded-lg border border-slate-300 font-bold text-sm text-[#0B1A2E] hover:border-[#0A6FE0] inline-flex items-center justify-center gap-2">
                  <Home className="w-4 h-4 text-[#0A6FE0]" aria-hidden="true" /> Residential Cleaning
                </a>
                <a href="#commercial" className="px-5 py-3 rounded-lg border border-slate-300 font-bold text-sm text-[#0B1A2E] hover:border-[#0A6FE0] inline-flex items-center justify-center gap-2">
                  <Building2 className="w-4 h-4 text-[#0A6FE0]" aria-hidden="true" /> Commercial Cleaning
                </a>
              </div>
            </div>
          </section>
          {s.split.map((block) => {
            const dark = block.id === 'commercial';
            return (
              <section
                key={block.id}
                id={block.id}
                className={`py-16 scroll-mt-20 ${dark ? 'bg-[#0B1A2E] text-white' : 'bg-[#F4F6F9] border-y border-slate-200'}`}
              >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
                  <div className="space-y-4">
                    <Eyebrow dark={dark}>{block.eyebrow}</Eyebrow>
                    <h2 className={`text-3xl font-bold font-montserrat ${dark ? 'text-white' : 'text-[#0B1A2E]'}`}>{block.heading}</h2>
                    <p className={`text-base leading-relaxed ${dark ? 'text-slate-300' : 'text-slate-700'}`}>{block.intro}</p>
                    {!dark && (
                      <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-sm">
                        <Picture base="/images/residential-cleaning-ottawa" alt="Clean, bright kitchen in an Ottawa home" sizes="(min-width: 1024px) 50vw, 100vw" className="w-full h-auto" />
                      </div>
                    )}
                    {dark && block.points && (
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                        {block.points.map((p) => (
                          <li key={p.title} className="rounded-xl bg-white/5 border border-white/10 p-4 space-y-1">
                            <p className="font-bold text-white">{p.title}</p>
                            <p className="text-sm text-slate-300 leading-relaxed">{p.text}</p>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                  <div className={`rounded-2xl p-6 sm:p-8 space-y-5 ${dark ? 'bg-white/5 border border-white/10' : 'bg-white border border-slate-200 shadow-xs'}`}>
                    <h3 className={`text-lg font-bold font-montserrat ${dark ? 'text-white' : 'text-[#0B1A2E]'}`}>What’s included</h3>
                    <ul className="space-y-3">
                      {block.included.map((item) => (
                        <li key={item} className="flex items-start gap-3">
                          <CheckCircle className={`w-5 h-5 shrink-0 mt-0.5 ${dark ? 'text-[#1E9BFF]' : 'text-[#0A6FE0]'}`} aria-hidden="true" />
                          <span className={`text-[15px] leading-snug ${dark ? 'text-slate-200' : 'text-slate-800'}`}>{item}</span>
                        </li>
                      ))}
                    </ul>
                    <button
                      type="button"
                      onClick={() =>
                        openQuote(
                          dark
                            ? { services: ['cleaning'], propertyType: 'commercial', requestType: 'walkthrough', source: 'cleaning-commercial' }
                            : { services: ['cleaning'], propertyType: 'residential', source: 'cleaning-residential' },
                        )
                      }
                      className={`w-full py-3.5 rounded-lg font-bold text-sm cursor-pointer ${dark ? 'bg-white text-[#0B1A2E] hover:bg-slate-100' : 'bg-[#0A6FE0] text-white hover:bg-[#0759b8]'}`}
                    >
                      {block.ctaLabel}
                    </button>
                  </div>
                </div>
              </section>
            );
          })}
        </>
      ) : (
        <>
          <section className="py-16 bg-white border-b border-slate-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-5 gap-10">
              <div className="lg:col-span-2 space-y-4">
                <Eyebrow>Why it matters</Eyebrow>
                <h2 className="text-2xl sm:text-3xl font-bold font-montserrat text-[#0B1A2E]">Professional {s.name} in Ottawa</h2>
                <p className="text-base text-slate-700 leading-relaxed">{s.intro[1]}</p>
              </div>
              <div className="lg:col-span-3 space-y-5">
                <h2 className="text-2xl font-bold font-montserrat text-[#0B1A2E]">{s.includedHeading}</h2>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {s.included.map((item) => (
                    <li key={item} className="p-4 rounded-xl bg-[#F4F6F9] border border-slate-200 flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-[#0A6FE0] shrink-0 mt-0.5" aria-hidden="true" />
                      <span className="text-[15px] text-slate-800 leading-snug">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          {s.id === 'grass-cutting' && <GrassPricing source="grass-page" />}

          {/* WHO IT'S FOR */}
          <section className="py-16 bg-[#F4F6F9]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="max-w-3xl mb-8 space-y-2">
                <Eyebrow>Who it’s for</Eyebrow>
                <h2 className="text-2xl sm:text-3xl font-bold font-montserrat text-[#0B1A2E]">For Homes and Businesses</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white rounded-xl p-7 border border-slate-200 space-y-3">
                  <h3 className="flex items-center gap-2 text-lg font-bold font-montserrat text-[#0B1A2E]">
                    <Home className="w-5 h-5 text-[#0A6FE0]" aria-hidden="true" /> Residential
                  </h3>
                  <p className="text-[15px] text-slate-700 leading-relaxed">{s.whoFor.residential}</p>
                  <button type="button" onClick={() => openQuote({ services: [s.id], propertyType: 'residential', source: `service-who-res-${s.id}` })} className="text-sm font-bold text-[#0A6FE0] hover:underline cursor-pointer py-1">
                    Get a residential quote →
                  </button>
                </div>
                <div className="bg-white rounded-xl p-7 border border-slate-200 space-y-3">
                  <h3 className="flex items-center gap-2 text-lg font-bold font-montserrat text-[#0B1A2E]">
                    <Building2 className="w-5 h-5 text-[#0A6FE0]" aria-hidden="true" /> Commercial
                  </h3>
                  <p className="text-[15px] text-slate-700 leading-relaxed">{s.whoFor.commercial}</p>
                  <button type="button" onClick={() => openQuote({ services: [s.id], propertyType: 'commercial', source: `service-who-com-${s.id}` })} className="text-sm font-bold text-[#0A6FE0] hover:underline cursor-pointer py-1">
                    Get a commercial quote →
                  </button>
                </div>
              </div>
            </div>
          </section>
        </>
      )}

      {/* LOCAL OTTAWA CONTENT */}
      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <Eyebrow>Local knowledge</Eyebrow>
          <h2 className="text-2xl sm:text-3xl font-bold font-montserrat text-[#0B1A2E]">{s.local.heading}</h2>
          {s.local.paragraphs.map((p) => (
            <p key={p.slice(0, 20)} className="text-base text-slate-700 leading-relaxed">
              {p}
            </p>
          ))}
        </div>
      </section>

      {/* PRICING (grass cutting shows its plan cards above) */}
      {s.id !== 'grass-cutting' && <ServicePricing serviceId={s.id} source={`service-${s.id}`} />}

      {/* BEFORE / AFTER */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-8 space-y-2">
            <Eyebrow>Before &amp; after</Eyebrow>
            <h2 className="text-2xl sm:text-3xl font-bold font-montserrat text-[#0B1A2E]">{s.id === 'cleaning' ? 'Cleaning' : s.name} Results</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {galleryItems.slice(0, 3).map((g) => (
              <BeforeAfterCard key={g.id} item={g} />
            ))}
          </div>
          <p className="mt-6">
            <Link href="/gallery" className="text-sm font-bold text-[#0A6FE0] hover:underline">
              See the full before &amp; after gallery →
            </Link>
          </p>
        </div>
      </section>

      <HowItWorks steps={s.steps} heading={`How ${s.id === 'cleaning' ? 'Our Cleaning Service' : s.name} Works`} />

      <ReviewsSection serviceId={s.id} />

      {/* FAQ */}
      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 space-y-2">
            <Eyebrow>FAQ</Eyebrow>
            <h2 className="text-2xl sm:text-3xl font-bold font-montserrat text-[#0B1A2E]">
              {s.id === 'cleaning' ? 'Cleaning' : s.name} Questions, Answered
            </h2>
          </div>
          <FaqList faqs={s.faqs} />
        </div>
      </section>

      <ServiceAreaLinks serviceId={s.id} />
      <OtherServices current={s.id} />

      <CtaBanner
        source={`service-bottom-${s.id}`}
        services={[s.id]}
        title={`Get Your Free ${s.id === 'cleaning' ? 'Cleaning' : s.name} Quote in Ottawa`}
        text="Tell us what you need. We’ll send a clear, fixed price, usually without a site visit."
      />
    </>
  );
};

export default ServicePage;
