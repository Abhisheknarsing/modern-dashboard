import { describe, it, expect } from 'vitest'
import { validateEmail, validatePassword, formatNumber, formatPercentage } from '../validation'

describe('Validation utilities', () => {
  describe('validateEmail', () => {
    it('should return true for valid email addresses', () => {
      const validEmails = [
        'test@example.com',
        'user.name@domain.co.uk',
        'user+tag@example.org',
        'user123@test-domain.com',
      ]
      
      validEmails.forEach(email => {
        expect(validateEmail(email)).toBe(true)
      })
    })

    it('should return false for invalid email addresses', () => {
      const invalidEmails = [
        'invalid-email',
        '@example.com',
        'user@',
        'user..name@example.com',
        'user@.com',
        '',
      ]
      
      invalidEmails.forEach(email => {
        expect(validateEmail(email)).toBe(false)
      })
    })
  })

  describe('validatePassword', () => {
    it('should return true for strong passwords', () => {
      const strongPasswords = [
        'Password123!',
        'MyStr0ngP@ssw0rd',
        'C0mpl3x!P@ssw0rd',
      ]
      
      strongPasswords.forEach(password => {
        expect(validatePassword(password)).toBe(true)
      })
    })

    it('should return false for weak passwords', () => {
      const weakPasswords = [
        'weak',
        'password',
        '12345678',
        'PASSWORD',
        'Pass123', // too short
      ]
      
      weakPasswords.forEach(password => {
        expect(validatePassword(password)).toBe(false)
      })
    })
  })

  describe('formatNumber', () => {
    it('should format numbers with K suffix', () => {
      expect(formatNumber(1500)).toBe('1.5K')
      expect(formatNumber(12000)).toBe('12K')
      expect(formatNumber(999)).toBe('999')
    })

    it('should format numbers with M suffix', () => {
      expect(formatNumber(1500000)).toBe('1.5M')
      expect(formatNumber(12000000)).toBe('12M')
    })

    it('should format numbers with B suffix', () => {
      expect(formatNumber(1500000000)).toBe('1.5B')
      expect(formatNumber(12000000000)).toBe('12B')
    })

    it('should handle zero and negative numbers', () => {
      expect(formatNumber(0)).toBe('0')
      expect(formatNumber(-1500)).toBe('-1.5K')
    })
  })

  describe('formatPercentage', () => {
    it('should format positive percentages', () => {
      expect(formatPercentage(12.5)).toBe('+12.5%')
      expect(formatPercentage(0.1)).toBe('+0.1%')
    })

    it('should format negative percentages', () => {
      expect(formatPercentage(-8.2)).toBe('-8.2%')
      expect(formatPercentage(-0.5)).toBe('-0.5%')
    })

    it('should format zero percentage', () => {
      expect(formatPercentage(0)).toBe('0.0%')
    })

    it('should round to specified decimal places', () => {
      expect(formatPercentage(12.567, 1)).toBe('+12.6%')
      expect(formatPercentage(-8.234, 0)).toBe('-8%')
    })
  })
})