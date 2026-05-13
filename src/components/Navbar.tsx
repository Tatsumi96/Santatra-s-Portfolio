'use client';

import { useLanguage } from '@/hooks/use-language';
import { translations } from '@/lib/translations';
import { motion } from 'framer-motion';
import { Languages, Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export default function Navbar() {
  const { theme, setTheme } = useTheme();
  const { lang, setLang } = useLanguage();
  const [mounted, setMounted] = useState(false);
  const t = translations[lang].nav;

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
      className="fixed top-0 w-full z-50 backdrop-blur-xl border-b-force bg-background/70"
    >
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <motion.span
          whileHover={{ scale: 1.05 }}
          className="text-xl font-bold flex items-center gap-1 cursor-pointer"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <span className="text-primary tracking-tight">SANTATRA</span>
          <span className="text-neon-purple">.</span>
        </motion.span>

        <div className="hidden md:flex gap-8 text-sm font-semibold tracking-wide">
          {['about', 'skills', 'projects', 'contact'].map(item => (
            <a
              key={item}
              href={`#${item}`}
              className="relative group transition-colors hover:text-primary py-2"
            >
              {t[item as keyof typeof t]}
              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-neon-purple/60 transition-all group-hover:w-full" />
            </a>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={toggleLang}
            className="p-2 border-force hover:bg-primary/10 rounded-xl transition-all flex items-center gap-2 group bg-background/50"
          >
            <Languages
              size={16}
              className="text-primary group-hover:text-neon-purple transition-colors"
            />
            <span className="text-[10px] uppercase font-bold tracking-widest">
              {lang}
            </span>
          </button>

          <div
            className="relative flex items-center gap-2 cursor-pointer select-none"
            onClick={() => setTheme(isDark ? 'light' : 'dark')}
          >
            <div
              className={`w-11 h-6 rounded-full border-force transition-colors duration-300 flex items-center p-1 ${isDark ? 'bg-neon-purple/20' : 'bg-slate-200'}`}
            >
              <motion.div
                animate={{ x: isDark ? 20 : 0 }}
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                className={`w-4 h-4 rounded-full flex items-center justify-center shadow-md ${isDark ? 'bg-neon-purple' : 'bg-white'}`}
              >
                {isDark ? (
                  <Moon size={10} className="text-white" />
                ) : (
                  <Sun size={10} className="text-amber-500" />
                )}
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </motion.nav>
  );
}
