import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { OfferFormData, OfferResponse } from "@/types/offers";

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
): Promise<NextResponse<OfferResponse>> {
  try {
    const body = await request.json();
    const offerData: Partial<OfferFormData> = body;

    const offer = await prisma.offer.update({
      where: {
        id: params.id,
      },
      data: offerData,
    });

    return NextResponse.json({
      data: offer,
      message: "Offer updated successfully"
    });
  } catch (error) {
    console.error("Error updating offer:", error);
    return NextResponse.json(
      { data: null, message: "Failed to update offer" },
      { status: 500 }
    );
  }
} 