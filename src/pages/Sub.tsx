import { useState, type CSSProperties, type ReactNode } from 'react'
import { useApp } from '../components/AppContext'
import { Annotated, Lockup, Sym, Wordmark } from '../components/Logo'
import { Intro } from '../components/Chrome'
import { AppHome, AppList, Enclosure, Laptop, Polo } from '../components/Mockups'
import { COPY, MOCK, PARTS, TIC } from '../data/brand'

function Row({ tx, vs, stm, vsStyle, style }: { tx: ReactNode; vs: ReactNode; stm?: boolean; vsStyle?: CSSProperties; style?: CSSProperties }) {
  return (
    <div className={'row' + (stm ? ' stm' : '')} style={style}>
      <div className="tx">{tx}</div>
      <div className="vs" style={vsStyle}>{vs}</div>
    </div>
  )
}

function Hex({ hex, name, sub, bg, fg, outline }: { hex: string; name: string; sub?: string; bg: string; fg: string; outline?: boolean }) {
  const { toast } = useApp()
  const copy = () => {
    try { navigator.clipboard.writeText(hex).then(() => toast(hex + ' disalin'), () => toast(hex)) } catch { toast(hex) }
  }
  return (
    <button type="button" className="sw" onClick={copy}>
      <span className="c" style={{ background: bg, color: fg, ...(outline ? { outline: '1px solid #DCE3EB', outlineOffset: -1 } : {}) }}>
        {sub ? <span><b>{name}</b><br /><span>{sub}</span></span> : <b>{name}</b>}
        <span className="hex num">{hex}</span>
      </span>
    </button>
  )
}

// T, I, C sebagai tiga modul bergaris + modul Digital yang terpasang: susunan yang sama dengan simbol.
function TicModules() {
  return (
    <div className="mods4">
      {TIC.map(t => <div key={t[0]} className="md"><b>{t[0]}</b><span><strong>{t[1]}</strong>{t[2]}</span></div>)}
      <div className="md on"><b>D</b><span><strong>Digital</strong>Software DIGITIC</span></div>
    </div>
  )
}

/* ---------------- Tentang ---------------- */
export function Tentang() {
  return (
    <section className="page sp">
      <Intro title={<>Tentang<br />DIGITIC</>} />
      <div className="rows">
        <Row stm tx={<h2>{COPY.stm}</h2>} vs={<Sym className="loop" style={{ width: 110 }} />} />
        <Row tx={<><span className="eb">Bidang</span><h2>Software Solution</h2>
          <p>Aplikasi, platform, dan integrasi sistem untuk layanan pengujian, inspeksi, dan sertifikasi. Tiga keahlian inti PT SUCOFINDO, <b>dilengkapi modul digital</b>, seperti modul biru yang terpasang pada simbol.</p></>}
          vs={<TicModules />} />
        <Row tx={<><span className="eb">Struktur</span><h2>Tiga bagian logo</h2>
          <p>Logo DIGITIC dibangun dari <b>simbol</b> di kiri, <b>nama dua warna</b> di kanan, dan <b>baris PT SUCOFINDO</b> sebagai penanda induk.</p></>}
          vs={<Annotated />} />
        <Row tx={<><span className="eb">Induk</span><h2>Bagian dari PT SUCOFINDO</h2>
          <p>Navy <b className="num">#0B1F3A</b> membawa kepercayaan, integritas, dan stabilitas yang diwarisi dari induk perusahaan. Biru <b className="num">#2A7FFF</b> menandai keahlian TIC sebagai inti DIGITIC.</p></>}
          vsStyle={{ background: '#0B1F3A', '--logo-ink': '#fff' } as CSSProperties}
          vs={<Lockup size="clamp(30px,4vw,52px)" />} />
      </div>
    </section>
  )
}

/* ---------------- Logo ---------------- */
export function LogoPage() {
  const corner = (pos: CSSProperties) => <span className="corner" style={pos}><Sym /></span>
  return (
    <section className="page sp">
      <Intro title="Logo" />
      <div className="rows">
        <Row stm tx={<h2>{COPY.stm}</h2>} vs={<Sym className="loop" style={{ width: 120 }} />} />
        <Row tx={<><span className="eb">Arti nama</span><h2>{COPY.full}</h2><p>{COPY.nameP}</p></>}
          vs={<div className="split">
            <div><span style={{ color: '#0B1F3A' }}>{COPY.w1}</span><span className="lab">{COPY.c1}</span></div>
            <div><span style={{ color: 'var(--accent)' }}>{COPY.w2}</span><span className="lab">{COPY.c2}</span></div>
          </div>} />
        <Row tx={<><span className="pill acc">Versi A</span><h2>Logo lengkap</h2><p>Simbol, nama, dan baris PT SUCOFINDO. Dipakai untuk penerapan utama: dokumen, website, presentasi, dan materi kemitraan.</p></>}
          vs={<Annotated />} />
        <Row tx={<><span className="pill acc">Versi B</span><h2>Simbol dalam bidang</h2><p>Simbol putih di atas bidang biru. Dipakai untuk ikon aplikasi, avatar media sosial, dan ruang yang sempit.</p></>}
          vs={<>
            {corner({ left: 0, top: 0 })}{corner({ right: 0, top: 0 })}{corner({ left: 0, bottom: 0 })}{corner({ right: 0, bottom: 0 })}
            <div style={{ position: 'relative' }}>
              <div className="apptab"><Sym /></div>
              <span className="cal" style={{ left: 'calc(100% + 12px)', top: '46%' }}><i />Bidang</span>
              <span className="cal" style={{ right: 'calc(100% + 12px)', top: '46%', flexDirection: 'row-reverse' }}><i />Simbol</span>
            </div>
          </>} />
        <Row tx={<><span className="eb">Filosofi</span><h2>{COPY.philH}</h2><p>{COPY.philP}</p></>}
          vsStyle={{ background: '#0B1F3A', '--logo-ink': '#fff' } as CSSProperties}
          vs={<Sym className="loop" style={{ width: 'min(56%,280px)' }} />} />
      </div>
    </section>
  )
}

/* ---------------- Anatomi ---------------- */
export function Anatomi() {
  const [sel, setSel] = useState(0)
  return (
    <section className="page sp">
      <Intro title="Anatomi" />
      <div className="rows">
        <Row stm tx={<h2>Setiap bentuk pada simbol punya alasan.</h2>} vs={<Sym style={{ width: 110 }} />} />
        <Row style={{ minHeight: 'min(92vh,780px)' }}
          tx={<><span className="eb">Bagian simbol</span><h2>Pilih satu bagian</h2>
            <div className="parts">
              {PARTS.map((p, k) => (
                <button key={p[0]} type="button" className="pb" aria-pressed={k === sel} onClick={() => setSel(k)}>
                  <span className="n num">0{k + 1}</span><span><h4>{p[1]}</h4><p>{p[2]}</p></span>
                </button>
              ))}
            </div></>}
          vs={<div className="anat-sym focus"><Sym focus={PARTS[sel][0]} /></div>} />
      </div>
    </section>
  )
}

/* ---------------- Warna ---------------- */
export function Warna() {
  return (
    <section className="page sp">
      <Intro title="Warna" />
      <div className="rows">
        <Row stm tx={<h2>Navy sebagai dasar. Biru sebagai inti.</h2>} vsStyle={{ gridAutoFlow: 'column', gap: 0 }}
          vs={<><span style={{ width: 72, height: 96, background: '#0B1F3A' }} /><span style={{ width: 72, height: 96, background: '#2A7FFF' }} /></>} />
        <Row tx={<><span className="eb">Warna logo</span><h2>Dua warna inti</h2><p>Klik warna untuk menyalin kodenya. Keduanya dipakai penuh pada simbol dan wordmark, tidak boleh diubah.</p></>}
          vs={<div className="swl two">
            <Hex hex="#0B1F3A" name="Navy" sub="Warna induk · simbol dan DIGI" bg="#0B1F3A" fg="#fff" />
            <Hex hex="#2A7FFF" name="Biru" sub="Modul terpasang dan TIC" bg="#2A7FFF" fg="#fff" />
          </div>} />
        <Row tx={<><span className="eb">Warna pendukung</span><h2>Untuk teks dan bidang besar</h2><p>Biru gelap untuk teks dan tautan di latar putih, karena biru logo terlalu terang untuk huruf kecil. Tint untuk latar blok dan kartu tanpa bersaing dengan logo.</p></>}
          vs={<div className="tl">
            <Hex hex="#1A5FD1" name="Biru gelap" bg="#1A5FD1" fg="#fff" />
            <Hex hex="#E1ECFE" name="Biru muda" bg="#E1ECFE" fg="#0B1F3A" />
            <Hex hex="#F4F7FA" name="Abu muda" bg="#F4F7FA" fg="#0B1F3A" outline />
            <Hex hex="#FFFFFF" name="Putih" bg="#FFFFFF" fg="#0B1F3A" outline />
          </div>} />
        <Row tx={<><span className="eb">Kombinasi</span><h2>Navy di terang, putih di gelap</h2><p>Versi logo mengikuti latar. Biru selalu tetap.</p></>}
          vs={<div className="pr">
            <div style={{ background: '#fff', '--logo-ink': '#0B1F3A' } as CSSProperties}><Lockup /><small>Navy · latar putih</small></div>
            <div style={{ background: '#0B1F3A', color: '#fff', '--logo-ink': '#fff' } as CSSProperties}><Lockup /><small>Putih · latar navy</small></div>
            <div style={{ background: '#E1ECFE', '--logo-ink': '#0B1F3A' } as CSSProperties}><Lockup /><small>Navy · latar biru muda</small></div>
          </div>} />
      </div>
    </section>
  )
}

/* ---------------- Tipografi ---------------- */
const PRESETS: [string, number, number, number][] = [['Wordmark', 700, 100, 6], ['Display', 800, 82, -3], ['Isi', 400, 100, 0], ['Baris induk', 500, 100, 24]]
export function Tipografi() {
  const [w, setW] = useState(700)
  const [x, setX] = useState(100)
  const [t, setT] = useState(6)
  return (
    <section className="page sp">
      <Intro title="Tipografi" wide art={false} />
      <div className="rows">
        <Row stm tx={<h2>Bricolage Grotesque. Satu keluarga huruf untuk wordmark, judul, dan isi.</h2>}
          vs={<span style={{ fontSize: 110, fontWeight: 700, lineHeight: 1, letterSpacing: '-.03em' }}>Aa</span>} />
        <Row tx={<><span className="eb">Penjelajah huruf</span><h2>Atur sendiri</h2>
          <p>Pengaturan resmi wordmark: Bold 700, lebar 100, jarak huruf 6%.</p>
          <div className="rng"><label htmlFor="r-w">Ketebalan <span className="num">{w}</span></label><input type="range" id="r-w" min={200} max={800} step={10} value={w} onChange={e => setW(+e.target.value)} /></div>
          <div className="rng"><label htmlFor="r-x">Lebar <span className="num">{x}</span></label><input type="range" id="r-x" min={75} max={100} step={1} value={x} onChange={e => setX(+e.target.value)} /></div>
          <div className="rng"><label htmlFor="r-t">Jarak huruf <span className="num">{t}%</span></label><input type="range" id="r-t" min={-4} max={24} step={1} value={t} onChange={e => setT(+e.target.value)} /></div>
          <div className="chips">{PRESETS.map(p => (
            <button key={p[0]} type="button" aria-pressed={p[1] === w && p[2] === x && p[3] === t} onClick={() => { setW(p[1]); setX(p[2]); setT(p[3]) }}>{p[0]}</button>
          ))}</div></>}
          vs={<>
            <div className="tx-out" style={{ fontWeight: w, fontVariationSettings: `'wght' ${w}, 'wdth' ${x}`, letterSpacing: t / 100 + 'em' }}>DIGI<i>TIC</i></div>
            <span className="cal num" style={{ left: 24, bottom: 20 }}>wght {w} · wdth {x} · tracking {t}%</span>
          </>} />
        <Row tx={<><span className="eb">Skala</span><h2>Hierarki huruf</h2><p>Empat tingkat yang dipakai di seluruh materi digital dan cetak.</p></>}
          vsStyle={{ placeItems: 'stretch', alignContent: 'center' }}
          vs={<div className="scale">
            <div className="r"><small>Display<br />800 · lebar 82</small><span style={{ fontSize: 'clamp(34px,4.4vw,60px)', fontWeight: 800, letterSpacing: '-.035em', fontVariationSettings: "'wdth' 82", lineHeight: 1 }}>Layanan TIC, digital</span></div>
            <div className="r"><small>Judul<br />700 · 100</small><span style={{ fontSize: 'clamp(22px,2.4vw,30px)', fontWeight: 700, letterSpacing: '-.02em', lineHeight: 1.1 }}>Permohonan inspeksi dalam satu aplikasi</span></div>
            <div className="r"><small>Isi<br />400 · 16px</small><span style={{ fontSize: 16, color: 'var(--ink-2)' }}>Jadwal inspeksi, hasil uji laboratorium, dan sertifikat dapat dipantau dari satu dasbor.</span></div>
            <div className="r"><small>Baris induk<br />500 · kapital</small><span style={{ fontSize: 14, fontWeight: 500, letterSpacing: '.32em' }}>PT SUCOFINDO</span></div>
          </div>} />
      </div>
    </section>
  )
}

/* ---------------- Variasi ---------------- */
export function Variasi() {
  const [bg, setBg] = useState('')
  const opts: [string, string][] = [['', 'Putih'], ['navy', 'Navy'], ['tint', 'Biru muda']]
  return (
    <section className="page sp">
      <Intro title="Variasi" />
      <div className="rows">
        <Row style={{ minHeight: 'min(96vh,860px)' }}
          tx={<><span className="eb">Susunan</span><h2>Enam susunan logo</h2>
            <p>Pilih susunan sesuai ruang yang tersedia. Ganti latar untuk melihat kapan versi navy dan versi putih dipakai.</p>
            <div className="chips">{opts.map(o => <button key={o[0]} type="button" aria-pressed={bg === o[0]} onClick={() => setBg(o[0])}>{o[1]}</button>)}</div></>}
          vs={<div className={'vg ' + bg}>
            <div className="vc"><div className="show"><Lockup size={20} /></div><small>Horizontal</small></div>
            <div className="vc"><div className="show"><Lockup stack size={22} /></div><small>Bertumpuk</small></div>
            <div className="vc"><div className="show"><Sym style={{ width: 64 }} /></div><small>Simbol · di bawah 25 mm</small></div>
            <div className="vc"><div className="show"><span className="lockup" style={{ fontSize: 24 }}><Wordmark /></span></div><small>Wordmark</small></div>
            <div className="vc"><div className="show"><span className="appicon"><span><Sym /></span></span></div><small>Ikon aplikasi</small></div>
            <div className="vc"><div className="show"><span className="appicon round"><span><Sym /></span></span></div><small>Avatar</small></div>
          </div>} />
      </div>
    </section>
  )
}

/* ---------------- Penggunaan ---------------- */
const WRONG = '#F08A24'
export function Penggunaan() {
  const [guide, setGuide] = useState(true)
  const [mm, setMm] = useState(40)
  const small = mm < 25
  const px = mm * 6.2
  const dd: [string, string, ReactNode, string, string][] = [
    ['ok', '', <Lockup />, 'Navy di latar terang', 'Pemakaian utama.'],
    ['ok', 'dk', <Lockup />, 'Putih di latar gelap', 'Biru tetap.'],
    ['no', '', <span className="lockup" style={{ '--c-dig': WRONG } as CSSProperties}><Sym /><span className="txt"><Wordmark accent={WRONG} /><span className="parent">PT SUCOFINDO</span></span></span>, 'Mengganti warna aksen', 'Biru DIGITIC tidak diganti warna lain.'],
    ['no', '', <Lockup style={{ transform: 'scaleX(1.45)' }} />, 'Mengubah proporsi', 'Jangan diregangkan atau dimampatkan.'],
    ['no', '', <Lockup style={{ filter: 'drop-shadow(4px 6px 3px rgba(0,0,0,.45))' }} />, 'Menambah bayangan', 'Juga gradasi dan efek lain.'],
    ['no', '', <Lockup style={{ '--logo-ink': '#B8C2CF', transform: 'rotate(-12deg)' } as CSSProperties} />, 'Memutar atau memudarkan', 'Logo selalu tegak dan berwarna penuh.'],
  ]
  return (
    <section className="page sp">
      <Intro title={<>Dasar<br />Penggunaan</>} />
      <div className="rows">
        <Row tx={<><span className="eb">Area aman</span><h2>Beri ruang</h2>
          <p>Sisakan ruang kosong di sekeliling logo, minimal <b>x</b>, yaitu separuh tinggi huruf DIGITIC pada logo. Tidak boleh ada teks atau gambar lain di dalamnya.</p>
          <label className="chk"><input type="checkbox" checked={guide} onChange={e => setGuide(e.target.checked)} /> Tampilkan area aman</label></>}
          vs={<div className={'cs-box' + (guide ? '' : ' off')} style={{ '--x': '.36em' } as CSSProperties}>
            <span className="guide" /><Lockup />
            <span className="x" style={{ left: 'calc(-1 * var(--x))', top: 'calc(-1 * var(--x))' }}>x</span>
            <span className="x" style={{ right: 'calc(-1 * var(--x))', bottom: 'calc(-1 * var(--x))' }}>x</span>
          </div>} />
        <Row tx={<><span className="eb">Ukuran minimum</span><h2>25 mm</h2>
          <p>Di bawah lebar 25 mm, wordmark dan baris PT SUCOFINDO tidak lagi terbaca. Gunakan simbol saja.</p>
          <div className="rng"><label htmlFor="mm-r">Lebar logo <span className="num">{mm} mm</span></label><input type="range" id="mm-r" min={10} max={60} step={1} value={mm} onChange={e => setMm(+e.target.value)} /></div>
          <span className={'mmb ' + (small ? 'sm' : 'ok')}>{small ? 'Simbol saja' : 'Logo lengkap'}</span></>}
          vs={<>
            {small ? <span style={{ display: 'block', width: Math.max(px * 0.42, 26) }}><Sym /></span> : <Lockup size={px / 5.6} />}
            <div className="ruler" />
          </>} />
        <Row style={{ minHeight: 0 }} tx={<><span className="eb">Lakukan dan hindari</span><h2>Bentuk dan warna asli</h2><p>Logo hanya boleh dipakai dalam bentuk dan warna aslinya. Garis merah menandai contoh yang salah.</p></>}
          vs={<div className="dd">{dd.map((d, k) => (
            <div key={k} className={'d' + (d[0] === 'no' ? ' bad' : '')}>
              <div className={'v ' + d[1]}>{d[2]}</div>
              <div className="m"><span className={'mk ' + d[0]}>{d[0] === 'ok' ? '✓' : '✕'}</span><span><b>{d[3]}</b><span>{d[4]}</span></span></div>
            </div>
          ))}</div>} />
      </div>
      <div className="drow two">
        <div className="tx"><span className="eb" style={{ color: '#7EB0FF' }}>Perangkat</span><h2>Label di perangkat gateway</h2>
          <p>Bila solusi DIGITIC memakai perangkat, misalnya gateway integrasi, label logo dipasang di sisi depan enclosure pada bidang datar yang paling mudah terlihat.</p>
          <ul>
            <li><span className="mk ok">✓</span><span><b>Versi navy</b> di atas label putih. Enclosure abu muda tidak cukup kontras untuk logo langsung.</span></li>
            <li><span className="mk ok">✓</span><span><b>Logo lengkap</b> bila label minimal 25 mm. Di bawah itu, simbol saja.</span></li>
            <li><span className="mk ok">✓</span><span><b>Nomor seri</b> di bawah logo, di luar area aman.</span></li>
            <li><span className="mk no">✕</span><span><b>Jangan</b> menempel logo di tutup transparan.</span></li>
          </ul>
        </div>
        <div className="stage">
          <Enclosure alt="Enclosure gateway dengan label logo DIGITIC di sisi depan" />
        </div>
      </div>
    </section>
  )
}

/* ---------------- Penerapan ---------------- */
export function Penerapan() {
  const [m, setM] = useState('seragam')
  return (
    <section className="page sp">
      <Intro title="Penerapan" />
      <div className="drow">
        <div className="tx"><span className="eb" style={{ color: '#7EB0FF' }}>Penerapan</span><h2>{MOCK[m][0]}</h2><p>{MOCK[m][1]}</p></div>
        <div className="stage">
          {m === 'seragam' && <Polo />}
          {m === 'aplikasi' && <div className="mock" style={{ background: '#F7F7F9' }}>
            <img src="/img/phones.webp" alt="Dua ponsel menampilkan aplikasi DIGITIC" />
            <div className="screen p1"><div className="island" /><AppHome /></div>
            <div className="screen p2"><div className="island" /><AppList /></div>
          </div>}
          {m === 'website' && <Laptop alt="Laptop menampilkan website DIGITIC" />}
          {m === 'perangkat' && <Enclosure alt="Enclosure gateway dengan label logo DIGITIC" />}
        </div>
        <div className="pick">
          {Object.keys(MOCK).map(k => (
            <button key={k} type="button" aria-pressed={m === k} onClick={() => setM(k)}><span className="pp">{MOCK[k][0].split(' ')[0]}</span></button>
          ))}
        </div>
      </div>
    </section>
  )
}
