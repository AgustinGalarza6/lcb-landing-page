import { Metadata } from "next";
import { getPayload } from "payload";
import config from "@payload-config";
import PredicasList from "@/components/PredicasList";

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
    <div className="min-h-screen bg-white py-24">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-20">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-1 h-8 bg-lcb-accent rounded-full" />
            <span className="text-xs uppercase tracking-[0.25em] font-semibold text-gray-500">
              Mensajes que Transforman
            </span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 tracking-tight leading-[0.95]">
            Todos los Mensajes
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 max-w-3xl font-light leading-relaxed">
            Conversaciones honestas sobre fe, propósito y cómo vivir una vida con sentido.
          </p>
        </div>

        <PredicasList
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
    </div>
  );
}
