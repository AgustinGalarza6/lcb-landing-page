import { buildConfig } from "payload";
import { sqliteAdapter } from "@payloadcms/db-sqlite";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import path from "path";
import { fileURLToPath } from "url";
import sharp from "sharp";

// Collections
import { Users } from "./collections/Users";
import { Predicas } from "./collections/Predicas";
import { Eventos } from "./collections/Eventos";
import { Devocionales } from "./collections/Devocionales";
import { Sedes } from "./collections/Sedes";
import { Media } from "./collections/Media";

// Globals
import { ContactInfo } from "./globals/ContactInfo";
import { HeroSection } from "./globals/HeroSection";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    meta: {
      titleSuffix: " - La Casa de la Bendición",
    },
  },
  collections: [Users, Predicas, Eventos, Devocionales, Sedes, Media],
  globals: [ContactInfo, HeroSection],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || "tu-clave-super-secreta-cambiala-por-algo-aleatorio-y-seguro-2026",
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
  db: sqliteAdapter({
    client: {
      url: process.env.DATABASE_URI || "file:./database.db",
    },
  }),
  sharp,
});
