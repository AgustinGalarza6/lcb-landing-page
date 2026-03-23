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
  const [error, setError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError(""); // Limpiar error al escribir
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Error al enviar el mensaje');
      }

      setIsSubmitted(true);
      setFormData({ name: "", email: "", phone: "", message: "" });

      setTimeout(() => {
        setIsSubmitted(false);
      }, 5000);
    } catch (err) {
      setError('Hubo un error al enviar el mensaje. Por favor, intenta nuevamente.');
      console.error('Error:', err);
    } finally {
      setIsSubmitting(false);
    }
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
      value: "@lcbcentral",
      href: "https://www.instagram.com/lcbcentral/",
    },
    contactInfo.redesSociales?.facebook && {
      icon: <Facebook className="w-6 h-6" />,
      label: "Facebook",
      value: "La Casa de la Bendición",
      href: "https://www.facebook.com/lcbcentral?locale=es_LA",
    },
    contactInfo.redesSociales?.youtube && {
      icon: <Youtube className="w-6 h-6" />,
      label: "YouTube",
      value: "La Casa de la Bendición",
      href: "https://www.youtube.com/@LCBCENTRAL",
    },
  ].filter(Boolean) as Array<{ icon: React.ReactElement; label: string; value: string; href: string }>;

  return (
    <section id="contacto" className="bg-primary overflow-hidden">
      <div className="grid lg:grid-cols-2 min-h-[90vh]">

        {/* LEFT â€” dark info panel */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative bg-primary px-8 py-20 md:px-16 md:py-24 flex flex-col justify-center"
        >
          {/* Orange accent bar */}
          <div className="absolute top-0 left-0 w-1 h-full bg-black text-white" />

          <div className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-px bg-black text-white" />
              <span className="text-gray-300 text-xs uppercase tracking-[0.3em] font-medium">Visítanos</span>
            </div>
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-serif font-medium text-white leading-[0.9] tracking-tight mb-6">
              Planificá<br /><span className="text-gray-300 italic pr-4">tu Visita</span>
            </h2>
            <p className="text-white/70 text-lg font-light leading-relaxed max-w-sm">
              Queremos conocerte. Somos una comunidad abierta a todos.
            </p>
          </div>

          <div className="space-y-6">
            {/* Address */}
            <div className="flex items-start gap-4 group">
              <div className="w-11 h-11 rounded-none bg-black text-white/10 border border-accent/20 flex items-center justify-center flex-shrink-0 group-hover:bg-black text-white/20 transition-colors">
                <MapPin className="w-5 h-5 text-gray-300" />
              </div>
              <div>
                <p className="text-white/40 text-xs uppercase tracking-wider mb-1">Dirección</p>
                <p className="text-white font-medium">{contactInfo.direccion}</p>
                {contactInfo.ciudad && <p className="text-white/70 text-sm">{contactInfo.ciudad}</p>}
                {contactInfo.googleMapsUrl && (
                  <a href={contactInfo.googleMapsUrl} target="_blank" rel="noopener noreferrer"
                    className="text-gray-300 hover:text-gray-300-dark transition-colors text-sm mt-1 inline-block">
                    Ver en Google Maps â†’
                  </a>
                )}
              </div>
            </div>

            {/* Schedule */}
            {contactInfo.horarios && contactInfo.horarios.length > 0 && (
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-none bg-black text-white/10 border border-accent/20 flex items-center justify-center flex-shrink-0">
                  <Clock className="w-5 h-5 text-gray-300" />
                </div>
                <div className="flex-1">
                  <p className="text-white/40 text-xs uppercase tracking-wider mb-3">Horarios</p>
                  <div className="space-y-2">
                    {contactInfo.horarios.map((h, i) => (
                      <div key={i} className="flex justify-between items-center border-b border-white/5 pb-2">
                        <div>
                          <p className="text-white text-sm font-medium capitalize">{h.dia}</p>
                          <p className="text-white/50 text-xs">{h.tipo}</p>
                        </div>
                        <p className="text-gray-300 font-medium text-sm">{h.hora}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Contact links */}
            {contactDetails.slice(0, 3).map((item, i) => (
              <div key={i} className="flex items-center gap-4 group">
                <div className="w-11 h-11 rounded-none bg-black text-white/10 border border-accent/20 flex items-center justify-center flex-shrink-0 group-hover:bg-black text-white/20 transition-colors">
                  <span className="text-gray-300">{item.icon}</span>
                </div>
                <div>
                  <p className="text-white/40 text-xs uppercase tracking-wider mb-0.5">{item.label}</p>
                  <a href={item.href} target={item.href.startsWith("http") ? "_blank" : undefined}
                    rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="text-white hover:text-gray-300 transition-colors text-sm font-medium">
                    {item.value}
                  </a>
                </div>
              </div>
            ))}

            {/* Social row */}
            <div className="flex items-center gap-3 pt-4">
              {contactInfo.redesSociales?.facebook && (
                <a href={contactInfo.redesSociales.facebook} target="_blank" rel="noopener noreferrer"
                  className="w-10 h-10 rounded-none bg-white/5 hover:bg-black text-white border border-white/10 hover:border-accent flex items-center justify-center transition-all duration-300">
                  <Facebook className="w-4 h-4 text-white" />
                </a>
              )}
              {contactInfo.redesSociales?.instagram && (
                <a href={contactInfo.redesSociales.instagram} target="_blank" rel="noopener noreferrer"
                  className="w-10 h-10 rounded-none bg-white/5 hover:bg-black text-white border border-white/10 hover:border-accent flex items-center justify-center transition-all duration-300">
                  <Instagram className="w-4 h-4 text-white" />
                </a>
              )}
              {contactInfo.redesSociales?.youtube && (
                <a href={contactInfo.redesSociales.youtube} target="_blank" rel="noopener noreferrer"
                  className="w-10 h-10 rounded-none bg-white/5 hover:bg-black text-white border border-white/10 hover:border-accent flex items-center justify-center transition-all duration-300">
                  <Youtube className="w-4 h-4 text-white" />
                </a>
              )}
            </div>
          </div>
        </motion.div>

        {/* RIGHT â€” form panel */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="bg-white px-8 py-20 md:px-16 md:py-24 flex flex-col justify-center"
        >
          <div className="max-w-lg w-full mx-auto">
            <h3 className="text-4xl font-serif text-primary mb-3 leading-[0.9] tracking-tight">Envíanos un mensaje</h3>
            <p className="text-secondary font-light mb-10 text-balance">Un líder de nuestro equipo se comunicará contigo lo antes posible para acompañarte.</p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-xs font-medium text-secondary uppercase tracking-[0.1em] mb-2">Nombre *</label>
                  <input
                    type="text" id="name" name="name" required
                    value={formData.name} onChange={handleChange}
                    className="w-full px-4 py-4 bg-white border border-gray-200 rounded-lg text-primary placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all shadow-sm text-sm"
                    placeholder="Tu nombre"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-xs font-medium text-secondary uppercase tracking-[0.1em] mb-2">Email *</label>
                  <input
                    type="email" id="email" name="email" required
                    value={formData.email} onChange={handleChange}
                    className="w-full px-4 py-4 bg-white border border-gray-200 rounded-lg text-primary placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all shadow-sm text-sm"
                    placeholder="tu@email.com"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="phone" className="block text-xs font-medium text-secondary uppercase tracking-[0.1em] mb-2">Teléfono</label>
                <input
                  type="tel" id="phone" name="phone"
                  value={formData.phone} onChange={handleChange}
                  className="w-full px-4 py-4 bg-white border border-gray-200 rounded-lg text-primary placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all shadow-sm text-sm"
                  placeholder="+54 9 11 1234-5678"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-xs font-medium text-secondary uppercase tracking-[0.1em] mb-2">Â¿Cómo podemos ayudarte? *</label>
                <textarea
                  id="message" name="message" required rows={5}
                  value={formData.message} onChange={handleChange}
                  className="w-full px-4 py-4 bg-white border border-gray-200 rounded-lg text-primary placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all shadow-sm resize-none text-sm"
                  placeholder="Contanos tu consulta..."
                />
              </div>

              {error && (
                <div className="p-4 bg-red-900/30 border border-red-500/30 rounded-lg text-red-400 text-sm">{error}</div>
              )}
              {isSubmitted && (
                <div className="p-4 bg-green-900/30 border border-green-500/30 rounded-lg text-green-400 text-sm">Â¡Mensaje enviado exitosamente! Te contactaremos pronto.</div>
              )}

              <button
                type="submit"
                disabled={isSubmitting || isSubmitted}
                className="w-full bg-black text-white py-4 px-6 rounded-full font-medium tracking-wide shadow-sm hover:shadow-md hover:bg-black text-white-dark transition-all duration-500 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-4"
              >
                {isSubmitting ? "Enviando..." : isSubmitted ? "Â¡Mensaje enviado!" : (<>Enviar mensaje <Send className="w-4 h-4" /></>)}
              </button>
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
