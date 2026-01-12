import { CollectionConfig } from "payload";

export const Predicas: CollectionConfig = {
  slug: "predicas",
  admin: {
    useAsTitle: "titulo",
    defaultColumns: ["titulo", "predicador", "fecha", "updatedAt"],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "titulo",
      type: "text",
      required: true,
      label: "Título de la Prédica",
    },
    {
      name: "descripcion",
      type: "textarea",
      label: "Descripción",
    },
    {
      name: "youtubeVideoId",
      type: "text",
      required: true,
      label: "ID del Video de YouTube",
      admin: {
        description: "Solo el ID del video (ej: dQw4w9WgXcQ)",
      },
    },
    {
      name: "predicador",
      type: "text",
      required: true,
      label: "Predicador",
    },
    {
      name: "fecha",
      type: "date",
      required: true,
      label: "Fecha de la Prédica",
      admin: {
        date: {
          pickerAppearance: "dayOnly",
        },
      },
    },
    {
      name: "miniatura",
      type: "upload",
      relationTo: "media",
      label: "Imagen Miniatura",
      admin: {
        description: "Imagen personalizada para la prédica. Si no se sube, se usará la miniatura de YouTube.",
      },
    },
    {
      name: "apuntes",
      type: "richText",
      label: "Apuntes de la Prédica",
      admin: {
        description: "Contenido y notas de la prédica",
      },
    },
    {
      name: "versiculo",
      type: "text",
      label: "Versículo Principal",
      admin: {
        description: "Ej: Juan 3:16",
      },
    },
    {
      name: "destacada",
      type: "checkbox",
      label: "Destacar en la página principal",
      defaultValue: false,
    },
  ],
};
