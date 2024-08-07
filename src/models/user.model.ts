import { GenericResponse } from './generic'
import { TableState } from '@/hooks/use-table-state'

export interface User {
  id: number
  username: string
  email: string
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

export type UsersRequest = TableState

export type UserResponse = GenericResponse<{
  users: User[]
  count: number
}>
