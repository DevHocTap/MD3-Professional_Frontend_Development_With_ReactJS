export interface User {
  id: number
  name: string
  isActive: boolean
  lastLoginDate?: Date
}

export function filterActiveUsers(users: User[]): User[] {
  return users.filter((user) => user.isActive)
}
