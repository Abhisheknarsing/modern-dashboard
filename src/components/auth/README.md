# Authentication Components

This directory contains the authentication UI components for the Modern Dashboard application.

## Components

### AuthLayout
A wrapper component that provides consistent styling and layout for authentication pages.

**Props:**
- `children`: React.ReactNode - The form content to display
- `title`: string - The page title
- `description`: string - The page description

**Usage:**
```tsx
<AuthLayout title="Welcome back" description="Sign in to your account">
  <LoginForm onSubmit={handleLogin} />
</AuthLayout>
```

### LoginForm
A complete login form with validation, error handling, and loading states.

**Features:**
- Email and password validation using Zod
- Password visibility toggle
- Remember me checkbox
- Loading states with spinner
- Error handling and display
- Responsive design

**Props:**
- `onSubmit`: (data: LoginData) => Promise<void> - Form submission handler
- `isLoading?`: boolean - Loading state indicator

**Usage:**
```tsx
const handleLogin = async (data: LoginData) => {
  // Handle login logic
};

<LoginForm onSubmit={handleLogin} isLoading={isLoading} />
```

### RegisterForm
A comprehensive registration form with password strength validation.

**Features:**
- Full name, email, and password validation
- Real-time password strength indicator
- Password confirmation matching
- Password visibility toggles for both fields
- Loading states and error handling
- Terms of service and privacy policy links

**Props:**
- `onSubmit`: (data: RegisterData) => Promise<void> - Form submission handler
- `isLoading?`: boolean - Loading state indicator

**Usage:**
```tsx
const handleRegister = async (data: RegisterData) => {
  // Handle registration logic
};

<RegisterForm onSubmit={handleRegister} isLoading={isLoading} />
```

## Validation Schemas

The components use Zod schemas for validation:

### loginSchema
- Email: Required, valid email format
- Password: Required, minimum 6 characters
- RememberMe: Optional boolean

### registerSchema
- Name: Required, 2-50 characters
- Email: Required, valid email format
- Password: Required, minimum 8 characters with:
  - At least one lowercase letter
  - At least one uppercase letter
  - At least one number
  - At least one special character (@$!%*?&)
- ConfirmPassword: Required, must match password

## Password Strength Indicator

The RegisterForm includes a real-time password strength indicator that shows:
- ✅ At least 8 characters
- ✅ One lowercase letter
- ✅ One uppercase letter
- ✅ One number
- ✅ One special character

Requirements are checked in real-time and displayed with visual indicators.

## Error Handling

Both forms include comprehensive error handling:
- Form validation errors (displayed inline)
- Submission errors (displayed at the top of the form)
- Loading states to prevent multiple submissions
- Graceful error recovery

## Styling

Components use:
- Tailwind CSS for styling
- shadcn/ui components for consistency
- Responsive design patterns
- Accessible form elements
- Professional color scheme

## Testing

Test files are located in the `__tests__` directory and cover:
- Component rendering
- Form validation
- User interactions
- Error states
- Loading states

## Demo

Visit `/auth-demo` to see an interactive demonstration of all authentication components.

## Integration

These components are designed to work with:
- NextAuth.js for authentication
- Next.js App Router
- React Hook Form for form handling
- Zod for validation
- TypeScript for type safety