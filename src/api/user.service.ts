import {
  mockUsersResponse,
  mockUserUpdateResponse,
  mockUserAddResponse,
  mockUserDeleteResponse,
} from '@/data/mock-response'
import { apiService } from './api.service'
import {
  UserResponse,
  UsersRequest,
  UserAddOrUpdateResponse,
  UserDeleteResponse,
} from '@/models/user.model'
import { UserAddOrUpdateRequest } from '@/validations/user.validation'

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

  async addUser(user: UserAddOrUpdateRequest) {
    return new Promise<UserAddOrUpdateResponse>((resolve) => {
      setTimeout(() => {
        resolve(mockUserAddResponse(user) as UserAddOrUpdateResponse)
      }, 500)
    })
    // Uncomment this to make the actual API call
    // return this.api.post<UserAddOrUpdateResponse>(`${this.controller}/add`, user)
  }

  async updateUser(id: number, user: UserAddOrUpdateRequest) {
    return new Promise<UserAddOrUpdateResponse>((resolve) => {
      setTimeout(() => {
        resolve(mockUserUpdateResponse(id, user) as UserAddOrUpdateResponse)
      }, 500)
    })
    // Uncomment this to make the actual API call
    // return this.api.put<UserAddOrUpdateResponse>(`${this.controller}/update/${id}`, user)
  }

  async deleteUser(id: number) {
    return new Promise<UserDeleteResponse>((resolve) => {
      setTimeout(() => {
        resolve(mockUserDeleteResponse(id) as UserDeleteResponse)
      }, 500)
    })
    // Uncomment this to make the actual API call
    // return this.api.delete<UserDeleteResponse>(`${this.controller}/${id}`)
  }
}

export const userService = new UserService()
