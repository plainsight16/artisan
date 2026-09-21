export interface User {
  id: number
  name: string
  email: string
}

export async function fetchUsers(): Promise<User[]> {
  const res = await fetch('/api/users')
  if (!res.ok) throw new Error(`Go Server Error: ${res.statusText}`)
  return res.json()
}

export async function createUser(newUser: { name: string; email: string }): Promise<User> {
  const res = await fetch('/api/users', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newUser),
  })
  if (!res.ok) throw new Error('Failed to create user')
  return res.json()
}