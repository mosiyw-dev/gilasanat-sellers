import axios from "@/lib/axios"

// تعریف تایپ‌های مورد نیاز
export interface Product {
  id: string
  name: string
  description: string
  shortDescription: string
  price: number
  discountPrice: number | null
  inventory: number
  category: string
  brand: string
  status: "active" | "pending" | "edit" | "inactive"
  images: string[]
  specifications: { key: string; value: string }[]
  sku: string
  createdAt: string
  updatedAt: string
}

export interface ProductFormData {
  name: string
  description: string
  shortDescription: string
  price: number
  discountPrice?: number
  inventory: number
  category: string
  brand: string
  specifications: { key: string; value: string }[]
  sku?: string
  warranty?: string
}

// دریافت لیست محصولات
export const getProducts = async (status?: string) => {
  const params = status ? { status } : {}
  const response = await axios.get("/products", { params })
  return response.data
}

// دریافت جزئیات یک محصول
export const getProductById = async (id: string) => {
  const response = await axios.get(`/products/${id}`)
  return response.data
}

// افزودن محصول جدید
export const createProduct = async (productData: ProductFormData) => {
  const response = await axios.post("/products", productData)
  return response.data
}

// ویرایش محصول
export const updateProduct = async ({ id, data }: { id: string; data: ProductFormData }) => {
  const response = await axios.put(`/products/${id}`, data)
  return response.data
}

// آپلود تصویر محصول
export const uploadProductImage = async (id: string, formData: FormData) => {
  const response = await axios.post(`/products/${id}/images`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  })
  return response.data
}

// حذف تصویر محصول
export const deleteProductImage = async (productId: string, imageId: string) => {
  const response = await axios.delete(`/products/${productId}/images/${imageId}`)
  return response.data
}

// تغییر وضعیت محصول
export const updateProductStatus = async (id: string, status: "active" | "inactive") => {
  const response = await axios.patch(`/products/${id}/status`, { status })
  return response.data
}

// ارسال محصول برای تایید
export const submitProductForApproval = async (id: string) => {
  const response = await axios.post(`/products/${id}/submit`)
  return response.data
}

// دریافت آمار فروش محصول
export const getProductStats = async (id: string) => {
  const response = await axios.get(`/products/${id}/stats`)
  return response.data
}

