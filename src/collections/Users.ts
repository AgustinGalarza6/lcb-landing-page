import type { CollectionConfig } from "payload";

export const Users: CollectionConfig = {
  slug: "users",
  auth: true,
  admin: {
    useAsTitle: "email",
    group: "Admin",
    description: "Usuarios con acceso al panel de administración",
  },
  fields: [
    {
      name: "name",
      type: "text",
      label: "Nombre",
    },
    {
      name: "role",
      type: "select",
      label: "Rol",
      options: [
        { label: "Administrador", value: "admin" },
        { label: "Editor", value: "editor" },
      ],
      defaultValue: "editor",
      required: true,
    },
  ],
};
