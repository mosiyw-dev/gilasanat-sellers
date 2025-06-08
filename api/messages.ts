import axios from "@/lib/axios"

// تعریف تایپ‌های مورد نیاز
export interface Message {
  id: string
  title: string
  content: string
  type: "admin" | "system" | "product" | "order"
  relatedId?: string // شناسه محصول یا سفارش مرتبط
  relatedName?: string // نام محصول یا شماره سفارش مرتبط
  isRead: boolean
  createdAt: string
}

// دریافت لیست پیام‌ها
export const getMessages = async (params?: {
  page?: number
  limit?: number
  type?: string
  isRead?: boolean
}) => {
  const response = await axios.get("/messages", { params })
  return response.data
}

// دریافت جزئیات یک پیام
export const getMessageById = async (id: string) => {
  const response = await axios.get(`/messages/${id}`)
  return response.data
}

// علامت‌گذاری پیام به عنوان خوانده شده
export const markMessageAsRead = async (id: string) => {
  const response = await axios.patch(`/messages/${id}/read`)
  return response.data
}

// علامت‌گذاری همه پیام‌ها به عنوان خوانده شده
export const markAllMessagesAsRead = async () => {
  const response = await axios.patch("/messages/read-all")
  return response.data
}

// ارسال پیام جدید به ادمین
export const sendMessageToAdmin = async (data: {
  title: string
  content: string
  relatedId?: string
  relatedType?: "product" | "order"
}) => {
  const response = await axios.post("/messages", data)
  return response.data
}

// دریافت تعداد پیام‌های خوانده نشده
export const getUnreadMessageCount = async () => {
  const response = await axios.get("/messages/unread-count")
  return response.data
}

