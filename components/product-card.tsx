import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Image as ImageIcon, Plus } from "lucide-react"
import Image from "next/image"
import { Product } from "@/types/product"
import { useState } from "react"
import { useRouter } from "next/navigation"

interface ProductCardProps {
  product: Product
  onAddOffer?: () => void
}

function ProductImagePlaceholder() {
  return (
    <div className="w-full h-full bg-muted flex flex-col items-center justify-center gap-2">
      <ImageIcon className="h-8 w-8 text-muted-foreground" />
      <span className="text-sm text-muted-foreground">بدون تصویر</span>
    </div>
  )
}

export function ProductCard({ product, onAddOffer }: ProductCardProps) {
  const [imageError, setImageError] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const router = useRouter()

  const handleAddOffer = () => {
    if (onAddOffer) {
      onAddOffer()
    }
    router.push(`/dashboard/products/${product._id}/offers`)
  }


  return (
    <Card 
      className="group overflow-hidden transition-all duration-300 hover:shadow-lg relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <CardHeader className="p-0 relative">
        <div className="aspect-square relative overflow-hidden">
          {product.image?.cover && !imageError ? (
            <Image
              src={product.image.cover}
              alt={product.name}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-110"
              onError={() => setImageError(true)}
            />
          ) : (
            <ProductImagePlaceholder />
          )}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
        </div>
      </CardHeader>
      <CardContent className="p-4 space-y-3" dir="rtl">
        <h3 className="font-semibold text-lg line-clamp-1">{product.name}</h3>
        <div className="space-y-1">
          {product.price?.original ? (
            <>
              <div className="text-sm text-muted-foreground">بهترین قیمت:</div>
              {product.price.discount ? (
                <div className="flex items-center gap-2">
                  <div className="line-through text-muted-foreground text-sm">
                    {product.price.original.toLocaleString()} تومان
                  </div>
                  <div className="text-green-600 font-semibold">
                    {product.price.discount.toLocaleString()} تومان
                  </div>
                </div>
              ) : (
                <div className="font-semibold">
                  {product.price.original.toLocaleString()} تومان
                </div>
              )}
            </>
          ) : (
            <div className="text-sm text-muted-foreground">
              در حال حاضر هیچ فروشنده‌ای این محصول را موجود ندارد. با ثبت افر خود، بدون رقیب فروشنده این محصول باشید.
            </div>
          )}
        </div>
      </CardContent>
      <div 
        className={`absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center transition-opacity duration-300 ${
          isHovered ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        <Button 
          onClick={handleAddOffer}
          className="bg-white text-black hover:bg-white/90"
        >
          <Plus className="ml-2 h-4 w-4" />
          افزودن افر شما برای این محصول
        </Button>
      </div>
    </Card>
  )
} 