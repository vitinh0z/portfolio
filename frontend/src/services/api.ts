export interface User {
  login: string
  name: string
  avatarUrl: string
}

export interface Presence {
  id: number
  userLogin: string
  userName: string
  userAvatarUrl: string
  createdAt: string
}

const BASE = '/api'

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE}${path}`, {
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    ...options,
  })
  if (!res.ok) throw new Error(`${res.status} ${res.statusText}`)
  if (res.status === 204) return undefined as T
  return res.json()
}

export const api = {
  me: ()                   => request<User>('/me'),
  logout: ()               => request<void>('/logout', { method: 'POST' }),
  presences: ()            => request<Presence[]>('/presenca'),
  registerPresence: ()     => request<Presence>('/presenca', { method: 'POST' }),
  loginWithGitHub: ()      => { window.location.href = '/oauth2/authorization/github' },
}
