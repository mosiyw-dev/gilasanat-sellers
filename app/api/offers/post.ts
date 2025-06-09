import { APIHttpType } from "@/framework/type"
import APIHttp from "@/framework/utils/api-http"
import API_ENDPOINTS from "@/framework/utils/api-endpoints"
import { OfferFormData } from "@/types/offers"

export const AddOffer = (offerData: OfferFormData): Promise<APIHttpType<any>> => {
  return APIHttp.post(API_ENDPOINTS.offers.create, offerData)
} 