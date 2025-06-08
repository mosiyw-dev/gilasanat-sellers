import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import * as messagesApi from "@/api/messages"
import { toast } from "@/components/ui/use-toast"

// هوک دریافت لیست پیام‌ها
export const useMessages = (params?: {
  page?: number
  limit?: number
  type?: string
  isRead?: boolean
}) => {
  return useQuery({
    queryKey: ["messages", params],
    queryFn: () => messagesApi.getMessages(params),
  })
}

// هوک دریافت جزئیات یک پیام
export const useMessage = (id: string) => {
  return useQuery({
    queryKey: ["message", id],
    queryFn: () => messagesApi.getMessageById(id),
    enabled: !!id,
  })
}

// هوک علامت‌گذاری پیام به عنوان خوانده شده
export const useMarkMessageAsRead = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: messagesApi.markMessageAsRead,
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["messages"] })
      queryClient.invalidateQueries({ queryKey: ["message", variables] })
      queryClient.invalidateQueries({ queryKey: ["unread-message-count"] })
    },
  })
}

// هوک علامت‌گذاری همه پیام‌ها به عنوان خوانده شده
export const useMarkAllMessagesAsRead = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: messagesApi.markAllMessagesAsRead,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["messages"] })
      queryClient.invalidateQueries({ queryKey: ["unread-message-count"] })
      toast({
        title: "همه پیام‌ها به عنوان خوانده شده علامت‌گذاری شدند",
        variant: "default",
      })
    },
    onError: (error: any) => {
      toast({
        title: "خطا در علامت‌گذاری پیام‌ها",
        description: error.response?.data?.message || "مشکلی در علامت‌گذاری پیام‌ها رخ داده است.",
        variant: "destructive",
      })
    },
  })
}

// هوک ارسال پیام جدید به ادمین
export const useSendMessageToAdmin = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: messagesApi.sendMessageToAdmin,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["messages"] })
      toast({
        title: "پیام با موفقیت ارسال شد",
        description: "پیام شما به ادمین ارسال شد.",
        variant: "default",
      })
    },
    onError: (error: any) => {
      toast({
        title: "خطا در ارسال پیام",
        description: error.response?.data?.message || "مشکلی در ارسال پیام رخ داده است.",
        variant: "destructive",
      })
    },
  })
}

// هوک دریافت تعداد پیام‌های خوانده نشده
export const useUnreadMessageCount = () => {
  return useQuery({
    queryKey: ["unread-message-count"],
    queryFn: messagesApi.getUnreadMessageCount,
  })
}

