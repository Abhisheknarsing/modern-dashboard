import { z } from "zod";

// Enhanced email validation
const emailValidation = z
  .string()
  .min(1, "Email is required")
  .email("Please enter a valid email address")
  .max(254, "Email address is too long")
  .refine((email) => {
    // Additional email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }, "Please enter a valid email address");

// Enhanced password validation with detailed feedback
const passwordValidation = z
  .string()
  .min(1, "Password is required")
  .min(8, "Password must be at least 8 characters long")
  .max(128, "Password is too long")
  .refine((password) => /(?=.*[a-z])/.test(password), {
    message: "Password must contain at least one lowercase letter",
  })
  .refine((password) => /(?=.*[A-Z])/.test(password), {
    message: "Password must contain at least one uppercase letter",
  })
  .refine((password) => /(?=.*\d)/.test(password), {
    message: "Password must contain at least one number",
  })
  .refine((password) => /(?=.*[@$!%*?&])/.test(password), {
    message: "Password must contain at least one special character (@$!%*?&)",
  })
  .refine((password) => !/\s/.test(password), {
    message: "Password cannot contain spaces",
  });

// Login schema with enhanced validation
export const loginSchema = z.object({
  email: emailValidation,
  password: z
    .string()
    .min(1, "Password is required")
    .min(6, "Password must be at least 6 characters long"),
  rememberMe: z.boolean().optional(),
});

// Registration schema with comprehensive validation
export const registerSchema = z
  .object({
    name: z
      .string()
      .min(1, "Name is required")
      .min(2, "Name must be at least 2 characters long")
      .max(50, "Name must be less than 50 characters")
      .regex(/^[a-zA-Z\s'-]+$/, "Name can only contain letters, spaces, hyphens, and apostrophes")
      .refine((name) => name.trim().length >= 2, {
        message: "Name must contain at least 2 non-space characters",
      }),
    email: emailValidation,
    password: passwordValidation,
    confirmPassword: z.string().min(1, "Password confirmation is required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

// Password strength checker
export const checkPasswordStrength = (password: string) => {
  const checks = {
    length: password.length >= 8,
    lowercase: /(?=.*[a-z])/.test(password),
    uppercase: /(?=.*[A-Z])/.test(password),
    number: /(?=.*\d)/.test(password),
    special: /(?=.*[@$!%*?&])/.test(password),
    noSpaces: !/\s/.test(password),
  };

  const score = Object.values(checks).filter(Boolean).length;
  
  let strength: 'weak' | 'fair' | 'good' | 'strong' = 'weak';
  if (score >= 6) strength = 'strong';
  else if (score >= 4) strength = 'good';
  else if (score >= 2) strength = 'fair';

  return {
    score,
    strength,
    checks,
    isValid: score === 6,
  };
};

// Form validation utilities
export const validateField = async (schema: z.ZodSchema, value: unknown) => {
  try {
    await schema.parseAsync(value);
    return { isValid: true, error: null };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { isValid: false, error: error.issues[0]?.message || 'Invalid input' };
    }
    return { isValid: false, error: 'Validation error' };
  }
};

export type LoginFormData = z.infer<typeof loginSchema>;
export type RegisterFormData = z.infer<typeof registerSchema>;
export type PasswordStrength = ReturnType<typeof checkPasswordStrength>;