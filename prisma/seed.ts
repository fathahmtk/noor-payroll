import { db } from "../src/lib/db"
import bcrypt from "bcryptjs"
import { UserRole, EmployeeStatus } from "@prisma/client"

async function main() {
  console.log("Seeding database...")

  // Create a demo company
  const company = await db.company.create({
    data: {
      name: "Qatar Business Solutions Ltd.",
      crNumber: "1234567890",
      address: "Doha, Qatar",
      phone: "+974 1234 5678",
      email: "info@qatarbusiness.com",
      website: "www.qatarbusiness.com",
      isActive: true
    }
  })

  console.log("Created company:", company.name)

  // Create departments
  const hrDepartment = await db.department.create({
    data: {
      name: "Human Resources",
      code: "HR",
      description: "Human Resources Department",
      companyId: company.id,
      isActive: true
    }
  })

  const financeDepartment = await db.department.create({
    data: {
      name: "Finance",
      code: "FIN",
      description: "Finance and Accounting Department",
      companyId: company.id,
      isActive: true
    }
  })

  const itDepartment = await db.department.create({
    data: {
      name: "Information Technology",
      code: "IT",
      description: "IT Department",
      companyId: company.id,
      isActive: true
    }
  })

  console.log("Created departments")

  // Hash password for demo users
  const hashedPassword = await bcrypt.hash("password123", 12)

  // Create Owner user
  const owner = await db.user.create({
    data: {
      email: "owner@company.com",
      password: hashedPassword,
      name: "Ahmed Al-Thani",
      role: UserRole.OWNER,
      phoneNumber: "+974 1234 5678",
      companyId: company.id,
      isActive: true
    }
  })

  // Create HR Manager user
  const hrManager = await db.user.create({
    data: {
      email: "hr@company.com",
      password: hashedPassword,
      name: "Fatima Hassan",
      role: UserRole.HR_MANAGER,
      phoneNumber: "+974 2345 6789",
      companyId: company.id,
      isActive: true
    }
  })

  // Create Accountant user
  const accountant = await db.user.create({
    data: {
      email: "accountant@company.com",
      password: hashedPassword,
      name: "Mohammed Ali",
      role: UserRole.ACCOUNTANT,
      phoneNumber: "+974 3456 7890",
      companyId: company.id,
      isActive: true
    }
  })

  console.log("Created admin users")

  // Create demo employees
  const employees = [
    {
      employeeId: "EMP001",
      qatarId: "123456789",
      name: "Khalid Abdullah",
      email: "khalid@company.com",
      phoneNumber: "+974 5555 1234",
      dateOfBirth: new Date("1990-05-15"),
      gender: "MALE",
      nationality: "Qatari",
      maritalStatus: "MARRIED",
      address: "Doha, Qatar",
      joinDate: new Date("2020-01-15"),
      contractStartDate: new Date("2020-01-15"),
      position: "Senior Developer",
      departmentId: itDepartment.id,
      basicSalary: 15000,
      housingAllowance: 5000,
      transportAllowance: 1500,
      otherAllowances: 1000,
      bankName: "Qatar National Bank",
      bankAccountNumber: "1234567890",
      iban: "QA58QNBA0000000000001234567890",
      status: EmployeeStatus.ACTIVE
    },
    {
      employeeId: "EMP002",
      qatarId: "987654321",
      name: "Sara Mohammed",
      email: "sara@company.com",
      phoneNumber: "+974 5555 5678",
      dateOfBirth: new Date("1988-08-22"),
      gender: "FEMALE",
      nationality: "Qatari",
      maritalStatus: "SINGLE",
      address: "Doha, Qatar",
      joinDate: new Date("2019-03-10"),
      contractStartDate: new Date("2019-03-10"),
      position: "HR Specialist",
      departmentId: hrDepartment.id,
      basicSalary: 12000,
      housingAllowance: 4000,
      transportAllowance: 1200,
      otherAllowances: 800,
      bankName: "Commercial Bank of Qatar",
      bankAccountNumber: "0987654321",
      iban: "QA58CBQK0000000000000987654321",
      status: EmployeeStatus.ACTIVE
    },
    {
      employeeId: "EMP003",
      qatarId: "456789123",
      name: "Omar Khalid",
      email: "omar@company.com",
      phoneNumber: "+974 5555 9012",
      dateOfBirth: new Date("1992-12-03"),
      gender: "MALE",
      nationality: "Jordanian",
      maritalStatus: "MARRIED",
      address: "Doha, Qatar",
      joinDate: new Date("2021-06-01"),
      contractStartDate: new Date("2021-06-01"),
      position: "Accountant",
      departmentId: financeDepartment.id,
      basicSalary: 10000,
      housingAllowance: 3500,
      transportAllowance: 1000,
      otherAllowances: 500,
      bankName: "Doha Bank",
      bankAccountNumber: "4567891230",
      iban: "QA58DOHB0000000000004567891230",
      status: EmployeeStatus.ACTIVE
    }
  ]

  for (const empData of employees) {
    const employee = await db.employee.create({
      data: {
        ...empData,
        companyId: company.id
      }
    })

    // Create user account for employee
    await db.user.create({
      data: {
        email: empData.email,
        password: hashedPassword,
        name: empData.name,
        role: UserRole.EMPLOYEE,
        phoneNumber: empData.phoneNumber,
        companyId: company.id,
        employeeProfile: {
          connect: {
            id: employee.id
          }
        },
        isActive: true
      }
    })
  }

  console.log("Created demo employees")

  // Create a sample payroll
  const payroll = await db.payroll.create({
    data: {
      payrollNumber: "PAY-2024-01",
      period: "2024-01",
      startDate: new Date("2024-01-01"),
      endDate: new Date("2024-01-31"),
      paymentDate: new Date("2024-01-31"),
      totalEmployees: 3,
      totalAmount: 70500, // Sum of all employee salaries
      status: "PROCESSED",
      companyId: company.id
    }
  })

  console.log("Created sample payroll")

  console.log("Database seeded successfully!")
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await db.$disconnect()
  })