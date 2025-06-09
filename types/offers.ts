export interface Offer {
  id: string;
  productId: string;
  originalPrice: number;
  inventory: number;
  status: 'active' | 'inactive';
  createdAt: string;
  updatedAt: string;
}

export interface OfferFormData {
  productId: string;
  originalPrice: number;
  discountPrice?: number;
  balance: number;
  isActive?: boolean;
  status?: 'active' | 'inactive';
}

export interface OfferResponse {
  data: Offer;
  message: string;
}

export interface OffersResponse {
  data: Offer[];
  message: string;
} 