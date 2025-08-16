import { NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/db"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const companyId = searchParams.get("companyId")

    if (!companyId) {
      return NextResponse.json(
        { error: "Company ID is required" },
        { status: 400 }
      )
    }

    const wpsFiles = await db.wPSFile.findMany({
      where: {
        companyId: companyId
      },
      include: {
        payroll: {
          select: {
            period: true,
            startDate: true,
            endDate: true
          }
        }
      },
      orderBy: {
        createdAt: "desc"
      }
    })

    return NextResponse.json({
      wpsFiles,
      count: wpsFiles.length
    })

  } catch (error) {
    console.error("Error fetching WPS files:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}