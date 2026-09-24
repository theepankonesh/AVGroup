import React, { useState } from 'react';
import { SERVICES, type ServiceId } from '../data/services';
import { GALLERY_ITEMS } from '../data/proof';
import { BeforeAfterCard, Breadcrumbs, CtaBanner } from '../components/ui';

export const GalleryPage: React.FC<{ path: string }> = ({ path }) => {
  const [filter, setFilter] = useState<ServiceId | 'all'>('all');
  const items = filter === 'all' ? GALLERY_ITEMS : GALLERY_ITEMS.filter((g) => g.serviceId === filter);
  const hasRealPhotos = GALLERY_ITEMS.some((g) => g.before && g.after);

  return (
    <>
      <section className="bg-[#0B1A2E] text-white py-14 px-4">
        <div className="max-w-3xl mx-auto space-y-4 text-center">
          <div className="flex justify-center">
            <Breadcrumbs path={path} />
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold font-montserrat">Before &amp; After Gallery</h1>
          <p className="text-slate-300 text-base leading-relaxed">
            Results from grass cutting, power washing, window cleaning, and cleaning jobs across Ottawa.
          </p>
        </div>
      </section>

      <section className="py-12 bg-[#F4F6F9]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {!hasRealPhotos && (
            <p className="mb-8 mx-auto max-w-2xl text-center text-sm font-semibold text-amber-800 bg-amber-50 border border-amber-200 rounded-lg p-3">
              Placeholder gallery: real before &amp; after photos from AV Group jobs will be added here.
            </p>
          )}
          <div role="group" aria-label="Filter by service" className="flex flex-wrap justify-center gap-2 mb-10">
            {[{ id: 'all' as const, name: 'All' }, ...SERVICES].map((f) => (
              <button
                key={f.id}
                type="button"
                aria-pressed={filter === f.id}
                onClick={() => setFilter(f.id)}
                className={`px-4 py-2.5 text-sm font-bold rounded-lg border cursor-pointer ${
                  filter === f.id ? 'bg-[#0A6FE0] text-white border-[#0A6FE0]' : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
                }`}
              >
                {f.name}
              </button>
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((g) => (
              <BeforeAfterCard key={g.id} item={g} />
            ))}
          </div>
        </div>
      </section>

      <CtaBanner source="gallery-bottom" title="Want Results Like These?" text="Get a free, fixed-price quote for your Ottawa home or business." />
    </>
  );
};

export default GalleryPage;
