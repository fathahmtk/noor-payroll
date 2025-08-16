"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { DashboardLayout } from "@/components/dashboard-layout"
import { OwnerDashboard } from "@/components/owner-dashboard"
import { HRDashboard } from "@/components/hr-dashboard"
import { AccountantDashboard } from "@/components/accountant-dashboard"
import { EmployeePortal } from "@/components/employee-portal"

export default function Home() {
  const [isLoading, setIsLoading] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [currentUser, setCurrentUser] = useState<{
    name: string
    email: string
    role: string
  } | null>(null)
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
    role: ""
  })

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginForm),
      })

      const data = await response.json()

      if (response.ok) {
        setCurrentUser({
          name: data.user.name,
          email: data.user.email,
          role: data.user.role
        })
        setIsLoggedIn(true)
      } else {
        alert(data.error || 'Login failed')
      }
    } catch (error) {
      console.error('Login error:', error)
      alert('Login failed. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
    setCurrentUser(null)
    setLoginForm({ email: "", password: "", role: "" })
  }

  if (isLoggedIn && currentUser) {
    const renderDashboard = () => {
      switch (currentUser.role) {
        case "OWNER":
          return <OwnerDashboard userName={currentUser.name} userRole={currentUser.role} />
        case "HR_MANAGER":
          return <HRDashboard userName={currentUser.name} userRole={currentUser.role} />
        case "ACCOUNTANT":
          return <AccountantDashboard userName={currentUser.name} userRole={currentUser.role} />
        case "EMPLOYEE":
          return <EmployeePortal userName={currentUser.name} userRole={currentUser.role} />
        default:
          return <div className="text-center py-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Dashboard</h2>
            <p className="text-gray-600">Welcome to your dashboard</p>
          </div>
      }
    }

    return (
      <DashboardLayout 
        userName={currentUser.name}
        userRole={currentUser.role}
      >
        {renderDashboard()}
      </DashboardLayout>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl mx-auto grid lg:grid-cols-2 gap-8 items-center">
        {/* Left side - Hero content */}
        <div className="text-center lg:text-left space-y-6">
          <div className="flex items-center justify-center lg:justify-start gap-3">
            <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">NP</span>
            </div>
            <h1 className="text-3xl font-bold text-gray-900">Noor Payroll</h1>
          </div>
          
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
            Comprehensive Payroll Management for Qatar Businesses
          </h2>
          
          <p className="text-lg text-gray-600 max-w-2xl">
            Streamline your payroll processes with our integrated WPS (Wage Protection System) solution. 
            Designed specifically for Qatar's labor market with full compliance to Ministry of Labour regulations.
          </p>
          
          <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
            <Badge variant="secondary" className="text-sm">WPS Compliant</Badge>
            <Badge variant="secondary" className="text-sm">Multi-Role Access</Badge>
            <Badge variant="secondary" className="text-sm">Real-time Reports</Badge>
            <Badge variant="secondary" className="text-sm">Bank Integration</Badge>
          </div>
        </div>

        {/* Right side - Login form */}
        <Card className="w-full max-w-md mx-auto sm:max-w-lg">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold sm:text-3xl">Welcome Back</CardTitle>
            <CardDescription className="text-sm sm:text-base">
              Sign in to access your payroll dashboard
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="role">Select Your Role</Label>
                <Select value={loginForm.role} onValueChange={(value) => setLoginForm({...loginForm, role: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose your role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="OWNER">🏢 Business Owner</SelectItem>
                    <SelectItem value="HR_MANAGER">👥 HR Manager</SelectItem>
                    <SelectItem value="ACCOUNTANT">💰 Accountant</SelectItem>
                    <SelectItem value="EMPLOYEE">👤 Employee</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={loginForm.email}
                  onChange={(e) => setLoginForm({...loginForm, email: e.target.value})}
                  required
                  className="text-sm sm:text-base"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={loginForm.password}
                  onChange={(e) => setLoginForm({...loginForm, password: e.target.value})}
                  required
                  className="text-sm sm:text-base"
                />
              </div>
              
              <Button 
                type="submit" 
                className="w-full text-sm sm:text-base" 
                disabled={isLoading || !loginForm.role || !loginForm.email || !loginForm.password}
              >
                {isLoading ? "Signing in..." : "Sign In"}
              </Button>
            </form>
            
            <div className="mt-6 text-center space-y-2">
              <p className="text-sm text-gray-600">Demo credentials:</p>
              <div className="text-xs text-gray-500 space-y-1 max-w-xs mx-auto">
                <p>Owner: owner@company.com / password123</p>
                <p>HR: hr@company.com / password123</p>
                <p>Accountant: accountant@company.com / password123</p>
                <p>Employee: khalid@company.com / password123</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}