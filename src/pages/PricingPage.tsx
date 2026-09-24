import React from 'react';
import { ArrowRight } from 'lucide-react';
import { MIN_PRICE, TAX_LABEL, money } from '../config/pricing';
import { SERVICES, SERVICE_BY_ID } from '../data/services';
import { PRICING_FAQS } from '../data/pricingFaqs';
import { Link } from '../lib/router';
import { Breadcrumbs, CtaBanner, Eyebrow, FaqList, ServiceIcon } from '../components/ui';
import { BundleSection, GrassPricing, ServicePricing } from '../components/pricing';
import Estimator from '../components/Estimator';

export const PricingPage: React.FC<{ path: string }> = ({ path }) => (
  <>
    <section className="bg-[#0B1A2E] text-white py-14 px-4">
      <div className="max-w-4xl mx-auto space-y-5 text-center">
        <div className="flex justify-center">
          <Breadcrumbs path={path} />
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold font-montserrat">Pricing</h1>
        <p className="text-slate-300 text-base leading-relaxed">
          Clear starting prices for grass cutting, power washing, window cleaning, and residential &amp; commercial cleaning in Ottawa. All prices
          are before HST.
        </p>
        <nav aria-label="Jump to pricing" className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-2">
          {SERVICES.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              className="rounded-xl bg-white/10 hover:bg-white/15 border border-white/15 p-3 text-left min-h-16 flex flex-col gap-1"
            >
              <span className="flex items-center gap-2 text-sm font-bold">
                <span className="text-[#1E9BFF]">
                  <ServiceIcon id={s.id} className="w-4 h-4" />
                </span>
                {s.id === 'cleaning' ? 'Cleaning' : s.name}
              </span>
              <span className="text-xs text-slate-300">
                from {money(MIN_PRICE[s.id])} {TAX_LABEL}
              </span>
            </a>
          ))}
        </nav>
      </div>
    </section>

    <GrassPricing id="grass-cutting" source="pricing" heading="Grass Cutting Prices" />
    <ServicePricing serviceId="power-washing" id="power-washing" source="pricing" heading="Power Washing Prices" />
    <ServicePricing serviceId="window-cleaning" id="window-cleaning" source="pricing" heading="Window Cleaning Prices" white />
    <ServicePricing serviceId="cleaning" id="cleaning" source="pricing" heading="Residential & Commercial Cleaning Prices" />

    <BundleSection source="pricing" />
    <Estimator source="pricing" />

    <section className="py-16 bg-[#F4F6F9] border-t border-slate-200">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 space-y-2">
          <Eyebrow>Pricing FAQ</Eyebrow>
          <h2 className="text-2xl sm:text-3xl font-bold font-montserrat text-[#0B1A2E]">Pricing Questions, Answered</h2>
        </div>
        <FaqList faqs={PRICING_FAQS} />
        <ul className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-2">
          {SERVICES.map((s) => (
            <li key={s.id}>
              <Link href={s.path} className="inline-flex items-center gap-2 text-sm font-bold text-[#0A6FE0] hover:underline py-1.5">
                More about {SERVICE_BY_ID[s.id].name.toLowerCase()} <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>

    <CtaBanner source="pricing-bottom" title="Want an Exact Price?" text="Send us your address and what you need. Quotes are free and there’s no obligation." />
  </>
);

export default PricingPage;
