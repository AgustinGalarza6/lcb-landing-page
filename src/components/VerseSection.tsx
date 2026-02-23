"use client";

import { motion } from "framer-motion";

interface VerseSectionProps {
  texto: string;
  referencia: string;
}

export default function VerseSection({
  texto = "Porque yo sé los planes que tengo para ustedes, planes de bienestar y no de calamidad, a fin de darles un futuro y una esperanza.",
  referencia = "Jeremías 29:11",
}: VerseSectionProps) {
  return (
    <section className="relative py-16 md:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Fondo sutil con gradiente */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-gray-50/30 to-white" />
      
      {/* Patrón atmosférico sutil */}
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)`,
          backgroundSize: '32px 32px',
        }}
      />

      {/* Contenido */}
      <div className="relative max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="text-center"
        >
          {/* Texto del versículo - elemento principal */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light leading-[1.15] tracking-tight text-gray-900 mb-8 md:mb-10"
            style={{ 
              fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
              fontWeight: 300,
              letterSpacing: '-0.02em'
            }}
          >
            "{texto}"
          </motion.p>

          {/* Línea divisoria sutil */}
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            whileInView={{ scaleX: 1, opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="h-px w-16 mx-auto bg-gradient-to-r from-transparent via-gray-300 to-transparent mb-6"
          />

          {/* Referencia - elemento secundario */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="text-sm md:text-base font-normal tracking-wider text-gray-500 uppercase"
            style={{ letterSpacing: '0.15em' }}
          >
            {referencia}
          </motion.p>
        </motion.div>
      </div>

      {/* Efecto de luz sutil en el fondo */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-lcb-primary/5 rounded-full blur-[120px] pointer-events-none" />
    </section>
  );
}
