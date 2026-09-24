import React from 'react';
import {
  ArrowRight,
  Calendar,
  ChevronDown,
  ChevronRight,
  Droplets,
  Grid2x2,
  ImageIcon,
  MapPin,
  Phone,
  SprayCan,
  Sprout,
  Star,
} from 'lucide-react';
import { BUSINESS, COMMUNITIES } from '../config/site';
import { SERVICES, SERVICE_BY_ID, type Faq, type ServiceId } from '../data/services';
import { BUNDLE_TEXT } from '../config/pricing';
import { AREA_PAGES } from '../data/areas';
import { REVIEWS, type GalleryItem } from '../data/proof';
import { Link, useApp } from '../lib/router';
import { breadcrumbItems } from '../seo';
import BeforeAfterSlider from './BeforeAfterSlider';

// ---------------------------------------------------------------- basics
export const ServiceIcon: React.FC<{ id: ServiceId; className?: string }> = ({ id, className = 'w-6 h-6' }) => {
  const props = { className, 'aria-hidden': true } as const;
  switch (id) {
    case 'grass-cutting':
      return <Sprout {...props} />;
    case 'power-washing':
      return <Droplets {...props} />;
    case 'window-cleaning':
      return <Grid2x2 {...props} />;
    case 'cleaning':
      return <SprayCan {...props} />;
  }
};

/** Responsive WebP image. `base` is the path without extension, e.g. /images/grass-cutting-ottawa */
export const Picture: React.FC<{
  base: string;
  alt: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
}> = ({ base, alt, className, sizes = '100vw', priority }) => (
  <img
    src={`${base}.webp`}
    srcSet={`${base}-768.webp 768w, ${base}.webp 1376w`}
    sizes={sizes}
    width={1376}
    height={768}
    alt={alt}
    className={className}
    loading={priority ? 'eager' : 'lazy'}
    fetchPriority={priority ? 'high' : 'auto'}
    decoding="async"
  />
);

export const PhoneLink: React.FC<{ className?: string; label?: string; track?: string; iconClassName?: string }> = ({
  className,
  label,
  track,
  iconClassName = 'w-4 h-4 text-[#1E9BFF]',
}) => (
  <a href={BUSINESS.phoneHref} className={className} data-track={track}>
    <Phone className={iconClassName} aria-hidden="true" />
    <span>{label ?? `Call ${BUSINESS.phoneDisplay}`}</span>
  </a>
);

export const Eyebrow: React.FC<{ children: React.ReactNode; dark?: boolean }> = ({ children, dark }) => (
  <span className={`text-xs font-bold uppercase tracking-wider ${dark ? 'text-[#1E9BFF]' : 'text-[#0A6FE0]'}`}>
    {children}
  </span>
);

export const Breadcrumbs: React.FC<{ path: string }> = ({ path }) => {
  const items = breadcrumbItems(path);
  if (items.length < 2) return null;
  return (
    <nav aria-label="Breadcrumb" className="text-xs text-slate-300">
      <ol className="flex flex-wrap items-center gap-1">
        {items.map((it, i) => (
          <li key={it.path} className="flex items-center gap-1">
            {i > 0 && <ChevronRight className="w-3 h-3 text-slate-500" aria-hidden="true" />}
            {i < items.length - 1 ? (
              <Link href={it.path} className="hover:text-white underline-offset-2 hover:underline">
                {it.name}
              </Link>
            ) : (
              <span aria-current="page" className="text-slate-400 line-clamp-1">
                {it.name}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export const QuoteButton: React.FC<{
  label?: string;
  services?: ServiceId[];
  className?: string;
  source: string;
}> = ({ label = 'Get a Free Quote', services, className, source }) => {
  const { openQuote } = useApp();
  return (
    <button
      type="button"
      onClick={() => openQuote({ services, source })}
      className={
        className ??
        'bg-[#0A6FE0] hover:bg-[#0759b8] text-white px-7 py-3.5 rounded-lg text-sm font-bold shadow-lg transition-colors inline-flex items-center justify-center gap-2 cursor-pointer'
      }
    >
      <Calendar className="w-4 h-4" aria-hidden="true" />
      <span>{label}</span>
    </button>
  );
};

// ---------------------------------------------------------------- CTA banner
export const CtaBanner: React.FC<{ title: string; text: string; services?: ServiceId[]; source: string }> = ({
  title,
  text,
  services,
  source,
}) => (
  <section className="bg-linear-to-r from-[#0B1A2E] via-[#0A4FA8] to-[#0B1A2E] text-white py-16 px-4">
    <div className="max-w-3xl mx-auto text-center space-y-5">
      <h2 className="text-2xl sm:text-3xl font-extrabold font-montserrat leading-tight">{title}</h2>
      <p className="text-slate-200 text-base">{text}</p>
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
        <QuoteButton
          services={services}
          source={source}
          className="w-full sm:w-auto bg-white text-[#0B1A2E] hover:bg-slate-100 px-8 py-3.5 rounded-lg font-bold text-sm shadow-xl transition-colors inline-flex items-center justify-center gap-2 cursor-pointer"
          label="Request Your Free Quote"
        />
        <PhoneLink
          track={`cta-banner-${source}`}
          className="w-full sm:w-auto border border-white/70 hover:bg-white/10 text-white px-8 py-3.5 rounded-lg font-bold text-sm transition-colors inline-flex items-center justify-center gap-2"
        />
      </div>
    </div>
  </section>
);

// ---------------------------------------------------------------- FAQ (native details, no JS needed)
export const FaqList: React.FC<{ faqs: Faq[] }> = ({ faqs }) => (
  <div className="space-y-3">
    {faqs.map((f, i) => (
      <details key={f.q} className="group bg-white rounded-xl border border-slate-200 overflow-hidden" open={i === 0}>
        <summary className="list-none cursor-pointer px-5 py-4 flex items-center justify-between gap-4 font-semibold text-[15px] text-[#0B1A2E] hover:text-[#0A6FE0] [&::-webkit-details-marker]:hidden">
          <span>{f.q}</span>
          <ChevronDown className="w-4 h-4 text-slate-400 shrink-0 transition-transform group-open:rotate-180" aria-hidden="true" />
        </summary>
        <div className="px-5 pb-4 pt-1 text-sm text-slate-600 leading-relaxed border-t border-slate-100">{f.a}</div>
      </details>
    ))}
  </div>
);

// ---------------------------------------------------------------- How it works
export const HowItWorks: React.FC<{ steps: { title: string; text: string }[]; heading?: string }> = ({
  steps,
  heading = 'How It Works',
}) => (
  <section className="py-16 bg-[#F4F6F9] border-y border-slate-200">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
        <Eyebrow>Simple &amp; transparent</Eyebrow>
        <h2 className="text-2xl sm:text-3xl font-bold font-montserrat text-[#0B1A2E]">{heading}</h2>
      </div>
      <ol className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {steps.map((s, i) => (
          <li key={s.title} className="bg-white rounded-xl p-7 border border-slate-200 shadow-xs text-center space-y-3">
            <div className="w-11 h-11 rounded-full bg-[#0A6FE0] text-white font-extrabold text-lg flex items-center justify-center mx-auto">
              {i + 1}
            </div>
            <h3 className="text-lg font-bold text-[#0B1A2E] font-montserrat">{s.title}</h3>
            <p className="text-sm text-slate-600 leading-relaxed">{s.text}</p>
          </li>
        ))}
      </ol>
    </div>
  </section>
);

// ---------------------------------------------------------------- Before/after (placeholders until real photos)
export const BeforeAfterCard: React.FC<{ item: Pick<GalleryItem, 'title' | 'before' | 'after' | 'location'> }> = ({ item }) => {
  if (item.before && item.after) {
    return <BeforeAfterSlider title={item.title} imageBefore={item.before} imageAfter={item.after} beforeLabel="Before" afterLabel="After" />;
  }
  const Pane = ({ label }: { label: string }) => (
    <div className="aspect-4/3 rounded-lg border-2 border-dashed border-slate-300 bg-slate-50 flex flex-col items-center justify-center gap-1.5 text-center p-3">
      <ImageIcon className="w-6 h-6 text-slate-400" aria-hidden="true" />
      <span className="text-xs font-bold uppercase tracking-wider text-slate-600">{label}</span>
      <span className="text-[11px] text-slate-500">Photo placeholder</span>
    </div>
  );
  return (
    <figure className="bg-white rounded-xl border border-slate-200 p-4 space-y-3 shadow-xs">
      <div className="grid grid-cols-2 gap-3">
        <Pane label="Before" />
        <Pane label="After" />
      </div>
      <figcaption className="text-sm font-semibold text-[#0B1A2E]">{item.title}</figcaption>
      <p className="text-[11px] font-semibold uppercase tracking-wider text-amber-700">
        Placeholder: replace with a real AV Group job photo
      </p>
    </figure>
  );
};

// ---------------------------------------------------------------- Reviews (hidden until real reviews are added)
export const ReviewsSection: React.FC<{ serviceId?: ServiceId }> = ({ serviceId }) => {
  const reviews = serviceId ? REVIEWS.filter((r) => r.serviceId === serviceId) : REVIEWS;
  if (reviews.length === 0) return null;
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <Eyebrow>Client reviews</Eyebrow>
          <h2 className="text-2xl sm:text-3xl font-bold font-montserrat text-[#0B1A2E]">What Ottawa Clients Say</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.slice(0, 6).map((r) => (
            <blockquote key={r.author + r.text.slice(0, 12)} className="bg-[#F4F6F9] rounded-xl p-6 border border-slate-200 space-y-3">
              <div className="flex text-amber-500" aria-label={`${r.rating} out of 5 stars`}>
                {Array.from({ length: r.rating }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-500" aria-hidden="true" />
                ))}
              </div>
              <p className="text-sm text-slate-700 leading-relaxed">“{r.text}”</p>
              <footer className="text-sm font-bold text-[#0B1A2E]">
                {r.author} <span className="font-normal text-slate-600">· {r.location}</span>
              </footer>
            </blockquote>
          ))}
        </div>
        {BUSINESS.googleBusinessUrl && (
          <p className="text-center mt-8">
            <a href={BUSINESS.googleBusinessUrl} target="_blank" rel="noopener noreferrer" className="text-sm font-bold text-[#0A6FE0] hover:underline">
              Read more reviews on Google
            </a>
          </p>
        )}
      </div>
    </section>
  );
};

// ---------------------------------------------------------------- Service areas list for a service
export const ServiceAreaLinks: React.FC<{ serviceId: ServiceId }> = ({ serviceId }) => {
  const pages = AREA_PAGES.filter((a) => a.serviceId === serviceId);
  const svc = SERVICE_BY_ID[serviceId];
  return (
    <section className="py-16 bg-white border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-8 space-y-2">
          <Eyebrow>Service areas</Eyebrow>
          <h2 className="text-2xl sm:text-3xl font-bold font-montserrat text-[#0B1A2E]">{svc.name} Across Ottawa</h2>
          <p className="text-slate-600 text-base">
            We provide {svc.name.toLowerCase()} in these communities. Choose your area for local details.
          </p>
        </div>
        {pages.length > 0 && (
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-6">
            {pages.map((p) => (
              <li key={p.slug}>
                <Link
                  href={p.path}
                  className="flex items-center justify-between gap-3 p-4 rounded-xl border border-slate-200 bg-[#F4F6F9] hover:border-[#0A6FE0] hover:bg-white transition-colors group"
                >
                  <span className="flex items-center gap-2 font-semibold text-[#0B1A2E] group-hover:text-[#0A6FE0]">
                    <MapPin className="w-4 h-4 text-[#0A6FE0]" aria-hidden="true" />
                    {svc.name} in {p.area}
                  </span>
                  <ArrowRight className="w-4 h-4 text-[#0A6FE0]" aria-hidden="true" />
                </Link>
              </li>
            ))}
          </ul>
        )}
        <p className="text-sm text-slate-600">
          <span className="font-semibold text-slate-800">Also serving: </span>
          {COMMUNITIES.join(' · ')}.{' '}
          <Link href="/areas" className="font-bold text-[#0A6FE0] hover:underline">
            See all service areas
          </Link>
        </p>
      </div>
    </section>
  );
};

// ---------------------------------------------------------------- Other services
export const OtherServices: React.FC<{ current: ServiceId; heading?: string }> = ({
  current,
  heading = 'More Ways We Can Help',
}) => (
  <section className="py-16 bg-[#F4F6F9] border-t border-slate-200">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mb-8 space-y-2">
        <Eyebrow>Our other services</Eyebrow>
        <h2 className="text-2xl sm:text-3xl font-bold font-montserrat text-[#0B1A2E]">{heading}</h2>
        <p className="text-slate-600 text-base">{BUNDLE_TEXT}</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {SERVICES.filter((s) => s.id !== current).map((s) => (
          <Link
            key={s.id}
            href={s.path}
            className="p-6 rounded-xl border border-slate-200 bg-white hover:shadow-md transition-all group flex flex-col gap-3"
          >
            <span className="w-10 h-10 rounded-lg bg-blue-50 text-[#0A6FE0] flex items-center justify-center">
              <ServiceIcon id={s.id} className="w-5 h-5" />
            </span>
            <span className="text-lg font-bold font-montserrat text-[#0B1A2E] group-hover:text-[#0A6FE0]">{s.name}</span>
            <span className="text-sm text-slate-600 leading-relaxed">{s.cardBlurb}</span>
            <span className="mt-auto text-sm font-bold text-[#0A6FE0] inline-flex items-center gap-1">
              View {s.name.toLowerCase()} <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </span>
          </Link>
        ))}
      </div>
    </div>
  </section>
);
