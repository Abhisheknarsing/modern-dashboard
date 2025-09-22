'use client'

import React, { useState, useEffect } from 'react'
import { Check, X, AlertCircle } from 'lucide-react'
import { Input } from './input'
import { Label } from './label'
import { cn } from '@/lib/utils'

interface FormFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string
  error?: string
  success?: boolean
  helperText?: string
  realTimeValidation?: (value: string) => Promise<{ isValid: boolean; error?: string }>
  debounceMs?: number
}

export function FormField({
  label,
  error,
  success,
  helperText,
  realTimeValidation,
  debounceMs = 300,
  className,
  id,
  ...props
}: FormFieldProps) {
  const [isValidating, setIsValidating] = useState(false)
  const [validationError, setValidationError] = useState<string>()
  const [isValid, setIsValid] = useState<boolean>()
  const [value, setValue] = useState(props.value || '')

  const fieldId = id || `field-${label.toLowerCase().replace(/\s+/g, '-')}`

  useEffect(() => {
    if (!realTimeValidation || !value) {
      setValidationError(undefined)
      setIsValid(undefined)
      return
    }

    const timeoutId = setTimeout(async () => {
      setIsValidating(true)
      try {
        const result = await realTimeValidation(value as string)
        setIsValid(result.isValid)
        setValidationError(result.error)
      } catch {
        setIsValid(false)
        setValidationError('Validation error')
      } finally {
        setIsValidating(false)
      }
    }, debounceMs)

    return () => clearTimeout(timeoutId)
  }, [value, realTimeValidation, debounceMs])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
    props.onChange?.(e)
  }

  const displayError = error || validationError
  const displaySuccess = success || (isValid && !error)
  const showValidationIcon = !isValidating && (displaySuccess || displayError)

  return (
    <div className="space-y-2">
      <Label htmlFor={fieldId} className="text-sm font-medium">
        {label}
      </Label>
      <div className="relative">
        <Input
          id={fieldId}
          {...props}
          value={value}
          onChange={handleChange}
          className={cn(
            'pr-10',
            displayError && 'border-red-500 focus-visible:ring-red-500',
            displaySuccess && 'border-green-500 focus-visible:ring-green-500',
            className
          )}
        />
        {showValidationIcon && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            {displaySuccess ? (
              <Check className="h-4 w-4 text-green-500" />
            ) : displayError ? (
              <X className="h-4 w-4 text-red-500" />
            ) : null}
          </div>
        )}
        {isValidating && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500"></div>
          </div>
        )}
      </div>
      {displayError && (
        <div className="flex items-center gap-1 text-sm text-red-600">
          <AlertCircle className="h-3 w-3" />
          <span>{displayError}</span>
        </div>
      )}
      {displaySuccess && !displayError && (
        <div className="flex items-center gap-1 text-sm text-green-600">
          <Check className="h-3 w-3" />
          <span>Looks good!</span>
        </div>
      )}
      {helperText && !displayError && !displaySuccess && (
        <p className="text-sm text-gray-500">{helperText}</p>
      )}
    </div>
  )
}