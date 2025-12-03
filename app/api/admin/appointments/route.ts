import { NextResponse } from "next/server"
import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"

export async function GET() {
  try {
    const session = await auth()
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const appointments = await prisma.appointment.findMany({
      include: {
        user: {
          select: {
            name: true,
            email: true,
            phone: true,
          },
        },
        service: {
          select: {
            name: true,
            duration: true,
          },
        },
      },
      orderBy: {
        date: "asc",
      },
    })

    return NextResponse.json(appointments, {
      headers: {
        "Cache-Control": "no-store, no-cache, must-revalidate",
        "Pragma": "no-cache"
      }
    })
  } catch (error) {
    console.error("Error fetching appointments:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}
