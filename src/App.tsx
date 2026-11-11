import { useEffect } from 'react'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { AnimatePresence, MotionConfig, motion } from 'framer-motion'
import { Footer, MenuOverlay, Pager, Rail } from './components/Chrome'
import { TileFlight } from './components/Flight'
import { useApp } from './components/AppContext'
import Home from './pages/Home'
import { Anatomi, LogoPage, Penerapan, Penggunaan, Tentang, Tipografi, Variasi, Warna } from './pages/Sub'
import { PAGES } from './data/brand'

const VIEWS: Record<string, () => JSX.Element> = {
  tentang: Tentang, logo: LogoPage, anatomi: Anatomi, warna: Warna,
  tipografi: Tipografi, variasi: Variasi, penggunaan: Penggunaan, penerapan: Penerapan,
}

export default function App() {
  const loc = useLocation()
  const { setMenuOpen, flight } = useApp()
  const id = loc.pathname.replace(/^\/+|\/+$/g, '')
  const page = PAGES.find(p => p[0] === id)

  useEffect(() => {
    setMenuOpen(false)
    document.body.classList.toggle('sub', !!page)
    document.title = !page ? 'DIGITIC Brand Guide' : page[1].includes('DIGITIC') ? page[1] : `${page[1]} · DIGITIC`
  }, [loc.pathname, page, setMenuOpen])

  return (
    <MotionConfig reducedMotion="user">
      {page && <Rail name={page[1]} />}
      <MenuOverlay />
      <TileFlight />
      <main>
        {/* Kembali ke atas setelah halaman lama selesai memudar, bukan saat masih terlihat:
            scroll halus di tengah transisi membuat bento beranda ikut "terurai". */}
        <AnimatePresence mode="wait" onExitComplete={() => window.scrollTo({ top: 0, left: 0, behavior: 'instant' })}>
          <motion.div key={loc.pathname} initial={flight ? false : { opacity: 0.4, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.35 }}>
            <Routes location={loc}>
              <Route path="/" element={<Home />} />
              <Route path="/keluarga" element={<Navigate to="/tentang" replace />} />
              {Object.entries(VIEWS).map(([k, C]) => <Route key={k} path={'/' + k} element={<C />} />)}
              <Route path="*" element={<Home />} />
            </Routes>
            {page && <Pager id={page[0]} />}
          </motion.div>
        </AnimatePresence>
      </main>
      <Footer />
    </MotionConfig>
  )
}
