import axios from "@/lib/axios"

// تعریف تایپ‌های مورد نیاز
export interface ProductOffer {
  id: string
  productId: string
  sellerId: string
  originalPrice: number
  discountPrice: number | null
  inventory: number
  status: "active" | "pending" | "inactive"
  createdAt: string
  updatedAt: string
}

export interface OfferFormData {
  productId: string
  originalPrice: number
  discountPrice?: number
  inventory: number
}

// دریافت لیست پیشنهادات یک محصول
export const getProductOffers = async (productId: string) => {
  const response = await axios.get(`/products/${productId}/offers`)
  return response.data
}

// افزودن پیشنهاد جدید
export const createOffer = async (offerData: OfferFormData) => {
  const response = await axios.post("/offers", offerData)
  return response.data
}

// ویرایش پیشنهاد
export const updateOffer = async ({ id, data }: { id: string; data: OfferFormData }) => {
  const response = await axios.put(`/offers/${id}`, data)
  return response.data
}

// تغییر وضعیت پیشنهاد
export const updateOfferStatus = async (id: string, status: "active" | "inactive") => {
  const response = await axios.patch(`/offers/${id}/status`, { status })
  return response.data
}

// حذف پیشنهاد
export const deleteOffer = async (id: string) => {
  const response = await axios.delete(`/offers/${id}`)
  return response.data
} 