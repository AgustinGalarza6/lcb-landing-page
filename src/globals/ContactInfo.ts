import { GlobalConfig } from "payload";

export const ContactInfo: GlobalConfig = {
  slug: "contact-info",
  label: "Información de Contacto",
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "nombreIglesia",
      type: "text",
      label: "Nombre de la Iglesia",
      defaultValue: "La Casa de la Bendición",
    },
    {
      name: "direccion",
      type: "textarea",
      required: true,
      label: "Dirección",
    },
    {
      name: "ciudad",
      type: "text",
      label: "Ciudad",
    },
    {
      name: "pais",
      type: "text",
      label: "País",
    },
    {
      name: "telefono",
      type: "text",
      label: "Teléfono",
    },
    {
      name: "whatsapp",
      type: "text",
      label: "WhatsApp",
    },
    {
      name: "email",
      type: "email",
      label: "Email",
    },
    {
      name: "googleMapsUrl",
      type: "text",
      label: "URL de Google Maps",
      admin: {
        description: "Link de ubicación en Google Maps",
      },
    },
    {
      name: "horarios",
      type: "array",
      label: "Horarios de Reuniones",
      fields: [
        {
          name: "dia",
          type: "select",
          label: "Día",
          options: [
            { label: "Lunes", value: "lunes" },
            { label: "Martes", value: "martes" },
            { label: "Miércoles", value: "miercoles" },
            { label: "Jueves", value: "jueves" },
            { label: "Viernes", value: "viernes" },
            { label: "Sábado", value: "sabado" },
            { label: "Domingo", value: "domingo" },
          ],
        },
        {
          name: "hora",
          type: "text",
          label: "Hora",
        },
        {
          name: "tipo",
          type: "text",
          label: "Tipo de Reunión",
        },
      ],
    },
    {
      name: "redesSociales",
      type: "group",
      label: "Redes Sociales",
      fields: [
        {
          name: "facebook",
          type: "text",
          label: "Facebook",
        },
        {
          name: "instagram",
          type: "text",
          label: "Instagram",
        },
        {
          name: "youtube",
          type: "text",
          label: "YouTube",
        },
        {
          name: "twitter",
          type: "text",
          label: "Twitter/X",
        },
        {
          name: "tiktok",
          type: "text",
          label: "TikTok",
        },
      ],
    },
  ],
};
