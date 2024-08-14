import { roleOptions } from '@/data/options'
import { z } from 'zod'

const roles = roleOptions.map((role) => role.value)

const roleSchema = z.enum(roles as [(typeof roles)[number]], {
  errorMap: () => ({ message: 'Role is required' }),
})

export type Role = z.infer<typeof roleSchema>

export const userSchema = z.object({
  username: z
    .string()
    .min(2, {
      message: 'Username must be at least 2 characters.',
    })
    .max(30, {
      message: 'Username must not be longer than 30 characters.',
    }),
  email: z
    .string()
    .min(1, { message: 'Please enter your email' })
    .email({ message: 'Invalid email address' }),
  role: roleSchema,
})

export type UserAddOrUpdateRequest = z.infer<typeof userSchema>
