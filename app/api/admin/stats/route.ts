import { NextResponse } from "next/server"
import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"
import dayjs from "dayjs"

export async function GET() {
  try {
    const session = await auth()
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const today = dayjs().startOf("day").toDate()
    const tomorrow = dayjs().add(1, "day").startOf("day").toDate()

    const [pendingAppointments, todayAppointments, totalAppointments, activeServices] =
      await Promise.all([
        prisma.appointment.count({
          where: { status: "pending" },
        }),
        prisma.appointment.count({
          where: {
            date: {
              gte: today,
              lt: tomorrow,
            },
          },
        }),
        prisma.appointment.count(),
        prisma.service.count({
          where: { active: true },
        }),
      ])

    return NextResponse.json({
      pendingAppointments,
      todayAppointments,
      totalAppointments,
      activeServices,
    })
  } catch (error) {
    console.error("Error fetching stats:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}
