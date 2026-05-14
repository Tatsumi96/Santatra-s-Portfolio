"use client";

import { useLanguage } from "@/hooks/use-language";
import { translations } from "@/lib/translations";
import { motion } from "framer-motion";
import { Mail, ArrowUpRight } from "lucide-react";
import { GithubIcon as Github } from "./icons/GithubIcon";
import Magnetic from "./Magnetic";

export default function Contact() {
  const { lang } = useLanguage();
  const t = translations[lang].contact;

  return (
    <section id="contact" className="relative py-48 px-6 md:px-24 border-t border-border-color overflow-hidden bg-background">
      <div className="max-w-screen-2xl w-full mx-auto relative z-10">
        <motion.div
          whileInView={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 40 }}
          viewport={{ once: true }}
          className="max-w-4xl"
        >
          <span className="text-meta mb-12 block tracking-[0.5em]">{t.phase}</span>
          <h2 className="text-6xl sm:text-8xl md:text-[12vw] font-black uppercase tracking-tighter leading-[0.8] mb-24">
            {t.title.split(' ').map((word, i) => (
              <span key={i} className={i % 2 === 1 ? 'outline-text' : ''}>
                {word}{' '}
              </span>
            ))}
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
          <Magnetic>
            <a
              href="mailto:fitiavanaandrianirina57@gmail.com"
              aria-label="Send Email"
              className="group flex flex-col border border-border-color p-8 md:p-16 hover:bg-primary transition-colors duration-700"
            >
              <div className="flex justify-between items-start mb-16">
                <div className="w-12 h-12 flex items-center justify-center border border-border-color group-hover:border-background transition-colors">
                  <Mail size={20} className="group-hover:text-background transition-colors" />
                </div>
                <ArrowUpRight size={24} className="group-hover:text-background transition-colors" />
              </div>
              <span className="text-meta mb-4 group-hover:text-background/40 transition-colors">{t.email_label}</span>
              <span className="text-2xl md:text-5xl font-black uppercase tracking-tighter group-hover:text-background transition-colors">
                {t.email}
              </span>
            </a>
          </Magnetic>

          <Magnetic>
            <a
              href="https://github.com/tatsumi96"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit GitHub"
              className="group flex flex-col border border-border-color p-8 md:p-16 hover:bg-primary transition-colors duration-700"
            >
              <div className="flex justify-between items-start mb-16">
                <div className="w-12 h-12 flex items-center justify-center border border-border-color group-hover:border-background transition-colors">
                  <Github size={20} className="group-hover:text-background transition-colors" />
                </div>
                <ArrowUpRight size={24} className="group-hover:text-background transition-colors" />
              </div>
              <span className="text-meta mb-4 group-hover:text-background/40 transition-colors">{t.github_label}</span>
              <span className="text-2xl md:text-5xl font-black uppercase tracking-tighter group-hover:text-background transition-colors">
                {t.github}
              </span>
            </a>
          </Magnetic>
        </div>
      </div>
      
      {/* Background Decorative Text */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden pointer-events-none opacity-[0.04] translate-y-1/4">
         <span className="text-[25vw] font-black uppercase leading-none whitespace-nowrap block">{t.tagline}</span>
      </div>
    </section>
  );
}
