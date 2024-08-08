import { User, UsersRequest } from '@/models/user.model'
import { UserAddOrUpdateRequest } from '@/validations/user.validation'

export const mockUser = {
  id: 1,
  username: 'John Doe',
  email: 'test@test.com',
  role: 'user',
}

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
const mockUsers = [
  { id: 1, username: 'john doe', email: 'john.doe@example.com', role: 'admin' },
  {
    id: 2,
    username: 'jane smith',
    email: 'jane.smith@example.com',
    role: 'user',
  },
  {
    id: 3,
    username: 'alice johnson',
    email: 'alice.johnson@example.com',
    role: 'moderator',
  },
  {
    id: 4,
    username: 'bob brown',
    email: 'bob.brown@example.com',
    role: 'admin',
  },
  {
    id: 5,
    username: 'lisa white',
    email: 'lisa.white@example.com',
    role: 'user',
  },
  {
    id: 6,
    username: 'mike jones',
    email: 'mike.jones@example.com',
    role: 'guest',
  },
  {
    id: 7,
    username: 'carlos davis',
    email: 'carlos.davis@example.com',
    role: 'moderator',
  },
  {
    id: 8,
    username: 'david miller',
    email: 'david.miller@example.com',
    role: 'user',
  },
  {
    id: 9,
    username: 'susan wilson',
    email: 'susan.wilson@example.com',
    role: 'guest',
  },
  {
    id: 10,
    username: 'chris lee',
    email: 'chris.lee@example.com',
    role: 'admin',
  },
  {
    id: 11,
    username: 'nancy kim',
    email: 'nancy.kim@example.com',
    role: 'user',
  },
  {
    id: 12,
    username: 'steve clark',
    email: 'steve.clark@example.com',
    role: 'moderator',
  },
  {
    id: 13,
    username: 'angela brown',
    email: 'angela.brown@example.com',
    role: 'user',
  },
  {
    id: 14,
    username: 'tom scott',
    email: 'tom.scott@example.com',
    role: 'guest',
  },
  {
    id: 15,
    username: 'linda taylor',
    email: 'linda.taylor@example.com',
    role: 'admin',
  },
  {
    id: 16,
    username: 'paul martinez',
    email: 'paul.martinez@example.com',
    role: 'moderator',
  },
  {
    id: 17,
    username: 'emma johnson',
    email: 'emma.johnson@example.com',
    role: 'user',
  },
  {
    id: 18,
    username: 'gregory wilson',
    email: 'gregory.wilson@example.com',
    role: 'guest',
  },
  {
    id: 19,
    username: 'kate green',
    email: 'kate.green@example.com',
    role: 'user',
  },
  {
    id: 20,
    username: 'jason adams',
    email: 'jason.adams@example.com',
    role: 'admin',
  },
  {
    id: 21,
    username: 'olivia king',
    email: 'olivia.king@example.com',
    role: 'guest',
  },
  {
    id: 22,
    username: 'matthew young',
    email: 'matthew.young@example.com',
    role: 'user',
  },
  {
    id: 23,
    username: 'isabella mitchell',
    email: 'isabella.mitchell@example.com',
    role: 'moderator',
  },
  {
    id: 24,
    username: 'noah cooper',
    email: 'noah.cooper@example.com',
    role: 'guest',
  },
]

const filterAndSortUsers = (request: UsersRequest) => {
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
      if (sortField === 'id') {
        return sortOrder === 'desc' ? b.id - a.id : a.id - b.id
      } else {
        return sortOrder === 'desc'
          ? b[sortField].localeCompare(a[sortField])
          : a[sortField].localeCompare(b[sortField])
      }
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

export const mockUsersResponse = (request: UsersRequest) => ({
  status: 200,
  message: 'Users retrieved successfully',
  data: filterAndSortUsers(request),
})

export const mockUserAddResponse = (data: UserAddOrUpdateRequest) => {
  const nextId = mockUsers.length
    ? Math.max(...mockUsers.map((user) => user.id)) + 1
    : 1
  const newUser = { ...data, id: nextId }
  mockUsers.push(newUser)

  return {
    status: 200,
    message: 'Users retrieved successfully',
    data: newUser,
  }
}

export const mockUserUpdateResponse = (
  id: number,
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

export const mockUserDeleteResponse = (id: number) => {
  const userIndex = mockUsers.findIndex((user) => user.id === id)
  mockUsers.splice(userIndex, 1)
  return {
    status: 200,
    message: 'User deleted successfully',
  }
}
