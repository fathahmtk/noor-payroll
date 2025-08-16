import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { TenantProvider } from "@/contexts/tenant-context";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Noor Payroll - Multi-Tenant Payroll Management",
  description: "Comprehensive payroll management system for Qatar businesses with multi-tenant architecture and WPS compliance.",
  keywords: ["Noor Payroll", "Multi-Tenant", "WPS", "Payroll", "Qatar", "Next.js"],
  authors: [{ name: "Noor Digital Team" }],
  openGraph: {
    title: "Noor Payroll - Multi-Tenant Payroll Management",
    description: "Comprehensive payroll management for Qatar businesses",
    url: "https://noor-payroll.vercel.app",
    siteName: "Noor Payroll",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Noor Payroll - Multi-Tenant Payroll Management",
    description: "Comprehensive payroll management for Qatar businesses",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        <TenantProvider>
          {children}
          <Toaster />
        </TenantProvider>
      </body>
    </html>
  );
}
