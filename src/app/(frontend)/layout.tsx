import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata: Metadata = {
  title: "La Casa de la Bendición - Iglesia Cristiana",
  description: "Una comunidad de fe dedicada a vivir y compartir el amor de Dios. Únete a nuestras prédicas, eventos y actividades.",
  keywords: ["iglesia", "fe", "prédicas", "eventos", "comunidad cristiana", "La Casa de la Bendición"],
  openGraph: {
    title: "La Casa de la Bendición",
    description: "Una comunidad de fe dedicada a vivir y compartir el amor de Dios",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${inter.variable} ${playfair.variable}`}>
      <body className="antialiased">
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
