"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { MapPin, Phone, Clock, ChevronRight, Navigation, Search } from "lucide-react";

interface Sede {
  id: string;
  nombre: string;
  direccion: string;
  ciudad?: string;
  telefono?: string;
  imagen?: string;
  googleMapsUrl?: string;
  horarios?: Array<{
    dia: string;
    hora: string;
    tipo: string;
  }>;
}

interface SedesCarouselProps {
  sedes: Sede[];
}

export default function SedesCarousel({ sedes }: SedesCarouselProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  // Si no hay sedes, mostrar mensaje
  if (!sedes || sedes.length === 0) {
    return (
      <section id="sedes" className="py-24 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-4xl md:text-5xl font-serif font-medium text-black mb-6 leading-[0.9] tracking-tight">
              Nuestras Sedes
            </h2>
            <p className="text-lg text-secondary font-light text-balance">
              Próximamente agregaremos información sobre nuestras sedes.
            </p>
          </div>
        </div>
      </section>
    );
  }

  // Filtrar sedes basado en búsqueda
  const filteredSedes = sedes.filter((sede) => {
    const query = searchQuery.toLowerCase().trim();
    if (!query) return true;
    
    return (
      sede.nombre.toLowerCase().includes(query) ||
      sede.ciudad?.toLowerCase().includes(query) ||
      sede.direccion.toLowerCase().includes(query)
    );
  });

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 400;
      const newScrollLeft =
        direction === "left"
          ? scrollRef.current.scrollLeft - scrollAmount
          : scrollRef.current.scrollLeft + scrollAmount;

      scrollRef.current.scrollTo({
        left: newScrollLeft,
        behavior: "smooth",
      });
    }
  };

  return (
    <section id="sedes" className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          {/* Eyebrow */}
          <div className="flex items-center gap-3 mb-4">
            <div className="w-1 h-6 bg-black rounded-full" />
            <span className="text-xs uppercase tracking-[0.3em] font-medium text-secondary">
              Encuéntranos
            </span>
          </div>
          
          {/* Title */}
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-serif text-primary mb-6 tracking-tight leading-[0.9]">
            Nuestras Sedes
          </h2>
          
          {/* Subtitle */}
          <p className="text-lg md:text-xl text-secondary max-w-2xl font-light leading-relaxed mb-10 text-balance">
            Un espacio cerca de ti donde siempre serás bienvenido.
          </p>

          {/* Search Input - Premium & Minimal */}
          <div className="relative max-w-2xl">
            <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none">
              <Search className="w-5 h-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Buscar por localidad (ej: Rafael Calzada)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-14 pr-6 py-4 bg-white border border-gray-200 rounded-2xl text-primary placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent shadow-sm focus:border-transparent transition-all text-lg font-light"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute inset-y-0 right-0 pr-6 flex items-center text-gray-400 hover:text-gray-900 transition-colors"
              >
                <span className="text-sm font-medium">Limpiar</span>
              </button>
            )}
          </div>
        </motion.div>

        {/* Results count */}
        {searchQuery && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-sm text-gray-500 mb-6"
          >
            {filteredSedes.length === 0
              ? "No encontramos sedes en esa localidad"
              : `${filteredSedes.length} ${filteredSedes.length === 1 ? "sede encontrada" : "sedes encontradas"}`}
          </motion.p>
        )}

        {/* Cards Slider */}
        {filteredSedes.length > 0 && (
          <div className="relative">
            {/* Navigation Buttons - Desktop Only */}
            {filteredSedes.length > 2 && (
              <>
                <button
                  onClick={() => scroll("left")}
                  className="hidden lg:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-6 z-10 w-12 h-12 items-center justify-center bg-white rounded-none shadow-lg hover:bg-gray-100 transition-all duration-300 hover:scale-110"
                  aria-label="Anterior"
                >
                  <ChevronRight className="w-6 h-6 text-gray-900 rotate-180" />
                </button>

                <button
                  onClick={() => scroll("right")}
                  className="hidden lg:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-6 z-10 w-12 h-12 items-center justify-center bg-white rounded-none shadow-lg hover:bg-gray-100 transition-all duration-300 hover:scale-110"
                  aria-label="Siguiente"
                >
                  <ChevronRight className="w-6 h-6 text-gray-900" />
                </button>
              </>
            )}

            {/* Cards Container */}
            <div
              ref={scrollRef}
              className="flex gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-4"
            >
              {filteredSedes.map((sede, index) => (
                <motion.article
                  key={sede.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="group flex-shrink-0 snap-start w-[85vw] sm:w-[450px] lg:w-[500px]"
                >
                  {/* Card */}
                  <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300 h-full">
                    {/* Image */}
                    <div className="relative h-64 bg-gray-100">
                      {sede.imagen ? (
                        <img
                          src={sede.imagen}
                          alt={sede.nombre}
                          className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
                          <MapPin className="w-16 h-16 text-white/20" />
                        </div>
                      )}
                      
                      {/* Gradient overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      
                      {/* Title on image */}
                      <div className="absolute bottom-0 left-0 right-0 p-6">
                        <h3 className="text-3xl font-serif font-medium text-white mb-1 leading-tight text-balance">
                          {sede.nombre}
                        </h3>
                        {sede.ciudad && (
                          <p className="text-white/90 text-sm font-light">{sede.ciudad}</p>
                        )}
                      </div>
                    </div>

                    {/* Information */}
                    <div className="p-6 space-y-4">
                      {/* Address */}
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 bg-black/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <MapPin className="w-5 h-5 text-black" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-primary mb-1">Dirección</p>
                          <p className="text-sm text-secondary leading-relaxed">{sede.direccion}</p>
                          {sede.googleMapsUrl && (
                            <a
                              href={sede.googleMapsUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 text-black hover:text-black-dark transition-colors text-xs mt-2 font-medium"
                            >
                              <Navigation className="w-3 h-3" />
                              Cómo llegar
                            </a>
                          )}
                        </div>
                      </div>

                      {/* Phone */}
                      {sede.telefono && (
                        <div className="flex items-start gap-3">
                          <div className="w-10 h-10 bg-black/10 rounded-full flex items-center justify-center flex-shrink-0">
                            <Phone className="w-5 h-5 text-black" />
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-semibold text-primary mb-1">Teléfono</p>
                            <a
                              href={`tel:${sede.telefono}`}
                              className="text-sm text-secondary hover:text-primary transition-colors"
                            >
                              {sede.telefono}
                            </a>
                          </div>
                        </div>
                      )}

                      {/* Schedule */}
                      {sede.horarios && sede.horarios.length > 0 && (
                        <div className="flex items-start gap-3">
                          <div className="w-10 h-10 bg-black/10 rounded-full flex items-center justify-center flex-shrink-0">
                            <Clock className="w-5 h-5 text-black" />
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-semibold text-primary mb-2">Horarios</p>
                            <div className="space-y-1.5">
                              {sede.horarios.slice(0, 3).map((horario, idx) => (
                                <div key={idx} className="flex items-center justify-between text-xs">
                                  <div>
                                    <span className="font-medium text-primary">{horario.dia}</span>
                                    <span className="text-secondary/80 ml-1">- {horario.tipo}</span>
                                  </div>
                                  <span className="text-primary font-semibold">{horario.hora}</span>
                                </div>
                              ))}
                              {sede.horarios.length > 3 && (
                                <p className="text-xs text-gray-400 mt-1">
                                  +{sede.horarios.length - 3} más
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>

            {/* Mobile Scroll Indicator */}
            {filteredSedes.length > 1 && (
              <div className="lg:hidden flex items-center justify-center gap-2 mt-6 text-gray-400 text-sm">
                <span>Desliza para ver más</span>
                <ChevronRight className="w-4 h-4 animate-pulse" />
              </div>
            )}
          </div>
        )}
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
