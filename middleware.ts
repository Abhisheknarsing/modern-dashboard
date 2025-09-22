import { NextRequest, NextResponse } from "next/server"
import { verifyJWT } from "@/lib/auth"

export async function middleware(request: NextRequest) {
  const { nextUrl } = request

  // Define protected routes
  const isProtectedRoute = [
    "/dashboard",
    "/analytics", 
    "/commerce",
    "/crm",
    "/admin"
  ].some(route => nextUrl.pathname.startsWith(route))

  // Define auth routes
  const isAuthRoute = ["/login", "/register"].includes(nextUrl.pathname)

  // Check for authentication tokens
  let session = null
  
  // Check for NextAuth session token first
  const nextAuthToken = request.cookies.get("next-auth.session-token")?.value ||
                       request.cookies.get("__Secure-next-auth.session-token")?.value

  // If NextAuth token exists, allow NextAuth to handle authentication
  if (nextAuthToken && isProtectedRoute) {
    // Let NextAuth handle the session validation
    return NextResponse.next()
  }

  // Fallback to custom JWT authentication
  const customToken = request.cookies.get("auth-token")?.value
  if (customToken) {
    const payload = await verifyJWT(customToken)
    if (payload) {
      session = {
        user: {
          id: payload.id,
          email: payload.email,
          name: payload.name,
          role: payload.role
        }
      }
    }
  }

  // Redirect to login if accessing protected route without authentication
  if (isProtectedRoute && !session && !nextAuthToken) {
    return NextResponse.redirect(new URL("/login", nextUrl))
  }

  // Check admin routes
  if (nextUrl.pathname.startsWith("/admin")) {
    if (!session || session.user.role !== "admin") {
      return NextResponse.redirect(new URL("/dashboard", nextUrl))
    }
  }

  // Redirect authenticated users away from auth pages
  if ((session || nextAuthToken) && isAuthRoute) {
    return NextResponse.redirect(new URL("/dashboard", nextUrl))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    // Protect dashboard routes
    "/dashboard/:path*",
    "/analytics/:path*", 
    "/commerce/:path*",
    "/crm/:path*",
    "/admin/:path*",
    // Auth pages
    "/login",
    "/register",
    // Protect API routes (except auth routes)
    "/api/((?!auth).)*"
  ]
}