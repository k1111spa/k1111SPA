import { PrismaClient } from "@prisma/client"
import bcrypt from "bcryptjs"

const prisma = new PrismaClient()

async function main() {
  console.log("🌱 Starting database seeding...")

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
  ]

  for (const service of facialServices) {
    await prisma.service.upsert({
      where: { id: service.name },
      update: {},
      create: service,
    })
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
      name: "Tratamiento Reductivo",
      description: "Tratamiento para reducir medidas y moldear el cuerpo",
      duration: 75,
      price: 110.0,
      category: "body",
      active: true,
    },
  ]

  for (const service of bodyServices) {
    await prisma.service.upsert({
      where: { id: service.name },
      update: {},
      create: service,
    })
  }

  console.log("✅ Body services created")

  // Create default business hours (Monday to Friday, 9 AM to 5 PM)
  const businessHours = [
    { dayOfWeek: 1, startTime: "09:00", endTime: "17:00", active: true }, // Monday
    { dayOfWeek: 2, startTime: "09:00", endTime: "17:00", active: true }, // Tuesday
    { dayOfWeek: 3, startTime: "09:00", endTime: "17:00", active: true }, // Wednesday
    { dayOfWeek: 4, startTime: "09:00", endTime: "17:00", active: true }, // Thursday
    { dayOfWeek: 5, startTime: "09:00", endTime: "17:00", active: true }, // Friday
    { dayOfWeek: 6, startTime: "10:00", endTime: "14:00", active: true }, // Saturday
  ]

  for (const hours of businessHours) {
    await prisma.availability.create({
      data: hours,
    })
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
