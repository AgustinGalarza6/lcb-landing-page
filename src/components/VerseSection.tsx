"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

interface VerseSectionProps {
  texto: string;
  referencia: string;
}

export default function VerseSection({
  texto = "Porque yo sé los planes que tengo para ustedes, planes de bienestar y no de calamidad, a fin de darles un futuro y una esperanza.",
  referencia = "Jeremías 29:11",
}: VerseSectionProps) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const x = useTransform(scrollYProgress, [0, 1], ["-5%", "5%"]);

  return (
    <section ref={ref} className="relative py-28 md:py-40 bg-primary overflow-hidden">
      {/* Scrolling background text */}
      <motion.div
        className="absolute inset-0 flex items-center overflow-hidden pointer-events-none select-none"
        style={{ x }}
      >
        <p
          className="text-[18vw] font-serif font-bold text-white/[0.02] whitespace-nowrap leading-none tracking-tight uppercase"
          aria-hidden
        >
          FE • ESPERANZA • AMOR •
        </p>
      </motion.div>

      {/* Orange glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-black/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Content */}
      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Decorative line */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="w-12 h-0.5 bg-white mx-auto mb-10 origin-center"
        />

        {/* Quote mark */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-[120px] leading-none font-serif text-white/20 select-none -mb-8"
          aria-hidden
        >
          "
        </motion.div>

        {/* Verse text */}
        <motion.p
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1.1, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-light leading-[1.4] tracking-tight text-white mb-10 text-balance"
          style={{ fontWeight: 300 }}
        >
          {texto}
        </motion.p>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          whileInView={{ scaleX: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="h-px w-20 mx-auto bg-white/50 mb-6"
        />

        {/* Reference */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.55 }}
          className="text-white/80 text-xs font-medium tracking-[0.3em] uppercase"
        >
          {referencia}
        </motion.p>
      </div>
    </section>
  );
}
