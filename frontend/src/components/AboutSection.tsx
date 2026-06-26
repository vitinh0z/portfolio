import React from 'react'
import { Code2, Database, Server, Globe, Layers, Terminal } from 'lucide-react'

const stack = [
  { icon: <Server size={16} />,   label: 'Java 17+',         level: 'SENIOR',   color: 'text-orange-400' },
  { icon: <Layers size={16} />,   label: 'Spring Boot',      level: 'SENIOR',   color: 'text-green-400' },
  { icon: <Database size={16} />, label: 'PostgreSQL',        level: 'MID',      color: 'text-blue-400' },
  { icon: <Globe size={16} />,    label: 'React',             level: 'MID',      color: 'text-cyan-400' },
  { icon: <Code2 size={16} />,    label: 'TypeScript',        level: 'MID',      color: 'text-blue-300' },
  { icon: <Terminal size={16} />, label: 'Docker',            level: 'MID',      color: 'text-sky-400' },
  { icon: <Database size={16} />, label: 'Hibernate / JPA',  level: 'MID',      color: 'text-yellow-400' },
  { icon: <Server size={16} />,   label: 'REST APIs',         level: 'SENIOR',   color: 'text-acid-green' },
]

const levelColor: Record<string, string> = {
  SENIOR: 'bg-acid-green text-void-black',
  MID:    'bg-white text-void-black',
  JR:     'bg-gray-600 text-white',
}

export function AboutSection() {
  return (
    <section className="card-brutalist p-8 mb-8 relative overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-40 pointer-events-none" />

      <div className="relative z-10">
        <p className="section-title">WHOAMI.exe</p>
        <h2 className="section-heading mb-6">Sobre</h2>

        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <div>
            <p className="font-mono text-sm text-gray-300 leading-relaxed border-l-2 border-acid-purple pl-4 mb-4">
              Estudante de Análise e Desenvolvimento de Sistemas na{' '}
              <span className="text-white font-bold">FATEC Campinas</span>, com foco em
              desenvolvimento backend e arquitetura de software.
            </p>
            <p className="font-mono text-sm text-gray-300 leading-relaxed border-l-2 border-acid-green pl-4">
              Atualmente trabalhando na{' '}
              <span className="text-white font-bold">Okiar Intelligence</span>, construindo
              soluções robustas com Java, Spring Boot e integrações de IA.
            </p>
          </div>

          <div className="font-mono text-xs space-y-2">
            {[
              { key: 'INSTITUIÇÃO', val: 'FATEC Campinas' },
              { key: 'EMPRESA',     val: 'Okiar Intelligence' },
              { key: 'FOCO',        val: 'Backend / APIs / Clean Arch' },
              { key: 'STATUS',      val: 'Disponível para desafios' },
            ].map(({ key, val }) => (
              <div key={key} className="flex gap-3 border-b border-dashed border-gray-800 pb-1.5">
                <span className="text-acid-purple w-24 flex-shrink-0">{key}:</span>
                <span className="text-gray-200">{val}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Stack */}
        <div className="border-t-2 border-white pt-6">
          <p className="font-mono text-xs text-acid-purple uppercase tracking-widest mb-4">
            TECH_STACK.json
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {stack.map(({ icon, label, level, color }) => (
              <div
                key={label}
                className="border border-gray-700 p-3 bg-card-bg hover:border-acid-green transition-colors cursor-default group"
              >
                <div className={`mb-2 ${color} group-hover:text-acid-green transition-colors`}>
                  {icon}
                </div>
                <p className="font-mono text-xs text-white font-bold mb-1">{label}</p>
                <span className={`text-[9px] font-black px-1.5 py-0.5 font-mono ${levelColor[level]}`}>
                  {level}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
