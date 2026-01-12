"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Clock, Facebook, Instagram, Youtube, Send } from "lucide-react";

interface ContactSectionProps {
  contactInfo: {
    nombreIglesia: string;
    direccion: string;
    ciudad?: string;
    telefono?: string;
    whatsapp?: string;
    email?: string;
    googleMapsUrl?: string;
    horarios?: Array<{
      dia: string;
      hora: string;
      tipo: string;
    }>;
    redesSociales?: {
      facebook?: string;
      instagram?: string;
      youtube?: string;
    };
  };
}

export default function ContactSection({ contactInfo }: ContactSectionProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simular envío (puedes conectar con tu backend)
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitted(true);
    setFormData({ name: "", email: "", phone: "", message: "" });

    setTimeout(() => {
      setIsSubmitted(false);
    }, 3000);
    
    setIsSubmitting(false);
  };

  const contactDetails = [
    {
      icon: <Phone className="w-6 h-6" />,
      label: contactInfo.whatsapp ? "WhatsApp" : "Teléfono",
      value: contactInfo.whatsapp || contactInfo.telefono || "",
      href: contactInfo.whatsapp 
        ? `https://wa.me/${contactInfo.whatsapp.replace(/[^0-9]/g, '')}` 
        : `tel:${contactInfo.telefono}`,
    },
    {
      icon: <Mail className="w-6 h-6" />,
      label: "Email",
      value: contactInfo.email || "",
      href: `mailto:${contactInfo.email}`,
    },
    contactInfo.redesSociales?.instagram && {
      icon: <Instagram className="w-6 h-6" />,
      label: "Instagram",
      value: "@lacasadelabendicion",
      href: contactInfo.redesSociales.instagram,
    },
    contactInfo.redesSociales?.facebook && {
      icon: <Facebook className="w-6 h-6" />,
      label: "Facebook",
      value: contactInfo.nombreIglesia,
      href: contactInfo.redesSociales.facebook,
    },
    contactInfo.redesSociales?.youtube && {
      icon: <Youtube className="w-6 h-6" />,
      label: "YouTube",
      value: "@lacasadelabendicion",
      href: contactInfo.redesSociales.youtube,
    },
  ].filter(Boolean) as Array<{ icon: React.ReactElement; label: string; value: string; href: string }>;

  return (
    <section id="contacto" className="py-20 bg-white">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-block px-4 py-2 bg-gray-100 rounded-full mb-4">
            <span className="text-sm font-semibold text-gray-900">Contacto</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Conectate con Nosotros
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Nos encantaría escucharte. Completá el formulario o contactanos directamente.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Contact info - 2 columnas */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-2 space-y-6"
          >
            {contactDetails.map((item, index) => (
              <div key={index} className="flex items-start gap-4">
                <div className="w-14 h-14 bg-gray-100 rounded-xl flex items-center justify-center text-gray-900 flex-shrink-0">
                  {item.icon}
                </div>
                <div>
                  <p className="text-sm text-gray-500">{item.label}</p>
                  <a
                    href={item.href}
                    target={item.href.startsWith("http") ? "_blank" : undefined}
                    rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="font-semibold text-gray-900 hover:text-gray-600 transition-colors"
                  >
                    {item.value}
                  </a>
                </div>
              </div>
            ))}

            {/* Horarios */}
            {contactInfo.horarios && contactInfo.horarios.length > 0 && (
              <div className="pt-6">
                <div className="flex items-center gap-3 mb-4">
                  <Clock className="w-6 h-6 text-gray-900" />
                  <h3 className="text-lg font-bold text-gray-900">Horarios de Reuniones</h3>
                </div>
                <div className="space-y-3">
                  {contactInfo.horarios.map((horario, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center border-b border-gray-200 pb-2"
                    >
                      <div>
                        <p className="font-semibold capitalize text-gray-900">{horario.dia}</p>
                        <p className="text-sm text-gray-500">{horario.tipo}</p>
                      </div>
                      <p className="text-gray-900 font-semibold">{horario.hora}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Dirección */}
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 bg-gray-100 rounded-xl flex items-center justify-center text-gray-900 flex-shrink-0">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Dirección</p>
                <p className="font-semibold text-gray-900">{contactInfo.direccion}</p>
                {contactInfo.ciudad && (
                  <p className="text-gray-600">{contactInfo.ciudad}</p>
                )}
                {contactInfo.googleMapsUrl && (
                  <a
                    href={contactInfo.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-gray-900 transition-colors text-sm mt-1 inline-block"
                  >
                    Ver en Google Maps →
                  </a>
                )}
              </div>
            </div>
          </motion.div>

          {/* Form - 3 columnas */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-3"
          >
            <form
              onSubmit={handleSubmit}
              className="bg-gray-50 rounded-2xl p-6 md:p-8"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Nombre *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all"
                    placeholder="Tu nombre"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all"
                    placeholder="tu@email.com"
                  />
                </div>
              </div>

              <div className="mb-4">
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Teléfono
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all"
                  placeholder="+54 9 11 1234-5678"
                />
              </div>

              <div className="mb-6">
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Mensaje *
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all resize-none"
                  placeholder="Contanos cómo podemos ayudarte..."
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting || isSubmitted}
                className="w-full bg-gray-900 text-white py-4 px-6 rounded-lg font-semibold hover:bg-gray-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  "Enviando..."
                ) : isSubmitted ? (
                  "¡Mensaje enviado!"
                ) : (
                  <>
                    Enviar mensaje
                    <Send className="w-5 h-5" />
                  </>
                )}
              </button>

              <p className="text-sm text-gray-500 text-center mt-4">
                Al enviar este formulario aceptás nuestra política de privacidad.
              </p>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
