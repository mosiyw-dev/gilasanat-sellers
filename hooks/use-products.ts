import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import * as productsApi from "@/api/products"
import { toast } from "@/components/ui/use-toast"

// هوک دریافت لیست محصولات
export const useProducts = (status?: string) => {
  return useQuery({
    queryKey: ["products", { status }],
    queryFn: () => productsApi.getProducts(status),
  })
}

// هوک دریافت جزئیات یک محصول
export const useProduct = (id: string) => {
  return useQuery({
    queryKey: ["product", id],
    queryFn: () => productsApi.getProductById(id),
    enabled: !!id,
  })
}

// هوک افزودن محصول جدید
export const useCreateProduct = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: productsApi.createProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] })
      toast({
        title: "محصول با موفقیت ایجاد شد",
        description: "محصول جدید شما برای بررسی به ادمین ارسال شد.",
        variant: "default",
      })
    },
    onError: (error: any) => {
      toast({
        title: "خطا در ایجاد محصول",
        description: error.response?.data?.message || "مشکلی در ثبت محصول رخ داده است.",
        variant: "destructive",
      })
    },
  })
}

// هوک ویرایش محصول
export const useUpdateProduct = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: productsApi.updateProduct,
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["products"] })
      queryClient.invalidateQueries({ queryKey: ["product", variables.id] })
      toast({
        title: "محصول با موفقیت بروزرسانی شد",
        description: "تغییرات شما با موفقیت ذخیره شد.",
        variant: "default",
      })
    },
    onError: (error: any) => {
      toast({
        title: "خطا در بروزرسانی محصول",
        description: error.response?.data?.message || "مشکلی در بروزرسانی محصول رخ داده است.",
        variant: "destructive",
      })
    },
  })
}

// هوک آپلود تصویر محصول
export const useUploadProductImage = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, formData }: { id: string; formData: FormData }) => productsApi.uploadProductImage(id, formData),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["product", variables.id] })
      toast({
        title: "تصویر با موفقیت آپلود شد",
        variant: "default",
      })
    },
    onError: (error: any) => {
      toast({
        title: "خطا در آپلود تصویر",
        description: error.response?.data?.message || "مشکلی در آپلود تصویر رخ داده است.",
        variant: "destructive",
      })
    },
  })
}

// هوک حذف تصویر محصول
export const useDeleteProductImage = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ productId, imageId }: { productId: string; imageId: string }) =>
      productsApi.deleteProductImage(productId, imageId),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["product", variables.productId] })
      toast({
        title: "تصویر با موفقیت حذف شد",
        variant: "default",
      })
    },
    onError: (error: any) => {
      toast({
        title: "خطا در حذف تصویر",
        description: error.response?.data?.message || "مشکلی در حذف تصویر رخ داده است.",
        variant: "destructive",
      })
    },
  })
}

// هوک تغییر وضعیت محصول
export const useUpdateProductStatus = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: "active" | "inactive" }) =>
      productsApi.updateProductStatus(id, status),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["products"] })
      queryClient.invalidateQueries({ queryKey: ["product", variables.id] })
      toast({
        title: `محصول با موفقیت ${variables.status === "active" ? "فعال" : "غیرفعال"} شد`,
        variant: "default",
      })
    },
    onError: (error: any) => {
      toast({
        title: "خطا در تغییر وضعیت محصول",
        description: error.response?.data?.message || "مشکلی در تغییر وضعیت محصول رخ داده است.",
        variant: "destructive",
      })
    },
  })
}

// هوک ارسال محصول برای تایید
export const useSubmitProductForApproval = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: productsApi.submitProductForApproval,
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["products"] })
      queryClient.invalidateQueries({ queryKey: ["product", variables] })
      toast({
        title: "محصول برای تایید ارسال شد",
        description: "محصول شما برای بررسی به ادمین ارسال شد.",
        variant: "default",
      })
    },
    onError: (error: any) => {
      toast({
        title: "خطا در ارسال محصول برای تایید",
        description: error.response?.data?.message || "مشکلی در ارسال محصول برای تایید رخ داده است.",
        variant: "destructive",
      })
    },
  })
}

// هوک دریافت آمار فروش محصول
export const useProductStats = (id: string) => {
  return useQuery({
    queryKey: ["product-stats", id],
    queryFn: () => productsApi.getProductStats(id),
    enabled: !!id,
  })
}

