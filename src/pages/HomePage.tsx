import React from 'react';
import { ArrowRight, Building2, CheckCircle2, Clock, Home, MapPin, Shield, Sparkles, ThumbsUp } from 'lucide-react';
import { BUSINESS, COMMUNITIES, INSURANCE_LINE } from '../config/site';
import { nextSpringYear, type SeasonId, type SeasonSettings } from '../config/season';
import { SERVICE_BY_ID } from '../data/services';
import { AREA_PAGES } from '../data/areas';
import { Link, useApp } from '../lib/router';
import {
  CtaBanner,
  Eyebrow,
  HowItWorks,
  PhoneLink,
  Picture,
  QuoteButton,
  ReviewsSection,
  ServiceIcon,
} from '../components/ui';
import { BundleSection, GrassPricing } from '../components/pricing';
import Estimator from '../components/Estimator';

interface HomePageProps {
  seasonId: SeasonId;
  season: SeasonSettings;
}

export const HomePage: React.FC<HomePageProps> = ({ seasonId, season }) => {
  const { openQuote } = useApp();
  const featured = season.featuredOrder.map((id) => SERVICE_BY_ID[id]);

  const trust = [
    { icon: Shield, title: 'Insured & WSIB', text: INSURANCE_LINE },
    { icon: MapPin, title: 'Local to Ottawa', text: 'Serving 10 communities across the city' },
    { icon: ThumbsUp, title: 'Free Quotes', text: 'Clear, fixed pricing before we start' },
    BUSINESS.yearsInBusiness
      ? { icon: Clock, title: `${BUSINESS.yearsInBusiness} Years`, text: 'Of Ottawa property care' }
      : { icon: Building2, title: 'Homes & Businesses', text: 'Residential and commercial service' },
  ];

  return (
    <>
      {/* HERO */}
      <section className="relative bg-[#0B1A2E] text-white overflow-hidden">
        <div className="absolute inset-0">
          <Picture
            base="/images/ottawa-home-exterior"
            alt="Well-kept Ottawa home with a freshly cut lawn and clean interlock driveway"
            className="w-full h-full object-cover opacity-45"
            priority
          />
          <div className="absolute inset-0 bg-linear-to-r from-[#0B1A2E] via-[#0B1A2E]/85 to-[#0B1A2E]/20" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-28">
          <div className="max-w-2xl space-y-6">
            <p className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold px-3 py-1.5 rounded-full bg-blue-500/20 text-[#7cc4ff] border border-blue-400/30">
              <Sparkles className="w-4 h-4" aria-hidden="true" />
              {season.heroPill}
            </p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight font-montserrat leading-tight">
              Grass Cutting, Power Washing &amp; Cleaning in{' '}
              <span className="text-transparent bg-clip-text bg-linear-to-r from-[#1E9BFF] to-[#B8BDC4]">Ottawa</span>
            </h1>
            <p className="text-lg sm:text-xl text-slate-200 leading-relaxed">
              Clean spaces. Beautiful properties. Lawn mowing, power washing, window cleaning, and residential &amp; commercial
              cleaning for homes and businesses across Ottawa.
            </p>
            <div className="pt-2 flex flex-col sm:flex-row gap-3.5">
              <QuoteButton source="home-hero" className="bg-[#0A6FE0] hover:bg-[#0759b8] text-white px-7 py-3.5 rounded-lg text-base font-bold shadow-lg inline-flex items-center justify-center gap-2 cursor-pointer" />
              <PhoneLink
                track="home-hero"
                className="bg-white/10 hover:bg-white/20 border border-white/25 text-white px-6 py-3.5 rounded-lg text-base font-bold inline-flex items-center justify-center gap-2"
                iconClassName="w-5 h-5 text-[#1E9BFF]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* TRUST BAR */}
      <section className="bg-white border-b border-slate-200 py-6">
        <ul className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {trust.map((t) => (
            <li key={t.title} className="flex items-center gap-3">
              <span className="w-10 h-10 rounded-lg bg-blue-50 text-[#0A6FE0] flex items-center justify-center shrink-0">
                <t.icon className="w-5 h-5" aria-hidden="true" />
              </span>
              <span>
                <span className="block text-sm sm:text-base font-bold text-[#0B1A2E] font-montserrat">{t.title}</span>
                <span className="block text-xs sm:text-sm text-slate-600">{t.text}</span>
              </span>
            </li>
          ))}
        </ul>
      </section>

      {/* SERVICES GRID: 4 cards, order set in config/season.ts */}
      <section id="services" className="py-20 bg-[#F4F6F9] scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
            <Eyebrow>Our services</Eyebrow>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B1A2E] font-montserrat">
              Property Services for Ottawa Homes &amp; Businesses
            </h2>
            <p className="text-slate-600 text-base leading-relaxed">
              Four services, done properly. Book one, or bundle two or more and save.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featured.map((s) => (
              <article key={s.id} className="bg-white rounded-xl shadow-xs border border-slate-200 overflow-hidden flex flex-col hover:shadow-md transition-shadow group">
                <Link href={s.path} className="relative block h-44 overflow-hidden bg-slate-100" tabIndex={-1} aria-hidden="true">
                  <Picture base={s.image} alt="" sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  <span className="absolute top-3 left-3 bg-white/95 p-2 rounded-lg shadow-sm text-[#0A6FE0]">
                    <ServiceIcon id={s.id} />
                  </span>
                </Link>
                <div className="p-6 flex-1 flex flex-col gap-3">
                  <p className="text-xs font-semibold text-slate-500">{s.seasonLabel}</p>
                  <h3 className="text-lg font-bold text-[#0B1A2E] font-montserrat">
                    <Link href={s.path} className="hover:text-[#0A6FE0]">
                      {s.name}
                    </Link>
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">{s.cardBlurbBySeason?.[seasonId] ?? s.cardBlurb}</p>
                  <div className="mt-auto pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                    <Link href={s.path} className="text-sm font-bold text-[#0A6FE0] hover:text-[#0759b8] inline-flex items-center gap-1 py-2">
                      Learn more <ArrowRight className="w-4 h-4" aria-hidden="true" />
                    </Link>
                    <button type="button" onClick={() => openQuote({ services: [s.id], source: 'home-card' })} className="text-sm font-semibold text-slate-600 hover:text-slate-900 py-2 cursor-pointer">
                      Get a quote
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* SEASONAL: grass plans (outdoor) or book early for spring (indoor) */}
      {season.showGrassPlans && <GrassPricing source="home" heading="Grass Cutting Plans for the Season" />}
      {season.showBookEarly && (
        <section className="bg-linear-to-r from-[#0B1A2E] to-[#122846] text-white py-14">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white/10 rounded-2xl p-6 sm:p-8 border border-white/15 flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="space-y-2 max-w-2xl">
                <Eyebrow dark>Book early for spring</Eyebrow>
                <h2 className="text-2xl font-bold font-montserrat">Reserve Spring {nextSpringYear()} Grass Cutting &amp; Power Washing</h2>
                <p className="text-base text-slate-300">
                  Weekly mowing routes and spring driveway and interlock washing slots fill up fast in April and May. Reserve your spot now and we’ll
                  contact you to schedule as soon as the season opens.
                </p>
              </div>
              <div className="shrink-0 flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                <button type="button" onClick={() => openQuote({ services: ['grass-cutting'], plan: 'weekly', source: 'home-book-early' })} className="bg-[#0A6FE0] hover:bg-[#0759b8] text-white px-6 py-3 rounded-lg font-bold text-sm cursor-pointer">
                  Reserve Grass Cutting
                </button>
                <button type="button" onClick={() => openQuote({ services: ['power-washing'], source: 'home-book-early' })} className="bg-white text-[#0B1A2E] hover:bg-slate-100 px-6 py-3 rounded-lg font-bold text-sm cursor-pointer">
                  Reserve Power Washing
                </button>
              </div>
            </div>
          </div>
        </section>
      )}

      <Estimator source="home" />

      <BundleSection source="home" />

      {/* WHY US */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="space-y-2">
              <Eyebrow>Why AV Group</Eyebrow>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B1A2E] font-montserrat leading-tight">Reliable Property Care, Done Right</h2>
              <p className="text-slate-600 text-base leading-relaxed">
                We keep things simple: show up when we say we will, do the job properly, and charge what we quoted.
              </p>
            </div>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                ['Consistent scheduling', 'Recurring services happen on a set day, with rain-day rescheduling handled for you.'],
                ['Insured & WSIB covered', `${INSURANCE_LINE}. Certificates available on request.`],
                ['Clear, fixed quotes', 'A written price before we start, with no surprise add-ons.'],
                ['One company, four services', 'Lawn, exterior, windows, and cleaning, on one invoice if you bundle.'],
              ].map(([title, text]) => (
                <li key={title} className="p-5 rounded-xl bg-[#F4F6F9] border border-slate-200 space-y-1.5">
                  <p className="flex items-center gap-2 text-base font-bold text-[#0B1A2E]">
                    <CheckCircle2 className="w-5 h-5 text-[#0A6FE0]" aria-hidden="true" />
                    {title}
                  </p>
                  <p className="text-sm text-slate-600 leading-relaxed">{text}</p>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-md">
            <Picture base="/images/power-washing-ottawa" alt="Interlock driveway being cleaned with a surface cleaner" sizes="(min-width: 1024px) 50vw, 100vw" className="w-full h-auto" />
          </div>
        </div>
      </section>

      <HowItWorks
        heading="Booking Is Easy"
        steps={[
          { title: 'Request a free quote', text: 'Use the form or call us. Tell us your area and the services you need.' },
          { title: 'Get a fixed price', text: 'We quote from photos, satellite imagery, or a quick visit, and schedule a time that suits you.' },
          { title: 'Enjoy the results', text: 'Our crew does the work and cleans up. Recurring services continue on schedule.' },
        ]}
      />

      {/* RESIDENTIAL vs COMMERCIAL */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="rounded-2xl border border-slate-200 p-8 sm:p-10 bg-linear-to-b from-white to-slate-50 flex flex-col gap-5 shadow-xs">
            <Eyebrow>
              <span className="inline-flex items-center gap-2">
                <Home className="w-4 h-4" aria-hidden="true" /> For homeowners
              </span>
            </Eyebrow>
            <h2 className="text-2xl sm:text-3xl font-bold font-montserrat text-[#0B1A2E]">Residential Services</h2>
            <ul className="space-y-2 text-base text-slate-700">
              {['Weekly & bi-weekly grass cutting', 'Driveway, interlock & deck power washing', 'Interior & exterior window cleaning', 'Regular, deep & move-out house cleaning'].map((t) => (
                <li key={t} className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" aria-hidden="true" /> {t}
                </li>
              ))}
            </ul>
            <div className="mt-auto pt-2">
              <button type="button" onClick={() => openQuote({ propertyType: 'residential', source: 'home-residential' })} className="w-full sm:w-auto bg-[#0A6FE0] hover:bg-[#0759b8] text-white px-6 py-3 rounded-lg font-bold text-sm cursor-pointer">
                Get a Residential Quote
              </button>
            </div>
          </div>
          <div className="rounded-2xl border border-slate-800 p-8 sm:p-10 bg-[#0B1A2E] text-white flex flex-col gap-5 shadow-lg">
            <Eyebrow dark>
              <span className="inline-flex items-center gap-2">
                <Building2 className="w-4 h-4" aria-hidden="true" /> For property managers &amp; businesses
              </span>
            </Eyebrow>
            <h2 className="text-2xl sm:text-3xl font-bold font-montserrat">Commercial Services</h2>
            <ul className="space-y-2 text-base text-slate-300">
              {['Office, retail & plaza cleaning contracts', 'After-hours & weekend scheduling', 'Storefront glass & walkway power washing', 'Proof of insurance & WSIB provided'].map((t) => (
                <li key={t} className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#1E9BFF] shrink-0" aria-hidden="true" /> {t}
                </li>
              ))}
            </ul>
            <div className="mt-auto pt-2 flex flex-col sm:flex-row gap-3">
              <button type="button" onClick={() => openQuote({ propertyType: 'commercial', requestType: 'walkthrough', services: ['cleaning'], source: 'home-commercial' })} className="bg-white hover:bg-slate-100 text-[#0B1A2E] px-6 py-3 rounded-lg font-bold text-sm cursor-pointer">
                Request a Site Walkthrough
              </button>
              <Link href="/services/cleaning-services-ottawa#commercial" className="text-center border border-white/40 hover:bg-white/10 px-6 py-3 rounded-lg font-bold text-sm">
                Commercial Cleaning
              </Link>
            </div>
          </div>
        </div>
      </section>

      <ReviewsSection />

      {/* SERVICE AREAS */}
      <section className="py-20 bg-[#F4F6F9] border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-10 space-y-2">
            <Eyebrow>Where we work</Eyebrow>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B1A2E] font-montserrat">Serving Ottawa &amp; Surrounding Communities</h2>
            <p className="text-slate-600 text-base">{COMMUNITIES.join(' · ')}</p>
          </div>
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
            {AREA_PAGES.map((a) => (
              <li key={a.slug}>
                <Link href={a.path} className="flex items-center gap-2 p-3.5 rounded-xl border border-slate-200 bg-white hover:border-[#0A6FE0] text-sm font-semibold text-slate-800 hover:text-[#0A6FE0] h-full">
                  <MapPin className="w-4 h-4 text-[#0A6FE0] shrink-0" aria-hidden="true" />
                  {SERVICE_BY_ID[a.serviceId].id === 'cleaning' ? 'Cleaning' : SERVICE_BY_ID[a.serviceId].name} {a.area}
                </Link>
              </li>
            ))}
          </ul>
          <p className="text-center mt-6">
            <Link href="/areas" className="text-sm font-bold text-[#0A6FE0] hover:underline">
              View all service areas
            </Link>
          </p>
        </div>
      </section>

      <CtaBanner
        source="home-bottom"
        title="Ready for a cleaner, sharper property? Get your free quote today."
        text="Tell us what you need and where you are. We’ll send a clear, fixed price."
      />
    </>
  );
};

export default HomePage;
