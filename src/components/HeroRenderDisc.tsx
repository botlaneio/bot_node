import React, { useState } from 'react';
import { motion } from 'motion/react';

interface HeroRenderDiscProps {
  className?: string;
}

export const HeroRenderDisc: React.FC<HeroRenderDiscProps> = ({ className = '' }) => {
  const [isHovered, setIsHovered] = useState(false);
  const totalGrooves = 40;
  const outlierGrooveIndex = 23; // Groove #24 (in the middle third, 0-indexed)

  return (
    <div
      role="img"
      aria-label="Machined 40-Groove Aluminum Disc (Slot 01)"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative flex items-center justify-center overflow-hidden rounded-[var(--radius-card)] border border-[#e3e3e0] bg-[#ebebe8] aspect-square w-full p-4 select-none group ${className}`}
    >
      {/* Background subtle technical coordinate grid */}
      <svg aria-hidden="true" viewBox="0 0 400 400" className="absolute inset-0 h-full w-full opacity-30 text-[#9a9a96]">
        <line x1="200" y1="20" x2="200" y2="380" stroke="currentColor" strokeWidth="0.75" strokeDasharray="3 3" />
        <line x1="20" y1="200" x2="380" y2="200" stroke="currentColor" strokeWidth="0.75" strokeDasharray="3 3" />
        <circle cx="200" cy="200" r="185" fill="none" stroke="currentColor" strokeWidth="0.5" />
      </svg>

      {/* Main Machined Aluminum Disc Container with subtle 15° isometric perspective */}
      <motion.div
        animate={{
          rotate: isHovered ? 6 : 0,
          scale: isHovered ? 1.02 : 1,
        }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 w-full max-w-[340px] aspect-square flex items-center justify-center"
      >
        <svg
          viewBox="0 0 320 320"
          className="w-full h-full drop-shadow-[0_22px_36px_rgba(13,13,13,0.18)] overflow-visible"
        >
          <defs>
            {/* Anisotropic radial brushed aluminum gradient */}
            <radialGradient id="discBody" cx="42%" cy="38%" r="65%">
              <stop offset="0%" stopColor="#f4f4f1" />
              <stop offset="35%" stopColor="#deded9" />
              <stop offset="65%" stopColor="#c9c9c4" />
              <stop offset="90%" stopColor="#b4b4af" />
              <stop offset="100%" stopColor="#9a9a96" />
            </radialGradient>

            {/* Chamfer edge light */}
            <linearGradient id="bevelLight" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
              <stop offset="50%" stopColor="#deded9" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#1a1a1c" stopOpacity="0.6" />
            </linearGradient>

            {/* Specular Raking Light Beam Filter (45° angle) */}
            <linearGradient id="rakingSpecular" x1="20%" y1="10%" x2="80%" y2="90%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.4" />
              <stop offset="25%" stopColor="#ffffff" stopOpacity="0.0" />
              <stop offset="60%" stopColor="#000000" stopOpacity="0.0" />
              <stop offset="90%" stopColor="#000000" stopOpacity="0.25" />
            </linearGradient>

            {/* Contact Drop Shadow under Puck */}
            <filter id="puckShadow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="16" stdDeviation="14" floodColor="#0d0d0d" floodOpacity="0.22" />
            </filter>
          </defs>

          {/* Base Rim Cylinder Thickness (Machined Edge Depth) */}
          <g filter="url(#puckShadow)">
            <ellipse cx="160" cy="168" rx="142" ry="94" fill="#a3a39e" stroke="#8a8a85" strokeWidth="1" />
            <ellipse cx="160" cy="160" rx="142" ry="94" fill="url(#discBody)" stroke="url(#bevelLight)" strokeWidth="1.5" />
          </g>

          {/* Raking Specular Overlay */}
          <ellipse cx="160" cy="160" rx="141" ry="93" fill="url(#rakingSpecular)" pointerEvents="none" />

          {/* 40 Concentric Lathe Grooves (The Forty Companies Promise) */}
          <g className="grooves">
            {Array.from({ length: totalGrooves }).map((_, i) => {
              // Radii range from 8px to 134px on X axis, scaled on Y axis for 15° tilt
              const rx = 10 + (i / (totalGrooves - 1)) * 124;
              const ry = rx * 0.65;
              const isOutlier = i === outlierGrooveIndex;

              if (isOutlier) {
                // The ONE deeper machined cut that pools the light and reads darker
                return (
                  <g key={i}>
                    {/* Shadow channel inside groove */}
                    <ellipse
                      cx="160"
                      cy="160.5"
                      rx={rx}
                      ry={ry}
                      fill="none"
                      stroke="#0d0d0d"
                      strokeWidth="2.8"
                    />
                    {/* Upper catch light rim on the arris edge */}
                    <ellipse
                      cx="160"
                      cy="159.6"
                      rx={rx + 0.5}
                      ry={ry + 0.3}
                      fill="none"
                      stroke="#ffffff"
                      strokeWidth="0.75"
                      strokeOpacity="0.85"
                    />
                  </g>
                );
              }

              // Standard finely turned grooves with subtle tool chatter
              return (
                <ellipse
                  key={i}
                  cx="160"
                  cy="160"
                  rx={rx}
                  ry={ry}
                  fill="none"
                  stroke={i % 2 === 0 ? '#b8b8b3' : '#c9c9c4'}
                  strokeWidth="0.85"
                  strokeOpacity={0.85}
                />
              );
            })}
          </g>

          {/* Center Lathe Spindle Pin (Graphite Core) */}
          <ellipse cx="160" cy="160" rx="4.5" ry="3" fill="#1a1a1c" stroke="#d2d2ce" strokeWidth="0.5" />
          <circle cx="159.2" cy="159.2" r="0.8" fill="#ffffff" opacity="0.8" />
        </svg>

        {/* Tactical Annotation Tooltip Badge */}
        <div className="absolute -bottom-2 right-2 z-20 pointer-events-none transition-opacity duration-300">
          <div className="px-2.5 py-1 rounded bg-[#0a0a0a] text-white border border-[#262626] shadow-md flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
            <span className="eyebrow text-[9px] tracking-wider text-[#d4d4d1]">
              Slot 01 · 40 Grooves · 1 Anomaly
            </span>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
