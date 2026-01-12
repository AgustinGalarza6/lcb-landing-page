import { CollectionConfig } from "payload";

export const Eventos: CollectionConfig = {
  slug: "eventos",
  admin: {
    useAsTitle: "titulo",
    defaultColumns: ["titulo", "fecha", "lugar", "updatedAt"],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "titulo",
      type: "text",
      required: true,
      label: "Título del Evento",
    },
    {
      name: "descripcion",
      type: "textarea",
      required: true,
      label: "Descripción",
    },
    {
      name: "imagen",
      type: "upload",
      relationTo: "media",
      label: "Imagen del Evento",
    },
    {
      name: "fecha",
      type: "date",
      required: true,
      label: "Fecha del Evento",
      admin: {
        date: {
          pickerAppearance: "dayAndTime",
        },
      },
    },
    {
      name: "fechaFin",
      type: "date",
      label: "Fecha de Finalización",
      admin: {
        date: {
          pickerAppearance: "dayAndTime",
        },
        description: "Para eventos de varios días",
      },
    },
    {
      name: "hora",
      type: "text",
      label: "Hora",
      admin: {
        description: "Ej: 6:00 PM - 9:00 PM",
      },
    },
    {
      name: "lugar",
      type: "text",
      required: true,
      label: "Lugar",
    },
    {
      name: "direccion",
      type: "textarea",
      label: "Dirección Completa",
    },
    {
      name: "tipoEvento",
      type: "select",
      label: "Tipo de Evento",
      required: true,
      options: [
        { label: "Culto Regular", value: "culto" },
        { label: "Convención", value: "convencion" },
        { label: "Retiro", value: "retiro" },
        { label: "Conferencia", value: "conferencia" },
        { label: "Evento Especial", value: "especial" },
        { label: "Actividad Juvenil", value: "juvenil" },
        { label: "Reunión de Oración", value: "oracion" },
      ],
    },
    {
      name: "destacado",
      type: "checkbox",
      label: "Evento Destacado",
      defaultValue: false,
    },
    {
      name: "requiereInscripcion",
      type: "checkbox",
      label: "Requiere Inscripción",
      defaultValue: false,
    },
    {
      name: "linkInscripcion",
      type: "text",
      label: "Link de Inscripción",
      admin: {
        condition: (data) => data.requiereInscripcion === true,
      },
    },
  ],
};
