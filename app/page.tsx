"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"

type Service = {
  id: string
  name: string
  nameEn: string | null
  description: string | null
  descriptionEn: string | null
  fullDescription: string | null
  fullDescriptionEn: string | null
  benefits: string | null
  benefitsEn: string | null
  imageUrl: string | null
  duration: number
  price: number
  category: string
  active: boolean
}

export default function KLifeSpaPage() {
  const [language, setLanguage] = useState<"es" | "en">("es")
  const [showFacialServices, setShowFacialServices] = useState(false)
  const [showBodyServices, setShowBodyServices] = useState(false)
  const [formResult, setFormResult] = useState("")
  const [debugInfo, setDebugInfo] = useState("")
  const [services, setServices] = useState<Service[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch("/api/services")
        if (response.ok) {
          const data = await response.json()
          setServices(data)
        }
      } catch (error) {
        console.error("Error fetching services:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchServices()
  }, [])

  const toggleLanguage = () => {
    setLanguage(language === "es" ? "en" : "es")
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setFormResult("Enviando...")
    setDebugInfo("")

    // Guardar referencia al formulario antes del async
    const form = event.currentTarget

    const formData = new FormData(form)
    formData.append("access_key", "df27a237-4c41-4f23-bd2f-1fcb9879891f")

    try {
      console.log("Sending form data to Web3Forms...")
      setDebugInfo("Conectando con Web3Forms...")

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      })

      console.log("Response status:", response.status)
      setDebugInfo(`Status: ${response.status}`)

      const data = await response.json()
      console.log("Response data:", data)
      setDebugInfo(`Status: ${response.status}, Success: ${data.success}, Message: ${data.message || 'N/A'}`)

      if (data.success) {
        setFormResult(language === "es" ? "¡Mensaje enviado exitosamente! Te contactaremos pronto." : "Message sent successfully! We'll contact you soon.")
        form.reset()
        setDebugInfo("")
      } else {
        console.error("Web3Forms error:", data.message)
        setFormResult(language === "es" ? `Error: ${data.message || "Por favor intenta de nuevo."}` : `Error: ${data.message || "Please try again."}`)
      }
    } catch (error) {
      console.error("Fetch error:", error)
      const errorMsg = error instanceof Error ? error.message : String(error)
      setDebugInfo(`Fetch Error: ${errorMsg}`)
      setFormResult(language === "es" ? "Error al enviar el mensaje. Por favor intenta de nuevo." : "Error sending message. Please try again.")
    }

    // Clear messages after 10 seconds
    setTimeout(() => {
      setFormResult("")
      setDebugInfo("")
    }, 10000)
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
        description: "Métodos avanzados de limpieza facial profunda de acuerdo al tipo de piel y necesidades específicas",
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
          {
            name: "Dermapen (Microneedle)",
            description: "Crea microcanales en la piel que permiten una mayor penetración de principios activos, potenciando su efecto. Los activos se eligen según el objetivo (luminosidad, firmeza, regeneración, despigmentación, etc.).",
            benefits: []
          },
          {
            name: "ADN de Salmón (PDRN)",
            description: "Regenerador celular potente. Estimula la producción de colágeno y elastina, mejora textura, luminosidad y firmeza. Favorece la reparación tisular (ideal para piel dañada o envejecida). Frecuencia recomendada: Cada 3 a 4 semanas, en un protocolo de 3 a 5 sesiones.",
            benefits: [
              "Estimula la producción de colágeno y elastina",
              "Mejora textura, luminosidad y firmeza",
              "Favorece la reparación tisular",
              "Piel más uniforme, jugosa y con aspecto saludable"
            ]
          },
          {
            name: "Exosomas",
            description: "Vesículas extracelulares derivadas de células madre mesenquimales. Potentes mensajeros biológicos que estimulan la regeneración celular y reducen la inflamación. Efecto rejuvenecedor global, piel más elástica y radiante.",
            benefits: [
              "Repara daño cutáneo",
              "Mejora arrugas finas y firmeza",
              "Regula pigmentación y uniformiza el tono",
              "Acelera la recuperación tras procedimientos estéticos"
            ]
          },
          {
            name: "Pink Glow",
            description: "Mezcla de péptidos, vitaminas (A, C, E, B5), ácido hialurónico y agentes despigmentantes. Da un efecto de luminosidad y tono uniforme al rostro.",
            benefits: [
              "Aclara manchas y reduce la opacidad",
              "Mejora la hidratación y elasticidad",
              "Da un aspecto 'glow' o de piel radiante inmediata"
            ]
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
      servicesSection: {
        title: "Nuestros Tratamientos",
      },
      testimonials: {
        title: "Lo Que Dicen Nuestras Clientas",
        subtitle: "Experiencias Reales",
        reviews: [
          {
            name: "María González",
            service: "Hidrafacial",
            text: "¡Increíble experiencia! Mi piel nunca se había sentido tan suave y radiante. Kimberly es una profesional excepcional.",
            rating: 5
          },
          {
            name: "Sofia Ramirez",
            service: "Exosomas",
            text: "El tratamiento de exosomas superó todas mis expectativas. Los resultados son visibles desde la primera sesión. 100% recomendado.",
            rating: 5
          },
          {
            name: "Ana Martinez",
            service: "Masaje con Piedras Calientes",
            text: "El masaje más relajante que he recibido. El ambiente es perfecto y la atención es personalizada. Volveré sin duda.",
            rating: 5
          }
        ]
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
          {
            name: "Dermapen (Microneedle)",
            description: "Creates microchannels in the skin that allow greater penetration of active ingredients, enhancing their effect. Actives are chosen according to the goal (brightness, firmness, regeneration, depigmentation, etc.).",
            benefits: []
          },
          {
            name: "Salmon DNA (PDRN)",
            description: "Powerful cellular regenerator. Stimulates collagen and elastin production, improves texture, luminosity and firmness. Promotes tissue repair (ideal for damaged or aged skin). Recommended frequency: Every 3 to 4 weeks, in a protocol of 3 to 5 sessions.",
            benefits: [
              "Stimulates collagen and elastin production",
              "Improves texture, luminosity and firmness",
              "Promotes tissue repair",
              "More uniform, juicy and healthy-looking skin"
            ]
          },
          {
            name: "Exosomes",
            description: "Extracellular vesicles derived from mesenchymal stem cells. Powerful biological messengers that stimulate cellular regeneration and reduce inflammation. Global rejuvenating effect, more elastic and radiant skin.",
            benefits: [
              "Repairs skin damage",
              "Improves fine wrinkles and firmness",
              "Regulates pigmentation and evens tone",
              "Accelerates recovery after aesthetic procedures"
            ]
          },
          {
            name: "Pink Glow",
            description: "Blend of peptides, vitamins (A, C, E, B5), hyaluronic acid and depigmenting agents. Gives a luminosity and even tone effect to the face.",
            benefits: [
              "Lightens spots and reduces dullness",
              "Improves hydration and elasticity",
              "Gives an immediate 'glow' or radiant skin appearance"
            ]
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
      servicesSection: {
        title: "Our Treatments",
      },
      testimonials: {
        title: "What Our Clients Say",
        subtitle: "Real Experiences",
        reviews: [
          {
            name: "María González",
            service: "Hydrafacial",
            text: "Amazing experience! My skin has never felt so smooth and radiant. Kimberly is an exceptional professional.",
            rating: 5
          },
          {
            name: "Sofia Ramirez",
            service: "Exosomes",
            text: "The exosome treatment exceeded all my expectations. Results are visible from the first session. 100% recommended.",
            rating: 5
          },
          {
            name: "Ana Martinez",
            service: "Hot Stone Massage",
            text: "The most relaxing massage I've ever received. The atmosphere is perfect and the attention is personalized. I'll definitely be back.",
            rating: 5
          }
        ]
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
      <header className="fixed top-0 left-0 right-0 bg-gradient-to-r from-[#B3E0DC]/70 via-[#7DD3C0]/65 to-[#B3E0DC]/70 backdrop-blur-md shadow-lg z-50">
        <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/KLIFE1111-logo-vJzBHAa1bg12eKU4qfT6dGb4IFJ3oq.png"
              alt="K Life Spa Logo"
              width={120}
              height={60}
              className="h-12 w-auto"
              style={{
                filter: 'drop-shadow(0 4px 6px rgba(0, 0, 0, 0.2)) drop-shadow(0 0 8px rgba(125, 211, 192, 0.5)) drop-shadow(0 0 15px rgba(179, 224, 220, 0.3)) brightness(1.05)'
              }}
            />
          </div>
          <div className="flex items-center gap-6">
            <a href="#services" className="text-white hover:text-gray-900 transition-colors font-semibold drop-shadow-md">
              {t.nav.services}
            </a>
            <a href="#contact" className="text-white hover:text-gray-900 transition-colors font-semibold drop-shadow-md">
              {t.nav.contact}
            </a>
            <Link
              href="/booking"
              className="px-6 py-2 bg-white text-[#7DD3C0] rounded-full hover:bg-gray-100 transition-all shadow-lg hover:shadow-xl font-bold"
            >
              {t.nav.bookNow}
            </Link>
            <button
              onClick={toggleLanguage}
              className="px-4 py-2 bg-white/90 text-[#7DD3C0] rounded-full hover:bg-white transition-all font-bold shadow-md"
            >
              {language === "es" ? "ES" : "EN"}
            </button>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="relative z-10 pt-20 pb-24 px-4" style={{ background: 'linear-gradient(135deg, rgba(125, 211, 192, 0.85) 0%, rgba(179, 224, 220, 0.75) 50%, rgba(217, 240, 238, 0.65) 100%)' }}>
        <div className="container mx-auto max-w-5xl">
          {/* Diseño centrado y cohesivo */}
          <div className="text-center">
            {/* Logo centrado con efecto mejorado */}
            <div className="mb-8">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/KLIFE1111-logo-OrZz7hBKj2TTuXjj6DRAtgi1p9IYZE.png"
                alt="K Life 1111 Logo"
                width={450}
                height={225}
                className="mx-auto w-full max-w-md h-auto"
                priority
                style={{
                  filter: 'drop-shadow(0 8px 16px rgba(0, 0, 0, 0.3)) drop-shadow(0 0 25px rgba(125, 211, 192, 0.7)) drop-shadow(0 0 50px rgba(179, 224, 220, 0.5)) brightness(1.15)'
                }}
              />
            </div>

            {/* Tagline arriba de la foto */}
            <div className="mb-6">
              <div className="inline-block bg-gradient-to-r from-teal-500/95 to-teal-400/95 backdrop-blur-lg px-8 py-3 rounded-3xl shadow-2xl">
                <p className="text-2xl md:text-3xl text-white font-medium italic" style={{ fontFamily: "'Californian Signature', cursive" }}>
                  A special space for you
                </p>
              </div>
            </div>

            {/* Card principal unificada */}
            <div className="relative max-w-3xl mx-auto">
              {/* Efecto de resplandor de fondo */}
              <div className="absolute -inset-6 bg-gradient-to-br from-white/40 via-teal-200/30 to-white/40 rounded-[3rem] blur-3xl"></div>

              {/* Card contenedora */}
              <div className="relative bg-white/95 backdrop-blur-xl rounded-[2.5rem] overflow-hidden shadow-[0_20px_80px_rgba(0,0,0,0.2)] border-4 border-white/60">
                {/* Foto de Kimberly */}
                <div className="relative">
                  <Image
                    src="/images/kimberly-photo.jpg"
                    alt="Kimberly Alcantara"
                    width={800}
                    height={1000}
                    className="w-full h-auto"
                    style={{ objectFit: 'contain' }}
                  />
                  {/* Gradient overlay suave */}
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white/60"></div>
                </div>

                {/* Información debajo de la foto */}
                <div className="px-8 py-10 bg-gradient-to-b from-white/95 to-teal-50/80">
                  {/* Nombre y profesión */}
                  <div className="mb-8">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-teal-600 via-teal-500 to-teal-400 bg-clip-text text-transparent mb-3 leading-tight">
                      {t.hero.owner}
                    </h1>
                    <p className="text-2xl md:text-3xl text-gray-600 italic font-light">
                      {t.hero.profession}
                    </p>
                  </div>

                  {/* Línea decorativa */}
                  <div className="flex items-center justify-center gap-3 mb-8">
                    <div className="w-2 h-2 rounded-full bg-teal-400"></div>
                    <div className="w-20 h-0.5 bg-gradient-to-r from-teal-400 to-teal-300"></div>
                    <div className="w-3 h-3 rounded-full bg-teal-500"></div>
                    <div className="w-20 h-0.5 bg-gradient-to-r from-teal-300 to-teal-400"></div>
                    <div className="w-2 h-2 rounded-full bg-teal-400"></div>
                  </div>

                  {/* Información de contacto */}
                  <div className="space-y-4 mb-10">
                    <div className="flex items-center justify-center gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-teal-500 to-teal-400 shadow-lg flex items-center justify-center">
                        <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                        </svg>
                      </div>
                      <span className="text-2xl md:text-3xl font-bold text-gray-800">{t.hero.phone}</span>
                    </div>

                    <div className="flex items-center justify-center gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-teal-500 to-teal-400 shadow-lg flex items-center justify-center">
                        <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <span className="text-2xl md:text-3xl font-bold text-gray-800">{t.hero.location}</span>
                    </div>
                  </div>

                  {/* CTA Button */}
                  <div>
                    <a
                      href="/booking"
                      className="inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-teal-600 to-teal-500 text-white rounded-full hover:from-teal-700 hover:to-teal-600 transition-all font-bold text-xl shadow-[0_10px_40px_rgba(125,211,192,0.4)] hover:shadow-[0_15px_50px_rgba(125,211,192,0.6)] hover:scale-105 transform"
                    >
                      <span>{t.hero.cta}</span>
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="relative z-10 py-20 px-4 backdrop-blur-sm" style={{ background: 'linear-gradient(135deg, rgba(217, 240, 238, 0.6) 0%, rgba(179, 224, 220, 0.5) 50%, rgba(125, 211, 192, 0.6) 100%)' }}>
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl font-bold text-center text-white mb-12 drop-shadow-lg">{t.servicesSection.title}</h2>

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
                <p className="text-xl text-white font-semibold italic">{t.facialServices.subtitle}</p>
                <p className="text-white mt-2">{t.facialServices.description}</p>
              </div>
              {loading ? (
                <div className="text-center text-white">Cargando servicios...</div>
              ) : (
                <div className="grid md:grid-cols-2 gap-8">
                  {services.filter(s => s.category === 'facial').map((service) => {
                    const displayName = language === 'en' && service.nameEn ? service.nameEn : service.name
                    const displayDescription = language === 'en' && service.fullDescriptionEn ? service.fullDescriptionEn : service.fullDescription
                    const imageSrc = service.imageUrl || 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=1200&h=600&fit=crop'

                    // Parse benefits from JSON
                    let benefitsList: string[] = []
                    try {
                      const benefitsJson = language === 'en' && service.benefitsEn ? service.benefitsEn : service.benefits
                      if (benefitsJson) {
                        benefitsList = JSON.parse(benefitsJson)
                      }
                    } catch (e) {
                      console.error('Error parsing benefits:', e)
                    }

                    return (
                      <div
                        key={service.id}
                        className="bg-gradient-to-br from-[#D9F0EE] to-white p-8 rounded-2xl shadow-lg border border-[#B3E0DC]"
                      >
                        <div className="mb-6 overflow-hidden rounded-xl">
                          <Image
                            src={imageSrc}
                            alt={displayName}
                            width={600}
                            height={400}
                            className="w-full h-64 object-cover"
                          />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-3">{displayName}</h3>
                        {displayDescription && (
                          <p className="text-gray-700 mb-4 leading-relaxed">{displayDescription}</p>
                        )}
                        {benefitsList.length > 0 && (
                          <div className="mt-4">
                            <h4 className="font-semibold text-gray-900 mb-2">
                              {language === 'en' ? 'Benefits:' : 'Beneficios:'}
                            </h4>
                            <ul className="list-disc list-inside space-y-1 text-gray-600">
                              {benefitsList.map((benefit: string, i: number) => (
                                <li key={i}>{benefit}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>
              )}
            </div>
          )}

          {/* Body Services Content */}
          {showBodyServices && (
            <div className="animate-fadeIn">
              {loading ? (
                <div className="text-center text-white">Cargando servicios...</div>
              ) : (
                <div className="grid md:grid-cols-1 gap-8">
                  {services.filter(s => s.category === 'body').map((service) => {
                    const displayName = language === 'en' && service.nameEn ? service.nameEn : service.name
                    const displayDescription = language === 'en' && service.fullDescriptionEn ? service.fullDescriptionEn : service.fullDescription
                    const imageSrc = service.imageUrl || 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=1200&h=600&fit=crop'

                    // Parse benefits from JSON
                    let benefitsList: string[] = []
                    try {
                      const benefitsJson = language === 'en' && service.benefitsEn ? service.benefitsEn : service.benefits
                      if (benefitsJson) {
                        benefitsList = JSON.parse(benefitsJson)
                      }
                    } catch (e) {
                      console.error('Error parsing benefits:', e)
                    }

                    return (
                      <div
                        key={service.id}
                        className="bg-gradient-to-br from-[#D9F0EE] to-white p-8 rounded-2xl shadow-lg border border-[#D4AF87]"
                      >
                        <div className="mb-6 overflow-hidden rounded-xl">
                          <Image
                            src={imageSrc}
                            alt={displayName}
                            width={1200}
                            height={600}
                            className="w-full h-80 object-cover"
                          />
                        </div>
                        <h3 className="text-3xl font-bold text-gray-900 mb-3">{displayName}</h3>
                        {displayDescription && (
                          <p className="text-xl text-gray-700 mb-4 leading-relaxed italic">{displayDescription}</p>
                        )}
                        {benefitsList.length > 0 && (
                          <div className="mt-4">
                            <h4 className="font-semibold text-gray-900 mb-3 text-lg">
                              {language === 'en' ? 'Benefits:' : 'Beneficios:'}
                            </h4>
                            <ul className="list-disc list-inside space-y-2 text-gray-600">
                              {benefitsList.map((benefit: string, i: number) => (
                                <li key={i} className="text-base">{benefit}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="relative z-10 py-20 px-4 bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl font-bold text-center bg-gradient-to-r from-[#7DD3C0] to-[#B3E0DC] bg-clip-text text-transparent mb-4">
            {t.testimonials.title}
          </h2>
          <p className="text-xl text-center text-gray-600 mb-12">{t.testimonials.subtitle}</p>

          <div className="grid md:grid-cols-3 gap-8">
            {t.testimonials.reviews.map((review, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-2xl shadow-lg border border-[#B3E0DC] hover:shadow-xl transition-all"
              >
                <div className="flex mb-4">
                  {[...Array(review.rating)].map((_, i) => (
                    <svg
                      key={i}
                      className="w-5 h-5 text-yellow-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-gray-700 mb-6 italic">"{review.text}"</p>
                <div className="border-t border-gray-200 pt-4">
                  <p className="font-semibold text-gray-900">{review.name}</p>
                  <p className="text-sm text-[#7DD3C0]">{review.service}</p>
                </div>
              </div>
            ))}
          </div>
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
            <input type="hidden" name="subject" value="Nueva solicitud de contacto - K Life Spa" />
            <input type="hidden" name="from_name" value="K Life Spa Website" />

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

            {debugInfo && (
              <div className="text-center p-3 rounded-lg bg-yellow-100 text-yellow-800 text-sm font-mono">
                DEBUG: {debugInfo}
              </div>
            )}

            {formResult && (
              <div className={`text-center p-4 rounded-lg ${formResult.includes("exitosamente") || formResult.includes("successfully") ? "bg-green-100 text-green-800" : formResult.includes("Error") ? "bg-red-100 text-red-800" : "bg-blue-100 text-blue-800"}`}>
                {formResult}
              </div>
            )}
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 gap-12 text-center md:text-left">
            {/* Brand Section */}
            <div className="space-y-4">
              <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-[#B3E0DC] to-[#7DD3C0] bg-clip-text text-transparent">
                K Life 1111 Aesthetic & Spa
              </h3>
              <div className="flex justify-center md:justify-start gap-4 pt-2">
                <a
                  href="https://wa.me/13056806500"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center hover:bg-green-600 transition-all transform hover:scale-110"
                  aria-label="WhatsApp"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Hours Section */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold mb-4 text-[#B3E0DC] uppercase tracking-wider">
                {t.footer.hours}
              </h4>
              <div className="space-y-2">
                <p className="text-gray-300 flex items-center justify-center md:justify-start gap-2">
                  <span className="text-[#B3E0DC]">📅</span>
                  {t.footer.hoursText}
                </p>
                <p className="text-gray-300 flex items-center justify-center md:justify-start gap-2">
                  <span className="text-[#B3E0DC]">📅</span>
                  {t.footer.sundayText}
                </p>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="mt-12 pt-8 border-t border-gray-700">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <p className="text-gray-400 text-sm">
                &copy; 2025 K Life 1111 Aesthetic & Spa. {t.footer.rights}
              </p>
              <p className="text-gray-500 text-sm">
                Coral Gables, FL
              </p>
            </div>
          </div>
        </div>
      </footer>

      {/* WhatsApp Floating Button */}
      <a
        href="https://wa.me/13056806500"
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
