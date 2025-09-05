import axios from "@/lib/axios"
import API_ENDPOINTS from "@/framework/utils/api-endpoints"

// تعریف تایپ‌های مورد نیاز برای فروشنده
export interface SellerOrderItem {
  _id: string
  orderId: {
    _id: string
    orderNumber: number
    status: string
    date: string
    payablePrice: number
    user: {
      full_name: string
      phone_number: string
    }
  }
  productId: {
    _id: string
    name: string
  }
  sellerId: string
  offerId: {
    _id: string
    originalPrice: number
    discountPrice: number
  }
  name: string
  balance: number // quantity ordered
  originalPrice: number
  discountPrice: number
  finalPrice: number
  subtotal: number
  status: "pending" | "confirmed" | "shipped" | "canceled"
  createdAt: string
  updatedAt: string
  __v: number
}

export interface SellerOrdersResponse {
  orderItems: SellerOrderItem[]
}

export interface SellerAnalytics {
  analytics: {
    totalItemsSold: number
    totalRevenue: number
    averageItemPrice: number
    pendingItems: number
    confirmedItems: number
    shippedItems: number
    cancelledItems: number
  }
  dailySales: Array<{
    _id: { year: number; month: number; day: number }
    itemsSold: number
    revenue: number
  }>
}

// تعریف تایپ‌های عمومی سفارش (برای سازگاری با کد موجود)
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

// ============ API های مخصوص فروشنده ============

// دریافت لیست سفارش‌های فروشنده
export const getSellerOrders = async (params?: {
  page?: number
  limit?: number
  status?: string
  search?: string
  startDate?: string
  endDate?: string
}) => {
  const response = await axios.get(API_ENDPOINTS.orders.seller.list, { params })
  const data: SellerOrdersResponse = response.data
  
  // تبدیل response به فرمت مورد انتظار
  return {
    data: data.orderItems,
    total: data.orderItems.length, // اگر API pagination نداشت، از طول آرایه استفاده می‌کنیم
    page: params?.page || 1,
    limit: params?.limit || 10
  }
}

// بروزرسانی وضعیت آیتم سفارش فروشنده
export const updateSellerOrderItemStatus = async (
  itemId: string,
  status: "pending" | "confirmed" | "shipped" | "canceled"
) => {
  const response = await axios.put(API_ENDPOINTS.orders.seller.updateItemStatus(itemId), {
    status
  })
  return response.data
}

// دریافت آمار فروشنده
export const getSellerAnalytics = async (params?: {
  startDate?: string
  endDate?: string
}) => {
  const response = await axios.get(API_ENDPOINTS.orders.seller.analytics, { params })
  return response.data
}

