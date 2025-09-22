import { NextResponse } from "next/server"
import { auth } from "@/lib/auth-config"
import { getSession } from "@/lib/auth"

export async function GET() {
  try {
    // Try NextAuth session first
    const nextAuthSession = await auth()
    
    if (nextAuthSession) {
      return NextResponse.json(
        { 
          user: nextAuthSession.user, 
          success: true 
        },
        { status: 200 }
      )
    }

    // Fallback to custom JWT session
    const customSession = await getSession()
    
    if (!customSession) {
      return NextResponse.json(
        { error: "Not authenticated", success: false },
        { status: 401 }
      )
    }

    return NextResponse.json(
      { 
        user: customSession.user, 
        success: true 
      },
      { status: 200 }
    )

  } catch (error) {
    console.error("Session check error:", error)
    return NextResponse.json(
      { error: "Internal server error", success: false },
      { status: 500 }
    )
  }
}