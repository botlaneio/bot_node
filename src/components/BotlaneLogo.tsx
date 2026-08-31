import React from 'react';
import { motion, type Variants } from 'motion/react';

interface BotlaneLogoProps {
  className?: string;
  size?: number;
  theme?: 'dark' | 'light' | 'monochrome';
  showSquircle?: boolean;
  animateOnLoad?: boolean;
}

const easeCurve = [0.16, 1, 0.3, 1] as const; // Refined ultra-smooth ease-out

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

const trackVariants: Variants = {
  hidden: { opacity: 0, scaleX: 0.85 },
  visible: {
    opacity: 0.7,
    scaleX: 1,
    transition: {
      duration: 2.1,
      ease: easeCurve,
    },
  },
};

const bgWaveVariants: Variants = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: {
    pathLength: 1,
    opacity: 0.32,
    transition: {
      pathLength: { duration: 2.2, ease: easeCurve },
      opacity: { duration: 1.8, ease: easeCurve },
    },
  },
};

const mainWaveVariants: Variants = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: {
    pathLength: 1,
    opacity: 1,
    transition: {
      pathLength: { duration: 2.35, ease: easeCurve },
      opacity: { duration: 1.6, ease: easeCurve },
    },
  },
};

const tickVariants: Variants = {
  hidden: { scaleY: 0, opacity: 0 },
  visible: {
    scaleY: 1,
    opacity: 1,
    transition: {
      duration: 1.5,
      ease: easeCurve,
    },
  },
};

export const BotlaneLogo: React.FC<BotlaneLogoProps> = ({
  className = '',
  size = 20,
  theme = 'light',
  showSquircle = false,
  animateOnLoad = true,
}) => {
  const isDarkCanvas = theme === 'dark' || theme === 'monochrome';

  // Primary foreground wave color
  const fgColor = isDarkCanvas
    ? '#FAFAFA'
    : '#2c2c2a'; // Softer off-black/dark grey for light navbar

  /*
    The mark carries the accent only in its subordinate parts — the secondary
    wave behind the pulse, and the ticks at the base. The pulse itself stays
    near-black, so the logo never reads as blue and never competes with a
    call to action sitting beside it in the navbar.
  */
  const bgColor = isDarkCanvas
    ? 'rgba(130, 170, 225, 0.34)'
    : 'rgba(27, 77, 143, 0.32)';

  // Horizontal lane band color
  const laneGradientStart = isDarkCanvas
    ? 'rgba(255, 255, 255, 0.14)'
    : 'rgba(24, 24, 27, 0.10)';
  const laneGradientEnd = isDarkCanvas
    ? 'rgba(255, 255, 255, 0.03)'
    : 'rgba(24, 24, 27, 0.02)';

  // Baseline dots, tinted to match the secondary wave on each ground
  const dotColor = isDarkCanvas ? '#6f8fb5' : '#5c7ea8';

  const squircleBg = isDarkCanvas ? '#121211' : '#F4F4F0';
  const squircleBorder = isDarkCanvas ? '#272725' : '#E4E4DF';

  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="140 160 680 660"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      /* The wordmark sits beside this everywhere it is used, so the mark
         itself is decorative and should not announce as an unlabelled graphic. */
      aria-hidden="true"
      focusable="false"
      className={`shrink-0 select-none overflow-visible inline-block align-middle ${className}`}
      variants={containerVariants}
      initial={animateOnLoad ? 'hidden' : 'visible'}
      animate="visible"
    >
      <defs>
        <linearGradient id={`lane-grad-${theme}`} x1="100" y1="450" x2="900" y2="450" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor={laneGradientEnd} />
          <stop offset="25%" stopColor={laneGradientStart} />
          <stop offset="75%" stopColor={laneGradientStart} />
          <stop offset="100%" stopColor={laneGradientEnd} />
        </linearGradient>
      </defs>

      {/* Optional Outer Container */}
      {showSquircle && (
        <rect
          x="20"
          y="20"
          width="960"
          height="960"
          rx="240"
          fill={squircleBg}
          stroke={squircleBorder}
          strokeWidth="32"
        />
      )}

      {/* Horizontal Ambient Lane Track */}
      <motion.rect
        x="120"
        y="420"
        width="760"
        height="80"
        rx="20"
        fill={`url(#lane-grad-${theme})`}
        variants={trackVariants}
        style={{ transformOrigin: 'center' }}
      />

      {/* Background Shifted Wave (Depth / Secondary Wave) */}
      <motion.path
        d="M 180 430 L 260 210 L 370 700 L 465 420"
        stroke={bgColor}
        strokeWidth="92"
        strokeLinecap="round"
        strokeLinejoin="round"
        variants={bgWaveVariants}
      />

      {/* Foreground Main Wave (Refined Pulse Wave) */}
      <motion.path
        d="M 370 450 L 485 180 L 595 710 L 675 435"
        stroke={fgColor}
        strokeWidth="96"
        strokeLinecap="round"
        strokeLinejoin="round"
        variants={mainWaveVariants}
      />

      {/* Three Base Data Ticks */}
      <motion.rect
        x="180"
        y="770"
        width="42"
        height="75"
        rx="21"
        fill={dotColor}
        variants={tickVariants}
        style={{ transformOrigin: 'bottom' }}
      />
      <motion.rect
        x="480"
        y="770"
        width="42"
        height="75"
        rx="21"
        fill={dotColor}
        variants={tickVariants}
        style={{ transformOrigin: 'bottom' }}
      />
      <motion.rect
        x="780"
        y="770"
        width="42"
        height="75"
        rx="21"
        fill={dotColor}
        variants={tickVariants}
        style={{ transformOrigin: 'bottom' }}
      />
    </motion.svg>
  );
};
