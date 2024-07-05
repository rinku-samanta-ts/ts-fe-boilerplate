export interface LoginRequest {
  email: string
  password: string
}

export interface User {
  id: number
  username: string
  email: string
}

export interface LoginResponse {
  success: boolean
  message: string
  token: string
  refreshToken?: string
  user: User
}
