import React from 'react';
import { Clock, ExternalLink, Mail, MapPin, Phone, Shield } from 'lucide-react';
import Logo from './Logo';
import { BUSINESS, COMMUNITIES, INSURANCE_LINE } from '../config/site';
import { SERVICES } from '../data/services';
import { AREA_PAGES } from '../data/areas';
import { Link } from '../lib/router';

export const Footer: React.FC = () => {
  const social = [
    { label: 'Facebook', href: BUSINESS.social.facebook },
    { label: 'Instagram', href: BUSINESS.social.instagram },
    { label: 'Google', href: BUSINESS.googleBusinessUrl },
  ].filter((s) => s.href);

  return (
    <footer className="relative bg-[#0B1A2E] text-[#B8BDC4] pt-16 pb-28 lg:pb-12">
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-linear-to-r from-[#0A6FE0] via-[#1E9BFF] to-[#B8BDC4]" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-slate-800">
          <div className="space-y-4">
            <Link href="/" aria-label="AV Group home" className="inline-block">
              <Logo variant="full" theme="dark" />
            </Link>
            <p className="text-sm text-slate-300 leading-relaxed">
              Grass cutting, power washing, window cleaning, and residential &amp; commercial cleaning for homes and businesses across Ottawa.
            </p>
            <p className="flex items-center gap-2 text-sm text-slate-300">
              <Shield className="w-4 h-4 text-[#1E9BFF] shrink-0" aria-hidden="true" />
              {INSURANCE_LINE}
            </p>
            {BUSINESS.googleReviewUrl && (
              <a
                href={BUSINESS.googleReviewUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-semibold px-3 py-2 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700"
              >
                Leave us a Google review <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
              </a>
            )}
          </div>

          <div className="space-y-3">
            <h2 className="text-sm font-bold text-white uppercase tracking-wider font-montserrat">Services</h2>
            <ul className="space-y-1 text-sm">
              {SERVICES.map((s) => (
                <li key={s.id}>
                  <Link href={s.path} className="inline-block py-1 hover:text-white">
                    {s.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/services/cleaning-services-ottawa#commercial" className="inline-block py-1 hover:text-white">
                  Commercial Cleaning Contracts
                </Link>
              </li>
            </ul>
            <h2 className="pt-3 text-sm font-bold text-white uppercase tracking-wider font-montserrat">Company</h2>
            <ul className="space-y-1 text-sm">
              {[
                ['Pricing', '/pricing'],
                ['About', '/about'],
                ['Gallery', '/gallery'],
                ['Blog', '/blog'],
                ['Contact & Quote', '/contact'],
                ['Privacy Policy', '/privacy'],
              ].map(([label, href]) => (
                <li key={href}>
                  <Link href={href} className="inline-block py-1 hover:text-white">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-3">
            <h2 className="text-sm font-bold text-white uppercase tracking-wider font-montserrat">Local Service Pages</h2>
            <ul className="space-y-1 text-sm">
              {AREA_PAGES.map((a) => {
                const svc = SERVICES.find((s) => s.id === a.serviceId)!;
                return (
                  <li key={a.slug}>
                    <Link href={a.path} className="inline-block py-1 hover:text-white">
                      {svc.id === 'cleaning' ? 'Cleaning' : svc.name} {a.area}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="space-y-3">
            <h2 className="text-sm font-bold text-white uppercase tracking-wider font-montserrat">Contact</h2>
            <div className="space-y-3 text-sm text-slate-300">
              <a href={BUSINESS.phoneHref} data-track="footer" className="flex items-center gap-2 hover:text-white">
                <Phone className="w-4 h-4 text-[#1E9BFF] shrink-0" aria-hidden="true" />
                <span className="font-semibold text-white">{BUSINESS.phoneDisplay}</span>
              </a>
              <a href={`mailto:${BUSINESS.email}`} className="flex items-center gap-2 hover:text-white">
                <Mail className="w-4 h-4 text-[#1E9BFF] shrink-0" aria-hidden="true" />
                <span>{BUSINESS.email}</span>
              </a>
              <p className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#1E9BFF] shrink-0 mt-0.5" aria-hidden="true" />
                <span>{BUSINESS.areaLabel}</span>
              </p>
              <p className="flex items-start gap-2">
                <Clock className="w-4 h-4 text-[#1E9BFF] shrink-0 mt-0.5" aria-hidden="true" />
                <span>{BUSINESS.hoursDisplay}</span>
              </p>
            </div>
            <p className="pt-2 text-xs text-slate-400 leading-relaxed">{COMMUNITIES.join(' · ')}</p>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>© {new Date().getFullYear()} AV Group. All rights reserved.</p>
          {social.length > 0 && (
            <div className="flex items-center gap-4">
              {social.map((s) => (
                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className="hover:text-white">
                  {s.label}
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
