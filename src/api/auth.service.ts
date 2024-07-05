import { LoginRequest, LoginResponse, User } from '@/models/user.model'
import { apiService } from './'

class AuthService {
  private api: typeof apiService
  controller: string = 'auth'

  constructor() {
    this.api = apiService
  }

  async login(body: LoginRequest): Promise<LoginResponse> {
    return this.api.post<LoginResponse>('/auth/login', body)
  }

  async signup(
    username: string,
    password: string,
    email: string
  ): Promise<LoginResponse> {
    const body = { username, password, email }
    return this.api.post<LoginResponse>(`${this.controller}/signup`, body)
  }

  async getAccessToken(refreshToken: string | null = null): Promise<{
    accessToken: string
  }> {
    return this.api.post<{
      accessToken: string
    }>(
      `${this.controller}/access-token`,
      refreshToken ? { refreshToken } : undefined
    )
  }

  async getUserInfo(): Promise<User> {
    return this.api.get<User>(`${this.controller}/me`)
  }
}

export const authService = new AuthService()
