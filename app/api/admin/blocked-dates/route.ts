import { NextResponse } from "next/server"
import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"

export async function GET() {
  try {
    const session = await auth()
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const blockedDates = await prisma.blockedDate.findMany({
      orderBy: {
        date: "asc",
      },
    })

    return NextResponse.json(blockedDates)
  } catch (error) {
    console.error("Error fetching blocked dates:", error)
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
    const { date, reason } = body

    const blockedDate = await prisma.blockedDate.create({
      data: {
        date: new Date(date),
        reason,
      },
    })

    return NextResponse.json(blockedDate)
  } catch (error) {
    console.error("Error creating blocked date:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}
