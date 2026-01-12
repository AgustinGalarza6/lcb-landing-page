import { Metadata } from "next";
import { getPayload } from "payload";
import config from "@payload-config";
import EventosList from "@/components/EventosList";

export const metadata: Metadata = {
  title: "Eventos - La Casa de la Bendición",
  description: "Próximos eventos y actividades de nuestra iglesia",
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
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-lcb-accent/10 text-lcb-accent mb-6">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
            </svg>
            <span className="font-semibold">Próximos Eventos</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-serif font-bold text-gray-900 mb-6">
            Nuestros Eventos
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Únete a nosotros en nuestras actividades y celebraciones
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
