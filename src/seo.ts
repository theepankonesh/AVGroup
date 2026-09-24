import { BUSINESS, COMMUNITIES, GSC_VERIFICATION, SITE_URL } from './config/site';
import { SERVICES, type Faq, type Service, type ServiceId } from './data/services';
import { CURRENCY, MIN_PRICE } from './config/pricing';
import { PRICING_FAQS } from './data/pricingFaqs';
import type { AreaPage } from './data/areas';
import type { BlogPost } from './data/blog';
import { resolveRoute } from './routes';

export interface RouteMeta {
  title: string;
  description: string;
  canonicalPath: string;
  ogType: 'website' | 'article';
  ogImage: string;
  noindex?: boolean;
  jsonLd: object[];
}

const OG_IMAGE = '/images/og-av-group-ottawa.jpg';
const abs = (p: string) => `${SITE_URL}${p === '/' ? '/' : p}`;
const BUSINESS_ID = `${SITE_URL}/#business`;

// ---------------------------------------------------------------- schema builders
function localBusiness() {
  const sameAs = [BUSINESS.googleBusinessUrl, BUSINESS.social.facebook, BUSINESS.social.instagram].filter(Boolean);
  return {
    '@context': 'https://schema.org',
    '@type': 'HomeAndConstructionBusiness',
    '@id': BUSINESS_ID,
    name: BUSINESS.name,
    description:
      'AV Group provides grass cutting, power washing, window cleaning, and residential & commercial cleaning across Ottawa, Ontario.',
    url: abs('/'),
    telephone: BUSINESS.phoneSchema,
    email: BUSINESS.email,
    image: abs(OG_IMAGE),
    priceRange: '$$',
    address: {
      '@type': 'PostalAddress',
      addressLocality: BUSINESS.city,
      addressRegion: BUSINESS.province,
      addressCountry: 'CA',
    },
    areaServed: COMMUNITIES.map((name) => ({ '@type': 'City', name: `${name}, ON` })),
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: BUSINESS.hoursSchema.days,
        opens: BUSINESS.hoursSchema.opens,
        closes: BUSINESS.hoursSchema.closes,
      },
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Property services',
      itemListElement: SERVICES.map((s) => ({
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name: s.name, url: abs(s.path) },
        priceSpecification: priceSpec(s.id),
      })),
    },
    ...(sameAs.length ? { sameAs } : {}),
  };
}

function priceSpec(id: ServiceId) {
  return { '@type': 'PriceSpecification', minPrice: MIN_PRICE[id], priceCurrency: CURRENCY, valueAddedTaxIncluded: false };
}

function serviceSchema(id: ServiceId, name: string, serviceType: string, url: string, description: string, areas: string[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name,
    serviceType,
    description,
    url: abs(url),
    provider: { '@id': BUSINESS_ID },
    areaServed: areas.map((a) => ({ '@type': 'City', name: `${a}, ON` })),
    offers: {
      '@type': 'Offer',
      priceCurrency: CURRENCY,
      url: abs(`/pricing#${id}`),
      priceSpecification: priceSpec(id),
    },
  };
}

function faqSchema(faqs: Faq[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };
}

export function breadcrumbItems(path: string): { name: string; path: string }[] {
  const route = resolveRoute(path);
  const home = { name: 'Home', path: '/' };
  switch (route.kind) {
    case 'service':
      return [home, { name: route.service.name, path: route.service.path }];
    case 'area': {
      const svc = SERVICES.find((s) => s.id === route.area.serviceId)!;
      return [home, { name: svc.name, path: svc.path }, { name: route.area.area, path: route.area.path }];
    }
    case 'post':
      return [home, { name: 'Blog', path: '/blog' }, { name: route.post.title, path: `/blog/${route.post.slug}` }];
    case 'areas':
      return [home, { name: 'Service Areas', path: '/areas' }];
    case 'gallery':
      return [home, { name: 'Gallery', path: '/gallery' }];
    case 'about':
      return [home, { name: 'About', path: '/about' }];
    case 'blog':
      return [home, { name: 'Blog', path: '/blog' }];
    case 'contact':
      return [home, { name: 'Contact', path: '/contact' }];
    case 'privacy':
      return [home, { name: 'Privacy Policy', path: '/privacy' }];
    case 'pricing':
      return [home, { name: 'Pricing', path: '/pricing' }];
    default:
      return [];
  }
}

function breadcrumbSchema(path: string) {
  const items = breadcrumbItems(path);
  if (items.length < 2) return null;
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.name,
      item: abs(it.path),
    })),
  };
}

function blogPostingSchema(post: BlogPost) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.metaDescription,
    datePublished: post.datePublished,
    dateModified: post.datePublished,
    mainEntityOfPage: abs(`/blog/${post.slug}`),
    image: abs(OG_IMAGE),
    author: { '@type': 'Organization', name: BUSINESS.name, url: abs('/') },
    publisher: { '@id': BUSINESS_ID },
  };
}

// ---------------------------------------------------------------- per-route meta
export function getRouteMeta(path: string): RouteMeta {
  const route = resolveRoute(path);
  const base = { canonicalPath: path, ogType: 'website' as const, ogImage: OG_IMAGE };
  const withCrumbs = (schemas: (object | null)[]) =>
    [localBusiness(), ...schemas, breadcrumbSchema(path)].filter(Boolean) as object[];

  switch (route.kind) {
    case 'home':
      return {
        ...base,
        title: 'Grass Cutting, Power Washing & Cleaning in Ottawa | AV Group',
        description:
          'Ottawa grass cutting, power washing, window cleaning, and residential & commercial cleaning. Serving Kanata, Nepean, Barrhaven, Orléans & more. Free quotes.',
        jsonLd: [localBusiness()],
      };
    case 'service': {
      const s: Service = route.service;
      return {
        ...base,
        title: s.metaTitle,
        description: s.metaDescription,
        ogImage: `${s.image}.webp`,
        jsonLd: withCrumbs([
          serviceSchema(s.id, s.h1, s.serviceType, s.path, s.metaDescription, [...COMMUNITIES]),
          faqSchema(s.faqs),
        ]),
      };
    }
    case 'area': {
      const a: AreaPage = route.area;
      const s = SERVICES.find((x) => x.id === a.serviceId)!;
      return {
        ...base,
        title: a.metaTitle,
        description: a.metaDescription,
        ogImage: `${s.image}.webp`,
        jsonLd: withCrumbs([
          serviceSchema(s.id, a.h1, s.serviceType, a.path, a.metaDescription, a.communities),
          faqSchema(a.faqs),
        ]),
      };
    }
    case 'areas':
      return {
        ...base,
        title: 'Service Areas: Ottawa, Kanata, Barrhaven, Orléans | AV Group',
        description:
          'AV Group serves Ottawa, Kanata, Nepean, Barrhaven, Orléans, Gloucester, Stittsville, Manotick, Riverside South and Greely. Find your local service page.',
        jsonLd: withCrumbs([]),
      };
    case 'gallery':
      return {
        ...base,
        title: 'Before & After Gallery | Ottawa Property Services | AV Group',
        description:
          'Before and after results from AV Group grass cutting, power washing, window cleaning and cleaning jobs across Ottawa.',
        jsonLd: withCrumbs([]),
      };
    case 'about':
      return {
        ...base,
        title: 'About AV Group | Ottawa Property Services',
        description:
          'AV Group is an Ottawa property services company offering grass cutting, power washing, window cleaning, and residential & commercial cleaning.',
        jsonLd: withCrumbs([]),
      };
    case 'blog':
      return {
        ...base,
        title: 'Ottawa Lawn, Power Washing & Cleaning Tips | AV Group Blog',
        description:
          'Practical guides for Ottawa homeowners and businesses: lawn mowing schedules, interlock care, window cleaning and move-out cleaning checklists.',
        jsonLd: withCrumbs([]),
      };
    case 'post':
      return {
        ...base,
        ogType: 'article',
        title: route.post.metaTitle,
        description: route.post.metaDescription,
        jsonLd: withCrumbs([blogPostingSchema(route.post)]),
      };
    case 'contact':
      return {
        ...base,
        title: 'Get a Free Quote in Ottawa | Contact AV Group',
        description:
          'Request a free quote for grass cutting, power washing, window cleaning or cleaning in Ottawa. Call or send your details and we will get back to you.',
        jsonLd: withCrumbs([]),
      };
    case 'pricing':
      return {
        ...base,
        title: 'Pricing | Grass Cutting, Power Washing & Cleaning in Ottawa | AV Group',
        description:
          'Starting prices for grass cutting, power washing, window cleaning and house & office cleaning in Ottawa. Bundle and save 10–15%. Get an instant estimate.',
        jsonLd: withCrumbs([
          ...SERVICES.map((s) => serviceSchema(s.id, `${s.name} in Ottawa`, s.serviceType, s.path, s.metaDescription, [...COMMUNITIES])),
          faqSchema(PRICING_FAQS),
        ]),
      };
    case 'privacy':
      return {
        ...base,
        title: 'Privacy Policy | AV Group',
        description: 'How AV Group collects, uses and protects the personal information you share with us.',
        jsonLd: withCrumbs([]),
      };
    default:
      return {
        ...base,
        canonicalPath: '/',
        noindex: true,
        title: 'Page Not Found | AV Group',
        description: 'The page you are looking for could not be found. Explore AV Group services in Ottawa.',
        jsonLd: [],
      };
  }
}

// ---------------------------------------------------------------- rendering
const esc = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

/** Head tags for a route. Every tag carries data-seo so the client can swap them on navigation. */
export function renderHeadTags(meta: RouteMeta): string {
  const url = abs(meta.canonicalPath);
  const img = abs(meta.ogImage);
  const tags = [
    `<title data-seo>${esc(meta.title)}</title>`,
    `<meta data-seo name="description" content="${esc(meta.description)}" />`,
    meta.noindex
      ? `<meta data-seo name="robots" content="noindex, follow" />`
      : `<link data-seo rel="canonical" href="${esc(url)}" />`,
    `<meta data-seo property="og:type" content="${meta.ogType}" />`,
    `<meta data-seo property="og:site_name" content="${esc(BUSINESS.name)}" />`,
    `<meta data-seo property="og:locale" content="en_CA" />`,
    `<meta data-seo property="og:title" content="${esc(meta.title)}" />`,
    `<meta data-seo property="og:description" content="${esc(meta.description)}" />`,
    `<meta data-seo property="og:url" content="${esc(url)}" />`,
    `<meta data-seo property="og:image" content="${esc(img)}" />`,
    `<meta data-seo name="twitter:card" content="summary_large_image" />`,
    `<meta data-seo name="twitter:title" content="${esc(meta.title)}" />`,
    `<meta data-seo name="twitter:description" content="${esc(meta.description)}" />`,
    `<meta data-seo name="twitter:image" content="${esc(img)}" />`,
    ...(GSC_VERIFICATION && meta.canonicalPath === '/' ? [`<meta data-seo name="google-site-verification" content="${esc(GSC_VERIFICATION)}" />`] : []),
    ...meta.jsonLd.map(
      (o) => `<script data-seo type="application/ld+json">${JSON.stringify(o).replace(/</g, '\\u003c')}</script>`,
    ),
  ];
  return tags.join('\n    ');
}

/** Client-side: replace head tags after an in-app navigation. */
export function applyHead(path: string) {
  const meta = getRouteMeta(path);
  document.head.querySelectorAll('[data-seo]').forEach((el) => el.remove());
  document.head.insertAdjacentHTML('beforeend', renderHeadTags(meta));
}
