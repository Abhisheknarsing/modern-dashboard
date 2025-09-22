import { LoginData, RegisterData } from "@/types"

export interface ValidationResult {
  isValid: boolean
  errors: string[]
}

export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export function validatePassword(password: string): ValidationResult {
  const errors: string[] = []
  
  if (password.length < 8) {
    errors.push("Password must be at least 8 characters long")
  }
  
  if (!/(?=.*[a-z])/.test(password)) {
    errors.push("Password must contain at least one lowercase letter")
  }
  
  if (!/(?=.*[A-Z])/.test(password)) {
    errors.push("Password must contain at least one uppercase letter")
  }
  
  if (!/(?=.*\d)/.test(password)) {
    errors.push("Password must contain at least one number")
  }
  
  if (!/(?=.*[@$!%*?&])/.test(password)) {
    errors.push("Password must contain at least one special character (@$!%*?&)")
  }

  return {
    isValid: errors.length === 0,
    errors
  }
}

export function validateLoginData(data: LoginData): ValidationResult {
  const errors: string[] = []

  if (!data.email) {
    errors.push("Email is required")
  } else if (!validateEmail(data.email)) {
    errors.push("Please enter a valid email address")
  }

  if (!data.password) {
    errors.push("Password is required")
  } else if (data.password.length < 6) {
    errors.push("Password must be at least 6 characters long")
  }

  return {
    isValid: errors.length === 0,
    errors
  }
}

export function validateRegistrationData(data: RegisterData): ValidationResult {
  const errors: string[] = []

  if (!data.name || data.name.trim().length < 2) {
    errors.push("Name must be at least 2 characters long")
  }

  if (!data.email) {
    errors.push("Email is required")
  } else if (!validateEmail(data.email)) {
    errors.push("Please enter a valid email address")
  }

  if (!data.password) {
    errors.push("Password is required")
  } else {
    const passwordValidation = validatePassword(data.password)
    if (!passwordValidation.isValid) {
      errors.push(...passwordValidation.errors)
    }
  }

  if (!data.confirmPassword) {
    errors.push("Password confirmation is required")
  } else if (data.password !== data.confirmPassword) {
    errors.push("Passwords do not match")
  }

  return {
    isValid: errors.length === 0,
    errors
  }
}

export function sanitizeInput(input: string): string {
  return input.trim().replace(/[<>]/g, "")
}

export function validateName(name: string): boolean {
  return name.trim().length >= 2 && name.trim().length <= 50
}