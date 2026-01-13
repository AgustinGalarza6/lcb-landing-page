"use client";

import Link from "next/link";
import { Facebook, Instagram, Youtube, MapPin, Mail, Phone } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Columna 1 - Logo y descripción */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-14 h-14 rounded-lg overflow-hidden bg-white/10 p-2">
                <img 
                  src="/media/LaCasaDeLaBendiciónLogo.png" 
                  alt="La Casa de la Bendición Logo" 
                  className="w-full h-full object-contain"
                />
              </div>
              <h3 className="text-2xl font-bold">La Casa de la Bendición</h3>
            </div>
            <p className="text-gray-300 mb-6 max-w-md">
              Una comunidad de fe dedicada a vivir y compartir el amor de Dios. 
              Te invitamos a ser parte de nuestra familia.
            </p>
          </div>

          {/* Columna 2 - Enlaces rápidos */}
          <div>
            <h3 className="text-lg font-bold mb-4">Enlaces Rápidos</h3>
            <ul className="space-y-3">
              <li>
                <Link href="#inicio" className="text-gray-300 hover:text-white transition-colors">
                  Inicio
                </Link>
              </li>
              <li>
                <Link href="#predicas" className="text-gray-300 hover:text-white transition-colors">
                  Prédicas
                </Link>
              </li>
              <li>
                <Link href="#eventos" className="text-gray-300 hover:text-white transition-colors">
                  Eventos
                </Link>
              </li>
              <li>
                <Link href="#sedes" className="text-gray-300 hover:text-white transition-colors">
                  Sedes
                </Link>
              </li>
              <li>
                <Link href="#contacto" className="text-gray-300 hover:text-white transition-colors">
                  Contacto
                </Link>
              </li>
            </ul>
          </div>

          {/* Columna 3 - Redes sociales */}
          <div>
            <h3 className="text-lg font-bold mb-4">Síguenos</h3>
            <p className="text-gray-300 text-sm mb-4">
              Mantente conectado con nosotros en redes sociales
            </p>
            <div className="flex gap-3">
              <a
                href="https://www.facebook.com/lcbcentral?locale=es_LA"
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-all hover:scale-110"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="https://www.instagram.com/lcbcentral/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-all hover:scale-110"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://www.youtube.com/@lacasadelabendicion7771"
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-all hover:scale-110"
                aria-label="YouTube"
              >
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 pt-6 mt-8">
          <div className="text-center text-gray-400 text-sm">
            <p>
              © {currentYear} La Casa de la Bendición. Todos los derechos reservados.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
