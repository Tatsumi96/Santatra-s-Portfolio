"use client";

import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import { motion, useScroll, useSpring } from "framer-motion";

export default function Home() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <main className="relative">
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-primary z-[60] origin-left"
        style={{ scaleX }}
      />
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Contact />
      
      <footer className="py-8 text-center text-foreground/50 text-sm font-mono border-t border-primary/10">
        <p>© 2026 // ANDRIANIRINA FEHIZORO SANTATRA FITIAVANA</p>
        <p className="mt-2 uppercase tracking-widest text-[10px]">Madagascar • Tech Portfolio</p>
      </footer>
    </main>
  );
}
