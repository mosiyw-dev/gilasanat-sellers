import APIHttp from "@/framework/utils/api-http";
import { Offer, OfferFormData, OfferResponse, OffersResponse } from "@/types/offers";

export const offersApi = {
  getAll: async (): Promise<OffersResponse> => {
    const response = await APIHttp.get<OffersResponse>("/api/offers");
    return response.data;
  },

  getById: async (id: string): Promise<OfferResponse> => {
    const response = await APIHttp.get<OfferResponse>(`/api/offers/${id}`);
    return response.data;
  },

  create: async (data: OfferFormData): Promise<OfferResponse> => {
    const response = await APIHttp.post<OfferResponse>("/api/offers", data);
    return response.data;
  },

  update: async (id: string, data: Partial<OfferFormData>): Promise<OfferResponse> => {
    const response = await APIHttp.put<OfferResponse>(`/api/offers/${id}`, data);
    return response.data;
  },

  delete: async (id: string): Promise<OfferResponse> => {
    const response = await APIHttp.delete<OfferResponse>(`/api/offers/${id}`);
    return response.data;
  },
}; 