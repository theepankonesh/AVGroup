import React from 'react';

interface LogoProps {
  className?: string;
  variant?: 'full' | 'mark';
  theme?: 'light' | 'dark';
}

/** The AV Group logo mark (official artwork, transparent background). */
export const LogoMark: React.FC<{ className?: string }> = ({ className = 'h-10 w-auto' }) => (
  <img
    src="/images/av-group-logo-160.webp"
    srcSet="/images/av-group-logo-160.webp 1x, /images/av-group-logo-320.webp 2x"
    width={160}
    height={109}
    alt=""
    className={`${className} shrink-0 select-none`}
    draggable={false}
  />
);

export const Logo: React.FC<LogoProps> = ({ className = '', variant = 'full', theme = 'light' }) => {
  const isDark = theme === 'dark';

  if (variant === 'mark') {
    return <LogoMark className={className || 'h-10 w-auto'} />;
  }

  return (
    <div className={`flex items-center gap-2.5 select-none ${className}`}>
      <LogoMark className="h-10 md:h-12 w-auto" />
      <div className="flex flex-col leading-none">
        <span className={`text-xl md:text-2xl font-black tracking-wider uppercase font-montserrat ${isDark ? 'text-white' : 'text-[#0B1A2E]'}`}>
          AV<span className="text-[#0A6FE0]"> GROUP</span>
        </span>
        <span className={`text-[9.5px] md:text-[10.5px] font-semibold tracking-widest uppercase mt-0.5 ${isDark ? 'text-[#B8BDC4]' : 'text-slate-500'}`}>
          Property Care · Ottawa
        </span>
      </div>
    </div>
  );
};

export default Logo;
