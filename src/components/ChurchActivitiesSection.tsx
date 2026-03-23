"use client";

import { motion } from "framer-motion";
import { useRef } from "react";
import { ChevronRight } from "lucide-react";

interface ActivitySchedule {
  dia: string;
  horarios: string[];
}

interface ChurchActivity {
  id: string;
  titulo: string;
  ubicacion: string;
  horarios: ActivitySchedule[];
  imagen: string;
}

const activities: ChurchActivity[] = [
  {
    id: "reuniones-familiares",
    titulo: "Reunion de Oracion",
    ubicacion: "Auditorio MC1",
    horarios: [
      { dia: "Sábados", horarios: ["6:00 p.m."] },
      { dia: "Domingos", horarios: ["7:00 a.m.", "9:15 a.m.", "11:30 a.m."] },
    ],
    imagen: "/media/activities/family.jpg",
  },
  {
    id: "somos-uno",
    titulo: "Somos uno",
    ubicacion: "Auditorio",
    horarios: [
      { dia: "Sábados", horarios: ["4:00 p.m."] },
    ],
    imagen: "/media/activities/youth.jpg",
  },
  {
    id: "s1-rocas",
    titulo: "Reuniones Generales",
    ubicacion: "Salon Bronce",
    horarios: [
      { dia: "Sábados", horarios: ["4:00 p.m."] },
    ],
    imagen: "/media/activities/rocas.jpg",
  },
  {
    id: "teens",
    titulo: "Reunion de Adolescentes",
    ubicacion: "Salón Bronce y Teatro G12",
    horarios: [
      { dia: "Sábados", horarios: ["6:00 p.m."] },
      { dia: "Domingos", horarios: ["7:00 a.m.", "9:15 a.m.", "11:30 a.m."] },
    ],
    imagen: "/media/activities/teens.jpg",
  },
];

export default function ChurchActivitiesSection() {
  const scrollRef = useRef<HTMLDivElement>(null);

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
    <section id="actividades" className="relative py-24 bg-primary overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 md:mb-16"
        >
          <div className="mb-12 md:mb-16">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-px bg-white text-black" />
              <span className="text-white text-xs uppercase tracking-[0.3em] font-medium">Nuestras Actividades</span>
            </div>
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-serif text-white mb-4 leading-[0.9] tracking-tight">
              Un lugar para ti
            </h2>
            <p className="text-xl md:text-2xl text-white/70 font-light max-w-3xl text-balance">
              Espacios pensados para conectar, crecer y pertenecer
            </p>
          </div>
        </motion.div>

        {/* Slider Container */}
        <div className="relative">
          {/* Navigation Buttons - Desktop Only */}
          <button
            onClick={() => scroll("left")}
            className="hidden lg:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-6 z-10 w-12 h-12 flex-none items-center justify-center bg-white/5 backdrop-blur-md rounded-full shadow-lg hover:bg-white text-black border border-white/10 hover:border-white-light transition-all duration-300"
            aria-label="Anterior"
          >
            <ChevronRight className="w-6 h-6 text-white rotate-180" />
          </button>

          <button
            onClick={() => scroll("right")}
            className="hidden lg:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-6 z-10 w-12 h-12 flex-none items-center justify-center bg-white/5 backdrop-blur-md rounded-full shadow-lg hover:bg-white text-black border border-white/10 hover:border-white-light transition-all duration-300"
            aria-label="Siguiente"
          >
            <ChevronRight className="w-6 h-6 text-white" />
          </button>

          {/* Cards Container */}
          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto snap-x snap-mandatory [&::-webkit-scrollbar]:hidden pb-4"
          >
            {activities.map((activity, index) => (
              <motion.article
                key={activity.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group flex-shrink-0 snap-start w-[85vw] sm:w-[360px] lg:w-[400px]"
              >
                {/* Card */}
                <div className="relative h-[500px] rounded-2xl overflow-hidden bg-white/5 border border-white/5 group-hover:border-white/40 shadow-xl shadow-black/10 transition-colors duration-300">
                  {/* Background Image */}
                  <div className="absolute inset-0">
                    <div className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-950" />
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/20" />
                  </div>

                  {/* Content */}
                  <div className="relative h-full flex flex-col justify-end p-8">
                    {/* Accent dot */}
                    <div className="w-8 h-1 bg-white text-black rounded-full mb-4" />
                    {/* Title */}
                    <h3 className="text-3xl md:text-4xl font-serif font-medium text-white mb-4 leading-tight">
                      {activity.titulo}
                    </h3>

                    {/* Location */}
                    <p className="text-base md:text-lg text-white/80 mb-6 font-light">
                      {activity.ubicacion}
                    </p>

                    {/* Schedules */}
                    <div className="space-y-2">
                      {activity.horarios.map((schedule, idx) => (
                        <div key={idx} className="text-white/90">
                          <span className="font-medium">{schedule.dia}</span>{" "}
                          <span className="font-light">
                            {schedule.horarios.join(", ")}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>

          {/* Mobile Scroll Indicator */}
          <div className="lg:hidden flex items-center justify-center gap-2 mt-6 text-white/60 text-sm">
            <span>Desliza para ver más</span>
            <ChevronRight className="w-4 h-4 animate-pulse" />
          </div>
        </div>
      </div>

      {/* Hide scrollbar CSS */}
    </section>
  );
}
