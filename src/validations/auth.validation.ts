import { z } from 'zod'
export const loginSchema = z.object({
  email: z
    .string()
    .min(1, { message: 'Please enter your email' })
    .email({ message: 'Invalid email address' }),
  password: z
    .string()
    .min(1, { message: 'Please enter your password' })
    .min(7, { message: 'Password must be at least 7 characters long' }),
})

export type LoginRequest = z.infer<typeof loginSchema>

export const signupSchema = z
  .object({
    email: z
      .string()
      .min(1, { message: 'Please enter your email' })
      .email({ message: 'Invalid email address' }),
    password: z
      .string()
      .min(1, {
        message: 'Please enter your password',
      })
      .min(7, {
        message: 'Password must be at least 7 characters long',
      }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match.",
    path: ['confirmPassword'],
  })

export type SignupRequest = z.infer<typeof signupSchema>

export const forgotPasswordSchema = z.object({
  email: z
    .string()
    .min(1, { message: 'Please enter your email' })
    .email({ message: 'Invalid email address' }),
})

export type ForgotPasswordRequest = z.infer<typeof forgotPasswordSchema>
