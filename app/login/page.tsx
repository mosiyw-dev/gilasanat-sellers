"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ShoppingBag } from "lucide-react";
import { useLogin } from "@/hooks/use-auth"; // Assuming the hook is in the 'hooks' folder

export default function LoginPage() {
  const router = useRouter();
  const [phoneNumber, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const { login, isLoading } = useLogin(); // Using the login mutation hook

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent page refresh
    // Call the login mutation
    login({ phoneNumber, password });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-muted/40">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1 text-center">
          <div className="flex justify-center mb-2">
            <ShoppingBag className="h-10 w-10 text-primary" />
          </div>
          <CardTitle className="text-2xl">ورود به پنل فروشندگان گیلاصنعت</CardTitle>
          <CardDescription>برای دسترسی به پنل فروشندگان وارد حساب کاربری خود شوید</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <form onSubmit={handleLogin}>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="phoneNumber">شماره موبایل</Label>
                <Input
                  id="phoneNumber"
                  type="tel"
                  placeholder="09123456789"
                  value={phoneNumber}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">رمز عبور</Label>
                </div>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "در حال ورود..." : "ورود"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
