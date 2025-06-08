import { useQuery } from "@tanstack/react-query"
import * as reportsApi from "@/api/reports"

// هوک دریافت گزارش فروش
export const useSalesReport = (params?: {
  startDate?: string
  endDate?: string
  period?: "day" | "week" | "month" | "year"
}) => {
  return useQuery({
    queryKey: ["sales-report", params],
    queryFn: () => reportsApi.getSalesReport(params),
  })
}

// هوک دریافت گزارش محصولات
export const useProductsReport = (params?: {
  startDate?: string
  endDate?: string
  category?: string
}) => {
  return useQuery({
    queryKey: ["products-report", params],
    queryFn: () => reportsApi.getProductsReport(params),
  })
}

// هوک دریافت گزارش مشتریان
export const useCustomersReport = (params?: {
  startDate?: string
  endDate?: string
}) => {
  return useQuery({
    queryKey: ["customers-report", params],
    queryFn: () => reportsApi.getCustomersReport(params),
  })
}

// هوک دریافت داشبورد خلاصه
export const useDashboardSummary = () => {
  return useQuery({
    queryKey: ["dashboard-summary"],
    queryFn: reportsApi.getDashboardSummary,
  })
}

// هوک دریافت گزارش مقایسه‌ای با دوره قبل
export const useComparisonReport = (period: "day" | "week" | "month" | "year") => {
  return useQuery({
    queryKey: ["comparison-report", period],
    queryFn: () => reportsApi.getComparisonReport({ period }),
  })
}

