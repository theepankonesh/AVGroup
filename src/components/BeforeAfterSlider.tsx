import React, { useState, useRef, useCallback } from 'react';
import { Sparkles, MoveHorizontal } from 'lucide-react';

interface BeforeAfterSliderProps {
  imageBefore: string;
  imageAfter: string;
  title: string;
  beforeLabel?: string;
  afterLabel?: string;
  aspectRatio?: string;
}

export const BeforeAfterSlider: React.FC<BeforeAfterSliderProps> = ({
  imageBefore,
  imageAfter,
  title,
  beforeLabel = 'Before Cleaning',
  afterLabel = 'After AV Group',
  aspectRatio = 'aspect-16/9',
}) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    let percentage = (x / rect.width) * 100;
    if (percentage < 0) percentage = 0;
    if (percentage > 100) percentage = 100;
    setSliderPosition(percentage);
  }, []);

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    handleMove(e.touches[0].clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };

  return (
    <div className="relative select-none overflow-hidden rounded-xl border border-slate-200 shadow-md bg-slate-900">
      <div
        ref={containerRef}
        className={`relative w-full ${aspectRatio} overflow-hidden cursor-ew-resize`}
        onMouseDown={() => setIsDragging(true)}
        onMouseUp={() => setIsDragging(false)}
        onMouseLeave={() => setIsDragging(false)}
        onMouseMove={handleMouseMove}
        onTouchStart={() => setIsDragging(true)}
        onTouchEnd={() => setIsDragging(false)}
        onTouchMove={handleTouchMove}
      >
        {/* After Image (Background) */}
        <img
          src={imageAfter}
          alt={`${title} - After AV Group service`}
          className="absolute inset-0 w-full h-full object-cover"
          loading="lazy"
        />

        {/* Before Image (Clipped overlay) */}
        <div
          className="absolute inset-0 overflow-hidden"
          style={{ width: `${sliderPosition}%` }}
        >
          <img
            src={imageBefore}
            alt={`${title} - Before treatment`}
            className="absolute inset-0 w-full h-full object-cover max-w-none"
            style={{ width: containerRef.current ? `${containerRef.current.clientWidth}px` : '100%' }}
            loading="lazy"
          />
        </div>

        {/* Divider line */}
        <div
          className="absolute top-0 bottom-0 w-0.5 bg-white shadow-2xl z-20 pointer-events-none"
          style={{ left: `${sliderPosition}%` }}
        >
          <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-9 h-9 rounded-full bg-[#0A6FE0] text-white flex items-center justify-center shadow-lg border-2 border-white pointer-events-auto">
            <MoveHorizontal className="w-4 h-4" />
          </div>
        </div>

        {/* Badges */}
        <div className="absolute top-3 left-3 z-10 px-2.5 py-1 rounded bg-black/70 backdrop-blur-xs text-white text-[11px] font-bold uppercase tracking-wider">
          {beforeLabel}
        </div>
        <div className="absolute top-3 right-3 z-10 px-2.5 py-1 rounded bg-[#0A6FE0]/90 backdrop-blur-xs text-white text-[11px] font-bold uppercase tracking-wider flex items-center gap-1">
          <Sparkles className="w-3 h-3 text-[#1E9BFF]" />
          <span>{afterLabel}</span>
        </div>
      </div>

      <div className="p-3 bg-white border-t border-slate-100 flex items-center justify-between text-xs">
        <span className="font-bold text-slate-800">{title}</span>
        <span className="text-slate-600 italic">Drag slider to compare</span>
      </div>
    </div>
  );
};
export default BeforeAfterSlider;
