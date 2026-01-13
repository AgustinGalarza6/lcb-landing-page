import { getPayload } from "payload";
import config from "@/payload.config";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import PredicasList from "@/components/PredicasList";
import EventosList from "@/components/EventosList";
import SedesCarousel from "@/components/SedesCarousel";
import ContactSection from "@/components/ContactSection";

export const revalidate = 60; // Revalidar cada 60 segundos

export default async function HomePage() {
  const payload = await getPayload({ config });

  // Obtener datos del CMS con manejo de errores
  let heroData: any = { titulo: "Bienvenidos a La Casa de la Bendición" };
  let contactData: any = { 
    nombreIglesia: "La Casa de la Bendición",
    direccion: "Dirección no configurada",
  };

  try {
    const [hero, predicas, eventos, sedes, contact] = await Promise.all([
      payload.findGlobal({ slug: "hero-section" }).catch(() => null),
      payload.find({
        collection: "predicas",
        limit: 6,
        sort: "-fecha",
      }),
      payload.find({
        collection: "eventos",
        limit: 6,
        sort: "-fecha",
      }),
      payload.find({
        collection: "sedes",
        where: {
          activa: {
            equals: true,
          },
        },
      }),
      payload.findGlobal({ slug: "contact-info" }).catch(() => null),
    ]);

    if (hero) heroData = hero;
    if (contact) contactData = contact;
    const predicasData = predicas;
    const eventosData = eventos;
    const sedesData = sedes;

    // Preparar datos de sedes desde la colección
    const sedesFormateadas = sedesData.docs.map((sede) => ({
      id: String(sede.id),
      nombre: sede.nombre,
      direccion: sede.direccion,
      ciudad: sede.ciudad || undefined,
      telefono: sede.telefono || undefined,
      email: sede.email || undefined,
      whatsapp: sede.whatsapp || undefined,
      googleMapsUrl: sede.googleMapsUrl || undefined,
      imagen:
        sede.imagen && typeof sede.imagen === "object" && sede.imagen.url
          ? sede.imagen.url
          : undefined,
      horarios: sede.horarios?.map((h) => ({
        dia: h.dia || "",
        hora: h.hora || "",
        tipo: h.tipo || "",
      })),
    }));

    return (
      <>
        <Navbar />
        
        <Hero
          titulo={heroData.titulo}
          subtitulo={heroData.subtitulo || undefined}
          imagenFondo={
            heroData.imagenFondo && typeof heroData.imagenFondo === "object" && heroData.imagenFondo.url
              ? heroData.imagenFondo.url
              : undefined
          }
          versiculo={heroData.versiculo || undefined}
          textoVersiculo={heroData.textoVersiculo || undefined}
        />

        {predicasData.docs.length > 0 && (
          <PredicasList
            predicas={predicasData.docs.map((predica) => ({
              id: String(predica.id),
              titulo: predica.titulo,
              descripcion: predica.descripcion || undefined,
              youtubeVideoId: predica.youtubeVideoId,
              predicador: predica.predicador,
              fecha: predica.fecha,
              versiculo: predica.versiculo || undefined,
              miniatura:
                predica.miniatura && typeof predica.miniatura === "object" && predica.miniatura.url
                  ? { url: predica.miniatura.url, alt: predica.miniatura.alt || undefined }
                  : undefined,
            }))}
          />
        )}

        {eventosData.docs.length > 0 && (
          <EventosList
            eventos={eventosData.docs.map((evento) => ({
              id: String(evento.id),
              titulo: evento.titulo,
              descripcion: evento.descripcion,
              fecha: evento.fecha,
              hora: evento.hora || undefined,
              lugar: evento.lugar,
              tipoEvento: evento.tipoEvento,
              imagen:
                evento.imagen && typeof evento.imagen === "object" && evento.imagen.url
                  ? { url: evento.imagen.url, alt: evento.imagen.alt || undefined }
                  : undefined,
            }))}
          />
        )}

        <SedesCarousel sedes={sedesFormateadas} />

        <ContactSection
          contactInfo={{
            nombreIglesia: contactData.nombreIglesia || "La Casa de la Bendición",
            direccion: contactData.direccion,
            ciudad: contactData.ciudad || undefined,
            telefono: contactData.telefono || undefined,
            whatsapp: contactData.whatsapp || undefined,
            email: contactData.email || undefined,
            googleMapsUrl: contactData.googleMapsUrl || undefined,
            horarios: contactData.horarios?.map((h: any) => ({
              dia: h.dia || "",
              hora: h.hora || "",
              tipo: h.tipo || "",
            })),
            redesSociales: contactData.redesSociales ? {
              facebook: contactData.redesSociales.facebook || undefined,
              instagram: contactData.redesSociales.instagram || undefined,
              youtube: contactData.redesSociales.youtube || undefined,
            } : undefined,
          }}
        />
      </>
    );
  } catch (error) {
    console.error("Error loading page data:", error);
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Error al cargar la página</h1>
          <p className="text-gray-600 mb-6">Por favor, asegúrate de que la base de datos esté configurada correctamente.</p>
          <p className="text-sm text-gray-500">Ejecuta: npm run create-admin</p>
        </div>
      </div>
    );
  }
}
