import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET() {
  try {
    const availability = await prisma.availability.findMany({
      where: { active: true },
      orderBy: { dayOfWeek: "asc" },
    })

    return NextResponse.json(availability)
  } catch (error) {
    console.error("Error fetching availability:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}
