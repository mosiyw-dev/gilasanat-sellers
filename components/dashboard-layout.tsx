"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { BarChart3, Bell, Home, LogOut, Menu, MessageSquare, Package, ShoppingCart, User, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  SidebarProvider,
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroupLabel,
  SidebarGroup,
  SidebarGroupContent,
} from "@/components/ui/sidebar"
import { useProfileQuery } from '@/app/api/profile/query'

interface DashboardLayoutProps {
  children: React.ReactNode
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const pathname = usePathname()
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false)
  const { data: profile, isLoading: isProfileLoading } = useProfileQuery()

  const truncateShopName = (name: string) => {
    return name.length > 12 ? `${name.slice(0, 12)}...` : name
  }

  const routes = [
    {
      href: "/dashboard",
      label: "داشبورد",
      icon: Home,
      active: pathname === "/dashboard",
    },
    {
      href: "/dashboard/products",
      label: "محصولات",
      icon: Package,
      active: pathname.includes("/dashboard/products"),
    },
    {
      href: "/dashboard/orders",
      label: "سفارش‌ها",
      icon: ShoppingCart,
      active: pathname.includes("/dashboard/orders"),
    },
    {
      href: "/dashboard/reports",
      label: "گزارش‌ها",
      icon: BarChart3,
      active: pathname.includes("/dashboard/reports"),
    },
    {
      href: "/dashboard/messages",
      label: "پیام‌ها",
      icon: MessageSquare,
      active: pathname.includes("/dashboard/messages"),
    },
  ]

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-4 md:px-6">
        <Sheet open={isMobileNavOpen} onOpenChange={setIsMobileNavOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="shrink-0 md:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">منوی ناوبری</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="pr-0">
            <div className="flex flex-col gap-4">
              <div className="grid gap-1 pr-4">
                {routes.map((route) => (
                  <Link
                    key={route.href}
                    href={route.href}
                    onClick={() => setIsMobileNavOpen(false)}
                    className={cn(
                      "flex items-center gap-2 rounded-md px-3 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors",
                      route.active && "bg-primary/5 text-primary font-medium",
                    )}
                  >
                    <route.icon className="h-4 w-4" />
                    {route.label}
                  </Link>
                ))}
              </div>
            </div>
          </SheetContent>
        </Sheet>
        <div className="flex items-center gap-2">
          <div className="bg-primary/10 p-2 rounded-lg">
            <ShoppingCart className="h-5 w-5 text-primary" />
          </div>
          <span className="text-base font-medium">پنل فروشندگان گیلاصنعت</span>
        </div>
        <div className="flex items-center gap-2 mr-auto">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-4 w-4" />
                <Badge className="absolute -top-1 -right-1 h-4 w-4 rounded-full p-0 flex items-center justify-center text-[10px]">
                  3
                </Badge>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
              <DropdownMenuLabel>اعلان‌ها</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <div className="grid gap-1">
                <DropdownMenuItem className="cursor-pointer">
                  <div className="grid gap-1">
                    <div className="font-medium text-sm">تغییر قیمت محصول</div>
                    <div className="text-xs text-muted-foreground">
                      محصول شما به دلیل قیمت بالاتر از رقیب غیرفعال شد
                    </div>
                    <div className="text-[10px] text-muted-foreground">۲ ساعت پیش</div>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">
                  <div className="grid gap-1">
                    <div className="font-medium text-sm">تایید محصول</div>
                    <div className="text-xs text-muted-foreground">محصول جدید شما تایید و در فروشگاه منتشر شد</div>
                    <div className="text-[10px] text-muted-foreground">دیروز</div>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">
                  <div className="grid gap-1">
                    <div className="font-medium text-sm">سفارش جدید</div>
                    <div className="text-xs text-muted-foreground">یک سفارش جدید برای محصولات شما ثبت شد</div>
                    <div className="text-[10px] text-muted-foreground">۲ روز پیش</div>
                  </div>
                </DropdownMenuItem>
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="cursor-pointer justify-center text-primary text-xs">
                مشاهده همه اعلان‌ها
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative">
                <Avatar className="h-7 w-7">
                  <AvatarImage src={profile?.logo} alt="تصویر پروفایل" />
                  <AvatarFallback className="bg-primary/5 text-primary text-xs">
                    {profile?.name?.charAt(0) || 'ف'}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>حساب کاربری</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="cursor-pointer text-sm">
                <User className="ml-2 h-4 w-4" />
                پروفایل
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer text-sm text-destructive">
                <LogOut className="ml-2 h-4 w-4" />
                خروج
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>
      <div className="flex flex-1">
        <SidebarProvider>
          <Sidebar side="right" className="hidden md:flex border-l">
            <SidebarContent className="pt-[25%]">
              <SidebarGroup>
                <SidebarGroupContent >
                  <SidebarMenu>
                    {routes.map((route) => (
                      <SidebarMenuItem key={route.href}>
                        <SidebarMenuButton
                          asChild
                          isActive={route.active}
                          className={cn(
                            "text-sm px-4 py-2.5 transition-all duration-200",
                            route.active 
                              ? "bg-primary/10 text-primary font-medium relative" 
                              : "hover:bg-primary/5 text-muted-foreground hover:text-foreground"
                          )}
                        >
                          <Link href={route.href} className="flex items-center gap-3">
                            <div className={cn(
                              "p-1.5 rounded-lg transition-colors",
                              route.active ? "bg-primary/20" : "bg-primary/5"
                            )}>
                              <route.icon className="h-4 w-4" />
                            </div>
                            <span>{route.label}</span>
                            {route.active && (
                              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-primary rounded-l-full" />
                            )}
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            </SidebarContent>
            <SidebarFooter className="border-t mt-auto">
              <div className="p-4">
                <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-primary/10 via-primary/5 to-background p-4">
                  <div className="absolute inset-0 bg-grid-white/10 [mask-image:linear-gradient(0deg,white,transparent)]" />
                  <div className="relative space-y-3">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10 ring-2 ring-background">
                        <AvatarImage src={profile?.logo} alt="تصویر پروفایل" />
                        <AvatarFallback className="bg-primary/10 text-primary text-sm">
                          {profile?.name?.charAt(0) || 'ف'}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium text-sm">فروشگاه {profile?.shopName ? truncateShopName(profile.shopName) : ''}</p>
                        <p className="text-xs text-muted-foreground">
                          فروشنده
                        </p>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="bg-background/50 backdrop-blur rounded-lg p-2 text-center">
                        <p className="text-[10px] text-muted-foreground">امتیاز</p>
                        <p className="font-medium text-sm">5/5</p>
                      </div>
                      <div className="bg-background/50 backdrop-blur rounded-lg p-2 text-center">
                        <p className="text-[10px] text-muted-foreground">آفر ها</p>
                        <p className="font-medium text-sm">{profile?.totalOffers}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </SidebarFooter>
          </Sidebar>
          <main className="flex-1 overflow-auto p-6">{children}</main>
        </SidebarProvider>
      </div>
    </div>
  )
}

