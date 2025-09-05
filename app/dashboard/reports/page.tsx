"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon, TrendingUp, Package, DollarSign, ShoppingCart, AlertCircle } from "lucide-react"
import { format } from "date-fns"
import { fa } from "date-fns/locale"
import DashboardLayout from "@/components/dashboard-layout"
import { useSellerAnalytics } from "@/hooks/use-orders"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts"

export default function ReportsPage() {
  const [dateRange, setDateRange] = useState<{ from?: Date; to?: Date }>({})
  
  const { data: analyticsData, isLoading, error } = useSellerAnalytics({
    startDate: dateRange.from?.toISOString(),
    endDate: dateRange.to?.toISOString(),
  })

  const analytics = analyticsData?.analytics
  const dailySales = analyticsData?.dailySales || []

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("fa-IR").format(price) + " تومان"
  }

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat("fa-IR").format(num)
  }

  // Prepare data for charts
  const chartData = dailySales.map(item => ({
    date: `${item._id.year}/${item._id.month}/${item._id.day}`,
    itemsSold: item.itemsSold,
    revenue: item.revenue
  }))

  const statusData = analytics ? [
    { name: "در انتظار تایید", value: analytics.pendingItems, color: "#fbbf24" },
    { name: "تایید شده", value: analytics.confirmedItems, color: "#3b82f6" },
    { name: "ارسال شده", value: analytics.shippedItems, color: "#10b981" },
    { name: "لغو شده", value: analytics.cancelledItems, color: "#ef4444" },
  ] : []

  if (error) {
    return (
      <DashboardLayout>
        <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
          <div className="text-center py-8">
            <p className="text-red-500">خطا در بارگذاری آمار</p>
          </div>
        </div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout>
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight">گزارش‌ها و آمار</h2>
          <div className="flex items-center gap-4">
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="justify-start text-left font-normal">
                  <CalendarIcon className="ml-2 h-4 w-4" />
                  {dateRange.from ? (
                    dateRange.to ? (
                      <>
                        {format(dateRange.from, "dd/MM/yyyy")} -{" "}
                        {format(dateRange.to, "dd/MM/yyyy")}
                      </>
                    ) : (
                      format(dateRange.from, "dd/MM/yyyy")
                    )
                  ) : (
                    <span>انتخاب بازه زمانی</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  initialFocus
                  mode="range"
                  defaultMonth={dateRange.from}
                  selected={dateRange}
                  onSelect={setDateRange}
                  numberOfMonths={2}
                  locale={fa}
                />
              </PopoverContent>
            </Popover>
            <Button
              variant="outline"
              onClick={() => setDateRange({})}
            >
              پاک کردن فیلتر
            </Button>
          </div>
        </div>

        {/* Key Metrics */}
        {isLoading ? (
          <div className="text-center py-8">
            <p>در حال بارگذاری آمار...</p>
          </div>
        ) : analytics ? (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">کل فروش</CardTitle>
                <ShoppingCart className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{formatNumber(analytics.totalItemsSold)}</div>
                <p className="text-xs text-muted-foreground">تعداد آیتم فروخته شده</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">درآمد کل</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{formatPrice(analytics.totalRevenue)}</div>
                <p className="text-xs text-muted-foreground">مجموع درآمد</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">میانگین قیمت</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{formatPrice(analytics.averageItemPrice)}</div>
                <p className="text-xs text-muted-foreground">قیمت متوسط هر آیتم</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">در انتظار</CardTitle>
                <AlertCircle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{formatNumber(analytics.pendingItems)}</div>
                <p className="text-xs text-muted-foreground">آیتم در انتظار تایید</p>
              </CardContent>
            </Card>
          </div>
        ) : null}

        {/* Charts */}
        {analytics && (
          <div className="grid gap-4 md:grid-cols-2">
            {/* Daily Sales Chart */}
            <Card>
              <CardHeader>
                <CardTitle>فروش روزانه</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip 
                        formatter={(value, name) => [
                          name === 'itemsSold' ? formatNumber(Number(value)) : formatPrice(Number(value)),
                          name === 'itemsSold' ? 'تعداد فروش' : 'درآمد'
                        ]}
                      />
                      <Bar dataKey="itemsSold" fill="#3b82f6" name="itemsSold" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Status Distribution Chart */}
            <Card>
              <CardHeader>
                <CardTitle>توزیع وضعیت سفارش‌ها</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={statusData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {statusData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => formatNumber(Number(value))} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Status Breakdown */}
        {analytics && (
          <Card>
            <CardHeader>
              <CardTitle>جزئیات وضعیت سفارش‌ها</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-4">
                <div className="text-center p-4 bg-yellow-50 rounded-lg">
                  <div className="text-2xl font-bold text-yellow-800">{formatNumber(analytics.pendingItems)}</div>
                  <div className="text-sm text-yellow-600">در انتظار تایید</div>
                </div>
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-800">{formatNumber(analytics.confirmedItems)}</div>
                  <div className="text-sm text-blue-600">تایید شده</div>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-800">{formatNumber(analytics.shippedItems)}</div>
                  <div className="text-sm text-green-600">ارسال شده</div>
                </div>
                <div className="text-center p-4 bg-red-50 rounded-lg">
                  <div className="text-2xl font-bold text-red-800">{formatNumber(analytics.cancelledItems)}</div>
                  <div className="text-sm text-red-600">لغو شده</div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  )
}