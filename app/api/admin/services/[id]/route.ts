import { NextResponse } from "next/server"
import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth()
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { id } = await params
    const body = await request.json()
    const {
      name,
      nameEn,
      description,
      descriptionEn,
      fullDescription,
      fullDescriptionEn,
      benefits,
      benefitsEn,
      duration,
      price,
      category,
      active
    } = body

    const updateData: any = {}
    if (name !== undefined) updateData.name = name
    if (nameEn !== undefined) updateData.nameEn = nameEn || null
    if (description !== undefined) updateData.description = description || null
    if (descriptionEn !== undefined) updateData.descriptionEn = descriptionEn || null
    if (fullDescription !== undefined) updateData.fullDescription = fullDescription || null
    if (fullDescriptionEn !== undefined) updateData.fullDescriptionEn = fullDescriptionEn || null

    // Convert benefits from text (line-separated) to JSON array
    if (benefits !== undefined) {
      const benefitsArray = benefits ? benefits.split('\n').filter((b: string) => b.trim()) : []
      updateData.benefits = benefitsArray.length > 0 ? JSON.stringify(benefitsArray) : null
    }
    if (benefitsEn !== undefined) {
      const benefitsEnArray = benefitsEn ? benefitsEn.split('\n').filter((b: string) => b.trim()) : []
      updateData.benefitsEn = benefitsEnArray.length > 0 ? JSON.stringify(benefitsEnArray) : null
    }

    if (duration !== undefined) updateData.duration = parseInt(duration)
    if (price !== undefined) updateData.price = parseFloat(price)
    if (category !== undefined) updateData.category = category
    if (active !== undefined) updateData.active = active

    const service = await prisma.service.update({
      where: { id },
      data: updateData,
    })

    return NextResponse.json(service)
  } catch (error) {
    console.error("Error updating service:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth()
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { id } = await params
    await prisma.service.delete({
      where: { id },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting service:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}
