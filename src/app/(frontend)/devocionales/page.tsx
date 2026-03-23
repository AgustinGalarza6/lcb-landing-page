import { Metadata } from "next";
import { getPayload } from "payload";
import config from "@payload-config";
import DevocionalList from "@/components/DevocionalList";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Devocionales - La Casa de la Bendición",
  description: "Contenido devocional y apuntes de nuestros pastores",
};

export const revalidate = 60;

export default async function DevocionalPage() {
  const payload = await getPayload({ config });

  const devocionales = await payload.find({
    collection: "devocionales",
    limit: 100,
    sort: "-createdAt",
  });

  return (
    <div className="min-h-screen bg-white pt-32 pb-0">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="flex justify-end w-full">
          <Link href="/" className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-primary hover:text-black mb-10 group">
            Volver
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
        <div className="flex items-center gap-3 mb-6">
          <div className="w-8 h-px bg-primary" />
          <span className="text-xs uppercase tracking-[0.3em] font-medium text-primary">
            Contenido Devocional
          </span>
        </div>
        <h1 className="text-5xl md:text-7xl font-serif text-primary tracking-tight leading-[0.9]">
          Devocionales
        </h1>
        <p className="mt-6 text-xl text-secondary max-w-2xl font-light leading-relaxed">
          Reflexiones y apuntes de nuestros pastores para tu crecimiento espiritual.
        </p>
      </div>

      <DevocionalList
          devocionales={devocionales.docs.map((dev) => ({
            id: dev.id,
            titulo: dev.titulo,
            extracto: dev.extracto,
            autor: dev.autor,
            fecha: dev.fecha,
            categoria: dev.categoria || "diaria",
            imagenPortada:
              dev.imagenPortada && typeof dev.imagenPortada === "object" && dev.imagenPortada.url
                ? { url: dev.imagenPortada.url, alt: dev.imagenPortada.alt || undefined }
                : undefined,
          }))}
        showAll={true}
      />
    </div>
  );
}
