import { Metadata } from "next";
import { getPayload } from "payload";
import config from "@payload-config";
import EventosListLight from "@/components/EventosListLight";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Eventos - La Casa de la Bendición",
  description: "Momentos especiales para conectar, crecer y celebrar juntos como comunidad",
};

export const revalidate = 60;

export default async function EventosPage() {
  const payload = await getPayload({ config });

  const eventos = await payload.find({
    collection: "eventos",
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
            Experiencias Comunitarias
          </span>
        </div>
        <h1 className="text-5xl md:text-7xl font-serif text-primary tracking-tight leading-[0.9]">
          Todos los Eventos
        </h1>
        <p className="mt-6 text-xl text-secondary max-w-2xl font-light leading-relaxed">
          Momentos especiales para conectar, crecer y celebrar juntos como comunidad.
        </p>
      </div>

      <EventosListLight
          eventos={eventos.docs.map((evento) => ({
            id: evento.id,
            titulo: evento.titulo,
            descripcion: evento.descripcion,
            fecha: evento.fecha,
            hora: evento.hora,
            lugar: evento.lugar,
            tipoEvento: evento.tipoEvento,
            imagen:
              evento.imagen && typeof evento.imagen === "object" && evento.imagen.url
                ? { url: evento.imagen.url, alt: evento.imagen.alt || undefined }
                : undefined,
          }))}
        showAll={true}
      />
    </div>
  );
}
