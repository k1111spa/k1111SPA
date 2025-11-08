import { NextResponse } from "next/server"
import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await auth()
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const { dayOfWeek, startTime, endTime, active } = body

    const updateData: any = {}
    if (dayOfWeek !== undefined) updateData.dayOfWeek = parseInt(dayOfWeek)
    if (startTime !== undefined) updateData.startTime = startTime
    if (endTime !== undefined) updateData.endTime = endTime
    if (active !== undefined) updateData.active = active

    const availability = await prisma.availability.update({
      where: { id: params.id },
      data: updateData,
    })

    return NextResponse.json(availability)
  } catch (error) {
    console.error("Error updating availability:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await auth()
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    await prisma.availability.delete({
      where: { id: params.id },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting availability:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}
