import { NextResponse } from "next/server"
import { deleteOffer } from "@/lib/offers"

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get("id")

    if (!id) {
      return NextResponse.json(
        { error: "Offer ID is required" },
        { status: 400 }
      )
    }

    await deleteOffer(id)
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting offer:", error)
    return NextResponse.json(
      { error: "Failed to delete offer" },
      { status: 500 }
    )
  }
} 