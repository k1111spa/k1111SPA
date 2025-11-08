import { PrismaClient } from "@prisma/client"
import bcrypt from "bcryptjs"

// For seeding, use standard PrismaClient which works with both SQLite and PostgreSQL
// The Neon adapter is only needed for runtime queries in the serverless environment
const prisma = new PrismaClient()

async function main() {
  console.log("🌱 Starting database seeding...")
  console.log("📊 DATABASE_URL:", process.env.DATABASE_URL ? "✅ Set" : "❌ Missing")

  try {
    await prisma.$connect()
    console.log("✅ Database connection successful")
  } catch (error) {
    console.error("❌ Database connection failed:", error)
    throw error
  }

  // Create admin user (Kimberly)
  const hashedPassword = await bcrypt.hash("kimberly123", 10)

  const admin = await prisma.user.upsert({
    where: { email: "k1111marketing@gmail.com" },
    update: {},
    create: {
      email: "k1111marketing@gmail.com",
      name: "Kimberly Alcantara",
      password: hashedPassword,
      phone: "+1 (XXX) XXX-XXXX",
      emailVerified: new Date(),
    },
  })

  console.log("✅ Admin user created:", admin.email)

  // Create facial services
  const facialServices = [
    {
      name: "Dermaplaning",
      nameEn: "Dermaplaning",
      description: "Limpieza profunda con dermaplaning",
      descriptionEn: "Deep cleansing with dermaplaning",
      fullDescription: "",
      fullDescriptionEn: "",
      benefits: JSON.stringify(["Deja la piel más suave y luminosa", "Mejora la textura y la uniformidad del tono", "Permite que los productos cosméticos penetren mejor", "Estimula la renovación celular"]),
      benefitsEn: JSON.stringify(["Leaves skin softer and brighter", "Improves texture and tone uniformity", "Allows better penetration of cosmetic products", "Stimulates cellular renewal"]),
      imageUrl: "/images/dermaplaning.jpg",
      duration: 60,
      price: 75.0,
      category: "facial",
      active: true,
    },
    {
      name: "Hidrafacial",
      nameEn: "Hydrafacial",
      description: "Limpieza profunda con hidrafacial",
      descriptionEn: "Deep cleansing with hydrafacial",
      fullDescription: "",
      fullDescriptionEn: "",
      benefits: JSON.stringify(["Limpia y desobstruye los poros", "Hidrata y suaviza la piel", "Mejora la textura y luminosidad", "Reduce la apariencia de líneas finas, manchas y poros dilatados", "Es apto para todo tipo de piel, incluso sensible"]),
      benefitsEn: JSON.stringify(["Cleanses and unclogs pores", "Hydrates and softens skin", "Improves texture and luminosity", "Reduces the appearance of fine lines, spots and enlarged pores", "Suitable for all skin types, even sensitive"]),
      imageUrl: "/images/hydrofacial.jpg",
      duration: 60,
      price: 85.0,
      category: "facial",
      active: true,
    },
    {
      name: "Microdermoabrasión",
      nameEn: "Microdermabrasion",
      description: "Limpieza profunda con microdermoabrasión",
      descriptionEn: "Deep cleansing with microdermabrasion",
      fullDescription: "",
      fullDescriptionEn: "",
      benefits: JSON.stringify(["Suaviza la textura de la piel", "Mejora el aspecto de manchas, cicatrices leves, arrugas finas y poros dilatados", "Estimula la producción de colágeno y elastina", "Favorece la renovación celular", "Deja la piel más luminosa y uniforme"]),
      benefitsEn: JSON.stringify(["Smooths skin texture", "Improves appearance of spots, mild scars, fine wrinkles and enlarged pores", "Stimulates collagen and elastin production", "Promotes cellular renewal", "Leaves skin more luminous and even"]),
      imageUrl: "/images/microdermobrasion.jpg",
      duration: 60,
      price: 75.0,
      category: "facial",
      active: true,
    },
    {
      name: "Peeling Químico",
      nameEn: "Chemical Peel",
      description: "Exfoliación química para renovar la piel",
      descriptionEn: "Chemical exfoliation to renew the skin",
      fullDescription: "Tratamiento estético que renueva las capas superficiales de la piel mediante la aplicación de ácidos o sustancias químicas controladas. Su objetivo es mejorar la textura, el tono y el aspecto general de la piel.",
      fullDescriptionEn: "Aesthetic treatment that renews the superficial layers of the skin through the application of controlled acids or chemical substances. Its goal is to improve texture, tone, and overall skin appearance.",
      benefits: JSON.stringify([]),
      benefitsEn: JSON.stringify([]),
      imageUrl: "/images/peeling-quimico.jpg",
      duration: 75,
      price: 100.0,
      category: "facial",
      active: true,
    },
    {
      name: "Dermapen (Microneedle)",
      nameEn: "Dermapen (Microneedle)",
      description: "Microagujas para penetración profunda de activos",
      descriptionEn: "Microneedling for deep penetration of actives",
      fullDescription: "Crea microcanales en la piel que permiten una mayor penetración de principios activos, potenciando su efecto. Los activos se eligen según el objetivo (luminosidad, firmeza, regeneración, despigmentación, etc.).",
      fullDescriptionEn: "Creates microchannels in the skin that allow greater penetration of active ingredients, enhancing their effect. Actives are chosen according to the goal (brightness, firmness, regeneration, depigmentation, etc.).",
      benefits: JSON.stringify([]),
      benefitsEn: JSON.stringify([]),
      imageUrl: "/images/dermapen.jpg",
      duration: 75,
      price: 150.0,
      category: "facial",
      active: true,
    },
    {
      name: "ADN de Salmón (PDRN)",
      nameEn: "Salmon DNA (PDRN)",
      description: "Regenerador celular potente",
      descriptionEn: "Powerful cellular regenerator",
      fullDescription: "Regenerador celular potente. Estimula la producción de colágeno y elastina, mejora textura, luminosidad y firmeza. Favorece la reparación tisular (ideal para piel dañada o envejecida). Frecuencia recomendada: Cada 3 a 4 semanas, en un protocolo de 3 a 5 sesiones.",
      fullDescriptionEn: "Powerful cellular regenerator. Stimulates collagen and elastin production, improves texture, luminosity and firmness. Promotes tissue repair (ideal for damaged or aged skin). Recommended frequency: Every 3 to 4 weeks, in a protocol of 3 to 5 sessions.",
      benefits: JSON.stringify(["Estimula la producción de colágeno y elastina", "Mejora textura, luminosidad y firmeza", "Favorece la reparación tisular", "Piel más uniforme, jugosa y con aspecto saludable"]),
      benefitsEn: JSON.stringify(["Stimulates collagen and elastin production", "Improves texture, luminosity and firmness", "Promotes tissue repair", "More uniform, juicy and healthy-looking skin"]),
      imageUrl: "/images/adn-salmon.jpg",
      duration: 60,
      price: 180.0,
      category: "facial",
      active: true,
    },
    {
      name: "Exosomas",
      nameEn: "Exosomes",
      description: "Vesículas de células madre para regeneración",
      descriptionEn: "Stem cell vesicles for regeneration",
      fullDescription: "Vesículas extracelulares derivadas de células madre mesenquimales. Potentes mensajeros biológicos que estimulan la regeneración celular y reducen la inflamación. Efecto rejuvenecedor global, piel más elástica y radiante.",
      fullDescriptionEn: "Extracellular vesicles derived from mesenchymal stem cells. Powerful biological messengers that stimulate cellular regeneration and reduce inflammation. Global rejuvenating effect, more elastic and radiant skin.",
      benefits: JSON.stringify(["Repara daño cutáneo", "Mejora arrugas finas y firmeza", "Regula pigmentación y uniformiza el tono", "Acelera la recuperación tras procedimientos estéticos"]),
      benefitsEn: JSON.stringify(["Repairs skin damage", "Improves fine wrinkles and firmness", "Regulates pigmentation and evens tone", "Accelerates recovery after aesthetic procedures"]),
      imageUrl: "/images/exosomas.jpg",
      duration: 75,
      price: 250.0,
      category: "facial",
      active: true,
    },
    {
      name: "Pink Glow",
      nameEn: "Pink Glow",
      description: "Mezcla de péptidos y vitaminas para luminosidad",
      descriptionEn: "Blend of peptides and vitamins for luminosity",
      fullDescription: "Mezcla de péptidos, vitaminas (A, C, E, B5), ácido hialurónico y agentes despigmentantes. Da un efecto de luminosidad y tono uniforme al rostro.",
      fullDescriptionEn: "Blend of peptides, vitamins (A, C, E, B5), hyaluronic acid and depigmenting agents. Gives a luminosity and even tone effect to the face.",
      benefits: JSON.stringify(["Aclara manchas y reduce la opacidad", "Mejora la hidratación y elasticidad", "Da un aspecto 'glow' o de piel radiante inmediata"]),
      benefitsEn: JSON.stringify(["Lightens spots and reduces dullness", "Improves hydration and elasticity", "Gives an immediate 'glow' or radiant skin appearance"]),
      imageUrl: "/images/pink-glow.jpg",
      duration: 60,
      price: 130.0,
      category: "facial",
      active: true,
    },
  ]

  for (const service of facialServices) {
    const existing = await prisma.service.findFirst({
      where: { name: service.name },
    })
    if (!existing) {
      await prisma.service.create({ data: service })
    }
  }

  console.log("✅ Facial services created")

  // Create body services
  const bodyServices = [
    {
      name: "Venus Legacy",
      nameEn: "Venus Legacy",
      description: "Tratamiento estético no invasivo para reafirmar la piel",
      descriptionEn: "Non-invasive aesthetic treatment to firm the skin",
      fullDescription: "Tratamiento estético no invasivo",
      fullDescriptionEn: "Non-invasive aesthetic treatment",
      benefits: JSON.stringify(["Reafirma la piel (rostro, cuello, abdomen, brazos, glúteos, piernas)", "Reduce la flacidez y mejora la textura", "Disminuye la apariencia de celulitis", "Define el contorno facial y corporal", "Estimula la producción de colágeno natural"]),
      benefitsEn: JSON.stringify(["Firms skin (face, neck, abdomen, arms, buttocks, legs)", "Reduces sagging and improves texture", "Decreases the appearance of cellulite", "Defines facial and body contour", "Stimulates natural collagen production"]),
      imageUrl: "/images/venus-legacy.jpg",
      duration: 60,
      price: 150.0,
      category: "body",
      active: true,
    },
    {
      name: "Masaje Relajante",
      nameEn: "Relaxing Massage",
      description: "Masaje completo de cuerpo para relajación profunda",
      descriptionEn: "Full body massage for deep relaxation",
      fullDescription: "",
      fullDescriptionEn: "",
      benefits: JSON.stringify([]),
      benefitsEn: JSON.stringify([]),
      imageUrl: null,
      duration: 90,
      price: 100.0,
      category: "body",
      active: true,
    },
    {
      name: "Masaje Relajante con Piedras Calientes",
      nameEn: "Hot Stone Massage",
      description: "Masaje terapéutico con piedras volcánicas calientes",
      descriptionEn: "Therapeutic massage with hot volcanic stones",
      fullDescription: "Masaje terapéutico con piedras volcánicas calientes que relajan los músculos profundamente, mejoran la circulación y proporcionan una sensación de bienestar total",
      fullDescriptionEn: "Therapeutic massage with hot volcanic stones that deeply relax muscles, improve circulation and provide a total sense of wellbeing",
      benefits: JSON.stringify([]),
      benefitsEn: JSON.stringify([]),
      imageUrl: "/images/masaje-piedras-calientes.jpg",
      duration: 90,
      price: 120.0,
      category: "body",
      active: true,
    },
    {
      name: "Tratamiento Reductivo",
      nameEn: "Body Contouring Treatment",
      description: "Tratamiento para reducir medidas y moldear el cuerpo",
      descriptionEn: "Treatment to reduce measurements and shape the body",
      fullDescription: "",
      fullDescriptionEn: "",
      benefits: JSON.stringify([]),
      benefitsEn: JSON.stringify([]),
      imageUrl: null,
      duration: 75,
      price: 110.0,
      category: "body",
      active: true,
    },
  ]

  for (const service of bodyServices) {
    const existing = await prisma.service.findFirst({
      where: { name: service.name },
    })
    if (!existing) {
      await prisma.service.create({ data: service })
    }
  }

  console.log("✅ Body services created")

  // Create default business hours (Monday to Saturday)
  const businessHours = [
    { dayOfWeek: 1, startTime: "09:00", endTime: "19:00", active: true }, // Monday
    { dayOfWeek: 2, startTime: "09:00", endTime: "19:00", active: true }, // Tuesday
    { dayOfWeek: 3, startTime: "09:00", endTime: "19:00", active: true }, // Wednesday
    { dayOfWeek: 4, startTime: "09:00", endTime: "19:00", active: true }, // Thursday
    { dayOfWeek: 5, startTime: "09:00", endTime: "19:00", active: true }, // Friday
    { dayOfWeek: 6, startTime: "09:00", endTime: "19:00", active: true }, // Saturday
  ]

  for (const hours of businessHours) {
    const existing = await prisma.availability.findFirst({
      where: { dayOfWeek: hours.dayOfWeek },
    })
    if (!existing) {
      await prisma.availability.create({
        data: hours,
      })
    }
  }

  console.log("✅ Business hours created")

  console.log("🎉 Database seeding completed!")
  console.log("\n📝 Admin credentials:")
  console.log("Email: k1111marketing@gmail.com")
  console.log("Password: kimberly123")
  console.log("\n🔗 Access admin panel at: http://localhost:3000/admin/login")
}

main()
  .catch((e) => {
    console.error("❌ Error seeding database:", e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
