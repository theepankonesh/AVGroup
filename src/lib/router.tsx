import React, { createContext, useContext } from 'react';
import type { ServiceId } from '../data/services';
import type { GrassPlanId } from '../config/pricing';

export interface QuoteDefaults {
  services?: ServiceId[];
  propertyType?: 'residential' | 'commercial';
  plan?: GrassPlanId;
  requestType?: 'quote' | 'walkthrough';
  /** Pre-filled price options chosen on a price card, bundle or the instant estimator */
  selections?: string[];
  source?: string;
}

interface AppContextValue {
  path: string;
  navigate: (href: string) => void;
  openQuote: (defaults?: QuoteDefaults) => void;
}

export const AppContext = createContext<AppContextValue>({
  path: '/',
  navigate: () => {},
  openQuote: () => {},
});

export const useApp = () => useContext(AppContext);

/** Normalize a pathname: strip trailing slash (except root) and ".html". */
export function normalizePath(pathname: string): string {
  let p = pathname || '/';
  if (p.endsWith('.html')) p = p.slice(0, -5);
  if (p.endsWith('/index')) p = p.slice(0, -6) || '/';
  if (p.length > 1 && p.endsWith('/')) p = p.slice(0, -1);
  return p || '/';
}

type LinkProps = React.AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };

/** Crawlable internal link: a real <a href> that navigates without a full reload. */
export const Link: React.FC<LinkProps> = ({ href, onClick, children, ...rest }) => {
  const { navigate } = useApp();
  return (
    <a
      href={href}
      onClick={(e) => {
        onClick?.(e);
        if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
        if (rest.target && rest.target !== '_self') return;
        e.preventDefault();
        navigate(href);
      }}
      {...rest}
    >
      {children}
    </a>
  );
};
