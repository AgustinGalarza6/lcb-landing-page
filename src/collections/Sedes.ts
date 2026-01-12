import { CollectionConfig } from "payload";

export const Sedes: CollectionConfig = {
  slug: "sedes",
  admin: {
    useAsTitle: "nombre",
    defaultColumns: ["nombre", "ciudad", "telefono", "updatedAt"],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "nombre",
      type: "text",
      required: true,
      label: "Nombre de la Sede",
    },
    {
      name: "ciudad",
      type: "text",
      required: true,
      label: "Ciudad",
    },
    {
      name: "direccion",
      type: "textarea",
      required: true,
      label: "Dirección Completa",
    },
    {
      name: "telefono",
      type: "text",
      label: "Teléfono de Contacto",
      admin: {
        description: "Ej: +54 9 11 1234-5678",
      },
    },
    {
      name: "email",
      type: "email",
      label: "Email de Contacto",
    },
    {
      name: "whatsapp",
      type: "text",
      label: "WhatsApp",
      admin: {
        description: "Número de WhatsApp con código de país (sin +)",
      },
    },
    {
      name: "imagen",
      type: "upload",
      relationTo: "media",
      required: true,
      label: "Foto de la Sede",
    },
    {
      name: "googleMapsUrl",
      type: "text",
      label: "URL de Google Maps",
      admin: {
        description: "Link para indicaciones en Google Maps",
      },
    },
    {
      name: "horarios",
      type: "array",
      label: "Horarios de Servicio",
      fields: [
        {
          name: "dia",
          type: "select",
          required: true,
          label: "Día",
          options: [
            { label: "Lunes", value: "lunes" },
            { label: "Martes", value: "martes" },
            { label: "Miércoles", value: "miércoles" },
            { label: "Jueves", value: "jueves" },
            { label: "Viernes", value: "viernes" },
            { label: "Sábado", value: "sábado" },
            { label: "Domingo", value: "domingo" },
          ],
        },
        {
          name: "tipo",
          type: "text",
          required: true,
          label: "Tipo de Servicio",
          admin: {
            description: "Ej: Culto Principal, Escuela Dominical, Oración",
          },
        },
        {
          name: "hora",
          type: "text",
          required: true,
          label: "Horario",
          admin: {
            description: "Ej: 10:00 AM - 12:00 PM",
          },
        },
      ],
    },
    {
      name: "pastor",
      type: "text",
      label: "Pastor/Líder a Cargo",
    },
    {
      name: "descripcion",
      type: "textarea",
      label: "Descripción de la Sede",
    },
    {
      name: "activa",
      type: "checkbox",
      label: "Sede Activa",
      defaultValue: true,
      admin: {
        description: "Desmarcar si la sede está temporalmente cerrada",
      },
    },
  ],
};
