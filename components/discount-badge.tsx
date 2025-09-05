"use client"

import { Badge } from "@/components/ui/badge"
import { TrendingDown } from "lucide-react"

interface DiscountBadgeProps {
  originalPrice: number
  discountPrice: number
}

export function DiscountBadge({ originalPrice, discountPrice }: DiscountBadgeProps) {
  if (originalPrice === discountPrice) return null

  const discountAmount = originalPrice - discountPrice
  const discountPercentage = Math.round((discountAmount / originalPrice) * 100)

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("fa-IR").format(price) + " تومان"
  }

  return (
    <div className="flex items-center gap-2">
      <Badge variant="secondary" className="bg-green-100 text-green-800 border-green-200">
        <TrendingDown className="h-3 w-3 ml-1" />
        {discountPercentage}% تخفیف
      </Badge>
      <span className="text-xs text-muted-foreground">
        صرفه‌جویی: {formatPrice(discountAmount)}
      </span>
    </div>
  )
}
