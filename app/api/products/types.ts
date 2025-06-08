export interface Product {
  _id: string
  name: string
  code: string
  isActive: boolean
  balance: number
  price: {
    original: number
    discount?: number
  }
  image?: {
    cover?: string
  }
} 