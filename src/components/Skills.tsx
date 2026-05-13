"use client";

import { useLanguage } from "@/hooks/use-language";
import { translations } from "@/lib/translations";
import { motion } from "framer-motion";
import { Code2, Layout, Smartphone, Server, Database, Cpu } from "lucide-react";
import Section3D from "./Section3D";

const skillCategories = [
  { name: "Languages", skills: ["TypeScript", "JavaScript", "PHP", "HTML5", "CSS3"], icon: <Code2 />, color: "var(--neon-cyan)" },
  { name: "Frontend", skills: ["React.js", "Next.js", "TailwindCSS", "Vite"], icon: <Layout />, color: "var(--neon-purple)" },
  { name: "Mobile", skills: ["React Native"], icon: <Smartphone />, color: "#ec4899" }, // Pink
  { name: "Backend", skills: ["Node.js", "Express.js", "Laravel"], icon: <Server />, color: "var(--neon-cyan)" },
  { name: "Database", skills: ["PostgreSQL", "MySQL"], icon: <Database />, color: "var(--neon-purple)" },
  { name: "Tools & AI", skills: ["Docker", "Git", "Claude AI", "Gemini CLI"], icon: <Cpu />, color: "#ec4899" },
];

export default function Skills() {
  const { lang } = useLanguage();
  const t = translations[lang].skills;

  return (
    <section id="skills" className="relative py-24 px-4 overflow-hidden">
      <Section3D type="octa" color="#bc13fe" />
      <div className="absolute inset-0 cyber-grid opacity-[0.05] -z-20" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 flex items-center gap-4">
          <span className="text-primary font-mono text-xl">02.</span> {t.title}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillCategories.map((cat, i) => (
            <motion.div
              key={cat.name}
              whileInView={{ opacity: 1, y: 0 }}
              initial={{ opacity: 0, y: 20 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass p-6 rounded-2xl border-force transition-all group bg-background/40 hover:bg-background/60"
              style={{ boxShadow: `0 0 20px ${cat.color}15` }}
            >
              <div 
                className="flex items-center gap-4 mb-4 group-hover:scale-110 transition-transform"
                style={{ color: cat.color }}
              >
                {cat.icon}
                <h3 className="text-xl font-bold text-foreground">{cat.name}</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {cat.skills.map(skill => (
                  <span key={skill} className="px-3 py-1 bg-primary-soft border-force text-primary text-xs rounded-full font-mono">
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
