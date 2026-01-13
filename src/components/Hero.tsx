"use client";

import { motion } from "framer-motion";
import { ArrowRight, Play } from "lucide-react";
import Link from "next/link";

interface HeroProps {
  titulo: string;
  subtitulo?: string;
  imagenFondo?: string;
  versiculo?: string;
  textoVersiculo?: string;
}

export default function Hero({
  titulo,
  subtitulo,
  imagenFondo,
  versiculo,
  textoVersiculo,
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
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight">
            {titulo}
          </h1>
          
          {subtitulo && (
            <p className="text-xl md:text-2xl lg:text-3xl mb-12 whitespace-nowrap mx-auto text-gray-200 font-light">
              {subtitulo}
            </p>
          )}

          {/* Botones de acción */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
          >
            <Link
              href="#predicas"
              className="group px-8 py-4 bg-white text-gray-900 font-semibold rounded-lg hover:bg-gray-100 transition-all hover:scale-105 flex items-center gap-2 shadow-lg"
            >
              Ver Prédicas
              <Play className="w-5 h-5 group-hover:scale-110 transition-transform" />
            </Link>
            <Link
              href="#eventos"
              className="group px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-lg hover:bg-white/20 transition-all border border-white/30"
            >
              Próximos Eventos
            </Link>
          </motion.div>

          {/* Versículo */}
          {versiculo && textoVersiculo && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="max-w-3xl mx-auto"
            >
              <div className="relative">
                <div className="absolute -left-4 top-0 text-6xl text-lcb-accent/30 font-serif">"</div>
                <blockquote className="text-lg md:text-xl italic bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
                  <p className="mb-4 leading-relaxed">{textoVersiculo}</p>
                  <footer className="text-base font-semibold text-lcb-accent">
                    — {versiculo}
                  </footer>
                </blockquote>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex items-start justify-center p-2">
          <motion.div
            className="w-1 h-3 bg-white rounded-full"
            animate={{ y: [0, 12, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
          />
        </div>
      </motion.div>
    </section>
  );
}
