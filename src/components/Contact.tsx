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
    <section id="contact" className="py-24 px-4 bg-primary/5 text-center">
      <div className="max-w-3xl mx-auto">
        <motion.div
          whileInView={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 20 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-6">{t.title}</h2>
          <p className="text-lg text-foreground/70 mb-12">
            Je suis actuellement à la recherche d&apos;un stage de développeur. 
            N&apos;hésitez pas à me contacter pour discuter de vos projets !
          </p>
          
          <div className="flex flex-wrap justify-center gap-6">
            <a 
              href="mailto:fitiavanaandrianirina57@gmail.com"
              className="flex items-center gap-3 px-6 py-3 bg-primary text-background rounded-full font-bold hover:scale-105 transition-transform"
            >
              <Mail size={20} />
              {t.email}
            </a>
            <a 
              href="https://github.com/tatsumi96"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-6 py-3 border border-primary text-primary rounded-full font-bold hover:bg-primary/10 transition-colors"
            >
              <Github size={20} />
              {t.github}
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
