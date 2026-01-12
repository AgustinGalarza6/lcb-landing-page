import { getPayload } from "payload";
import config from "@/payload.config";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import PredicasList from "@/components/PredicasList";
import EventosList from "@/components/EventosList";
import DevocionalList from "@/components/DevocionalList";
import SedesCarousel from "@/components/SedesCarousel";
import ContactSection from "@/components/ContactSection";

export const revalidate = 60; // Revalidar cada 60 segundos

export default async function HomePage() {
  const payload = await getPayload({ config });

  // Obtener datos del CMS
  const [heroData, predicasData, eventosData, devocionalesData, sedesData, contactData] = await Promise.all([
    payload.findGlobal({ slug: "hero-section" }),
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
      collection: "devocionales",
      limit: 4,
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
    payload.findGlobal({ slug: "contact-info" }),
  ]);

  // Preparar datos de sedes desde la colección
  const sedes = sedesData.docs.map((sede) => ({
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

      {devocionalesData.docs.length > 0 && (
        <DevocionalList
          devocionales={devocionalesData.docs.map((dev) => ({
            id: String(dev.id),
            titulo: dev.titulo,
            extracto: dev.extracto || undefined,
            autor: dev.autor,
            fecha: dev.fecha,
            imagenPortada:
              dev.imagenPortada && typeof dev.imagenPortada === "object" && dev.imagenPortada.url
                ? { url: dev.imagenPortada.url, alt: dev.imagenPortada.alt || undefined }
                : undefined,
            categoria: dev.categoria || "diaria",
          }))}
        />
      )}

      <SedesCarousel sedes={sedes} />

      <ContactSection
        contactInfo={{
          nombreIglesia: contactData.nombreIglesia || "La Casa de la Bendición",
          direccion: contactData.direccion,
          ciudad: contactData.ciudad || undefined,
          telefono: contactData.telefono || undefined,
          whatsapp: contactData.whatsapp || undefined,
          email: contactData.email || undefined,
          googleMapsUrl: contactData.googleMapsUrl || undefined,
          horarios: contactData.horarios?.map(h => ({
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
}
