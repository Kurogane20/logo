import { useLayoutEffect, useRef } from 'react'
import { SERIAL } from '../data/brand'
import { Lockup, Sym, Wordmark } from './Logo'

// Contoh data di layar mockup. Ini ilustrasi, bukan data operasional.

// Label dan bordir ditempatkan dalam koordinat foto (persen dari lebar/tinggi gambar asli),
// jadi tetap pas berapa pun ukuran mockup di layar.

// Enclosure: box.webp 1500×1500. Sisi depan miring ±24,6° (diukur dari tepi atas -23,5° dan
// bawah -25,9°), sedikit memendek ke samping (sudut pandang ±39° dari depan, ±34° dari atas).
export function Enclosure({ alt }: { alt: string }) {
  return (
    <div className="mock box">
      <img src="/img/box.webp" alt={alt} />
      <div className="plate">
        <Sym />
        <span className="t2"><Wordmark /><span className="parent">PT SUCOFINDO</span><span className="sn num">SN {SERIAL}</span></span>
      </div>
    </div>
  )
}

// Seragam: polo.webp 673×1024, dipotong sampai pinggang supaya dada (dan logonya) tampil lebih besar.
// Logo di dada kiri pemakai, di samping bawah placket, tidak menimpa kancing.
function PoloLayer({ zoom }: { zoom?: boolean }) {
  return (
    <div className={'crop' + (zoom ? ' zin' : '')}>
      <img src="/img/polo.webp" alt={zoom ? '' : 'Dua orang memakai kaos polo dengan logo DIGITIC dibordir di dada kiri'} />
      <div className="chest m"><Sym /><Wordmark /></div>
      {!zoom && <div className="chest f"><Sym /><Wordmark /></div>}
    </div>
  )
}

export function Polo() {
  return (
    <div className="mock polo">
      <PoloLayer />
      {/* Logo di foto berukuran nyata (±8 cm), jadi kecil di layar. Lingkaran ini memperbesar dada kiri pria. */}
      <div className="zoom" aria-hidden="true"><PoloLayer zoom /></div>
      <span className="zcap" aria-hidden="true">Detail bordir</span>
      <svg className="defs" width="0" height="0" aria-hidden="true" focusable="false">
        {/* Bordir: serat benang halus di atas tinta + bayangan tipis karena benang sedikit timbul dari kain. */}
        <filter id="emb" x="-15%" y="-40%" width="130%" height="180%" colorInterpolationFilters="sRGB">
          <feTurbulence type="fractalNoise" baseFrequency="1.6 0.45" numOctaves="2" seed="4" result="n" />
          <feColorMatrix in="n" type="matrix" values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 .7 -.25" result="sheen" />
          <feComposite in="sheen" in2="SourceAlpha" operator="in" result="sheenIn" />
          <feGaussianBlur in="SourceAlpha" stdDeviation=".45" result="blur" />
          <feOffset in="blur" dy=".55" result="off" />
          <feFlood floodColor="#4A3420" floodOpacity=".5" />
          <feComposite in2="off" operator="in" result="shadow" />
          <feMerge result="m"><feMergeNode in="shadow" /><feMergeNode in="SourceGraphic" /><feMergeNode in="sheenIn" /></feMerge>
          {/* sedikit lunak supaya setajam foto, bukan setajam vektor */}
          <feGaussianBlur in="m" stdDeviation=".28" />
        </filter>
      </svg>
    </div>
  )
}

// Status bar iOS: jam di kiri, sinyal/wifi/baterai di kanan, sejajar pulau kamera.
function StatusBar() {
  return (
    <div className="sb" aria-hidden="true">
      <b>9:41</b>
      <span className="ind"><i className="sig"><i /><i /><i /><i /></i><i className="wifi" /><i className="bat"><i /></i></span>
    </div>
  )
}

function AppTop() {
  return (
    <div className="top">
      <span className="lockup"><Sym /><span className="txt"><Wordmark /></span></span>
      <span className="av" />
    </div>
  )
}

function Item({ title, sub, tone, status }: { title: string; sub: string; tone: string; status: string }) {
  return (
    <div className="c2">
      <div className="it"><span className="ic2"><i /></span><span className="x2"><b>{title}</b><span>{sub}</span></span><span className={'st ' + tone}>{status}</span></div>
    </div>
  )
}

// Layar kiri: ringkasan layanan klien.
export function AppHome() {
  return (
    <div className="app">
      <StatusBar />
      <AppTop />
      <div><h5>Selamat pagi</h5><p className="sub">Ringkasan layanan · hari ini</p></div>
      <div className="mini">
        <div className="c2"><div className="r2"><span>Permohonan</span></div><div className="big">3</div></div>
        <div className="c2"><div className="r2"><span>Sertifikat</span></div><div className="big">12</div></div>
      </div>
      <div className="c2">
        <div className="r2"><span>Uji laboratorium</span><span className="live">60%</span></div>
        <b className="nm">Sampel 24-118</b>
        <div className="pg"><i style={{ width: '60%' }} /></div>
        <div className="r2"><span>Diterima</span><span>Pengujian</span><span>Laporan</span></div>
      </div>
      <div className="svc3">
        <span><i />Uji</span><span><i />Inspeksi</span><span><i />Sertifikat</span>
      </div>
      <p className="hd">Terbaru</p>
      <Item title="Sertifikat terbit" sub="No. 7731 · 08.12" tone="c" status="Baru" />
      <div className="tab"><i className="on" /><i /><i /><i /></div>
    </div>
  )
}

// Layar kanan: daftar permohonan.
export function AppList() {
  return (
    <div className="app">
      <StatusBar />
      <AppTop />
      <div><h5>Permohonan saya</h5><p className="sub">4 proses aktif</p></div>
      <div className="search"><i />Cari permohonan</div>
      <div className="seg"><span className="on">Semua</span><span>Berjalan</span><span>Selesai</span></div>
      <Item title="Inspeksi" sub="Gudang Cikarang" tone="b" status="Terjadwal" />
      <Item title="Uji laboratorium" sub="Sampel 24-118" tone="a" status="Berjalan" />
      <Item title="Kalibrasi alat" sub="Lab Surabaya" tone="b" status="Menunggu" />
      <Item title="Sertifikat" sub="No. 7731" tone="c" status="Terbit" />
      <div className="tab"><i /><i className="on" /><i /><i /></div>
    </div>
  )
}

// ---------- laptop ----------
// Layar laptop di foto berbentuk trapesium (kamera dari atas: lebar 692 px di atas, ±655 px di bawah).
// Konten dirender sebagai persegi lalu dipetakan ke empat sudut layar dengan homografi (matrix3d),
// dihitung ulang saat ukuran mockup berubah. Sudut diukur dari piksel laptop.webp (1080×720).
const LAPTOP = { w: 1080, h: 720, quad: [[188, 47], [880, 49], [862, 488], [207, 488]] as [number, number][] }

type M3 = number[]
const adj = (m: M3): M3 => [
  m[4] * m[8] - m[5] * m[7], m[2] * m[7] - m[1] * m[8], m[1] * m[5] - m[2] * m[4],
  m[5] * m[6] - m[3] * m[8], m[0] * m[8] - m[2] * m[6], m[2] * m[3] - m[0] * m[5],
  m[3] * m[7] - m[4] * m[6], m[1] * m[6] - m[0] * m[7], m[0] * m[4] - m[1] * m[3]]
const mul = (a: M3, b: M3): M3 => {
  const c: M3 = []
  for (let i = 0; i < 3; i++) for (let j = 0; j < 3; j++) { let v = 0; for (let k = 0; k < 3; k++) v += a[3 * i + k] * b[3 * k + j]; c[3 * i + j] = v }
  return c
}
const mulv = (m: M3, v: number[]) => [m[0] * v[0] + m[1] * v[1] + m[2] * v[2], m[3] * v[0] + m[4] * v[1] + m[5] * v[2], m[6] * v[0] + m[7] * v[1] + m[8] * v[2]]
const basis = (p: [number, number][]) => {
  const m = [p[0][0], p[1][0], p[2][0], p[0][1], p[1][1], p[2][1], 1, 1, 1]
  const v = mulv(adj(m), [p[3][0], p[3][1], 1])
  return mul(m, [v[0], 0, 0, 0, v[1], 0, 0, 0, v[2]])
}
// kotak w×h (sudut TL, TR, BL, BR) → quad tujuan (TL, TR, BR, BL)
function quadMatrix(w: number, h: number, q: [number, number][]) {
  const src = basis([[0, 0], [w, 0], [0, h], [w, h]])
  const dst = basis([q[0], q[1], q[3], q[2]])
  const t = mul(dst, adj(src)).map((v, _, a) => v / a[8])
  return `matrix3d(${[t[0], t[3], 0, t[6], t[1], t[4], 0, t[7], 0, 0, 1, 0, t[2], t[5], 0, t[8]].join(',')})`
}

export function Laptop({ alt }: { alt: string }) {
  const photo = useRef<HTMLDivElement>(null)
  const scr = useRef<HTMLDivElement>(null)
  useLayoutEffect(() => {
    const el = photo.current, s = scr.current
    if (!el || !s) return
    const fit = () => {
      const k = el.clientWidth / LAPTOP.w
      if (!k) return
      const q = LAPTOP.quad.map(([x, y]) => [x * k, y * k] as [number, number])
      const w = q[1][0] - q[0][0], h = w / 1.54 // rasio layar MacBook Pro 14"
      s.style.width = w + 'px'
      s.style.height = h + 'px'
      s.style.transform = quadMatrix(w, h, q)
    }
    fit()
    const ro = new ResizeObserver(fit)
    ro.observe(el)
    return () => ro.disconnect()
  }, [])
  return (
    <div className="mock lap">
      <div className="photo" ref={photo}>
        <img src="/img/laptop.webp" alt={alt} />
        <div className="screen lp" ref={scr}><Site /><span className="notch" /></div>
      </div>
    </div>
  )
}

export function Site() {
  const feats: [string, string][] = [['Uji laboratorium', 'Hasil uji langsung di dasbor'], ['Inspeksi lapangan', 'Jadwal dan laporan inspektur'], ['Sertifikasi', 'Sertifikat digital tervalidasi'], ['Integrasi', 'Terhubung ke sistem Anda']]
  return (
    <div className="site">
      <nav>
        <Lockup />
        <span className="lk"><span>Solusi</span><span>Layanan</span><span>Proyek</span><span>Tentang</span></span>
        <span className="cta">Hubungi kami</span>
      </nav>
      <div className="hz">
        <div>
          <div className="ebx">SOFTWARE SOLUTION</div>
          <h6>Layanan TIC, sepenuhnya digital.</h6>
          <p>Aplikasi pengujian, inspeksi, dan sertifikasi yang melengkapi sistem Anda.</p>
          <div className="btns"><span className="p">Lihat solusi</span><span className="s">Jadwalkan demo</span></div>
        </div>
        <div className="panel2">
          <div className="r"><span>Modul layanan</span><span>4 aktif</span></div>
          <div className="g">
            <div><b>Testing</b>Uji laboratorium</div><div><b>Inspection</b>Inspeksi lapangan</div>
            <div><b>Certification</b>Sertifikat digital</div><div className="on"><b>Integrasi</b>Terhubung ke sistem Anda</div>
          </div>
          <div className="r"><span>Sampel 24-118</span><span>60%</span></div>
          <div className="bar"><i /></div>
        </div>
      </div>
      <div className="feat">
        {feats.map(([t, d], i) => <div key={t}><i className={i === 3 ? 'on' : ''} /><b>{t}</b><span>{d}</span></div>)}
      </div>
    </div>
  )
}
