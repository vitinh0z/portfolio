import React, { useState } from 'react'
import { Sidebar } from './components/Sidebar'
import { ProfileHeader } from './components/ProfileHeader'
import { AboutSection } from './components/AboutSection'
import { GuestbookWall } from './components/GuestbookWall'

type View = 'PROFILE' | 'ABOUT' | 'GUESTBOOK'

export default function App() {
  const [view, setView] = useState<View>('PROFILE')

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-void-black">
      {/* CRT scanline overlay */}
      <div className="scanline-overlay" />

      <Sidebar current={view} onChange={setView} />

      <main className="flex-1 p-4 md:p-10 pt-16 md:pt-10 overflow-auto grid-bg">
        <div className="max-w-5xl mx-auto">
          {view === 'PROFILE' && (
            <>
              <ProfileHeader />
              <GuestbookWall />
            </>
          )}
          {view === 'ABOUT' && <AboutSection />}
          {view === 'GUESTBOOK' && <GuestbookWall />}
        </div>
      </main>
    </div>
  )
}
