"use client";

import { motion } from "framer-motion";
import { ArrowRight, Play } from "lucide-react";
import Link from "next/link";

interface HeroProps {
  titulo: string;
  subtitulo?: string;
  imagenFondo?: string;
}

export default function Hero({
  titulo,
  subtitulo,
  imagenFondo,
}: HeroProps) {
  return (
    <section id="inicio" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Imagen de fondo con overlay */}
      <div className="absolute inset-0 z-0">
        {imagenFondo ? (
          <>
            <img
              src={imagenFondo}
              alt="Hero background"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/80" />
          </>
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-gray-900 via-gray-800 to-black" />
        )}
        
        {/* Patrón de fondo animado */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 -left-4 w-72 h-72 bg-gray-400 rounded-full mix-blend-multiply filter blur-xl animate-blob" />
          <div className="absolute top-0 -right-4 w-72 h-72 bg-gray-500 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000" />
          <div className="absolute -bottom-8 left-20 w-72 h-72 bg-gray-600 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000" />
        </div>
      </div>

      {/* Contenido */}
      <div className="container relative z-10 text-center text-white px-4 pt-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-5xl mx-auto"
        >
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 leading-[1.1]">
            {titulo}
          </h1>
          
          {subtitulo && (
            <p className="text-xl md:text-2xl lg:text-3xl mb-16 mx-auto text-gray-200 font-light max-w-4xl leading-relaxed">
              {subtitulo}
            </p>
          )}

          {/* Botones de acción */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-20"
          >
            <Link
              href="#sedes"
              className="group px-8 py-4 bg-white text-gray-900 font-semibold rounded-lg hover:bg-gray-100 transition-all hover:scale-105 flex items-center gap-2 shadow-lg"
            >
              Cómo llegar
            </Link>
            <Link
              href="#predicas"
              className="group px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-lg hover:bg-white/20 transition-all border border-white/30 flex items-center gap-2"
            >
              Explorar Mensajes
              <Play className="w-5 h-5 group-hover:scale-110 transition-transform" />
            </Link>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.5 }}
        className="absolute bottom-8 inset-x-0 z-20 flex justify-center"
      >
        <Link
          href="#predicas"
          className="flex flex-col items-center text-white/60 hover:text-white transition-colors group"
        >
          <span className="text-sm font-medium pb-2 block text-center">Explorar</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="flex justify-center"
          >
            <svg
              className="w-7 h-12"
              viewBox="0 0 24 40"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
            >
              <rect x="4" y="1" width="16" height="26" rx="8" />
              <motion.line
                x1="12"
                y1="8"
                x2="12"
                y2="14"
                strokeLinecap="round"
                animate={{ y1: [8, 12, 8], y2: [14, 18, 14] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
            </svg>
          </motion.div>
        </Link>
      </motion.div>
    </section>
  );
}
