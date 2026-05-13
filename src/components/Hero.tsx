'use client';

import { useLanguage } from '@/hooks/use-language';
import { translations } from '@/lib/translations';
import { motion } from 'framer-motion';
import ThreeScene from './ThreeScene';

export default function Hero() {
  const { lang } = useLanguage();
  const t = translations[lang].hero;

  return (
    <section className="min-h-screen flex items-center justify-center px-8 md:px-16 pt-16 cyber-grid">
      <div className="max-w-7xl w-full flex flex-col md:flex-row items-center justify-between gap-12">
        <div className="flex-1 text-center md:text-left z-10">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="flex items-center justify-center md:justify-start gap-3 mb-6"
          >
            <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-primary/80">
              Status: Available_for_Internship
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-5xl md:text-7xl font-bold mb-4"
          >
            ANDRIANIRINA <br />
            <span className="text-primary">Santatra</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-xl md:text-2xl text-foreground/70 mb-8 max-w-lg mx-auto md:mx-0"
          >
            {t.role}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <a
              href="#projects"
              className="px-8 py-3 border border-primary text-primary hover:bg-primary hover:text-background transition-all rounded-full font-medium inline-block shadow-[0_0_15px_rgba(64,224,208,0.2)]"
            >
              {t.cta}
            </a>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, duration: 1 }}
          className="flex-1 w-full flex justify-center items-center"
        >
          <ThreeScene />
        </motion.div>
      </div>
    </section>
  );
}
