"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Loader2 } from "lucide-react"
import { useUpdateSellerOrderItemStatus } from "@/hooks/use-orders"

interface StatusUpdateButtonProps {
  orderItemId: string
  currentStatus: "pending" | "confirmed" | "shipped" | "canceled"
  disabled?: boolean
}

export function StatusUpdateButton({ 
  orderItemId, 
  currentStatus, 
  disabled = false 
}: StatusUpdateButtonProps) {
  const [open, setOpen] = useState(false)
  const [selectedStatus, setSelectedStatus] = useState(currentStatus)
  
  const updateStatusMutation = useUpdateSellerOrderItemStatus()

  const statusOptions = [
    { value: "pending", label: "در انتظار تایید" },
    { value: "confirmed", label: "تایید شده" },
    { value: "shipped", label: "ارسال شده" },
    { value: "canceled", label: "لغو شده" },
  ]

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

  const handleUpdateStatus = async () => {
    if (selectedStatus === currentStatus) {
      setOpen(false)
      return
    }

    try {
      await updateStatusMutation.mutateAsync({
        itemId: orderItemId,
        status: selectedStatus as "pending" | "confirmed" | "shipped" | "canceled"
      })
      setOpen(false)
    } catch (error) {
      // Error is handled by the mutation hook
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button 
          variant="outline" 
          size="sm" 
          disabled={disabled}
          className="text-xs"
        >
          تغییر وضعیت
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>تغییر وضعیت سفارش</DialogTitle>
          <DialogDescription>
            وضعیت فعلی: 
            <Badge className={getStatusColor(currentStatus)}>
              {statusOptions.find(opt => opt.value === currentStatus)?.label}
            </Badge>
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium">وضعیت جدید</label>
            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="انتخاب وضعیت" />
              </SelectTrigger>
              <SelectContent>
                {statusOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => setOpen(false)}
            disabled={updateStatusMutation.isPending}
          >
            انصراف
          </Button>
          <Button
            onClick={handleUpdateStatus}
            disabled={updateStatusMutation.isPending || selectedStatus === currentStatus}
          >
            {updateStatusMutation.isPending && (
              <Loader2 className="h-4 w-4 ml-2 animate-spin" />
            )}
            تایید تغییر
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
