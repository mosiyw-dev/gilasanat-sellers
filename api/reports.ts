import axios from "@/lib/axios"

// تعریف تایپ‌های مورد نیاز
export interface SalesReport {
  totalSales: number
  totalOrders: number
  averageOrderValue: number
  salesByPeriod: {
    period: string
    amount: number
    orders: number
  }[]
}

export interface ProductReport {
  totalProducts: number
  activeProducts: number
  topSellingProducts: {
    id: string
    name: string
    sales: number
    revenue: number
    inventory: number
  }[]
  inventoryStatus: {
    inStock: number
    lowStock: number
    outOfStock: number
  }
}

export interface CustomerReport {
  totalCustomers: number
  newCustomers: number
  topCustomers: {
    id: string
    name: string
    orders: number
    totalSpent: number
    lastPurchase: string
  }[]
}

// دریافت گزارش فروش
export const getSalesReport = async (params?: {
  startDate?: string
  endDate?: string
  period?: "day" | "week" | "month" | "year"
}) => {
  const response = await axios.get("/reports/sales", { params })
  return response.data
}

// دریافت گزارش محصولات
export const getProductsReport = async (params?: {
  startDate?: string
  endDate?: string
  category?: string
}) => {
  const response = await axios.get("/reports/products", { params })
  return response.data
}

// دریافت گزارش مشتریان
export const getCustomersReport = async (params?: {
  startDate?: string
  endDate?: string
}) => {
  const response = await axios.get("/reports/customers", { params })
  return response.data
}

// دریافت داشبورد خلاصه
export const getDashboardSummary = async () => {
  const response = await axios.get("/reports/dashboard-summary")
  return response.data
}

// دریافت گزارش مقایسه‌ای با دوره قبل
export const getComparisonReport = async (params: {
  period: "day" | "week" | "month" | "year"
}) => {
  const response = await axios.get("/reports/comparison", { params })
  return response.data
}

