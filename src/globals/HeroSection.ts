import { GlobalConfig } from "payload";

export const HeroSection: GlobalConfig = {
  slug: "hero-section",
  label: "Hero Section",
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "titulo",
      type: "text",
      required: true,
      label: "Título Principal",
      defaultValue: "Bienvenidos a\nLa Casa de la Bendición",
    },
    {
      name: "subtitulo",
      type: "textarea",
      label: "Subtítulo",
      admin: {
        description: "Texto secundario debajo del título principal",
      },
      defaultValue: "Un lugar donde experimentas el amor de Dios y encuentras comunidad",
    },
    {
      name: "imagenFondo",
      type: "upload",
      relationTo: "media",
      label: "Imagen de Fondo",
      admin: {
        description: "Imagen de fondo del Hero (recomendado 1920x1080px)",
      },
    },
    {
      name: "versiculo",
      type: "text",
      label: "Referencia del Versículo",
      admin: {
        description: "Ej: Juan 3:16",
      },
    },
    {
      name: "textoVersiculo",
      type: "textarea",
      label: "Texto del Versículo",
      admin: {
        description: "El texto completo del versículo bíblico",
      },
    },
  ],
};
