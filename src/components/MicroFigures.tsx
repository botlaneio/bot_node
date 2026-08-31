import React from 'react';

/**
 * Small drawings that sit inside other blocks — a schedule cell, an inventory
 * cell — rather than in a panel of their own.
 *
 * Same language as the step schematics: hairline construction, solid black for
 * what has been affirmed or breached, monospaced annotation, no colour. They
 * are deliberately quiet; each one restates its cell's number as a picture so
 * the schedule reads as drawn rather than typed.
 */

const RULE = '#c9c9c4';
const FAINT = '#e4e4e0';
const OPEN = '#f4f4f1';
const INK = '#101010';
const GREY = '#9a9a96';

const tiny = {
  fontFamily: "'Geist Mono', ui-monospace, Menlo, monospace",
  fontSize: 7,
  letterSpacing: '0.1em',
};

/* ===================================================================
   Schedule micros — 96 × 40, one per specification constraint.
   =================================================================== */

/** 4 — lanes, three of them taken. */
const MicroLanes: React.FC = () => (
  <>
    {[0, 1, 2, 3].map((i) => (
      <rect
        key={i}
        x={i * 24}
        y="14"
        width="18"
        height="10"
        fill={i < 3 ? INK : OPEN}
        stroke={i < 3 ? INK : RULE}
        strokeWidth="1"
      />
    ))}
    <text x="0" y="36" fill={GREY} style={tiny}>3 TAKEN · 1 OPEN</text>
  </>
);

/** 3wk — the warm-up ramp, stepped up over three weeks then sending. */
const MicroWarmup: React.FC = () => (
  <>
    <path d="M0 26 H90" stroke={FAINT} strokeWidth="1" />
    {[0, 1, 2].map((i) => (
      <g key={i}>
        <path d={`M${i * 28} 26 V${20 - i * 5} H${i * 28 + 24}`} fill="none" stroke={INK} strokeWidth="1.5" />
        <path d={`M${i * 28} 26 V29`} stroke={RULE} strokeWidth="1" />
      </g>
    ))}
    <path d="M84 26 V8" stroke={INK} strokeWidth="1" />
    <path d="M81 12 L84 5 L87 12 Z" fill={INK} />
    <text x="0" y="38" fill={GREY} style={tiny}>W1 · W2 · W3 · SEND</text>
  </>
);

/** >60d — the threshold, with everything past it filled. */
const MicroThreshold: React.FC = () => (
  <>
    <rect x="0" y="14" width="52" height="10" fill={OPEN} stroke={RULE} strokeWidth="1" />
    <rect x="52" y="14" width="38" height="10" fill={INK} />
    <path d="M52 8 V30" stroke={INK} strokeWidth="1" strokeDasharray="2 2" />
    <text x="0" y="38" fill={GREY} style={tiny}>0</text>
    <text x="46" y="8" fill={INK} style={tiny}>60</text>
    <text x="82" y="38" fill={GREY} style={tiny}>120</text>
  </>
);

/** 0 — nothing leaves the primary domain. */
const MicroIsolation: React.FC = () => (
  <>
    <rect x="0" y="12" width="36" height="16" fill={OPEN} stroke={RULE} strokeWidth="1" strokeDasharray="2 3" />
    <path d="M46 6 V32" stroke={INK} strokeWidth="1" strokeDasharray="2 2" />
    <rect x="56" y="12" width="36" height="16" fill="#ffffff" stroke={INK} strokeWidth="1.5" />
    <path d="M74 28 V34" stroke={INK} strokeWidth="1" />
    <path d="M71 31 L74 37 L77 31 Z" fill={INK} />
    <text x="0" y="8" fill={GREY} style={tiny}>YOURS</text>
    <text x="56" y="8" fill={GREY} style={tiny}>SENDING</text>
  </>
);

const SCHEDULE: Record<string, { node: React.ReactNode; alt: string }> = {
  lanes: { node: <MicroLanes />, alt: 'Four lanes, three of them filled and one open.' },
  warmup: {
    node: <MicroWarmup />,
    alt: 'A ramp stepping up across three weeks before the first send.',
  },
  threshold: {
    node: <MicroThreshold />,
    alt: 'A track from zero to one hundred and twenty days, filled solid past the sixty-day mark.',
  },
  isolation: {
    node: <MicroIsolation />,
    alt: 'Your own domain sits behind a barrier while a separate sending domain carries the outbound arrow.',
  },
};

export const ScheduleFigure: React.FC<{ kind: keyof typeof SCHEDULE }> = ({ kind }) => (
  <svg viewBox="0 0 96 40" className="h-10 w-24" role="img" aria-label={SCHEDULE[kind].alt}>
    {SCHEDULE[kind].node}
  </svg>
);

/* ===================================================================
   Inventory figures — 240 × 120, one per deliverable.
   =================================================================== */

/**
 * The scope you define — drawn as the narrowing it actually is.
 *
 * The first version of this was a set of concentric rings, which was both a
 * repeat of the procedure's step-01 aperture and a picture that named its
 * criteria without showing them. Here each criterion visibly cuts the width,
 * so the drawing states what the caption used to have to.
 */
const InvScope: React.FC = () => {
  const rows = [
    { label: 'MARKET', w: 166 },
    { label: 'AWS / K8S', w: 132 },
    { label: 'NA + EU', w: 100 },
    { label: 'SERIES A–C', w: 70 },
    { label: 'TARGET', w: 44, solid: true },
  ];
  return (
    <>
      {/* the taper, connecting where each cut lands */}
      <path
        d={rows.map((r, i) => `${i === 0 ? 'M' : 'L'}${64 + r.w} ${16 + i * 20}`).join(' ')}
        fill="none"
        stroke={RULE}
        strokeWidth="1"
        strokeDasharray="2 3"
      />
      {rows.map((r, i) => (
        <g key={r.label}>
          <text x="10" y={20 + i * 20} fill={r.solid ? INK : GREY} style={tiny}>
            {r.label}
          </text>
          <rect
            x="64"
            y={10 + i * 20}
            width={r.w}
            height="12"
            fill={r.solid ? INK : OPEN}
            stroke={r.solid ? INK : RULE}
            strokeWidth="1"
          />
        </g>
      ))}
      <text x="64" y="114" fill={GREY} style={tiny}>
        MINUS YOUR EXCLUSION LIST
      </text>
    </>
  );
};

/** Forty companies, dated — the ones past the line are yours. */
const InvSignals: React.FC = () => {
  const bars = [18, 30, 24, 46, 34, 58, 26, 62, 38, 70, 44, 30, 54, 22, 66];
  return (
    <>
      <path d="M12 74 H228" stroke={FAINT} strokeWidth="1" />
      {bars.map((h, i) => {
        const hot = h >= 46;
        return (
          <rect
            key={i}
            x={14 + i * 14.5}
            y={74 - h}
            width="9"
            height={h}
            fill={hot ? INK : OPEN}
            stroke={hot ? INK : RULE}
            strokeWidth="1"
          />
        );
      })}
      <path d="M12 28 H228" stroke={INK} strokeWidth="1" strokeDasharray="3 4" />
      <text x="228" y="22" textAnchor="end" fill={INK} style={tiny}>60-DAY LINE</text>
      <text x="12" y="92" fill={GREY} style={tiny}>DATED, PUBLIC, VERIFIABLE</text>
      <text x="12" y="108" fill={GREY} style={tiny}>40 COMPANIES PER LIST</text>
    </>
  );
};

/** The research changes hands whether or not you retain us. */
const InvOwnership: React.FC = () => (
  <>
    <rect x="16" y="34" width="82" height="48" fill={OPEN} stroke={RULE} strokeWidth="1" />
    <text x="57" y="54" textAnchor="middle" fill={GREY} style={tiny}>RESEARCH</text>
    <text x="57" y="68" textAnchor="middle" fill={GREY} style={tiny}>CSV · CONTACTS</text>

    <path d="M104 58 H130" stroke={INK} strokeWidth="1.5" />
    <path d="M126 54 L134 58 L126 62 Z" fill={INK} />

    <rect x="142" y="34" width="82" height="48" fill={INK} />
    <text x="183" y="54" textAnchor="middle" fill="#a3a3a0" style={tiny}>YOURS</text>
    <text x="183" y="68" textAnchor="middle" fill="#fafafa" style={tiny}>EITHER WAY</text>

    <text x="16" y="104" fill={GREY} style={tiny}>NO LOCK-IN ON THE MARKET RESEARCH</text>
  </>
);

const INVENTORY: Record<string, { node: React.ReactNode; alt: string }> = {
  scope: {
    node: <InvScope />,
    alt: 'Five stacked bars, each shorter than the last: total market, then cut by stack, by region, by funding stage, down to a solid target bar, minus your exclusion list.',
  },
  signals: {
    node: <InvSignals />,
    alt: 'Fifteen dated bars against a sixty-day line; the taller ones that cross it are filled solid.',
  },
  ownership: {
    node: <InvOwnership />,
    alt: 'A block of research handed across an arrow into a solid block marked yours either way.',
  },
};

export const InventoryFigure: React.FC<{ kind: keyof typeof INVENTORY }> = ({ kind }) => (
  <svg viewBox="0 0 240 120" className="h-auto w-full" role="img" aria-label={INVENTORY[kind].alt}>
    {INVENTORY[kind].node}
  </svg>
);
