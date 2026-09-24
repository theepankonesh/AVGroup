import React from 'react';
import { Calendar, MessageCircle, Phone } from 'lucide-react';
import { BUSINESS } from '../config/site';
import { useApp } from '../lib/router';

/** Pinned call/quote bar on phones and tablets (hidden at 1024px+ where the header shows the phone). */
export const MobileCallBar: React.FC = () => {
  const { openQuote } = useApp();
  const waNumber = BUSINESS.phoneHref.replace(/\D/g, '');
  return (
    <>
      {BUSINESS.whatsappEnabled && (
        <a
          href={`https://wa.me/${waNumber}?text=${encodeURIComponent('Hi AV Group, I’d like a quote.')}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Message AV Group on WhatsApp"
          className="fixed bottom-24 right-4 z-40 bg-[#25D366] hover:bg-[#20ba59] text-white p-3.5 rounded-full shadow-lg lg:bottom-8 lg:right-8"
        >
          <MessageCircle className="w-6 h-6" aria-hidden="true" />
        </a>
      )}

      <div className="fixed bottom-0 left-0 right-0 z-40 bg-[#0B1A2E]/95 backdrop-blur-md border-t border-slate-800 p-2.5 flex items-center gap-2.5 lg:hidden">
        <a
          href={BUSINESS.phoneHref}
          data-track="mobile-call-bar"
          className="flex-1 bg-[#0A6FE0] hover:bg-[#085ac0] text-white py-3 px-2 rounded-lg text-[13px] sm:text-sm font-bold flex items-center justify-center gap-1.5 whitespace-nowrap min-h-12"
        >
          <Phone className="w-4 h-4 shrink-0" aria-hidden="true" />
          <span>Call {BUSINESS.phoneDisplay}</span>
        </a>
        <button
          type="button"
          onClick={() => openQuote({ source: 'mobile-call-bar' })}
          className="flex-1 bg-white hover:bg-slate-100 text-[#0B1A2E] py-3 px-2 rounded-lg text-[13px] sm:text-sm font-bold flex items-center justify-center gap-1.5 whitespace-nowrap cursor-pointer min-h-12"
        >
          <Calendar className="w-4 h-4 text-[#0A6FE0] shrink-0" aria-hidden="true" />
          <span>Free Quote</span>
        </button>
      </div>
    </>
  );
};

export default MobileCallBar;
