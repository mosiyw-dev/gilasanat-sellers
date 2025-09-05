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

export const GetActiveOffers = (search?: string): Promise<APIHttpType<any[]>> => {
  const params = new URLSearchParams({
    ...(search && { search: search })
  }).toString()

  return APIHttp.get(`${API_ENDPOINTS.offers.active}?${params}`).then(response => ({
    data: response.data.offers,
    status: response.status,
    message: response.data.message
  }))
}

export const GetInActiveOffers = (search?: string): Promise<APIHttpType<any[]>> => {
  const params = new URLSearchParams({
    ...(search && { search: search })
  }).toString()

  return APIHttp.get(`${API_ENDPOINTS.offers.inactive}?${params}`).then(response => ({
    data: response.data.offers,
    status: response.status,
    message: response.data.message
  }))
} 