import { User, UserListRequest } from '@/models/user.model'
import {
  UserAddOrUpdateRequest,
  userSchema,
} from '@/validations/user.validation'
import { generateMock } from '@anatine/zod-mock'
import { faker } from '@faker-js/faker'
import { z } from 'zod'

export const generateMockUser = () =>
  generateMock(
    userSchema.extend({
      id: z.string().uuid(),
    })
  )

const generateMockUsers = () => {
  const users = []
  for (let i = 0; i < 23; i++) {
    users.push(generateMockUser())
  }
  return users
}

export const mockUser = generateMockUser()

export const mockGenerateNewTokenResponse = {
  data: {
    access: {
      token: 'access-token',
      expires: new Date(),
    },
  },
  message: '',
  status: 200,
}
export const mockLoginResponse = {
  data: {
    user: mockUser,
    tokens: {
      access: mockGenerateNewTokenResponse.data.access,
      refresh: mockGenerateNewTokenResponse.data.access,
    },
  },
  message: 'Login successful',
  status: 200,
}

const mockUsers: User[] = generateMockUsers()

const filterAndSortUsers = (request: UserListRequest) => {
  let filteredUsers = [...mockUsers]
  const { sorting, filter } = request

  // Search
  if (filter?.search) {
    filteredUsers = filteredUsers.filter(
      (user) =>
        user.username.toLowerCase().includes(filter?.search.toLowerCase()) ||
        user.email.toLowerCase().includes(filter?.search.toLowerCase())
    )
  }

  // Role Filter
  if (filter?.role && filter.role.length > 0) {
    filteredUsers = filteredUsers.filter((user) =>
      filter.role.includes(user.role)
    )
  }

  // Sorting
  if (sorting?.field && sorting.order) {
    const sortField =
      sorting.field === 'name' ? 'username' : (sorting.field as keyof User)

    const sortOrder = sorting.order
    filteredUsers.sort((a, b) => {
      return sortOrder === 'desc'
        ? b[sortField].localeCompare(a[sortField])
        : a[sortField].localeCompare(b[sortField])
    })
  }

  // Pagination
  const start = request.pagination.pageIndex * request.pagination.pageSize
  const end = start + request.pagination.pageSize
  const paginatedUsers = filteredUsers.slice(start, end)

  return {
    users: paginatedUsers,
    count: filteredUsers.length,
  }
}

export const mockUsersResponse = (request: UserListRequest) => ({
  status: 200,
  message: 'Users retrieved successfully',
  data: filterAndSortUsers(request),
})

export const mockUserAddResponse = (data: UserAddOrUpdateRequest) => {
  const newUser = { ...data, id: faker.string.uuid() }
  mockUsers.push(newUser)

  return {
    status: 200,
    message: 'Users retrieved successfully',
    data: newUser,
  }
}

export const mockUserUpdateResponse = (
  id: string,
  data: UserAddOrUpdateRequest
) => {
  // Find the user to update
  const userIndex = mockUsers.findIndex((user) => user.id === id)

  mockUsers[userIndex] = { ...mockUsers[userIndex], ...data }

  return {
    status: 200,
    message: 'User updated successfully',
    data: mockUsers[userIndex],
  }
}

export const mockUserDeletionResponse = (id: string) => {
  const userIndex = mockUsers.findIndex((user) => user.id === id)
  mockUsers.splice(userIndex, 1)
  return {
    status: 200,
    message: 'User deleted successfully',
  }
}
