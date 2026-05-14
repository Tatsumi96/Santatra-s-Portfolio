"use client";

import { useLanguage } from "@/hooks/use-language";
import { translations } from "@/lib/translations";

export default function Footer() {
  const { lang } = useLanguage();
  const t = translations[lang].footer;
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative z-10 py-24 px-6 md:px-24 border-t border-border-color bg-background">
      <div className="max-w-screen-2xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="flex flex-col items-center md:items-start">
           <span className="text-xl font-black tracking-tighter mb-2">SANTATRA<span className="text-primary">.</span></span>
           <p className="text-[10px] font-mono opacity-30 uppercase tracking-[0.2em]">© {currentYear} {'//'} DESIGNED & DEVELOPED BY ME</p>
        </div>
        
        <div className="flex gap-12 text-[10px] font-black uppercase tracking-[0.4em] opacity-40 hover:opacity-100 transition-opacity">
           <a href="#about" className="hover:text-primary transition-colors">{translations[lang].nav.about}</a>
           <a href="#projects" className="hover:text-primary transition-colors">{translations[lang].nav.projects}</a>
           <a href="#contact" className="hover:text-primary transition-colors">{translations[lang].nav.contact}</a>
        </div>

        <div className="text-right hidden md:block">
           <p className="text-[10px] font-mono opacity-30 uppercase tracking-[0.5em]">{t.location}</p>
        </div>
      </div>
    </footer>
  );
}
