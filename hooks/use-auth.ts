"use client"

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import * as authApi from "@/api/auth"
import { toast } from "@/components/ui/use-toast"
import { useRouter } from "next/navigation"


// هوک ورود کاربر
export const useLogin = () => {
  const router = useRouter()  // Use the hook inside the React component
  const queryClient = useQueryClient()

  const { mutate, isPending, error } = useMutation({
    mutationFn: authApi.login,
    onSuccess: (data) => {
      // ذخیره توکن در localStorage
      localStorage.setItem("auth_token", data.token)

      // بروزرسانی کوئری‌های مرتبط
      queryClient.invalidateQueries({ queryKey: ["current-user"] })

      toast({
        title: "ورود موفقیت‌آمیز",
        description: "به پنل فروشندگان خوش آمدید.",
        variant: "default",
      })

      // هدایت به صفحه داشبورد
      router.push("/dashboard")
    },
    onError: (error: any) => {
      const errorMessage = error?.response?.data?.message || error?.response?.data?.error || "نام کاربری یا رمز عبور اشتباه است."
      
      toast({
        title: "خطا در ورود",
        description: errorMessage,
        variant: "destructive",
      })
    },
  })

  return { login: mutate, isLoading: isPending, error }
}

// هوک خروج کاربر
export const useLogout = () => {
  const router = useRouter()
  const queryClient = useQueryClient()

  const { mutate, isPending, error } = useMutation({
    mutationFn: authApi.logout,
    onSuccess: () => {
      // حذف توکن از localStorage
      localStorage.removeItem("auth_token")

      // پاک کردن کش کوئری‌ها
      queryClient.clear()

      toast({
        title: "خروج موفقیت‌آمیز",
        description: "با موفقیت از حساب کاربری خود خارج شدید.",
        variant: "default",
      })

      // هدایت به صفحه ورود
      router.push("/login")
    },
    onError: (error: any) => {
      const errorMessage = error?.response?.data?.message || "مشکلی در خروج از حساب کاربری رخ داده است."
      
      toast({
        title: "خطا در خروج",
        description: errorMessage,
        variant: "destructive",
      })
    },
  })

  return { logout: mutate, isLoading: isPending, error }
}

// هوک دریافت اطلاعات کاربر جاری
export const useCurrentUser = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["current-user"],
    queryFn: authApi.getCurrentUser,
    retry: 1,
  })

  return { user: data, isLoading, error }
}

// هوک بروزرسانی پروفایل کاربر
export const useUpdateProfile = () => {
  const queryClient = useQueryClient()

  const { mutate, isPending, error } = useMutation({
    mutationFn: authApi.updateProfile,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["current-user"] })
      toast({
        title: "پروفایل بروزرسانی شد",
        description: "اطلاعات پروفایل شما با موفقیت بروزرسانی شد.",
        variant: "default",
      })
    },
    onError: (error: any) => {
      const errorMessage = error?.response?.data?.message || "مشکلی در بروزرسانی پروفایل رخ داده است."
      
      toast({
        title: "خطا در بروزرسانی پروفایل",
        description: errorMessage,
        variant: "destructive",
      })
    },
  })

  return { updateProfile: mutate, isLoading: isPending, error }
}

// هوک تغییر رمز عبور
export const useChangePassword = () => {
  const { mutate, isPending, error } = useMutation({
    mutationFn: authApi.changePassword,
    onSuccess: () => {
      toast({
        title: "رمز عبور تغییر یافت",
        description: "رمز عبور شما با موفقیت تغییر یافت.",
        variant: "default",
      })
    },
    onError: (error: any) => {
      const errorMessage = error?.response?.data?.message || "مشکلی در تغییر رمز عبور رخ داده است."
      
      toast({
        title: "خطا در تغییر رمز عبور",
        description: errorMessage,
        variant: "destructive",
      })
    },
  })

  return { changePassword: mutate, isLoading: isPending, error }
}

// هوک درخواست بازیابی رمز عبور
export const useRequestPasswordReset = () => {
  const { mutate, isPending, error } = useMutation({
    mutationFn: authApi.requestPasswordReset,
    onSuccess: () => {
      toast({
        title: "کد بازیابی ارسال شد",
        description: "کد بازیابی رمز عبور به شماره موبایل شما ارسال شد.",
        variant: "default",
      })
    },
    onError: (error: any) => {
      const errorMessage = error?.response?.data?.message || "مشکلی در ارسال کد بازیابی رخ داده است."
      
      toast({
        title: "خطا در ارسال کد بازیابی",
        description: errorMessage,
        variant: "destructive",
      })
    },
  })

  return { requestPasswordReset: mutate, isLoading: isPending, error }
}

// هوک تایید کد بازیابی و تنظیم رمز عبور جدید
export const useResetPassword = () => {
  const router = useRouter()

  const { mutate, isPending, error } = useMutation({
    mutationFn: authApi.resetPassword,
    onSuccess: () => {
      toast({
        title: "رمز عبور بازیابی شد",
        description: "رمز عبور شما با موفقیت بازیابی شد. اکنون می‌توانید وارد شوید.",
        variant: "default",
      })

      // هدایت به صفحه ورود
      router.push("/login")
    },
    onError: (error: any) => {
      const errorMessage = error?.response?.data?.message || "مشکلی در بازیابی رمز عبور رخ داده است."
      
      toast({
        title: "خطا در بازیابی رمز عبور",
        description: errorMessage,
        variant: "destructive",
      })
    },
  })

  return { resetPassword: mutate, isLoading: isPending, error }
}
