"use client";

import { motion } from "framer-motion";
import { Play, Calendar, User, Book } from "lucide-react";
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
      <div className="container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-full mb-4">
            <Book className="w-5 h-5 text-gray-900" />
            <span className="text-sm font-semibold text-gray-900">Palabra de Dios</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Últimas Prédicas
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
            Alimenta tu espíritu con mensajes que transforman vidas
          </p>
        </motion.div>

        {/* Grid de prédicas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {predicas.map((predica, index) => (
            <motion.div
              key={predica.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300"
            >
              <a 
                href={`https://www.youtube.com/watch?v=${extractVideoId(predica.youtubeVideoId)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                {/* Thumbnail con overlay */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={getThumbnail(predica)}
                    alt={predica.titulo}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  {/* Play button */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-14 h-14 bg-red-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg">
                      <Play className="w-6 h-6 text-white fill-white ml-0.5" />
                    </div>
                  </div>

                  {/* Versículo badge */}
                  {predica.versiculo && (
                    <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm text-gray-900 px-2.5 py-1 rounded-md text-xs font-semibold shadow-md">
                      {predica.versiculo}
                    </div>
                  )}
                </div>

                {/* Contenido del card */}
                <div className="p-6">
                  {/* Título */}
                  <h3 className="text-xl font-bold text-gray-800 mb-2 line-clamp-2 min-h-[3.5rem] group-hover:text-gray-600 transition-colors">
                    {predica.titulo}
                  </h3>

                  {/* Descripción */}
                  {predica.descripcion && (
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2 min-h-[2.5rem]">
                      {predica.descripcion}
                    </p>
                  )}

                  {/* Separador */}
                  <div className="border-t border-gray-200 my-4"></div>

                  {/* Footer del card */}
                  <div className="flex items-center justify-between">
                    {/* Predicador con icono */}
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center">
                        <User className="w-3 h-3 text-gray-600" />
                      </div>
                      <span className="text-sm font-medium text-gray-700">
                        {predica.predicador}
                      </span>
                    </div>

                    {/* Fecha */}
                    <span className="text-sm font-bold text-gray-900">
                      {new Date(predica.fecha).toLocaleDateString('es-ES', {
                        day: 'numeric',
                        month: 'short'
                      })}
                    </span>
                  </div>
                </div>
              </a>
            </motion.div>
          ))}
        </div>

        {/* Ver todas button */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Link
            href="/predicas"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gray-900 text-white font-semibold rounded-lg hover:bg-gray-800 transition-all hover:scale-105 shadow-lg"
          >
            Ver todas las prédicas
            <Play className="w-5 h-5" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
