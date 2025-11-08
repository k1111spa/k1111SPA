"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"

export default function KLifeSpaPage() {
  const [language, setLanguage] = useState<"es" | "en">("es")
  const [showFacialServices, setShowFacialServices] = useState(false)
  const [showBodyServices, setShowBodyServices] = useState(false)
  const [formResult, setFormResult] = useState("")

  const toggleLanguage = () => {
    setLanguage(language === "es" ? "en" : "es")
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setFormResult("Enviando...")

    const formData = new FormData(event.currentTarget)
    formData.append("access_key", "df27a237-4c41-4f23-bd2f-1fcb9879891f")

    // Email de confirmación automático al cliente
    formData.append("autoresponse", "true")

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      })

      const data = await response.json()

      if (data.success) {
        setFormResult(language === "es" ? "¡Mensaje enviado exitosamente! Hemos enviado un correo de confirmación a tu email. Te contactaremos pronto." : "Message sent successfully! We've sent a confirmation email to your inbox. We'll contact you soon.")
        event.currentTarget.reset()
      } else {
        setFormResult(language === "es" ? `Error: ${data.message || "Por favor intenta de nuevo."}` : `Error: ${data.message || "Please try again."}`)
      }
    } catch (error) {
      setFormResult(language === "es" ? "Error al enviar el mensaje. Por favor intenta de nuevo." : "Error sending message. Please try again.")
    }

    // Clear message after 8 seconds
    setTimeout(() => setFormResult(""), 8000)
  }

  const content = {
    es: {
      nav: {
        services: "Servicios",
        contact: "Contacto",
        bookNow: "Reservar Cita",
      },
      hero: {
        businessName: "K Life 1111",
        profession: "Esthetician & Massage Therapist",
        owner: "Kimberly Alcantara",
        phone: "305.680.6500",
        location: "Coral Gables",
        discount: "20% OFF",
        tagline: "AESTHETIC & SPA",
        cta: "Reserva tu cita",
      },
      facialServices: {
        title: "Tratamientos Faciales",
        subtitle: "Limpieza profunda con:",
        description: "3 métodos distintos de limpieza facial profunda de acuerdo al tipo de piel de la persona y lo que necesite",
        services: [
          {
            name: "Dermaplaning",
            description: "",
            benefits: [
              "Deja la piel más suave y luminosa",
              "Mejora la textura y la uniformidad del tono",
              "Permite que los productos cosméticos penetren mejor",
              "Estimula la renovación celular"
            ]
          },
          {
            name: "Hidrafacial",
            description: "",
            benefits: [
              "Limpia y desobstruye los poros",
              "Hidrata y suaviza la piel",
              "Mejora la textura y luminosidad",
              "Reduce la apariencia de líneas finas, manchas y poros dilatados",
              "Es apto para todo tipo de piel, incluso sensible"
            ]
          },
          {
            name: "Microdermoabrasión",
            description: "",
            benefits: [
              "Suaviza la textura de la piel",
              "Mejora el aspecto de manchas, cicatrices leves, arrugas finas y poros dilatados",
              "Estimula la producción de colágeno y elastina",
              "Favorece la renovación celular",
              "Deja la piel más luminosa y uniforme"
            ]
          },
          {
            name: "Peeling Químico",
            description: "Tratamiento estético que renueva las capas superficiales de la piel mediante la aplicación de ácidos o sustancias químicas controladas. Su objetivo es mejorar la textura, el tono y el aspecto general de la piel.",
            benefits: []
          },
        ],
      },
      bodyServices: {
        title: "Tratamientos Corporales",
        services: [
          {
            name: "Venus Legacy",
            description: "Tratamiento estético no invasivo",
            benefits: [
              "Reafirma la piel (rostro, cuello, abdomen, brazos, glúteos, piernas)",
              "Reduce la flacidez y mejora la textura",
              "Disminuye la apariencia de celulitis",
              "Define el contorno facial y corporal",
              "Estimula la producción de colágeno natural"
            ]
          },
        ],
      },
      contact: {
        title: "Contáctanos",
        subtitle: "Agenda tu cita hoy",
        form: {
          name: "Nombre completo",
          email: "Correo electrónico",
          phone: "Teléfono",
          service: "Servicio de interés",
          message: "Mensaje",
          submit: "Enviar solicitud",
        },
      },
      footer: {
        hours: "Horario",
        hoursText: "Lunes - Sábado: 9:00 AM - 7:00 PM",
        sundayText: "Domingo: Cerrado",
        contact: "Contacto",
        rights: "Todos los derechos reservados.",
      },
      pricing: "Consulta por precio",
    },
    en: {
      nav: {
        services: "Services",
        contact: "Contact",
        bookNow: "Book Now",
      },
      hero: {
        businessName: "K Life 1111",
        profession: "Esthetician & Massage Therapist",
        owner: "Kimberly Alcantara",
        phone: "305.680.6500",
        location: "Coral Gables",
        discount: "20% OFF",
        tagline: "AESTHETIC & SPA",
        cta: "Book your appointment",
      },
      facialServices: {
        title: "Facial Treatments",
        subtitle: "Deep cleansing with:",
        description: "3 different methods of deep facial cleansing according to the person's skin type and needs",
        services: [
          {
            name: "Dermaplaning",
            description: "",
            benefits: [
              "Leaves skin softer and brighter",
              "Improves texture and tone uniformity",
              "Allows better penetration of cosmetic products",
              "Stimulates cellular renewal"
            ]
          },
          {
            name: "Hydrafacial",
            description: "",
            benefits: [
              "Cleanses and unclogs pores",
              "Hydrates and softens skin",
              "Improves texture and luminosity",
              "Reduces the appearance of fine lines, spots and enlarged pores",
              "Suitable for all skin types, even sensitive"
            ]
          },
          {
            name: "Microdermabrasion",
            description: "",
            benefits: [
              "Smooths skin texture",
              "Improves appearance of spots, mild scars, fine wrinkles and enlarged pores",
              "Stimulates collagen and elastin production",
              "Promotes cellular renewal",
              "Leaves skin more luminous and even"
            ]
          },
          {
            name: "Chemical Peel",
            description: "Aesthetic treatment that renews the superficial layers of the skin through the application of controlled acids or chemical substances. Its goal is to improve texture, tone, and overall skin appearance.",
            benefits: []
          },
        ],
      },
      bodyServices: {
        title: "Body Treatments",
        services: [
          {
            name: "Venus Legacy",
            description: "Non-invasive aesthetic treatment",
            benefits: [
              "Firms the skin (face, neck, abdomen, arms, buttocks, legs)",
              "Reduces sagging and improves texture",
              "Diminishes the appearance of cellulite",
              "Defines facial and body contour",
              "Stimulates natural collagen production"
            ]
          },
        ],
      },
      contact: {
        title: "Contact Us",
        subtitle: "Schedule your appointment today",
        form: {
          name: "Full name",
          email: "Email",
          phone: "Phone",
          service: "Service of interest",
          message: "Message",
          submit: "Send request",
        },
      },
      footer: {
        hours: "Hours",
        hoursText: "Monday - Saturday: 9:00 AM - 7:00 PM",
        sundayText: "Sunday: Closed",
        contact: "Contact",
        rights: "All rights reserved.",
      },
      pricing: "Contact for pricing",
    },
  }

  const t = content[language]

  return (
    <div className="min-h-screen relative">
      {/* Background Video */}
      <div className="fixed inset-0 w-full h-full z-0 overflow-hidden">
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster=""
          className="w-full h-full object-cover"
          style={{
            minWidth: '100%',
            minHeight: '100%',
            width: 'auto',
            height: 'auto',
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)'
          }}
        >
          <source src="/videos/background/banner-pagina-compressed.mp4" type="video/mp4" />
          Tu navegador no soporta video HTML5.
        </video>
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-black/20 pointer-events-none"></div>
      </div>

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm shadow-sm z-50">
        <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/KLIFE1111-logo-vJzBHAa1bg12eKU4qfT6dGb4IFJ3oq.png"
              alt="K Life Spa Logo"
              width={120}
              height={60}
              className="h-12 w-auto"
            />
          </div>
          <div className="flex items-center gap-6">
            <a href="#services" className="text-gray-700 hover:text-[#B3E0DC] transition-colors font-medium">
              {t.nav.services}
            </a>
            <a href="#contact" className="text-gray-700 hover:text-[#B3E0DC] transition-colors font-medium">
              {t.nav.contact}
            </a>
            <Link
              href="/booking"
              className="px-6 py-2 bg-gradient-to-r from-teal-500 to-teal-600 text-white rounded-full hover:from-teal-600 hover:to-teal-700 transition-all shadow-md hover:shadow-lg font-semibold"
            >
              {t.nav.bookNow}
            </Link>
            <button
              onClick={toggleLanguage}
              className="px-4 py-2 bg-[#B3E0DC] text-gray-900 rounded-full hover:bg-[#9BCCC8] transition-colors font-medium"
            >
              {language === "es" ? "ES" : "EN"}
            </button>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="relative z-10 pt-24 pb-16 px-4 backdrop-blur-sm" style={{ background: 'linear-gradient(45deg, rgba(125, 211, 192, 0.7) 0%, rgba(179, 224, 220, 0.6) 50%, rgba(217, 240, 238, 0.5) 100%)' }}>
        <div className="container mx-auto max-w-6xl">
          {/* Logo centrado */}
          <div className="w-full max-w-md mx-auto mb-8">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/KLIFE1111-logo-OrZz7hBKj2TTuXjj6DRAtgi1p9IYZE.png"
              alt="K Life 1111 Logo"
              width={400}
              height={200}
              className="w-full h-auto"
              priority
            />
          </div>

          {/* Tagline */}
          <div className="text-center mb-12">
            <p className="text-4xl md:text-5xl text-white tracking-wide drop-shadow-lg" style={{ fontFamily: "'Californian Signature', cursive" }}>
              — A special space for you —
            </p>
          </div>

          {/* Layout en dos columnas: Foto + Info */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12 mb-8">
            {/* Foto de Kimberly - SIN círculo, rectangular con bordes redondeados */}
            <div className="w-64 md:w-80 overflow-hidden rounded-3xl shadow-2xl border-4 border-white">
              <Image
                src="/images/kimberly-photo.jpg"
                alt="Kimberly Alcantara"
                width={400}
                height={500}
                className="w-full h-auto object-cover"
              />
            </div>

            {/* Información profesional */}
            <div className="text-center md:text-left space-y-4">
              <h1 className="text-4xl md:text-5xl text-white font-bold drop-shadow-lg">{t.hero.owner}</h1>
              <p className="text-2xl md:text-3xl text-white italic drop-shadow-md">{t.hero.profession}</p>

              {/* Contact Info */}
              <div className="flex flex-col gap-3 text-white pt-4">
                <div className="flex items-center justify-center md:justify-start gap-3">
                  <svg className="w-6 h-6 text-white flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                  <span className="text-xl md:text-2xl font-semibold drop-shadow-md">{t.hero.phone}</span>
                </div>
                <div className="flex items-center justify-center md:justify-start gap-3">
                  <svg className="w-6 h-6 text-white flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-xl md:text-2xl font-semibold drop-shadow-md">{t.hero.location}</span>
                </div>
              </div>

              {/* CTA Button */}
              <a
                href="#contact"
                className="inline-block px-8 py-3 bg-[#B3E0DC] text-gray-900 rounded-full hover:bg-[#9BCCC8] transition-all font-semibold text-lg shadow-md hover:shadow-lg hover:scale-105 mt-6"
              >
                {t.hero.cta}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="relative z-10 py-20 px-4 backdrop-blur-sm" style={{ background: 'linear-gradient(135deg, rgba(217, 240, 238, 0.6) 0%, rgba(179, 224, 220, 0.5) 50%, rgba(125, 211, 192, 0.6) 100%)' }}>
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl font-bold text-center text-white mb-12 drop-shadow-lg">Nuestros Tratamientos</h2>

          {/* Service Toggle Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <button
              onClick={() => {
                setShowFacialServices(!showFacialServices)
                setShowBodyServices(false)
              }}
              className="px-8 py-4 bg-[#B3E0DC] text-gray-900 rounded-full hover:bg-[#9BCCC8] transition-all font-semibold text-lg shadow-md hover:shadow-lg hover:scale-105"
            >
              {t.facialServices.title}
            </button>
            <button
              onClick={() => {
                setShowBodyServices(!showBodyServices)
                setShowFacialServices(false)
              }}
              className="px-8 py-4 bg-[#D4AF87] text-white rounded-full hover:bg-[#C19A6B] transition-all font-semibold text-lg shadow-md hover:shadow-lg hover:scale-105"
            >
              {t.bodyServices.title}
            </button>
          </div>

          {/* Facial Services Content */}
          {showFacialServices && (
            <div className="animate-fadeIn">
              <div className="text-center mb-8">
                <p className="text-xl text-gray-700 italic">{t.facialServices.subtitle}</p>
                <p className="text-gray-600 mt-2">{t.facialServices.description}</p>
              </div>
              <div className="grid md:grid-cols-2 gap-8">
                {t.facialServices.services.map((service: any, index: number) => {
                  const imagePaths = [
                    "/images/services/facial/facial-cleansing.jpg",
                    "/images/services/facial/hydrafacial.jpg",
                    "/images/services/facial/microdermabrasion.jpg",
                    "/images/services/facial/chemical-peel.jpg",
                  ]
                  return (
                    <div
                      key={index}
                      className="bg-gradient-to-br from-[#D9F0EE] to-white p-8 rounded-2xl shadow-lg border border-[#B3E0DC]"
                    >
                      <div className="mb-6 overflow-hidden rounded-xl">
                        <Image
                          src={imagePaths[index] || "/images/placeholders/placeholder.svg"}
                          alt={service.name}
                          width={600}
                          height={400}
                          className="w-full h-64 object-cover"
                        />
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-3">{service.name}</h3>
                      {service.description && (
                        <p className="text-gray-700 mb-4 leading-relaxed">{service.description}</p>
                      )}
                      {service.benefits && service.benefits.length > 0 && (
                        <div className="mt-4">
                          <h4 className="font-semibold text-[#B3E0DC] mb-2">Beneficios:</h4>
                          <ul className="list-disc list-inside space-y-1 text-gray-600">
                            {service.benefits.map((benefit: string, i: number) => (
                              <li key={i}>{benefit}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          )}

          {/* Body Services Content */}
          {showBodyServices && (
            <div className="animate-fadeIn">
              <div className="grid md:grid-cols-1 gap-8">
                {t.bodyServices.services.map((service: any, index: number) => {
                  return (
                    <div
                      key={index}
                      className="bg-gradient-to-br from-[#D9F0EE] to-white p-8 rounded-2xl shadow-lg border border-[#D4AF87]"
                    >
                      <div className="mb-6 overflow-hidden rounded-xl">
                        <Image
                          src="https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=1200&h=600&fit=crop"
                          alt={service.name}
                          width={1200}
                          height={600}
                          className="w-full h-80 object-cover"
                        />
                      </div>
                      <h3 className="text-3xl font-bold text-gray-900 mb-3">{service.name}</h3>
                      {service.description && (
                        <p className="text-xl text-gray-700 mb-4 leading-relaxed italic">{service.description}</p>
                      )}
                      {service.benefits && service.benefits.length > 0 && (
                        <div className="mt-4">
                          <h4 className="font-semibold text-[#D4AF87] mb-3 text-lg">Beneficios:</h4>
                          <ul className="list-disc list-inside space-y-2 text-gray-600">
                            {service.benefits.map((benefit: string, i: number) => (
                              <li key={i} className="text-base">{benefit}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Contact Form */}
      <section id="contact" className="relative z-10 py-20 px-4 backdrop-blur-sm" style={{ background: 'linear-gradient(45deg, rgba(125, 211, 192, 0.6) 0%, rgba(179, 224, 220, 0.5) 50%, rgba(217, 240, 238, 0.6) 100%)' }}>
        <div className="container mx-auto max-w-2xl">
          <h2 className="text-4xl font-bold text-center text-white mb-4 drop-shadow-lg">{t.contact.title}</h2>
          <p className="text-xl text-center text-white mb-12 drop-shadow-md">{t.contact.subtitle}</p>

          <form
            onSubmit={handleSubmit}
            className="space-y-6 bg-gradient-to-br from-[#D9F0EE] to-white p-8 rounded-2xl shadow-lg border border-[#B3E0DC]"
          >
            <input type="hidden" name="subject" value="Nueva solicitud de cita - K Life Spa" />
            <input type="hidden" name="from_name" value="K Life Spa" />

            {/* Configuración del email de confirmación automático */}
            <input type="hidden" name="autoresponse_subject" value="¡Gracias por contactar a K Life Aesthetic & Spa!" />
            <input type="hidden" name="autoresponse_text" value={`Hola,

¡Gracias por contactarnos! Hemos recibido tu solicitud de información y nos pondremos en contacto contigo lo antes posible.

En K Life Aesthetic & Spa nos especializamos en tratamientos faciales y corporales personalizados para tu bienestar y belleza.

Nuestros servicios incluyen:
- Tratamientos Faciales: Dermaplaning, Hidrafacial, Microdermoabrasión, Peeling Químico
- Tratamientos Corporales: Venus Legacy (reafirmación de piel, reducción de celulitis)

📍 Ubicación: Coral Gables
📞 Teléfono: 305.680.6500
📧 Email: klifeaestheticspa@gmail.com

Pronto nos comunicaremos contigo para agendar tu cita.

Con cariño,
Kimberly Alcantara
Esthetician & Massage Therapist
K Life Aesthetic & Spa

---
Este es un mensaje automático de confirmación. Por favor no respondas a este email.`} />

            <div>
              <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
                {t.contact.form.name}
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
                {t.contact.form.email}
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all"
              />
            </div>

            <div>
              <label htmlFor="phone" className="block text-gray-700 font-medium mb-2">
                {t.contact.form.phone}
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all"
              />
            </div>

            <div>
              <label htmlFor="service" className="block text-gray-700 font-medium mb-2">
                {t.contact.form.service}
              </label>
              <input
                type="text"
                id="service"
                name="service"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-gray-700 font-medium mb-2">
                {t.contact.form.message}
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all resize-none"
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full px-8 py-4 bg-[#B3E0DC] text-gray-900 rounded-lg hover:bg-[#9BCCC8] transition-all transform hover:scale-[1.02] font-medium text-lg shadow-lg"
            >
              {t.contact.form.submit}
            </button>

            {formResult && (
              <div className={`text-center p-4 rounded-lg ${formResult.includes("exitosamente") || formResult.includes("successfully") ? "bg-green-100 text-green-800" : formResult.includes("Error") ? "bg-red-100 text-red-800" : "bg-blue-100 text-blue-800"}`}>
                {formResult}
              </div>
            )}
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 bg-gray-900 text-white py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-3 gap-8 text-center md:text-left">
            <div>
              <h3 className="text-xl font-bold mb-4 text-[#B3E0DC]">K Life Aesthetic & Spa</h3>
              <p className="text-gray-400">Tu destino de lujo para el bienestar y la belleza.</p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4 text-[#B3E0DC]">{t.footer.hours}</h4>
              <p className="text-gray-400">{t.footer.hoursText}</p>
              <p className="text-gray-400">{t.footer.sundayText}</p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4 text-[#B3E0DC]">{t.footer.contact}</h4>
              <p className="text-gray-400">Email: klifeaestheticspa@gmail.com</p>
              <p className="text-gray-400">Tel: (123) 456-7890</p>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400">
            <p>&copy; 2025 K Life Aesthetic & Spa. {t.footer.rights}</p>
          </div>
        </div>
      </footer>

      {/* WhatsApp Floating Button */}
      <a
        href="https://wa.me/1234567890"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 bg-green-500 text-white p-4 rounded-full shadow-2xl hover:bg-green-600 transition-all transform hover:scale-110 z-50"
        aria-label="Contact via WhatsApp"
      >
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
        </svg>
      </a>
    </div>
  )
}
