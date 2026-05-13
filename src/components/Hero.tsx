'use client';

import { useLanguage } from '@/hooks/use-language';
import { translations } from '@/lib/translations';
import { motion } from 'framer-motion';

export default function Hero() {
  const { lang } = useLanguage();
  const t = translations[lang].hero;

  return (
    <section className="relative min-h-screen flex flex-col justify-center px-6 md:px-24">
      <div className="max-w-screen-2xl w-full mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-8"
        >
          <span className="text-meta">{t.status}</span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <h1 className="heading-huge">
            ANDRIANIRINA <br />
            <span className="text-primary/40 outline-text">Santatra</span>
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="mt-12 flex flex-col md:flex-row md:items-end justify-between gap-12"
        >
          <p className="text-xl md:text-3xl max-w-2xl font-light leading-snug">
            {t.role} — <br />
            {t.tagline}
          </p>

          <a
            href="#projects"
            aria-label={t.cta}
            className="group relative inline-flex items-center justify-center px-12 py-5 overflow-hidden font-black uppercase tracking-[0.4em] text-xs border border-primary/20 hover:border-primary transition-colors duration-500"
          >
            <span className="relative z-10">{t.cta}</span>
            <motion.div 
              className="absolute inset-0 bg-primary translate-y-[101%] group-hover:translate-y-0 transition-transform duration-500 ease-[0.16,1,0.3,1]"
            />
            <span className="absolute inset-0 z-20 flex items-center justify-center text-background translate-y-[101%] group-hover:translate-y-0 transition-transform duration-500 ease-[0.16,1,0.3,1]">
              {t.cta}
            </span>
          </a>
        </motion.div>
      </div>
      
      {/* Decorative vertical line */}
      <div className="absolute left-6 md:left-24 bottom-0 w-[1px] h-24 bg-primary/20" />
    </section>
  );
}
