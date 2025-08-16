"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { 
  BarChart3, 
  Building2, 
  DollarSign, 
  Users, 
  TrendingUp, 
  TrendingDown,
  FileText,
  Settings,
  LogOut,
  Menu,
  Bell
} from "lucide-react"

interface DashboardLayoutProps {
  children: React.ReactNode
  userRole: string
  userName: string
  userAvatar?: string
}

export function DashboardLayout({ children, userRole, userName, userAvatar }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const getRoleDisplayName = (role: string) => {
    switch (role) {
      case "OWNER": return "Business Owner"
      case "HR_MANAGER": return "HR Manager"
      case "ACCOUNTANT": return "Accountant"
      case "EMPLOYEE": return "Employee"
      default: return role
    }
  }

  const getRoleIcon = (role: string) => {
    switch (role) {
      case "OWNER": return <Building2 className="h-5 w-5" />
      case "HR_MANAGER": return <Users className="h-5 w-5" />
      case "ACCOUNTANT": return <DollarSign className="h-5 w-5" />
      case "EMPLOYEE": return <Users className="h-5 w-5" />
      default: return <Users className="h-5 w-5" />
    }
  }

  const menuItems = [
    { title: "Dashboard", icon: BarChart3, href: "/dashboard" },
    { title: "Employees", icon: Users, href: "/employees" },
    { title: "Payroll", icon: DollarSign, href: "/payroll" },
    { title: "WPS Files", icon: FileText, href: "/wps" },
    { title: "Reports", icon: TrendingUp, href: "/reports" },
    { title: "Settings", icon: Settings, href: "/settings" },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-200 ease-in-out lg:translate-x-0 lg:static lg:inset-0`}>
        <div className="flex items-center justify-center h-16 px-4 border-b">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">NP</span>
            </div>
            <h1 className="text-xl font-bold text-gray-900">Noor Payroll</h1>
          </div>
        </div>
        
        <nav className="mt-8 px-4">
          <div className="space-y-2">
            {menuItems.map((item) => (
              <a
                key={item.title}
                href={item.href}
                className="flex items-center gap-3 px-4 py-3 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <item.icon className="h-5 w-5" />
                <span>{item.title}</span>
              </a>
            ))}
          </div>
        </nav>
      </div>

      {/* Main content */}
      <div className="lg:ml-64">
        {/* Header */}
        <header className="bg-white shadow-sm border-b">
          <div className="flex items-center justify-between h-16 px-4">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden"
              >
                <Menu className="h-5 w-5" />
              </Button>
              <div>
                <h2 className="text-lg font-semibold text-gray-900">Dashboard</h2>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm">
                <Bell className="h-5 w-5" />
              </Button>
              
              <div className="flex items-center gap-3">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={userAvatar} />
                  <AvatarFallback>{userName.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="hidden md:block">
                  <p className="text-sm font-medium text-gray-900">{userName}</p>
                  <div className="flex items-center gap-1">
                    {getRoleIcon(userRole)}
                    <Badge variant="secondary" className="text-xs">
                      {getRoleDisplayName(userRole)}
                    </Badge>
                  </div>
                </div>
              </div>
              
              <Button variant="ghost" size="sm">
                <LogOut className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  )
}