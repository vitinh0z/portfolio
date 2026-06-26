import React, { useState, useEffect } from 'react'
import { Github, LogOut, UserCheck, Clock } from 'lucide-react'
import { api, Presence } from '../services/api'
import { useAuth } from '../hooks/useAuth'

function timeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime()
  const m = Math.floor(diff / 60000)
  if (m < 1)   return 'agora mesmo'
  if (m < 60)  return `há ${m}min`
  const h = Math.floor(m / 60)
  if (h < 24)  return `há ${h}h`
  const d = Math.floor(h / 24)
  return `há ${d}d`
}

function PresenceCard({ p }: { p: Presence }) {
  return (
    <div className="border border-gray-700 bg-card-bg p-3 hover:border-acid-green transition-colors group flex flex-col items-center text-center gap-2">
      <div className="w-10 h-10 border border-gray-600 group-hover:border-acid-green overflow-hidden transition-colors">
        <img
          src={p.userAvatarUrl}
          alt={p.userName || p.userLogin}
          className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-300"
        />
      </div>
      <div>
        <p className="font-mono text-xs text-white font-bold leading-tight">
          @{p.userLogin}
        </p>
        <p className="font-mono text-[10px] text-gray-500 mt-0.5 flex items-center justify-center gap-1">
          <Clock size={9} />
          {timeAgo(p.createdAt)}
        </p>
      </div>
    </div>
  )
}

function EmptyState() {
  return (
    <div className="col-span-full border border-dashed border-gray-700 p-8 text-center">
      <p className="font-mono text-gray-500 text-sm">
        <span className="text-acid-green">{'>'}</span> Ninguém ainda.
        Seja o primeiro a deixar sua marca.
      </p>
    </div>
  )
}

function LoadingGrid() {
  return (
    <>
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i} className="border border-gray-800 bg-card-bg p-3 flex flex-col items-center gap-2 animate-pulse">
          <div className="w-10 h-10 bg-gray-800" />
          <div className="w-14 h-2 bg-gray-800 rounded" />
          <div className="w-10 h-2 bg-gray-800 rounded" />
        </div>
      ))}
    </>
  )
}

export function GuestbookWall() {
  const { user, loading: authLoading, loginWithGitHub, logout } = useAuth()
  const [presences, setPresences]     = useState<Presence[]>([])
  const [loadingData, setLoadingData] = useState(true)
  const [registering, setRegistering] = useState(false)
  const [registered, setRegistered]   = useState(false)
  const [error, setError]             = useState<string | null>(null)

  useEffect(() => {
    api.presences()
      .then(setPresences)
      .catch(() => setPresences([]))
      .finally(() => setLoadingData(false))
  }, [])

  useEffect(() => {
    if (!user) return
    const alreadyHere = presences.some(p => p.userLogin === user.login)
    setRegistered(alreadyHere)
  }, [user, presences])

  async function handleRegister() {
    setRegistering(true)
    setError(null)
    try {
      const p = await api.registerPresence()
      setPresences(prev => [p, ...prev])
      setRegistered(true)
    } catch {
      setError('Erro ao registrar presença. Tente novamente.')
    } finally {
      setRegistering(false)
    }
  }

  return (
    <section className="card-brutalist p-8 mb-8 relative overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none" />

      <div className="relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
          <div>
            <p className="section-title">PRESENÇA.log</p>
            <h2 className="section-heading">
              Mural de Presença
            </h2>
            <p className="font-mono text-xs text-gray-500 mt-1">
              {presences.length} usuário{presences.length !== 1 ? 's' : ''} passaram por aqui
            </p>
          </div>

          {/* Auth action */}
          <div className="flex flex-col items-start md:items-end gap-2">
            {authLoading ? (
              <div className="font-mono text-xs text-gray-500 animate-pulse">
                VERIFICANDO AUTH...
              </div>
            ) : user ? (
              <div className="flex flex-col items-start md:items-end gap-2">
                <div className="flex items-center gap-2 font-mono text-xs">
                  <img src={user.avatarUrl} alt={user.login} className="w-5 h-5 border border-acid-green" />
                  <span className="text-acid-green font-bold">@{user.login}</span>
                </div>
                {registered ? (
                  <div className="flex items-center gap-1.5 font-mono text-xs text-acid-green border border-acid-green px-2 py-1">
                    <UserCheck size={12} />
                    Você passou por aqui
                  </div>
                ) : (
                  <button
                    onClick={handleRegister}
                    disabled={registering}
                    className="btn-green flex items-center gap-2"
                  >
                    {registering ? (
                      <>
                        <span className="animate-blink">_</span>
                        REGISTRANDO...
                      </>
                    ) : (
                      <>
                        <UserCheck size={13} />
                        Deixar minha marca
                      </>
                    )}
                  </button>
                )}
                <button onClick={logout} className="flex items-center gap-1 font-mono text-[10px] text-gray-500 hover:text-error-red transition-colors">
                  <LogOut size={10} />
                  Sair
                </button>
              </div>
            ) : (
              <button onClick={loginWithGitHub} className="btn-brutalist flex items-center gap-2">
                <Github size={14} />
                Entrar com GitHub
              </button>
            )}
          </div>
        </div>

        {error && (
          <div className="border border-error-red text-error-red font-mono text-xs p-3 mb-4">
            {'>'} {error}
          </div>
        )}

        {/* Grid */}
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2">
          {loadingData ? (
            <LoadingGrid />
          ) : presences.length === 0 ? (
            <EmptyState />
          ) : (
            presences.map(p => <PresenceCard key={p.id} p={p} />)
          )}
        </div>
      </div>
    </section>
  )
}
