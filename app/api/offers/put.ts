import { NextResponse } from "next/server"
import { updateOffer } from "@/lib/offers"
import { OfferFormData } from "@/types/offers"

export async function PUT(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get("id")

    if (!id) {
      return NextResponse.json(
        { error: "Offer ID is required" },
        { status: 400 }
      )
    }

    const body = await request.json()
    const offerData: OfferFormData = body

    // Validate required fields
    if (!offerData.productId || !offerData.originalPrice || !offerData.inventory) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      )
    }

    const offer = await updateOffer({ id, data: offerData })
    return NextResponse.json(offer)
  } catch (error) {
    console.error("Error updating offer:", error)
    return NextResponse.json(
      { error: "Failed to update offer" },
      { status: 500 }
    )
  }
} 