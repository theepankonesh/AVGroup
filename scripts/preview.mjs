/**
 * Local production preview that behaves like Vercel: serves dist/ with clean URLs,
 * the 301 redirects and headers from vercel.json, real 404s, and the /api/quote function.
 *
 *   npm run build && npm run preview   →  http://localhost:4173
 *
 * /api/quote reads RESEND_API_KEY, QUOTE_TO_EMAIL and QUOTE_FROM_EMAIL from .env if present.
 * (Runs the TypeScript function directly, which needs Node 22.18+; the project targets Node 24.)
 */
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const root = process.cwd();
const dist = path.join(root, 'dist');
const port = Number(process.env.PORT) || 4173;
const vercel = JSON.parse(fs.readFileSync(path.join(root, 'vercel.json'), 'utf8'));
const redirects = new Map(vercel.redirects.map((r) => [r.source, r]));

// Minimal .env loader for the API function
if (fs.existsSync(path.join(root, '.env'))) {
  for (const line of fs.readFileSync(path.join(root, '.env'), 'utf8').split(/\r?\n/)) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*"?([^"]*)"?\s*$/);
    if (m && !(m[1] in process.env)) process.env[m[1]] = m[2];
  }
}

const TYPES = {
  '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.css': 'text/css', '.webp': 'image/webp',
  '.jpg': 'image/jpeg', '.png': 'image/png', '.svg': 'image/svg+xml', '.ico': 'image/x-icon',
  '.xml': 'application/xml', '.txt': 'text/plain', '.webmanifest': 'application/manifest+json',
};

const headersFor = (pathname) => {
  const out = {};
  for (const rule of vercel.headers) {
    const re = new RegExp('^' + rule.source.replace(/\(\.\*\)/g, '(.*)').replace(/\./g, '\\.').replace(/\\\.\*/g, '.*') + '$');
    if (re.test(pathname)) for (const h of rule.headers) out[h.key] = h.value;
  }
  return out;
};

let quoteHandler;
async function handleApi(req, res) {
  try {
    quoteHandler ??= (await import(pathToFileURL(path.join(root, 'api', 'quote.ts')).href)).POST;
  } catch {
    res.writeHead(503, { 'Content-Type': 'application/json' });
    return res.end(JSON.stringify({ ok: false, error: 'not-configured' }));
  }
  const chunks = [];
  for await (const c of req) chunks.push(c);
  const response = await quoteHandler(new Request(`http://localhost${req.url}`, { method: 'POST', body: Buffer.concat(chunks), headers: { 'Content-Type': 'application/json' } }));
  res.writeHead(response.status, Object.fromEntries(response.headers));
  res.end(await response.text());
}

http
  .createServer(async (req, res) => {
    let pathname = decodeURIComponent(new URL(req.url, 'http://x').pathname);
    if (pathname === '/api/quote' && req.method === 'POST') return handleApi(req, res);

    // trailingSlash: false / cleanUrls: true
    if (pathname.length > 1 && pathname.endsWith('/')) {
      res.writeHead(308, { Location: pathname.slice(0, -1) });
      return res.end();
    }
    if (pathname.endsWith('.html')) {
      res.writeHead(308, { Location: pathname.slice(0, -5).replace(/\/index$/, '/') || '/' });
      return res.end();
    }
    const redirect = redirects.get(pathname);
    if (redirect) {
      res.writeHead(redirect.statusCode, { Location: redirect.destination });
      return res.end();
    }

    let file = pathname === '/' ? path.join(dist, 'index.html') : path.join(dist, pathname);
    if (!(fs.existsSync(file) && fs.statSync(file).isFile())) file = `${file}.html`;
    let status = 200;
    if (!file.startsWith(dist) || !fs.existsSync(file)) {
      file = path.join(dist, '404.html');
      status = 404;
    }
    res.writeHead(status, { 'Content-Type': TYPES[path.extname(file)] || 'application/octet-stream', ...headersFor(pathname) });
    fs.createReadStream(file).pipe(res);
  })
  .listen(port, () => console.log(`Preview (Vercel-like) running at http://localhost:${port}`));
