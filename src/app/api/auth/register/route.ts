import { NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/db"
import bcrypt from "bcryptjs"
import { UserRole } from "@prisma/client"

export async function POST(request: NextRequest) {
  try {
    const { email, password, name, role, companyName, crNumber } = await request.json()

    if (!email || !password || !name || !role || !companyName || !crNumber) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      )
    }

    // Check if user already exists
    const existingUser = await db.user.findUnique({
      where: { email }
    })

    if (existingUser) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      )
    }

    // Check if company already exists
    const existingCompany = await db.company.findUnique({
      where: { crNumber }
    })

    let company
    if (existingCompany) {
      company = existingCompany
    } else {
      // Create new company
      company = await db.company.create({
        data: {
          name: companyName,
          crNumber,
          isActive: true
        }
      })
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12)

    // Create user
    const user = await db.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        role: role as UserRole,
        companyId: company.id,
        isActive: true
      },
      include: {
        company: true
      }
    })

    // Remove password from response
    const { password: _, ...userWithoutPassword } = user

    return NextResponse.json({
      user: userWithoutPassword,
      message: "Registration successful"
    })

  } catch (error) {
    console.error("Registration error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}