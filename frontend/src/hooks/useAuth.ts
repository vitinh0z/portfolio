import { useState, useEffect, useCallback } from 'react'
import { api, User } from '../services/api'

export function useAuth() {
  const [user, setUser]       = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.me()
      .then(setUser)
      .catch(() => setUser(null))
      .finally(() => setLoading(false))
  }, [])

  const logout = useCallback(async () => {
    await api.logout().catch(() => {})
    setUser(null)
  }, [])

  return { user, loading, loginWithGitHub: api.loginWithGitHub, logout }
}
