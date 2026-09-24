/**
 * Vercel Serverless Function: POST /api/quote
 *
 * Receives quote / walkthrough requests from the website and emails them to the business
 * through Resend (https://resend.com). API keys stay on the server and are never sent to the browser.
 *
 * Environment variables (set in Vercel → Project → Settings → Environment Variables):
 *   RESEND_API_KEY     Resend API key
 *   QUOTE_TO_EMAIL     Where quote requests are delivered (the business inbox)
 *   QUOTE_FROM_EMAIL   Verified sender, e.g. "AV Group Website <quotes@yourdomain.ca>"
 */

interface LeadBody {
  requestType?: string;
  propertyType?: string;
  services?: string[];
  plan?: string;
  selections?: string[];
  name?: string;
  phone?: string;
  email?: string;
  area?: string;
  address?: string;
  preferredDate?: string;
  businessName?: string;
  facilityType?: string;
  squareFootage?: string;
  message?: string;
  source?: string;
  /** Honeypot: real visitors never fill this in */
  botcheck?: string;
  /** Milliseconds the visitor spent on the form (bots submit instantly) */
  elapsedMs?: number;
}

const json = (status: number, body: object) =>
  new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' } });

const clean = (v: unknown, max = 500) => (typeof v === 'string' ? v.trim().slice(0, max) : '');

const escapeHtml = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

export async function POST(request: Request): Promise<Response> {
  let body: LeadBody;
  try {
    body = (await request.json()) as LeadBody;
  } catch {
    return json(400, { ok: false, error: 'invalid-json' });
  }

  // Spam protection: honeypot + minimum fill time. Pretend success so bots don't retry.
  if (clean(body.botcheck) || (typeof body.elapsedMs === 'number' && body.elapsedMs < 2500)) {
    return json(200, { ok: true });
  }

  const name = clean(body.name, 100);
  const phone = clean(body.phone, 40);
  const area = clean(body.area, 60);
  const services = Array.isArray(body.services) ? body.services.map((s) => clean(s, 60)).filter(Boolean).slice(0, 4) : [];
  const email = clean(body.email, 120);
  const phoneDigits = phone.replace(/\D/g, '');

  if (!name || !area || services.length === 0 || !(phoneDigits.length === 10 || (phoneDigits.length === 11 && phoneDigits.startsWith('1')))) {
    return json(422, { ok: false, error: 'invalid-fields' });
  }
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return json(422, { ok: false, error: 'invalid-fields' });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.QUOTE_TO_EMAIL;
  const from = process.env.QUOTE_FROM_EMAIL;
  if (!apiKey || !to || !from) {
    return json(503, { ok: false, error: 'not-configured' });
  }

  const isWalkthrough = clean(body.requestType) === 'walkthrough';
  const subject = `${isWalkthrough ? 'Site walkthrough request' : 'Quote request'}: ${services.join(', ')} (${area})`;
  const rows: [string, string][] = [
    ['Request type', isWalkthrough ? 'Site walkthrough' : 'Quote'],
    ['Property type', clean(body.propertyType, 20)],
    ['Services', services.join(', ')],
    ['Grass cutting plan', clean(body.plan, 40)],
    ['Selected options / estimate', Array.isArray(body.selections) ? body.selections.slice(0, 40).map((x) => clean(x, 300)).filter(Boolean).join('\n') : ''],
    ['Name', name],
    ['Phone', phone],
    ['Email', email],
    ['Area', area],
    ['Address', clean(body.address, 200)],
    ['Preferred start date', clean(body.preferredDate, 20)],
    ['Business / facility', clean(body.businessName, 120)],
    ['Facility type', clean(body.facilityType, 60)],
    ['Approx. size', clean(body.squareFootage, 40)],
    ['Notes', clean(body.message, 3000)],
    ['Submitted from', clean(body.source, 80)],
  ].filter(([, v]) => v) as [string, string][];

  const html =
    `<h2 style="font-family:sans-serif">${escapeHtml(subject)}</h2>` +
    `<table cellpadding="6" style="font-family:sans-serif;border-collapse:collapse">` +
    rows.map(([k, v]) => `<tr><td style="font-weight:bold;vertical-align:top">${escapeHtml(k)}</td><td>${escapeHtml(v).replace(/\n/g, '<br>')}</td></tr>`).join('') +
    `</table>`;
  const text = rows.map(([k, v]) => `${k}: ${v}`).join('\n');

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ from, to: [to], subject, html, text, ...(email ? { reply_to: email } : {}) }),
    });
    if (!res.ok) {
      console.error('Resend error', res.status, await res.text().catch(() => ''));
      return json(502, { ok: false, error: 'send-failed' });
    }
    return json(200, { ok: true });
  } catch (err) {
    console.error('Resend request failed', err);
    return json(502, { ok: false, error: 'send-failed' });
  }
}
