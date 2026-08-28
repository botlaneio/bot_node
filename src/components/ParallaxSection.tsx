import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';

interface ParallaxSectionProps {
  children: React.ReactNode;
  bgClass?: string;
}

export const ParallaxSection: React.FC<ParallaxSectionProps> = ({ 
  children, 
  bgClass = "bg-[#fafafa]"
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Smoothly translate the background from top to bottom as the user scrolls past
  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <div ref={containerRef} className="relative overflow-hidden">
      {/* Parallax Layer */}
      <motion.div 
        className={`absolute inset-[-15%] z-0 ${bgClass}`}
        style={{ y, willChange: "transform" }}
      />
      {/* Content Layer */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};
