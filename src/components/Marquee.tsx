'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface MarqueeProps {
  children: ReactNode;
  speed?: number;
  reverse?: boolean;
}

export default function Marquee({ children, speed = 20, reverse = false }: MarqueeProps) {
  return (
    <div className="flex overflow-hidden whitespace-nowrap select-none">
      <motion.div
        animate={{ x: reverse ? ['0%', '100%'] : ['0%', '-100%'] }}
        transition={{ duration: speed, repeat: Infinity, ease: 'linear' }}
        className="flex"
      >
        {children}
        {children}
      </motion.div>
    </div>
  );
}
