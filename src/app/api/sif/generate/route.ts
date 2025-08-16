import { NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/db"
import { UserRole } from "@prisma/client"

interface SIFHeader {
  employerEID: string
  fileDate: string
  fileTime: string
  payerEID: string
  payerQID: string
  payerBank: string
  payerIBAN: string
  salaryMonth: string
  totalSalaries: number
  numberOfRecords: number
  sifVersion: string
}

interface SIFRecord {
  recordSerialNo: number
  personalNumber: string
  visaNumber: string
  workerName: string
  workerBank: string
  workerAccount: string
  paymentFrequency: string
  workingDays: number
  netWageReceived: number
  basicSalary: number
  overtimeHours: number
  extraWages: number
  deductions: number
  paymentType: string
  notes: string
  housingAllowance: number
  foodAllowance: number
  transportAllowance: number
  overtimeAllowance: number
  deductionReasonCode: string
}

interface BankCode {
  code: string
  name: string
}

const BANK_CODES: BankCode[] = [
  { code: "ABQ", name: "Al Ahli Bank" },
  { code: "CBQ", name: "Commercial Bank of Qatar" },
  { code: "DBQ", name: "Doha Bank" },
  { code: "QNB", name: "Qatar National Bank" },
  { code: "QIB", name: "Qatar Islamic Bank" },
  { code: "IBQ", name: "International Bank of Qatar" },
  { code: "AKQ", name: "Ahli Bank Qatar" },
  { code: "BBK", name: "Barwa Bank" },
  { code: "CBI", name: "Commercial Bank International" },
  { code: "DIB", name: "Dukhan Bank" },
  { code: "GCB", name: "Gulf Commercial Bank" },
  { code: "HBB", name: "Hassan Bin Ali Bank" },
  { code: "ICB", name: "Islamic Co-operative Bank" },
  { code: "KCB", name: "Kuwait Commercial Bank" },
  { code: "MAB", name: "Masraf Al Rayan" },
  { code: "NBB", name: "National Bank of Oman" },
  { code: "QCB", name: "Qatar Central Bank" },
  { code: "QDB", name: "Qatar Development Bank" },
  { code: "QIB", name: "Qatar Islamic Bank" },
  { code: "QNB", name: "Qatar National Bank" },
  { code: "QTB", name: "Qatar Turkish Bank" },
  { code: "SBB", name: "Standard Chartered Bank" },
  { code: "TBB", name: "The Commercial Bank" },
  { code: "UBQ", name: "United Bank" },
  { code: "WBB", name: "Warba Bank" },
]

const DEDUCTION_CODES = {
  "01": "Working hours violations",
  "02": "Work arrangement breaches",
  "03": "Damage compensation",
  "04": "Advance payment recovery",
  "95": "Other reasons",
  "99": "Requires Notes field"
}

export async function POST(request: NextRequest) {
  try {
    const { payrollId, companyId } = await request.json()

    if (!payrollId || !companyId) {
      return NextResponse.json(
        { error: "Payroll ID and Company ID are required" },
        { status: 400 }
      )
    }

    // Get company and payroll data
    const company = await db.company.findUnique({
      where: { id: companyId }
    })

    if (!company) {
      return NextResponse.json(
        { error: "Company not found" },
        { status: 404 }
      )
    }

    const payroll = await db.payroll.findUnique({
      where: { id: payrollId },
      include: {
        payrollItems: {
          include: {
            employee: true
          }
        }
      }
    })

    if (!payroll) {
      return NextResponse.json(
        { error: "Payroll not found" },
        { status: 404 }
      )
    }

    // Generate SIF header
    const now = new Date()
    const fileDate = now.toISOString().slice(0, 10).replace(/-/g, '')
    const fileTime = now.toTimeString().slice(0, 5).replace(/:/g, '')

    const header: SIFHeader = {
      employerEID: company.crNumber.padStart(8, '0'),
      fileDate,
      fileTime,
      payerEID: company.crNumber.padStart(8, '0'),
      payerQID: '', // Empty if paying via corporate account
      payerBank: 'CBQ', // Default bank code - should be configurable
      payerIBAN: 'QA33CBQA00000000000000000000000000', // Default IBAN - should be configurable
      salaryMonth: payroll.period.replace('-', ''),
      totalSalaries: payroll.totalAmount,
      numberOfRecords: payroll.payrollItems.length,
      sifVersion: '1'
    }

    // Generate SIF records
    const records: SIFRecord[] = payroll.payrollItems.map((item, index) => {
      const employee = item.employee
      
      // Get bank code from employee's bank name
      const bankCode = BANK_CODES.find(bank => 
        employee.bankName?.toLowerCase().includes(bank.name.toLowerCase())
      )?.code || 'QNB'

      // Calculate allowances
      const housingAllowance = employee.housingAllowance || 0
      const transportAllowance = employee.transportAllowance || 0
      const otherAllowances = employee.otherAllowances || 0
      
      // Calculate extra wages (overtime + bonuses + other allowances)
      const extraWages = (item.overtime || 0) + (item.bonus || 0) + otherAllowances

      // Determine deduction reason code
      let deductionReasonCode = ''
      if (item.deductions > 0) {
        deductionReasonCode = '95' // Other reasons - should be configurable based on actual deduction type
      }

      return {
        recordSerialNo: index + 1,
        personalNumber: employee.qatarId || '',
        visaNumber: employee.passportNumber || '',
        workerName: employee.name,
        workerBank: bankCode,
        workerAccount: employee.iban || employee.bankAccountNumber || '',
        paymentFrequency: 'M', // Monthly
        workingDays: 30, // Default - should be calculated from attendance
        netWageReceived: item.netSalary,
        basicSalary: employee.basicSalary,
        overtimeHours: item.overtime || 0,
        extraWages,
        deductions: item.deductions || 0,
        paymentType: 'Normal',
        notes: '',
        housingAllowance,
        foodAllowance: 0, // Not implemented
        transportAllowance,
        overtimeAllowance: item.overtime || 0,
        deductionReasonCode
      }
    })

    // Generate CSV content
    const headerRow = [
      'Employer EID',
      'File Date',
      'File Time',
      'Payer EID',
      'Payer QID',
      'Payer Bank',
      'Payer IBAN',
      'Salary Month',
      'Total Salaries',
      'Records',
      'SIF Ver.'
    ].join(',')

    const headerData = [
      header.employerEID,
      header.fileDate,
      header.fileTime,
      header.payerEID,
      header.payerQID,
      header.payerBank,
      header.payerIBAN,
      header.salaryMonth,
      header.totalSalaries.toString(),
      header.numberOfRecords.toString(),
      header.sifVersion
    ].join(',')

    const recordsHeader = [
      'Record QID',
      'Visa ID',
      'Worker Name',
      'Worker Bank',
      'Worker Account',
      'Frequency',
      'Work Days',
      'Net Salary',
      'Basic Salary',
      'Overtime Hours',
      'Extra Income',
      'Deductions',
      'Payment Type',
      'Notes'
    ].join(',')

    const recordsData = records.map(record => [
      record.personalNumber,
      record.visaNumber,
      `"${record.workerName}"`, // Quote names with commas
      record.workerBank,
      record.workerAccount,
      record.paymentFrequency,
      record.workingDays.toString(),
      record.netWageReceived.toFixed(2),
      record.basicSalary.toFixed(2),
      record.overtimeHours.toFixed(2),
      record.extraWages.toFixed(2),
      record.deductions.toFixed(2),
      `"${record.paymentType}"`,
      `"${record.notes}"`
    ].join(','))

    const csvContent = [
      headerRow,
      headerData,
      recordsHeader,
      ...recordsData
    ].join('\n')

    // Generate filename
    const filename = `SIF_${header.employerEID}_${header.payerBank}_${header.fileDate}_${header.fileTime}.csv`

    // Create WPS file record
    await db.wPSFile.create({
      data: {
        fileName: filename,
        filePath: `/sif-files/${filename}`,
        fileHash: '', // Would calculate hash in production
        status: 'PENDING',
        totalAmount: header.totalSalaries,
        totalRecords: header.numberOfRecords,
        companyId: company.id,
        payrollId: payroll.id
      }
    })

    return new NextResponse(csvContent, {
      headers: {
        'Content-Type': 'text/csv',
        'Content-Disposition': `attachment; filename="${filename}"`
      }
    })

  } catch (error) {
    console.error('SIF generation error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}