import { auth } from "@/lib/auth-config"
import { getSession, requireAuth as authRequireAuth, requireRole as authRequireRole } from "./auth"

export async function getCurrentUser() {
  // Try NextAuth session first
  const nextAuthSession = await auth()
  if (nextAuthSession) {
    return nextAuthSession.user
  }

  // Fallback to custom session
  const customSession = await getSession()
  return customSession?.user
}

export const requireAuth = authRequireAuth
export const requireRole = authRequireRole