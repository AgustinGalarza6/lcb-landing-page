"use client";

import { motion } from "framer-motion";
import { MapPin, Clock, ArrowRight } from "lucide-react";
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

export default function EventosList({ eventos }: EventosListProps) {
  // Si no hay eventos, mostrar mensaje
  if (!eventos || eventos.length === 0) {
    return (
      <section id="eventos" className="py-24 bg-gray-50">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Nuevas Experiencias Próximamente
            </h2>
            <p className="text-lg text-gray-500 font-light">
              Estamos preparando encuentros especiales para la comunidad.
            </p>
          </div>
        </div>
      </section>
    );
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return {
      day: date.toLocaleDateString('es-ES', { day: '2-digit' }),
      month: date.toLocaleDateString('es-ES', { month: 'short' }).toUpperCase(),
      weekday: date.toLocaleDateString('es-ES', { weekday: 'short' }),
      full: date.toLocaleDateString('es-ES', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      })
    };
  };

  const featuredEvent = eventos[0];
  const otherEvents = eventos.slice(1);

  return (
    <section id="eventos" className="py-24 bg-gray-50">
      <div className="container max-w-[1400px]">
        {/* Header - Editorial Style */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-1 h-8 bg-lcb-accent rounded-full" />
            <span className="text-xs uppercase tracking-[0.25em] font-semibold text-gray-500">
              Experiencias Comunitarias
            </span>
          </div>
          <h2 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 tracking-tight leading-[0.95]">
            Eventos
          </h2>
          <p className="text-xl md:text-2xl text-gray-600 max-w-3xl font-light leading-relaxed">
            Momentos especiales para conectar, crecer y celebrar juntos como comunidad.
          </p>
        </motion.div>

        {/* Featured Event - Visually Dominant */}
        {featuredEvent && (
          <motion.article
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="mb-20"
          >
            <Link
              href={`/eventos/${featuredEvent.id}`}
              className="group block"
            >
              <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
                {/* Image - Large & Dominant */}
                <div className="relative aspect-[4/3] lg:aspect-[3/2] overflow-hidden rounded-2xl bg-gray-200">
                  {featuredEvent.imagen ? (
                    <img
                      src={featuredEvent.imagen.url}
                      alt={featuredEvent.imagen.alt || featuredEvent.titulo}
                      className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-700 ease-out"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-gray-300 to-gray-200" />
                  )}
                  
                  {/* Subtle overlay on hover */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-500" />
                </div>

                {/* Content */}
                <div className="space-y-6">
                  {/* Date Badge - Prominent */}
                  <div className="inline-flex items-center gap-4">
                    <div className="flex flex-col items-center justify-center w-16 h-16 bg-gray-900 rounded-xl text-white">
                      <span className="text-2xl font-bold leading-none">
                        {formatDate(featuredEvent.fecha).day}
                      </span>
                      <span className="text-xs font-semibold tracking-wider mt-1">
                        {formatDate(featuredEvent.fecha).month}
                      </span>
                    </div>
                    <div className="text-sm text-gray-500">
                      <p className="font-medium capitalize">{featuredEvent.tipoEvento}</p>
                      {featuredEvent.hora && (
                        <p className="flex items-center gap-1.5 mt-1">
                          <Clock className="w-3.5 h-3.5" />
                          {featuredEvent.hora}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Title - Large & Bold */}
                  <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight tracking-tight group-hover:text-gray-700 transition-colors duration-300">
                    {featuredEvent.titulo}
                  </h3>

                  {/* Description */}
                  <p className="text-lg text-gray-600 leading-relaxed font-light">
                    {featuredEvent.descripcion}
                  </p>

                  {/* Location */}
                  <div className="flex items-start gap-2 text-gray-500">
                    <MapPin className="w-5 h-5 flex-shrink-0 mt-0.5" />
                    <span className="text-base font-medium">{featuredEvent.lugar}</span>
                  </div>

                  {/* CTA */}
                  <div className="pt-4">
                    <span className="inline-flex items-center gap-2 text-gray-900 font-semibold group-hover:gap-3 transition-all duration-300">
                      Más información
                      <ArrowRight className="w-5 h-5" />
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          </motion.article>
        )}

        {/* Other Events - Premium Grid */}
        {otherEvents.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-14 mb-20">
            {otherEvents.map((evento, index) => {
              const dateInfo = formatDate(evento.fecha);
              
              return (
                <motion.article
                  key={evento.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  className="group bg-gray-50"
                >
                  <Link
                    href={`/eventos/${evento.id}`}
                    className="block"
                  >
                    {/* Thumbnail - Image Dominant */}
                    <div className="relative aspect-[4/3] overflow-hidden rounded-lg mb-6 bg-gray-200">
                      {evento.imagen ? (
                        <img
                          src={evento.imagen.url}
                          alt={evento.imagen.alt || evento.titulo}
                          className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700 ease-out"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-gray-300 to-gray-200" />
                      )}
                      
                      {/* Hover overlay */}
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-500" />
                      
                      {/* Date Badge on Image */}
                      <div className="absolute top-4 left-4 flex flex-col items-center justify-center w-14 h-14 bg-white rounded-lg shadow-md">
                        <span className="text-xl font-bold leading-none text-gray-900">
                          {dateInfo.day}
                        </span>
                        <span className="text-[10px] font-semibold tracking-wider text-gray-600 mt-0.5">
                          {dateInfo.month}
                        </span>
                      </div>
                    </div>

                    {/* Content - Editorial Typography */}
                    <div className="space-y-3">
                      {/* Metadata - Subtle */}
                      <div className="flex items-center gap-3 text-xs text-gray-400">
                        <span className="font-normal capitalize">{evento.tipoEvento}</span>
                        {evento.hora && (
                          <>
                            <span className="w-1 h-1 rounded-full bg-gray-300" />
                            <span className="font-normal flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {evento.hora}
                            </span>
                          </>
                        )}
                      </div>

                      {/* Title - Prominent */}
                      <h3 className="text-2xl font-bold text-gray-900 leading-tight tracking-tight group-hover:text-gray-700 transition-colors duration-300 min-h-[2.5rem]">
                        {evento.titulo}
                      </h3>

                      {/* Description - Light */}
                      <p className="text-base text-gray-500 leading-relaxed line-clamp-2 font-light">
                        {evento.descripcion}
                      </p>

                      {/* Location - Clean */}
                      <div className="flex items-start gap-2 text-gray-500 pt-2">
                        <MapPin className="w-4 h-4 flex-shrink-0 mt-0.5" />
                        <span className="text-sm font-medium line-clamp-1">{evento.lugar}</span>
                      </div>
                    </div>
                  </Link>
                </motion.article>
              );
            })}
          </div>
        )}

        {/* CTA - Clean & Simple */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center pt-4"
        >
          <Link
            href="/eventos"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gray-900 text-white font-semibold rounded-xl hover:bg-gray-800 transition-all duration-300 hover:gap-3 text-base"
          >
            Ver todos los eventos
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
