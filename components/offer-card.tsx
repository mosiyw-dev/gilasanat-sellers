import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Pencil } from "lucide-react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Image as ImageIcon } from "lucide-react"
import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

interface OfferCardProps {
  offer: {
    _id: string
    originalPrice: number
    discountPrice: number
    balance: number
    isActive: boolean
    rank?: number
  }
  product: {
    _id: string
    name: string
    image?: {
      cover?: string
    }
  }
  onAddOffer?: () => void
}

function ProductImagePlaceholder() {
  return (
    <div className="w-24 h-24 bg-muted flex items-center justify-center rounded-md">
      <ImageIcon className="h-8 w-8 text-muted-foreground" />
    </div>
  )
}

export function OfferCard({ offer, product, onAddOffer }: OfferCardProps) {
  const [imageError, setImageError] = useState(false)
  const router = useRouter()

  const handleEditClick = () => {
    router.push(`/dashboard/products/${product._id}/offers?edit=${offer._id}`)
  }

  return (
    <Card>
      <CardContent className="p-4" dir="rtl">
        <div className="flex items-center gap-4">
          <div className="relative w-24 h-24 rounded-md overflow-hidden flex-shrink-0">
            {product.image?.cover && !imageError ? (
              <Image
                src={product.image.cover}
                alt={product.name}
                fill
                className="object-cover"
                onError={() => setImageError(true)}
              />
            ) : (
              <div className="w-full h-full bg-muted flex items-center justify-center">
                <ImageIcon className="w-8 h-8 text-muted-foreground" />
              </div>
            )}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between">
              <h3 className="font-medium text-base truncate">{product.name}</h3>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={handleEditClick}
                      className="h-8 w-8 -mt-1 -mr-1"
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>ویرایش</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <div className="space-y-2 mt-2">
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">قیمت اصلی:</span>
                <span className="text-sm font-medium">
                  {offer.originalPrice.toLocaleString()} تومان
                </span>
              </div>
              {offer.discountPrice ? (
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">قیمت با تخفیف:</span>
                  <span className="text-sm font-medium text-green-600">
                    {offer.discountPrice.toLocaleString()} تومان
                  </span>
                </div>
              ): 
              <span className="text-sm text-muted-foreground">تخفیف ندارد</span>
              }
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">موجودی:</span>
                <span className="text-sm font-medium">{offer.balance}</span>
              </div>
              {offer.rank && offer.rank <= 3 && (
                <div className="flex items-center gap-2">
                  <Badge variant="secondary">
                    رتبه {offer.rank} در لیست آفر محصول
                  </Badge>
                </div>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
} 