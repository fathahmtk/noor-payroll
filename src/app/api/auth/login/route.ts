import { NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/db"
import bcrypt from "bcryptjs"

export async function POST(request: NextRequest) {
  try {
    const { email, password, role } = await request.json()

    if (!email || !password || !role) {
      return NextResponse.json(
        { error: "Email, password, and role are required" },
        { status: 400 }
      )
    }

    // Find user by email and verify role matches
    const user = await db.user.findFirst({
      where: {
        email,
        role: role.toUpperCase(),
        isActive: true
      },
      include: {
        company: true,
        employeeProfile: true
      }
    })

    if (!user) {
      return NextResponse.json(
        { error: "Invalid credentials or role mismatch" },
        { status: 401 }
      )
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password)
    if (!isPasswordValid) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      )
    }

    // Update last login
    await db.user.update({
      where: { id: user.id },
      data: { lastLoginAt: new Date() }
    })

    // Remove password from response
    const { password: _, ...userWithoutPassword } = user

    // In a real app, you would create and return a JWT token here
    return NextResponse.json({
      user: userWithoutPassword,
      message: "Login successful"
    })

  } catch (error) {
    console.error("Login error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}