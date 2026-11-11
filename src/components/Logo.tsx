import type { CSSProperties } from 'react'

// Geometri simbol diambil langsung dari file SVG resmi.
// `focus` dipakai halaman Anatomi untuk menyorot satu bagian.
export function Sym({ focus, className = '', style }: { focus?: string; className?: string; style?: CSSProperties }) {
  const on = (k: string) => {
    if (!focus) return 'part'
    const hit = k === focus || (focus === 'grid' && k !== 'grid')
    return 'part' + (hit ? ' on' : '')
  }
  return (
    <svg className={'sym ' + className} style={style} viewBox="15 15 70 70" fill="none" aria-hidden="true">
      <g className={on('mods')} stroke="currentColor" strokeWidth="5">
        <rect x="20" y="20" width="26" height="26" rx="7" /><rect x="54" y="20" width="26" height="26" rx="7" /><rect x="20" y="54" width="26" height="26" rx="7" />
      </g>
      <rect className={on('solid') + ' solid'} x="56" y="56" width="26" height="26" rx="6" fill="var(--c-dig)" />
      <rect className={on('grid')} x="17" y="17" width="66" height="66" rx="10" stroke="#7FA8EC" strokeWidth="1.2" strokeDasharray="2 3" opacity={focus === 'grid' ? 1 : 0} />
    </svg>
  )
}

export function Wordmark({ accent }: { accent?: string }) {
  return <span className="wm">DIGI<i style={accent ? { color: accent } : undefined}>TIC</i></span>
}

export function Lockup({ stack, size, style, className = '' }: { stack?: boolean; size?: number | string; style?: CSSProperties; className?: string }) {
  const s: CSSProperties = { ...(size !== undefined ? { fontSize: size } : {}), ...style }
  if (stack) {
    return (
      <span className={'lockup stack ' + className} style={s}>
        <Sym />
        <span className="txt"><span className="wm">DIGI</span><span className="wm"><i>TIC</i></span></span>
      </span>
    )
  }
  return (
    <span className={'lockup ' + className} style={s}>
      <Sym />
      <span className="txt"><Wordmark /><span className="parent">PT SUCOFINDO</span></span>
    </span>
  )
}

// Logo dengan anotasi garis kurung.
export function Annotated() {
  return (
    <div className="ann">
      <div className="br top"><span>Simbol</span></div>
      <div className="br top"><span>Nama dua warna</span></div>
      <div className="sy"><Sym /></div>
      <div className="tx2"><Wordmark /><span className="parent">PT SUCOFINDO</span></div>
      <div className="br bot"><span>Logo lengkap</span></div>
    </div>
  )
}
