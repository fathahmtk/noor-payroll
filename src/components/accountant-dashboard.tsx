"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { 
  DollarSign, 
  TrendingUp, 
  TrendingDown,
  FileText,
  AlertTriangle,
  CheckCircle,
  Clock,
  Download,
  Eye,
  Calculator,
  BarChart3,
  PieChart
} from "lucide-react"

interface DashboardLayoutProps {
  userName: string
  userRole: string
}

export function AccountantDashboard({ userName, userRole }: DashboardLayoutProps) {
  // Mock payroll data
  const payrollSummary = {
    currentMonth: {
      period: "January 2024",
      totalPayroll: 70500,
      totalEmployees: 3,
      averageSalary: 23500,
      status: "PROCESSED"
    },
    previousMonth: {
      period: "December 2023",
      totalPayroll: 70500,
      totalEmployees: 3,
      averageSalary: 23500,
      status: "PROCESSED"
    }
  }

  const payrollHistory = [
    {
      id: "1",
      period: "January 2024",
      payrollNumber: "PAY-2024-01",
      totalAmount: 70500,
      totalEmployees: 3,
      status: "PROCESSED",
      paymentDate: "2024-01-31",
      wpsStatus: "APPROVED"
    },
    {
      id: "2",
      period: "December 2023",
      payrollNumber: "PAY-2023-12",
      totalAmount: 70500,
      totalEmployees: 3,
      status: "PROCESSED",
      paymentDate: "2023-12-31",
      wpsStatus: "APPROVED"
    },
    {
      id: "3",
      period: "November 2023",
      payrollNumber: "PAY-2023-11",
      totalAmount: 69500,
      totalEmployees: 3,
      status: "PROCESSED",
      paymentDate: "2023-11-30",
      wpsStatus: "APPROVED"
    }
  ]

  const complianceReports = [
    {
      id: "1",
      reportType: "Monthly Payroll Summary",
      period: "January 2024",
      generatedDate: "2024-01-31",
      status: "COMPLETED",
      wpsCompliant: true
    },
    {
      id: "2",
      reportType: "Year-end Tax Summary",
      period: "2023",
      generatedDate: "2024-01-15",
      status: "COMPLETED",
      wpsCompliant: true
    },
    {
      id: "3",
      reportType: "Labour Law Compliance",
      period: "Q4 2023",
      generatedDate: "2024-01-10",
      status: "COMPLETED",
      wpsCompliant: true
    }
  ]

  const departmentBreakdown = [
    { department: "IT", employees: 1, payroll: 22500, percentage: 32 },
    { department: "HR", employees: 1, payroll: 18000, percentage: 26 },
    { department: "Finance", employees: 1, payroll: 15000, percentage: 21 },
    { department: "Other", employees: 0, payroll: 0, percentage: 21 }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "PROCESSED": return "bg-green-100 text-green-800"
      case "PENDING": return "bg-yellow-100 text-yellow-800"
      case "FAILED": return "bg-red-100 text-red-800"
      case "COMPLETED": return "bg-green-100 text-green-800"
      default: return "bg-gray-100 text-gray-800"
    }
  }

  const getWPSStatusColor = (status: string) => {
    switch (status) {
      case "APPROVED": return "bg-green-100 text-green-800"
      case "SUBMITTED": return "bg-blue-100 text-blue-800"
      case "PENDING": return "bg-yellow-100 text-yellow-800"
      case "REJECTED": return "bg-red-100 text-red-800"
      default: return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "PROCESSED": return <CheckCircle className="h-4 w-4 text-green-600" />
      case "PENDING": return <Clock className="h-4 w-4 text-yellow-600" />
      case "FAILED": return <AlertTriangle className="h-4 w-4 text-red-600" />
      case "COMPLETED": return <CheckCircle className="h-4 w-4 text-green-600" />
      default: return <Clock className="h-4 w-4 text-gray-600" />
    }
  }

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Welcome back, {userName}</h1>
          <p className="text-gray-600 mt-1">Monitor payroll reports and compliance tracking</p>
        </div>
        <Badge variant="outline" className="text-sm">
          {userRole}
        </Badge>
      </div>

      {/* Financial Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Current Month Payroll</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">QAR {payrollSummary.currentMonth.totalPayroll.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              {payrollSummary.currentMonth.period}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Employees</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{payrollSummary.currentMonth.totalEmployees}</div>
            <p className="text-xs text-muted-foreground">
              Active employees
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Salary</CardTitle>
            <Calculator className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">QAR {payrollSummary.currentMonth.averageSalary.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              Per employee
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">WPS Compliance</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <Badge className="bg-green-100 text-green-800">
                100% COMPLIANT
              </Badge>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              All submissions approved
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Payroll History and Department Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Payroll History */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Payroll History</CardTitle>
                <CardDescription>Recent payroll processing history</CardDescription>
              </div>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Period</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Employees</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>WPS Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {payrollHistory.map((payroll) => (
                    <TableRow key={payroll.id}>
                      <TableCell>
                        <div>
                          <p className="font-medium">{payroll.period}</p>
                          <p className="text-sm text-gray-500">{payroll.paymentDate}</p>
                        </div>
                      </TableCell>
                      <TableCell>QAR {payroll.totalAmount.toLocaleString()}</TableCell>
                      <TableCell>{payroll.totalEmployees}</TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(payroll.status)}>
                          {payroll.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className={getWPSStatusColor(payroll.wpsStatus)}>
                          {payroll.wpsStatus}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* Department Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle>Department Breakdown</CardTitle>
            <CardDescription>Payroll distribution by department</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {departmentBreakdown.map((dept, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 bg-blue-600 rounded"></div>
                    <span className="font-medium">{dept.department}</span>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">QAR {dept.payroll.toLocaleString()}</p>
                    <p className="text-xs text-gray-500">{dept.employees} employees ({dept.percentage}%)</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Compliance Reports */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Compliance Reports</CardTitle>
              <CardDescription>Track compliance with Qatar labour laws and WPS requirements</CardDescription>
            </div>
            <Button size="sm">
              <FileText className="h-4 w-4 mr-2" />
              Generate Report
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Report Type</TableHead>
                  <TableHead>Period</TableHead>
                  <TableHead>Generated Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>WPS Compliant</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {complianceReports.map((report) => (
                  <TableRow key={report.id}>
                    <TableCell className="font-medium">{report.reportType}</TableCell>
                    <TableCell>{report.period}</TableCell>
                    <TableCell>{report.generatedDate}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {getStatusIcon(report.status)}
                        <Badge className={getStatusColor(report.status)}>
                          {report.status}
                        </Badge>
                      </div>
                    </TableCell>
                    <TableCell>
                      {report.wpsCompliant ? (
                        <Badge className="bg-green-100 text-green-800">
                          Yes
                        </Badge>
                      ) : (
                        <Badge className="bg-red-100 text-red-800">
                          No
                        </Badge>
                      )}
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

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Common accounting tasks</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Button className="h-20 flex-col gap-2" variant="outline">
              <Calculator className="h-6 w-6" />
              <span>Process Payroll</span>
            </Button>
            <Button className="h-20 flex-col gap-2" variant="outline">
              <PieChart className="h-6 w-6" />
              <span>Generate Reports</span>
            </Button>
            <Button className="h-20 flex-col gap-2" variant="outline">
              <TrendingUp className="h-6 w-6" />
              <span>View Analytics</span>
            </Button>
            <Button className="h-20 flex-col gap-2" variant="outline">
              <FileText className="h-6 w-6" />
              <span>Compliance Check</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}