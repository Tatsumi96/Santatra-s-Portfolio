"use client";

import { useLanguage } from "@/hooks/use-language";
import { translations } from "@/lib/translations";
import { motion } from "framer-motion";
import { 
  Code2, Layout, Smartphone, Server, Database, Cpu
} from "lucide-react";

const skillCategories = [
  { name: "Languages", skills: ["TypeScript", "JavaScript", "PHP", "HTML5", "CSS3"], icon: <Code2 /> },
  { name: "Frontend", skills: ["React.js", "Next.js", "TailwindCSS", "Vite"], icon: <Layout /> },
  { name: "Mobile", skills: ["React Native"], icon: <Smartphone /> },
  { name: "Backend", skills: ["Node.js", "Express.js", "Laravel"], icon: <Server /> },
  { name: "Database", skills: ["PostgreSQL", "MySQL"], icon: <Database /> },
  { name: "Tools & AI", skills: ["Docker", "Git", "Claude AI", "Gemini CLI"], icon: <Cpu /> },
];

export default function Skills() {
  const { lang } = useLanguage();
  const t = translations[lang].skills;

  return (
    <section id="skills" className="py-24 px-4 bg-primary/5">
      <div className="max-w-7xl mx-auto">
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
              className="p-6 rounded-2xl border border-primary/20 bg-background/50 backdrop-blur-sm hover:border-primary/50 transition-colors group"
            >
              <div className="flex items-center gap-4 mb-4 text-primary group-hover:scale-110 transition-transform">
                {cat.icon}
                <h3 className="text-xl font-bold text-foreground">{cat.name}</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {cat.skills.map(skill => (
                  <span key={skill} className="px-3 py-1 bg-primary/10 text-primary text-xs rounded-full font-mono">
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
