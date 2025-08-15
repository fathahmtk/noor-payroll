"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { 
  User, 
  DollarSign, 
  Calendar,
  FileText,
  Download,
  Eye,
  Edit,
  Mail,
  Phone,
  MapPin,
  Briefcase,
  Clock,
  CheckCircle
} from "lucide-react"

interface DashboardLayoutProps {
  userName: string
  userRole: string
}

export function EmployeeDashboard({ userName, userRole }: DashboardLayoutProps) {
  const [activeTab, setActiveTab] = useState("overview")
  
  // Mock employee data
  const employeeData = {
    name: "Khalid Abdullah",
    employeeId: "EMP001",
    position: "Senior Developer",
    department: "IT",
    email: "khalid@company.com",
    phone: "+974 5555 1234",
    address: "Doha, Qatar",
    joinDate: "2020-01-15",
    qatarId: "123456789",
    nationality: "Qatari",
    maritalStatus: "MARRIED"
  }

  const salaryData = {
    basicSalary: 15000,
    housingAllowance: 5000,
    transportAllowance: 1500,
    otherAllowances: 1000,
    grossSalary: 22500,
    deductions: 0,
    netSalary: 22500
  }

  const payslips = [
    {
      id: "1",
      period: "January 2024",
      payDate: "2024-01-31",
      grossSalary: 22500,
      deductions: 0,
      netSalary: 22500,
      status: "PAID"
    },
    {
      id: "2",
      period: "December 2023",
      payDate: "2023-12-31",
      grossSalary: 22500,
      deductions: 0,
      netSalary: 22500,
      status: "PAID"
    },
    {
      id: "3",
      period: "November 2023",
      payDate: "2023-11-30",
      grossSalary: 22000,
      deductions: 0,
      netSalary: 22000,
      status: "PAID"
    }
  ]

  const leaveBalance = {
    annual: 21,
    sick: 15,
    emergency: 5,
    used: {
      annual: 5,
      sick: 2,
      emergency: 1
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "PAID": return "bg-green-100 text-green-800"
      case "PENDING": return "bg-yellow-100 text-yellow-800"
      case "FAILED": return "bg-red-100 text-red-800"
      default: return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "PAID": return <CheckCircle className="h-4 w-4 text-green-600" />
      case "PENDING": return <Clock className="h-4 w-4 text-yellow-600" />
      case "FAILED": return <CheckCircle className="h-4 w-4 text-red-600" />
      default: return <Clock className="h-4 w-4 text-gray-600" />
    }
  }

  const tabs = [
    { id: "overview", label: "Overview", icon: User },
    { id: "payslips", label: "Payslips", icon: FileText },
    { id: "personal", label: "Personal Info", icon: Edit },
    { id: "leave", label: "Leave Balance", icon: Calendar }
  ]

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Welcome back, {userName}</h1>
          <p className="text-gray-600 mt-1">View your payslips and manage your personal information</p>
        </div>
        <Badge variant="outline" className="text-sm">
          {userRole}
        </Badge>
      </div>

      {/* Employee Profile Card */}
      <Card>
        <CardHeader>
          <CardTitle>Employee Profile</CardTitle>
          <CardDescription>Your personal and employment information</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-start gap-6">
            <Avatar className="h-20 w-20">
              <AvatarFallback className="text-2xl">{employeeData.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
            </Avatar>
            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-gray-500" />
                  <span className="font-medium">{employeeData.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Briefcase className="h-4 w-4 text-gray-500" />
                  <span>{employeeData.position}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-gray-500" />
                  <span>{employeeData.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-gray-500" />
                  <span>{employeeData.phone}</span>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-gray-500" />
                  <span>{employeeData.address}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-gray-500" />
                  <span>Joined {employeeData.joinDate}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-500">Employee ID:</span>
                  <span className="font-medium">{employeeData.employeeId}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-500">Department:</span>
                  <span className="font-medium">{employeeData.department}</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Navigation Tabs */}
      <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
        {tabs.map((tab) => (
          <Button
            key={tab.id}
            variant={activeTab === tab.id ? "default" : "ghost"}
            className="flex-1 justify-start gap-2"
            onClick={() => setActiveTab(tab.id)}
          >
            <tab.icon className="h-4 w-4" />
            {tab.label}
          </Button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === "overview" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Current Salary */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-5 w-5" />
                Current Salary
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Basic Salary</span>
                  <span className="font-medium">QAR {salaryData.basicSalary.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Housing Allowance</span>
                  <span className="font-medium">QAR {salaryData.housingAllowance.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Transport Allowance</span>
                  <span className="font-medium">QAR {salaryData.transportAllowance.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Other Allowances</span>
                  <span className="font-medium">QAR {salaryData.otherAllowances.toLocaleString()}</span>
                </div>
                <div className="border-t pt-2">
                  <div className="flex justify-between font-medium">
                    <span>Net Salary</span>
                    <span className="text-green-600">QAR {salaryData.netSalary.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Leave Balance */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Leave Balance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Annual Leave</span>
                  <span className="font-medium">{leaveBalance.annual - leaveBalance.used.annual} days</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Sick Leave</span>
                  <span className="font-medium">{leaveBalance.sick - leaveBalance.used.sick} days</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Emergency Leave</span>
                  <span className="font-medium">{leaveBalance.emergency - leaveBalance.used.emergency} days</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Button className="w-full justify-start gap-2" variant="outline">
                  <Download className="h-4 w-4" />
                  Download Latest Payslip
                </Button>
                <Button className="w-full justify-start gap-2" variant="outline">
                  <Edit className="h-4 w-4" />
                  Update Personal Information
                </Button>
                <Button className="w-full justify-start gap-2" variant="outline">
                  <Calendar className="h-4 w-4" />
                  Request Leave
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {activeTab === "payslips" && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Payslips</CardTitle>
                <CardDescription>View and download your monthly payslips</CardDescription>
              </div>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Download All
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Period</TableHead>
                    <TableHead>Pay Date</TableHead>
                    <TableHead>Gross Salary</TableHead>
                    <TableHead>Net Salary</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {payslips.map((payslip) => (
                    <TableRow key={payslip.id}>
                      <TableCell className="font-medium">{payslip.period}</TableCell>
                      <TableCell>{payslip.payDate}</TableCell>
                      <TableCell>QAR {payslip.grossSalary.toLocaleString()}</TableCell>
                      <TableCell>QAR {payslip.netSalary.toLocaleString()}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {getStatusIcon(payslip.status)}
                          <Badge className={getStatusColor(payslip.status)}>
                            {payslip.status}
                          </Badge>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Download className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      )}

      {activeTab === "personal" && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Personal Information</CardTitle>
                <CardDescription>Manage your personal and contact details</CardDescription>
              </div>
              <Button size="sm">
                <Edit className="h-4 w-4 mr-2" />
                Edit Information
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-700">Full Name</label>
                  <p className="mt-1 text-sm text-gray-900">{employeeData.name}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Qatar ID</label>
                  <p className="mt-1 text-sm text-gray-900">{employeeData.qatarId}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Nationality</label>
                  <p className="mt-1 text-sm text-gray-900">{employeeData.nationality}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Marital Status</label>
                  <p className="mt-1 text-sm text-gray-900">{employeeData.maritalStatus}</p>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-700">Email Address</label>
                  <p className="mt-1 text-sm text-gray-900">{employeeData.email}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Phone Number</label>
                  <p className="mt-1 text-sm text-gray-900">{employeeData.phone}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Address</label>
                  <p className="mt-1 text-sm text-gray-900">{employeeData.address}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Employee ID</label>
                  <p className="mt-1 text-sm text-gray-900">{employeeData.employeeId}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {activeTab === "leave" && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Leave Balance</CardTitle>
                <CardDescription>Track your available and used leave days</CardDescription>
              </div>
              <Button size="sm">
                <Calendar className="h-4 w-4 mr-2" />
                Request Leave
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-4">
                <h3 className="font-medium">Annual Leave</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Total</span>
                    <span className="font-medium">{leaveBalance.annual} days</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Used</span>
                    <span className="font-medium">{leaveBalance.used.annual} days</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Remaining</span>
                    <span className="font-medium text-green-600">{leaveBalance.annual - leaveBalance.used.annual} days</span>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <h3 className="font-medium">Sick Leave</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Total</span>
                    <span className="font-medium">{leaveBalance.sick} days</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Used</span>
                    <span className="font-medium">{leaveBalance.used.sick} days</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Remaining</span>
                    <span className="font-medium text-green-600">{leaveBalance.sick - leaveBalance.used.sick} days</span>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <h3 className="font-medium">Emergency Leave</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Total</span>
                    <span className="font-medium">{leaveBalance.emergency} days</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Used</span>
                    <span className="font-medium">{leaveBalance.used.emergency} days</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Remaining</span>
                    <span className="font-medium text-green-600">{leaveBalance.emergency - leaveBalance.used.emergency} days</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}