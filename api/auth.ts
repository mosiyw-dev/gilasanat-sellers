import axios from "@/lib/axios"
import APIHttp from "@/framework/utils/api-http"
// تعریف تایپ‌های مورد نیاز
export interface LoginCredentials {
  phone: string
  password: string
}

export interface User {
  id: string
  name: string
  phone: string
  email: string
  role: string
  avatar?: string
  storeName: string
  rating: number
  productCount: number
  createdAt: string
}

// ورود کاربر
export const login = async (credentials: LoginCredentials) => {
  const response = await APIHttp.post("/auth/SellerLogin", credentials)
  return response
}

// خروج کاربر
export const logout = async () => {
  const response = await APIHttp.post("/auth/logout")
  return response.data
}

// دریافت اطلاعات کاربر جاری
export const getCurrentUser = async () => {
  const response = await APIHttp.get("/auth/me")
  return response.data
}

// بروزرسانی پروفایل کاربر
export const updateProfile = async (data: Partial<User>) => {
  const response = await APIHttp.put("/auth/profile", data)
  return response.data
}

// تغییر رمز عبور
export const changePassword = async (data: {
  currentPassword: string
  newPassword: string
  confirmPassword: string
}) => {
  const response = await APIHttp.put("/auth/change-password", data)
  return response.data
}

// درخواست بازیابی رمز عبور
export const requestPasswordReset = async (phone: string) => {
  const response = await APIHttp.post("/auth/forgot-password", { phone })
  return response.data
}

// تایید کد بازیابی و تنظیم رمز عبور جدید
export const resetPassword = async (data: {
  phone: string
  code: string
  newPassword: string
  confirmPassword: string
}) => {
  const response = await APIHttp.post("/auth/reset-password", data)
  return response.data
}

