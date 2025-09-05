"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon, Search, Filter, Eye, ChevronLeft, ChevronRight } from "lucide-react"
import { format } from "date-fns"
import { fa } from "date-fns/locale"
import DashboardLayout from "@/components/dashboard-layout"
import { OrderCard } from "@/components/order-card"
import { StatusUpdateButton } from "@/components/status-update-button"
import { useSellerOrders } from "@/hooks/use-orders"
import { useDebounce } from "@/hooks/use-debounce"
import { cn } from "@/lib/utils"
import Link from "next/link"

export default function OrdersPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [dateRange, setDateRange] = useState<{ from?: Date; to?: Date }>({})
  const [currentPage, setCurrentPage] = useState(1)
  const [viewMode, setViewMode] = useState<"table" | "cards">("table")

  const debouncedSearch = useDebounce(searchTerm, 500)

  const { data: ordersData, isLoading, error } = useSellerOrders({
    page: currentPage,
    limit: 10,
    search: debouncedSearch,
    status: statusFilter === "all" ? "" : statusFilter,
    startDate: dateRange.from?.toISOString(),
    endDate: dateRange.to?.toISOString(),
  })

  const orders = ordersData?.data || []
  const totalPages = Math.ceil((ordersData?.total || 0) / 10)

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "confirmed":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "shipped":
        return "bg-green-100 text-green-800 border-green-200"
      case "canceled":
        return "bg-red-100 text-red-800 border-red-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "pending":
        return "در انتظار تایید"
      case "confirmed":
        return "تایید شده"
      case "shipped":
        return "ارسال شده"
      case "canceled":
        return "لغو شده"
      default:
        return status
    }
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("fa-IR").format(price) + " تومان"
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("fa-IR")
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  if (error) {
    return (
      <DashboardLayout>
        <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
          <div className="text-center py-8">
            <p className="text-red-500">خطا در بارگذاری سفارش‌ها</p>
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
          <h2 className="text-3xl font-bold tracking-tight">سفارش‌ها</h2>
          <div className="flex items-center gap-2">
            <Button
              variant={viewMode === "table" ? "default" : "outline"}
              size="sm"
              onClick={() => setViewMode("table")}
            >
              جدول
            </Button>
            <Button
              variant={viewMode === "cards" ? "default" : "outline"}
              size="sm"
              onClick={() => setViewMode("cards")}
            >
              کارت
            </Button>
          </div>
        </div>

        {/* Filters */}
        <Card>
          <div className="p-4">
            <div className="flex flex-col md:flex-row gap-4">
              {/* Search */}
              <div className="relative flex-1">
                <Search className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="جستجوی سفارش یا مشتری..."
                  className="pr-9"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              {/* Status Filter */}
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="فیلتر وضعیت" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">همه وضعیت‌ها</SelectItem>
                  <SelectItem value="pending">در انتظار تایید</SelectItem>
                  <SelectItem value="confirmed">تایید شده</SelectItem>
                  <SelectItem value="shipped">ارسال شده</SelectItem>
                  <SelectItem value="canceled">لغو شده</SelectItem>
                </SelectContent>
              </Select>

              {/* Date Range */}
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full md:w-48 justify-start text-left font-normal">
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
                      <span>انتخاب تاریخ</span>
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

              {/* Clear Filters */}
              <Button
                variant="outline"
                onClick={() => {
                  setSearchTerm("")
                  setStatusFilter("all")
                  setDateRange({})
                  setCurrentPage(1)
                }}
              >
                پاک کردن فیلترها
              </Button>
            </div>
          </div>
        </Card>

        {/* Content */}
        {isLoading ? (
          <div className="text-center py-8">
            <p>در حال بارگذاری...</p>
          </div>
        ) : orders.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-muted-foreground">هیچ سفارشی یافت نشد</p>
          </div>
        ) : viewMode === "table" ? (
          <Card>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>شماره سفارش</TableHead>
                  <TableHead>مشتری</TableHead>
                  <TableHead>محصول</TableHead>
                  <TableHead>تاریخ</TableHead>
                  <TableHead>مبلغ</TableHead>
                  <TableHead>وضعیت</TableHead>
                  <TableHead className="text-left">عملیات</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orders.map((orderItem) => (
                  <TableRow key={orderItem._id}>
                    <TableCell className="font-medium">
                      #{orderItem.orderId.orderNumber}
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium">{orderItem.orderId.user.full_name}</p>
                        <p className="text-sm text-muted-foreground">
                          {orderItem.orderId.user.phone_number}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium">{orderItem.name}</p>
                        <p className="text-sm text-muted-foreground">
                          تعداد: {orderItem.balance}
                        </p>
                        {orderItem.originalPrice !== orderItem.discountPrice && (
                          <p className="text-xs text-green-600">
                            تخفیف: {formatPrice(orderItem.originalPrice - orderItem.discountPrice)}
                          </p>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>{formatDate(orderItem.orderId.date)}</TableCell>
                    <TableCell>{formatPrice(orderItem.subtotal)}</TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(orderItem.status)}>
                        {getStatusText(orderItem.status)}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Link href={`/dashboard/orders/${orderItem.orderId.orderNumber}`}>
                          <Button variant="ghost" size="icon">
                            <Eye className="h-4 w-4" />
                          </Button>
                        </Link>
                        <StatusUpdateButton
                          orderItemId={orderItem._id}
                          currentStatus={orderItem.status}
                        />
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {orders.map((orderItem) => (
              <OrderCard
                key={orderItem._id}
                orderItem={orderItem}
                onViewDetails={(orderId) => {
                  window.location.href = `/dashboard/orders/${orderId}`
                }}
              />
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <Card>
            <div className="p-4">
              <div className="flex items-center justify-between">
                <p className="text-sm text-muted-foreground">
                  صفحه {currentPage} از {totalPages}
                </p>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                  >
                    <ChevronRight className="h-4 w-4" />
                    قبلی
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                  >
                    بعدی
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        )}
      </div>
    </DashboardLayout>
  )
}

