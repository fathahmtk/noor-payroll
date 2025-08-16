"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { 
  Building2, 
  Users, 
  DollarSign, 
  TrendingUp, 
  TrendingDown,
  FileText,
  AlertTriangle,
  CheckCircle,
  Clock
} from "lucide-react"

interface DashboardLayoutProps {
  userName: string
  userRole: string
}

export function OwnerDashboard({ userName, userRole }: DashboardLayoutProps) {
  // Mock data for demonstration
  const companyStats = {
    totalEmployees: 3,
    monthlyPayroll: 70500,
    wpsCompliance: "COMPLIANT",
    pendingApprovals: 2,
    activeDepartments: 3
  }

  const recentActivities = [
    { id: 1, type: "PAYROLL", description: "Monthly payroll processed for January 2024", time: "2 hours ago", status: "COMPLETED" },
    { id: 2, type: "WPS", description: "WPS file submitted to Ministry of Labour", time: "1 day ago", status: "SUBMITTED" },
    { id: 3, type: "EMPLOYEE", description: "New employee onboarding completed", time: "3 days ago", status: "COMPLETED" },
    { id: 4, type: "COMPLIANCE", description: "Labour law compliance review completed", time: "1 week ago", status: "COMPLETED" }
  ]

  const payrollTrends = [
    { month: "Oct 2023", amount: 68000 },
    { month: "Nov 2023", amount: 69500 },
    { month: "Dec 2023", amount: 70500 },
    { month: "Jan 2024", amount: 70500 }
  ]

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "COMPLETED": return <CheckCircle className="h-4 w-4 text-green-600" />
      case "SUBMITTED": return <Clock className="h-4 w-4 text-blue-600" />
      case "PENDING": return <Clock className="h-4 w-4 text-yellow-600" />
      case "FAILED": return <AlertTriangle className="h-4 w-4 text-red-600" />
      default: return <Clock className="h-4 w-4 text-gray-600" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "COMPLETED": return "bg-green-100 text-green-800"
      case "SUBMITTED": return "bg-blue-100 text-blue-800"
      case "PENDING": return "bg-yellow-100 text-yellow-800"
      case "FAILED": return "bg-red-100 text-red-800"
      default: return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Welcome back, {userName}</h1>
          <p className="text-gray-600 mt-1">Here's your company overview and key metrics</p>
        </div>
        <Badge variant="outline" className="text-sm">
          {userRole}
        </Badge>
      </div>

      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Employees</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{companyStats.totalEmployees}</div>
            <p className="text-xs text-muted-foreground">
              +2 from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Payroll</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">QAR {companyStats.monthlyPayroll.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              +1.5% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">WPS Status</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <Badge className={getStatusColor(companyStats.wpsCompliance)}>
                {companyStats.wpsCompliance}
              </Badge>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Last submitted: Jan 31, 2024
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Approvals</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{companyStats.pendingApprovals}</div>
            <p className="text-xs text-muted-foreground">
              Requires your attention
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts and Activity Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Payroll Trend Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Payroll Trend</CardTitle>
            <CardDescription>Monthly payroll expenses over the last 4 months</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {payrollTrends.map((trend, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-sm font-medium">{trend.month}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-sm">QAR {trend.amount.toLocaleString()}</span>
                    {index > 0 && trend.amount > payrollTrends[index - 1].amount && (
                      <TrendingUp className="h-4 w-4 text-green-600" />
                    )}
                    {index > 0 && trend.amount < payrollTrends[index - 1].amount && (
                      <TrendingDown className="h-4 w-4 text-red-600" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Activities */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activities</CardTitle>
            <CardDescription>Latest system activities and updates</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-start gap-3">
                  {getStatusIcon(activity.status)}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900">{activity.description}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="outline" className="text-xs">
                        {activity.type}
                      </Badge>
                      <span className="text-xs text-gray-500">{activity.time}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Common tasks you can perform</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button className="h-20 flex-col gap-2" variant="outline">
              <Users className="h-6 w-6" />
              <span>View Employees</span>
            </Button>
            <Button className="h-20 flex-col gap-2" variant="outline">
              <DollarSign className="h-6 w-6" />
              <span>Process Payroll</span>
            </Button>
            <Button className="h-20 flex-col gap-2" variant="outline">
              <FileText className="h-6 w-6" />
              <span>Generate WPS File</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}