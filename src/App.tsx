import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import MobileCallBar from './components/MobileCallBar';
import QuoteModal from './components/QuoteModal';

import HomePage from './pages/HomePage';
import ServicePage from './pages/ServicePage';
import AreaPage from './pages/AreaPage';
import AreasOverviewPage from './pages/AreasOverviewPage';
import GalleryPage from './pages/GalleryPage';
import AboutPage from './pages/AboutPage';
import BlogPage from './pages/BlogPage';
import BlogPostPage from './pages/BlogPostPage';
import ContactPage from './pages/ContactPage';
import PrivacyPage from './pages/PrivacyPage';
import PricingPage from './pages/PricingPage';
import NotFoundPage from './pages/NotFoundPage';

import { SEASONS, getSeasonId } from './config/season';
import { REDIRECTS } from './config/redirects';
import { AppContext, normalizePath, type QuoteDefaults } from './lib/router';
import { resolveRoute } from './routes';
import { applyHead } from './seo';
import { trackPageView } from './lib/analytics';

export default function App({ initialPath }: { initialPath: string }) {
  const [path, setPath] = useState(initialPath);
  const [quote, setQuote] = useState<{ open: boolean; defaults: QuoteDefaults; key: number }>({ open: false, defaults: {}, key: 0 });
  const pendingHash = useRef<string | null>(null);
  const firstRender = useRef(true);

  const seasonId = getSeasonId();
  const season = SEASONS[seasonId];

  const navigate = useCallback((href: string) => {
    const url = new URL(href, window.location.href);
    if (url.origin !== window.location.origin) {
      window.location.href = href;
      return;
    }
    let target = normalizePath(url.pathname);
    let hash = url.hash;
    const redirect = REDIRECTS[target];
    if (redirect) {
      const r = new URL(redirect, window.location.origin);
      target = r.pathname;
      hash = r.hash || hash;
    }
    window.history.pushState({}, '', target + hash);
    pendingHash.current = hash || null;
    setPath((prev) => {
      if (prev === target) scrollToTarget(hash);
      return target;
    });
  }, []);

  const openQuote = useCallback((defaults: QuoteDefaults = {}) => {
    setQuote((q) => ({ open: true, defaults, key: q.key + 1 }));
  }, []);

  // Back/forward buttons
  useEffect(() => {
    const onPop = () => setPath(normalizePath(window.location.pathname));
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);

  // After each route change: update <head>, analytics, scroll position
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      trackPageView(path);
      return;
    }
    applyHead(path);
    trackPageView(path);
    scrollToTarget(pendingHash.current);
    pendingHash.current = null;
  }, [path]);

  const ctx = useMemo(() => ({ path, navigate, openQuote }), [path, navigate, openQuote]);

  return (
    <AppContext.Provider value={ctx}>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:bg-white focus:text-[#0B1A2E] focus:px-4 focus:py-2 focus:rounded focus:shadow">
        Skip to content
      </a>
      <div className="min-h-screen flex flex-col bg-white text-[#0B1A2E]">
        <Header season={season} />
        <main id="main" className="flex-1">
          <Page path={path} seasonId={seasonId} />
        </main>
        <Footer />
        <MobileCallBar />
        <QuoteModal isOpen={quote.open} defaults={quote.defaults} openKey={quote.key} onClose={() => setQuote((q) => ({ ...q, open: false }))} />
      </div>
    </AppContext.Provider>
  );
}

function scrollToTarget(hash: string | null) {
  if (hash) {
    const el = document.getElementById(decodeURIComponent(hash.slice(1)));
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      return;
    }
  }
  window.scrollTo({ top: 0 });
}

function Page({ path, seasonId }: { path: string; seasonId: ReturnType<typeof getSeasonId> }) {
  const route = resolveRoute(path);
  switch (route.kind) {
    case 'home':
      return <HomePage seasonId={seasonId} season={SEASONS[seasonId]} />;
    case 'service':
      return <ServicePage key={path} service={route.service} path={path} />;
    case 'area':
      return <AreaPage key={path} area={route.area} path={path} />;
    case 'areas':
      return <AreasOverviewPage path={path} />;
    case 'gallery':
      return <GalleryPage path={path} />;
    case 'about':
      return <AboutPage path={path} />;
    case 'blog':
      return <BlogPage path={path} />;
    case 'post':
      return <BlogPostPage key={path} post={route.post} path={path} />;
    case 'contact':
      return <ContactPage path={path} />;
    case 'privacy':
      return <PrivacyPage path={path} />;
    case 'pricing':
      return <PricingPage path={path} />;
    default:
      return <NotFoundPage />;
  }
}
