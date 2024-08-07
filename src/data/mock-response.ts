import { User, UsersRequest } from '@/models/user.model'

export const mockUser = {
  id: 1,
  username: 'John Doe',
  email: 'test@test.com',
}

const mockUsers = [
  { id: 1, username: 'john doe', email: 'john.doe@example.com' },
  { id: 2, username: 'jane smith', email: 'jane.smith@example.com' },
  { id: 3, username: 'alice johnson', email: 'alice.johnson@example.com' },
  { id: 4, username: 'bob brown', email: 'bob.brown@example.com' },
  { id: 5, username: 'lisa white', email: 'lisa.white@example.com' },
  { id: 6, username: 'mike jones', email: 'mike.jones@example.com' },
  { id: 7, username: 'carlos davis', email: 'carlos.davis@example.com' },
  { id: 8, username: 'david miller', email: 'david.miller@example.com' },
  { id: 9, username: 'susan wilson', email: 'susan.wilson@example.com' },
  { id: 10, username: 'chris lee', email: 'chris.lee@example.com' },
  { id: 11, username: 'nancy kim', email: 'nancy.kim@example.com' },
  { id: 12, username: 'steve clark', email: 'steve.clark@example.com' },
  { id: 13, username: 'angela brown', email: 'angela.brown@example.com' },
  { id: 14, username: 'tom scott', email: 'tom.scott@example.com' },
  { id: 15, username: 'linda taylor', email: 'linda.taylor@example.com' },
  { id: 16, username: 'paul martinez', email: 'paul.martinez@example.com' },
  { id: 17, username: 'emma johnson', email: 'emma.johnson@example.com' },
  { id: 18, username: 'gregory wilson', email: 'gregory.wilson@example.com' },
  { id: 19, username: 'kate green', email: 'kate.green@example.com' },
  { id: 20, username: 'jason adams', email: 'jason.adams@example.com' },
  { id: 21, username: 'olivia king', email: 'olivia.king@example.com' },
  { id: 22, username: 'matthew young', email: 'matthew.young@example.com' },
  {
    id: 23,
    username: 'isabella mitchell',
    email: 'isabella.mitchell@example.com',
  },
  { id: 24, username: 'noah cooper', email: 'noah.cooper@example.com' },
  { id: 25, username: 'sophia lopez', email: 'sophia.lopez@example.com' },
  { id: 26, username: 'ethan carter', email: 'ethan.carter@example.com' },
  { id: 27, username: 'mia parker', email: 'mia.parker@example.com' },
  {
    id: 28,
    username: 'alexander rodriguez',
    email: 'alexander.rodriguez@example.com',
  },
  { id: 29, username: 'chloe cooper', email: 'chloe.cooper@example.com' },
  { id: 30, username: 'jack thompson', email: 'jack.thompson@example.com' },
]

const filterAndSortUsers = (request: UsersRequest) => {
  let filteredUsers = [...mockUsers]

  // Search
  if (request.search) {
    filteredUsers = filteredUsers.filter(
      (user) =>
        user.username.includes(request.search as string) ||
        user.email.includes(request.search as string)
    )
  }

  // Sorting
  if (request.sorting?.field && request.sorting.order) {
    const sortField = request.sorting.field as keyof User
    const sortOrder = request.sorting.order
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
