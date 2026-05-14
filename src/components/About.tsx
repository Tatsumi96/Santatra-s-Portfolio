'use client';

import { useLanguage } from '@/hooks/use-language';
import { translations } from '@/lib/translations';
import { motion } from 'framer-motion';
import Image from 'next/image';

export default function About() {
  const { lang } = useLanguage();
  const t = translations[lang].about;

  return (
    <section
      id="about"
      className="relative py-32 px-6 md:px-24 border-t border-border-color"
    >
      <div className="max-w-screen-2xl w-full mx-auto grid grid-cols-1 md:grid-cols-12 gap-16">
        {/* Decorative Grid Marker */}
        <div className="md:col-span-1 hidden md:block">
          <span className="text-meta rotate-90 block origin-left mt-8">
            {t.subtitle}
          </span>
        </div>

        <div className="md:col-span-5 relative saturate-100 lg:saturate-0 hover:saturate-100 transition-all duration-1000">
          <motion.div
            whileInView={{ opacity: 1, filter: 'grayscale(0%)' }}
            initial={{ opacity: 0, filter: 'grayscale(100%)' }}
            viewport={{ once: true }}
            className="aspect-[4/5] relative overflow-hidden grayscale hover:grayscale-0 transition-all duration-1000"
          >
            <Image
              src="/Santatra.jpeg"
              alt="Santatra"
              sizes="50"
              fill
              className="object-cover scale-110 hover:scale-100 transition-transform duration-1000"
            />
            {/* Technical overlays */}
            <div className="absolute inset-0 border border-primary/20 m-4 pointer-events-none" />
            <div className="absolute top-0 right-0 p-6 text-meta text-background mix-blend-difference">
              COORD_0432.99
            </div>
          </motion.div>
        </div>

        <motion.div
          whileInView={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 40 }}
          viewport={{ once: true }}
          className="md:col-span-6 flex flex-col justify-center"
        >
          <h2 className="text-meta mb-8 text-primary">01 // {t.title}</h2>
          <p className="text-2xl md:text-4xl font-light leading-relaxed mb-12">
            {t.description}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-border-color border border-border-color">
            {[
              { label: 'Core_System', val: 'TypeScript / Next.js' },
              { label: 'Architecture', val: 'React / Node.js' },
              { label: 'Interface', val: 'React Native / Mobile' },
              { label: 'Tooling', val: 'Git / Docker / AI' },
            ].map(item => (
              <div key={item.label} className="bg-background p-6">
                <span className="text-[10px] font-mono opacity-30 block mb-2 uppercase">
                  {item.label}
                </span>
                <span className="text-sm font-bold uppercase tracking-wider">
                  {item.val}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
