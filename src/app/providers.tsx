'use client'

import React, { createContext, useContext, useState } from 'react'

const AuthContext = createContext<{
  session: { user: { name: string, email: string } } | null,
  setSession: React.Dispatch<React.SetStateAction<{ user: { name: string, email: string } } | null>>
}>({
  session: null,
  setSession: () => {}
})

export function Providers({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<{ user: { name: string, email: string } } | null>(null)

  return (
    <AuthContext.Provider value={{ session, setSession }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
