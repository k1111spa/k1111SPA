import { PrismaClient } from "@prisma/client"
import { PrismaNeon } from '@prisma/adapter-neon'
import { Pool } from '@neondatabase/serverless'
import bcrypt from "bcryptjs"

// Use Neon adapter for PostgreSQL connections (required for Vercel serverless)
function createPrismaClient() {
  if (process.env.DATABASE_URL?.includes('neon') || process.env.DATABASE_URL?.includes('postgres')) {
    const pool = new Pool({ connectionString: process.env.DATABASE_URL })
    const adapter = new PrismaNeon(pool)
    return new PrismaClient({ adapter })
  }
  return new PrismaClient()
}

const prisma = createPrismaClient()

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
      name: "Limpieza Facial Profunda",
      description: "Limpieza profunda de la piel con extracción de impurezas",
      duration: 60,
      price: 75.0,
      category: "facial",
      active: true,
    },
    {
      name: "Tratamiento Antiedad",
      description: "Tratamiento rejuvenecedor con productos premium",
      duration: 90,
      price: 120.0,
      category: "facial",
      active: true,
    },
    {
      name: "Hidratación Facial",
      description: "Hidratación profunda para todo tipo de piel",
      duration: 60,
      price: 85.0,
      category: "facial",
      active: true,
    },
    {
      name: "Peeling Químico",
      description: "Exfoliación química para renovar la piel",
      duration: 75,
      price: 100.0,
      category: "facial",
      active: true,
    },
    {
      name: "Dermapen (Microneedle)",
      description: "Crea microcanales en la piel que permiten una mayor penetración de principios activos, potenciando su efecto. Los activos se eligen según el objetivo (luminosidad, firmeza, regeneración, despigmentación, etc.)",
      duration: 75,
      price: 150.0,
      category: "facial",
      active: true,
    },
    {
      name: "ADN de Salmón (PDRN)",
      description: "Regenerador celular potente que estimula la producción de colágeno y elastina. Mejora textura, luminosidad y firmeza. Favorece la reparación tisular ideal para piel dañada o envejecida. Piel más uniforme, jugosa y con aspecto saludable. Frecuencia: cada 3-4 semanas, protocolo de 3-5 sesiones",
      duration: 60,
      price: 180.0,
      category: "facial",
      active: true,
    },
    {
      name: "Exosomas",
      description: "Vesículas extracelulares derivadas de células madre mesenquimales. Potentes mensajeros biológicos que estimulan la regeneración celular y reducen la inflamación. Repara daño cutáneo, mejora arrugas finas y firmeza, regula pigmentación y uniformiza el tono. Acelera la recuperación tras procedimientos estéticos. Efecto rejuvenecedor global, piel más elástica y radiante",
      duration: 75,
      price: 250.0,
      category: "facial",
      active: true,
    },
    {
      name: "Pink Glow",
      description: "Mezcla de péptidos, vitaminas (A, C, E, B5), ácido hialurónico y agentes despigmentantes. Da efecto de luminosidad y tono uniforme al rostro. Aclara manchas y reduce la opacidad, mejora la hidratación y elasticidad. Aspecto glow o piel radiante inmediata",
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
      description: "Tratamiento estético no invasivo para reafirmar la piel",
      duration: 60,
      price: 150.0,
      category: "body",
      active: true,
    },
    {
      name: "Masaje Relajante",
      description: "Masaje completo de cuerpo para relajación profunda",
      duration: 90,
      price: 100.0,
      category: "body",
      active: true,
    },
    {
      name: "Masaje Relajante con Piedras Calientes",
      description: "Masaje terapéutico con piedras volcánicas calientes que relajan los músculos profundamente, mejoran la circulación y proporcionan una sensación de bienestar total",
      duration: 90,
      price: 120.0,
      category: "body",
      active: true,
    },
    {
      name: "Tratamiento Reductivo",
      description: "Tratamiento para reducir medidas y moldear el cuerpo",
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
