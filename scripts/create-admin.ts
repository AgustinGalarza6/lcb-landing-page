import dotenv from "dotenv";
import path from "path";

// Cargar variables de entorno PRIMERO
dotenv.config({ path: path.resolve(process.cwd(), ".env") });

// Verificar que el secret exista
if (!process.env.PAYLOAD_SECRET) {
  console.error("❌ Error: PAYLOAD_SECRET no está definido en .env");
  process.exit(1);
}

import { getPayloadHMR } from "@payloadcms/next/utilities";
import configPromise from "@payload-config";

async function createAdmin() {
  const payload = await getPayloadHMR({ config: configPromise });

  const email = "admin@lacasadelabendicion.com";
  const password = "admin123456"; // Cambia esto por una contraseña segura

  try {
    const user = await payload.create({
      collection: "users",
      data: {
        email,
        password,
        name: "Administrador",
        roles: ["admin"],
      },
    });

    console.log("✅ Usuario administrador creado exitosamente!");
    console.log(`Email: ${email}`);
    console.log(`Password: ${password}`);
    console.log("\n⚠️  IMPORTANTE: Cambia la contraseña después de iniciar sesión");
  } catch (error: any) {
    if (error.message?.includes("duplicate")) {
      console.log("❌ El usuario ya existe. Usa estos datos para iniciar sesión:");
      console.log(`Email: ${email}`);
      console.log(`Password: ${password}`);
    } else {
      console.error("❌ Error al crear usuario:", error.message);
    }
  }

  process.exit(0);
}

createAdmin();
