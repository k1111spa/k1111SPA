import { NextResponse } from "next/server"
import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"

export async function POST(request: Request) {
  try {
    const session = await auth()
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const { serviceId, direction, category } = body

    if (!serviceId || !direction || !category) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Get all services in the same category ordered by sortOrder
    const servicesInCategory = await prisma.service.findMany({
      where: { category },
      orderBy: [
        { sortOrder: "asc" } as any,
        { name: "asc" }
      ],
    })

    // Find current index
    const currentIndex = servicesInCategory.findIndex(s => s.id === serviceId)
    if (currentIndex === -1) {
      return NextResponse.json({ error: "Service not found" }, { status: 404 })
    }

    // Calculate new index
    const newIndex = direction === "up" ? currentIndex - 1 : currentIndex + 1

    // Check bounds
    if (newIndex < 0 || newIndex >= servicesInCategory.length) {
      return NextResponse.json({ error: "Cannot move service further" }, { status: 400 })
    }

    // Swap the services
    const currentService = servicesInCategory[currentIndex]
    const targetService = servicesInCategory[newIndex]

    // Update sort orders
    await prisma.$transaction([
      prisma.service.update({
        where: { id: currentService.id },
        data: { sortOrder: newIndex } as any,
      }),
      prisma.service.update({
        where: { id: targetService.id },
        data: { sortOrder: currentIndex } as any,
      }),
    ])

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error reordering service:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}
