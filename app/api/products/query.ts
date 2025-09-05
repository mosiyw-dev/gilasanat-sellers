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
  products: Product[]
  total: number
  page: number
  limit: number
}

// Function to fetch products list with pagination and search support
export const useProductsListQuery = (pageNo: number, rowCount: number, search?: string) => {
  return useGenericQuery<ProductsResponse>(
    async () => {
      const response = await GetProducts(pageNo, rowCount, search)
      const data = response.data as unknown as ProductsResponse
      return data
    },
    ["products-list", pageNo, rowCount, search]
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