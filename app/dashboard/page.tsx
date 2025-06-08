import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Activity, DollarSign, Package, ShoppingCart } from 'lucide-react'
import DashboardLayout from "@/components/dashboard-layout"

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6 rtl">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">داشبورد</h2>
        </div>
        <Tabs defaultValue="overview" className="space-y-4" dir="rtl">
          <TabsList>
            <TabsTrigger value="overview">نمای کلی</TabsTrigger>
            <TabsTrigger value="analytics">تحلیل فروش</TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">فروش کل</CardTitle>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">۱۲,۵۴۳,۰۰۰ تومان</div>
                  <p className="text-xs text-muted-foreground">+۲۰.۱٪ نسبت به ماه قبل</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">سفارشات</CardTitle>
                  <ShoppingCart className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">+۵۴</div>
                  <p className="text-xs text-muted-foreground">+۱۲.۲٪ نسبت به ماه قبل</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">محصولات فعال</CardTitle>
                  <Package className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">۲۳</div>
                  <p className="text-xs text-muted-foreground">+۳ محصول جدید در این ماه</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">بازدید محصولات</CardTitle>
                  <Activity className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">+۵,۷۳۴</div>
                  <p className="text-xs text-muted-foreground">+۱۹٪ نسبت به ماه قبل</p>
                </CardContent>
              </Card>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
              <Card className="col-span-4">
                <CardHeader>
                  <CardTitle>نمودار فروش</CardTitle>
                </CardHeader>
                <CardContent className="pr-2">
                  <div className="h-[200px] w-full bg-muted/20 flex items-center justify-center rounded-md">
                    نمودار فروش ماهانه
                  </div>
                </CardContent>
              </Card>
              <Card className="col-span-3">
                <CardHeader>
                  <CardTitle>آخرین فروش‌ها</CardTitle>
                  <CardDescription>۵ سفارش اخیر شما</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-8">
                    <div className="flex items-center">
                      <div className="mr-4 space-y-1">
                        <p className="text-sm font-medium leading-none">سفارش #۱۲۳۴۵</p>
                        <p className="text-sm text-muted-foreground">۱,۲۵۰,۰۰۰ تومان</p>
                      </div>
                      <div className="mr-auto text-sm">امروز</div>
                    </div>
                    <div className="flex items-center">
                      <div className="mr-4 space-y-1">
                        <p className="text-sm font-medium leading-none">سفارش #۱۲۳۴۴</p>
                        <p className="text-sm text-muted-foreground">۷۵۰,۰۰۰ تومان</p>
                      </div>
                      <div className="mr-auto text-sm">دیروز</div>
                    </div>
                    <div className="flex items-center">
                      <div className="mr-4 space-y-1">
                        <p className="text-sm font-medium leading-none">سفارش #۱۲۳۴۳</p>
                        <p className="text-sm text-muted-foreground">۲,۱۰۰,۰۰۰ تومان</p>
                      </div>
                      <div className="mr-auto text-sm">۲ روز پیش</div>
                    </div>
                    <div className="flex items-center">
                      <div className="mr-4 space-y-1">
                        <p className="text-sm font-medium leading-none">سفارش #۱۲۳۴۲</p>
                        <p className="text-sm text-muted-foreground">۹۰۰,۰۰۰ تومان</p>
                      </div>
                      <div className="mr-auto text-sm">۳ روز پیش</div>
                    </div>
                    <div className="flex items-center">
                      <div className="mr-4 space-y-1">
                        <p className="text-sm font-medium leading-none">سفارش #۱۲۳۴۱</p>
                        <p className="text-sm text-muted-foreground">۱,۵۰۰,۰۰۰ تومان</p>
                      </div>
                      <div className="mr-auto text-sm">۴ روز پیش</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          <TabsContent value="analytics" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
              <Card className="col-span-4">
                <CardHeader>
                  <CardTitle>تحلیل فروش</CardTitle>
                </CardHeader>
                <CardContent className="pr-2">
                  <div className="h-[300px] w-full bg-muted/20 flex items-center justify-center rounded-md">
                    نمودار تحلیلی فروش
                  </div>
                </CardContent>
              </Card>
              <Card className="col-span-3">
                <CardHeader>
                  <CardTitle>محصولات پرفروش</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-8">
                    <div className="flex items-center">
                      <div className="mr-4 space-y-1">
                        <p className="text-sm font-medium leading-none">محصول الف</p>
                        <p className="text-sm text-muted-foreground">۳۵ فروش</p>
                      </div>
                      <div className="mr-auto text-sm">۴۵٪</div>
                    </div>
                    <div className="flex items-center">
                      <div className="mr-4 space-y-1">
                        <p className="text-sm font-medium leading-none">محصول ب</p>
                        <p className="text-sm text-muted-foreground">۲۷ فروش</p>
                      </div>
                      <div className="mr-auto text-sm">۳۰٪</div>
                    </div>
                    <div className="flex items-center">
                      <div className="mr-4 space-y-1">
                        <p className="text-sm font-medium leading-none">محصول ج</p>
                        <p className="text-sm text-muted-foreground">۱۵ فروش</p>
                      </div>
                      <div className="mr-auto text-sm">۱۵٪</div>
                    </div>
                    <div className="flex items-center">
                      <div className="mr-4 space-y-1">
                        <p className="text-sm font-medium leading-none">محصول د</p>
                        <p className="text-sm text-muted-foreground">۸ فروش</p>
                      </div>
                      <div className="mr-auto text-sm">۱۰٪</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}
