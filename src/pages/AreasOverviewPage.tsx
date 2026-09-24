import React from 'react';
import { ArrowRight, MapPin } from 'lucide-react';
import { COMMUNITIES } from '../config/site';
import { SERVICES } from '../data/services';
import { AREA_PAGES } from '../data/areas';
import { Link } from '../lib/router';
import { Breadcrumbs, CtaBanner, ServiceIcon } from '../components/ui';

export const AreasOverviewPage: React.FC<{ path: string }> = ({ path }) => (
  <>
    <section className="bg-[#0B1A2E] text-white py-14 px-4">
      <div className="max-w-3xl mx-auto space-y-4 text-center">
        <div className="flex justify-center">
          <Breadcrumbs path={path} />
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold font-montserrat">Service Areas Across Ottawa</h1>
        <p className="text-slate-300 text-base leading-relaxed">
          AV Group provides grass cutting, power washing, window cleaning, and residential &amp; commercial cleaning in {COMMUNITIES.length}{' '}
          communities: {COMMUNITIES.join(', ')}.
        </p>
      </div>
    </section>

    <section className="py-16 bg-[#F4F6F9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        {SERVICES.map((s) => (
          <div key={s.id} className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
            <div className="flex items-center gap-3">
              <span className="w-10 h-10 rounded-lg bg-blue-50 text-[#0A6FE0] flex items-center justify-center">
                <ServiceIcon id={s.id} className="w-5 h-5" />
              </span>
              <h2 className="text-xl font-bold font-montserrat text-[#0B1A2E]">
                <Link href={s.path} className="hover:text-[#0A6FE0]">
                  {s.name}
                </Link>
              </h2>
            </div>
            <ul className="space-y-1">
              {AREA_PAGES.filter((a) => a.serviceId === s.id).map((a) => (
                <li key={a.slug}>
                  <Link href={a.path} className="flex items-center justify-between gap-2 py-2.5 px-3 rounded-lg hover:bg-[#F4F6F9] group">
                    <span className="flex items-center gap-2 text-[15px] font-semibold text-slate-800 group-hover:text-[#0A6FE0]">
                      <MapPin className="w-4 h-4 text-[#0A6FE0]" aria-hidden="true" />
                      {a.area}
                    </span>
                    <span className="text-xs text-slate-500 hidden sm:inline">{a.neighbourhoods.slice(0, 3).join(', ')}</span>
                    <ArrowRight className="w-4 h-4 text-[#0A6FE0] shrink-0" aria-hidden="true" />
                  </Link>
                </li>
              ))}
            </ul>
            <p className="text-sm text-slate-600">
              Not listed? We provide {s.name.toLowerCase()} across all of Ottawa.{' '}
              <Link href={s.path} className="font-bold text-[#0A6FE0] hover:underline">
                {s.name} in Ottawa
              </Link>
            </p>
          </div>
        ))}
      </div>
    </section>

    <CtaBanner
      source="areas-bottom"
      title="Don’t see your neighbourhood? Ask us."
      text="We serve Ottawa and surrounding communities. Send your address and we’ll confirm availability with your quote."
    />
  </>
);

export default AreasOverviewPage;
