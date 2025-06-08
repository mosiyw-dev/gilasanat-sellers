"use client"

import { useParams, useRouter, useSearchParams } from "next/navigation"
import { useProductQuery } from "@/app/api/products/query"
import { useProductOffersQuery } from "@/app/api/offers/query"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle, PackageOpen, Star, Pencil, Trash2, Power, Info, AlertTriangle, CheckCircle2, X } from "lucide-react"
import Image from "next/image"
import DashboardLayout from "@/components/dashboard-layout"
import { useState, useRef, useEffect } from "react"
import { toast } from "sonner"
import { ProductOffer } from "@/app/api/offers/types"
import { useSellerProfileStore } from "@/app/store/seller-profile"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"
import { motion, AnimatePresence } from "framer-motion"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { formatNumber } from "@/lib/utils"
import { Loading } from "@/components/ui/loading"

export default function ProductOffersPage() {
  const params = useParams()
  const router = useRouter()
  const searchParams = useSearchParams()
  const editOfferId = searchParams.get('edit')
  const { data: product, isLoading: isProductLoading } = useProductQuery(params.id as string)
  const { data: offers, isLoading: isOffersLoading } = useProductOffersQuery(params.id as string)
  const [activeTab, setActiveTab] = useState("all")
  const [showAddOffer, setShowAddOffer] = useState(false)
  const [imageError, setImageError] = useState(false)
  const [editingOfferId, setEditingOfferId] = useState<string | null>(editOfferId)
  const [newOffer, setNewOffer] = useState({
    originalPrice: "",
    discountPrice: "",
    inventory: "",
  })
  const [editOffer, setEditOffer] = useState({
    originalPrice: "",
    discountPrice: "",
    inventory: "",
  })
  const [isEditIconRotated, setIsEditIconRotated] = useState(!!editOfferId)
  const editCardRef = useRef<HTMLDivElement>(null)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [showStatusConfirm, setShowStatusConfirm] = useState(false)
  const [showEditConfirm, setShowEditConfirm] = useState(false)
  const [offerToAction, setOfferToAction] = useState<ProductOffer | null>(null)
  const [newStatus, setNewStatus] = useState<boolean | null>(null)
  const addOfferRef = useRef<HTMLDivElement>(null)

  const sellerProfile = useSellerProfileStore((state) => state.profile)
  const currentSellerId = sellerProfile?.id

  useEffect(() => {
    if (editOfferId && offers?.data) {
      const offerToEdit = offers.data.find((offer: ProductOffer) => offer._id === editOfferId)
      if (offerToEdit) {
        if (offerToEdit.seller?._id !== currentSellerId) {
          toast.error("شما نمی‌توانید این آفر را ویرایش کنید")
          const newUrl = new URL(window.location.href)
          newUrl.searchParams.delete('edit')
          router.push(newUrl.pathname)
          return
        }

        setEditOffer({
          originalPrice: offerToEdit.originalPrice.toString(),
          discountPrice: offerToEdit.discountPrice?.toString() || "",
          inventory: offerToEdit.balance.toString(),
        })
        setTimeout(() => {
          editCardRef.current?.scrollIntoView({ 
            behavior: 'smooth',
            block: 'center'
          })
        }, 100)
      } else {
        const newUrl = new URL(window.location.href)
        newUrl.searchParams.delete('edit')
        router.push(newUrl.pathname)
        toast.error("آفر مورد نظر یافت نشد")
      }
    }
  }, [editOfferId, offers?.data, currentSellerId, router])

  if (isProductLoading || isOffersLoading) {
    return <Loading fullScreen size="lg" />
  }

  if (!product) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <p className="text-muted-foreground">محصول یافت نشد</p>
      </div>
    )
  }

  const filteredOffers = activeTab === "my" 
    ? (offers?.data || []).filter((offer: ProductOffer) => offer.seller?._id === currentSellerId)
    : (offers?.data || [])

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("fa-IR").format(price)
  }

  const handleAddOfferClick = () => {
    setShowAddOffer(true)
    setNewOffer({
      originalPrice: "",
      discountPrice: "",
      inventory: "",
    })
    setTimeout(() => {
      addOfferRef.current?.scrollIntoView({ 
        behavior: 'smooth',
        block: 'center'
      })
    }, 100)
  }

  const handleCancelAddOffer = () => {
    setShowAddOffer(false)
    setNewOffer({
      originalPrice: "",
      discountPrice: "",
      inventory: "",
    })
  }

  const handleSubmitNewOffer = async () => {
    try {
      // Validate inputs
      if (!newOffer.originalPrice || !newOffer.inventory) {
        toast.error("لطفا قیمت اصلی و موجودی را وارد کنید")
        return
      }

      const offerData = {
        productId: params.id as string,
        originalPrice: Number(newOffer.originalPrice),
        discountPrice: newOffer.discountPrice ? Number(newOffer.discountPrice) : undefined,
        inventory: Number(newOffer.inventory),
        isActive: true
      }

      const response = await fetch("/api/offers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(offerData),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || "Failed to create offer")
      }

      toast.success("آفر با موفقیت ایجاد شد")
      setShowAddOffer(false)
      setNewOffer({
        originalPrice: "",
        discountPrice: "",
        inventory: "",
      })
      // Refresh offers list
      router.refresh()
    } catch (error) {
      console.error("Error creating offer:", error)
      toast.error("خطا در ایجاد آفر")
    }
  }

  const handleEditOffer = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      // Here you would call your API to update the offer
      toast.success("پیشنهاد با موفقیت ویرایش شد")
      setEditingOfferId(null)
      setEditOffer({ originalPrice: "", discountPrice: "", inventory: "" })
    } catch (error) {
      toast.error("خطا در ویرایش پیشنهاد")
    }
  }

  const toggleEdit = (offer: ProductOffer) => {
    if (offer.seller?._id !== currentSellerId) {
      toast.error("شما نمی‌توانید این آفر را ویرایش کنید")
      return
    }

    if (editingOfferId === offer._id) {
      setEditingOfferId(null)
      setIsEditIconRotated(false)
      const newUrl = new URL(window.location.href)
      newUrl.searchParams.delete('edit')
      router.push(newUrl.pathname)
    } else {
      setEditingOfferId(offer._id)
      setIsEditIconRotated(true)
      setEditOffer({
        originalPrice: offer.originalPrice.toString(),
        discountPrice: offer.discountPrice?.toString() || "",
        inventory: offer.balance.toString(),
      })
      const newUrl = new URL(window.location.href)
      newUrl.searchParams.set('edit', offer._id)
      router.push(newUrl.pathname + newUrl.search)
      setTimeout(() => {
        editCardRef.current?.scrollIntoView({ 
          behavior: 'smooth',
          block: 'center'
        })
      }, 100)
    }
  }

  const handleToggleActive = async (offerId: string, currentStatus: boolean) => {
    try {
      // Here you would call your API to toggle the offer status
      const newStatus = !currentStatus
      toast.success(`پیشنهاد با موفقیت ${newStatus ? 'فعال' : 'غیرفعال'} شد`)
    } catch (error) {
      toast.error("خطا در تغییر وضعیت پیشنهاد")
    }
  }

  const handleDeleteOffer = async (offerId: string) => {
    try {
      // Here you would call your API to delete the offer
      toast.success("پیشنهاد با موفقیت حذف شد")
    } catch (error) {
      toast.error("خطا در حذف پیشنهاد")
    }
  }

  const handleDeleteConfirm = async () => {
    if (offerToAction) {
      await handleDeleteOffer(offerToAction._id)
      setShowDeleteConfirm(false)
      setOfferToAction(null)
    }
  }

  const handleStatusConfirm = async () => {
    if (offerToAction && newStatus !== null) {
      await handleToggleActive(offerToAction._id, newStatus)
      setShowStatusConfirm(false)
      setOfferToAction(null)
      setNewStatus(null)
    }
  }

  const handleEditConfirm = async (e: React.FormEvent) => {
    e.preventDefault()
    setShowEditConfirm(true)
  }

  const handleEditSubmit = async () => {
    await handleEditOffer(new Event('submit') as any)
    setShowEditConfirm(false)
    const newUrl = new URL(window.location.href)
    newUrl.searchParams.delete('edit')
    router.push(newUrl.pathname)
  }

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target
    const cursorPosition = input.selectionStart
    const value = input.value.replace(/,/g, '')
    
    if (value === '' || /^\d+$/.test(value)) {
      setNewOffer((prev) => ({ ...prev, originalPrice: value }))
      
      // Restore cursor position after state update
      requestAnimationFrame(() => {
        const newPosition = cursorPosition
        input.setSelectionRange(newPosition, newPosition)
      })
    }
  }

  const handleDiscountPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target
    const cursorPosition = input.selectionStart
    const value = input.value.replace(/,/g, '')
    
    if (value === '' || /^\d+$/.test(value)) {
      setNewOffer((prev) => ({ ...prev, discountPrice: value }))
      
      // Restore cursor position after state update
      requestAnimationFrame(() => {
        const newPosition = cursorPosition
        input.setSelectionRange(newPosition, newPosition)
      })
    }
  }

  const handleStockChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target
    const cursorPosition = input.selectionStart
    const value = input.value.replace(/,/g, '')
    
    if (value === '' || /^\d+$/.test(value)) {
      setNewOffer((prev) => ({ ...prev, inventory: value }))
      
      // Restore cursor position after state update
      requestAnimationFrame(() => {
        const newPosition = cursorPosition
        input.setSelectionRange(newPosition, newPosition)
      })
    }
  }

  const handleEditPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target
    const cursorPosition = input.selectionStart
    const value = input.value.replace(/,/g, '')
    
    if (value === '' || /^\d+$/.test(value)) {
      setEditOffer((prev) => ({ ...prev, originalPrice: value }))
      
      // Restore cursor position after state update
      requestAnimationFrame(() => {
        const newPosition = cursorPosition
        input.setSelectionRange(newPosition, newPosition)
      })
    }
  }

  const handleEditDiscountPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target
    const cursorPosition = input.selectionStart
    const value = input.value.replace(/,/g, '')
    
    if (value === '' || /^\d+$/.test(value)) {
      setEditOffer((prev) => ({ ...prev, discountPrice: value }))
      
      // Restore cursor position after state update
      requestAnimationFrame(() => {
        const newPosition = cursorPosition
        input.setSelectionRange(newPosition, newPosition)
      })
    }
  }

  const handleEditStockChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target
    const cursorPosition = input.selectionStart
    const value = input.value.replace(/,/g, '')
    
    if (value === '' || /^\d+$/.test(value)) {
      setEditOffer((prev) => ({ ...prev, inventory: value }))
      
      // Restore cursor position after state update
      requestAnimationFrame(() => {
        const newPosition = cursorPosition
        input.setSelectionRange(newPosition, newPosition)
      })
    }
  }


  return (
    <DashboardLayout>
      <div className="container py-6 space-y-6">

        {/* Product Summary Card */}
        <Card>
          <CardContent className="p-4">
            <div className="flex gap-4 items-center">
              <div className="relative w-24 h-24 rounded-lg overflow-hidden flex-shrink-0 bg-gray-100 text-center">
                {product.image?.cover && !imageError ? (
                  <Image
                    src={product.image.cover}
                    alt={product.name}
                    fill
                    className="object-cover"
                    onError={() => setImageError(true)}
                  />
                ) : (
                  <div className="w-full h-full bg-muted flex flex-col items-center justify-center gap-2">
                    <PackageOpen className="h-8 w-8 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">بدون تصویر</span>
                  </div>
                )}
              </div>
              <div className="flex-grow">
                <h1 className="text-xl font-bold mb-2">{product.name}</h1>
                <div className="flex gap-4 text-sm text-muted-foreground">
                  <span>برند: {product.brand}</span>
                  <span>کد: {product.code}</span>
                </div>
              </div>
              <Button onClick={handleAddOfferClick}>
                افزودن آفر جدید
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Seller Notice */}
        <Alert className="mb-6">
          <Info className="h-4 w-4" />
          <AlertDescription>
            <p className="font-semibold mb-2">توجه مهم برای فروشندگان محترم</p>
            <p className="text-sm">
              لطفاً در هنگام ثبت قیمت و موجودی آفرهای خود، نهایت دقت را به عمل آورید. پس از ثبت آفر، در صورتی که سفارشی بر اساس آن ثبت شود، فروشنده موظف است کالا را با همان قیمت و موجودی اعلام‌شده به فروشگاه تحویل دهد. مسئولیت تأمین کالا مطابق اطلاعات ثبت‌شده (اعم از قیمت و موجودی) به‌صورت کامل بر عهده فروشنده می‌باشد.
            </p>
            <p className="text-sm mt-2">
              بدیهی است ثبت اطلاعات نادرست یا غیرواقعی می‌تواند منجر به نارضایتی مشتری و اختلال در روند ارسال سفارش شود؛ لذا خواهشمندیم از وارد کردن قیمت یا موجودی غیرواقعی جداً خودداری فرمایید.
            </p>
          </AlertDescription>
        </Alert>

        {/* Add New Offer Card */}
        <AnimatePresence>
          {showAddOffer && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
              ref={addOfferRef}
            >
              <Card className="border-2 border-dashed">
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold">افزودن آفر جدید برای ({product.name})</h3>
                      <Button variant="ghost" size="icon" onClick={handleCancelAddOffer}>
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="originalPrice">قیمت اصلی</Label>
                        <Input
                          id="originalPrice"
                          type="number"
                          value={newOffer.originalPrice}
                          onChange={(e) => setNewOffer(prev => ({ ...prev, originalPrice: e.target.value }))}
                          placeholder="قیمت اصلی را وارد کنید"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="discountPrice">قیمت با تخفیف (اختیاری)</Label>
                        <Input
                          id="discountPrice"
                          type="number"
                          value={newOffer.discountPrice}
                          onChange={(e) => setNewOffer(prev => ({ ...prev, discountPrice: e.target.value }))}
                          placeholder="قیمت با تخفیف را وارد کنید"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="inventory">موجودی</Label>
                        <Input
                          id="inventory"
                          type="number"
                          value={newOffer.inventory}
                          onChange={(e) => setNewOffer(prev => ({ ...prev, inventory: e.target.value }))}
                          placeholder="موجودی را وارد کنید"
                        />
                      </div>
                    </div>
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" onClick={handleCancelAddOffer}>
                        انصراف
                      </Button>
                      <Button onClick={handleSubmitNewOffer}>
                        ثبت آفر
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Offers Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="all">همه پیشنهادات</TabsTrigger>
            <TabsTrigger value="my">پیشنهادات من</TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="space-y-4">
            {!filteredOffers?.length ? (
              <div className="text-center py-8 text-muted-foreground">
                هیچ آفری برای این محصول یافت نشد
              </div>
            ) : (
              filteredOffers.map((offer: ProductOffer, index: number) => (
                <div key={offer._id} className="space-y-4">
                  <Card className={`relative ${index === 0 ? 'border-r-4 border-blue-500' : ''}`}>
                    <CardContent className="p-4" dir="rtl">
                      <div className="flex items-center justify-between">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            {offer.seller?._id === currentSellerId ? (
                              <Badge variant="default">پیشنهاد شما</Badge>
                            ):(<Badge variant="secondary">فروشنده</Badge>)}
                            {index === 0 && (
                              <Badge variant="secondary" className="bg-green-100 text-green-700 hover:bg-green-100">
                                <Star className="h-3 w-3 ml-1" />
                                بهترین پیشنهاد
                              </Badge>
                            )}
                            {!offer.isActive && (
                              <Badge variant="secondary" className="bg-gray-100 text-gray-700 hover:bg-gray-100">
                                غیرفعال
                              </Badge>
                            )}
                          </div>
                          <div className="flex gap-4 text-sm">
                            <span className={offer.discountPrice ? "text-muted-foreground line-through" : "text-green-600"}>
                              {formatPrice(offer.originalPrice)} تومان
                            </span>
                            {offer.discountPrice && (
                              <span className="text-green-600 font-semibold">
                                {formatPrice(offer.discountPrice)} تومان
                              </span>
                            )}
                            <span className="text-muted-foreground">
                              موجودی: {offer.balance}
                            </span>
                          </div>
                        </div>
                        {offer.seller?._id === currentSellerId && (
                          <div className="flex gap-2">
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => toggleEdit(offer)}
                                    className="relative transition-all duration-200 hover:bg-primary/10"
                                  >
                                    <div className={cn(
                                      "absolute inset-0 rounded-full transition-all duration-200",
                                      isEditIconRotated && editingOfferId === offer._id 
                                        ? "bg-primary/10 scale-100" 
                                        : "scale-0"
                                    )} />
                                    <Pencil 
                                      className={cn(
                                        "h-4 w-4 transition-transform duration-200 relative z-10",
                                        isEditIconRotated && editingOfferId === offer._id && "rotate-45"
                                      )} 
                                    />
                                  </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>{editingOfferId === offer._id ? 'انصراف' : 'ویرایش'}</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>

                  <AnimatePresence>
                    {editingOfferId === offer._id && (
                      <motion.div
                        ref={editCardRef}
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <Card className="mt-4">
                          <CardContent className="p-4">
                            <form onSubmit={handleEditConfirm} className="space-y-4" dir="rtl">
                              <div className="grid gap-4 md:grid-cols-3">
                                <div className="space-y-2">
                                  <Label htmlFor="edit-original-price">قیمت اصلی</Label>
                                  <Input
                                    id="edit-original-price"
                                    type="text"
                                    value={editOffer.originalPrice ? formatNumber(editOffer.originalPrice) : ''}
                                    onChange={handleEditPriceChange}
                                    placeholder="مثال: 1,000,000"
                                    className="text-left"
                                  />
                                </div>
                                <div className="space-y-2">
                                  <Label htmlFor="edit-discount-price">قیمت با تخفیف (تومان)</Label>
                                  <Input
                                    id="edit-discount-price"
                                    type="text"
                                    value={editOffer.discountPrice ? formatNumber(editOffer.discountPrice) : ''}
                                    onChange={handleEditDiscountPriceChange}
                                    placeholder="مثال: 900,000"
                                    className="text-left"
                                  />
                                </div>
                                <div className="space-y-2">
                                  <Label htmlFor="edit-inventory">موجودی</Label>
                                  <Input
                                    id="edit-inventory"
                                    type="text"
                                    value={editOffer.inventory ? formatNumber(editOffer.inventory) : ''}
                                    onChange={handleEditStockChange}
                                    placeholder="مثال: 100"
                                    className="text-left"
                                  />
                                </div>
                              </div>
                              <div className="flex justify-between items-center pt-4 border-t">
                                <div className="flex gap-2">
                                  <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => {
                                      setOfferToAction(offer)
                                      setNewStatus(!offer.isActive)
                                      setShowStatusConfirm(true)
                                    }}
                                  >
                                    {offer.isActive ? 'غیرفعال کردن' : 'فعال کردن'}
                                  </Button>
                                  <Button
                                    type="button"
                                    variant="destructive"
                                    onClick={() => {
                                      setOfferToAction(offer)
                                      setShowDeleteConfirm(true)
                                    }}
                                  >
                                    <Trash2 className="h-4 w-4 ml-2" />
                                    حذف آفر
                                  </Button>
                                </div>
                                <div className="flex gap-2">
                                  <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => setEditingOfferId(null)}
                                  >
                                    انصراف
                                  </Button>
                                  <Button type="submit">ذخیره تغییرات</Button>
                                </div>
                              </div>
                            </form>
                          </CardContent>
                        </Card>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))
            )}
          </TabsContent>
        </Tabs>

        {/* Delete Confirmation Dialog */}
        <AlertDialog open={showDeleteConfirm} onOpenChange={setShowDeleteConfirm}>
          <AlertDialogContent className="sm:max-w-[425px] text-right">
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="p-3 rounded-full bg-destructive/10">
                <Trash2 className="h-6 w-6 text-destructive" />
              </div>
              <AlertDialogHeader className="text-right">
                <AlertDialogTitle className="text-xl text-right">حذف آفر</AlertDialogTitle>
                <AlertDialogDescription className="text-base text-right">
                  آیا از حذف این آفر اطمینان دارید؟
                </AlertDialogDescription>
              </AlertDialogHeader>
              <div className="text-sm text-muted-foreground text-right">
                این عمل غیرقابل بازگشت است و تمام اطلاعات مربوط به این آفر حذف خواهد شد.
              </div>
            </div>
            <AlertDialogFooter className="flex-col sm:flex-row gap-4 sm:gap-4">
              <AlertDialogCancel className="mt-0">انصراف</AlertDialogCancel>
              <AlertDialogAction 
                onClick={handleDeleteConfirm} 
                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              >
                حذف آفر
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        {/* Status Change Confirmation Dialog */}
        <AlertDialog open={showStatusConfirm} onOpenChange={setShowStatusConfirm}>
          <AlertDialogContent className="sm:max-w-[425px] text-right">
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="p-3 rounded-full bg-primary/10">
                <AlertTriangle className="h-6 w-6 text-primary" />
              </div>
              <AlertDialogHeader className="text-right">
                <AlertDialogTitle className="text-xl text-right">
                  {newStatus ? 'غیرفعال کردن آفر' : 'فعال کردن آفر'}
                </AlertDialogTitle>
                <AlertDialogDescription className="text-base text-right">
                  آیا از {newStatus ? 'غیرفعال' : 'فعال'} کردن این آفر اطمینان دارید؟
                </AlertDialogDescription>
              </AlertDialogHeader>
              <div className="text-sm text-muted-foreground text-right">
                {newStatus 
                  ? 'با غیرفعال کردن این آفر، مشتریان دیگر قادر به مشاهده و خرید آن نخواهند بود.'
                  : 'با فعال کردن این آفر، مشتریان می‌توانند آن را مشاهده و خرید کنند.'}
              </div>
            </div>
            <AlertDialogFooter className="flex-col sm:flex-row gap-4 sm:gap-4">
              <AlertDialogCancel className="mt-0">انصراف</AlertDialogCancel>
              <AlertDialogAction 
                onClick={handleStatusConfirm}
                className={newStatus ? "bg-yellow-500 hover:bg-yellow-600" : "bg-green-500 hover:bg-green-600"}
              >
                {newStatus ? 'غیرفعال کردن' : 'فعال کردن'}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        {/* Edit Confirmation Dialog */}
        <AlertDialog open={showEditConfirm} onOpenChange={setShowEditConfirm}>
          <AlertDialogContent className="sm:max-w-[425px] text-right">
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="p-3 rounded-full bg-primary/10">
                <CheckCircle2 className="h-6 w-6 text-primary" />
              </div>
              <AlertDialogHeader className="text-right">
                <AlertDialogTitle className="text-xl text-right">تایید تغییرات</AlertDialogTitle>
                <AlertDialogDescription className="text-base text-right">
                  آیا از ثبت تغییرات در آفر اطمینان دارید؟
                </AlertDialogDescription>
              </AlertDialogHeader>
              <div className="mt-4 p-4 bg-yellow-50 rounded-lg border border-yellow-200 text-right w-full">
                <div className="text-sm text-yellow-800 font-medium mb-2">توجه مهم:</div>
                <div className="text-sm text-yellow-700">
                  لطفاً از صحت قیمت و موجودی اطمینان حاصل کنید. پس از ثبت تغییرات، مسئولیت تأمین کالا با همان مشخصات بر عهده شما خواهد بود.
                </div>
              </div>
            </div>
            <AlertDialogFooter className="flex-col sm:flex-row gap-4 sm:gap-4">
              <AlertDialogCancel className="mt-0">انصراف</AlertDialogCancel>
              <AlertDialogAction onClick={handleEditSubmit}>
                ثبت تغییرات
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </DashboardLayout>
  )
} 