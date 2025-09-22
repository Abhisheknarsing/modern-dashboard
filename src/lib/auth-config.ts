import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { authenticate } from "@/lib/auth"
import { validateLoginData } from "@/lib/validation"
import { env, isProduction } from "@/lib/env"

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        // Validate input data
        const validation = validateLoginData({
          email: credentials.email as string,
          password: credentials.password as string
        })
        
        if (!validation.isValid) {
          return null
        }

        // Authenticate user
        const user = await authenticate(credentials.email as string, credentials.password as string)
        
        if (!user) {
          return null
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role
        }
      }
    })
  ],
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60, // 24 hours
  },
  secret: env.NEXTAUTH_SECRET,
  trustHost: process.env.AUTH_TRUST_HOST === 'true' || isProduction,
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role
      }
      return token
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.sub!
        session.user.role = token.role as string
      }
      return session
    }
  },
  pages: {
    signIn: "/login",
    error: "/login"
  },
})