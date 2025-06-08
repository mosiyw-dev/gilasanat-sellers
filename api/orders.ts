import axios from "@/lib/axios"

// تعریف تایپ‌های مورد نیاز
export interface Order {
  id: string
  orderNumber: string
  date: string
  totalAmount: number
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled"
  customer: {
    name: string
    phone: string
    email: string
    address: string
  }
  items: {
    productId: string
    productName: string
    quantity: number
    price: number
    totalPrice: number
  }[]
  shipping: {
    method: string
    trackingCode?: string
    estimatedDelivery?: string
    status: string
  }
  payment: {
    method: string
    status: string
    transactionId?: string
  }
}

// دریافت لیست سفارش‌ها
export const getOrders = async (params?: {
  page?: number
  limit?: number
  status?: string
  search?: string
}) => {
  const response = await axios.get("/orders", { params })
  return response.data
}

// دریافت جزئیات یک سفارش
export const getOrderById = async (id: string) => {
  const response = await axios.get(`/orders/${id}`)
  return response.data
}

// بروزرسانی وضعیت سفارش
export const updateOrderStatus = async (id: string, status: string) => {
  const response = await axios.patch(`/orders/${id}/status`, { status })
  return response.data
}

// بروزرسانی اطلاعات ارسال
export const updateShippingInfo = async (
  id: string,
  shippingInfo: {
    trackingCode?: string
    estimatedDelivery?: string
    status?: string
  },
) => {
  const response = await axios.patch(`/orders/${id}/shipping`, shippingInfo)
  return response.data
}

// دریافت آمار سفارش‌ها
export const getOrderStats = async (params?: {
  startDate?: string
  endDate?: string
}) => {
  const response = await axios.get("/orders/stats", { params })
  return response.data
}

