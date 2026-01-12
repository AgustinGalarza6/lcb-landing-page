import { CollectionConfig } from "payload";

export const Devocionales: CollectionConfig = {
  slug: "devocionales",
  admin: {
    useAsTitle: "titulo",
    defaultColumns: ["titulo", "autor", "fecha", "updatedAt"],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "titulo",
      type: "text",
      required: true,
      label: "Título del Devocional",
    },
    {
      name: "autor",
      type: "text",
      required: true,
      label: "Autor (Pastor/Líder)",
    },
    {
      name: "fecha",
      type: "date",
      required: true,
      label: "Fecha de Publicación",
      admin: {
        date: {
          pickerAppearance: "dayOnly",
        },
      },
    },
    {
      name: "imagenPortada",
      type: "upload",
      relationTo: "media",
      label: "Imagen de Portada",
    },
    {
      name: "extracto",
      type: "textarea",
      label: "Extracto",
      admin: {
        description: "Resumen breve del devocional",
      },
    },
    {
      name: "contenido",
      type: "richText",
      required: true,
      label: "Contenido del Devocional",
    },
    {
      name: "versiculoPrincipal",
      type: "text",
      label: "Versículo Principal",
      admin: {
        description: "Ej: Salmos 23:1",
      },
    },
    {
      name: "textoVersiculo",
      type: "textarea",
      label: "Texto del Versículo",
    },
    {
      name: "categoria",
      type: "select",
      label: "Categoría",
      options: [
        { label: "Reflexión Diaria", value: "diaria" },
        { label: "Estudio Bíblico", value: "estudio" },
        { label: "Testimonio", value: "testimonio" },
        { label: "Oración", value: "oracion" },
        { label: "Enseñanza", value: "ensenanza" },
      ],
      defaultValue: "diaria",
    },
    {
      name: "destacado",
      type: "checkbox",
      label: "Destacar en la página principal",
      defaultValue: false,
    },
  ],
};
