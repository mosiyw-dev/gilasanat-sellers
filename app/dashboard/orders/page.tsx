import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Eye, Search } from "lucide-react"
import DashboardLayout from "@/components/dashboard-layout"

export default function OrdersPage() {
  return (
    <DashboardLayout>
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight">سفارش‌ها</h2>
          <div className="relative w-64">
            <Search className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input placeholder="جستجوی سفارش..." className="pr-9" />
          </div>
        </div>

        <Card>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>شماره سفارش</TableHead>
                <TableHead>تاریخ</TableHead>
                <TableHead>مبلغ کل</TableHead>
                <TableHead>وضعیت</TableHead>
                <TableHead className="text-left">عملیات</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">#۱۲۳۴۵</TableCell>
                <TableCell>۱۴۰۲/۱۲/۱۵</TableCell>
                <TableCell>۱,۲۵۰,۰۰۰ تومان</TableCell>
                <TableCell>
                  <Badge className="bg-green-500">تحویل شده</Badge>
                </TableCell>
                <TableCell>
                  <Button variant="ghost" size="icon">
                    <Eye className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">#۱۲۳۴۴</TableCell>
                <TableCell>۱۴۰۲/۱۲/۱۰</TableCell>
                <TableCell>۷۵۰,۰۰۰ تومان</TableCell>
                <TableCell>
                  <Badge className="bg-blue-500">در حال ارسال</Badge>
                </TableCell>
                <TableCell>
                  <Button variant="ghost" size="icon">
                    <Eye className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">#۱۲۳۴۳</TableCell>
                <TableCell>۱۴۰۲/۱۲/۰۵</TableCell>
                <TableCell>۲,۱۰۰,۰۰۰ تومان</TableCell>
                <TableCell>
                  <Badge className="bg-green-500">تحویل شده</Badge>
                </TableCell>
                <TableCell>
                  <Button variant="ghost" size="icon">
                    <Eye className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">#۱۲۳۴۲</TableCell>
                <TableCell>۱۴۰۲/۱۲/۰۱</TableCell>
                <TableCell>۹۰۰,۰۰۰ تومان</TableCell>
                <TableCell>
                  <Badge className="bg-green-500">تحویل شده</Badge>
                </TableCell>
                <TableCell>
                  <Button variant="ghost" size="icon">
                    <Eye className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">#۱۲۳۴۱</TableCell>
                <TableCell>۱۴۰۲/۱۱/۲۵</TableCell>
                <TableCell>۱,۵۰۰,۰۰۰ تومان</TableCell>
                <TableCell>
                  <Badge className="bg-green-500">تحویل شده</Badge>
                </TableCell>
                <TableCell>
                  <Button variant="ghost" size="icon">
                    <Eye className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">#۱۲۳۴۰</TableCell>
                <TableCell>۱۴۰۲/۱۱/۲۰</TableCell>
                <TableCell>۳,۲۰۰,۰۰۰ تومان</TableCell>
                <TableCell>
                  <Badge className="bg-green-500">تحویل شده</Badge>
                </TableCell>
                <TableCell>
                  <Button variant="ghost" size="icon">
                    <Eye className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">#۱۲۳۳۹</TableCell>
                <TableCell>۱۴۰۲/۱۱/۱۵</TableCell>
                <TableCell>۸۵۰,۰۰۰ تومان</TableCell>
                <TableCell>
                  <Badge className="bg-green-500">تحویل شده</Badge>
                </TableCell>
                <TableCell>
                  <Button variant="ghost" size="icon">
                    <Eye className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Card>
      </div>
    </DashboardLayout>
  )
}

