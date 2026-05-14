"use client";

import { useLanguage } from "@/hooks/use-language";
import { translations } from "@/lib/translations";
import { motion, useSpring, useMotionValue } from "framer-motion";
import { Code2, Layout, Smartphone, Server, Database, Cpu } from "lucide-react";
import Marquee from "./Marquee";
import { useRef } from "react";

function MagneticCard({ children, i }: { children: React.ReactNode, i: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseX = useSpring(x, { stiffness: 150, damping: 15 });
  const mouseY = useSpring(y, { stiffness: 150, damping: 15 });

  function handleMouseMove(e: React.MouseEvent) {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    x.set(clientX - centerX);
    y.set(clientY - centerY);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: mouseX, y: mouseY }}
      whileInView={{ opacity: 1, y: 0 }}
      initial={{ opacity: 0, y: 20 }}
      viewport={{ once: true }}
      transition={{ delay: i * 0.05 }}
      className="p-8 border-r border-b border-border-color group hover:bg-[var(--hover-bg)] hover:text-[var(--hover-text)] transition-colors duration-500 relative z-10"
    >
      {children}
    </motion.div>
  );
}

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
    <section id="skills" className="relative py-32 border-t border-border-color bg-background">
      <div className="absolute top-0 left-0 w-full py-4 border-b border-border-color overflow-hidden opacity-20">
        <Marquee speed={30}>
          {skillCategories.flatMap(c => c.skills).map(s => (
            <span key={s} className="text-xs font-black uppercase tracking-[0.5em] mx-12">{s}</span>
          ))}
        </Marquee>
      </div>

      <div className="max-w-screen-2xl w-full mx-auto px-6 md:px-24 mt-24">
        <div className="flex items-baseline gap-8 mb-24">
           <h2 className="heading-huge text-primary/10">{t.subtitle}</h2>
           <span className="text-meta">02 // {t.title}</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 border-l border-t border-border-color">
          {skillCategories.map((cat, i) => (
            <MagneticCard key={cat.name} i={i}>
              <div className="mb-12 opacity-30 group-hover:opacity-100 transition-opacity">
                {cat.icon}
              </div>
              <h3 className="text-sm font-black uppercase tracking-widest mb-6">{cat.name}</h3>
              <ul className="space-y-3">
                {cat.skills.map(skill => (
                  <li key={skill} className="text-[10px] font-mono opacity-50 group-hover:opacity-100 flex items-center gap-2">
                    <div className="w-1 h-1 bg-primary group-hover:bg-[var(--hover-text)] transition-colors" />
                    {skill}
                  </li>
                ))}
              </ul>
            </MagneticCard>
          ))}
          
          <div className="md:col-span-2 p-12 flex items-center justify-center border-r border-b border-border-color opacity-5 hidden lg:flex">
             <div className="w-full h-full border border-dashed border-primary" />
          </div>
        </div>
      </div>
    </section>
  );
}
