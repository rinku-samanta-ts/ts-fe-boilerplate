import { mockUsersResponse } from '@/data/mock-response'
import { apiService } from './api.service'
import { UserResponse, UsersRequest } from '@/models/user.model'

class UserService {
  private api: typeof apiService
  controller: string = 'users'

  constructor() {
    this.api = apiService
  }

  async getAllUsers(body: UsersRequest) {
    return new Promise<UserResponse>((resolve) => {
      setTimeout(() => {
        resolve(mockUsersResponse(body) as UserResponse)
      }, 500)
    })
    return this.api.get<UserResponse>(
      `${this.controller}/all?page=${body.pagination.pageIndex}&perPage=${body.pagination.pageSize}`
    )
  }
}

export const userService = new UserService()
