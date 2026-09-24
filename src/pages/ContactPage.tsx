import React from 'react';
import { Clock, Mail, MapPin, Phone } from 'lucide-react';
import { BUSINESS, COMMUNITIES } from '../config/site';
import QuoteForm from '../components/QuoteForm';
import { Breadcrumbs } from '../components/ui';
import Estimator from '../components/Estimator';

export const ContactPage: React.FC<{ path: string }> = ({ path }) => (
  <>
    <section className="bg-[#0B1A2E] text-white py-14 px-4">
      <div className="max-w-3xl mx-auto space-y-4 text-center">
        <div className="flex justify-center">
          <Breadcrumbs path={path} />
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold font-montserrat">Get a Free Quote in Ottawa</h1>
        <p className="text-slate-300 text-base leading-relaxed">
          Tell us what you need and we’ll send a clear, fixed price. Prefer to talk? Call{' '}
          <a href={BUSINESS.phoneHref} data-track="contact-hero" className="font-bold text-white underline">
            {BUSINESS.phoneDisplay}
          </a>
          .
        </p>
      </div>
    </section>

    <Estimator source="contact" />

    <section className="py-14 bg-[#F4F6F9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs">
          <h2 className="text-xl font-bold font-montserrat text-[#0B1A2E] mb-1">Request your free quote</h2>
          <p className="text-sm text-slate-600 mb-6">No obligation. Quotes are usually prepared from your address and photos.</p>
          <QuoteForm source="contact-page" />
        </div>

        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-5 shadow-xs">
            <h2 className="text-lg font-bold font-montserrat text-[#0B1A2E]">Contact details</h2>
            <ul className="space-y-4 text-[15px] text-slate-700">
              <li className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-[#0A6FE0] shrink-0 mt-0.5" aria-hidden="true" />
                <span>
                  <span className="block text-sm text-slate-600">Phone</span>
                  <a href={BUSINESS.phoneHref} data-track="contact-card" className="font-bold text-[#0B1A2E] hover:text-[#0A6FE0] text-lg">
                    {BUSINESS.phoneDisplay}
                  </a>
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-[#0A6FE0] shrink-0 mt-0.5" aria-hidden="true" />
                <span>
                  <span className="block text-sm text-slate-600">Email</span>
                  <a href={`mailto:${BUSINESS.email}`} className="font-semibold text-slate-800 hover:text-[#0A6FE0]">
                    {BUSINESS.email}
                  </a>
                </span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#0A6FE0] shrink-0 mt-0.5" aria-hidden="true" />
                <span>
                  <span className="block text-sm text-slate-600">Service area</span>
                  <span className="font-semibold text-slate-800">{BUSINESS.areaLabel}</span>
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-[#0A6FE0] shrink-0 mt-0.5" aria-hidden="true" />
                <span>
                  <span className="block text-sm text-slate-600">Hours</span>
                  <span className="font-semibold text-slate-800">{BUSINESS.hoursDisplay}</span>
                </span>
              </li>
            </ul>
            <p className="pt-4 border-t border-slate-100 text-sm text-slate-600 leading-relaxed">
              <span className="font-semibold text-slate-800">Communities served: </span>
              {COMMUNITIES.join(' · ')}
            </p>
          </div>
          <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-xs">
            <iframe
              title="Map of the Ottawa area served by AV Group"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d179240.23199859586!2d-75.89248405809797!3d45.385202860714774!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4cce05b25f5113af%3A0x70f8425629621e0!2sOttawa%2C%20ON!5e0!3m2!1sen!2sca!4v1700000000000!5m2!1sen!2sca"
              width="100%"
              height="260"
              style={{ border: 0 }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </section>
  </>
);

export default ContactPage;
