"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Package, Calendar, DollarSign, Phone, User, ArrowLeft } from "lucide-react"
import DashboardLayout from "@/components/dashboard-layout"
import { OrderDetailsCard } from "@/components/order-details-card"
import { StatusUpdateButton } from "@/components/status-update-button"
import { useSellerOrders } from "@/hooks/use-orders"
import Link from "next/link"

interface OrderDetailsPageProps {
  params: {
    id: string
  }
}

export default function OrderDetailsPage({ params }: OrderDetailsPageProps) {
  const orderNumber = params.id

  // Get all orders and find the specific order
  const { data: ordersData, isLoading, error } = useSellerOrders({
    page: 1,
    limit: 1000, // Get all orders to find the specific one
  })

  const orders = ordersData?.data || []
  const orderItem = orders.find(order => order.orderId.orderNumber.toString() === orderNumber)

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "confirmed":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "shipped":
        return "bg-green-100 text-green-800 border-green-200"
      case "canceled":
        return "bg-red-100 text-red-800 border-red-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "pending":
        return "در انتظار تایید"
      case "confirmed":
        return "تایید شده"
      case "shipped":
        return "ارسال شده"
      case "canceled":
        return "لغو شده"
      default:
        return status
    }
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("fa-IR").format(price) + " تومان"
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("fa-IR")
  }

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
          <div className="text-center py-8">
            <p>در حال بارگذاری...</p>
          </div>
        </div>
      </DashboardLayout>
    )
  }

  if (error) {
    return (
      <DashboardLayout>
        <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
          <div className="text-center py-8">
            <p className="text-red-500">خطا در بارگذاری سفارش</p>
          </div>
        </div>
      </DashboardLayout>
    )
  }

  if (!orderItem) {
    return (
      <DashboardLayout>
        <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
          <div className="text-center py-8">
            <p className="text-muted-foreground">سفارش یافت نشد</p>
            <Link href="/dashboard/orders">
              <Button variant="outline" className="mt-4">
                بازگشت به لیست سفارش‌ها
              </Button>
            </Link>
          </div>
        </div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout>
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/dashboard/orders">
              <Button variant="outline" size="sm">
                <ArrowLeft className="h-4 w-4 ml-2" />
                بازگشت
              </Button>
            </Link>
            <div>
              <h2 className="text-3xl font-bold tracking-tight">
                سفارش #{orderItem.orderId.orderNumber}
              </h2>
              <p className="text-muted-foreground">
                تاریخ سفارش: {formatDate(orderItem.orderId.date)}
              </p>
            </div>
          </div>
          <Badge className={getStatusColor(orderItem.status)}>
            {getStatusText(orderItem.status)}
          </Badge>
        </div>

        {/* Order Details */}
        <OrderDetailsCard orderItem={orderItem} />

        {/* Status Update Section */}
        <Card>
          <CardHeader>
            <CardTitle>مدیریت وضعیت سفارش</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-2">
                  وضعیت فعلی آیتم سفارش
                </p>
                <Badge className={getStatusColor(orderItem.status)}>
                  {getStatusText(orderItem.status)}
                </Badge>
              </div>
              <StatusUpdateButton
                orderItemId={orderItem._id}
                currentStatus={orderItem.status}
              />
            </div>
          </CardContent>
        </Card>

        {/* Order Timeline */}
        <Card>
          <CardHeader>
            <CardTitle>زمان‌بندی سفارش</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <Calendar className="h-4 w-4 text-primary" />
                  </div>
                </div>
                <div className="flex-1">
                  <p className="font-medium">سفارش ثبت شد</p>
                  <p className="text-sm text-muted-foreground">
                    {formatDate(orderItem.orderId.date)}
                  </p>
                </div>
              </div>

              {orderItem.status !== "pending" && (
                <div className="flex items-center gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                      <ArrowRight className="h-4 w-4 text-blue-600" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">سفارش تایید شد</p>
                    <p className="text-sm text-muted-foreground">
                      توسط فروشنده تایید شد
                    </p>
                  </div>
                </div>
              )}

              {orderItem.status === "shipped" && (
                <div className="flex items-center gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                      <Package className="h-4 w-4 text-green-600" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">سفارش ارسال شد</p>
                    <p className="text-sm text-muted-foreground">
                      محصول در حال ارسال است
                    </p>
                  </div>
                </div>
              )}

              {orderItem.status === "canceled" && (
                <div className="flex items-center gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center">
                      <ArrowRight className="h-4 w-4 text-red-600" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">سفارش لغو شد</p>
                    <p className="text-sm text-muted-foreground">
                      سفارش لغو شده است
                    </p>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}