"use client";

import { useLanguage } from "@/hooks/use-language";
import { translations } from "@/lib/translations";
import { motion } from "framer-motion";
import Image from "next/image";
import Section3D from "./Section3D";

export default function About() {
  const { lang } = useLanguage();
  const t = translations[lang].about;

  return (
    <section id="about" className="relative py-24 px-4 overflow-hidden">
      <Section3D type="torus" color="#00ffff" />
      {/* Background ambient glow */}
      <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-primary/5 blur-[100px] -z-10 rounded-full" />
      
      <div className="max-w-7xl mx-auto relative z-10 flex flex-col md:flex-row items-center gap-12">
        <motion.div
          whileInView={{ opacity: 1, x: 0 }}
          initial={{ opacity: 0, x: -50 }}
          viewport={{ once: true }}
          className="relative w-64 h-64 md:w-80 md:h-80"
        >
          <div className="absolute inset-0 border-2 border-primary rounded-2xl rotate-6 -z-10" />
          <div className="absolute inset-0 bg-primary/20 rounded-2xl -rotate-3 -z-10" />
          <Image
            src="/Santatra.webp"
            alt="Santatra"
            fill
            className="object-cover rounded-2xl border-2 border-primary/50 shadow-[0_0_30px_var(--primary-soft)]"
          />
        </motion.div>

        <motion.div
          whileInView={{ opacity: 1, x: 0 }}
          initial={{ opacity: 0, x: 50 }}
          viewport={{ once: true }}
          className="flex-1 glass p-8 md:p-12 rounded-3xl border-force relative"
        >
          <div className="absolute top-4 right-4 text-[10px] font-mono text-neon-purple opacity-40">0xPURPLE_AUTH</div>
          <h2 className="text-3xl md:text-4xl font-bold mb-6 flex items-center gap-4">
            <span className="text-primary font-mono text-xl">01.</span> {t.title} <span className="text-neon-purple">_</span>
          </h2>
          <p className="text-lg text-foreground/80 leading-relaxed mb-6">
            {t.description}
          </p>
          <div className="grid grid-cols-2 gap-4 text-sm font-mono text-primary/80">
            <div className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-neon-purple" /> TypeScript</div>
            <div className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-primary" /> React / Next.js</div>
            <div className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-neon-purple" /> Node.js</div>
            <div className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-primary" /> React Native</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
