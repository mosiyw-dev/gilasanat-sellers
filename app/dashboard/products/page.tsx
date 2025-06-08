"use client"

import { useProductsListQuery } from "@/app/api/products/query"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus } from "lucide-react"
import DashboardLayout from "@/components/dashboard-layout"
import { useRouter } from "next/navigation"
import { ProductCard } from "@/components/product-card"
import { useActiveOffersQuery } from "@/app/api/offers/query"
import { OfferCard } from "@/components/offer-card"

export default function ProductsPage() {
  const router = useRouter()
  const { data: productsData, isLoading: productsLoading } = useProductsListQuery(1, 10);
  const { data: offersData, isLoading: offersLoading } = useActiveOffersQuery();

  console.log(offersData);
  const handleView = (productId: string) => {
    router.push(`/dashboard/products/${productId}`)
  }

  const handleEdit = (productId: string) => {
    router.push(`/dashboard/products/${productId}/edit`)
  }

  const handleDelete = (productId: string) => {
    // TODO: Implement delete functionality
    console.log("Delete product:", productId)
  }

  return (
    <DashboardLayout>
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight">محصولات</h2>
        </div>

        <Tabs defaultValue="active" className="space-y-4">
          <TabsList>
            <TabsTrigger value="active">آفرهای فعال</TabsTrigger>
            <TabsTrigger value="notactive">آفرهای غیرفعال</TabsTrigger>
            <TabsTrigger value="allproducts">تمام محصولات فروشگاه</TabsTrigger>
          </TabsList>

          <TabsContent value="active" className="space-y-4">
            {offersLoading ? (
              <div className="text-center py-8">در حال بارگذاری...</div>
            ) : !offersData?.data?.length ? (
              <div className="text-center py-8 text-muted-foreground">
                آفر فعال برای شما وجود ندارد
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-4">
                {offersData.data.map((item) => (
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
            <div className="text-center py-8 text-muted-foreground">
              آفر غیرفعال برای شما وجود ندارد
            </div>
          </TabsContent>
          <TabsContent value="allproducts" className="space-y-4">
            {productsLoading ? (
              <div className="text-center py-8">در حال بارگذاری...</div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4">
                {productsData?.products.map((product) => (
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

