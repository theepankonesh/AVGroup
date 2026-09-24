import React, { useEffect, useRef, useState } from 'react';
import { Calendar, ChevronDown, Menu, Phone, X } from 'lucide-react';
import Logo from './Logo';
import { BUSINESS } from '../config/site';
import type { SeasonSettings } from '../config/season';
import { SERVICES } from '../data/services';
import { AREA_PAGES } from '../data/areas';
import { Link, useApp } from '../lib/router';
import { ServiceIcon } from './ui';

interface HeaderProps {
  season: SeasonSettings;
}

type MenuId = 'services' | 'areas' | null;

const CLEANING_COMMERCIAL = '/services/cleaning-services-ottawa#commercial';

export const Header: React.FC<HeaderProps> = ({ season }) => {
  const { path, openQuote } = useApp();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [menu, setMenu] = useState<MenuId>(null);
  const navRef = useRef<HTMLElement>(null);

  // Close menus on route change, Escape, or outside click.
  useEffect(() => {
    setMobileOpen(false);
    setMenu(null);
  }, [path]);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMenu(null);
        setMobileOpen(false);
      }
    };
    const onClick = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) setMenu(null);
    };
    document.addEventListener('keydown', onKey);
    document.addEventListener('click', onClick);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('click', onClick);
    };
  }, []);

  const isServices = path.startsWith('/services/');
  const isAreas = path === '/areas' || AREA_PAGES.some((a) => a.path === path);
  const linkCls = (active: boolean) =>
    `whitespace-nowrap text-sm font-semibold transition-colors hover:text-[#0A6FE0] ${active ? 'text-[#0A6FE0]' : 'text-[#0B1A2E]'}`;

  const dropdown = (id: Exclude<MenuId, null>, label: string, active: boolean, children: React.ReactNode) => (
    <div className="relative" onMouseEnter={() => setMenu(id)} onMouseLeave={() => setMenu(null)}>
      <button
        type="button"
        className={`flex items-center gap-1 py-2 ${linkCls(active)}`}
        aria-expanded={menu === id}
        aria-controls={`menu-${id}`}
        onClick={() => setMenu(menu === id ? null : id)}
      >
        {label}
        <ChevronDown className="w-3.5 h-3.5 text-slate-400" aria-hidden="true" />
      </button>
      <div
        id={`menu-${id}`}
        hidden={menu !== id}
        className="absolute top-full left-0 w-80 bg-white rounded-lg shadow-xl border border-slate-100 py-2"
      >
        {children}
      </div>
    </div>
  );

  return (
    <>
      {/* Seasonal promo bar: scrolls away (not sticky) so it never eats mobile screen space */}
      <div className="bg-[#0B1A2E] text-white text-xs sm:text-sm py-2 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
          <p className="text-slate-200 min-w-0">
            <span className="font-semibold text-[#1E9BFF]">{season.banner.label}: </span>
            <span className="hidden sm:inline">{season.banner.text} </span>
            <button
              type="button"
              onClick={() => openQuote({ services: season.banner.ctaServices, source: 'promo-bar' })}
              className="underline font-semibold text-white hover:text-[#1E9BFF] cursor-pointer"
            >
              {season.banner.ctaLabel}
            </button>
          </p>
          <a href={BUSINESS.phoneHref} data-track="promo-bar" className="hidden md:flex items-center gap-1.5 text-slate-200 hover:text-white font-semibold shrink-0">
            <Phone className="w-3.5 h-3.5 text-[#1E9BFF]" aria-hidden="true" />
            {BUSINESS.phoneDisplay}
          </a>
        </div>
      </div>

      <header className="sticky top-0 z-40 w-full bg-white shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20 gap-4">
            <Link href="/" aria-label="AV Group home" className="shrink-0 hover:opacity-95">
              <Logo variant="full" />
            </Link>

            <nav ref={navRef} aria-label="Main" className="hidden lg:flex items-center gap-5 2xl:gap-7">
              <Link href="/" className={`hidden xl:inline ${linkCls(path === '/')}`}>
                Home
              </Link>
              {dropdown(
                'services',
                'Services',
                isServices,
                <>
                {SERVICES.map((s) => (
                  <Link key={s.id} href={s.path} className="flex items-start gap-3 px-4 py-2.5 hover:bg-[#F4F6F9] group">
                    <span className="mt-0.5 text-[#0A6FE0]">
                      <ServiceIcon id={s.id} className="w-4 h-4" />
                    </span>
                    <span className="flex flex-col">
                      <span className="text-sm font-semibold text-slate-800 group-hover:text-[#0A6FE0]">{s.name}</span>
                      <span className="text-xs text-slate-600">{s.seasonLabel}</span>
                    </span>
                  </Link>
                ))}
                </>,
              )}
              <Link href={CLEANING_COMMERCIAL} className={linkCls(false)}>
                Commercial
              </Link>
              {dropdown(
                'areas',
                'Service Areas',
                isAreas,
                <>
                {SERVICES.map((s) => {
                  const pages = AREA_PAGES.filter((a) => a.serviceId === s.id);
                  return (
                    <div key={s.id} className="px-4 py-1.5">
                      <p className="text-[11px] font-bold uppercase tracking-wider text-slate-500">{s.name}</p>
                      <div className="flex flex-wrap gap-x-3">
                        {pages.map((a) => (
                          <Link key={a.slug} href={a.path} className="text-sm text-slate-700 hover:text-[#0A6FE0] py-0.5">
                            {a.area}
                          </Link>
                        ))}
                      </div>
                    </div>
                  );
                })}
                <div className="border-t border-slate-100 mt-1 pt-2 px-4">
                  <Link href="/areas" className="text-sm font-semibold text-[#0A6FE0] hover:underline">
                    All service areas
                  </Link>
                </div>
                </>,
              )}
              <Link href="/pricing" className={linkCls(path === '/pricing')}>
                Pricing
              </Link>
              <Link href="/gallery" className={`hidden 2xl:inline ${linkCls(path === '/gallery')}`}>
                Gallery
              </Link>
              <Link href="/about" className={linkCls(path === '/about')}>
                About
              </Link>
              <Link href="/blog" className={linkCls(path.startsWith('/blog'))}>
                Blog
              </Link>
              <Link href="/contact" className={`hidden xl:inline ${linkCls(path === '/contact')}`}>
                Contact
              </Link>
            </nav>

            <div className="flex items-center gap-2 sm:gap-3">
              <a href={BUSINESS.phoneHref} data-track="header" className="hidden xl:flex flex-col text-right leading-tight shrink-0 whitespace-nowrap">
                <span className="text-[11px] text-slate-600 font-medium uppercase">Call us</span>
                <span className="text-sm font-bold text-[#0B1A2E] hover:text-[#0A6FE0]">{BUSINESS.phoneDisplay}</span>
              </a>
              <button
                type="button"
                onClick={() => openQuote({ source: 'header' })}
                className="hidden sm:inline-flex bg-[#0A6FE0] hover:bg-[#0759b8] text-white px-5 py-2.5 rounded-md text-sm font-bold shadow-sm cursor-pointer items-center gap-2 whitespace-nowrap min-h-11"
              >
                <Calendar className="w-4 h-4" aria-hidden="true" />
                <span>Get a Free Quote</span>
              </button>
              <button
                type="button"
                onClick={() => setMobileOpen(!mobileOpen)}
                className="lg:hidden p-2.5 text-slate-700 hover:text-[#0A6FE0] rounded-md focus-visible:ring-2 focus-visible:ring-[#0A6FE0]"
                aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={mobileOpen}
                aria-controls="mobile-menu"
              >
                {mobileOpen ? <X className="w-6 h-6" aria-hidden="true" /> : <Menu className="w-6 h-6" aria-hidden="true" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        <div id="mobile-menu" hidden={!mobileOpen} className="lg:hidden bg-white border-t border-slate-200 px-4 pt-3 pb-6 shadow-lg max-h-[80vh] overflow-y-auto">
          <nav aria-label="Mobile" className="space-y-1">
            <Link href="/" className="block py-3 px-3 text-base font-semibold text-slate-800 rounded hover:bg-[#F4F6F9]">
              Home
            </Link>
            <p className="pt-2 px-3 text-xs font-bold uppercase tracking-wider text-slate-500">Services</p>
            {SERVICES.map((s) => (
              <Link key={s.id} href={s.path} className="flex items-center gap-3 py-3 px-3 text-base text-slate-800 rounded hover:bg-[#F4F6F9]">
                <span className="text-[#0A6FE0]">
                  <ServiceIcon id={s.id} className="w-5 h-5" />
                </span>
                {s.name}
              </Link>
            ))}
            <Link href={CLEANING_COMMERCIAL} className="block py-3 px-3 text-base font-semibold text-slate-800 rounded hover:bg-[#F4F6F9]">
              Commercial Services
            </Link>
            <Link href="/pricing" className="block py-3 px-3 text-base font-semibold text-slate-800 rounded hover:bg-[#F4F6F9]">
              Pricing
            </Link>
            <Link href="/areas" className="block py-3 px-3 text-base font-semibold text-slate-800 rounded hover:bg-[#F4F6F9]">
              Service Areas
            </Link>
            <Link href="/gallery" className="block py-3 px-3 text-base font-semibold text-slate-800 rounded hover:bg-[#F4F6F9]">
              Before &amp; After Gallery
            </Link>
            <Link href="/about" className="block py-3 px-3 text-base font-semibold text-slate-800 rounded hover:bg-[#F4F6F9]">
              About
            </Link>
            <Link href="/blog" className="block py-3 px-3 text-base font-semibold text-slate-800 rounded hover:bg-[#F4F6F9]">
              Blog
            </Link>
            <Link href="/contact" className="block py-3 px-3 text-base font-semibold text-slate-800 rounded hover:bg-[#F4F6F9]">
              Contact
            </Link>
          </nav>
          <div className="pt-4 mt-3 border-t border-slate-200 grid grid-cols-1 gap-2">
            <a href={BUSINESS.phoneHref} data-track="mobile-menu" className="w-full py-3 rounded-lg bg-[#0B1A2E] text-white font-bold text-sm flex items-center justify-center gap-2">
              <Phone className="w-4 h-4 text-[#1E9BFF]" aria-hidden="true" />
              Call {BUSINESS.phoneDisplay}
            </a>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
