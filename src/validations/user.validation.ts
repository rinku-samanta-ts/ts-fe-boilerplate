import { z } from 'zod'

export enum Roles {
  ADMIN = 'admin',
  USER = 'user',
  MODERATOR = 'moderator',
  GUEST = 'guest',
}

const roleSchema = z.nativeEnum(Roles, {
  errorMap: () => ({ message: 'Role is required' }),
})

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
