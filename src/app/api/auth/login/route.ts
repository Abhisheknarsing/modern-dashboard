import { NextRequest, NextResponse } from "next/server"
import { authenticate, createJWT } from "@/lib/auth"
import { validateLoginData } from "@/lib/validation"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, password } = body

    // Validate input data
    const validation = validateLoginData({ email, password })
    if (!validation.isValid) {
      return NextResponse.json(
        { error: validation.errors.join(", "), success: false },
        { status: 400 }
      )
    }

    // Authenticate user
    const user = await authenticate(email, password)
    
    if (!user) {
      return NextResponse.json(
        { error: "Invalid email or password", success: false },
        { status: 401 }
      )
    }

    // Create JWT token
    const token = await createJWT({
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role
    })

    // Create response with cookie
    const response = NextResponse.json(
      { 
        data: { user }, 
        message: "Login successful", 
        success: true 
      },
      { status: 200 }
    )

    // Set cookie
    response.cookies.set("auth-token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 // 24 hours
    })

    return response

  } catch (error) {
    console.error("Login error:", error)
    return NextResponse.json(
      { error: "Internal server error", success: false },
      { status: 500 }
    )
  }
}