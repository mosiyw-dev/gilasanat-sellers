import { NextResponse } from "next/server"
import { createProduct } from "@/lib/products"
import { ProductFormData } from "@/types/products"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const productData: ProductFormData = body

    // Validate required fields
    if (!productData.name || !productData.price || !productData.categoryId) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      )
    }

    const product = await createProduct(productData)
    return NextResponse.json(product)
  } catch (error) {
    console.error("Error creating product:", error)
    return NextResponse.json(
      { error: "Failed to create product" },
      { status: 500 }
    )
  }
} 