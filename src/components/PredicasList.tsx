"use client";

import { motion } from "framer-motion";
import { Play, ArrowUpRight, ArrowRight } from "lucide-react";
import Link from "next/link";

interface Predica {
  id: string | number;
  titulo: string;
  descripcion?: string | null;
  youtubeVideoId: string;
  predicador: string;
  fecha: string;
  versiculo?: string | null;
  miniatura?: { url?: string | null } | string | null;
}

interface PredicasListProps {
  predicas: Predica[];
  showAll?: boolean;
}

export default function PredicasList({ predicas }: PredicasListProps) {
  if (!predicas || predicas.length === 0) {
    return (
      <section id="predicas" className="py-20 bg-white">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-black mb-4">Nuevos Mensajes Próximamente</h2>
            <p className="text-lg text-secondary font-light text-balance">Estamos preparando contenido que inspire y transforme vidas.</p>
          </div>
        </div>
      </section>
    );
  }

  const extractVideoId = (v: string) => {
    if (v.includes("youtube.com") || v.includes("youtu.be")) {
      const p = new URLSearchParams(v.split("?")[1]);
      return p.get("v") || v.split("/").pop() || v;
    }
    return v;
  };

  const getThumbnail = (predica: Predica) => {
    if (predica.miniatura) {
      if (typeof predica.miniatura === "string") return predica.miniatura;
      if (predica.miniatura.url) return predica.miniatura.url;
    }
    return `https://img.youtube.com/vi/${extractVideoId(predica.youtubeVideoId)}/maxresdefault.jpg`;
  };

  const featured = predicas[0];
  const rest = predicas.slice(1, 5);

  return (
    <section id="predicas" className="py-24 bg-white">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row md:items-end md:justify-between mb-16 gap-6"
        >
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-px bg-primary" />
              <span className="text-primary text-xs uppercase tracking-[0.3em] font-medium">Mensajes que Transforman</span>
            </div>
            <h2 className="text-5xl md:text-7xl font-serif text-primary tracking-tight leading-[0.9]">
              Prédicas
            </h2>
          </div>
          <Link
            href="/predicas"
            className="group flex items-center gap-2 text-secondary hover:text-black text-sm font-medium transition-colors"
          >
            Ver todas
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>

        {/* Featured + Grid layout */}
        <div className="grid lg:grid-cols-2 gap-6 mb-6">
          {/* Featured predica */}
          <motion.a
            href={`https://www.youtube.com/watch?v=${extractVideoId(featured.youtubeVideoId)}`}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="group relative rounded-2xl overflow-hidden bg-primary block shadow-2xl shadow-black/5"
          >
            <div className="relative aspect-[16/10]">
              <img
                src={getThumbnail(featured)}
                alt={featured.titulo}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className="w-16 h-16 rounded-full bg-primary flex items-center justify-center shadow-xl shadow-black/50 box-border border-4 border-black/10"
                >
                  <Play className="w-6 h-6 fill-white text-white ml-0.5" />
                </motion.div>
              </div>
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
              <span className="inline-block px-3 py-1 bg-black text-white text-[10px] font-bold uppercase tracking-wider rounded-full mb-3">
                Prédica destacada
              </span>
              <h3 className="text-3xl md:text-4xl font-serif font-medium text-white leading-tight mb-2">{featured.titulo}</h3>
              <p className="text-white/60 text-sm">
                {featured.predicador} â€¢{" "}
                {new Date(featured.fecha).toLocaleDateString("es-ES", { day: "numeric", month: "long", year: "numeric" })}
              </p>
            </div>
          </motion.a>

          {/* Rest list */}
          <div className="flex flex-col gap-6">
            {rest.map((predica, index) => (
              <motion.a
                key={predica.id}
                href={`https://www.youtube.com/watch?v=${extractVideoId(predica.youtubeVideoId)}`}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                className="group flex gap-4 p-4 rounded-xl bg-white hover:bg-gray-50 border border-gray-100 shadow-sm hover:shadow-md hover:border-black/30 transition-all duration-300"
              >
                <div className="relative w-32 h-20 flex-shrink-0 rounded-lg overflow-hidden bg-gray-100">
                  <img
                    src={getThumbnail(predica)}
                    alt={predica.titulo}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-primary/40 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Play className="w-5 h-5 fill-white text-white" />
                  </div>
                </div>
                <div className="flex-1 min-w-0 flex flex-col justify-center">
                  <h3 className="text-primary font-serif font-medium text-lg leading-tight mb-1 line-clamp-2 group-hover:text-black transition-colors">
                    {predica.titulo}
                  </h3>
                  <div className="flex items-center gap-2">
                    <p className="text-secondary text-xs">{predica.predicador}</p>
                    <span className="text-gray-300">â€¢</span>
                    <p className="text-secondary/70 text-xs text-nowrap">
                      {new Date(predica.fecha).toLocaleDateString("es-ES", { day: "numeric", month: "short", year: "numeric" })}
                    </p>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-gray-300 group-hover:text-black flex-shrink-0 mt-2 transition-colors" />
              </motion.a>
            ))}
          </div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center pt-8"
        >
          <Link
            href="/predicas"
            className="inline-flex items-center gap-3 px-8 py-4 bg-black text-white font-medium tracking-wide rounded-full hover:bg-black-dark transition-all duration-500 hover:shadow-lg hover:shadow-black/20 text-sm"
          >
            Explorar todos los mensajes
            <span className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
              <Play className="w-3 h-3 fill-white ml-0.5" />
            </span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
