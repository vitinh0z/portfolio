import React from 'react'
import { Github, Linkedin, MapPin, Building2, GraduationCap, ExternalLink } from 'lucide-react'

export function ProfileHeader() {
  return (
    <section className="card-brutalist p-8 mb-8 relative overflow-hidden">
      {/* tape accent top */}
      <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-white/20 w-20 h-6 rotate-[-1deg] backdrop-blur-sm z-20" />

      {/* background grid */}
      <div className="absolute inset-0 grid-bg opacity-60 pointer-events-none" />

      <div className="relative z-10 flex flex-col md:flex-row gap-8 items-start">
        {/* Avatar */}
        <div className="flex-shrink-0 relative">
          <div className="w-28 h-28 border-2 border-acid-green overflow-hidden" style={{ boxShadow: '4px 4px 0px 0px #ccff00' }}>
            <img
              src="https://github.com/vitinh0z.png"
              alt="Victor Gabriel"
              className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-300"
            />
          </div>
          {/* status dot */}
          <span className="absolute -bottom-1 -right-1 flex h-4 w-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-acid-green opacity-75" />
            <span className="relative inline-flex rounded-full h-4 w-4 bg-acid-green border-2 border-void-black" />
          </span>
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <p className="font-mono text-xs text-acid-purple uppercase tracking-widest mb-1">
            USER_PROFILE.json
          </p>
          <h1 className="font-sans font-bold text-4xl md:text-5xl text-white uppercase leading-none mb-2 hover:animate-[glitch_0.2s_ease-in-out_infinite] cursor-default">
            Victor Gabriel
          </h1>
          <p className="font-mono text-acid-green text-sm mb-4">@vitinh0z</p>

          <p className="font-mono text-gray-300 text-sm leading-relaxed mb-5 border-l-2 border-acid-purple pl-3 max-w-xl">
            Desenvolvedor backend apaixonado por Java, Spring e arquitetura limpa.
            Construindo sistemas que funcionam de verdade.
          </p>

          <div className="flex flex-wrap gap-4 text-xs font-mono text-gray-400 mb-6">
            <span className="flex items-center gap-1.5">
              <GraduationCap size={13} className="text-acid-green" />
              FATEC Campinas
            </span>
            <span className="flex items-center gap-1.5">
              <Building2 size={13} className="text-acid-green" />
              Okiar Intelligence
            </span>
            <span className="flex items-center gap-1.5">
              <MapPin size={13} className="text-acid-green" />
              Campinas, SP
            </span>
          </div>

          {/* Links */}
          <div className="flex flex-wrap gap-3">
            <a
              href="https://github.com/vitinh0z"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-brutalist flex items-center gap-2"
            >
              <Github size={14} />
              GitHub
              <ExternalLink size={10} />
            </a>
            <a
              href="https://linkedin.com/in/vitinh0z"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-brutalist flex items-center gap-2"
            >
              <Linkedin size={14} />
              LinkedIn
              <ExternalLink size={10} />
            </a>
          </div>
        </div>

        {/* System badge */}
        <div className="hidden md:flex flex-col items-end gap-1 font-mono text-[10px] text-gray-600">
          <span>SYS: ONLINE</span>
          <span>MEM: FULL</span>
          <span>ERR: 0</span>
          <span className="text-acid-green">STATUS: OK</span>
        </div>
      </div>
    </section>
  )
}
