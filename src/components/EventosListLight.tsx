"use client";

import { motion } from "framer-motion";
import { MapPin, Clock, ArrowRight, Calendar } from "lucide-react";
import Link from "next/link";

interface Evento {
  id: string | number;
  titulo: string;
  descripcion: string;
  fecha: string;
  hora?: string | null;
  lugar: string;
  tipoEvento: string;
  imagen?: {
    url: string;
    alt?: string;
  };
}

interface EventosListProps {
  eventos: Evento[];
  showAll?: boolean;
}

export default function EventosListLight({ eventos, showAll }: EventosListProps) {
  if (!eventos || eventos.length === 0) {
    return (
      <section id="eventos" className="py-24 bg-white">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-serif font-medium text-primary mb-4">Nuevas Experiencias Próximamente</h2>
            <p className="text-lg text-primary/60 font-light text-balance">Estamos preparando encuentros especiales para la comunidad.</p>
          </div>
        </div>
      </section>
    );
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return {
      day: date.toLocaleDateString("es-ES", { day: "2-digit" }),
      month: date.toLocaleDateString("es-ES", { month: "short" }).toUpperCase(),
      weekday: date.toLocaleDateString("es-ES", { weekday: "long" }),
    };
  };

  const featured = eventos[0];
  const rest = eventos.slice(1);

  return (
    <section id="eventos" className="py-24 bg-white">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        {!showAll && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row md:items-end md:justify-between mb-16 gap-6"
          >
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-px bg-white text-black" />
                <span className="text-primary text-xs uppercase tracking-[0.3em] font-medium">Comunidad</span>
              </div>
              <h2 className="text-5xl md:text-7xl font-serif text-primary tracking-tight leading-[0.9]">
                Eventos
              </h2>
            </div>
            <Link href="/eventos" className="group flex items-center gap-2 text-secondary/80 hover:text-primary text-sm font-medium transition-colors">
              Ver todos
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        )}

        {/* Featured Event */}
        {featured && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="mb-8"
          >
            <Link href={`/eventos/${featured.id}`} className="group block">
              <div className="relative rounded-none overflow-hidden bg-gray-50 border border-gray-100 backdrop-blur-sm">
                <div className="grid lg:grid-cols-2">
                  {/* Image */}
                  <div className="relative aspect-[4/3] lg:aspect-auto lg:min-h-[500px] overflow-hidden">
                    {featured.imagen ? (
                      <img
                        src={featured.imagen.url}
                        alt={featured.imagen.alt || featured.titulo}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-orange-900/40 to-[#1C1917]" />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent to-zinc-900 hidden lg:block" />
                    <div className="absolute top-6 left-6">
                      <span className="px-3 py-1 bg-black text-white text-xs font-bold uppercase tracking-wider rounded-none shadow-lg shadow-black/5">Próximo evento</span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-8 lg:p-12 flex flex-col justify-center">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="flex flex-col items-center justify-center w-16 h-16 bg-white rounded-2xl text-primary shadow-lg shadow-black/5">
                        <span className="text-2xl font-bold leading-none">{formatDate(featured.fecha).day}</span>
                        <span className="text-xs font-bold tracking-wider mt-0.5">{formatDate(featured.fecha).month}</span>
                      </div>
                      <div>
                        <p className="text-primary/60 text-sm capitalize">{formatDate(featured.fecha).weekday}</p>
                        {featured.hora && (
                          <p className="text-primary/90 text-sm flex items-center gap-1 mt-0.5">
                            <Clock className="w-3.5 h-3.5 text-primary" />
                            {featured.hora}
                          </p>
                        )}
                      </div>
                    </div>

                    <h3 className="text-3xl md:text-4xl font-serif font-medium text-primary mb-4 leading-tight group-hover:text-primary transition-colors duration-300">
                      {featured.titulo}
                    </h3>
                    <p className="text-primary/70 text-base leading-relaxed mb-6 font-light line-clamp-3">{featured.descripcion}</p>
                    <div className="flex items-center gap-2 text-primary/50 text-sm mb-8">
                      <MapPin className="w-4 h-4 text-primary" />
                      {featured.lugar}
                    </div>
                    <span className="inline-flex items-center gap-2 text-primary font-semibold text-sm group-hover:gap-3 transition-all">
                      Ver detalles <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        )}

        {/* Rest â€” compact dark list */}
        {rest.length > 0 && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
            {rest.map((evento, index) => {
              const d = formatDate(evento.fecha);
              return (
                <motion.article
                  key={evento.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.08, duration: 0.5 }}
                >
                  <Link
                    href={`/eventos/${evento.id}`}
                    className="group flex gap-5 p-5 rounded-none bg-gray-50 hover:bg-gray-100 border border-gray-100 hover:border-gray-200 transition-all duration-300"
                  >
                    <div className="flex-shrink-0 flex flex-col items-center justify-center w-14 h-14 rounded-none bg-gray-50 border border-gray-100">
                      <span className="text-lg font-bold text-primary leading-none">{d.day}</span>
                      <span className="text-[10px] font-bold text-primary tracking-wider">{d.month}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-primary font-serif font-medium leading-tight mb-1 line-clamp-2 group-hover:text-primary transition-colors text-lg">
                        {evento.titulo}
                      </h3>
                      <div className="flex items-center gap-1.5 text-primary/40 text-xs">
                        <MapPin className="w-3 h-3" /> <span className="truncate">{evento.lugar}</span>
                      </div>
                      {evento.hora && (
                        <div className="flex items-center gap-1.5 text-primary/40 text-xs mt-0.5">
                          <Clock className="w-3 h-3" /> {evento.hora}
                        </div>
                      )}
                    </div>
                    <ArrowRight className="w-4 h-4 text-primary/20 group-hover:text-primary flex-shrink-0 mt-1 transition-colors" />
                  </Link>
                </motion.article>
              );
            })}
          </div>
        )}

        {/* CTA */}
        {!showAll && (
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center">
            <Link
              href="/eventos"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-black font-medium tracking-wide rounded-none hover:bg-neutral-800 hover:text-white transition-all duration-500 hover:shadow-lg hover:shadow-black/5 text-sm"
            >
              Ver todos los eventos
              <Calendar className="w-4 h-4" />
            </Link>
          </motion.div>
        )}
      </div>
    </section>
  );
}