import { test, expect } from '@playwright/test'

test.describe('Authentication Flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('should redirect to login page when not authenticated', async ({ page }) => {
    await page.goto('/dashboard')
    await expect(page).toHaveURL('/login')
  })

  test('should display login form with all required fields', async ({ page }) => {
    await page.goto('/login')
    
    await expect(page.getByLabel(/email/i)).toBeVisible()
    await expect(page.getByLabel(/password/i)).toBeVisible()
    await expect(page.getByRole('button', { name: /sign in/i })).toBeVisible()
  })

  test('should show validation errors for empty form submission', async ({ page }) => {
    await page.goto('/login')
    
    await page.getByRole('button', { name: /sign in/i }).click()
    
    await expect(page.getByText(/email is required/i)).toBeVisible()
    await expect(page.getByText(/password is required/i)).toBeVisible()
  })

  test('should show error for invalid email format', async ({ page }) => {
    await page.goto('/login')
    
    await page.getByLabel(/email/i).fill('invalid-email')
    await page.getByLabel(/password/i).fill('password123')
    await page.getByRole('button', { name: /sign in/i }).click()
    
    await expect(page.getByText(/invalid email format/i)).toBeVisible()
  })

  test('should navigate to register page from login', async ({ page }) => {
    await page.goto('/login')
    
    await page.getByRole('link', { name: /create account/i }).click()
    await expect(page).toHaveURL('/register')
  })

  test('should display register form with all required fields', async ({ page }) => {
    await page.goto('/register')
    
    await expect(page.getByLabel(/full name/i)).toBeVisible()
    await expect(page.getByLabel(/email/i)).toBeVisible()
    await expect(page.getByLabel(/^password$/i)).toBeVisible()
    await expect(page.getByLabel(/confirm password/i)).toBeVisible()
    await expect(page.getByRole('button', { name: /create account/i })).toBeVisible()
  })

  test('should show password strength indicator', async ({ page }) => {
    await page.goto('/register')
    
    await page.getByLabel(/^password$/i).fill('weak')
    await expect(page.getByTestId('password-strength')).toBeVisible()
    
    await page.getByLabel(/^password$/i).fill('StrongPassword123!')
    await expect(page.getByTestId('password-strength')).toHaveClass(/strong/i)
  })

  test('should validate password confirmation match', async ({ page }) => {
    await page.goto('/register')
    
    await page.getByLabel(/full name/i).fill('John Doe')
    await page.getByLabel(/email/i).fill('john@example.com')
    await page.getByLabel(/^password$/i).fill('password123')
    await page.getByLabel(/confirm password/i).fill('different123')
    
    await page.getByRole('button', { name: /create account/i }).click()
    
    await expect(page.getByText(/passwords do not match/i)).toBeVisible()
  })

  test('should successfully login with valid credentials', async ({ page }) => {
    await page.goto('/login')
    
    await page.getByLabel(/email/i).fill('test@example.com')
    await page.getByLabel(/password/i).fill('password123')
    await page.getByRole('button', { name: /sign in/i }).click()
    
    // Should redirect to dashboard after successful login
    await expect(page).toHaveURL('/dashboard')
    await expect(page.getByText(/welcome/i)).toBeVisible()
  })

  test('should logout successfully', async ({ page }) => {
    // First login
    await page.goto('/login')
    await page.getByLabel(/email/i).fill('test@example.com')
    await page.getByLabel(/password/i).fill('password123')
    await page.getByRole('button', { name: /sign in/i }).click()
    
    await expect(page).toHaveURL('/dashboard')
    
    // Then logout
    await page.getByRole('button', { name: /user menu/i }).click()
    await page.getByRole('menuitem', { name: /logout/i }).click()
    
    await expect(page).toHaveURL('/login')
  })
})