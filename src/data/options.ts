import { Roles } from '@/validations/user.validation'

export const paginationOptions = [10, 20, 30, 40, 50]
export const roleOptions: {
  label: string
  value: Roles
}[] = [
  { label: 'Admin', value: Roles.ADMIN },
  { label: 'User', value: Roles.USER },
  { label: 'Moderator', value: Roles.USER },
  { label: 'Guest', value: Roles.GUEST },
] as const
