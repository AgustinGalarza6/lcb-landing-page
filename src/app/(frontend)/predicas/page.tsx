import { Metadata } from "next";
import { getPayload } from "payload";
import config from "@payload-config";
import PredicasList from "@/components/PredicasList";

export const metadata: Metadata = {
  title: "Prédicas - La Casa de la Bendición",
  description: "Todas nuestras prédicas y mensajes que transforman vidas",
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
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-lcb-primary/10 text-lcb-primary mb-6">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2 5a2 2 0 012-2h12a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2V5zm3.293 1.293a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 01-1.414-1.414L7.586 10 5.293 7.707a1 1 0 010-1.414zM11 12a1 1 0 100 2h3a1 1 0 100-2h-3z" />
            </svg>
            <span className="font-semibold">Palabra de Dios</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-serif font-bold text-gray-900 mb-6">
            Todas las Prédicas
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Alimenta tu espíritu con mensajes que transforman vidas
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
