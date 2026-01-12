import { Metadata } from "next";
import { getPayload } from "payload";
import config from "@payload-config";
import SedesCarousel from "@/components/SedesCarousel";
import ContactSection from "@/components/ContactSection";

export const metadata: Metadata = {
  title: "Sedes - La Casa de la Bendición",
  description: "Nuestras ubicaciones y horarios de reunión",
};

export const revalidate = 60;

export default async function SedesPage() {
  const payload = await getPayload({ config });

  const contactInfo = await payload.findGlobal({
    slug: "contactInfo",
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-lcb-primary/10 text-lcb-primary mb-6">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
            </svg>
            <span className="font-semibold">Nuestras Ubicaciones</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-serif font-bold text-gray-900 mb-6">
            Dónde Estamos
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Visítanos en cualquiera de nuestras sedes
          </p>
        </div>

        <div className="mb-20">
          <SedesCarousel sedes={contactInfo?.sedes || []} />
        </div>

        <ContactSection contactInfo={contactInfo} />
      </div>
    </div>
  );
}
