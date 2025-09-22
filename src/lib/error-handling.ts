// Error handling utilities for the dashboard application

export class AppError extends Error {
  public readonly code: string
  public readonly statusCode: number
  public readonly isOperational: boolean

  constructor(
    message: string,
    code: string = 'UNKNOWN_ERROR',
    statusCode: number = 500,
    isOperational: boolean = true
  ) {
    super(message)
    this.name = 'AppError'
    this.code = code
    this.statusCode = statusCode
    this.isOperational = isOperational

    Error.captureStackTrace(this, this.constructor)
  }
}

export class ValidationError extends AppError {
  constructor(message: string, field?: string) {
    super(message, 'VALIDATION_ERROR', 400)
    this.name = 'ValidationError'
    if (field) {
      this.message = `${field}: ${message}`
    }
  }
}

export class AuthenticationError extends AppError {
  constructor(message: string = 'Authentication failed') {
    super(message, 'AUTHENTICATION_ERROR', 401)
    this.name = 'AuthenticationError'
  }
}

export class AuthorizationError extends AppError {
  constructor(message: string = 'Access denied') {
    super(message, 'AUTHORIZATION_ERROR', 403)
    this.name = 'AuthorizationError'
  }
}

export class NetworkError extends AppError {
  constructor(message: string = 'Network request failed') {
    super(message, 'NETWORK_ERROR', 0)
    this.name = 'NetworkError'
  }
}

export class DataError extends AppError {
  constructor(message: string = 'Data processing error') {
    super(message, 'DATA_ERROR', 422)
    this.name = 'DataError'
  }
}

// Error classification utility
export function classifyError(error: unknown): AppError {
  if (error instanceof AppError) {
    return error
  }

  if (error instanceof Error) {
    // Network errors
    if (error.message.includes('fetch') || error.message.includes('network')) {
      return new NetworkError(error.message)
    }

    // Authentication errors
    if (error.message.includes('auth') || error.message.includes('unauthorized')) {
      return new AuthenticationError(error.message)
    }

    // Validation errors
    if (error.message.includes('validation') || error.message.includes('invalid')) {
      return new ValidationError(error.message)
    }

    // Generic error
    return new AppError(error.message, 'GENERIC_ERROR', 500)
  }

  // Unknown error type
  return new AppError('An unknown error occurred', 'UNKNOWN_ERROR', 500)
}

// Error logging utility
export function logError(error: Error, context?: Record<string, unknown>) {
  const errorInfo = {
    name: error.name,
    message: error.message,
    stack: error.stack,
    timestamp: new Date().toISOString(),
    context,
  }

  console.error('Application Error:', errorInfo)

  // In production, send to error tracking service
  if (process.env.NODE_ENV === 'production') {
    // Example: sendToErrorTrackingService(errorInfo)
  }
}

// Async error handler wrapper
export function withErrorHandling<T extends (...args: unknown[]) => Promise<unknown>>(
  fn: T,
  context?: string
): T {
  return (async (...args: Parameters<T>) => {
    try {
      return await fn(...args)
    } catch (error) {
      const classifiedError = classifyError(error)
      logError(classifiedError, { context, args })
      throw classifiedError
    }
  }) as T
}

// React error handler for async operations
export function handleAsyncError(error: unknown, fallbackMessage?: string): string {
  const classifiedError = classifyError(error)
  logError(classifiedError)

  // Return user-friendly message
  switch (classifiedError.code) {
    case 'NETWORK_ERROR':
      return 'Unable to connect to the server. Please check your internet connection.'
    case 'AUTHENTICATION_ERROR':
      return 'Authentication failed. Please sign in again.'
    case 'AUTHORIZATION_ERROR':
      return 'You do not have permission to perform this action.'
    case 'VALIDATION_ERROR':
      return classifiedError.message
    default:
      return fallbackMessage || 'An unexpected error occurred. Please try again.'
  }
}

// Retry utility for failed operations
export async function withRetry<T>(
  operation: () => Promise<T>,
  maxRetries: number = 3,
  delay: number = 1000
): Promise<T> {
  let lastError: Error

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await operation()
    } catch (error) {
      lastError = error instanceof Error ? error : new Error(String(error))
      
      if (attempt === maxRetries) {
        break
      }

      // Don't retry certain types of errors
      const classified = classifyError(error)
      if (classified.code === 'AUTHENTICATION_ERROR' || classified.code === 'AUTHORIZATION_ERROR') {
        break
      }

      // Wait before retrying
      await new Promise(resolve => setTimeout(resolve, delay * attempt))
    }
  }

  throw lastError!
}

// Form error handler
export function getFormErrorMessage(error: unknown): string {
  if (error instanceof ValidationError) {
    return error.message
  }

  const classified = classifyError(error)
  return handleAsyncError(classified)
}

// API error response handler
export function handleApiError(response: Response): never {
  const statusCode = response.status
  
  switch (statusCode) {
    case 400:
      throw new ValidationError('Invalid request data')
    case 401:
      throw new AuthenticationError('Authentication required')
    case 403:
      throw new AuthorizationError('Access forbidden')
    case 404:
      throw new AppError('Resource not found', 'NOT_FOUND', 404)
    case 422:
      throw new DataError('Invalid data provided')
    case 500:
      throw new AppError('Internal server error', 'SERVER_ERROR', 500)
    default:
      throw new AppError(`Request failed with status ${statusCode}`, 'HTTP_ERROR', statusCode)
  }
}