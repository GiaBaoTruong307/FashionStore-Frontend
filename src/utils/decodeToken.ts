export type TokenPayload = {
  id: number
  role: 'USER' | 'ADMIN'
  iat: number
  exp: number
}

export const decodeToken = (token: string): TokenPayload | null => {
  try {
    const payload = token.split('.')[1]
    const decoded = atob(payload.replace(/-/g, '+').replace(/_/g, '/'))
    return JSON.parse(decoded)
  } catch {
    return null
  }
}
