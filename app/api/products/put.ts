import { NextResponse } from "next/server"
import { updateProduct } from "@/lib/products"
import { ProductFormData } from "@/types/products"

export async function PUT(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get("id")

    if (!id) {
      return NextResponse.json(
        { error: "Product ID is required" },
        { status: 400 }
      )
    }

    const body = await request.json()
    const productData: ProductFormData = body

    // Validate required fields
    if (!productData.name || !productData.price || !productData.categoryId) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      )
    }

    const product = await updateProduct({ id, data: productData })
    return NextResponse.json(product)
  } catch (error) {
    console.error("Error updating product:", error)
    return NextResponse.json(
      { error: "Failed to update product" },
      { status: 500 }
    )
  }
} 