import { NextResponse } from "next/server"
import { prisma } from "@/lib/db"
import { OfferFormData, OfferResponse } from "@/types/offers"

export async function POST(request: Request): Promise<NextResponse<OfferResponse>> {
  try {
    const body = await request.json()
    const offerData: OfferFormData = body

    // Validate required fields
    if (!offerData.productId || !offerData.originalPrice || !offerData.inventory) {
      return NextResponse.json(
        { data: null, message: "Missing required fields" },
        { status: 400 }
      )
    }

    const offer = await prisma.offer.create({
      data: {
        productId: offerData.productId,
        originalPrice: offerData.originalPrice,
        inventory: offerData.inventory,
        status: offerData.status || "active",
      },
    })

    return NextResponse.json({
      data: offer,
      message: "Offer created successfully"
    })
  } catch (error) {
    console.error("Error creating offer:", error)
    return NextResponse.json(
      { data: null, message: "Failed to create offer" },
      { status: 500 }
    )
  }
} 