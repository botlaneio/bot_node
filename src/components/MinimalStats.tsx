import React, { useRef, useEffect } from 'react';
import { motion, useInView, useMotionValue, useSpring } from 'motion/react';

interface AnimatedCounterProps {
  value: number;
  suffix?: string;
  prefix?: string;
  decimals?: number;
}

const AnimatedCounter: React.FC<AnimatedCounterProps> = ({ value, suffix = "", prefix = "", decimals = 0 }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, {
    damping: 60,
    stiffness: 100,
  });

  useEffect(() => {
    if (inView) {
      motionValue.set(value);
    }
  }, [inView, value, motionValue]);

  useEffect(() => {
    const unsubscribe = springValue.on("change", (latest) => {
      if (ref.current) {
        if (decimals > 0) {
          ref.current.textContent = `${prefix}${latest.toFixed(decimals)}${suffix}`;
        } else {
          ref.current.textContent = `${prefix}${Math.floor(latest)}${suffix}`;
        }
      }
    });
    return unsubscribe;
  }, [springValue, prefix, suffix, decimals]);

  return (
    <span ref={ref} className="font-medium tracking-tight text-inherit">
      {prefix}
      {decimals > 0 ? value.toFixed(decimals) : value}
      {suffix}
    </span>
  );
};

export const MinimalStats: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { type: "spring", stiffness: 300, damping: 24 }
    }
  };

  // Every figure here is something Botlane controls and can be held to:
  // a policy, a process step, or a targeting rule. None of them are
  // performance claims, because there is no data to support one yet.
  const stats = [
    {
      value: 4,
      label: "Consultancies, maximum",
      description: "The roster is capped so no two clients ever chase the same opening"
    },
    {
      value: 3,
      suffix: "wk",
      label: "Warm-up before first send",
      description: "Dedicated domains authenticated and aged before a single message goes out"
    },
    {
      value: 60,
      prefix: ">",
      suffix: "d",
      label: "Minimum signal age",
      description: "How long a role must sit open before we treat it as real hiring distress"
    },
    {
      value: 0,
      label: "Emails from your domain",
      description: "Outreach only ever leaves isolated secondary domains"
    }
  ];

  return (
    <section className="py-16 md:py-20 border-b border-[#e3e3e0]">
      <div className="max-w-[1180px] mx-auto px-5 md:px-8">
        <motion.div 
          className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {stats.map((stat, idx) => (
            <motion.div key={idx} variants={itemVariants} className="flex flex-col border-l-2 border-[#e3e3e0] pl-5 md:pl-6">
              <div className="text-4xl md:text-5xl font-medium tracking-tight text-[#0d0d0d] mb-3">
                <AnimatedCounter value={stat.value} prefix={stat.prefix} suffix={stat.suffix} />
              </div>
              <h4 className="text-[0.9375rem] font-medium text-[#0d0d0d] mb-1.5 leading-snug">
                {stat.label}
              </h4>
              <p className="text-sm text-[#6b6b68] leading-relaxed">
                {stat.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
