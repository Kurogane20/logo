import { useEffect, useRef, useState, type MouseEvent, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from 'framer-motion'
import { useApp } from './AppContext'
import { Sym } from './Logo'

// Posisi awal tiap blok sebelum "menyatu" saat discroll (hanya di beranda, layar lebar).
// Jarak dibuat kecil supaya blok tidak keluar layar atau menimpa bagian lain.
const OFF: [number, number][] = [[-90, -70], [0, -110], [110, -50], [120, -110], [-110, 90], [-50, 100], [0, 0], [60, 110], [120, 90]]

const WIDE = '(min-width: 901px)'

// Ikut berubah saat jendela di-resize atau tablet diputar.
export function useWide() {
  const [wide, setWide] = useState(() => typeof window !== 'undefined' && matchMedia(WIDE).matches)
  useEffect(() => {
    const mq = matchMedia(WIDE)
    const on = () => setWide(mq.matches)
    on()
    mq.addEventListener('change', on)
    return () => mq.removeEventListener('change', on)
  }, [])
  return wide
}

function useTileMotion(i: number, p: MotionValue<number>, live: boolean) {
  const x = useTransform(p, [0, 1], [OFF[i][0], 0])
  const y = useTransform(p, [0, 1], [OFF[i][1], 0])
  const s = useTransform(p, [0, 1], [0.86, 1])
  return live ? { x, y, scale: s } : undefined
}

function Tile({ i, p, live, className, children, to }: {
  i: number; p: MotionValue<number>; live: boolean; className: string; children: ReactNode; to: string
}) {
  const style = useTileMotion(i, p, live)
  const { setFlight } = useApp()
  const reduce = useReducedMotion()
  // Klik biasa: tile membesar menjadi intro halaman tujuan (lihat Flight.tsx), lalu pindah halaman.
  // Ctrl/Cmd/Shift-klik dan reduced motion tetap memakai tautan biasa.
  const onClick = (e: MouseEvent<HTMLAnchorElement>) => {
    if (reduce || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return
    const tile = e.currentTarget.parentElement as HTMLElement
    const h3 = tile.querySelector('h3')
    if (!h3) return
    e.preventDefault()
    const r = tile.getBoundingClientRect(), hr = h3.getBoundingClientRect()
    const ts = getComputedStyle(tile), hs = getComputedStyle(h3)
    setFlight({
      to, title: h3.textContent || '', bg: ts.backgroundColor, ink: hs.color, radius: ts.borderRadius,
      rect: { left: r.left, top: r.top, width: r.width, height: r.height },
      h3: { left: hr.left, top: hr.top, fontSize: parseFloat(hs.fontSize) },
    })
  }
  return (
    <motion.div className={'t ' + className} style={{ ...style, padding: 0 }}>
      <Link to={to} onClick={onClick} className="block h-full w-full" style={{ padding: '18px 20px' }}>{children}</Link>
    </motion.div>
  )
}

// Blok kecil di tengah: simbol (beranda) atau tombol tutup (menu).
function Center({ p, live, menu, onClose }: { p: MotionValue<number>; live: boolean; menu: boolean; onClose: () => void }) {
  const style = useTileMotion(6, p, live)
  if (menu) {
    return (
      <motion.button type="button" className="t t7" style={style} onClick={onClose} aria-label="Tutup menu" title="Tutup menu">
        <span className="x" aria-hidden="true">✕</span><span className="t7l" aria-hidden="true">Tutup menu</span>
      </motion.button>
    )
  }
  return <motion.div className="t t7 hub" style={style} aria-hidden="true"><Sym /></motion.div>
}

export function Bento({ mode }: { mode: 'home' | 'menu' }) {
  const { setMenuOpen } = useApp()
  const ref = useRef<HTMLElement>(null)
  const reduce = useReducedMotion()
  const wide = useWide()
  // Selesai menyatu saat sisi bawah bento sejajar bawah layar, jadi seluruh bento terlihat utuh.
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end end'] })
  const eased = useTransform(scrollYProgress, v => 1 - Math.pow(1 - v, 3))
  const live = mode === 'home' && !reduce && wide
  const menu = mode === 'menu'

  // Urutan di DOM = urutan halaman (dipakai untuk Tab dan tampilan mobile).
  // Posisi di layar lebar diatur lewat kelas t1–t9 di CSS. Tiap ikon punya gerakan hover sendiri (index.css).
  return (
    <nav className={'bento' + (menu ? '' : ' home')} ref={ref} aria-label={menu ? 'Menu panduan' : 'Isi panduan'}>
      <Tile i={0} p={eased} live={live} className="t1" to="/tentang">
        <h3>Tentang DIGITIC</h3>
        <span className="ic l" aria-hidden="true"><svg width="120" height="120" viewBox="0 0 120 120" fill="none" stroke="currentColor" strokeWidth="2">
          <path className="straight dash" d="M20 20 L90 60 L20 100" />
          {/* panah sketsa: tergambar saat hover */}
          <path className="sketch s1" pathLength={1} d="M26 18 C 52 2, 96 10, 78 36 C 68 50, 50 38, 64 30 C 78 24, 94 36, 90 52 M83 47 L90 54 L96 46" />
          <path className="sketch s2" pathLength={1} d="M84 68 C 64 70, 36 80, 24 96 M20 86 L23 97 L33 94" />
          <rect x="12" y="12" width="16" height="16" rx="3" fill="currentColor" /><rect x="82" y="52" width="16" height="16" rx="3" fill="currentColor" /><rect x="12" y="92" width="16" height="16" rx="3" fill="currentColor" />
        </svg></span>
      </Tile>
      <Tile i={1} p={eased} live={live} className="t2" to="/logo">
        <h3>Logo</h3><span className="ic" aria-hidden="true"><span className="bigsym block"><Sym /></span></span>
      </Tile>
      <Tile i={2} p={eased} live={live} className="t3" to="/anatomi">
        <h3>Anatomi</h3>
        <span className="ic" aria-hidden="true"><svg width="132" height="132" viewBox="0 0 132 132" fill="none" stroke="currentColor">
          <path className="guide dash" d="M66 4v124M4 66h124" strokeWidth="1.5" />
          <rect className="mod" x="30" y="30" width="72" height="72" rx="20" strokeWidth="5" />
          <circle className="core" cx="66" cy="66" r="6" fill="currentColor" stroke="none" />
        </svg></span>
      </Tile>
      <Tile i={5} p={eased} live={live} className="t6" to="/warna">
        <h3>Warna</h3>
        <span className="ic" aria-hidden="true"><svg width="150" height="150" viewBox="0 0 150 150"><rect className="sq a" x="10" y="10" width="70" height="70" fill="currentColor" opacity=".35" /><rect className="sq b" x="70" y="70" width="70" height="70" fill="currentColor" /></svg></span>
      </Tile>
      <Tile i={3} p={eased} live={live} className="t4" to="/tipografi">
        <h3>Tipografi</h3><span className="ic" aria-hidden="true"><span className="aa">Aa</span></span>
      </Tile>
      <Tile i={4} p={eased} live={live} className="t5" to="/variasi">
        <h3>Variasi</h3>
        <span className="ic l" aria-hidden="true"><svg width="96" height="96" viewBox="0 0 96 96" fill="currentColor"><rect className="sq a" x="4" y="4" width="40" height="40" rx="10" /><circle className="sq b" cx="72" cy="72" r="20" /><rect className="sq c" x="52" y="4" width="40" height="40" fill="none" stroke="currentColor" strokeWidth="4" /></svg></span>
      </Tile>
      <Center p={eased} live={live} menu={menu} onClose={() => setMenuOpen(false)} />
      <Tile i={8} p={eased} live={live} className="t9" to="/penggunaan">
        <h3>Dasar Penggunaan</h3>
        <span className="ic" aria-hidden="true"><svg width="120" height="120" viewBox="0 0 120 120" fill="none" stroke="currentColor"><rect className="zone dash" x="6" y="6" width="108" height="108" strokeWidth="2" /><rect className="mark" x="34" y="34" width="52" height="52" rx="12" fill="currentColor" stroke="none" /></svg></span>
      </Tile>
      <Tile i={7} p={eased} live={live} className="t8" to="/penerapan">
        <h3>Penerapan</h3>
        <span className="ic" aria-hidden="true"><svg width="190" height="120" viewBox="0 0 190 120" fill="none" stroke="currentColor" strokeWidth="3"><rect x="20" y="10" width="120" height="80" rx="6" /><path d="M6 100h148" /><rect className="phone" x="150" y="30" width="34" height="70" rx="7" fill="var(--tb)" /><rect className="bar b1" x="36" y="26" width="40" height="8" fill="currentColor" stroke="none" /><rect className="bar b2" x="36" y="42" width="64" height="5" fill="currentColor" stroke="none" opacity=".5" /></svg></span>
      </Tile>
    </nav>
  )
}
