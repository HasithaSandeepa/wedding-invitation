import React from "react";

interface MandalaProps {
  className?: string;
  size?: number | string;
  opacity?: number;
}

export const MandalaOrnament: React.FC<MandalaProps> = ({
  className = "",
  size = 400,
  opacity = 0.9,
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 500 500"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`select-none pointer-events-none ${className}`}
      style={{ opacity }}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="goldGradMandala" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#F5E5B8" />
          <stop offset="30%" stopColor="#D8B45F" />
          <stop offset="70%" stopColor="#B98A2F" />
          <stop offset="100%" stopColor="#8C6420" />
        </linearGradient>
        <radialGradient id="goldRadialMandala" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FDF8EC" stopOpacity="0.8" />
          <stop offset="60%" stopColor="#D8B45F" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#B98A2F" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Central Radiance Glow */}
      <circle cx="250" cy="250" r="230" fill="url(#goldRadialMandala)" />

      {/* Outer Concentric Rings */}
      <circle cx="250" cy="250" r="235" stroke="url(#goldGradMandala)" strokeWidth="1.2" strokeDasharray="4 6" />
      <circle cx="250" cy="250" r="225" stroke="url(#goldGradMandala)" strokeWidth="1.8" />
      <circle cx="250" cy="250" r="217" stroke="url(#goldGradMandala)" strokeWidth="0.8" />

      {/* 16 Outer Traditional Lotus Petals */}
      <g stroke="url(#goldGradMandala)" strokeWidth="1.5" fill="none">
        {Array.from({ length: 16 }).map((_, i) => {
          const angle = (i * 360) / 16;
          return (
            <g key={`outer-petal-${i}`} transform={`rotate(${angle} 250 250)`}>
              <path
                d="M 250 35 C 265 80 280 130 250 165 C 220 130 235 80 250 35 Z"
                fill="rgba(216, 180, 95, 0.08)"
              />
              <path d="M 250 35 L 250 165" strokeWidth="0.8" strokeDasharray="2 3" />
              <circle cx="250" cy="35" r="3" fill="url(#goldGradMandala)" />
            </g>
          );
        })}
      </g>

      {/* Middle Lotus Ring */}
      <circle cx="250" cy="250" r="165" stroke="url(#goldGradMandala)" strokeWidth="1.5" />
      <circle cx="250" cy="250" r="157" stroke="url(#goldGradMandala)" strokeWidth="0.8" strokeDasharray="3 4" />

      {/* 16 Mid Tier Floral Petals */}
      <g stroke="url(#goldGradMandala)" strokeWidth="1.4" fill="none">
        {Array.from({ length: 16 }).map((_, i) => {
          const angle = (i * 360) / 16 + 11.25;
          return (
            <g key={`mid-petal-${i}`} transform={`rotate(${angle} 250 250)`}>
              <path
                d="M 250 95 C 262 130 270 160 250 190 C 230 160 238 130 250 95 Z"
                fill="rgba(185, 138, 47, 0.06)"
              />
              <circle cx="250" cy="95" r="2" fill="url(#goldGradMandala)" />
            </g>
          );
        })}
      </g>

      {/* Inner Petal Cluster */}
      <circle cx="250" cy="250" r="110" stroke="url(#goldGradMandala)" strokeWidth="1.5" />
      <g stroke="url(#goldGradMandala)" strokeWidth="1.6" fill="rgba(216, 180, 95, 0.12)">
        {Array.from({ length: 12 }).map((_, i) => {
          const angle = (i * 360) / 12;
          return (
            <g key={`inner-petal-${i}`} transform={`rotate(${angle} 250 250)`}>
              <path d="M 250 145 C 260 175 265 200 250 220 C 235 200 240 175 250 145 Z" />
              <circle cx="250" cy="148" r="2" fill="url(#goldGradMandala)" />
            </g>
          );
        })}
      </g>

      {/* Sacred Center Lotus Core */}
      <circle cx="250" cy="250" r="45" stroke="url(#goldGradMandala)" strokeWidth="2" fill="rgba(253, 248, 236, 0.85)" />
      <circle cx="250" cy="250" r="32" stroke="url(#goldGradMandala)" strokeWidth="1" strokeDasharray="3 3" />
      <circle cx="250" cy="250" r="18" fill="url(#goldGradMandala)" />
      <circle cx="250" cy="250" r="7" fill="#FDF8EC" />
    </svg>
  );
};
