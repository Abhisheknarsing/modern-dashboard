import { NextRequest, NextResponse } from "next/server"
import { validateRegistrationData } from "@/lib/validation"
import { users } from "@/lib/auth"
import { hashPassword } from "@/lib/password"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, password, confirmPassword } = body

    // Validate input data
    const validation = validateRegistrationData({ name, email, password, confirmPassword })
    if (!validation.isValid) {
      return NextResponse.json(
        { error: validation.errors.join(", "), success: false },
        { status: 400 }
      )
    }

    // Check if user already exists
    const existingUser = users.find(user => user.email === email)
    if (existingUser) {
      return NextResponse.json(
        { error: "User with this email already exists", success: false },
        { status: 409 }
      )
    }

    // Hash password using utility function
    const hashedPassword = await hashPassword(password)

    // Create new user
    const newUser = {
      id: Date.now().toString(),
      email,
      password: hashedPassword,
      name,
      role: "user",
      createdAt: new Date(),
      updatedAt: new Date()
    }

    users.push(newUser)

    // Return success response (without password)
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _, ...userWithoutPassword } = newUser
    return NextResponse.json(
      { 
        data: userWithoutPassword, 
        message: "User registered successfully", 
        success: true 
      },
      { status: 201 }
    )

  } catch (error) {
    console.error("Registration error:", error)
    return NextResponse.json(
      { error: "Internal server error", success: false },
      { status: 500 }
    )
  }
}