"use client";

import Link from "next/link";
import { Facebook, Instagram, Youtube } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary text-white border-t border-white/5">
      {/* Top orange accent line */}
      <div className="w-full h-1 bg-gradient-to-r from-transparent via-white to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-16 mb-14">
          {/* Columna 1 - Logo y descripción */}
          <div className="lg:col-span-5">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 rounded-2xl overflow-hidden bg-white/5 p-2.5 border border-white/10">
                <img
                  src="/media/LaCasaDeLaBendiciónLogo.png"
                  alt="La Casa de la Bendición Logo"
                  className="w-full h-full object-contain"
                />
              </div>
              <h3 className="text-2xl font-serif font-medium tracking-tight">La Casa de <span className="text-white italic">la Bendición</span></h3>
            </div>
            <p className="text-white/60 leading-relaxed max-w-sm font-light text-balance">
              Una comunidad de fe donde encontrarás esperanza, propósito y familia. Más de 20 años transformando vidas.
            </p>
          </div>

          {/* Columna 2 - Navegación */}
          <div className="lg:col-span-3">
            <h4 className="text-xs uppercase tracking-[0.3em] font-medium text-white mb-6">Explorar</h4>
            <ul className="space-y-4">
              {[
                { href: "#inicio", label: "Inicio" },
                { href: "#predicas", label: "Mensajes" },
                { href: "#eventos", label: "Eventos" },
                { href: "#sedes", label: "Ubicaciones" },
                { href: "#contacto", label: "Visítanos" },
              ].map(({ href, label }) => (
                <li key={href}>
                  <Link href={href} className="text-white/60 hover:text-white transition-colors duration-300 font-light">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Columna 3 - Redes sociales */}
          <div className="lg:col-span-4">
            <h4 className="text-xs uppercase tracking-[0.3em] font-medium text-white mb-6">Conéctate</h4>
            <p className="text-white/60 font-light mb-6 leading-relaxed text-balance">
              Contenido, reflexiones y novedades en todas nuestras plataformas.
            </p>
            <div className="flex gap-4">
              {[
                { href: "https://www.facebook.com/lcbcentral?locale=es_LA", icon: <Facebook className="w-5 h-5" />, label: "Facebook" },
                { href: "https://www.instagram.com/lcbcentral/", icon: <Instagram className="w-5 h-5" />, label: "Instagram" },
                { href: "https://www.youtube.com/@LCBCENTRAL", icon: <Youtube className="w-5 h-5" />, label: "YouTube" },
              ].map(({ href, icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="group w-12 h-12 bg-white/5 hover:bg-white rounded-none flex items-center justify-center transition-all duration-300 hover:shadow-lg border border-white/10 hover:border-white hover:-translate-y-1"
                >
                  <span className="text-white/50 group-hover:text-white transition-colors">{icon}</span>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-white/5 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-white/40 text-sm font-light">
              La Casa de la Bendición {currentYear}. Todos los derechos reservados.
            </p>
            <div className="flex gap-6 text-sm">
              <Link href="#" className="text-white/40 hover:text-white transition-colors font-light">Privacidad</Link>
              <Link href="#" className="text-white/40 hover:text-white transition-colors font-light">Términos</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );

}