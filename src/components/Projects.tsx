'use client';

import { useLanguage } from '@/hooks/use-language';
import { translations } from '@/lib/translations';
import { ExternalLink } from 'lucide-react';
import { GithubIcon as Github } from './icons/GithubIcon';

export default function Projects() {
  const { lang } = useLanguage();
  const t = translations[lang].projects;

  return (
    <section
      id="projects"
      className="relative py-32 border-t border-border-color bg-transparent z-20"
    >
      <div className="px-6 md:px-24 mb-32">
        <h2 className="text-meta mb-4">03 // {t.title}</h2>
        <p className="heading-huge">{t.subtitle}</p>
      </div>

      <div className="flex flex-col">
        {t.items.map((project, i) => (
          <div
            key={project.title}
            className="group relative border-b border-border-color py-24 md:py-32 px-6 md:px-24 transition-colors duration-700 hover:bg-primary/[0.02]"
          >
            <div className="max-w-screen-2xl w-full mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 items-center relative z-10">
              <div className="md:col-span-1 text-meta opacity-20 group-hover:opacity-100 transition-all">
                {String(i + 1).padStart(2, '0')}
              </div>

              <div className="md:col-span-7">
                <h3 className="text-4xl sm:text-5xl md:text-[7vw] font-black uppercase tracking-tighter transition-all duration-500 group-hover:pl-8 leading-[1]">
                  {project.title}
                </h3>
              </div>

              <div className="md:col-span-4 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0 hidden md:block">
                <p className="text-lg font-light mb-8 transition-colors leading-relaxed">
                  {project.desc}
                </p>
                <div className="flex gap-8">
                  <a
                    href="https://github.com/tatsumi96"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest hover:underline"
                  >
                    <Github size={16} /> {t.source}
                  </a>
                  <a
                    href="#"
                    className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest hover:underline"
                  >
                    <ExternalLink size={16} /> {t.demo}
                  </a>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
