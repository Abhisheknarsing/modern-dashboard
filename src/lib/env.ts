import { z } from 'zod';

// Environment variable schema for validation
const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  NEXTAUTH_URL: z.string().url(),
  NEXTAUTH_SECRET: z.string().min(32, 'NEXTAUTH_SECRET must be at least 32 characters'),
  DATABASE_URL: z.string().min(1, 'DATABASE_URL is required'),
  
  // Optional environment variables
  ANALYTICS_ID: z.string().optional(),
  SENTRY_DSN: z.string().url().optional(),
  EMAIL_SERVER_HOST: z.string().optional(),
  EMAIL_SERVER_PORT: z.string().transform(Number).optional(),
  EMAIL_SERVER_USER: z.string().email().optional(),
  EMAIL_SERVER_PASSWORD: z.string().optional(),
  EMAIL_FROM: z.string().email().optional(),
  REDIS_URL: z.string().url().optional(),
  CDN_URL: z.string().url().optional(),
  
  // Feature flags
  FEATURE_ANALYTICS: z.string().transform(val => val === 'true').optional(),
  FEATURE_NOTIFICATIONS: z.string().transform(val => val === 'true').optional(),
  FEATURE_EXPORT: z.string().transform(val => val === 'true').optional(),
  
  // Upload configuration
  UPLOAD_MAX_SIZE: z.string().transform(Number).optional(),
  UPLOAD_ALLOWED_TYPES: z.string().optional(),
});

// Validate environment variables
function validateEnv() {
  try {
    return envSchema.parse(process.env);
  } catch (error) {
    if (error instanceof z.ZodError) {
      const missingVars = error.issues.map((err: z.ZodIssue) => `${err.path.join('.')}: ${err.message}`);
      throw new Error(`Invalid environment variables:\n${missingVars.join('\n')}`);
    }
    throw error;
  }
}

// Export validated environment variables
export const env = validateEnv();

// Helper functions for feature flags
export const isFeatureEnabled = (feature: keyof typeof env) => {
  return Boolean(env[feature]);
};

// Production environment check
export const isProduction = env.NODE_ENV === 'production';
export const isDevelopment = env.NODE_ENV === 'development';
export const isTest = env.NODE_ENV === 'test';

// Database configuration helpers
export const getDatabaseConfig = () => ({
  url: env.DATABASE_URL,
  ssl: isProduction ? { rejectUnauthorized: false } : false,
});

// Email configuration helpers
export const getEmailConfig = () => ({
  host: env.EMAIL_SERVER_HOST,
  port: env.EMAIL_SERVER_PORT || 587,
  auth: env.EMAIL_SERVER_USER && env.EMAIL_SERVER_PASSWORD ? {
    user: env.EMAIL_SERVER_USER,
    pass: env.EMAIL_SERVER_PASSWORD,
  } : undefined,
  from: env.EMAIL_FROM,
});

// Upload configuration helpers
export const getUploadConfig = () => ({
  maxSize: env.UPLOAD_MAX_SIZE || 10 * 1024 * 1024, // 10MB default
  allowedTypes: env.UPLOAD_ALLOWED_TYPES?.split(',') || ['image/jpeg', 'image/png', 'image/webp'],
});