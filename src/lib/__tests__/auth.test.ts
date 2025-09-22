import { describe, it, expect, vi } from 'vitest'
import { hashPassword, verifyPassword } from '../auth'
import bcrypt from 'bcryptjs'

// Mock bcryptjs
vi.mock('bcryptjs', () => ({
  default: {
    hash: vi.fn(),
    compare: vi.fn(),
  },
}))

describe('Auth utilities', () => {
  describe('hashPassword', () => {
    it('should hash password with correct salt rounds', async () => {
      const mockHash = 'hashed_password'
      vi.mocked(bcrypt.hash).mockResolvedValue(mockHash)
      
      const result = await hashPassword('password123')
      
      expect(bcrypt.hash).toHaveBeenCalledWith('password123', 12)
      expect(result).toBe(mockHash)
    })

    it('should throw error if hashing fails', async () => {
      vi.mocked(bcrypt.hash).mockRejectedValue(new Error('Hashing failed'))
      
      await expect(hashPassword('password123')).rejects.toThrow('Hashing failed')
    })
  })

  describe('verifyPassword', () => {
    it('should return true for correct password', async () => {
      vi.mocked(bcrypt.compare).mockResolvedValue(true)
      
      const result = await verifyPassword('password123', 'hashed_password')
      
      expect(bcrypt.compare).toHaveBeenCalledWith('password123', 'hashed_password')
      expect(result).toBe(true)
    })

    it('should return false for incorrect password', async () => {
      vi.mocked(bcrypt.compare).mockResolvedValue(false)
      
      const result = await verifyPassword('wrongpassword', 'hashed_password')
      
      expect(bcrypt.compare).toHaveBeenCalledWith('wrongpassword', 'hashed_password')
      expect(result).toBe(false)
    })

    it('should throw error if verification fails', async () => {
      vi.mocked(bcrypt.compare).mockRejectedValue(new Error('Verification failed'))
      
      await expect(verifyPassword('password123', 'hashed_password')).rejects.toThrow('Verification failed')
    })
  })
})