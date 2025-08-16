import { NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/db"
import { WPSStatus } from "@prisma/client"

export async function POST(request: NextRequest) {
  try {
    const { payrollId, companyId } = await request.json()

    if (!payrollId || !companyId) {
      return NextResponse.json(
        { error: "Payroll ID and Company ID are required" },
        { status: 400 }
      )
    }

    // Get payroll details with employee information
    const payroll = await db.payroll.findFirst({
      where: {
        id: payrollId,
        companyId: companyId
      },
      include: {
        payrollItems: {
          include: {
            employee: true
          }
        },
        company: true
      }
    })

    if (!payroll) {
      return NextResponse.json(
        { error: "Payroll not found" },
        { status: 404 }
      )
    }

    // Generate WPS file content (simplified for demo)
    // In a real implementation, this would generate the actual Excel file
    const wpsContent = generateWPSContent(payroll)

    // Create WPS file record
    const wpsFile = await db.wPSFile.create({
      data: {
        fileName: `WPS_${payroll.period}.xlsx`,
        filePath: `/wps-files/WPS_${payroll.period}.xlsx`,
        fileHash: generateHash(wpsContent),
        status: WPSStatus.PENDING,
        totalAmount: payroll.totalAmount,
        totalRecords: payroll.totalEmployees,
        companyId: companyId,
        payrollId: payrollId
      }
    })

    // Simulate WPS submission to Ministry of Labour
    // In a real implementation, this would make an API call to MOL
    await simulateWPSSubmission(wpsFile.id)

    return NextResponse.json({
      wpsFile: {
        id: wpsFile.id,
        fileName: wpsFile.fileName,
        status: wpsFile.status,
        totalAmount: wpsFile.totalAmount,
        totalRecords: wpsFile.totalRecords,
        createdAt: wpsFile.createdAt
      },
      message: "WPS file generated successfully"
    })

  } catch (error) {
    console.error("WPS generation error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}

function generateWPSContent(payroll: any) {
  // Generate WPS file content in the required format
  // This is a simplified version - in reality, this would generate proper Excel format
  const headers = [
    "Employee ID",
    "Qatar ID",
    "Employee Name",
    "Position",
    "Basic Salary",
    "Housing Allowance",
    "Transport Allowance",
    "Other Allowances",
    "Gross Salary",
    "Bank Name",
    "Bank Account",
    "IBAN"
  ]

  const rows = payroll.payrollItems.map((item: any) => [
    item.employee.employeeId,
    item.employee.qatarId || "",
    item.employee.name,
    item.employee.position,
    item.basicSalary,
    item.housingAllowance,
    item.transportAllowance,
    item.otherAllowances,
    item.grossSalary,
    item.employee.bankName || "",
    item.employee.bankAccountNumber || "",
    item.employee.iban || ""
  ])

  return {
    headers,
    rows,
    companyInfo: {
      name: payroll.company.name,
      crNumber: payroll.company.crNumber,
      period: payroll.period
    }
  }
}

function generateHash(content: any): string {
  // Simple hash generation for demo purposes
  // In a real implementation, use proper cryptographic hashing
  const contentString = JSON.stringify(content)
  let hash = 0
  for (let i = 0; i < contentString.length; i++) {
    const char = contentString.charCodeAt(i)
    hash = ((hash << 5) - hash) + char
    hash = hash & hash // Convert to 32-bit integer
  }
  return hash.toString(16)
}

async function simulateWPSSubmission(wpsFileId: string) {
  // Simulate WPS submission process
  // In a real implementation, this would:
  // 1. Connect to Qatar Ministry of Labour API
  // 2. Submit the WPS file
  // 3. Handle the response and update status accordingly
  
  // Simulate processing delay
  await new Promise(resolve => setTimeout(resolve, 2000))
  
  // Update WPS file status to submitted
  await db.wPSFile.update({
    where: { id: wpsFileId },
    data: {
      status: WPSStatus.SUBMITTED,
      submissionDate: new Date()
    }
  })
  
  // Simulate approval after another delay
  setTimeout(async () => {
    await db.wPSFile.update({
      where: { id: wpsFileId },
      data: {
        status: WPSStatus.APPROVED,
        responseDate: new Date()
      }
    })
  }, 3000)
}