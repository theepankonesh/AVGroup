/**
 * Build step 3: prerender every route to static HTML so search engines and social
 * previews get full content, titles, canonical tags and schema without running JS.
 * Also writes sitemap.xml, robots.txt and 404.html, and checks vercel.json redirects are in sync.
 */
import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const root = process.cwd();
const dist = path.join(root, 'dist');
const ssrDir = path.join(root, 'dist-ssr');

const template = fs.readFileSync(path.join(dist, 'index.html'), 'utf8');
if (!template.includes('<!--seo:start-->') || !template.includes('<!--app-->')) {
  throw new Error('index.html is missing the <!--seo:start--> / <!--app--> markers');
}

const { render, ALL_PATHS, REDIRECTS, SITE_URL } = await import(pathToFileURL(path.join(ssrDir, 'entry-server.js')).href);

const renderPage = (route) => {
  const { html, head } = render(route);
  return template.replace(/<!--seo:start-->[\s\S]*?<!--seo:end-->/, head).replace('<!--app-->', html);
};

const fileFor = (route) => (route === '/' ? 'index.html' : `${route.slice(1)}.html`);

for (const route of ALL_PATHS) {
  const out = path.join(dist, fileFor(route));
  fs.mkdirSync(path.dirname(out), { recursive: true });
  fs.writeFileSync(out, renderPage(route));
}
fs.writeFileSync(path.join(dist, '404.html'), renderPage('/404'));

// sitemap.xml
const today = new Date().toISOString().slice(0, 10);
const priority = (r) => (r === '/' ? '1.0' : r.startsWith('/services/') ? '0.9' : r.startsWith('/blog/') ? '0.6' : r === '/privacy' ? '0.2' : '0.7');
const sitemap =
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
  ALL_PATHS.map((r) => `  <url>\n    <loc>${SITE_URL}${r === '/' ? '/' : r}</loc>\n    <lastmod>${today}</lastmod>\n    <priority>${priority(r)}</priority>\n  </url>`).join('\n') +
  `\n</urlset>\n`;
fs.writeFileSync(path.join(dist, 'sitemap.xml'), sitemap);

fs.writeFileSync(path.join(dist, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${SITE_URL}/sitemap.xml\n`);

// vercel.json must contain exactly the redirects defined in src/config/redirects.ts
const vercel = JSON.parse(fs.readFileSync(path.join(root, 'vercel.json'), 'utf8'));
const vercelMap = Object.fromEntries((vercel.redirects || []).map((r) => [r.source, r.destination]));
const mismatch = Object.entries(REDIRECTS).filter(([from, to]) => vercelMap[from] !== to);
const extra = Object.keys(vercelMap).filter((from) => !(from in REDIRECTS));
if (mismatch.length || extra.length) {
  throw new Error(`vercel.json redirects are out of sync with src/config/redirects.ts: ${JSON.stringify({ mismatch, extra })}`);
}
if ((vercel.redirects || []).some((r) => r.statusCode !== 301)) throw new Error('All vercel.json redirects must use statusCode 301');

if (SITE_URL === 'https://avgroupottawa.ca') {
  console.warn(`WARNING: VITE_SITE_URL is not set; canonical URLs, sitemap and schema use the placeholder ${SITE_URL}`);
}

fs.rmSync(ssrDir, { recursive: true, force: true });
console.log(`Prerendered ${ALL_PATHS.length} pages + 404.html, sitemap.xml, robots.txt for ${SITE_URL} (${Object.keys(REDIRECTS).length} redirects in sync with vercel.json)`);
