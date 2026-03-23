import { Metadata } from "next";
import { getPayload } from "payload";
import config from "@payload-config";
import PredicasListLight from "@/components/PredicasListLight";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Mensajes - La Casa de la Bendición",
  description: "Conversaciones honestas sobre fe, propósito y cómo vivir una vida con sentido",
};

export const revalidate = 60;

export default async function PredicasPage() {
  const payload = await getPayload({ config });

  const predicas = await payload.find({
    collection: "predicas",
    limit: 100,
    sort: "-fecha",
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
            Mensajes que Transforman
          </span>
        </div>
        <h1 className="text-5xl md:text-7xl font-serif text-primary tracking-tight leading-[0.9]">
          Todos los Mensajes
        </h1>
        <p className="mt-6 text-xl text-secondary max-w-2xl font-light leading-relaxed">
          Conversaciones honestas sobre fe, propósito y cómo vivir una vida con sentido.
        </p>
      </div>

      <PredicasListLight
          predicas={predicas.docs.map((predica) => ({
            id: predica.id,
            titulo: predica.titulo,
            descripcion: predica.descripcion,
            youtubeVideoId: predica.youtubeVideoId,
            predicador: predica.predicador,
            fecha: predica.fecha,
            versiculo: predica.versiculo,
            miniatura:
              predica.miniatura && typeof predica.miniatura === "object"
                ? { url: predica.miniatura.url }
                : null,
          }))}
        showAll={true}
      />
    </div>
  );
}
