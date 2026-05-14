'use client';

import { useLanguage } from '@/hooks/use-language';
import { translations } from '@/lib/translations';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { Languages, Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export default function Navbar() {
  const { theme, setTheme } = useTheme();
  const { lang, setLang } = useLanguage();
  const [mounted, setMounted] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollY } = useScroll();
  const t = translations[lang].nav;

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 50);
  });

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const toggleLang = () => {
    if (lang === 'fr') setLang('en');
    else if (lang === 'en') setLang('mg');
    else setLang('fr');
  };

  const isDark = theme === 'dark';

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 w-full z-50 transition-all duration-700 ${
        isScrolled ? 'h-16 bg-background/50 backdrop-blur-2xl border-b border-border-color' : 'h-24 bg-transparent'
      }`}
    >
      <div className="max-w-screen-2xl mx-auto px-6 md:px-24 h-full flex items-center justify-between">
        <div className="flex items-center gap-12">
          <motion.span
            whileHover={{ scale: 1.05 }}
            className="text-xl font-black tracking-tighter flex items-center gap-1 cursor-pointer"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            role="link"
            aria-label="Back to Top"
          >
            S<span className="hidden md:inline">ANTATRA</span><span className="text-primary">.</span>
          </motion.span>
          
          <div className="hidden lg:flex gap-8 items-center border-l border-border-color pl-12 h-6">
            <span className="text-[8px] font-mono opacity-30 uppercase tracking-[0.4em]">{t.status} </span>
            <span className="text-[8px] font-mono uppercase tracking-[0.4em] text-primary">{t.available}</span>
          </div>
        </div>

        <div className="hidden md:flex gap-12 items-center">
          {['about', 'skills', 'projects', 'contact'].map(item => (
            <a
              key={item}
              href={`#${item}`}
              className="group relative text-[9px] font-black uppercase tracking-[0.3em] opacity-40 hover:opacity-100 transition-all"
              aria-label={t[item as keyof typeof t]}
            >
              {t[item as keyof typeof t]}
              <span className="absolute -bottom-2 left-0 w-0 h-[1px] bg-primary transition-all duration-500 ease-[0.16,1,0.3,1] group-hover:w-full" />
            </a>
          ))}
        </div>

        <div className="flex items-center gap-6 md:gap-10">
          <button
            onClick={toggleLang}
            aria-label="Change Language"
            className="text-[10px] font-black uppercase tracking-widest opacity-60 hover:opacity-100 transition-opacity flex items-center gap-2"
          >
            <Languages size={14} />
            {lang}
          </button>

          <button
            className="p-2 opacity-60 hover:opacity-100 transition-opacity"
            onClick={() => setTheme(isDark ? 'light' : 'dark')}
            aria-label="Toggle Theme"
          >
            {isDark ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </div>
      </div>
    </motion.nav>
  );
}
