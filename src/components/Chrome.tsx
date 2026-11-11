import { useEffect, useRef, useState, type ReactNode, type RefObject } from 'react'
import { Link } from 'react-router-dom'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { useApp } from './AppContext'
import { Bento } from './Bento'
import { PAGES } from '../data/brand'

// Rail kiri di sub-halaman: nama halaman, progres scroll, tombol menu.
export function Rail({ name }: { name: string }) {
  const { setMenuOpen } = useApp()
  const [p, setP] = useState(0)
  useEffect(() => {
    const on = () => {
      const d = document.documentElement
      const max = d.scrollHeight - innerHeight
      setP(max > 0 ? scrollY / max : 0)
    }
    on()
    addEventListener('scroll', on, { passive: true })
    addEventListener('resize', on)
    return () => { removeEventListener('scroll', on); removeEventListener('resize', on) }
  }, [])
  return (
    <>
      <aside className="rail" aria-hidden="true">
        <span className="prog" style={{ height: p * 100 + '%' }} />
        <span className="pname">{name}</span>
        <span />
        <span className="info">DIGITIC · PT SUCOFINDO</span>
      </aside>
      <button className="menubtn" type="button" aria-label="Buka menu" onClick={() => setMenuOpen(true)}><span /></button>
    </>
  )
}

export function MenuOverlay() {
  const { menuOpen, setMenuOpen } = useApp()
  useEffect(() => {
    const k = (e: KeyboardEvent) => { if (e.key === 'Escape') setMenuOpen(false) }
    addEventListener('keydown', k)
    return () => removeEventListener('keydown', k)
  }, [setMenuOpen])
  return (
    <div className={'menu' + (menuOpen ? ' open' : '')} aria-hidden={!menuOpen}>
      <Bento mode="menu" />
    </div>
  )
}

// Gambar konstruksi simbol: garis bantu menembus intro, outline modul, dan titik di tiap sudut modul.
// Koordinat = koordinat simbol resmi (viewBox 15..85), garis diperpanjang jauh dan dipotong oleh intro.
// Saat halaman dibuka: garis tumbuh dari pusat simbol, lalu outline tergambar, lalu titik muncul.
// Saat discroll keluar dari intro: garis hilang, outline berubah menjadi logo utuh, lalu mengecil dan memudar.
const MODS: [number, number, number, number][] = [[20, 20, 26, 7], [54, 20, 26, 7], [20, 54, 26, 7], [56, 56, 26, 6]]
function Construct({ target }: { target: RefObject<HTMLElement> }) {
  const reduce = useReducedMotion()
  const { scrollYProgress: p } = useScroll({ target, offset: ['start start', 'end start'] })
  const scale = useTransform(p, [0, 0.7], reduce ? [1, 1] : [1, 0.5])
  const opacity = useTransform(p, [0.6, 0.95], [1, 0])
  const linesOp = useTransform(p, [0, 0.35], [1, 0])
  const outlineOp = useTransform(p, [0.08, 0.38], [1, 0])
  const logoOp = useTransform(p, [0.08, 0.38], [0, 1])
  let n = 0
  const line = (v: number, horiz: boolean, blue: boolean) => {
    const k = n++
    const cls = (horiz ? 'h' : 'v') + (blue ? ' b' : '')
    const style = { animationDelay: k * 55 + 'ms' }
    return horiz
      ? <line key={'h' + v} className={cls} style={style} x1={-600} y1={v} x2={600} y2={v} />
      : <line key={'v' + v} className={cls} style={style} x1={v} y1={-600} x2={v} y2={600} />
  }
  return (
    <motion.svg className="construct" viewBox="15 15 70 70" aria-hidden="true" style={{ scale, opacity }}>
      <motion.g style={{ opacity: linesOp }}>
        {[20, 46, 54, 80].flatMap(v => [line(v, true, false), line(v, false, false)])}
        {[56, 82].flatMap(v => [line(v, true, true), line(v, false, true)])}
      </motion.g>
      <motion.g className="md" style={{ opacity: outlineOp }}>
        {MODS.map(([x, y, sz, r], i) => <rect key={i} className={i === 3 ? 'on' : ''} style={{ animationDelay: 450 + i * 120 + 'ms' }} x={x} y={y} width={sz} height={sz} rx={r} />)}
      </motion.g>
      <motion.g className="logo" style={{ opacity: logoOp }}>
        {MODS.slice(0, 3).map(([x, y, sz, r], i) => <rect key={i} x={x} y={y} width={sz} height={sz} rx={r} />)}
        <rect className="on" x={56} y={56} width={26} height={26} rx={6} />
      </motion.g>
      <motion.g className="nd" style={{ opacity: linesOp }}>
        {MODS.flatMap(([x, y, sz], i) => [[x, y], [x + sz, y], [x, y + sz], [x + sz, y + sz]].map(([cx, cy], j) =>
          <rect key={i + '-' + j} style={{ animationDelay: 1000 + (i * 4 + j) * 30 + 'ms' }} x={cx - 0.8} y={cy - 0.8} width={1.6} height={1.6} rx={0.35} />))}
      </motion.g>
    </motion.svg>
  )
}

export function Intro({ title, wide, art = true }: { title: ReactNode; wide?: boolean; art?: boolean }) {
  const ref = useRef<HTMLDivElement>(null)
  return (
    <div className="intro" ref={ref}>
      <div className="dk">
        {art && <Construct target={ref} />}
        <h1 style={wide ? { fontVariationSettings: "'wdth' 82" } : undefined}>{title}</h1>
        <Link to="/" className="kicker">Panduan identitas <b>DIGITIC</b></Link>
      </div>
    </div>
  )
}

export function Pager({ id }: { id: string }) {
  const i = PAGES.findIndex(p => p[0] === id)
  const prev = i > 0 ? PAGES[i - 1] : ['', 'Beranda']
  const next = i < PAGES.length - 1 ? PAGES[i + 1] : ['', 'Beranda']
  return (
    <nav className="pager" aria-label="Halaman lain">
      <Link to={'/' + prev[0]}><small>Sebelumnya</small><b>{prev[1]}</b></Link>
      <Link to={'/' + next[0]}><small>Berikutnya</small><b>{next[1]}</b></Link>
    </nav>
  )
}

export function Footer() {
  return (
    <footer className="foot">
      <span>DIGITIC · Software Solution</span>
      <span>PT SUCOFINDO · Unit Bisnis Teknologi</span>
      <span>Panduan identitas · draf sayembara logo</span>
    </footer>
  )
}
