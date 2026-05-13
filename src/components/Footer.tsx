"use client";

import { useLanguage } from "@/hooks/use-language";
import { translations } from "@/lib/translations";
import { motion } from "framer-motion";

export default function Footer() {
  const { lang } = useLanguage();
  const t = translations[lang].footer;

  return (
    <footer className="relative z-10 py-12 text-center text-foreground/30 text-xs font-mono border-t border-border-color bg-background/50 backdrop-blur-sm">
      <p>© 2026 // ANDRIANIRINA FEHIZORO SANTATRA FITIAVANA</p>
      <p className="mt-2 uppercase tracking-[0.5em] text-[10px]">{t.location}</p>
    </footer>
  );
}
