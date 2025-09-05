import { APIHttpType } from "@/framework/type"
import APIHttp from "@/framework/utils/api-http"
import API_ENDPOINTS from "@/framework/utils/api-endpoints"
import { Product } from "@/types/products"

// Get all products with pagination and search
export const GetProducts = (
  pageNo: number = 1,
  rowCount: number = 10,
  search?: string
): Promise<APIHttpType<Product[]>> => {
  const params = new URLSearchParams({
    pageNo: pageNo.toString(),
    rowCount: rowCount.toString(),
    ...(search && { search: search })
  }).toString()

  return APIHttp.get(`${API_ENDPOINTS.products.list}?${params}`)
}

// Get a single product by ID
export const GetProduct = (id: string): Promise<APIHttpType<Product>> => {
  return APIHttp.get(API_ENDPOINTS.products.get(id))
}
