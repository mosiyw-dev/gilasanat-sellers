"use client"

import { useProductsListQuery } from "@/app/api/products/query"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus, Search } from "lucide-react"
import DashboardLayout from "@/components/dashboard-layout"
import { useRouter } from "next/navigation"
import { ProductCard } from "@/components/product-card"
import { useActiveOffersQuery, useInActiveOffersQuery } from "@/app/api/offers/query"
import { OfferCard } from "@/components/offer-card"
import { Input } from "@/components/ui/input"
import { useState, useCallback, useEffect } from "react"
import { useDebounce } from "@/hooks/use-debounce"

const MIN_SEARCH_LENGTH = 3
const SEARCH_DEBOUNCE_MS = 500

export default function ProductsPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("active")
  const [searchQuery, setSearchQuery] = useState("")
  const [effectiveSearch, setEffectiveSearch] = useState("")
  const debouncedSearch = useDebounce(searchQuery, SEARCH_DEBOUNCE_MS)

  // Update effective search only when debounced value changes and meets minimum length
  useEffect(() => {
    if (debouncedSearch.length >= MIN_SEARCH_LENGTH || debouncedSearch.length === 0) {
      setEffectiveSearch(debouncedSearch)
    }
  }, [debouncedSearch])

  // Reset search when tab changes
  const handleTabChange = (value: string) => {
    setActiveTab(value)
    setSearchQuery("")
    setEffectiveSearch("")
  }

  const { data: productsData, isLoading: productsLoading } = useProductsListQuery(1, 10, activeTab === "allproducts" ? effectiveSearch : "");
  const { data: activeOffersData, isLoading: activeOffersLoading } = useActiveOffersQuery(activeTab === "active" ? effectiveSearch : "");
  const { data: inactiveOffersData, isLoading: inactiveOffersLoading } = useInActiveOffersQuery(activeTab === "notactive" ? effectiveSearch : "");

  const handleView = useCallback((productId: string) => {
    router.push(`/dashboard/products/${productId}`)
  }, [router])

  const handleEdit = useCallback((productId: string) => {
    router.push(`/dashboard/products/${productId}/edit`)
  }, [router])

  const handleDelete = useCallback((productId: string) => {
    // TODO: Implement delete functionality
    console.log("Delete product:", productId)
  }, [])

  return (
    <DashboardLayout>
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight">محصولات</h2>
        </div>

        <div className="relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="جستجو در محصولات و آفرها... (حداقل ۳ حرف)"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-8"
          />
        </div>

        <Tabs defaultValue="active" className="space-y-4" onValueChange={handleTabChange}>
          <div className="border-b">
            <TabsList className="w-full h-12 bg-transparent p-0">
              <TabsTrigger 
                value="active" 
                className="flex-1 h-12 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-sm rounded-none border-b-2 border-transparent data-[state=active]:border-primary transition-all duration-200"
              >
                آفرهای فعال
              </TabsTrigger>
              <TabsTrigger 
                value="notactive" 
                className="flex-1 h-12 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-sm rounded-none border-b-2 border-transparent data-[state=active]:border-primary transition-all duration-200"
              >
                آفرهای غیرفعال
              </TabsTrigger>
              <TabsTrigger 
                value="allproducts" 
                className="flex-1 h-12 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-sm rounded-none border-b-2 border-transparent data-[state=active]:border-primary transition-all duration-200"
              >
                تمام محصولات فروشگاه
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="active" className="space-y-4 mt-6">
            {activeOffersLoading ? (
              <div className="text-center py-8">در حال بارگذاری...</div>
            ) : !activeOffersData?.data?.length ? (
              <div className="text-center py-8 text-muted-foreground">
                {effectiveSearch ? "نتیجه‌ای یافت نشد" : "آفر فعال برای شما وجود ندارد"}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-4">
                {activeOffersData.data.map((item) => (
                  <OfferCard
                    key={item.offer._id}
                    offer={item.offer}
                    product={item.product}
                    onAddOffer={() => router.push(`/dashboard/products/${item.product._id}/offers`)}
                  />
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="notactive" className="space-y-4">
            {inactiveOffersLoading ? (
              <div className="text-center py-8">در حال بارگذاری...</div>
            ) : !inactiveOffersData?.data?.length ? (
              <div className="text-center py-8 text-muted-foreground">
                {effectiveSearch ? "نتیجه‌ای یافت نشد" : "آفر غیرفعال برای شما وجود ندارد"}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-4">
                {inactiveOffersData.data.map((item) => (
                  <OfferCard
                    key={item.offer._id}
                    offer={item.offer}
                    product={item.product}
                    onAddOffer={() => router.push(`/dashboard/products/${item.product._id}/offers`)}
                  />
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="allproducts" className="space-y-4">
            {productsLoading ? (
              <div className="text-center py-8">در حال بارگذاری...</div>
            ) : !productsData?.products?.length ? (
              <div className="text-center py-8 text-muted-foreground">
                {effectiveSearch ? "نتیجه‌ای یافت نشد" : "محصولی یافت نشد"}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4">
                {productsData.products.map((product) => (
                  <ProductCard
                    key={product._id}
                    product={product}
                    onView={() => handleView(product._id)}
                    onEdit={() => handleEdit(product._id)}
                    onDelete={() => handleDelete(product._id)}
                  />
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}

