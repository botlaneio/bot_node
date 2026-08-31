import React from 'react';
import { motion } from 'motion/react';

export const SkeletonLoader: React.FC = () => {
  return (
    <motion.div
      key="skeleton-loader"
      exit={{ opacity: 0, filter: 'blur(8px)', scale: 1.02 }}
      transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-0 z-[100] bg-[var(--sheet-page)] flex flex-col pointer-events-none overflow-hidden"
    >
      {/* Navbar Skeleton */}
      <div className="flex h-16 items-center justify-between px-6 md:px-12 max-w-[1240px] w-full mx-auto">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded-md bg-[var(--sheet-rule)] animate-pulse" />
          <div className="w-20 h-4 rounded bg-[var(--sheet-rule)] animate-pulse" />
        </div>
        <div className="hidden md:flex gap-8">
          <div className="w-16 h-3.5 rounded bg-[var(--sheet-rule)] animate-pulse" />
          <div className="w-24 h-3.5 rounded bg-[var(--sheet-rule)] animate-pulse" />
          <div className="w-16 h-3.5 rounded bg-[var(--sheet-rule)] animate-pulse" />
          <div className="w-12 h-3.5 rounded bg-[var(--sheet-rule)] animate-pulse" />
        </div>
        <div className="hidden sm:block w-28 h-9 rounded-lg bg-[var(--sheet-rule)] animate-pulse" />
      </div>

      {/* Hero Skeleton */}
      <div className="flex-1 w-full max-w-[1240px] mx-auto px-6 md:px-12 pt-24 md:pt-32 flex flex-col items-center">
        {/* Pill */}
        <div className="w-48 h-7 rounded-full bg-[var(--sheet-rule)] animate-pulse mb-8" />
        
        {/* H1 Lines */}
        <div className="w-full max-w-3xl h-12 md:h-16 rounded-2xl bg-[#c4c4bf] animate-pulse mb-3" />
        <div className="w-3/4 max-w-2xl h-12 md:h-16 rounded-2xl bg-[#c4c4bf] animate-pulse mb-8" />
        
        {/* Paragraph lines */}
        <div className="w-full max-w-xl h-5 rounded-md bg-[var(--sheet-rule)] animate-pulse mb-3" />
        <div className="w-2/3 max-w-lg h-5 rounded-md bg-[var(--sheet-rule)] animate-pulse mb-10" />

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-4 mb-16 md:mb-20 w-full sm:w-auto">
          <div className="w-full sm:w-40 h-[3.25rem] rounded-lg bg-[#c4c4bf] animate-pulse" />
          <div className="w-full sm:w-40 h-[3.25rem] rounded-lg bg-[var(--sheet-rule)] animate-pulse" />
        </div>

        {/* Dashboard/Feature Mock */}
        <div className="w-full max-w-5xl h-[50vh] bg-[var(--sheet-open)] border border-[var(--sheet-rule)] border-b-0 animate-pulse" />
      </div>
    </motion.div>
  );
};
