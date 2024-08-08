import { TableState } from '@/hooks/use-table-state'
import { GenericResponse } from './generic'

export type Role = 'admin' | 'user' | 'moderator' | 'guest'

export interface User {
  id: number
  username: string
  email: string
  role: Role
}

export type LoginResponse = GenericResponse<{
  user: User
  tokens: Tokens
}>

export interface Tokens {
  access: Access
  refresh?: Access
}

export interface Access {
  token: string
  expires: Date
}

export type GenerateNewTokenResponse = GenericResponse<Tokens>

export type UserListRequest = TableState<UserListFilter>

export type UserListResponse = GenericResponse<{
  users: User[]
  count: number
}>
export type UserListFilter = {
  role: string[]
  search: string
}

export type UserAddOrUpdateResponse = GenericResponse<User>
export type UserDeletionResponse = Pick<
  GenericResponse<unknown>,
  'status' | 'message'
>
