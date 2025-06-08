import { APIHttpType } from "@/framework/type"
import APIHttp from "@/framework/utils/api-http"
import API_ENDPOINTS from "@/framework/utils/api-endpoints"

// Get all offers for a product
export const GetProductOffers = (productId: string): Promise<APIHttpType<any[]>> => {
  return APIHttp.get(API_ENDPOINTS.offers.getByProduct(productId)).then(response => ({
    data: response.data.offers,
    message: 'Success',
    status: response.status
  }))
}

// Get a single offer by ID
export const GetOffer = (id: string): Promise<APIHttpType<any>> => {
  return APIHttp.get(`${API_ENDPOINTS.offers.get}/${id}`)
}

// Get all offers
export const GetOffers = (): Promise<APIHttpType<any[]>> => {
  return APIHttp.get(API_ENDPOINTS.offers.list)
}

export const GetActiveOffers = (): Promise<APIHttpType<any[]>> => {
  return APIHttp.get(API_ENDPOINTS.offers.active).then(response => ({
    data: response.data.offers,
    status: response.status,
    message: response.data.message
  }))
} 