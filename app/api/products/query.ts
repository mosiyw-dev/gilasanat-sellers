import { useGenericQuery } from "@/framework/utils/generic-query"
import { GetProducts, GetProduct } from "./get"

interface Product {
  _id: string
  name: string
  code: string
  description: string
  image?: {
    cover: string
    images: string[]
  }
  price: {
    original: number
    discount?: number
  }
  balance: number
  isActive: boolean
  category: {
    id: string
    name: string
  }
  brand: string
  labels: string[]
  details: string[]
  Specifications: any[]
  totalSell: number
  createdAt: string
  updatedAt: string
}

interface ProductsResponse {
  page: number
  limit: number
  totalPages: number
  totalItems: number
  products: Product[]
}

// Function to fetch products list with pagination support
export const useProductsListQuery = (pageNo: number, rowCount: number) => {
  return useGenericQuery<ProductsResponse>(
    async () => {
      const response = await GetProducts(pageNo, rowCount)
      const data = response.data as unknown as ProductsResponse
      return data
    },
    ["products-list", pageNo, rowCount]
  )
}

// Function to fetch a single product
export const useProductQuery = (id: string) => {
  return useGenericQuery<Product>(
    async () => {
      const response = await GetProduct(id)
      return response.data
    },
    ["product", id]
  )
} 