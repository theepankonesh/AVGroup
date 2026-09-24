import { SERVICES, serviceBySlug, type Service } from './data/services';
import { AREA_PAGES, areaBySlug, type AreaPage } from './data/areas';
import { BLOG_POSTS, postBySlug, type BlogPost } from './data/blog';

export type Route =
  | { kind: 'home' }
  | { kind: 'service'; service: Service }
  | { kind: 'area'; area: AreaPage }
  | { kind: 'areas' }
  | { kind: 'gallery' }
  | { kind: 'about' }
  | { kind: 'blog' }
  | { kind: 'post'; post: BlogPost }
  | { kind: 'contact' }
  | { kind: 'privacy' }
  | { kind: 'pricing' }
  | { kind: 'notfound' };

export function resolveRoute(path: string): Route {
  switch (path) {
    case '/':
      return { kind: 'home' };
    case '/areas':
      return { kind: 'areas' };
    case '/gallery':
      return { kind: 'gallery' };
    case '/about':
      return { kind: 'about' };
    case '/blog':
      return { kind: 'blog' };
    case '/contact':
      return { kind: 'contact' };
    case '/privacy':
      return { kind: 'privacy' };
    case '/pricing':
      return { kind: 'pricing' };
  }
  if (path.startsWith('/services/')) {
    const service = serviceBySlug(path.slice('/services/'.length));
    if (service) return { kind: 'service', service };
  }
  if (path.startsWith('/blog/')) {
    const post = postBySlug(path.slice('/blog/'.length));
    if (post) return { kind: 'post', post };
  }
  const area = areaBySlug(path.slice(1));
  if (area) return { kind: 'area', area };
  return { kind: 'notfound' };
}

/** Every indexable URL on the site (used for prerendering and sitemap.xml). */
export const ALL_PATHS: string[] = [
  '/',
  ...SERVICES.map((s) => s.path),
  '/pricing',
  '/areas',
  ...AREA_PAGES.map((a) => a.path),
  '/gallery',
  '/about',
  '/blog',
  ...BLOG_POSTS.map((p) => `/blog/${p.slug}`),
  '/contact',
  '/privacy',
];
