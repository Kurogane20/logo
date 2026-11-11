import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'

// Tile yang diklik: posisi dan warnanya dipakai untuk animasi "tile membesar jadi intro halaman".
export type Flight = {
  to: string
  rect: { left: number; top: number; width: number; height: number }
  bg: string
  ink: string
  radius: string
  title: string
  h3: { left: number; top: number; fontSize: number }
}

type Ctx = {
  toast: (msg: string) => void
  menuOpen: boolean
  setMenuOpen: (v: boolean) => void
  flight: Flight | null
  setFlight: (f: Flight | null) => void
}

const AppCtx = createContext<Ctx | null>(null)

export function AppProvider({ children }: { children: ReactNode }) {
  const [msg, setMsg] = useState('')
  const [menuOpen, setMenuOpen] = useState(false)
  const [flight, setFlight] = useState<Flight | null>(null)

  useEffect(() => {
    if (!msg) return
    const t = setTimeout(() => setMsg(''), 1600)
    return () => clearTimeout(t)
  }, [msg])

  const value = useMemo(() => ({ toast: setMsg, menuOpen, setMenuOpen, flight, setFlight }), [menuOpen, flight])

  return (
    <AppCtx.Provider value={value}>
      {children}
      <div className={'toast' + (msg ? ' on' : '')} role="status" aria-live="polite">{msg}</div>
    </AppCtx.Provider>
  )
}

export function useApp() {
  const c = useContext(AppCtx)
  if (!c) throw new Error('useApp must be used inside AppProvider')
  return c
}
