export interface SellerProfile {
  _id: string
  name: string
  shopName: string
  totalOffers: number
  email: string
  phone: string
  address: string
  logo?: string
  description?: string
  rating: number
  isVerified: boolean
  createdAt: string
  updatedAt: string
} 