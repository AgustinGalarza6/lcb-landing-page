"use client";

import Link from "next/link";
import { Facebook, Instagram, Youtube } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-16 mb-12">
          {/* Columna 1 - Logo y descripción */}
          <div className="lg:col-span-5">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-lg overflow-hidden bg-white/10 p-2">
                <img 
                  src="/media/LaCasaDeLaBendiciónLogo.png" 
                  alt="La Casa de la Bendición Logo" 
                  className="w-full h-full object-contain"
                />
              </div>
              <h3 className="text-xl font-bold tracking-tight">La Casa de la Bendición</h3>
            </div>
            <p className="text-gray-400 leading-relaxed max-w-sm font-light">
              Una comunidad de fe donde encontrarás esperanza, propósito y familia.
            </p>
          </div>

          {/* Columna 2 - Enlaces rápidos */}
          <div className="lg:col-span-3">
            <h4 className="text-xs uppercase tracking-wider font-semibold text-white mb-6">
              Explorar
            </h4>
            <ul className="space-y-3">
              <li>
                <Link 
                  href="#inicio" 
                  className="text-gray-400 hover:text-white transition-colors duration-200 inline-block relative after:content-[''] after:absolute after:w-0 after:h-[1px] after:bottom-0 after:left-0 after:bg-white after:transition-all after:duration-300 hover:after:w-full font-light"
                >
                  Inicio
                </Link>
              </li>
              <li>
                <Link 
                  href="#predicas" 
                  className="text-gray-400 hover:text-white transition-colors duration-200 inline-block relative after:content-[''] after:absolute after:w-0 after:h-[1px] after:bottom-0 after:left-0 after:bg-white after:transition-all after:duration-300 hover:after:w-full font-light"
                >
                  Mensajes
                </Link>
              </li>
              <li>
                <Link 
                  href="#eventos" 
                  className="text-gray-400 hover:text-white transition-colors duration-200 inline-block relative after:content-[''] after:absolute after:w-0 after:h-[1px] after:bottom-0 after:left-0 after:bg-white after:transition-all after:duration-300 hover:after:w-full font-light"
                >
                  Eventos
                </Link>
              </li>
              <li>
                <Link 
                  href="#sedes" 
                  className="text-gray-400 hover:text-white transition-colors duration-200 inline-block relative after:content-[''] after:absolute after:w-0 after:h-[1px] after:bottom-0 after:left-0 after:bg-white after:transition-all after:duration-300 hover:after:w-full font-light"
                >
                  Ubicaciones
                </Link>
              </li>
              <li>
                <Link 
                  href="#contacto" 
                  className="text-gray-400 hover:text-white transition-colors duration-200 inline-block relative after:content-[''] after:absolute after:w-0 after:h-[1px] after:bottom-0 after:left-0 after:bg-white after:transition-all after:duration-300 hover:after:w-full font-light"
                >
                  Visítanos
                </Link>
              </li>
            </ul>
          </div>

          {/* Columna 3 - Redes sociales */}
          <div className="lg:col-span-4">
            <h4 className="text-xs uppercase tracking-wider font-semibold text-white mb-6">
              Conéctate
            </h4>
            <p className="text-gray-400 text-sm font-light mb-6 leading-relaxed">
              Contenido, reflexiones y novedades.
            </p>
            <div className="flex gap-4">
              <a
                href="https://www.facebook.com/lcbcentral?locale=es_LA"
                target="_blank"
                rel="noopener noreferrer"
                className="group w-10 h-10 bg-white/5 hover:bg-white/10 rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-105"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors duration-300" />
              </a>
              <a
                href="https://www.instagram.com/lcbcentral/"
                target="_blank"
                rel="noopener noreferrer"
                className="group w-10 h-10 bg-white/5 hover:bg-white/10 rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-105"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors duration-300" />
              </a>
              <a
                href="https://www.youtube.com/@LCBCENTRAL"
                target="_blank"
                rel="noopener noreferrer"
                className="group w-10 h-10 bg-white/5 hover:bg-white/10 rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-105"
                aria-label="YouTube"
              >
                <Youtube className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors duration-300" />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-300 text-sm font-light">
              © {currentYear} La Casa de la Bendición. Todos los derechos reservados.
            </p>
            <div className="flex gap-6 text-sm">
              <Link href="#" className="text-gray-300 hover:text-white transition-colors font-light">
                Privacidad
              </Link>
              <Link href="#" className="text-gray-300 hover:text-white transition-colors font-light">
                Términos
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
