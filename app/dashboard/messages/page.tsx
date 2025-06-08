import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CheckCheck, MessagesSquare, Search, ThumbsUp, User } from "lucide-react"
import DashboardLayout from "@/components/dashboard-layout"

export default function MessagesPage() {
  return (
    <DashboardLayout>
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight">پیام‌ها و اعلان‌ها</h2>
          <div className="relative w-64">
            <Search className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input placeholder="جستجوی پیام..." className="pr-9" />
          </div>
        </div>

        <Tabs defaultValue="all" className="space-y-4">
          <TabsList>
            <TabsTrigger value="all" className="gap-1.5">
              <MessagesSquare className="h-4 w-4" /> همه پیام‌ها
            </TabsTrigger>
            <TabsTrigger value="unread" className="gap-1.5">
              پیام‌های خوانده نشده <Badge className="ml-1 bg-primary">12</Badge>
            </TabsTrigger>
            <TabsTrigger value="admin" className="gap-1.5">
              <User className="h-4 w-4" /> از طرف ادمین
            </TabsTrigger>
            <TabsTrigger value="system" className="gap-1.5">
              سیستمی
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-4">
            <div className="grid gap-4">
              <Card className="overflow-hidden border-r-4 border-r-blue-500">
                <CardHeader className="p-4 pb-0">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-base">اطلاعیه مهم: قیمت رقبا</CardTitle>
                      <CardDescription className="mt-1">
                        مربوط به محصول: گوشی موبایل سامسونگ مدل Galaxy S23 Ultra
                      </CardDescription>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      ۳ روز پیش
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="p-4">
                  <p className="text-sm">
                    فروشنده محترم، قیمت رقبا برای این محصول کاهش یافته است. لطفاً قیمت محصول خود را بررسی کنید. در صورت
                    عدم تغییر قیمت، ممکن است محصول شما از نتایج جستجو حذف شود.
                  </p>
                </CardContent>
                <CardFooter className="p-4 pt-0 flex justify-end">
                  <Button variant="ghost" size="sm" className="gap-1">
                    <ThumbsUp className="h-4 w-4" /> تأیید دریافت
                  </Button>
                </CardFooter>
              </Card>

              <Card className="overflow-hidden border-r-4 border-r-green-500">
                <CardHeader className="p-4 pb-0">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-base">تأیید محصول</CardTitle>
                      <CardDescription className="mt-1">مربوط به محصول: هدفون بی‌سیم مدل AirPods Pro</CardDescription>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      ۱ هفته پیش
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="p-4">
                  <p className="text-sm">
                    فروشنده گرامی، محصول شما پس از بررسی‌های لازم تأیید شده و هم‌اکنون در فروشگاه قابل مشاهده است. برای
                    مشاهده صفحه محصول به پنل مدیریت محصولات مراجعه کنید.
                  </p>
                </CardContent>
                <CardFooter className="p-4 pt-0 flex justify-end">
                  <Button variant="ghost" size="sm" disabled className="gap-1">
                    <CheckCheck className="h-4 w-4" /> تأیید شده
                  </Button>
                </CardFooter>
              </Card>

              <Card className="overflow-hidden border-r-4 border-r-orange-500">
                <CardHeader className="p-4 pb-0">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-base">نیاز به اصلاح مشخصات محصول</CardTitle>
                      <CardDescription className="mt-1">مربوط به محصول: ساعت هوشمند اپل واچ سری ۸</CardDescription>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      ۲ هفته پیش
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="p-4">
                  <p className="text-sm">
                    فروشنده محترم، لطفاً مشخصات فنی محصول را دقیق‌تر تکمیل کنید. اطلاعات مربوط به نوع صفحه نمایش، ظرفیت
                    باتری و قابلیت‌های نرم‌افزاری ساعت را اضافه کنید. همچنین قیمت محصول بالاتر از میانگین بازار است.
                  </p>
                </CardContent>
                <CardFooter className="p-4 pt-0 flex justify-end">
                  <Button variant="outline" size="sm">
                    مشاهده محصول
                  </Button>
                  <Button variant="ghost" size="sm" className="gap-1 mr-2">
                    <ThumbsUp className="h-4 w-4" /> تأیید دریافت
                  </Button>
                </CardFooter>
              </Card>

              <Card className="overflow-hidden">
                <CardHeader className="p-4 pb-0">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-base">ثبت سفارش جدید</CardTitle>
                      <CardDescription className="mt-1">مربوط به سفارش: #۱۲۳۴۵</CardDescription>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      ۱ ماه پیش
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="p-4">
                  <p className="text-sm">
                    یک سفارش جدید برای محصول «هدفون بی‌سیم مدل AirPods Pro» ثبت شده است. لطفاً برای مشاهده جزئیات به بخش
                    سفارش‌ها مراجعه کنید.
                  </p>
                </CardContent>
                <CardFooter className="p-4 pt-0 flex justify-end">
                  <Button variant="outline" size="sm">
                    مشاهده سفارش
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="unread" className="space-y-4">
            <div className="grid gap-4">
              <Card className="overflow-hidden border-r-4 border-r-blue-500">
                <CardHeader className="p-4 pb-0">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-base">اطلاعیه مهم: قیمت رقبا</CardTitle>
                      <CardDescription className="mt-1">
                        مربوط به محصول: گوشی موبایل سامسونگ مدل Galaxy S23 Ultra
                      </CardDescription>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      ۳ روز پیش
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="p-4">
                  <p className="text-sm">
                    فروشنده محترم، قیمت رقبا برای این محصول کاهش یافته است. لطفاً قیمت محصول خود را بررسی کنید. در صورت
                    عدم تغییر قیمت، ممکن است محصول شما از نتایج جستجو حذف شود.
                  </p>
                </CardContent>
                <CardFooter className="p-4 pt-0 flex justify-end">
                  <Button variant="ghost" size="sm" className="gap-1">
                    <ThumbsUp className="h-4 w-4" /> تأیید دریافت
                  </Button>
                </CardFooter>
              </Card>

              <Card className="overflow-hidden border-r-4 border-r-orange-500">
                <CardHeader className="p-4 pb-0">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-base">نیاز به اصلاح مشخصات محصول</CardTitle>
                      <CardDescription className="mt-1">مربوط به محصول: ساعت هوشمند اپل واچ سری ۸</CardDescription>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      ۲ هفته پیش
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="p-4">
                  <p className="text-sm">
                    فروشنده محترم، لطفاً مشخصات فنی محصول را دقیق‌تر تکمیل کنید. اطلاعات مربوط به نوع صفحه نمایش، ظرفیت
                    باتری و قابلیت‌های نرم‌افزاری ساعت را اضافه کنید. همچنین قیمت محصول بالاتر از میانگین بازار است.
                  </p>
                </CardContent>
                <CardFooter className="p-4 pt-0 flex justify-end">
                  <Button variant="outline" size="sm">
                    مشاهده محصول
                  </Button>
                  <Button variant="ghost" size="sm" className="gap-1 mr-2">
                    <ThumbsUp className="h-4 w-4" /> تأیید دریافت
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="admin" className="space-y-4">
            <div className="grid gap-4">
              <Card className="overflow-hidden border-r-4 border-r-orange-500">
                <CardHeader className="p-4 pb-0">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-base">نیاز به اصلاح مشخصات محصول</CardTitle>
                      <CardDescription className="mt-1">مربوط به محصول: ساعت هوشمند اپل واچ سری ۸</CardDescription>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      ۲ هفته پیش
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="p-4">
                  <p className="text-sm">
                    فروشنده محترم، لطفاً مشخصات فنی محصول را دقیق‌تر تکمیل کنید. اطلاعات مربوط به نوع صفحه نمایش، ظرفیت
                    باتری و قابلیت‌های نرم‌افزاری ساعت را اضافه کنید. همچنین قیمت محصول بالاتر از میانگین بازار است.
                  </p>
                </CardContent>
                <CardFooter className="p-4 pt-0 flex justify-end">
                  <Button variant="outline" size="sm">
                    مشاهده محصول
                  </Button>
                  <Button variant="ghost" size="sm" className="gap-1 mr-2">
                    <ThumbsUp className="h-4 w-4" /> تأیید دریافت
                  </Button>
                </CardFooter>
              </Card>

              <Card className="overflow-hidden border-r-4 border-r-green-500">
                <CardHeader className="p-4 pb-0">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-base">تأیید محصول</CardTitle>
                      <CardDescription className="mt-1">مربوط به محصول: هدفون بی‌سیم مدل AirPods Pro</CardDescription>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      ۱ هفته پیش
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="p-4">
                  <p className="text-sm">
                    فروشنده گرامی، محصول شما پس از بررسی‌های لازم تأیید شده و هم‌اکنون در فروشگاه قابل مشاهده است. برای
                    مشاهده صفحه محصول به پنل مدیریت محصولات مراجعه کنید.
                  </p>
                </CardContent>
                <CardFooter className="p-4 pt-0 flex justify-end">
                  <Button variant="ghost" size="sm" disabled className="gap-1">
                    <CheckCheck className="h-4 w-4" /> تأیید شده
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="system" className="space-y-4">
            <div className="grid gap-4">
              <Card className="overflow-hidden border-r-4 border-r-blue-500">
                <CardHeader className="p-4 pb-0">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-base">اطلاعیه مهم: قیمت رقبا</CardTitle>
                      <CardDescription className="mt-1">
                        مربوط به محصول: گوشی موبایل سامسونگ مدل Galaxy S23 Ultra
                      </CardDescription>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      ۳ روز پیش
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="p-4">
                  <p className="text-sm">
                    فروشنده محترم، قیمت رقبا برای این محصول کاهش یافته است. لطفاً قیمت محصول خود را بررسی کنید. در صورت
                    عدم تغییر قیمت، ممکن است محصول شما از نتایج جستجو حذف شود.
                  </p>
                </CardContent>
                <CardFooter className="p-4 pt-0 flex justify-end">
                  <Button variant="ghost" size="sm" className="gap-1">
                    <ThumbsUp className="h-4 w-4" /> تأیید دریافت
                  </Button>
                </CardFooter>
              </Card>

              <Card className="overflow-hidden">
                <CardHeader className="p-4 pb-0">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-base">ثبت سفارش جدید</CardTitle>
                      <CardDescription className="mt-1">مربوط به سفارش: #۱۲۳۴۵</CardDescription>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      ۱ ماه پیش
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="p-4">
                  <p className="text-sm">
                    یک سفارش جدید برای محصول «هدفون بی‌سیم مدل AirPods Pro» ثبت شده است. لطفاً برای مشاهده جزئیات به بخش
                    سفارش‌ها مراجعه کنید.
                  </p>
                </CardContent>
                <CardFooter className="p-4 pt-0 flex justify-end">
                  <Button variant="outline" size="sm">
                    مشاهده سفارش
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}

