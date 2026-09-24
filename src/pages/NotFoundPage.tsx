import React from 'react';
import { ArrowRight, Home } from 'lucide-react';
import { SERVICES } from '../data/services';
import { Link } from '../lib/router';
import { QuoteButton } from '../components/ui';

export const NotFoundPage: React.FC = () => (
  <div className="py-20 px-4 max-w-3xl mx-auto text-center space-y-6">
    <p className="w-16 h-16 rounded-full bg-blue-50 text-[#0A6FE0] mx-auto flex items-center justify-center font-black text-2xl font-montserrat">404</p>
    <h1 className="text-3xl sm:text-4xl font-extrabold font-montserrat text-[#0B1A2E]">Page Not Found</h1>
    <p className="text-slate-600 text-base max-w-md mx-auto">This page may have moved. Here are our Ottawa services:</p>
    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-lg mx-auto text-left">
      {SERVICES.map((s) => (
        <li key={s.id}>
          <Link href={s.path} className="p-3.5 bg-white border border-slate-200 rounded-lg hover:border-[#0A6FE0] text-sm font-semibold text-slate-800 flex items-center justify-between">
            {s.name}
            <ArrowRight className="w-4 h-4 text-[#0A6FE0]" aria-hidden="true" />
          </Link>
        </li>
      ))}
    </ul>
    <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
      <Link href="/" className="bg-[#0B1A2E] hover:bg-[#162D4A] text-white px-6 py-3 rounded-lg text-sm font-bold inline-flex items-center gap-2">
        <Home className="w-4 h-4" aria-hidden="true" /> Back to homepage
      </Link>
      <QuoteButton source="404" label="Request a Free Quote" />
    </div>
  </div>
);

export default NotFoundPage;
