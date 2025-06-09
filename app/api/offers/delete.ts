import { APIHttpType } from "@/framework/type"
import APIHttp from "@/framework/utils/api-http"
import API_ENDPOINTS from "@/framework/utils/api-endpoints"

export const DeleteOffer = (offerId: string): Promise<APIHttpType<any>> => {
  return APIHttp.delete(API_ENDPOINTS.offers.delete(offerId))
}
