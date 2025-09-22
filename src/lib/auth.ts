import { SignJWT, jwtVerify } from "jose"
import { cookies } from "next/headers"
import { verifyPassword } from "./password"

const JWT_SECRET = new TextEncoder().encode(
  process.env.NEXTAUTH_SECRET || "your-secret-key-change-this-in-production"
)

// Mock user data - in production this would come from a database
export const users = [
  {
    id: "1",
    email: "admin@example.com",
    password: "$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj3QJgusgqSK", // "password123"
    name: "Admin User",
    role: "admin"
  },
  {
    id: "2", 
    email: "user@example.com",
    password: "$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj3QJgusgqSK", // "password123"
    name: "Regular User",
    role: "user"
  }
]

export interface User {
  id: string
  email: string
  name: string
  role: string
}

export interface Session {
  user: User
  expires: string
}

export async function createJWT(payload: Record<string, unknown>): Promise<string> {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("24h")
    .sign(JWT_SECRET)
}

export async function verifyJWT(token: string): Promise<Record<string, unknown> | null> {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET)
    return payload
  } catch {
    return null
  }
}

export async function authenticate(email: string, password: string): Promise<User | null> {
  const user = users.find(u => u.email === email)
  
  if (!user) {
    return null
  }

  // Use the password utility function for consistency
  const isPasswordValid = await verifyPassword(password, user.password)
  
  if (!isPasswordValid) {
    return null
  }

  return {
    id: user.id,
    email: user.email,
    name: user.name,
    role: user.role
  }
}

export async function getSession(): Promise<Session | null> {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get("auth-token")?.value

    if (!token) {
      return null
    }

    const payload = await verifyJWT(token)
    
    if (!payload) {
      return null
    }

    return {
      user: {
        id: payload.id as string,
        email: payload.email as string,
        name: payload.name as string,
        role: payload.role as string
      },
      expires: new Date((payload.exp as number) * 1000).toISOString()
    }
  } catch {
    return null
  }
}

export async function requireAuth(): Promise<User> {
  const session = await getSession()
  
  if (!session) {
    throw new Error("Authentication required")
  }
  
  return session.user
}

export async function requireRole(role: string): Promise<User> {
  const user = await requireAuth()
  
  if (user.role !== role) {
    throw new Error(`Role ${role} required`)
  }
  
  return user
}