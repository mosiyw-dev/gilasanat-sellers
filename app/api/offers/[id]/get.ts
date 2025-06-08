import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { OfferResponse } from "@/types/offers";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
): Promise<NextResponse<OfferResponse>> {
  try {
    const offer = await prisma.offer.findUnique({
      where: {
        id: params.id,
      },
    });

    if (!offer) {
      return NextResponse.json(
        { data: null, message: "Offer not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      data: offer,
      message: "Offer retrieved successfully"
    });
  } catch (error) {
    console.error("Error fetching offer:", error);
    return NextResponse.json(
      { data: null, message: "Failed to fetch offer" },
      { status: 500 }
    );
  }
} 