import { APIHttpType } from "@/framework/type"
import APIHttp from "@/framework/utils/api-http"
import API_ENDPOINTS from "@/framework/utils/api-endpoints"
import { OfferFormData } from "@/types/offers"

export const UpdateOffer = (offerId: string, offerData: Partial<OfferFormData>): Promise<APIHttpType<any>> => {
  return APIHttp.put(API_ENDPOINTS.offers.update(offerId), offerData)
}
