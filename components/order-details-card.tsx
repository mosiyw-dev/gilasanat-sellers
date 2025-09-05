"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Package, Calendar, DollarSign, Phone, User } from "lucide-react"
import type { SellerOrderItem } from "@/api/orders"

interface OrderDetailsCardProps {
  orderItem: SellerOrderItem
}

export function OrderDetailsCard({ orderItem }: OrderDetailsCardProps) {
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

  return (
    <div className="space-y-6">
      {/* Order Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl">
              سفارش #{orderItem.orderId.orderNumber}
            </CardTitle>
            <Badge className={getStatusColor(orderItem.status)}>
              {getStatusText(orderItem.status)}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span>تاریخ سفارش: {formatDate(orderItem.orderId.date)}</span>
            </div>
            <div className="flex items-center gap-2">
              <DollarSign className="h-4 w-4 text-muted-foreground" />
              <span>مبلغ کل سفارش: {formatPrice(orderItem.orderId.payablePrice)}</span>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline">
                وضعیت سفارش: {orderItem.orderId.status}
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Customer Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            اطلاعات مشتری
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4">
            <Avatar className="h-12 w-12">
              <AvatarFallback className="bg-primary/10 text-primary">
                {orderItem.orderId.user.full_name.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div className="space-y-1">
              <p className="font-medium">{orderItem.orderId.user.full_name}</p>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Phone className="h-4 w-4" />
                <span>{orderItem.orderId.user.phone_number}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Product Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Package className="h-5 w-5" />
            اطلاعات محصول
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="h-16 w-16 rounded-lg bg-gray-100 flex items-center justify-center">
                <Package className="h-8 w-8 text-gray-500" />
              </div>
              <div className="flex-1">
                <h3 className="font-medium text-lg">{orderItem.name}</h3>
                <p className="text-sm text-muted-foreground">
                  تعداد سفارش: {orderItem.balance}
                </p>
                {orderItem.originalPrice !== orderItem.discountPrice && (
                  <p className="text-sm text-green-600">
                    قیمت اصلی: {formatPrice(orderItem.originalPrice)} | 
                    قیمت با تخفیف: {formatPrice(orderItem.discountPrice)}
                  </p>
                )}
              </div>
            </div>
            
            <Separator />
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <p className="text-sm text-muted-foreground">قیمت واحد</p>
                <p className="font-medium">{formatPrice(orderItem.finalPrice)}</p>
              </div>
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <p className="text-sm text-muted-foreground">تعداد</p>
                <p className="font-medium">{orderItem.balance}</p>
              </div>
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <p className="text-sm text-muted-foreground">مجموع</p>
                <p className="font-medium">{formatPrice(orderItem.subtotal)}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
