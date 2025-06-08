import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import DashboardLayout from "@/components/dashboard-layout"

export default function ReportsPage() {
  return (
    <DashboardLayout>
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight">گزارش‌ها</h2>
        </div>

        <Tabs defaultValue="sales" className="space-y-4">
          <TabsList>
            <TabsTrigger value="sales">گزارش فروش</TabsTrigger>
            <TabsTrigger value="products">گزارش محصولات</TabsTrigger>
            <TabsTrigger value="customers">گزارش مشتریان</TabsTrigger>
          </TabsList>

          <TabsContent value="sales" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">فروش امروز</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">۱,۲۵۰,۰۰۰ تومان</div>
                  <p className="text-xs text-muted-foreground">۲ سفارش</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">فروش هفته</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">۵,۷۵۰,۰۰۰ تومان</div>
                  <p className="text-xs text-muted-foreground">۸ سفارش</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">فروش ماه</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">۱۲,۵۴۳,۰۰۰ تومان</div>
                  <p className="text-xs text-muted-foreground">۲۵ سفارش</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">فروش کل</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">۵۴,۸۷۶,۰۰۰ تومان</div>
                  <p className="text-xs text-muted-foreground">۱۲۳ سفارش</p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>گزارش فروش ماهانه</CardTitle>
                <CardDescription>نمودار فروش ۶ ماه اخیر</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] w-full bg-muted/20 flex items-center justify-center rounded-md">
                  نمودار فروش ماهانه
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>آخرین فروش‌ها</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>شماره سفارش</TableHead>
                      <TableHead>تاریخ</TableHead>
                      <TableHead>محصولات</TableHead>
                      <TableHead>مبلغ کل</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">#۱۲۳۴۵</TableCell>
                      <TableCell>۱۴۰۲/۱۲/۱۵</TableCell>
                      <TableCell>هدفون بی‌سیم، کابل شارژر</TableCell>
                      <TableCell>۱,۲۵۰,۰۰۰ تومان</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">#۱۲۳۴۴</TableCell>
                      <TableCell>۱۴۰۲/۱۲/۱۰</TableCell>
                      <TableCell>پاوربانک ۱۰۰۰۰</TableCell>
                      <TableCell>۷۵۰,۰۰۰ تومان</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">#۱۲۳۴۳</TableCell>
                      <TableCell>۱۴۰۲/۱۲/۰۵</TableCell>
                      <TableCell>گوشی موبایل سامسونگ</TableCell>
                      <TableCell>۲,۱۰۰,۰۰۰ تومان</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">#۱۲۳۴۲</TableCell>
                      <TableCell>۱۴۰۲/۱۲/۰۱</TableCell>
                      <TableCell>قاب محافظ گوشی</TableCell>
                      <TableCell>۹۰۰,۰۰۰ تومان</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">#۱۲۳۴۱</TableCell>
                      <TableCell>۱۴۰۲/۱۱/۲۵</TableCell>
                      <TableCell>هندزفری بلوتوثی</TableCell>
                      <TableCell>۱,۵۰۰,۰۰۰ تومان</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="products" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>محصولات پرفروش</CardTitle>
                <CardDescription>لیست محصولات پرفروش شما</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>نام محصول</TableHead>
                      <TableHead>تعداد فروش</TableHead>
                      <TableHead>موجودی</TableHead>
                      <TableHead>درآمد کل</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">گوشی موبایل سامسونگ مدل A54</TableCell>
                      <TableCell>۱۵</TableCell>
                      <TableCell>۱۵ عدد</TableCell>
                      <TableCell>۱۸۷,۵۰۰,۰۰۰ تومان</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">هدفون بی‌سیم مدل AirPods Pro</TableCell>
                      <TableCell>۲۲</TableCell>
                      <TableCell>۸ عدد</TableCell>
                      <TableCell>۱۸۰,۴۰۰,۰۰۰ تومان</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">ساعت هوشمند اپل واچ سری ۸</TableCell>
                      <TableCell>۷</TableCell>
                      <TableCell>۳ عدد</TableCell>
                      <TableCell>۱۵۷,۵۰۰,۰۰۰ تومان</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">کابل شارژر Type-C</TableCell>
                      <TableCell>۴۵</TableCell>
                      <TableCell>۳۰ عدد</TableCell>
                      <TableCell>۶,۷۵۰,۰۰۰ تومان</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">پاوربانک ۱۰۰۰۰</TableCell>
                      <TableCell>۱۸</TableCell>
                      <TableCell>۱۲ عدد</TableCell>
                      <TableCell>۱۳,۵۰۰,۰۰۰ تومان</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>وضعیت موجودی محصولات</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] w-full bg-muted/20 flex items-center justify-center rounded-md">
                  نمودار وضعیت موجودی
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="customers" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>مشتریان برتر</CardTitle>
                <CardDescription>لیست مشتریان با بیشترین خرید</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>نام مشتری</TableHead>
                      <TableHead>تعداد سفارش</TableHead>
                      <TableHead>مبلغ کل خرید</TableHead>
                      <TableHead>آخرین خرید</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">علی محمدی</TableCell>
                      <TableCell>۸</TableCell>
                      <TableCell>۱۲,۵۰۰,۰۰۰ تومان</TableCell>
                      <TableCell>۱۴۰۲/۱۲/۱۵</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">مریم احمدی</TableCell>
                      <TableCell>۶</TableCell>
                      <TableCell>۹,۸۰۰,۰۰۰ تومان</TableCell>
                      <TableCell>۱۴۰۲/۱۲/۱۰</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">رضا کریمی</TableCell>
                      <TableCell>۵</TableCell>
                      <TableCell>۷,۵۰۰,۰۰۰ تومان</TableCell>
                      <TableCell>۱۴۰۲/۱۲/۰۵</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">سارا حسینی</TableCell>
                      <TableCell>۴</TableCell>
                      <TableCell>۶,۲۰۰,۰۰۰ تومان</TableCell>
                      <TableCell>۱۴۰۲/۱۲/۰۱</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">محمد رضایی</TableCell>
                      <TableCell>۳</TableCell>
                      <TableCell>۴,۵۰۰,۰۰۰ تومان</TableCell>
                      <TableCell>۱۴۰۲/۱۱/۲۵</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>آمار مشتریان</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] w-full bg-muted/20 flex items-center justify-center rounded-md">
                  نمودار آمار مشتریان
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}

