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
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        isScrolled ? 'bg-background/80 backdrop-blur-xl border-b border-border-color' : 'bg-transparent'
      }`}
    >
      <div className="max-w-screen-2xl mx-auto px-6 md:px-24 h-24 flex items-center justify-between">
        <motion.span
          whileHover={{ scale: 1.05 }}
          className="text-xl font-black tracking-tighter flex items-center gap-1 cursor-pointer"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          role="link"
          aria-label="Back to Top"
        >
          SANTATRA<span className="text-primary">.</span>
        </motion.span>

        <div className="hidden md:flex gap-12">
          {['about', 'skills', 'projects', 'contact'].map(item => (
            <a
              key={item}
              href={`#${item}`}
              className="text-[10px] font-black uppercase tracking-[0.4em] opacity-60 hover:opacity-100 transition-opacity"
              aria-label={t[item as keyof typeof t]}
            >
              {t[item as keyof typeof t]}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-8">
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
