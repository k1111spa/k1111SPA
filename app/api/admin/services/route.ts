import { NextResponse } from "next/server"
import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"

export async function GET() {
  try {
    const session = await auth()
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const services = await prisma.service.findMany({
      orderBy: [
        { category: "asc" },
        { sortOrder: "asc" } as any, // sortOrder field added in migration
        { name: "asc" }
      ],
    })

    return NextResponse.json(services, {
      headers: {
        "Cache-Control": "no-store, no-cache, must-revalidate",
        "Pragma": "no-cache"
      }
    })
  } catch (error) {
    console.error("Error fetching services:", error)
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
    const {
      name,
      nameEn,
      description,
      descriptionEn,
      fullDescription,
      fullDescriptionEn,
      benefits,
      benefitsEn,
      imageUrl,
      duration,
      price,
      category,
      active
    } = body

    // Convert benefits from text (line-separated) to JSON array
    const benefitsArray = benefits ? benefits.split('\n').filter((b: string) => b.trim()) : []
    const benefitsEnArray = benefitsEn ? benefitsEn.split('\n').filter((b: string) => b.trim()) : []

    const service = await prisma.service.create({
      data: {
        name,
        nameEn: nameEn || null,
        description: description || null,
        descriptionEn: descriptionEn || null,
        fullDescription: fullDescription || null,
        fullDescriptionEn: fullDescriptionEn || null,
        benefits: benefitsArray.length > 0 ? JSON.stringify(benefitsArray) : null,
        benefitsEn: benefitsEnArray.length > 0 ? JSON.stringify(benefitsEnArray) : null,
        imageUrl: imageUrl || null,
        duration: parseInt(duration),
        price: parseFloat(price),
        category,
        active: active ?? true,
      },
    })

    return NextResponse.json(service)
  } catch (error) {
    console.error("Error creating service:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}
