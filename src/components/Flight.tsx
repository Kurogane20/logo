import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useLocation, useNavigate } from 'react-router-dom'
import { useApp } from './AppContext'

// Tile yang diklik membesar sampai menutupi bidang intro halaman tujuan (warna berubah ke gelap),
// judulnya terbang ke posisi judul raksasa, lalu halaman berpindah di bawahnya dan lapisan ini memudar.
// Kurva dan durasi mengikuti brand.dropbox.com: 0,6 s cubic-bezier(.65,0,.15,1).

const EASE: [number, number, number, number] = [0.65, 0, 0.15, 1]
// Judul intro dengan pemenggalan baris yang sama seperti di halaman tujuan.
const TITLES: Record<string, string[]> = { '/tentang': ['Tentang', 'DIGITIC'], '/penggunaan': ['Dasar', 'Penggunaan'] }

// Ukuran bidang intro (.intro .dk) dan judulnya, sama dengan aturan di index.css.
function introBox() {
  const vw = innerWidth, vh = innerHeight, mobile = vw <= 900
  const left = (mobile ? 0 : 56) + 8
  const height = mobile ? Math.min(vh * 0.62, 520) : Math.min(vh * 0.86, 760)
  const font = mobile ? Math.min(64, vw * 0.13) : Math.min(168, Math.max(64, vw * 0.11))
  const pad = mobile ? 20 : Math.min(220, Math.max(24, vw * 0.14))
  return { left, top: 8, width: vw - left - 8, height, font, pad }
}

export function TileFlight() {
  const { flight, setFlight, setMenuOpen } = useApp()
  const nav = useNavigate()
  const loc = useLocation()
  const [leaving, setLeaving] = useState(false)

  useEffect(() => { document.body.classList.toggle('from-tile', !!flight) }, [flight])

  // Setelah halaman tujuan tampil (dan sempat naik ke atas), lapisan ini memudar.
  useEffect(() => {
    if (!flight || loc.pathname !== flight.to) return
    const t = setTimeout(() => { setMenuOpen(false); setLeaving(true) }, 520)
    return () => clearTimeout(t)
  }, [loc.pathname, flight, setMenuOpen])

  if (!flight) return null
  const T = introBox()
  const lines = TITLES[flight.to] ?? [flight.title]
  const tx = T.left + T.pad
  const ty = T.top + (T.height - lines.length * T.font * 0.92) / 2
  const r = flight.rect

  return (
    <motion.div className="flight" aria-hidden="true"
      animate={{ opacity: leaving ? 0 : 1 }} transition={{ duration: 0.4, ease: 'easeOut' }}
      onAnimationComplete={() => { if (leaving) { setLeaving(false); setFlight(null) } }}>
      <motion.div className="fbox"
        initial={{ left: r.left, top: r.top, width: r.width, height: r.height, backgroundColor: flight.bg, borderRadius: flight.radius }}
        animate={{ left: T.left, top: T.top, width: T.width, height: T.height, backgroundColor: '#0C1626', borderRadius: '0px' }}
        transition={{ duration: 0.6, ease: EASE }}
        onAnimationComplete={() => nav(flight.to)} />
      <motion.h1 style={{ left: tx, top: ty, fontSize: T.font, transformOrigin: '0 0' }}
        initial={{ x: flight.h3.left - tx, y: flight.h3.top - ty, scale: flight.h3.fontSize / T.font, color: flight.ink }}
        animate={{ x: 0, y: 0, scale: 1, color: '#ffffff' }}
        transition={{ duration: 0.6, ease: EASE }}>
        {lines.map(l => <span key={l}>{l}</span>)}
      </motion.h1>
    </motion.div>
  )
}
