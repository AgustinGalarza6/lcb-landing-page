"use client";

import { motion } from "framer-motion";
import { Calendar, MapPin, Users, ArrowRight, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useRef } from "react";

interface Convenciones {
  id: number;
  titulo: string;
  subtitulo?: string;
  descripcion: string;
  fechaInicio: string;
  fechaFin: string;
  lugar: string;
  ciudad: string;
  capacidad?: number;
  costoGeneral?: number;
  costoEstudiantes?: number;
  moneda: string;
  destacada: boolean;
  activa: boolean;
  hashtag?: string;
  imagenPrincipal?: {
    url: string;
    alt?: string;
  };
  conferencistas?: Array<{
    nombre: string;
    ministerio?: string;
  }>;
}

interface ConvencionesSectionProps {
  convenciones: Convenciones[];
}

export default function ConvencionesSection({ convenciones }: ConvencionesSectionProps) {
  const convencionesActivas = convenciones.filter((c) => c.activa);
  const scrollRef = useRef<HTMLDivElement>(null);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("es-AR", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const formatDateShort = (dateString: string) => {
    const date = new Date(dateString);
    return {
      day: date.toLocaleDateString('es-ES', { day: '2-digit' }),
      month: date.toLocaleDateString('es-ES', { month: 'short' }).toUpperCase(),
    };
  };

  const formatNumber = (num: number) => {
    return num.toLocaleString("es-AR");
  };

  const formatPrice = (price: number, currency: string) => {
    if (currency === "FREE") return "Entrada libre";
    if (currency === "ARS") return `$${formatNumber(price)}`;
    if (currency === "USD") return `USD $${price}`;
    return `${price}`;
  };

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 600;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  if (convencionesActivas.length === 0) {
    return null;
  }

  return (
    <section id="convenciones" className="py-20 bg-white overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header - Compact */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 flex items-end justify-between"
        >
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-1 h-6 bg-black rounded-full" />
              <span className="text-xs uppercase tracking-[0.3em] font-medium text-secondary">
                Experiencias Transformadoras
              </span>
            </div>
            <h2 className="text-4xl md:text-6xl font-serif text-primary mb-3 tracking-tight leading-[0.9]">
              Convenciones
            </h2>
            <p className="text-lg md:text-xl text-secondary max-w-2xl font-light leading-relaxed text-balance">
              Experiencias diseñadas para inspirar y transformar.
            </p>
          </div>

          {/* Navigation Buttons - Desktop */}
          <div className="hidden md:flex items-center gap-2">
            <button
              onClick={() => scroll('left')}
              className="w-12 h-12 rounded-none bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
              aria-label="Anterior"
            >
              <ChevronRight className="w-6 h-6 text-gray-900 rotate-180" />
            </button>
            <button
              onClick={() => scroll('right')}
              className="w-12 h-12 rounded-none bg-black hover:bg-neutral-800 flex items-center justify-center transition-colors shadow-sm"
              aria-label="Siguiente"
            >
              <ChevronRight className="w-6 h-6 text-white" />
            </button>
          </div>
        </motion.div>

        {/* Premium Slider */}
        <div className="relative -mx-4 md:mx-0">
          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-hide px-4 md:px-0 pb-4"
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
            }}
          >
            {convencionesActivas.map((convencion, index) => {
              const dateInfo = formatDateShort(convencion.fechaInicio);
              const isFeatured = convencion.destacada;
              
              return (
                <motion.article
                  key={convencion.id}
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className={`group flex-shrink-0 snap-start ${
                    isFeatured ? 'w-[90vw] max-w-[800px]' : 'w-[85vw] max-w-[600px]'
                  }`}
                >
                  <Link
                    href={`#contacto`}
                    className="block h-full"
                  >
                    <div className={`bg-white rounded-2xl overflow-hidden border border-gray-200 hover:border-gray-300 transition-all duration-300 h-full ${
                      isFeatured ? 'shadow-2xl shadow-black/5 hover:shadow-xl' : 'shadow-sm hover:shadow-md'
                    }`}>
                      {/* Image - Landscape Compact */}
                      <div className={`relative overflow-hidden bg-gray-100 ${
                        isFeatured ? 'aspect-[21/9]' : 'aspect-[16/9]'
                      }`}>
                        {convencion.imagenPrincipal ? (
                          <>
                            <img
                              src={convencion.imagenPrincipal.url}
                              alt={convencion.imagenPrincipal.alt || convencion.titulo}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                            />
                            {isFeatured && (
                              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                            )}
                          </>
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-100" />
                        )}
                        
                        {/* Date Badge */}
                        <div className="absolute top-4 left-4 flex flex-col items-center justify-center w-14 h-14 bg-white rounded-xl shadow-md">
                          <span className="text-xl font-bold leading-none text-gray-900">
                            {dateInfo.day}
                          </span>
                          <span className="text-[10px] font-semibold tracking-wider text-gray-600 mt-0.5">
                            {dateInfo.month}
                          </span>
                        </div>

                        {/* Hashtag Badge */}
                        {convencion.hashtag && isFeatured && (
                          <div className="absolute bottom-4 right-4 bg-white/10 backdrop-blur-md px-4 py-2 rounded-none border border-white/20">
                            <span className="text-white text-sm font-semibold tracking-wide">{convencion.hashtag}</span>
                          </div>
                        )}
                      </div>

                      {/* Content - Compact & Structured */}
                      <div className="p-6 md:p-8">
                        {/* Title Block */}
                        <div className="mb-4">
                          <h3 className={`font-serif font-medium text-primary leading-tight tracking-tight group-hover:text-black transition-colors duration-300 line-clamp-2 ${
                            isFeatured ? 'text-4xl md:text-5xl mb-3' : 'text-2xl md:text-3xl'
                          }`}>
                            {convencion.titulo}
                          </h3>
                          {convencion.subtitulo && (
                            <p className={`text-gray-600 font-light ${
                              isFeatured ? 'text-lg md:text-xl' : 'text-base'
                            }`}>
                              {convencion.subtitulo}
                            </p>
                          )}
                        </div>

                        {/* Description */}
                        <p className={`text-gray-600 leading-relaxed font-light mb-6 ${
                          isFeatured ? 'text-base line-clamp-2' : 'text-sm line-clamp-2'
                        }`}>
                          {convencion.descripcion}
                        </p>

                        {/* Info Grid - Compact */}
                        <div className={`grid gap-4 mb-6 pb-6 border-b border-gray-100 ${
                          isFeatured ? 'grid-cols-2 sm:grid-cols-4' : 'grid-cols-2'
                        }`}>
                          {/* Location */}
                          <div>
                            <div className="flex items-center gap-1.5 mb-1.5">
                              <MapPin className="w-3.5 h-3.5 text-gray-400" />
                              <p className="text-xs uppercase tracking-wide text-gray-500 font-semibold">Ubicación</p>
                            </div>
                            <p className="text-sm font-bold text-gray-900 truncate">{convencion.lugar}</p>
                            <p className="text-xs text-gray-600 truncate">{convencion.ciudad}</p>
                          </div>

                          {/* Capacity */}
                          {convencion.capacidad && (
                            <div>
                              <div className="flex items-center gap-1.5 mb-1.5">
                                <Users className="w-3.5 h-3.5 text-gray-400" />
                                <p className="text-xs uppercase tracking-wide text-gray-500 font-semibold">Capacidad</p>
                              </div>
                              <p className="text-sm font-bold text-gray-900">{formatNumber(convencion.capacidad)}</p>
                              <p className="text-xs text-gray-600">personas</p>
                            </div>
                          )}

                          {/* Pricing */}
                          {convencion.costoGeneral !== undefined && (
                            <div className={isFeatured ? '' : 'col-span-2'}>
                              <div className="flex items-center gap-1.5 mb-1.5">
                                <p className="text-xs uppercase tracking-wide text-gray-500 font-semibold">Entrada</p>
                              </div>
                              <p className="text-sm font-bold text-gray-900">
                                {formatPrice(convencion.costoGeneral, convencion.moneda)}
                              </p>
                              {convencion.costoEstudiantes && convencion.costoEstudiantes !== convencion.costoGeneral && (
                                <p className="text-xs text-gray-600">
                                  Est: {formatPrice(convencion.costoEstudiantes, convencion.moneda)}
                                </p>
                              )}
                            </div>
                          )}
                        </div>

                        {/* Speakers - Compact */}
                        {convencion.conferencistas && convencion.conferencistas.length > 0 && isFeatured && (
                          <div className="mb-6">
                            <p className="text-xs uppercase tracking-wide text-gray-500 font-semibold mb-3">
                              Oradores
                            </p>
                            <div className="flex flex-wrap gap-2">
                              {convencion.conferencistas.slice(0, 3).map((conf, idx) => (
                                <div
                                  key={idx}
                                  className="flex items-center gap-2 bg-gray-50 px-3 py-1.5 rounded-lg"
                                >
                                  <div className="w-7 h-7 rounded-full bg-black flex items-center justify-center flex-shrink-0">
                                    <span className="text-white text-[10px] font-bold">
                                      {conf.nombre.split(' ').map(n => n[0]).join('').slice(0, 2)}
                                    </span>
                                  </div>
                                  <span className="text-xs font-semibold text-gray-900">{conf.nombre.split(' ')[0]}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* CTA */}
                        <div className="flex items-center justify-between">
                          <span className="inline-flex items-center gap-2 text-black font-semibold text-sm group-hover:gap-3 transition-all duration-300">
                            {isFeatured ? 'Reservar lugar' : 'Ver detalles'}
                            <ArrowRight className="w-4 h-4" />
                          </span>
                          {isFeatured && (
                            <div className="px-3 py-1 bg-black/10 text-black rounded-full">
                              <span className="text-xs font-semibold">Destacado</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.article>
              );
            })}
          </div>
        </div>

        {/* Mobile Scroll Indicator */}
        <div className="md:hidden mt-6 flex justify-center gap-2">
          <div className="text-sm text-gray-500 flex items-center gap-2">
            <span>Desliza para ver más</span>
            <ChevronRight className="w-4 h-4 animate-pulse" />
          </div>
        </div>
      </div>

      {/* Hide scrollbar CSS */}
      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
}
