import {
  GenerateNewTokenResponse,
  LoginResponse,
  User,
} from '@/models/user.model'
import { apiService } from './'
import { SignupRequest, LoginRequest } from '@/validations/auth.validation'

class AuthService {
  private api: typeof apiService
  controller: string = 'auth'

  constructor() {
    this.api = apiService
  }

  async login(body: LoginRequest) {
    return this.api.post<LoginResponse>(`${this.controller}/login`, body)
  }

  async signup(body: SignupRequest) {
    return this.api.post<LoginResponse>(`${this.controller}/signup`, body)
  }

  async getAccessToken(refreshToken: string | null = null) {
    return Promise.resolve({
      data: {
        access: {
          token: 'access-token',
          expires: new Date(),
        },
      },
      message: '',
      status: 200,
    } as GenerateNewTokenResponse)
    return this.api.post<GenerateNewTokenResponse>(
      `${this.controller}/access-token`,
      refreshToken ? { refreshToken } : undefined
    )
  }

  async getUserInfo(): Promise<User> {
    return Promise.resolve({
      id: 1,
      username: 'John Doe',
      email: 'test@test.com',
    } as User)
    return this.api.get<User>(`${this.controller}/me`)
  }
}

export const authService = new AuthService()
