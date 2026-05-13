"use client";

import { useLanguage } from "@/hooks/use-language";
import { translations } from "@/lib/translations";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { GithubIcon as Github } from "./icons/GithubIcon";
import Section3D from "./Section3D";

const projects = [
  {
    title: "ASJA-Website",
    desc: "Site web officiel de l'université ASJA",
    tech: ["TypeScript", "React", "Next.js"],
    github: "https://github.com/tatsumi96",
    color: "var(--neon-cyan)"
  },
  {
    title: "MadaAssist",
    desc: "Application mobile d'assistance - React Native",
    tech: ["React Native", "Expo"],
    github: "https://github.com/tatsumi96",
    color: "var(--neon-purple)"
  },
  {
    title: "yetsena",
    desc: "Site e-commerce moderne",
    tech: ["TypeScript", "TailwindCSS"],
    github: "https://github.com/tatsumi96",
    color: "#ec4899"
  },
  {
    title: "Taquin",
    desc: "Jeu de taquin classique avec interface moderne",
    tech: ["TypeScript", "CSS3"],
    github: "https://github.com/tatsumi96",
    color: "var(--neon-cyan)"
  },
];

export default function Projects() {
  const { lang } = useLanguage();
  const t = translations[lang].projects;

  return (
    <section id="projects" className="relative py-24 px-4 overflow-hidden">
      <Section3D type="box" color="#00ffff" />
      <div className="absolute inset-0 cyber-grid opacity-[0.05] -z-20" />

      <div className="max-w-7xl mx-auto relative z-10">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 flex items-center gap-4">
          <span className="text-primary font-mono text-xl">03.</span> {t.title}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, i) => (
            <motion.div
              key={project.title}
              whileInView={{ opacity: 1, y: 0 }}
              initial={{ opacity: 0, y: 20 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -10 }}
              className="group relative p-8 rounded-2xl glass border-force transition-all overflow-hidden bg-background/40 hover:bg-background/60"
              style={{ boxShadow: `0 0 30px ${project.color}15` }}
            >
              {/* Background Glow Effect */}
              <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500"
                style={{ background: `radial-gradient(circle at center, ${project.color}, transparent)` }}
              />
              
              <div className="relative z-10">
                <div className="flex justify-between items-start mb-6">
                  <div 
                    className="group-hover:scale-110 group-hover:rotate-12 transition-transform duration-300"
                    style={{ color: project.color }}
                  >
                    <Github size={40} />
                  </div>
                  <div className="flex gap-4">
                    <a 
                      href={project.github} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="p-2 rounded-full border-force text-primary opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0"
                    >
                      <ExternalLink size={20} />
                    </a>
                  </div>
                </div>
                
                <h3 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors duration-300 flex items-center gap-2">
                  {project.title}
                  <span className="w-0 h-[2px] bg-primary group-hover:w-full transition-all duration-500" />
                </h3>
                
                <p className="text-foreground/70 mb-8 line-clamp-2 group-hover:text-foreground transition-colors">
                  {project.desc}
                </p>
                
                <div className="flex flex-wrap gap-3 font-mono text-[10px] uppercase tracking-wider text-primary/60">
                  {project.tech.map(tag => (
                    <span 
                      key={tag} 
                      className="px-2 py-1 rounded border-force bg-primary/5 group-hover:bg-primary/10 transition-colors"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Corner Decorative Element */}
              <div 
                className="absolute top-0 right-0 w-16 h-16 opacity-20 -rotate-45 translate-x-8 -translate-y-8 group-hover:translate-x-6 group-hover:-translate-y-6 transition-transform"
                style={{ backgroundColor: project.color }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
