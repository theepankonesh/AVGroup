/**
 * Checks every internal link, image and #anchor in the built site (dist/).
 * Run after `npm run build`:  npm run check-links
 */
import fs from 'node:fs';
import path from 'node:path';

const dist = path.join(process.cwd(), 'dist');
const vercel = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'vercel.json'), 'utf8'));
const redirects = new Map((vercel.redirects || []).map((r) => [r.source, r.destination]));

const htmlFiles = [];
(function walk(dir) {
  for (const f of fs.readdirSync(dir)) {
    const p = path.join(dir, f);
    if (fs.statSync(p).isDirectory()) walk(p);
    else if (f.endsWith('.html')) htmlFiles.push(p);
  }
})(dist);

const fileForUrl = (url) => {
  if (url === '/') return path.join(dist, 'index.html');
  const direct = path.join(dist, url);
  if (fs.existsSync(direct) && fs.statSync(direct).isFile()) return direct;
  const html = path.join(dist, `${url}.html`);
  return fs.existsSync(html) ? html : null;
};

const idsCache = new Map();
const idsIn = (file) => {
  if (!idsCache.has(file)) idsCache.set(file, new Set([...fs.readFileSync(file, 'utf8').matchAll(/\sid="([^"]+)"/g)].map((m) => m[1])));
  return idsCache.get(file);
};

let checked = 0;
const problems = [];
for (const file of htmlFiles) {
  const rel = '/' + path.relative(dist, file).replace(/\\/g, '/');
  const html = fs.readFileSync(file, 'utf8');
  for (const m of html.matchAll(/\s(?:href|src)="(\/[^"]*|#[^"]*)"/g)) {
    const raw = m[1].replace(/&amp;/g, '&');
    const [urlPart, hash] = raw.split('#');
    const url = urlPart || null;
    checked++;
    if (url && redirects.has(url)) {
      problems.push(`${rel}: links to retired URL ${raw} (redirects to ${redirects.get(url)})`);
      continue;
    }
    const target = url ? fileForUrl(url.split('?')[0]) : file;
    if (!target) {
      problems.push(`${rel}: broken link ${raw}`);
      continue;
    }
    if (hash && target.endsWith('.html') && !idsIn(target).has(hash)) {
      problems.push(`${rel}: missing anchor #${hash} on ${url || 'same page'}`);
    }
  }
  for (const m of html.matchAll(/\ssrcset="([^"]+)"/g)) {
    for (const part of m[1].split(',')) {
      const u = part.trim().split(' ')[0];
      checked++;
      if (u.startsWith('/') && !fileForUrl(u)) problems.push(`${rel}: broken srcset image ${u}`);
    }
  }
}

console.log(`Checked ${checked} links/images across ${htmlFiles.length} HTML files.`);
if (problems.length) {
  console.log(`\n${problems.length} problem(s):\n` + [...new Set(problems)].join('\n'));
  process.exit(1);
} else {
  console.log('No broken internal links, images or anchors.');
}
