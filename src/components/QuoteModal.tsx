import React, { useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import QuoteForm from './QuoteForm';
import type { QuoteDefaults } from '../lib/router';

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaults: QuoteDefaults;
  /** Changes on every open so the form resets with the new defaults */
  openKey: number;
}

/** Accessible quote dialog: native <dialog> gives focus trapping, Escape to close and focus return. */
export const QuoteModal: React.FC<QuoteModalProps> = ({ isOpen, onClose, defaults, openKey }) => {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dlg = ref.current;
    if (!dlg) return;
    if (isOpen && !dlg.open) {
      dlg.showModal();
      document.documentElement.style.overflow = 'hidden';
    } else if (!isOpen && dlg.open) {
      dlg.close();
    }
    if (!isOpen) document.documentElement.style.overflow = '';
  }, [isOpen]);

  const walkthrough = defaults.requestType === 'walkthrough';

  return (
    <dialog
      ref={ref}
      aria-labelledby="quote-dialog-title"
      onClose={onClose}
      onClick={(e) => {
        if (e.target === ref.current) onClose();
      }}
      className="m-auto w-[calc(100%-1.5rem)] max-w-2xl max-h-[92vh] rounded-2xl p-0 shadow-2xl backdrop:bg-black/60 backdrop:backdrop-blur-xs"
    >
      {isOpen && (
        <div className="bg-white">
          <div className="sticky top-0 z-10 bg-[#0B1A2E] text-white px-6 py-5 flex items-center justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-[#1E9BFF]">Free, no-obligation {walkthrough ? 'walkthrough' : 'quote'}</p>
              <h2 id="quote-dialog-title" className="text-xl font-bold font-montserrat text-white">
                {walkthrough ? 'Request a Site Walkthrough' : 'Get Your Free Ottawa Quote'}
              </h2>
            </div>
            <button type="button" onClick={onClose} className="text-slate-300 hover:text-white p-2.5 rounded-md cursor-pointer" aria-label="Close quote form">
              <X className="w-6 h-6" aria-hidden="true" />
            </button>
          </div>
          <div className="p-6 sm:p-8">
            <QuoteForm key={openKey} defaults={defaults} source={defaults.source || 'modal'} onDone={onClose} />
          </div>
        </div>
      )}
    </dialog>
  );
};

export default QuoteModal;
