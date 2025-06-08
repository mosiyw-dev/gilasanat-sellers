import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { OfferResponse } from "@/types/offers";

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
): Promise<NextResponse<OfferResponse>> {
  try {
    const offer = await prisma.offer.delete({
      where: {
        id: params.id,
      },
    });

    return NextResponse.json({
      data: offer,
      message: "Offer deleted successfully"
    });
  } catch (error) {
    console.error("Error deleting offer:", error);
    return NextResponse.json(
      { data: null, message: "Failed to delete offer" },
      { status: 500 }
    );
  }
} 