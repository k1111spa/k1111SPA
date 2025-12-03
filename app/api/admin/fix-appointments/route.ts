import { NextResponse } from "next/server"
import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"

// GET: Ver citas con datos faltantes
export async function GET() {
  try {
    const session = await auth()
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Buscar todas las citas
    const allAppointments = await prisma.appointment.findMany({
      include: {
        user: { select: { name: true, email: true } },
        service: { select: { name: true } }
      }
    })

    // Identificar citas con problemas
    const problematicAppointments = allAppointments.filter(apt =>
      !apt.startTime || !apt.endTime ||
      !apt.startTime.includes(":") || !apt.endTime.includes(":")
    )

    return NextResponse.json({
      total: allAppointments.length,
      problematic: problematicAppointments.length,
      appointments: allAppointments.map(apt => ({
        id: apt.id,
        date: apt.date,
        startTime: apt.startTime,
        endTime: apt.endTime,
        status: apt.status,
        hasIssue: !apt.startTime || !apt.endTime || !apt.startTime.includes(":") || !apt.endTime.includes(":"),
        user: apt.user?.name || apt.user?.email,
        service: apt.service?.name
      }))
    })
  } catch (error) {
    console.error("Error:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}

// POST: Arreglar citas con datos faltantes
export async function POST() {
  try {
    const session = await auth()
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Buscar citas con startTime o endTime nulos o mal formateados
    const problematicAppointments = await prisma.appointment.findMany({
      where: {
        OR: [
          { startTime: null },
          { endTime: null },
          { startTime: "" },
          { endTime: "" }
        ]
      }
    })

    // Arreglar cada cita problemática
    const fixed = []
    for (const apt of problematicAppointments) {
      await prisma.appointment.update({
        where: { id: apt.id },
        data: {
          startTime: apt.startTime || "09:00",
          endTime: apt.endTime || "10:00"
        }
      })
      fixed.push(apt.id)
    }

    return NextResponse.json({
      message: `Fixed ${fixed.length} appointments`,
      fixedIds: fixed
    })
  } catch (error) {
    console.error("Error:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}
