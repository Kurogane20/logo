import { useCallback, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { motion, useMotionValueEvent, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { Sym } from '../components/Logo'
import { Bento, useWide } from '../components/Bento'

const STATEMENT = 'Dari simbol sampai label perangkat, panduan ini menjadi dasar bagaimana DIGITIC terlihat dan dikenali.'
// Kurva "swoop" Dropbox untuk logo yang mengecil ke pojok bingkai.
const SWOOP: [number, number, number, number] = [0.5, 0, 0.05, 1]

// Animasi pembuka hanya sekali per pemuatan halaman, bukan setiap kembali ke beranda.
let introPlayed = false
const prefersReduced = () => typeof window !== 'undefined' && matchMedia('(prefers-reduced-motion: reduce)').matches
const clamp01 = (v: number) => Math.min(1, Math.max(0, v))
const easeInOut = (q: number) => (q < 0.5 ? 4 * q * q * q : 1 - Math.pow(-2 * q + 2, 3) / 2)
const lerp = (a: number, b: number, t: number) => a + (b - a) * t

export default function Home() {
  const reduce = useReducedMotion()
  const wide = useWide()

  // 1) Pembuka: garis grid tergambar, simbol besar digambar lalu terisi (1,5 s), kemudian
  //    meluncur ke pojok kiri bawah bingkai lewat layoutId yang sama.
  const [intro] = useState(() => !introPlayed && !prefersReduced())
  const [phase, setPhase] = useState<'draw' | 'done'>(intro ? 'draw' : 'done')
  useEffect(() => {
    introPlayed = true
    if (phase !== 'draw') return
    const t = setTimeout(() => setPhase('done'), 1500)
    return () => clearTimeout(t)
  }, [phase])

  // 2) Parallax blok warna di samping panel pernyataan.
  const { scrollY } = useScroll()
  const ya = useTransform(scrollY, v => (reduce ? 0 : v * -0.25))
  const yb = useTransform(scrollY, v => (reduce ? 0 : v * 0.2))

  // 3) Panel biru "terbang" mengecil dan mendarat sebagai tile tengah bento.
  //    Rentang: dari panel di tengah layar sampai bento utuh. Posisi dihitung ulang tiap frame scroll
  //    dari letak panel (yang disembunyikan) dan tile tengah, jadi tidak perlu menyimpan offset.
  const panelRef = useRef<HTMLDivElement>(null)
  const flyRef = useRef<HTMLDivElement>(null)
  const flyTextRef = useRef<HTMLParagraphElement>(null)
  const flySymRef = useRef<HTMLDivElement>(null)
  const live = wide && !reduce
  const update = useCallback(() => {
    const panel = panelRef.current, fly = flyRef.current, txt = flyTextRef.current, sym = flySymRef.current
    const hub = document.querySelector<HTMLElement>('.bento.home .hub')
    if (!panel || !fly || !txt || !sym) return
    const reset = () => { fly.style.visibility = 'hidden'; panel.style.visibility = ''; if (hub) hub.style.opacity = '' }
    if (!live || !hub) return reset()
    const A = panel.getBoundingClientRect()
    const B = hub.getBoundingClientRect()
    const bento = (hub.parentElement as HTMLElement).getBoundingClientRect()
    const d0 = A.top + A.height / 2 - innerHeight / 2 // > 0: panel belum sampai tengah layar
    const d1 = bento.bottom - innerHeight // > 0: bento belum utuh terlihat
    const q = d1 - d0 > 0 ? clamp01(-d0 / (d1 - d0)) : 0
    if (q <= 0) { reset(); hub.style.opacity = '0'; return }
    if (q >= 1) { fly.style.visibility = 'hidden'; panel.style.visibility = 'hidden'; hub.style.opacity = ''; return }
    panel.style.visibility = 'hidden'
    hub.style.opacity = '0'
    fly.style.visibility = 'visible'
    const e = easeInOut(q)
    const w = lerp(A.width, B.width, e), h = lerp(A.height, B.height, e)
    fly.style.transform = `translate(${lerp(A.left, B.left, e)}px, ${lerp(A.top, B.top, e)}px)`
    fly.style.width = w + 'px'
    fly.style.height = h + 'px'
    txt.style.width = A.width - 48 + 'px'
    txt.style.transform = `scale(${w / A.width})`
    txt.style.opacity = String(clamp01(1 - q / 0.25))
    const s = lerp(46, 0.44 * Math.min(B.width, B.height), e)
    sym.style.width = sym.style.height = s + 'px'
    sym.style.transform = `translate(${lerp(24, (w - s) / 2, e)}px, ${lerp(h - 24 - s, (h - s) / 2, e)}px)`
  }, [live])
  useMotionValueEvent(scrollY, 'change', update)
  useEffect(() => {
    update()
    addEventListener('resize', update)
    return () => removeEventListener('resize', update)
  }, [update])

  const toGuide = () => document.getElementById('isi')?.scrollIntoView({ block: 'start' })

  return (
    <section className="page home">
      <div className={'bp h-hero' + (phase === 'draw' ? ' drawing' : '')}>
        {phase === 'draw' && (
          <div className="gridin" aria-hidden="true">
            {[1, 2, 3, 4, 5].map(k => <i key={'v' + k} className="v" style={{ left: `calc(${k} * 100% / 6 - 1px)`, animationDelay: k * 70 + 'ms' }} />)}
            {[1, 2, 3, 4].map(k => <i key={'h' + k} className="h" style={{ top: k * 240 - 1, animationDelay: 120 + k * 90 + 'ms' }} />)}
          </div>
        )}
        <div className="frame">
          <motion.h1 initial={intro ? { opacity: 0 } : false} animate={{ opacity: 1 }} transition={{ duration: 1.1, delay: 1.2, ease: 'easeInOut' }}>
            DIGITIC membawa keahlian pengujian, inspeksi, dan sertifikasi PT&nbsp;SUCOFINDO ke solusi software.
          </motion.h1>
          {phase === 'draw' && <motion.div layoutId="hero-sym" className="hs-big"><Sym className="draw" /></motion.div>}
          <div className="ff">
            {phase === 'done'
              ? <motion.div layoutId="hero-sym" className="hs-small" transition={{ duration: 1.25, ease: SWOOP }}><Sym /></motion.div>
              : <span className="hs-small" />}
            <motion.button type="button" className="chevbtn" onClick={toGuide} aria-label="Lihat isi panduan"
              initial={intro ? { opacity: 0 } : false} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 2.4 }}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M5 6l7 6 7-6M5 12l7 6 7-6" /></svg>
            </motion.button>
          </div>
        </div>
      </div>

      <div className="bp h-state">
        <motion.span className="deco a" style={{ y: ya }} />
        <motion.span className="deco b" style={{ y: yb }} />
        <div className="state" ref={panelRef}>
          <p>{STATEMENT}</p>
          <Sym />
        </div>
      </div>

      {/* di body: elemen fixed di dalam pembungkus animasi halaman (yang memakai transform) akan salah posisi */}
      {createPortal(
        <div className="flyer" ref={flyRef} aria-hidden="true">
          <p ref={flyTextRef}>{STATEMENT}</p>
          <div className="fsym" ref={flySymRef}><Sym /></div>
        </div>,
        document.body,
      )}

      <div className="h-bento" id="isi">
        <h2 className="sr-only">Isi panduan</h2>
        <Bento mode="home" />
      </div>
    </section>
  )
}
