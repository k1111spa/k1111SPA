import { NextResponse } from "next/server"
import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"

export async function GET() {
  try {
    const session = await auth()
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const availability = await prisma.availability.findMany({
      orderBy: {
        dayOfWeek: "asc",
      },
    })

    return NextResponse.json(availability)
  } catch (error) {
    console.error("Error fetching availability:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const session = await auth()
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const { dayOfWeek, startTime, endTime, active } = body

    const availability = await prisma.availability.create({
      data: {
        dayOfWeek: parseInt(dayOfWeek),
        startTime,
        endTime,
        active: active ?? true,
      },
    })

    return NextResponse.json(availability)
  } catch (error) {
    console.error("Error creating availability:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}
