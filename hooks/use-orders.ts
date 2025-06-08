import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import * as ordersApi from "@/api/orders"
import { toast } from "@/components/ui/use-toast"

// هوک دریافت لیست سفارش‌ها
export const useOrders = (params?: {
  page?: number
  limit?: number
  status?: string
  search?: string
}) => {
  return useQuery({
    queryKey: ["orders", params],
    queryFn: () => ordersApi.getOrders(params),
  })
}

// هوک دریافت جزئیات یک سفارش
export const useOrder = (id: string) => {
  return useQuery({
    queryKey: ["order", id],
    queryFn: () => ordersApi.getOrderById(id),
    enabled: !!id,
  })
}

// هوک بروزرسانی وضعیت سفارش
export const useUpdateOrderStatus = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: string }) => ordersApi.updateOrderStatus(id, status),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["orders"] })
      queryClient.invalidateQueries({ queryKey: ["order", variables.id] })
      toast({
        title: "وضعیت سفارش بروزرسانی شد",
        description: `وضعیت سفارش به "${variables.status}" تغییر یافت.`,
        variant: "default",
      })
    },
    onError: (error: any) => {
      toast({
        title: "خطا در بروزرسانی وضعیت سفارش",
        description: error.response?.data?.message || "مشکلی در بروزرسانی وضعیت سفارش رخ داده است.",
        variant: "destructive",
      })
    },
  })
}

// هوک بروزرسانی اطلاعات ارسال
export const useUpdateShippingInfo = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({
      id,
      shippingInfo,
    }: {
      id: string
      shippingInfo: {
        trackingCode?: string
        estimatedDelivery?: string
        status?: string
      }
    }) => ordersApi.updateShippingInfo(id, shippingInfo),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["orders"] })
      queryClient.invalidateQueries({ queryKey: ["order", variables.id] })
      toast({
        title: "اطلاعات ارسال بروزرسانی شد",
        variant: "default",
      })
    },
    onError: (error: any) => {
      toast({
        title: "خطا در بروزرسانی اطلاعات ارسال",
        description: error.response?.data?.message || "مشکلی در بروزرسانی اطلاعات ارسال رخ داده است.",
        variant: "destructive",
      })
    },
  })
}

// هوک دریافت آمار سفارش‌ها
export const useOrderStats = (params?: {
  startDate?: string
  endDate?: string
}) => {
  return useQuery({
    queryKey: ["order-stats", params],
    queryFn: () => ordersApi.getOrderStats(params),
  })
}

