"use client";

import { useLanguage } from "@/hooks/use-language";
import { translations } from "@/lib/translations";
import { motion } from "framer-motion";
import { Mail } from "lucide-react";
import { GithubIcon as Github } from "./icons/GithubIcon";

export default function Contact() {
  const { lang } = useLanguage();
  const t = translations[lang].contact;

  return (
    <section id="contact" className="relative py-48 px-6 md:px-24 border-t border-border-color overflow-hidden">
      <div className="max-w-screen-2xl w-full mx-auto text-center">
        <motion.div
          whileInView={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 40 }}
          viewport={{ once: true }}
        >
          <span className="text-meta mb-8 block tracking-[1em]">{t.phase}</span>
          <h2 className="heading-huge mb-16">{t.title}</h2>
          
          <div className="flex flex-col md:flex-row items-center justify-center gap-12">
            <a
              href="mailto:fitiavanaandrianirina57@gmail.com"
              className="group flex items-center gap-6 text-2xl md:text-5xl font-black uppercase tracking-tighter hover:text-primary transition-colors"
            >
              <div className="w-12 h-12 flex items-center justify-center border border-border-color group-hover:bg-[var(--hover-bg)] group-hover:text-[var(--hover-text)] transition-colors">
                <Mail size={24} />
              </div>
              {t.email}
            </a>
            
            <a
              href="https://github.com/tatsumi96"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-6 text-2xl md:text-5xl font-black uppercase tracking-tighter hover:text-primary transition-colors"
            >
              <div className="w-12 h-12 flex items-center justify-center border border-border-color group-hover:bg-[var(--hover-bg)] group-hover:text-[var(--hover-text)] transition-colors">
                <Github size={24} />
              </div>
              {t.github}
            </a>
          </div>
        </motion.div>
      </div>
      
      {/* Background Decorative Text */}
      <div className="absolute -bottom-10 left-0 w-full overflow-hidden pointer-events-none opacity-5">
         <span className="text-[20vw] font-black uppercase leading-none whitespace-nowrap">{t.tagline}</span>
      </div>
    </section>
  );
}
