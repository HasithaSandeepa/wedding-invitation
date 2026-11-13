import React from "react";

interface FlourishProps {
  className?: string;
  width?: number | string;
  height?: number | string;
}

export const LotusFlourish: React.FC<FlourishProps> = ({
  className = "",
  width = 180,
  height = 50,
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 320 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`select-none pointer-events-none mx-auto ${className}`}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="goldFlourish" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#8C6420" stopOpacity="0" />
          <stop offset="20%" stopColor="#B98A2F" stopOpacity="0.8" />
          <stop offset="50%" stopColor="#F5E5B8" />
          <stop offset="80%" stopColor="#B98A2F" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#8C6420" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="solidGold" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#F7E7B4" />
          <stop offset="50%" stopColor="#D8B45F" />
          <stop offset="100%" stopColor="#8C6420" />
        </linearGradient>
      </defs>

      {/* Central Lotus Motif */}
      <g transform="translate(160, 40)">
        {/* Center Petal */}
        <path
          d="M 0 -22 C 7 -10 9 5 0 16 C -9 5 -7 -10 0 -22 Z"
          fill="url(#solidGold)"
        />
        {/* Left Petal */}
        <path
          d="M 0 16 C -14 12 -22 -4 -12 -16 C -7 -6 -3 4 0 16 Z"
          fill="url(#solidGold)"
          opacity="0.9"
        />
        {/* Right Petal */}
        <path
          d="M 0 16 C 14 12 22 -4 12 -16 C 7 -6 3 4 0 16 Z"
          fill="url(#solidGold)"
          opacity="0.9"
        />
        {/* Outermost Petals */}
        <path
          d="M 0 16 C -24 8 -26 -1 -20 -9 C -16 -2 -9 6 0 16 Z"
          fill="url(#solidGold)"
          opacity="0.75"
        />
        <path
          d="M 0 16 C 24 8 26 -1 20 -9 C 16 -2 9 6 0 16 Z"
          fill="url(#solidGold)"
          opacity="0.75"
        />
        {/* Center Golden Pearl */}
        <circle cx="0" cy="16" r="3.5" fill="#FDF8EC" stroke="#8C6420" strokeWidth="1" />
      </g>

      {/* Left Traditional Liyawel Tendril */}
      <path
        d="M 130 54 C 105 54 85 40 60 40 C 35 40 18 52 5 52"
        stroke="url(#goldFlourish)"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M 125 50 C 100 48 80 32 60 32 C 45 32 30 40 15 40"
        stroke="url(#goldFlourish)"
        strokeWidth="1"
        strokeDasharray="2 3"
      />
      {/* Left Leaf spirals */}
      <circle cx="60" cy="40" r="2.5" fill="url(#solidGold)" />
      <circle cx="20" cy="52" r="2" fill="url(#solidGold)" />
      <path
        d="M 85 40 C 80 30 70 25 65 30 C 65 37 75 40 85 40 Z"
        fill="url(#solidGold)"
        opacity="0.7"
      />

      {/* Right Traditional Liyawel Tendril */}
      <path
        d="M 190 54 C 215 54 235 40 260 40 C 285 40 302 52 315 52"
        stroke="url(#goldFlourish)"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M 195 50 C 220 48 240 32 260 32 C 275 32 290 40 305 40"
        stroke="url(#goldFlourish)"
        strokeWidth="1"
        strokeDasharray="2 3"
      />
      {/* Right Leaf spirals */}
      <circle cx="260" cy="40" r="2.5" fill="url(#solidGold)" />
      <circle cx="300" cy="52" r="2" fill="url(#solidGold)" />
      <path
        d="M 235 40 C 240 30 250 25 255 30 C 255 37 245 40 235 40 Z"
        fill="url(#solidGold)"
        opacity="0.7"
      />
    </svg>
  );
};

export const CornerOrnament: React.FC<{
  position: "tl" | "tr" | "bl" | "br";
  className?: string;
  size?: number;
}> = ({ position, className = "", size = 64 }) => {
  const rotation = {
    tl: "rotate(0)",
    tr: "rotate(90deg)",
    br: "rotate(180deg)",
    bl: "rotate(270deg)",
  }[position];

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 80 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`select-none pointer-events-none ${className}`}
      style={{ transform: rotation }}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="cornerGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#F5E5B8" />
          <stop offset="50%" stopColor="#D8B45F" />
          <stop offset="100%" stopColor="#8C6420" />
        </linearGradient>
      </defs>
      {/* Outer Border Angle */}
      <path d="M 8 72 L 8 8 L 72 8" stroke="url(#cornerGoldGrad)" strokeWidth="2.5" />
      <path d="M 14 66 L 14 14 L 66 14" stroke="url(#cornerGoldGrad)" strokeWidth="1" strokeDasharray="3 3" />
      {/* Corner Lotus / Floral flourish */}
      <path
        d="M 14 14 C 22 28 32 32 46 26 C 42 20 30 18 14 14 Z"
        fill="url(#cornerGoldGrad)"
        opacity="0.8"
      />
      <circle cx="14" cy="14" r="3.5" fill="url(#cornerGoldGrad)" />
      <circle cx="8" cy="8" r="2.5" fill="#FDF8EC" stroke="url(#cornerGoldGrad)" strokeWidth="1" />
      <path
        d="M 28 14 C 36 22 40 32 34 46 C 28 42 26 30 14 14"
        stroke="url(#cornerGoldGrad)"
        strokeWidth="1.2"
      />
    </svg>
  );
};
