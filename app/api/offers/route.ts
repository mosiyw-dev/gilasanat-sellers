import { NextResponse } from "next/server"
import APIHttp from "@/framework/utils/api-http"
import API_ENDPOINTS from "@/framework/utils/api-endpoints"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    
    const response = await APIHttp.post(API_ENDPOINTS.offers.create, body)
    
    return NextResponse.json({
      data: response.data,
      message: "Offer created successfully",
      status: response.status
    })
  } catch (error: any) {
    console.error("Error creating offer:", error)
    return NextResponse.json(
      { 
        data: null, 
        message: error.response?.data?.message || "Failed to create offer",
        status: error.response?.status || 500
      },
      { status: error.response?.status || 500 }
    )
  }
} 