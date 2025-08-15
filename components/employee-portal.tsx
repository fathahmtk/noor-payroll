"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { 
  FileText, 
  Download, 
  Calendar,
  DollarSign,
  User,
  Briefcase,
  MapPin,
  Phone,
  Mail,
  CreditCard,
  Clock,
  CheckCircle,
  AlertCircle
} from "lucide-react"

interface DashboardLayoutProps {
  userName: string
  userRole: string
}

export function EmployeePortal({ userName, userRole }: DashboardLayoutProps) {
  // Mock employee data
  const employeeData = {
    name: "Khalid Abdullah",
    employeeId: "EMP001",
    position: "Senior Developer",
    department: "IT",
    joinDate: "2020-01-15",
    email: "khalid@company.com",
    phone: "+974 5555 1234",
    address: "Doha, Qatar",
    qatarId: "123456789",
    nationality: "Qatari",
    maritalStatus: "MARRIED",
    bankName: "Qatar National Bank",
    bankAccount: "1234567890",
    iban: "QA58QNBA0000000000001234567890"
  }

  // Mock payslips
  const payslips = [
    {
      id: "1",
      period: "January 2024",
      payDate: "2024-01-31",
      basicSalary: 15000,
      housingAllowance: 5000,
      transportAllowance: 1500,
      otherAllowances: 1000,
      overtime: 0,
      bonus: 0,
      deductions: 0,
      netSalary: 22500,
      status: "PAID"
    },
    {
      id: "2",
      period: "December 2023",
      payDate: "2023-12-31",
      basicSalary: 15000,
      housingAllowance: 5000,
      transportAllowance: 1500,
      otherAllowances: 1000,
      overtime: 500,
      bonus: 2000,
      deductions: 500,
      netSalary: 24000,
      status: "PAID"
    },
    {
      id: "3",
      period: "November 2023",
      payDate: "2023-11-30",
      basicSalary: 15000,
      housingAllowance: 5000,
      transportAllowance: 1500,
      otherAllowances: 1000,
      overtime: 0,
      bonus: 0,
      deductions: 0,
      netSalary: 22500,
      status: "PAID"
    }
  ]

  // Mock leave balance
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
      case "FAILED": return <AlertCircle className="h-4 w-4 text-red-600" />
      default: return <Clock className="h-4 w-4 text-gray-600" />
    }
  }

  const handleDownloadPayslip = (payslipId: string) => {
    console.log("Downloading payslip:", payslipId)
    // In real implementation, this would download the actual payslip file
  }

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Welcome back, {userName}</h1>
          <p className="text-gray-600 mt-1">Access your payslips and manage your personal information</p>
        </div>
        <Badge variant="outline" className="text-sm">
          {userRole}
        </Badge>
      </div>

      {/* Employee Overview */}
      <Card>
        <CardHeader>
          <CardTitle>Employee Information</CardTitle>
          <CardDescription>Your personal and employment details</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Personal Information */}
            <div className="space-y-4">
              <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                <User className="h-5 w-5" />
                Personal Information
              </h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Avatar className="h-12 w-12">
                    <AvatarFallback>{employeeData.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{employeeData.name}</p>
                    <p className="text-sm text-gray-500">{employeeData.employeeId}</p>
                  </div>
                </div>
                
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-gray-400" />
                    <span>{employeeData.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-gray-400" />
                    <span>{employeeData.phone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-gray-400" />
                    <span>{employeeData.address}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Employment Information */}
            <div className="space-y-4">
              <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                <Briefcase className="h-5 w-5" />
                Employment Information
              </h3>
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-500">Position</p>
                    <p className="font-medium">{employeeData.position}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Department</p>
                    <p className="font-medium">{employeeData.department}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Join Date</p>
                    <p className="font-medium">{employeeData.joinDate}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Qatar ID</p>
                    <p className="font-medium">{employeeData.qatarId}</p>
                  </div>
                </div>
                
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <CreditCard className="h-4 w-4 text-gray-400" />
                    <span>{employeeData.bankName}</span>
                  </div>
                  <div className="text-xs text-gray-500 ml-6">
                    Account: {employeeData.bankAccount}
                  </div>
                  <div className="text-xs text-gray-500 ml-6">
                    IBAN: {employeeData.iban}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Current Salary</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">QAR 22,500</div>
            <p className="text-xs text-muted-foreground">
              Monthly net salary
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Leave Balance</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{leaveBalance.annual} days</div>
            <p className="text-xs text-muted-foreground">
              Annual leave available
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Latest Payslip</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Jan 2024</div>
            <p className="text-xs text-muted-foreground">
              Status: Paid
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Payslips Section */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Payslips</CardTitle>
              <CardDescription>Download your monthly payslips and payment history</CardDescription>
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
                  <TableHead>Basic Salary</TableHead>
                  <TableHead>Allowances</TableHead>
                  <TableHead>Net Salary</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {payslips.map((payslip) => {
                  const allowances = payslip.housingAllowance + payslip.transportAllowance + payslip.otherAllowances + payslip.overtime + payslip.bonus
                  
                  return (
                    <TableRow key={payslip.id}>
                      <TableCell className="font-medium">{payslip.period}</TableCell>
                      <TableCell>{payslip.payDate}</TableCell>
                      <TableCell>QAR {payslip.basicSalary.toLocaleString()}</TableCell>
                      <TableCell>QAR {allowances.toLocaleString()}</TableCell>
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
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleDownloadPayslip(payslip.id)}
                        >
                          <Download className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Leave Balance */}
      <Card>
        <CardHeader>
          <CardTitle>Leave Balance</CardTitle>
          <CardDescription>Your current leave entitlements and usage</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">{leaveBalance.annual}</div>
              <p className="text-sm text-gray-600">Annual Leave</p>
              <p className="text-xs text-gray-500">{leaveBalance.used.annual} used</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">{leaveBalance.sick}</div>
              <p className="text-sm text-gray-600">Sick Leave</p>
              <p className="text-xs text-gray-500">{leaveBalance.used.sick} used</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-600">{leaveBalance.emergency}</div>
              <p className="text-sm text-gray-600">Emergency Leave</p>
              <p className="text-xs text-gray-500">{leaveBalance.used.emergency} used</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Common employee self-service tasks</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Button className="h-20 flex-col gap-2" variant="outline">
              <FileText className="h-6 w-6" />
              <span>View Payslips</span>
            </Button>
            <Button className="h-20 flex-col gap-2" variant="outline">
              <Calendar className="h-6 w-6" />
              <span>Request Leave</span>
            </Button>
            <Button className="h-20 flex-col gap-2" variant="outline">
              <User className="h-6 w-6" />
              <span>Update Profile</span>
            </Button>
            <Button className="h-20 flex-col gap-2" variant="outline">
              <Download className="h-6 w-6" />
              <span>Documents</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}