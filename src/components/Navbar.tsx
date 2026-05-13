"use client";

import { useTheme } from "next-themes";
import { useLanguage } from "@/hooks/use-language";
import { translations } from "@/lib/translations";
import { Moon, Sun, Languages } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function Navbar() {
  const { theme, setTheme } = useTheme();
  const { lang, setLang } = useLanguage();
  const [mounted, setMounted] = useState(false);
  const t = translations[lang].nav;

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const toggleLang = () => {
    if (lang === "fr") setLang("en");
    else if (lang === "en") setLang("mg");
    else setLang("fr");
  };

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 w-full z-50 backdrop-blur-md border-b border-primary/20 bg-background/50"
    >
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <motion.span 
          whileHover={{ scale: 1.05 }}
          className="text-xl font-bold text-primary"
        >
          SANTATRA.
        </motion.span>

        <div className="hidden md:flex gap-8 text-sm font-medium">
          <a href="#about" className="hover:text-primary transition-colors">{t.about}</a>
          <a href="#skills" className="hover:text-primary transition-colors">{t.skills}</a>
          <a href="#projects" className="hover:text-primary transition-colors">{t.projects}</a>
          <a href="#contact" className="hover:text-primary transition-colors">{t.contact}</a>
        </div>

        <div className="flex items-center gap-4">
          <button 
            onClick={toggleLang}
            className="p-2 hover:bg-primary/10 rounded-full transition-colors flex items-center gap-2"
          >
            <Languages size={20} />
            <span className="text-xs uppercase font-bold">{lang}</span>
          </button>
          
          <button 
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="p-2 hover:bg-primary/10 rounded-full transition-colors"
          >
            {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>
      </div>
    </motion.nav>
  );
}
