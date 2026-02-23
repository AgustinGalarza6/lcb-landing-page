import { Metadata } from "next";
import { getPayload } from "payload";
import config from "@payload-config";
import EventosList from "@/components/EventosList";

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
    <div className="min-h-screen bg-gray-50 py-24">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-20">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-1 h-8 bg-lcb-accent rounded-full" />
            <span className="text-xs uppercase tracking-[0.25em] font-semibold text-gray-500">
              Experiencias Comunitarias
            </span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 tracking-tight leading-[0.95]">
            Todos los Eventos
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 max-w-3xl font-light leading-relaxed">
            Momentos especiales para conectar, crecer y celebrar juntos como comunidad.
          </p>
        </div>

        <EventosList
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
    </div>
  );
}
