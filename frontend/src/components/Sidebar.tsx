import React, { useState } from 'react'
import { User, Info, BookOpen, Menu, X, Terminal } from 'lucide-react'

type View = 'PROFILE' | 'ABOUT' | 'GUESTBOOK'

interface Props {
  current: View
  onChange: (v: View) => void
}

const items: { view: View; icon: React.ReactNode; label: string; file: string }[] = [
  { view: 'PROFILE',   icon: <User size={16} />,     label: 'Perfil',    file: 'PERFIL.md'     },
  { view: 'ABOUT',     icon: <Info size={16} />,      label: 'Sobre',     file: 'WHOAMI.exe'    },
  { view: 'GUESTBOOK', icon: <BookOpen size={16} />,  label: 'Presença',  file: 'PRESENÇA.log'  },
]

export function Sidebar({ current, onChange }: Props) {
  const [open, setOpen] = useState(false)

  const nav = (
    <nav className="flex flex-col gap-1">
      {items.map(({ view, icon, label, file }) => {
        const active = current === view
        return (
          <button
            key={view}
            onClick={() => { onChange(view); setOpen(false) }}
            className={`
              w-full text-left flex items-center gap-3 px-4 py-3 font-mono text-xs uppercase font-bold
              border-2 transition-all duration-150
              ${active
                ? 'bg-white text-void-black border-white shadow-[2px_2px_0px_0px_#000]'
                : 'bg-transparent text-gray-300 border-transparent hover:border-acid-green hover:text-acid-green hover:shadow-[2px_2px_0px_0px_#ccff00]'
              }
            `}
          >
            <span className={active ? 'text-void-black' : 'text-acid-green'}>{icon}</span>
            <span className="flex flex-col">
              <span>{label}</span>
              <span className={`text-[9px] normal-case font-normal ${active ? 'text-gray-600' : 'text-gray-600'}`}>
                {file}
              </span>
            </span>
            {active && (
              <span className="ml-auto relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-void-black opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-acid-green" />
              </span>
            )}
          </button>
        )
      })}
    </nav>
  )

  return (
    <>
      {/* Mobile top bar */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-50 bg-void-black border-b-2 border-white flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-2 font-mono text-xs font-bold">
          <Terminal size={14} className="text-acid-green" />
          <span className="text-white">vitinh0z</span>
          <span className="text-acid-green animate-blink">_</span>
        </div>
        <button onClick={() => setOpen(o => !o)} className="text-white">
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile overlay */}
      {open && (
        <div className="md:hidden fixed inset-0 z-40 bg-void-black pt-16 px-4 pb-4 overflow-auto">
          {nav}
        </div>
      )}

      {/* Desktop sidebar */}
      <aside className="hidden md:flex flex-col w-72 min-h-screen border-r-2 border-white bg-void-black flex-shrink-0">
        {/* Header */}
        <div className="border-b-2 border-white p-6">
          <div className="flex items-center gap-2 mb-1 font-mono text-xs text-acid-purple uppercase tracking-widest">
            <Terminal size={12} />
            SYSTEM BOOT
          </div>
          <p className="font-sans font-bold text-2xl text-white uppercase">vitinh0z</p>
          <p className="font-mono text-xs text-gray-500">Portfolio v1.0.0</p>
        </div>

        {/* Nav */}
        <div className="p-4 flex-1">
          {nav}
        </div>

        {/* Footer diagnostics */}
        <div className="border-t border-gray-800 p-4 font-mono text-[10px] text-gray-600 space-y-1">
          <div className="flex justify-between">
            <span>CPU</span>
            <span className="text-acid-green">12%</span>
          </div>
          <div className="flex justify-between">
            <span>STACK</span>
            <span className="text-acid-green">Java/Spring</span>
          </div>
          <div className="flex justify-between">
            <span>STATUS</span>
            <span className="text-acid-green flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-acid-green inline-block animate-pulse" />
              ONLINE
            </span>
          </div>
        </div>
      </aside>
    </>
  )
}
