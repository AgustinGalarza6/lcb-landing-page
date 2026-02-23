"use client";

import { motion } from "framer-motion";
import { Play } from "lucide-react";
import Link from "next/link";

interface Predica {
  id: string | number;
  titulo: string;
  descripcion?: string | null;
  youtubeVideoId: string;
  predicador: string;
  fecha: string;
  versiculo?: string | null;
  miniatura?: {
    url?: string | null;
  } | string | null;
}

interface PredicasListProps {
  predicas: Predica[];
  showAll?: boolean;
}

export default function PredicasList({ predicas }: PredicasListProps) {
  // Si no hay predicas, mostrar mensaje
  if (!predicas || predicas.length === 0) {
    return (
      <section id="predicas" className="py-20 bg-white">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Nuevos Mensajes Próximamente
            </h2>
            <p className="text-lg text-gray-500 font-light">
              Estamos preparando contenido que inspire y transforme vidas.
            </p>
          </div>
        </div>
      </section>
    );
  }

  const extractVideoId = (videoIdOrUrl: string): string => {
    // Si es una URL completa de YouTube, extraer el ID
    if (videoIdOrUrl.includes('youtube.com') || videoIdOrUrl.includes('youtu.be')) {
      const urlParams = new URLSearchParams(videoIdOrUrl.split('?')[1]);
      return urlParams.get('v') || videoIdOrUrl.split('/').pop() || videoIdOrUrl;
    }
    // Si ya es solo el ID, devolverlo
    return videoIdOrUrl;
  };

  const getThumbnail = (predica: Predica) => {
    // Si hay miniatura personalizada, usarla
    if (predica.miniatura) {
      if (typeof predica.miniatura === 'string') {
        return predica.miniatura;
      }
      if (predica.miniatura.url) {
        return predica.miniatura.url;
      }
    }
    // Si no, usar miniatura de YouTube
    const videoId = extractVideoId(predica.youtubeVideoId);
    return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
  };

  return (
    <section id="predicas" className="py-24 bg-white">
      <div className="container max-w-[1400px]">
        {/* Header - Clean & Minimal */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-1 h-8 bg-lcb-accent rounded-full" />
            <span className="text-xs uppercase tracking-[0.25em] font-semibold text-gray-500">
              Mensajes que Transforman
            </span>
          </div>
          <h2 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 tracking-tight leading-[0.95]">
            Prédicas
          </h2>
          <p className="text-xl md:text-2xl text-gray-600 max-w-3xl font-light leading-relaxed">
            Conversaciones honestas sobre fe, propósito y cómo vivir una vida con sentido.
          </p>
        </motion.div>

        {/* Grid de prédicas - 3 columnas premium editorial */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-14 mb-20">
          {predicas.map((predica, index) => (
            <motion.article
              key={predica.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className="group bg-white"
            >
              <a 
                href={`https://www.youtube.com/watch?v=${extractVideoId(predica.youtubeVideoId)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                {/* Thumbnail - Large & Dominant */}
                <div className="relative aspect-[4/3] overflow-hidden rounded-lg mb-8 bg-gray-100">
                  <img
                    src={getThumbnail(predica)}
                    alt={predica.titulo}
                    className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700 ease-out"
                  />
                  
                  {/* Subtle dark overlay on hover only */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-500" />
                  
                  {/* Minimalist play indicator - subtle */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-400">
                    <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-2xl">
                      <Play className="w-7 h-7 text-gray-900 fill-gray-900 ml-0.5" />
                    </div>
                  </div>
                </div>

                {/* Content - Editorial Typography Hierarchy */}
                <div className="space-y-4">
                  {/* Metadata line - Small & Subtle */}
                  <div className="flex items-center gap-3 text-xs text-gray-400">
                    <time className="font-normal">
                      {new Date(predica.fecha).toLocaleDateString('es-ES', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric'
                      })}
                    </time>
                    {predica.versiculo && (
                      <>
                        <span className="w-1 h-1 rounded-full bg-gray-300" />
                        <span className="font-normal">{predica.versiculo}</span>
                      </>
                    )}
                  </div>

                  {/* Title - Large, Prominent, Editorial */}
                  <h3 className="text-2xl md:text-3xl font-bold text-gray-900 leading-[1.15] tracking-tight group-hover:text-gray-700 transition-colors duration-300 min-h-[2.5rem]">
                    {predica.titulo}
                  </h3>

                  {/* Description - Supporting Text */}
                  {predica.descripcion && (
                    <p className="text-base text-gray-500 leading-relaxed line-clamp-2 font-light">
                      {predica.descripcion}
                    </p>
                  )}

                  {/* Attribution - Clean Source Line */}
                  <div className="flex items-center gap-3 pt-3">
                    <div className="w-11 h-11 rounded-full bg-gray-900 flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-sm font-semibold">
                        {predica.predicador.split(' ').map(n => n[0]).join('').slice(0, 2)}
                      </span>
                    </div>
                    <p className="text-sm font-semibold text-gray-900">
                      {predica.predicador}
                    </p>
                  </div>
                </div>
              </a>
            </motion.article>
          ))}
        </div>

        {/* CTA - Clean & Simple */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center pt-4"
        >
          <Link
            href="/predicas"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gray-900 text-white font-semibold rounded-xl hover:bg-gray-800 transition-all duration-300 hover:gap-3 text-base"
          >
            Explorar todos los mensajes
            <Play className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
