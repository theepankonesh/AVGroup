import { StrictMode } from 'react';
import { renderToString } from 'react-dom/server';
import App from './App';
import { getRouteMeta, renderHeadTags } from './seo';

export { ALL_PATHS } from './routes';
export { REDIRECTS } from './config/redirects';
export { SITE_URL } from './config/site';

/** Render one route to static HTML + head tags (used by scripts/prerender.mjs at build time). */
export function render(path: string) {
  const html = renderToString(
    <StrictMode>
      <App initialPath={path} />
    </StrictMode>,
  );
  const head = renderHeadTags(getRouteMeta(path));
  return { html, head };
}
