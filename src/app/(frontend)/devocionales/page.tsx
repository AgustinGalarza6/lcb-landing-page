import { Metadata } from "next";
import { getPayload } from "payload";
import config from "@payload-config";
import DevocionalList from "@/components/DevocionalList";

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
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-lcb-secondary/10 text-lcb-secondary mb-6">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
            </svg>
            <span className="font-semibold">Contenido Devocional</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-serif font-bold text-gray-900 mb-6">
            Devocionales
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Reflexiones y apuntes de nuestros pastores para tu crecimiento espiritual
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
    </div>
  );
}
