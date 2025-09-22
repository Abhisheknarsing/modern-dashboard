'use client'

import React from 'react'
import { Check, X } from 'lucide-react'
import { checkPasswordStrength, type PasswordStrength } from '@/lib/schemas'
import { cn } from '@/lib/utils'

interface PasswordStrengthProps {
  password: string
  showDetails?: boolean
}

export function PasswordStrengthIndicator({ password, showDetails = true }: PasswordStrengthProps) {
  const strength = checkPasswordStrength(password)

  if (!password) return null

  const getStrengthColor = (strength: PasswordStrength['strength']) => {
    switch (strength) {
      case 'weak': return 'bg-red-500'
      case 'fair': return 'bg-orange-500'
      case 'good': return 'bg-yellow-500'
      case 'strong': return 'bg-green-500'
      default: return 'bg-gray-300'
    }
  }

  const getStrengthText = (strength: PasswordStrength['strength']) => {
    switch (strength) {
      case 'weak': return 'Weak'
      case 'fair': return 'Fair'
      case 'good': return 'Good'
      case 'strong': return 'Strong'
      default: return ''
    }
  }

  const requirements = [
    { key: 'length', label: 'At least 8 characters', met: strength.checks.length },
    { key: 'lowercase', label: 'One lowercase letter', met: strength.checks.lowercase },
    { key: 'uppercase', label: 'One uppercase letter', met: strength.checks.uppercase },
    { key: 'number', label: 'One number', met: strength.checks.number },
    { key: 'special', label: 'One special character (@$!%*?&)', met: strength.checks.special },
    { key: 'noSpaces', label: 'No spaces', met: strength.checks.noSpaces },
  ]

  return (
    <div className="space-y-3">
      {/* Strength Bar */}
      <div className="space-y-1">
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">Password strength</span>
          <span className={cn(
            'text-sm font-medium',
            strength.strength === 'weak' && 'text-red-600',
            strength.strength === 'fair' && 'text-orange-600',
            strength.strength === 'good' && 'text-yellow-600',
            strength.strength === 'strong' && 'text-green-600'
          )}>
            {getStrengthText(strength.strength)}
          </span>
        </div>
        <div className="flex gap-1">
          {[1, 2, 3, 4].map((level) => (
            <div
              key={level}
              className={cn(
                'h-2 flex-1 rounded-full transition-colors',
                level <= (strength.score / 6) * 4
                  ? getStrengthColor(strength.strength)
                  : 'bg-gray-200'
              )}
            />
          ))}
        </div>
      </div>

      {/* Requirements List */}
      {showDetails && (
        <div className="space-y-2">
          <p className="text-sm text-gray-600">Password must contain:</p>
          <div className="grid grid-cols-1 gap-1">
            {requirements.map((req) => (
              <div key={req.key} className="flex items-center gap-2 text-sm">
                {req.met ? (
                  <Check className="h-3 w-3 text-green-500 flex-shrink-0" />
                ) : (
                  <X className="h-3 w-3 text-gray-400 flex-shrink-0" />
                )}
                <span className={cn(
                  req.met ? 'text-green-700' : 'text-gray-500'
                )}>
                  {req.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}