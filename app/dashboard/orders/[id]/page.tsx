"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, Package, Truck } from "lucide-react"
import DashboardLayout from "@/components/dashboard-layout"

export default function OrderDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const orderId = params.id

  return (
    <DashboardLayout>
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="flex items-center">
          <Button variant="ghost" size="icon" onClick={() => router.back()}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h2 className="text-3xl font-bold tracking-tight mr-2">جزئیات سفارش #{orderId}</h2>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">اطلاعات سفارش</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span className="text-muted-foreground">شماره سفارش:</span>
                <span className="font-medium">#{orderId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">تاریخ سفارش:</span>
                <span>۱۴۰۲/۱۲/۱۵</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">وضعیت سفارش:</span>
                <Badge className="bg-green-500">تحویل شده</Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">روش پرداخت:</span>
                <span>پرداخت آنلاین</span>
              </div>
              <Separator />
              <div className="flex justify-between font-bold">
                <span>مبلغ کل:</span>
                <span>۱,۲۵۰,۰۰۰ تومان</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">اطلاعات مشتری</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span className="text-muted-foreground">نام خریدار:</span>
                <span>علی محمدی</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">شماره تماس:</span>
                <span>۰۹۱۲۳۴۵۶۷۸۹</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">ایمیل:</span>
                <span>ali@example.com</span>
              </div>
              <Separator />
              <div>
                <span className="text-muted-foreground block mb-2">آدرس:</span>
                <span className="text-sm">تهران، خیابان ولیعصر، کوچه بهار، پلاک ۱۲، واحد ۳</span>
              </div>
            </CardContent>
          </Card>

          <Card className="lg:col-span-1 md:col-span-2">
            <CardHeader>
              <CardTitle className="text-lg">وضعیت ارسال</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="bg-primary/10 p-2 rounded-full">
                  <Package className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="font-medium">آماده‌سازی سفارش</p>
                  <p className="text-sm text-muted-foreground">۱۴۰۲/۱۲/۱۵ - ساعت ۱۰:۳۰</p>
                </div>
                <Badge className="bg-green-500">تکمیل شده</Badge>
              </div>

              <div className="flex items-center gap-4">
                <div className="bg-primary/10 p-2 rounded-full">
                  <Truck className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="font-medium">ارسال سفارش</p>
                  <p className="text-sm text-muted-foreground">۱۴۰۲/۱۲/۱۶ - ساعت ۰۹:۱۵</p>
                </div>
                <Badge className="bg-green-500">تکمیل شده</Badge>
              </div>

              <div className="flex items-center gap-4">
                <div className="bg-primary/10 p-2 rounded-full">
                  <Package className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="font-medium">تحویل سفارش</p>
                  <p className="text-sm text-muted-foreground">۱۴۰۲/۱۲/۱۷ - ساعت ۱۴:۲۰</p>
                </div>
                <Badge className="bg-green-500">تکمیل شده</Badge>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>محصولات سفارش</CardTitle>
            <CardDescription>لیست محصولات خریداری شده در این سفارش</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">تصویر</TableHead>
                  <TableHead>نام محصول</TableHead>
                  <TableHead>قیمت واحد</TableHead>
                  <TableHead>تعداد</TableHead>
                  <TableHead className="text-left">قیمت کل</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>
                    <div className="w-10 h-10 rounded bg-muted"></div>
                  </TableCell>
                  <TableCell className="font-medium">هدفون بی‌سیم مدل AirPods Pro</TableCell>
                  <TableCell>۸,۲۰۰,۰۰۰ تومان</TableCell>
                  <TableCell>۱</TableCell>
                  <TableCell>۸,۲۰۰,۰۰۰ تومان</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <div className="w-10 h-10 rounded bg-muted"></div>
                  </TableCell>
                  <TableCell className="font-medium">کابل شارژر Type-C</TableCell>
                  <TableCell>۱۵۰,۰۰۰ تومان</TableCell>
                  <TableCell>۲</TableCell>
                  <TableCell>۳۰۰,۰۰۰ تومان</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell colSpan={4} className="text-left font-bold">
                    جمع کل:
                  </TableCell>
                  <TableCell className="font-bold">۸,۵۰۰,۰۰۰ تومان</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}

