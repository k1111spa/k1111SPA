import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET() {
  try {
    const blockedDates = await prisma.blockedDate.findMany({
      orderBy: { date: "asc" },
    })

    return NextResponse.json(blockedDates)
  } catch (error) {
    console.error("Error fetching blocked dates:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}
