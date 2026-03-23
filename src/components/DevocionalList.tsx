"use client";

import { motion } from "framer-motion";
import { BookOpen, Calendar, User, ArrowRight } from "lucide-react";
import Link from "next/link";

interface Devocional {
  id: string | number;
  titulo: string;
  extracto?: string | null;
  autor: string;
  fecha: string;
  imagenPortada?: {
    url: string;
    alt?: string;
  };
  categoria: string;
}

interface DevocionalListProps {
  devocionales: Devocional[];
  showAll?: boolean;
}

export default function DevocionalList({ devocionales }: DevocionalListProps) {
  // Si no hay devocionales, mostrar mensaje
  if (!devocionales || devocionales.length === 0) {
    return (
      <section id="devocionales" className="py-24 bg-white">
        <div className="container">
          <div className="text-center">
            <h2 className="text-4xl md:text-5xl font-serif font-medium text-black mb-6 tracking-tight leading-[0.9]">
              Blog & Devocionales
            </h2>
            <p className="text-lg text-secondary font-light">
              Próximamente publicaremos contenido devocional.
            </p>
          </div>
        </div>
      </section>
    );
  }

  const getCategoriaIcon = (categoria: string) => {
    return "📖"; // Puedes personalizar por categoría
  };

  return (
    <section id="devocionales" className="py-24 bg-white">
      <div className="container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white shadow-sm rounded-full mb-4">
            <BookOpen className="w-5 h-5 text-black" />
            <span className="text-xs uppercase tracking-[0.2em] font-medium text-primary">Contenido Devocional</span>
          </div>
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-serif text-primary mb-6 leading-[0.9] tracking-tight">
            Blog & Devocionales
          </h2>
          <p className="text-lg md:text-xl text-secondary max-w-2xl mx-auto font-light text-balance">
            Pensamientos, enseñanzas y palabra para tu vida diaria.
          </p>
        </motion.div>

        {/* Grid de devocionales */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {devocionales.map((devocional, index) => (
            <motion.article
              key={devocional.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group"
            >
              <Link href={`/devocionales/${devocional.id}`}>
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-md transition-all duration-300 h-full flex flex-col md:flex-row">
                  {/* Imagen */}
                  {devocional.imagenPortada && (
                    <div className="md:w-2/5 h-64 md:h-auto overflow-hidden bg-gray-200 relative">
                      <img
                        src={devocional.imagenPortada.url}
                        alt={devocional.imagenPortada.alt || devocional.titulo}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                      
                      {/* Categoría flotante */}
                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-gray-900 rounded-full text-xs font-bold uppercase">
                          {devocional.categoria}
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Contenido */}
                  <div className="flex-1 p-8 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                        <div className="flex items-center gap-1">
                          <User className="w-4 h-4 text-primary" />
                          <span className="font-medium text-black">{devocional.autor}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4 text-secondary" />
                          <span>{new Date(devocional.fecha).toLocaleDateString('es-ES', { 
                            day: 'numeric',
                            month: 'long',
                            year: 'numeric'
                          })}</span>
                        </div>
                      </div>

                      <h3 className="text-3xl md:text-4xl font-serif font-medium leading-tight text-primary mb-3 group-hover:text-black transition-colors line-clamp-2">
                        {devocional.titulo}
                      </h3>

                      {devocional.extracto && (
                        <p className="text-secondary font-light mb-4 line-clamp-3">
                          {devocional.extracto}
                        </p>
                      )}
                    </div>

                    <div className="flex items-center gap-2 text-black font-semibold text-sm group-hover:gap-3 transition-all">
                      Leer más
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>

        {/* Ver todos button */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Link
            href="/devocionales"
            className="inline-flex items-center gap-2 px-8 py-4 bg-black text-white font-medium tracking-wide rounded-full shadow-sm hover:shadow-md transition-all duration-500 hover:bg-black-dark hover:scale-[1.02] text-sm"
          >
            Ver todos los devocionales
            <BookOpen className="w-4 h-4 ml-1" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
