import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { ReactQueryProvider } from "@/lib/react-query-provider";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "فروشگاه | پنل فروشندگان",
  description: "پنل مدیریت فروشندگان فروشگاه",
  generator: "v0.dev",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl">
      <body className={inter.className}>
        <ReactQueryProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem
            disableTransitionOnChange
          >
            {children}
            <Toaster
              position="bottom-right"
              expand={false}
              richColors
              dir="rtl"
              className="font-vazirmatn"
              toastOptions={{
                classNames: {
                  toast: "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
                  description: "group-[.toast]:text-muted-foreground",
                  actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
                  cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground",
                  success: "group-[.toast]:bg-green-50 group-[.toast]:text-green-800 group-[.toast]:border-green-200",
                  error: "group-[.toast]:bg-red-50 group-[.toast]:text-red-800 group-[.toast]:border-red-200",
                  warning: "group-[.toast]:bg-yellow-50 group-[.toast]:text-yellow-800 group-[.toast]:border-yellow-200",
                  info: "group-[.toast]:bg-blue-50 group-[.toast]:text-blue-800 group-[.toast]:border-blue-200",
                },
              }}
            />
          </ThemeProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
