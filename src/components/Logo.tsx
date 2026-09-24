import React from 'react';

interface LogoProps {
  className?: string;
  variant?: 'full' | 'mark' | 'footer';
  theme?: 'light' | 'dark';
}

export const LogoMark: React.FC<{ className?: string }> = ({ className = 'w-10 h-10' }) => {
  return (
    <svg
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${className} shrink-0 drop-shadow-sm`}
      aria-label="AV Group Logo Mark"
    >
      <defs>
        {/* Metallic Silver Gradient for "A" */}
        <linearGradient id="silverA" x1="20" y1="50" x2="110" y2="150" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="25%" stopColor="#E6EAEE" />
          <stop offset="55%" stopColor="#B8BDC4" />
          <stop offset="85%" stopColor="#8A929F" />
          <stop offset="100%" stopColor="#D5D9E0" />
        </linearGradient>

        {/* Silver Edge Highlight */}
        <linearGradient id="silverSheen" x1="40" y1="40" x2="100" y2="120" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#B8BDC4" stopOpacity="0.1" />
        </linearGradient>

        {/* Electric Royal Blue Gradient for "V" */}
        <linearGradient id="blueV" x1="90" y1="60" x2="180" y2="150" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#1E9BFF" />
          <stop offset="45%" stopColor="#0A6FE0" />
          <stop offset="85%" stopColor="#054A9E" />
          <stop offset="100%" stopColor="#022F6A" />
        </linearGradient>

        {/* Blue V Facet Highlight */}
        <linearGradient id="blueFacet" x1="120" y1="60" x2="180" y2="130" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#43B0FF" />
          <stop offset="70%" stopColor="#0A6FE0" />
          <stop offset="100%" stopColor="#063D80" />
        </linearGradient>

        {/* Top Blue Swoosh */}
        <linearGradient id="topSwooshBlue" x1="10" y1="100" x2="190" y2="40" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#0A6FE0" stopOpacity="0.2" />
          <stop offset="30%" stopColor="#0A6FE0" />
          <stop offset="75%" stopColor="#1E9BFF" />
          <stop offset="100%" stopColor="#5EC1FF" />
        </linearGradient>

        {/* Top Silver Inner Swoosh */}
        <linearGradient id="topSwooshSilver" x1="60" y1="70" x2="195" y2="55" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.4" />
          <stop offset="50%" stopColor="#C2C7D0" />
          <stop offset="100%" stopColor="#8A929F" />
        </linearGradient>

        {/* Bottom Blue Swoosh */}
        <linearGradient id="bottomSwoosh" x1="40" y1="155" x2="185" y2="110" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#0A6FE0" />
          <stop offset="60%" stopColor="#1E9BFF" />
          <stop offset="100%" stopColor="#38A9FF" />
        </linearGradient>

        {/* Soft Drop Shadow Filter */}
        <filter id="logoShadow" x="-10%" y="-10%" width="125%" height="125%" filterUnits="userSpaceOnUse">
          <feDropShadow dx="1" dy="3" stdDeviation="3" floodColor="#0B1A2E" floodOpacity="0.25" />
        </filter>
      </defs>

      <g filter="url(#logoShadow)">
        {/* Top Silver Swoosh Accent (nested under top blue) */}
        <path
          d="M 65 68 C 110 46 160 48 194 75 C 172 52 122 46 75 64 Z"
          fill="url(#topSwooshSilver)"
        />

        {/* Top Dominant Blue Swoosh Ribbon */}
        <path
          d="M 12 110 C 35 65 88 38 185 54 C 192 55 190 60 182 60 C 100 48 50 72 26 112 C 19 116 12 114 12 110 Z"
          fill="url(#topSwooshBlue)"
        />

        {/* Silver Letter "A" */}
        <path
          d="M 80 65 L 48 135 L 20 135 L 68 32 L 88 32 L 126 135 L 98 135 L 87 105 L 56 105 L 68 76 Z"
          fill="url(#silverA)"
        />

        {/* Silver "A" Inner Triangle Cutout */}
        <path
          d="M 77 62 L 60 98 L 84 98 Z"
          fill="#FFFFFF"
          fillOpacity="0.2"
        />

        {/* Silver "A" Bevel / Right Facet */}
        <path
          d="M 88 32 L 126 135 L 98 135 L 80 65 Z"
          fill="url(#silverSheen)"
          fillOpacity="0.5"
        />

        {/* Blue Letter "V" */}
        <path
          d="M 82 65 L 115 65 L 136 120 L 157 65 L 188 65 L 149 137 L 125 137 Z"
          fill="url(#blueV)"
        />

        {/* Blue "V" Right Wing Bright Facet */}
        <path
          d="M 136 120 L 157 65 L 188 65 L 149 137 Z"
          fill="url(#blueFacet)"
        />

        {/* Bottom Swoosh Ribbon */}
        <path
          d="M 45 142 C 85 158 135 155 184 108 C 185 113 182 118 174 123 C 128 162 76 163 42 144 C 40 143 42 141 45 142 Z"
          fill="url(#bottomSwoosh)"
        />
      </g>
    </svg>
  );
};

export const Logo: React.FC<LogoProps> = ({
  className = '',
  variant = 'full',
  theme = 'light',
}) => {
  const isDark = theme === 'dark';

  if (variant === 'mark') {
    return <LogoMark className={className || 'w-10 h-10'} />;
  }

  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      <LogoMark className="w-10 h-10 md:w-11 md:h-11" />
      <div className="flex flex-col leading-none">
        <div className="flex items-center gap-1.5">
          <span
            className={`text-xl md:text-2xl font-black tracking-wider uppercase font-montserrat ${
              isDark ? 'text-white' : 'text-[#0B1A2E]'
            }`}
          >
            AV<span className="text-[#0A6FE0]"> GROUP</span>
          </span>
        </div>
        <span
          className={`text-[9.5px] md:text-[10.5px] font-semibold tracking-widest uppercase mt-0.5 ${
            isDark ? 'text-[#B8BDC4]' : 'text-slate-500'
          }`}
        >
          Property Care · Ottawa
        </span>
      </div>
    </div>
  );
};
export default Logo;
