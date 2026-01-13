"use client";

import { motion } from "framer-motion";
import { Calendar, MapPin, Clock, Sparkles } from "lucide-react";
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
      <section id="eventos" className="py-20 bg-gray-50">
        <div className="container">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">
              Próximos Eventos
            </h2>
            <p className="text-lg text-gray-600">
              Próximamente publicaremos nuevos eventos.
            </p>
          </div>
        </div>
      </section>
    );
  }

  const getTipoColor = (tipo: string) => {
    const colors: Record<string, string> = {
      convencion: "from-gray-700 to-gray-500",
      conferencia: "from-gray-800 to-gray-600",
      retiro: "from-gray-600 to-gray-400",
      especial: "from-black to-gray-700",
      culto: "from-gray-900 to-gray-700",
      juvenil: "from-gray-700 to-gray-500",
      oracion: "from-gray-800 to-gray-600",
    };
    return colors[tipo] || "from-gray-600 to-gray-400";
  };

  return (
    <section id="eventos" className="py-20 bg-gray-50">
      <div className="container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">
            Eventos Recomendados
          </h2>
        </motion.div>

        {/* Grid de eventos - estilo Misión Online */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {eventos.map((evento, index) => {
            const gradientColor = getTipoColor(evento.tipoEvento);
            
            return (
              <motion.div
                key={evento.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300"
              >
                <Link href={`/eventos/${evento.id}`} className="block">
                  {/* Imagen del evento */}
                  <div className="relative h-48 overflow-hidden">
                    {evento.imagen ? (
                      <img
                        src={evento.imagen.url}
                        alt={evento.imagen.alt || evento.titulo}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className={`w-full h-full bg-gradient-to-br ${gradientColor} flex items-center justify-center`}>
                        <Sparkles className="w-16 h-16 text-white/50" />
                      </div>
                    )}
                    
                    {/* Overlay sutil */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>

                  {/* Contenido del card */}
                  <div className="p-6">
                    {/* Título del evento */}
                    <h3 className="text-xl font-bold text-gray-800 mb-2 line-clamp-2 min-h-[3.5rem] group-hover:text-gray-600 transition-colors">
                      {evento.titulo}
                    </h3>

                    {/* Descripción */}
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2 min-h-[2.5rem]">
                      {evento.descripcion}
                    </p>

                    {/* Separador */}
                    <div className="border-t border-gray-200 my-4"></div>

                    {/* Footer del card */}
                    <div className="flex items-center justify-between">
                      {/* Tipo de evento con icono */}
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center">
                          <Calendar className="w-3 h-3 text-gray-600" />
                        </div>
                        <span className="text-sm font-medium text-gray-700 capitalize">
                          {evento.tipoEvento}
                        </span>
                      </div>

                      {/* Fecha */}
                      <span className="text-sm font-bold text-lcb-primary">
                        {new Date(evento.fecha).toLocaleDateString('es-ES', {
                          day: 'numeric',
                          month: 'short'
                        })}
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* Botón ver más - opcional */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-8"
        >
          <Link
            href="/eventos"
            className="inline-block px-8 py-3 bg-lcb-primary text-white font-semibold rounded-lg hover:bg-lcb-primary/90 transition-colors shadow-md hover:shadow-lg"
          >
            Ver todos los eventos
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
