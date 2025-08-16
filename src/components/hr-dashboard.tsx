"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { 
  Users, 
  FileText, 
  UserPlus, 
  Search,
  Filter,
  Download,
  Upload,
  Calendar,
  AlertCircle,
  CheckCircle,
  Clock
} from "lucide-react"
import { WPSGenerator } from "@/components/wps-generator"

interface DashboardLayoutProps {
  userName: string
  userRole: string
}

export function HRDashboard({ userName, userRole }: DashboardLayoutProps) {
  const [searchTerm, setSearchTerm] = useState("")
  
  // Mock employee data
  const employees = [
    {
      id: "1",
      name: "Khalid Abdullah",
      employeeId: "EMP001",
      position: "Senior Developer",
      department: "IT",
      status: "ACTIVE",
      joinDate: "2020-01-15",
      salary: 22500
    },
    {
      id: "2",
      name: "Sara Mohammed",
      employeeId: "EMP002",
      position: "HR Specialist",
      department: "HR",
      status: "ACTIVE",
      joinDate: "2019-03-10",
      salary: 18000
    },
    {
      id: "3",
      name: "Omar Khalid",
      employeeId: "EMP003",
      position: "Accountant",
      department: "Finance",
      status: "ACTIVE",
      joinDate: "2021-06-01",
      salary: 15000
    }
  ]

  const wpsFiles = [
    {
      id: "1",
      fileName: "WPS_Jan_2024.xlsx",
      submissionDate: "2024-01-31",
      status: "APPROVED",
      totalAmount: 70500,
      totalRecords: 3
    },
    {
      id: "2",
      fileName: "WPS_Dec_2023.xlsx",
      submissionDate: "2023-12-31",
      status: "APPROVED",
      totalAmount: 70500,
      totalRecords: 3
    }
  ]

  const filteredEmployees = employees.filter(emp =>
    emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    emp.employeeId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    emp.position.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const getStatusColor = (status: string) => {
    switch (status) {
      case "ACTIVE": return "bg-green-100 text-green-800"
      case "INACTIVE": return "bg-red-100 text-red-800"
      case "ON_LEAVE": return "bg-yellow-100 text-yellow-800"
      case "TERMINATED": return "bg-gray-100 text-gray-800"
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
      case "APPROVED": return <CheckCircle className="h-4 w-4 text-green-600" />
      case "SUBMITTED": return <Clock className="h-4 w-4 text-blue-600" />
      case "PENDING": return <Clock className="h-4 w-4 text-yellow-600" />
      case "REJECTED": return <AlertCircle className="h-4 w-4 text-red-600" />
      default: return <Clock className="h-4 w-4 text-gray-600" />
    }
  }

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Welcome back, {userName}</h1>
          <p className="text-gray-600 mt-1">Manage employees and handle WPS submissions</p>
        </div>
        <Badge variant="outline" className="text-sm">
          {userRole}
        </Badge>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Employees</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{employees.length}</div>
            <p className="text-xs text-muted-foreground">
              All active employees
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">This Month Payroll</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">QAR 70,500</div>
            <p className="text-xs text-muted-foreground">
              Total payroll amount
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
              <Badge className={getWPSStatusColor("APPROVED")}>
                COMPLIANT
              </Badge>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Last submitted: Jan 31, 2024
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Actions</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0</div>
            <p className="text-xs text-muted-foreground">
              All up to date
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Employee Management Section */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Employee Management</CardTitle>
              <CardDescription>Manage your company employees and their information</CardDescription>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
              <Button size="sm">
                <UserPlus className="h-4 w-4 mr-2" />
                Add Employee
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search employees by name, ID, or position..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Employee</TableHead>
                  <TableHead>ID</TableHead>
                  <TableHead>Position</TableHead>
                  <TableHead>Department</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Salary</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredEmployees.map((employee) => (
                  <TableRow key={employee.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback>{employee.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{employee.name}</p>
                          <p className="text-sm text-gray-500">Joined {employee.joinDate}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{employee.employeeId}</TableCell>
                    <TableCell>{employee.position}</TableCell>
                    <TableCell>{employee.department}</TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(employee.status)}>
                        {employee.status}
                      </Badge>
                    </TableCell>
                    <TableCell>QAR {employee.salary.toLocaleString()}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm">Edit</Button>
                        <Button variant="ghost" size="sm">View</Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* WPS File Management */}
      <div className="space-y-6">
        <WPSGenerator companyId="demo-company-id" />
        
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>WPS File History</CardTitle>
                <CardDescription>Previous WPS submissions and their status</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>File Name</TableHead>
                    <TableHead>Submission Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Total Amount</TableHead>
                    <TableHead>Records</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {wpsFiles.map((file) => (
                    <TableRow key={file.id}>
                      <TableCell className="font-medium">{file.fileName}</TableCell>
                      <TableCell>{file.submissionDate}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {getStatusIcon(file.status)}
                          <Badge className={getWPSStatusColor(file.status)}>
                            {file.status}
                          </Badge>
                        </div>
                      </TableCell>
                      <TableCell>QAR {file.totalAmount.toLocaleString()}</TableCell>
                      <TableCell>{file.totalRecords}</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button variant="ghost" size="sm">Download</Button>
                          <Button variant="ghost" size="sm">View Details</Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}