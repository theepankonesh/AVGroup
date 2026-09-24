import { GA_ID } from '../config/site';

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

/** Load GA4 (only when VITE_GA_ID is set) and track phone/WhatsApp clicks site-wide. */
export function initAnalytics() {
  if (typeof window === 'undefined') return;

  if (GA_ID && !window.gtag) {
    const s = document.createElement('script');
    s.async = true;
    s.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
    document.head.appendChild(s);
    window.dataLayer = window.dataLayer || [];
    window.gtag = function gtag() {
      // eslint-disable-next-line prefer-rest-params
      window.dataLayer!.push(arguments);
    };
    window.gtag('js', new Date());
    // Page views are sent manually on each route change.
    window.gtag('config', GA_ID, { send_page_view: false });
  }

  document.addEventListener('click', (e) => {
    const a = (e.target as HTMLElement | null)?.closest?.('a');
    if (!a) return;
    const href = a.getAttribute('href') || '';
    if (href.startsWith('tel:')) track('phone_call_click', { link_location: a.dataset.track || 'unspecified' });
    else if (href.includes('wa.me')) track('whatsapp_click', {});
  });
}

export function track(event: string, params: Record<string, unknown> = {}) {
  if (typeof window === 'undefined' || !window.gtag) return;
  window.gtag('event', event, params);
}

export function trackPageView(path: string) {
  if (typeof window === 'undefined' || !window.gtag) return;
  window.gtag('event', 'page_view', { page_path: path, page_location: window.location.href, page_title: document.title });
}
