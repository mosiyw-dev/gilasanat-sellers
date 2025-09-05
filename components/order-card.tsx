"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Eye, Package, Calendar, DollarSign } from "lucide-react"
import Link from "next/link"
import type { SellerOrderItem } from "@/api/orders"
import { DiscountBadge } from "@/components/discount-badge"

interface OrderCardProps {
  orderItem: SellerOrderItem
  onViewDetails?: (orderId: string) => void
}

export function OrderCard({ orderItem, onViewDetails }: OrderCardProps) {
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
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">
            سفارش #{orderItem.orderId.orderNumber}
          </CardTitle>
          <Badge className={getStatusColor(orderItem.status)}>
            {getStatusText(orderItem.status)}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Customer Info */}
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10">
            <AvatarFallback className="bg-primary/10 text-primary">
              {orderItem.orderId.user.full_name.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="font-medium">{orderItem.orderId.user.full_name}</p>
            <p className="text-sm text-muted-foreground">
              {orderItem.orderId.user.phone_number}
            </p>
          </div>
        </div>

        {/* Product Info */}
        <div className="flex items-center gap-3">
          <div className="h-12 w-12 rounded-lg bg-gray-100 flex items-center justify-center">
            <Package className="h-6 w-6 text-gray-500" />
          </div>
          <div className="flex-1">
            <p className="font-medium">{orderItem.name}</p>
            <p className="text-sm text-muted-foreground">
              تعداد: {orderItem.balance}
            </p>
            <DiscountBadge 
              originalPrice={orderItem.originalPrice} 
              discountPrice={orderItem.discountPrice} 
            />
          </div>
        </div>

        {/* Order Details */}
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span>{formatDate(orderItem.orderId.date)}</span>
          </div>
          <div className="flex items-center gap-2">
            <DollarSign className="h-4 w-4 text-muted-foreground" />
            <span className="font-medium">{formatPrice(orderItem.subtotal)}</span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2 pt-2">
          <Button
            variant="outline"
            size="sm"
            className="flex-1"
            onClick={() => onViewDetails?.(orderItem.orderId.orderNumber.toString())}
          >
            <Eye className="h-4 w-4 ml-2" />
            مشاهده جزئیات
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
