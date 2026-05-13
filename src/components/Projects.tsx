'use client';

import { useLanguage } from '@/hooks/use-language';
import { translations } from '@/lib/translations';
import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { GithubIcon as Github } from './icons/GithubIcon';

export default function Projects() {
  const { lang } = useLanguage();
  const t = translations[lang].projects;

  return (
    <section
      id="projects"
      className="relative py-32 border-t border-border-color"
    >
      <div className="px-6 md:px-24 mb-24">
        <h2 className="text-meta mb-4">03 // {t.title}</h2>
        <p className="heading-huge">{t.subtitle}</p>
      </div>

      <div className="flex flex-col">
        {t.items.map((project, i) => (
          <motion.div
            key={project.title}
            whileInView={{ opacity: 1 }}
            initial={{ opacity: 0 }}
            viewport={{ once: true }}
            className="group relative border-b border-border-color py-24 px-6 md:px-24 transition-colors duration-700"
          >
            <div className="max-w-screen-2xl w-full mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
              <div className="md:col-span-1 text-meta opacity-20 group-hover:opacity-100 transition-all">
                VOL_{i + 1}
              </div>

              <div className="md:col-span-7">
                <h3 className="text-5xl md:text-8xl font-black uppercase tracking-tighter transition-colors duration-500">
                  {project.title}
                </h3>
              </div>

              <div className="md:col-span-4">
                <p className="text-lg font-light mb-8 transition-colors leading-relaxed">
                  {project.desc}
                </p>
                <div className="flex gap-8">
                  <a
                    href="https://github.com/tatsumi96"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-xs font-black uppercase tracking-widest "
                  >
                    <Github size={16} /> {t.source}
                  </a>
                  <a
                    href="#"
                    className="flex items-center gap-2 text-xs font-black uppercase tracking-widestw"
                  >
                    <ExternalLink size={16} /> {t.demo}
                  </a>
                </div>
              </div>
            </div>

            {/* Visual background reveal */}
            <div className="absolute top-0 right-0 h-full w-0 bg-(--hover-bg)/10 group-hover:w-full transition-all duration-1000 ease-in-out pointer-events-none" />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
