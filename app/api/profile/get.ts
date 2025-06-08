import { APIHttpType } from "@/framework/type"
import APIHttp from "@/framework/utils/api-http"
import API_ENDPOINTS from "@/framework/utils/api-endpoints"
import { SellerProfile } from "./types"
 
export const GetSellerProfile = (): Promise<APIHttpType<SellerProfile>> => {
  return APIHttp.get(API_ENDPOINTS.sellers.profile)
} 