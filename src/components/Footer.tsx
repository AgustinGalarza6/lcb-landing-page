"use client";

import Link from "next/link";
import { Facebook, Instagram, Youtube, Heart } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Columna 1 - Sobre nosotros */}
          <div>
            <h3 className="text-xl font-bold mb-4">La Casa de la Bendición</h3>
            <p className="text-gray-300 mb-4">
              Una comunidad de fe dedicada a vivir y compartir el amor de Dios.
            </p>
          </div>

          {/* Columna 2 - Enlaces rápidos */}
          <div>
            <h3 className="text-xl font-bold mb-4">Enlaces Rápidos</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/predicas" className="text-gray-300 hover:text-white transition-colors">
                  Prédicas
                </Link>
              </li>
              <li>
                <Link href="/eventos" className="text-gray-300 hover:text-white transition-colors">
                  Eventos
                </Link>
              </li>
              <li>
                <Link href="/devocionales" className="text-gray-300 hover:text-white transition-colors">
                  Devocionales
                </Link>
              </li>
            </ul>
          </div>

          {/* Columna 3 - Redes sociales */}
          <div>
            <h3 className="text-xl font-bold mb-4">Síguenos</h3>
            <div className="flex gap-4 mb-4">
              <a
                href="#"
                className="w-10 h-10 bg-white/10 hover:bg-gray-700 rounded-full flex items-center justify-center transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-white/10 hover:bg-gray-700 rounded-full flex items-center justify-center transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-white/10 hover:bg-gray-700 rounded-full flex items-center justify-center transition-colors"
                aria-label="YouTube"
              >
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-700 pt-8 text-center text-gray-400">
          <p className="flex items-center justify-center gap-2">
            © {currentYear} La Casa de la Bendición. Hecho con{" "}
            <Heart className="w-4 h-4 text-red-500 fill-red-500" /> para la gloria de Dios
          </p>
        </div>
      </div>
    </footer>
  );
}
