import React from "react";

interface PoruwaProps {
  className?: string;
  size?: number | string;
}

export const PoruwaIllustration: React.FC<PoruwaProps> = ({
  className = "",
  size = 280,
}) => {
  return (
    <svg
      width={size}
      height={typeof size === "number" ? size * 0.9 : "auto"}
      viewBox="0 0 400 360"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`select-none mx-auto drop-shadow-md ${className}`}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="poruwaGoldLight" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FFF2D1" />
          <stop offset="35%" stopColor="#E2BD68" />
          <stop offset="70%" stopColor="#B98A2F" />
          <stop offset="100%" stopColor="#7E5616" />
        </linearGradient>

        <linearGradient id="poruwaGoldHorizontal" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#7E5616" />
          <stop offset="25%" stopColor="#D8B45F" />
          <stop offset="50%" stopColor="#FFF2D1" />
          <stop offset="75%" stopColor="#D8B45F" />
          <stop offset="100%" stopColor="#7E5616" />
        </linearGradient>

        <radialGradient id="poruwaGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#F5E5B8" stopOpacity="0.6" />
          <stop offset="55%" stopColor="#D8B45F" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#B98A2F" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Background Sacred Aura */}
      <circle cx="200" cy="180" r="160" fill="url(#poruwaGlow)" />

      {/* TOP CREST / MAKARA THORANA ARCH */}
      {/* Crown Finial / Kotha */}
      <path
        d="M 200 15 L 206 35 L 200 42 L 194 35 Z"
        fill="url(#poruwaGoldLight)"
      />
      <circle cx="200" cy="14" r="3.5" fill="#FFF2D1" />
      <circle cx="200" cy="46" r="5" fill="url(#poruwaGoldLight)" />

      {/* Main Arch Peak */}
      <path
        d="M 120 85 C 150 45 175 42 200 42 C 225 42 250 45 280 85 C 255 75 225 65 200 65 C 175 65 145 75 120 85 Z"
        fill="url(#poruwaGoldHorizontal)"
      />
      {/* Arch Decorative Filigree */}
      <path
        d="M 130 92 C 160 62 180 58 200 58 C 220 58 240 62 270 92"
        stroke="url(#poruwaGoldLight)"
        strokeWidth="2"
        fill="none"
      />

      {/* Roof Canopy Tier 1 */}
      <path
        d="M 90 100 C 140 88 170 82 200 82 C 230 82 260 88 310 100 L 316 112 C 265 102 230 96 200 96 C 170 96 135 102 84 112 Z"
        fill="url(#poruwaGoldHorizontal)"
      />

      {/* Hanging Traditional Jasmine & Lotus Bud Garlands */}
      {[-90, -60, -30, 0, 30, 60, 90].map((offset, i) => {
        const x = 200 + offset;
        return (
          <g key={`garland-${i}`}>
            <line x1={x} y1="112" x2={x} y2="128" stroke="url(#poruwaGoldLight)" strokeWidth="1.2" />
            <circle cx={x} cy="131" r="2.5" fill="#FFF2D1" />
            <path
              d={`M ${x} 133 C ${x - 3} 137 ${x - 2} 142 ${x} 144 C ${x + 2} 142 ${x + 3} 137 ${x} 133 Z`}
              fill="url(#poruwaGoldLight)"
            />
          </g>
        );
      })}

      {/* Roof Canopy Tier 2 / Carved Frieze */}
      <rect
        x="98"
        y="114"
        width="204"
        height="12"
        rx="2"
        fill="url(#poruwaGoldHorizontal)"
      />
      {/* Frieze detail dots */}
      {Array.from({ length: 15 }).map((_, i) => (
        <circle
          key={`dot-${i}`}
          cx={112 + i * 12.5}
          cy="120"
          r="1.5"
          fill="#FFF2D1"
        />
      ))}

      {/* FOUR CARVED PORUWA PILLARS */}
      {/* Left Outer Pillar */}
      <g>
        {/* Capital */}
        <path d="M 104 126 L 126 126 L 122 136 L 108 136 Z" fill="url(#poruwaGoldLight)" />
        {/* Shaft */}
        <rect x="110" y="136" width="10" height="130" fill="url(#poruwaGoldHorizontal)" rx="1" />
        {/* Shaft grooves */}
        <line x1="113" y1="140" x2="113" y2="262" stroke="#FFF2D1" strokeWidth="0.8" opacity="0.6" />
        <line x1="117" y1="140" x2="117" y2="262" stroke="#7E5616" strokeWidth="0.8" opacity="0.6" />
        {/* Base */}
        <path d="M 106 266 L 124 266 L 128 276 L 102 276 Z" fill="url(#poruwaGoldLight)" />
      </g>

      {/* Right Outer Pillar */}
      <g>
        {/* Capital */}
        <path d="M 274 126 L 296 126 L 292 136 L 278 136 Z" fill="url(#poruwaGoldLight)" />
        {/* Shaft */}
        <rect x="280" y="136" width="10" height="130" fill="url(#poruwaGoldHorizontal)" rx="1" />
        {/* Shaft grooves */}
        <line x1="283" y1="140" x2="283" y2="262" stroke="#FFF2D1" strokeWidth="0.8" opacity="0.6" />
        <line x1="287" y1="140" x2="287" y2="262" stroke="#7E5616" strokeWidth="0.8" opacity="0.6" />
        {/* Base */}
        <path d="M 276 266 L 294 266 L 298 276 L 272 276 Z" fill="url(#poruwaGoldLight)" />
      </g>

      {/* Inner Arch between pillars (Spiritual Backing) */}
      <path
        d="M 125 150 C 150 140 175 135 200 135 C 225 135 250 140 275 150"
        stroke="url(#poruwaGoldLight)"
        strokeWidth="1.5"
        strokeDasharray="3 3"
        fill="none"
      />
      {/* Central Radiating Sacred Lotus in the Arch */}
      <circle cx="200" cy="180" r="26" stroke="url(#poruwaGoldLight)" strokeWidth="1" strokeDasharray="2 3" />
      <circle cx="200" cy="180" r="14" fill="rgba(216, 180, 95, 0.2)" stroke="url(#poruwaGoldLight)" strokeWidth="1.2" />
      <circle cx="200" cy="180" r="4" fill="url(#poruwaGoldLight)" />

      {/* TRADITIONAL PUNKALAS (POTS OF PROSPERITY) ON SIDES */}
      {/* Left Punkalasa */}
      <g transform="translate(68, 230)">
        {/* Coconut Flower / Floral Spikes */}
        <path d="M 12 0 L 8 -18 M 12 0 L 12 -22 M 12 0 L 16 -18" stroke="url(#poruwaGoldLight)" strokeWidth="1.5" />
        <circle cx="12" cy="-22" r="2" fill="#FFF2D1" />
        {/* Pot Rim */}
        <ellipse cx="12" cy="0" rx="9" ry="2.5" fill="url(#poruwaGoldLight)" />
        {/* Pot Belly */}
        <path
          d="M 3 0 C 0 8 0 16 7 22 C 10 24 14 24 17 22 C 24 16 24 8 21 0 Z"
          fill="url(#poruwaGoldHorizontal)"
        />
        {/* Pot Base */}
        <ellipse cx="12" cy="22" rx="6" ry="1.8" fill="url(#poruwaGoldLight)" />
      </g>

      {/* Right Punkalasa */}
      <g transform="translate(308, 230)">
        {/* Coconut Flower / Floral Spikes */}
        <path d="M 12 0 L 8 -18 M 12 0 L 12 -22 M 12 0 L 16 -18" stroke="url(#poruwaGoldLight)" strokeWidth="1.5" />
        <circle cx="12" cy="-22" r="2" fill="#FFF2D1" />
        {/* Pot Rim */}
        <ellipse cx="12" cy="0" rx="9" ry="2.5" fill="url(#poruwaGoldLight)" />
        {/* Pot Belly */}
        <path
          d="M 3 0 C 0 8 0 16 7 22 C 10 24 14 24 17 22 C 24 16 24 8 21 0 Z"
          fill="url(#poruwaGoldHorizontal)"
        />
        {/* Pot Base */}
        <ellipse cx="12" cy="22" rx="6" ry="1.8" fill="url(#poruwaGoldLight)" />
      </g>

      {/* CEREMONIAL PORUWA PLATFORM (PEEDAYA) */}
      {/* Platform Step 1 */}
      <path
        d="M 80 274 L 320 274 L 330 290 L 70 290 Z"
        fill="url(#poruwaGoldHorizontal)"
      />
      <rect x="74" y="276" width="252" height="2" fill="#FFF2D1" opacity="0.6" />

      {/* Traditional Lotus Carving on Platform Front */}
      <g transform="translate(200, 282)">
        <ellipse cx="0" cy="0" rx="18" ry="4" fill="rgba(255, 242, 209, 0.4)" />
        <circle cx="0" cy="0" r="2.5" fill="#FFF2D1" />
      </g>

      {/* Platform Step 2 / Foundation */}
      <path
        d="M 64 290 L 336 290 L 348 312 L 52 312 Z"
        fill="url(#poruwaGoldLight)"
      />
      {/* Carved Motif panels on bottom */}
      <rect x="58" y="294" width="284" height="12" fill="url(#poruwaGoldHorizontal)" rx="2" />
      {Array.from({ length: 9 }).map((_, i) => (
        <circle
          key={`plat-dot-${i}`}
          cx={80 + i * 30}
          cy="300"
          r="2.5"
          fill="#FFF2D1"
        />
      ))}

      {/* Ground Floral Base / Traditional Paavada border */}
      <rect x="40" y="312" width="320" height="6" rx="3" fill="url(#poruwaGoldHorizontal)" />
    </svg>
  );
};
