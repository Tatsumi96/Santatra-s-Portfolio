"use client";

import { useLanguage } from "@/hooks/use-language";
import { translations } from "@/lib/translations";
import { motion } from "framer-motion";
import Image from "next/image";

export default function About() {
  const { lang } = useLanguage();
  const t = translations[lang].about;

  return (
    <section id="about" className="py-24 px-4 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row items-center gap-12">
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
            className="object-cover rounded-2xl border-2 border-primary/50 shadow-2xl"
          />
        </motion.div>

        <motion.div
          whileInView={{ opacity: 1, x: 0 }}
          initial={{ opacity: 0, x: 50 }}
          viewport={{ once: true }}
          className="flex-1"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6 flex items-center gap-4">
            <span className="text-primary font-mono text-xl">01.</span> {t.title}
          </h2>
          <p className="text-lg text-foreground/80 leading-relaxed mb-6">
            {t.description}
          </p>
          <div className="grid grid-cols-2 gap-4 text-sm font-mono text-primary">
            <div>▹ TypeScript</div>
            <div>▹ React / Next.js</div>
            <div>▹ Node.js</div>
            <div>▹ React Native</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
