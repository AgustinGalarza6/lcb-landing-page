"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Phone, Clock, ChevronLeft, ChevronRight, Navigation } from "lucide-react";

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
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % sedes.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + sedes.length) % sedes.length);
  };

  const currentSede = sedes[currentIndex];

  return (
    <section id="sedes" className="py-24 bg-white">
      <div className="container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-full mb-4">
            <MapPin className="w-5 h-5 text-gray-900" />
            <span className="text-sm font-semibold text-gray-900">Encuéntranos</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Nuestras Sedes
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
            Visítanos en cualquiera de nuestras ubicaciones
          </p>
        </motion.div>

        {/* Carousel */}
        <div className="relative max-w-6xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-3xl shadow-2xl overflow-hidden"
            >
              <div className="grid grid-cols-1 lg:grid-cols-2">
                {/* Imagen/Mapa */}
                <div className="relative h-96 lg:h-auto bg-gray-200">
                  {currentSede.imagen ? (
                    <img
                      src={currentSede.imagen}
                      alt={currentSede.nombre}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-gray-800 to-black flex items-center justify-center">
                      <MapPin className="w-24 h-24 text-white/30" />
                    </div>
                  )}
                  
                  {/* Overlay con nombre */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-8">
                    <h3 className="text-3xl font-bold text-white mb-2">
                      {currentSede.nombre}
                    </h3>
                    {currentSede.ciudad && (
                      <p className="text-white/90 text-lg">{currentSede.ciudad}</p>
                    )}
                  </div>
                </div>

                {/* Información */}
                <div className="p-8 lg:p-12 flex flex-col justify-between">
                  <div className="space-y-6">
                    {/* Dirección */}
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <MapPin className="w-6 h-6 text-gray-900" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900 mb-1">Dirección</h4>
                        <p className="text-gray-600">{currentSede.direccion}</p>
                        {currentSede.googleMapsUrl && (
                          <a
                            href={currentSede.googleMapsUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-gray-900 hover:text-gray-600 transition-colors text-sm mt-2 font-medium"
                          >
                            <Navigation className="w-4 h-4" />
                            Cómo llegar
                          </a>
                        )}
                      </div>
                    </div>

                    {/* Teléfono */}
                    {currentSede.telefono && (
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
                          <Phone className="w-6 h-6 text-gray-900" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900 mb-1">Teléfono</h4>
                          <a
                            href={`tel:${currentSede.telefono}`}
                            className="text-gray-600 hover:text-gray-900 transition-colors"
                          >
                            {currentSede.telefono}
                          </a>
                        </div>
                      </div>
                    )}

                    {/* Horarios */}
                    {currentSede.horarios && currentSede.horarios.length > 0 && (
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
                          <Clock className="w-6 h-6 text-gray-900" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900 mb-3">Horarios</h4>
                          <div className="space-y-2">
                            {currentSede.horarios.map((horario, idx) => (
                              <div key={idx} className="flex justify-between items-center text-sm">
                                <div>
                                  <span className="font-medium text-gray-900 capitalize">{horario.dia}</span>
                                  <span className="text-gray-500 ml-2">- {horario.tipo}</span>
                                </div>
                                <span className="text-gray-900 font-semibold">{horario.hora}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navegación */}
          {sedes.length > 1 && (
            <>
              <button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-900 hover:text-white transition-all group"
                aria-label="Sede anterior"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-900 hover:text-white transition-all group"
                aria-label="Siguiente sede"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </>
          )}

          {/* Indicadores */}
          {sedes.length > 1 && (
            <div className="flex justify-center gap-2 mt-8">
              {sedes.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`h-2 rounded-full transition-all ${
                    idx === currentIndex
                      ? "w-8 bg-gray-900"
                      : "w-2 bg-gray-300 hover:bg-gray-600"
                  }`}
                  aria-label={`Ir a sede ${idx + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
