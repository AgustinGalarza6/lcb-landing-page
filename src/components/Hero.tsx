"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import { Play, ChevronDown } from "lucide-react";

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  const stats = [
    { value: "+20", label: "Años de ministerio" },
    { value: "+15", label: "Sedes activas" },
    { value: "Miles", label: "De familias" },
  ];

  return (
    <section ref={ref} id="inicio" className="relative min-h-screen flex items-end overflow-hidden bg-[#1C1917]">
      {/* Parallax background */}
      <motion.div className="absolute inset-0 z-0" style={{ y }}>
        <img
          src="/media/background/hero-nuevo.jpg"
          alt="Hero background"
          className="w-full h-full object-cover scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/30 to-black/90" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent" />
      </motion.div>

      {/* Main content */}
      <motion.div
        className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-40 pt-32"
        style={{ opacity }}
      >
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="flex items-center gap-3 mb-6"
        >
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="h-[2px] w-12 bg-white text-black origin-left"
          />
          <span className="text-white text-xs uppercase tracking-[0.4em] font-bold">
            Bienvenidos a
          </span>
        </motion.div>

        {/* Title */}
        <div className="overflow-hidden mb-8 max-w-5xl">
          {["La Casa", "de la", "Bendición"].map((word, i) => (
            <motion.h1
              key={i}
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1, delay: 0.4 + i * 0.15, ease: [0.16, 1, 0.3, 1] }}
              className={`block leading-[0.9] tracking-tight font-serif ${
                i === 1
                  ? "text-white text-6xl sm:text-7xl md:text-8xl lg:text-9xl italic pr-4"
                  : "text-white text-7xl sm:text-8xl md:text-9xl lg:text-[10rem]"
              }`}
            >
              {word}
            </motion.h1>
          ))}
        </div>

        {/* Tagline + CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.9 }}
          className="flex flex-col md:flex-row items-start md:items-end gap-8 md:gap-16"
        >
          <p className="text-lg md:text-xl text-white/80 max-w-md font-light leading-relaxed text-balance">
            Una comunidad de fe donde encontrarás esperanza, propósito y familia.
          </p>
          <div className="flex flex-wrap gap-4 shrink-0">
            <Link
              href="#contacto"
              className="flex items-center justify-center h-[68px] px-8 bg-white text-black font-bold uppercase tracking-widest rounded-none hover:bg-white text-black-dark transition-all duration-500 hover:shadow-xl hover:shadow-white/20 text-xs"
            >
              Planificá tu visita
            </Link>
            <Link
              href="#predicas"
              className="flex items-center justify-center gap-3 h-[68px] px-8 border-2 border-white text-white font-bold uppercase tracking-widest rounded-none hover:bg-white hover:text-primary transition-all duration-500 text-xs group"
            >
              <span className="w-8 h-8 rounded-none bg-white/10 flex items-center justify-center group-hover:bg-primary/10">
                <Play className="w-3 h-3 fill-current ml-0.5" />
              </span>
              Ver prédicas
            </Link>
          </div>
        </motion.div>
      </motion.div>

      {/* Stats bar */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 1.2 }}
        className="absolute bottom-0 left-0 right-0 z-20"
      >
        <div className="bg-black/40 backdrop-blur-2xl border-t border-white/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-3 divide-x divide-white/5">
              {stats.map((stat, i) => (
                <div key={i} className="py-8 px-6 text-center flex flex-col items-center justify-center gap-2">
                  <p className="text-3xl md:text-4xl font-serif text-white/90">{stat.value}</p>
                  <p className="text-[10px] text-white/40 uppercase tracking-[0.2em] font-medium">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
        className="absolute bottom-24 right-8 z-20 hidden lg:flex flex-col items-center gap-2"
      >
        <span className="text-[10px] text-white/30 uppercase tracking-widest rotate-90 mb-2">scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
        >
          <ChevronDown className="w-4 h-4 text-white/30" />
        </motion.div>
      </motion.div>
    </section>
  );
}
