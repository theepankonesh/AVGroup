import React from 'react';
import { CheckCircle2, Heart, Shield } from 'lucide-react';
import { BUSINESS, COMMUNITIES, INSURANCE_LINE } from '../config/site';
import { SERVICES } from '../data/services';
import { Link } from '../lib/router';
import { Breadcrumbs, CtaBanner, Eyebrow, Picture, ServiceIcon } from '../components/ui';

/**
 * PLACEHOLDER: add the owner's name, story and a real team photo here.
 * While `OWNER` is empty, the "Meet the owner" section is hidden.
 */
const OWNER = null as { name: string; role: string; bio: string; photo?: string } | null;

export const AboutPage: React.FC<{ path: string }> = ({ path }) => (
  <>
    <section className="bg-[#0B1A2E] text-white py-14 lg:py-20 px-4">
      <div className="max-w-3xl mx-auto space-y-4 text-center">
        <div className="flex justify-center">
          <Breadcrumbs path={path} />
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold font-montserrat">About AV Group</h1>
        <p className="text-slate-300 text-base leading-relaxed">
          An Ottawa property services company focused on four things: grass cutting, power washing, window cleaning, and residential &amp;
          commercial cleaning.
        </p>
      </div>
    </section>

    <section className="py-16 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-5">
          <Eyebrow>Our approach</Eyebrow>
          <h2 className="text-2xl sm:text-3xl font-bold font-montserrat text-[#0B1A2E]">Focused Services, Done Properly</h2>
          <p className="text-base text-slate-700 leading-relaxed">
            Ottawa properties take a beating: long winters, road salt, spring pollen, and a short, intense growing season. We built AV Group
            around the services that keep homes and businesses looking their best through all of it, and we focus on doing those few things
            very well instead of trying to do everything.
          </p>
          <p className="text-base text-slate-700 leading-relaxed">
            Our promise is simple: arrive when scheduled, communicate clearly, use the right equipment for each job, and charge the price we
            quoted.
          </p>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            {SERVICES.map((s) => (
              <li key={s.id}>
                <Link href={s.path} className="flex items-center gap-3 p-3 rounded-lg border border-slate-200 hover:border-[#0A6FE0] text-[15px] font-semibold text-[#0B1A2E]">
                  <span className="text-[#0A6FE0]">
                    <ServiceIcon id={s.id} className="w-5 h-5" />
                  </span>
                  {s.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="space-y-4">
          <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-md">
            <Picture base="/images/ottawa-home-exterior" alt="Well-maintained Ottawa home exterior" sizes="(min-width: 1024px) 50vw, 100vw" className="w-full h-auto" />
          </div>
          <div className="grid grid-cols-2 gap-4 text-center">
            {BUSINESS.yearsInBusiness && (
              <div className="p-4 rounded-xl bg-[#F4F6F9] border border-slate-200">
                <p className="text-2xl font-black text-[#0A6FE0] font-montserrat">{BUSINESS.yearsInBusiness}</p>
                <p className="text-sm font-semibold text-slate-600">Years in business</p>
              </div>
            )}
            <div className="p-4 rounded-xl bg-[#F4F6F9] border border-slate-200">
              <p className="text-2xl font-black text-[#0B1A2E] font-montserrat">{COMMUNITIES.length}</p>
              <p className="text-sm font-semibold text-slate-600">Ottawa communities served</p>
            </div>
            <div className="p-4 rounded-xl bg-[#F4F6F9] border border-slate-200">
              <p className="text-2xl font-black text-[#0B1A2E] font-montserrat">4</p>
              <p className="text-sm font-semibold text-slate-600">Core services</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section className="py-16 bg-[#F4F6F9] border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <Eyebrow>How we operate</Eyebrow>
          <h2 className="text-2xl sm:text-3xl font-bold font-montserrat text-[#0B1A2E]">Our Values</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { icon: CheckCircle2, title: 'Upfront pricing', text: 'Clear, written quotes before we start. No surprise fees or add-ons.' },
            { icon: Heart, title: 'Local pride', text: 'We’re an Ottawa company serving neighbourhoods from Kanata to Orléans, and we treat every property like it’s on our own street.' },
            { icon: Shield, title: 'Safety & coverage', text: `${INSURANCE_LINE}. Certificates are available on request for homeowners, condo boards, and property managers.` },
          ].map((v) => (
            <div key={v.title} className="bg-white rounded-xl p-6 border border-slate-200 space-y-3">
              <span className="w-10 h-10 rounded-lg bg-blue-50 text-[#0A6FE0] flex items-center justify-center">
                <v.icon className="w-5 h-5" aria-hidden="true" />
              </span>
              <h3 className="text-lg font-bold font-montserrat text-[#0B1A2E]">{v.title}</h3>
              <p className="text-[15px] text-slate-600 leading-relaxed">{v.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {OWNER && (
      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <Eyebrow>Meet the owner</Eyebrow>
          {OWNER.photo && <img src={OWNER.photo} alt={OWNER.name} className="w-28 h-28 rounded-full object-cover mx-auto" />}
          <h2 className="text-2xl font-bold font-montserrat text-[#0B1A2E]">{OWNER.name}</h2>
          <p className="text-sm font-semibold text-[#0A6FE0]">{OWNER.role}</p>
          <p className="text-base text-slate-700 leading-relaxed">{OWNER.bio}</p>
        </div>
      </section>
    )}

    <CtaBanner source="about-bottom" title="Let’s Take Care of Your Property" text="Get a free, fixed-price quote for any of our four services." />
  </>
);

export default AboutPage;
