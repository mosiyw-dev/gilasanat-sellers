export interface ProductOffer {
  _id: string
  product: string
  seller: {
    _id: string
  }
  originalPrice: number
  discountPrice: number
  balance: number
  isActive: boolean
  createdAt: string
  updatedAt: string
}

export interface OfferFormData {
  productId: string
  originalPrice: number
  discountPrice?: number
  inventory: number
} 