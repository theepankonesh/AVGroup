import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import App from './App.tsx';
import { REDIRECTS } from './config/redirects';
import { normalizePath } from './lib/router';
import { applyHead } from './seo';
import { initAnalytics } from './lib/analytics';
import './index.css';

const path = normalizePath(window.location.pathname);

// Fallback if a retired URL is ever served without the vercel.json redirect: send it to its new page.
const redirect = REDIRECTS[path];
if (redirect) {
  window.location.replace(redirect);
} else {
  initAnalytics();
  const container = document.getElementById('root')!;
  const app = (
    <StrictMode>
      <App initialPath={path} />
    </StrictMode>
  );
  if (container.firstElementChild) {
    // Page was prerendered at build time
    hydrateRoot(container, app);
  } else {
    // Dev server: render on the client and set the page's head tags
    applyHead(path);
    createRoot(container).render(app);
  }
}
