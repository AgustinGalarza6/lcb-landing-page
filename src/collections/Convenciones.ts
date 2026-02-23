import { CollectionConfig } from "payload";

export const Convenciones: CollectionConfig = {
  slug: "convenciones",
  admin: {
    useAsTitle: "titulo",
    defaultColumns: ["titulo", "fechaInicio", "lugar", "updatedAt"],
    group: "Eventos",
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "titulo",
      type: "text",
      required: true,
      label: "Título de la Convención",
    },
    {
      name: "subtitulo",
      type: "text",
      label: "Subtítulo",
      admin: {
        description: "Lema o frase corta de la convención",
      },
    },
    {
      name: "descripcion",
      type: "textarea",
      required: true,
      label: "Descripción Completa",
    },
    {
      name: "imagenPrincipal",
      type: "upload",
      relationTo: "media",
      label: "Imagen Principal",
      admin: {
        description: "Banner principal de la convención (recomendado 1920x1080px)",
      },
    },
    {
      name: "imagenSecundaria",
      type: "upload",
      relationTo: "media",
      label: "Imagen Secundaria",
      admin: {
        description: "Imagen adicional o del lugar",
      },
    },
    {
      name: "fechaInicio",
      type: "date",
      required: true,
      label: "Fecha de Inicio",
      admin: {
        date: {
          pickerAppearance: "dayAndTime",
        },
      },
    },
    {
      name: "fechaFin",
      type: "date",
      required: true,
      label: "Fecha de Finalización",
      admin: {
        date: {
          pickerAppearance: "dayAndTime",
        },
      },
    },
    {
      name: "lugar",
      type: "text",
      required: true,
      label: "Lugar",
    },
    {
      name: "direccionCompleta",
      type: "textarea",
      required: true,
      label: "Dirección Completa",
    },
    {
      name: "ciudad",
      type: "text",
      required: true,
      label: "Ciudad",
    },
    {
      name: "pais",
      type: "text",
      label: "País",
      defaultValue: "Argentina",
    },
    {
      name: "capacidad",
      type: "number",
      label: "Capacidad Estimada",
      admin: {
        description: "Número de asistentes esperados",
      },
    },
    {
      name: "conferencistas",
      type: "array",
      label: "Conferencistas",
      fields: [
        {
          name: "nombre",
          type: "text",
          required: true,
          label: "Nombre del Conferencista",
        },
        {
          name: "ministerio",
          type: "text",
          label: "Ministerio/Iglesia",
        },
        {
          name: "biografia",
          type: "textarea",
          label: "Biografía Breve",
        },
        {
          name: "foto",
          type: "upload",
          relationTo: "media",
          label: "Foto del Conferencista",
        },
      ],
    },
    {
      name: "agenda",
      type: "array",
      label: "Agenda del Evento",
      fields: [
        {
          name: "dia",
          type: "date",
          required: true,
          label: "Día",
        },
        {
          name: "hora",
          type: "text",
          required: true,
          label: "Hora",
        },
        {
          name: "actividad",
          type: "text",
          required: true,
          label: "Actividad",
        },
        {
          name: "descripcionActividad",
          type: "textarea",
          label: "Descripción",
        },
        {
          name: "conferencista",
          type: "text",
          label: "Conferencista",
        },
      ],
    },
    {
      name: "costoGeneral",
      type: "number",
      label: "Costo General",
      admin: {
        description: "Precio de entrada general (0 si es gratis)",
      },
    },
    {
      name: "costoEstudiantes",
      type: "number",
      label: "Costo Estudiantes",
    },
    {
      name: "moneda",
      type: "select",
      label: "Moneda",
      options: [
        { label: "ARS - Peso Argentino", value: "ARS" },
        { label: "USD - Dólar", value: "USD" },
        { label: "Gratis", value: "FREE" },
      ],
      defaultValue: "ARS",
    },
    {
      name: "requiereInscripcion",
      type: "checkbox",
      label: "Requiere Inscripción",
      defaultValue: true,
    },
    {
      name: "linkInscripcion",
      type: "text",
      label: "Link de Inscripción",
      admin: {
        condition: (data) => data.requiereInscripcion === true,
      },
    },
    {
      name: "destacada",
      type: "checkbox",
      label: "Convención Destacada",
      defaultValue: false,
      admin: {
        description: "Mostrar en lugar prominente en la página principal",
      },
    },
    {
      name: "activa",
      type: "checkbox",
      label: "Activa",
      defaultValue: true,
      admin: {
        description: "Desactivar cuando la convención finalice",
      },
    },
    {
      name: "versiculo",
      type: "text",
      label: "Versículo Tema",
      admin: {
        description: "Ej: Hechos 2:42",
      },
    },
    {
      name: "textoVersiculo",
      type: "textarea",
      label: "Texto del Versículo",
    },
    {
      name: "hashtag",
      type: "text",
      label: "Hashtag",
      admin: {
        description: "Para redes sociales (ej: #LCBConvención2026)",
      },
    },
    {
      name: "redesSociales",
      type: "group",
      label: "Redes Sociales del Evento",
      fields: [
        {
          name: "facebook",
          type: "text",
          label: "Facebook Event URL",
        },
        {
          name: "instagram",
          type: "text",
          label: "Instagram",
        },
        {
          name: "youtube",
          type: "text",
          label: "YouTube Live URL",
        },
      ],
    },
  ],
};
