'use client';

import { useLanguage } from '@/hooks/use-language';
import { translations } from '@/lib/translations';
import { motion } from 'framer-motion';
import { Mail } from 'lucide-react';
import { GithubIcon as Github } from './icons/GithubIcon';
import Section3D from './Section3D';

export default function Contact() {
  const { lang } = useLanguage();
  const t = translations[lang].contact;

  return (
    <section id="contact" className="relative py-24 px-4 overflow-hidden border-t-force">
      <Section3D type="complex" color="#bc13fe" />
      {/* Background ambient glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-neon-purple/5 blur-[120px] -z-10 rounded-full" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/5 blur-[120px] -z-10 rounded-full" />

      <div className="max-w-3xl mx-auto relative z-10 glass p-12 rounded-3xl border-force text-center">

        <motion.div
          whileInView={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 20 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            {t.title} <span className="text-neon-purple">.</span>
          </h2>
          <p className="text-lg text-foreground/70 mb-12">
            Je suis actuellement à la recherche d&apos;un stage de développeur.
            N&apos;hésitez pas à me contacter pour discuter de vos projets !
          </p>

          <div className="flex flex-wrap justify-center gap-6">
            <a
              href="mailto:fitiavanaandrianirina57@gmail.com"
              className="flex items-center gap-3 px-6 py-3 bg-primary text-background rounded-full font-bold hover:scale-105 transition-transform border-force duration-300"
            >
              <Mail size={20} />
              {t.email}
            </a>
            <a
              href="https://github.com/tatsumi96"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-6 py-3 border-neon-purple/50 text-neon-purple rounded-full font-bold hover:scale-105 transition-transform border-force duration-500"
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
