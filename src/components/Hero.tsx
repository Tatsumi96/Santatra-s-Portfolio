'use client';

import { useLanguage } from '@/hooks/use-language';
import { translations } from '@/lib/translations';
import { motion } from 'framer-motion';

const titleAnim = {
  initial: { y: "100%" },
  animate: { y: 0 },
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export default function Hero() {
  const { lang } = useLanguage();
  const t = translations[lang].hero;

  const firstName = "ANDRIANIRINA";
  const lastName = "Santatra";

  return (
    <section className="relative min-h-screen flex flex-col justify-center px-6 md:px-24 overflow-hidden bg-background">
      <div className="max-w-screen-2xl w-full mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="mb-12"
        >
          <span className="text-meta inline-flex items-center gap-4">
            <span className="w-8 h-[1px] bg-primary/40" />
            {t.status}
          </span>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="initial"
          animate="animate"
          className="flex flex-col gap-0"
        >
          <div className="overflow-hidden text-reveal">
            <motion.h1 
              variants={titleAnim}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="heading-huge"
            >
              {firstName}
            </motion.h1>
          </div>
          <div className="overflow-hidden text-reveal mt-[-0.1em]">
            <motion.h1 
              variants={titleAnim}
              transition={{ duration: 1.2, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="heading-huge outline-text"
            >
              {lastName}
            </motion.h1>
          </div>
        </motion.div>

        <div className="mt-16 flex flex-col md:flex-row md:items-end justify-between gap-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-xl"
          >
            <p className="text-xl md:text-3xl font-light leading-snug opacity-80">
              {t.role} <br />
              <span className="opacity-40">{t.tagline}</span>
            </p>
          </motion.div>

          <motion.div
             initial={{ opacity: 0, scale: 0.9 }}
             animate={{ opacity: 1, scale: 1 }}
             transition={{ duration: 1, delay: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <a
              href="#projects"
              aria-label={t.cta}
              className="group relative inline-flex items-center justify-center px-16 py-7 overflow-hidden font-black uppercase tracking-[0.4em] text-[10px] border border-primary/10 hover:border-primary transition-colors duration-700"
            >
              <span className="relative z-10 transition-colors duration-500 group-hover:text-background">{t.cta}</span>
              <motion.div 
                className="absolute inset-0 bg-primary translate-y-[101%] group-hover:translate-y-0 transition-transform duration-700 ease-[0.16,1,0.3,1]"
              />
            </a>
          </motion.div>
        </div>
      </div>
      
      {/* Decorative background elements */}
      <div className="absolute top-1/2 left-0 w-full h-[1px] bg-primary/5 -translate-y-1/2 -z-10" />
      <div className="absolute top-0 right-24 h-full w-[1px] bg-primary/5 -z-10 hidden md:block" />
      
      <motion.div 
        initial={{ height: 0 }}
        animate={{ height: "10rem" }}
        transition={{ duration: 1.5, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="absolute left-6 md:left-24 bottom-0 w-[1px] bg-primary/20" 
      />
    </section>
  );
}
