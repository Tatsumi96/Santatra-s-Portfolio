"use client";

import { useLanguage } from "@/hooks/use-language";
import { translations } from "@/lib/translations";
import { motion } from "framer-motion";
import { Code2, Layout, Smartphone, Server, Database, Cpu } from "lucide-react";

export default function Skills() {
  const { lang } = useLanguage();
  const t = translations[lang].skills;

  const skillCategories = [
    { name: t.categories.logic, skills: ["TypeScript", "JavaScript", "PHP"], icon: <Code2 /> },
    { name: t.categories.structural, skills: ["React", "Next.js", "Tailwind"], icon: <Layout /> },
    { name: t.categories.native, skills: ["React Native", "Expo"], icon: <Smartphone /> },
    { name: t.categories.neural, skills: ["Claude", "Gemini", "OpenAI"], icon: <Cpu /> },
    { name: t.categories.engine, skills: ["Node.js", "Express", "Laravel"], icon: <Server /> },
    { name: t.categories.storage, skills: ["PostgreSQL", "MySQL", "Redis"], icon: <Database /> },
  ];

  return (
    <section id="skills" className="relative py-32 px-6 md:px-24 border-t border-border-color">
      <div className="max-w-screen-2xl w-full mx-auto">
        <div className="flex items-baseline gap-8 mb-24">
           <h2 className="heading-huge text-primary/10">{t.subtitle}</h2>
           <span className="text-meta">02 // {t.title}</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 border-l border-t border-border-color">
          {skillCategories.map((cat, i) => (
            <motion.div
              key={cat.name}
              whileInView={{ opacity: 1 }}
              initial={{ opacity: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="p-8 border-r border-b border-border-color group hover:bg-[var(--hover-bg)] hover:text-[var(--hover-text)] transition-colors duration-500"
            >
              <div className="mb-12 opacity-30 group-hover:opacity-100 transition-opacity">
                {cat.icon}
              </div>
              <h3 className="text-sm font-black uppercase tracking-widest mb-6">{cat.name}</h3>
              <ul className="space-y-2">
                {cat.skills.map(skill => (
                  <li key={skill} className="text-xs font-mono opacity-50 group-hover:opacity-100 flex items-center gap-2">
                    <div className="w-1 h-1 bg-primary group-hover:bg-[var(--hover-text)] transition-colors" />
                    {skill}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
          
          {/* Decorative Blank Fill */}
          <div className="md:col-span-2 p-12 flex items-center justify-center border-r border-b border-border-color opacity-5 hidden lg:flex">
             <div className="w-full h-full border border-dashed border-primary" />
          </div>
        </div>
      </div>
    </section>
  );
}
