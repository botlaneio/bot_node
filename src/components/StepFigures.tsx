import React from 'react';

/**
 * Schematics for the four procedure steps.
 *
 * Drawn in the sheet's own language: hairline construction in --sheet-mark,
 * emphasis in solid black, monospaced annotation, no colour. Each one is meant
 * to carry information the copy would otherwise have to spell out — a scope, a
 * barrier, a sieve, a route — rather than decorate the step it sits beside.
 *
 * All four share one viewBox so they swap without the panel resizing.
 */

const RULE = '#c9c9c4';
const FAINT = '#e4e4e0';
const INK = '#101010';
const GREY = '#9a9a96';

const label = {
  fontFamily: "'Geist Mono', ui-monospace, Menlo, monospace",
  fontSize: 9,
  letterSpacing: '0.12em',
  textTransform: 'uppercase' as const,
};

const value = {
  fontFamily: "'Geist Mono', ui-monospace, Menlo, monospace",
  fontSize: 10,
};

/** Faint square grid, so every figure sits on the same paper. */
const Grid: React.FC = () => (
  <>
    <defs>
      <pattern id="fig-grid" width="20" height="20" patternUnits="userSpaceOnUse">
        <path d="M20 0 L0 0 0 20" fill="none" stroke={FAINT} strokeWidth="1" />
      </pattern>
    </defs>
    <rect width="360" height="240" fill="url(#fig-grid)" />
  </>
);

/** 01 — the target, drawn as an aperture closing on one band of the market. */
const FigTarget: React.FC = () => (
  <>
    <Grid />
    <g transform="translate(180,116)">
      <circle r="96" fill="none" stroke={RULE} strokeWidth="1" strokeDasharray="3 5" />
      <circle r="62" fill="none" stroke={RULE} strokeWidth="1" />
      <circle r="30" fill="#f4f4f1" stroke={INK} strokeWidth="1.5" />
      {/* crosshair */}
      <path d="M-118 0 H-104 M104 0 H118 M0 -118 V-104 M0 104 V118" stroke={RULE} strokeWidth="1" />
      <path d="M-12 0 H12 M0 -12 V12" stroke={INK} strokeWidth="1" />
      <rect x="-4" y="-4" width="8" height="8" fill={INK} />
    </g>
    <text x="180" y="228" textAnchor="middle" fill={GREY} style={label}>
      Series A–C · AWS / K8s · NA + EU
    </text>
    <text x="180" y="34" textAnchor="middle" fill={GREY} style={label}>
      Total market
    </text>
    <text x="248" y="120" fill={INK} style={value}>
      ICP
    </text>
  </>
);

/** 02 — the barrier between your domain and the one that does the sending. */
const FigDomains: React.FC = () => (
  <>
    <Grid />
    {/* protected primary */}
    <rect x="24" y="70" width="126" height="92" fill="#f4f4f1" stroke={RULE} strokeWidth="1" strokeDasharray="3 4" />
    <text x="87" y="98" textAnchor="middle" fill={GREY} style={label}>
      Your domain
    </text>
    <text x="87" y="122" textAnchor="middle" fill={INK} style={value}>
      yourfirm.com
    </text>
    <text x="87" y="142" textAnchor="middle" fill={GREY} style={label}>
      0 sent
    </text>

    {/* isolation barrier */}
    <path d="M180 40 V196" stroke={INK} strokeWidth="1" strokeDasharray="4 5" />
    <text x="180" y="32" textAnchor="middle" fill={INK} style={label}>
      Isolated
    </text>

    {/* sending domain */}
    <rect x="210" y="70" width="126" height="92" fill="#ffffff" stroke={INK} strokeWidth="1.5" />
    <rect x="210" y="70" width="126" height="20" fill={INK} />
    <text x="273" y="84" textAnchor="middle" fill="#fafafa" style={label}>
      Sending
    </text>
    <text x="273" y="112" textAnchor="middle" fill={INK} style={value}>
      yourfirm-infra.com
    </text>
    {['SPF', 'DKIM', 'DMARC'].map((t, i) => (
      <g key={t} transform={`translate(${228 + i * 38},134)`}>
        <rect x="-2" y="-6" width="6" height="6" fill={INK} />
        <text x="8" y="0" fill={GREY} style={{ ...label, fontSize: 8 }}>
          {t}
        </text>
      </g>
    ))}
    {/* outbound */}
    <path d="M273 162 V186" stroke={INK} strokeWidth="1" />
    <path d="M269 180 L273 188 L277 180 Z" fill={INK} />
  </>
);

/** 03 — the weekly sieve: everything scanned, only what breached comes out. */
const FigSieve: React.FC<{ threshold: number }> = ({ threshold }) => {
  const cells = Array.from({ length: 40 }, (_, i) => i);
  const qualified = new Set([3, 9, 14, 22, 27, 33]);
  return (
    <>
      <Grid />
      <text x="24" y="34" fill={GREY} style={label}>
        Scanned weekly · 40 roles
      </text>
      {cells.map((i) => {
        const col = i % 10;
        const row = Math.floor(i / 10);
        const hot = qualified.has(i);
        return (
          <rect
            key={i}
            x={24 + col * 32}
            y={48 + row * 20}
            width="22"
            height="12"
            fill={hot ? INK : '#f4f4f1'}
            stroke={hot ? INK : RULE}
            strokeWidth="1"
          />
        );
      })}

      <path d="M24 146 H336" stroke={INK} strokeWidth="1" strokeDasharray="4 5" />
      <text x="336" y="140" textAnchor="end" fill={INK} style={label}>
        {threshold}-day threshold
      </text>

      {[0, 1, 2, 3, 4, 5].map((i) => (
        <rect key={i} x={24 + i * 32} y="170" width="22" height="12" fill={INK} />
      ))}
      <text x="24" y="204" fill={GREY} style={label}>
        6 past the line · contacts released
      </text>
    </>
  );
};

/** 04 — where a reply actually goes. */
const FigRouting: React.FC = () => {
  const box = (x: number, y: number, w: number, h: number, solid = false) => (
    <rect
      x={x}
      y={y}
      width={w}
      height={h}
      fill={solid ? INK : '#ffffff'}
      stroke={solid ? INK : RULE}
      strokeWidth={solid ? 1.5 : 1}
    />
  );
  return (
    <>
      <Grid />
      {box(20, 54, 110, 48)}
      <text x="75" y="74" textAnchor="middle" fill={GREY} style={label}>
        Sending
      </text>
      <text x="75" y="90" textAnchor="middle" fill={INK} style={value}>
        infra domain
      </text>

      {box(125, 148, 110, 48)}
      <text x="180" y="168" textAnchor="middle" fill={GREY} style={label}>
        Prospect
      </text>
      <text x="180" y="184" textAnchor="middle" fill={INK} style={value}>
        VP Eng / CTO
      </text>

      {box(230, 54, 110, 48, true)}
      <text x="285" y="74" textAnchor="middle" fill="#a3a3a0" style={label}>
        Direct to
      </text>
      <text x="285" y="90" textAnchor="middle" fill="#fafafa" style={value}>
        your inbox
      </text>

      {/* outbound, faint */}
      <path d="M75 102 V126 H150" fill="none" stroke={RULE} strokeWidth="1" />
      <path d="M144 122 L152 126 L144 130 Z" fill={RULE} />

      {/* the reply, emphasised */}
      <path d="M210 148 V126 H285 V102" fill="none" stroke={INK} strokeWidth="1.5" />
      <path d="M281 110 L285 100 L289 110 Z" fill={INK} />
      <text x="248" y="120" textAnchor="middle" fill={INK} style={label}>
        Reply
      </text>
    </>
  );
};

export const StepFigure: React.FC<{ step: number; threshold: number }> = ({ step, threshold }) => (
  <svg
    viewBox="0 0 360 240"
    className="h-auto w-full"
    role="img"
    aria-label={
      [
        'An aperture closing from the total market onto one band: Series A to C, AWS and Kubernetes, North America and EU.',
        'Your own domain sits behind an isolation barrier having sent nothing, while a separate authenticated sending domain carries SPF, DKIM and DMARC and does the sending.',
        `Forty roles scanned each week; six cross the ${threshold}-day threshold and have their contacts released.`,
        'Mail leaves the sending domain to the prospect, and the reply routes directly to your own inbox.',
      ][step]
    }
  >
    {step === 0 && <FigTarget />}
    {step === 1 && <FigDomains />}
    {step === 2 && <FigSieve threshold={threshold} />}
    {step === 3 && <FigRouting />}
  </svg>
);
