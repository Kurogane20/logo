# DIGITIC Brand Guide

Panduan identitas interaktif untuk DIGITIC (Software Solution), PT SUCOFINDO Unit Bisnis Teknologi. Draf untuk sayembara logo.

## Menjalankan

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # hasil di dist/
```

## Deploy ke Vercel

Import repo ini di vercel.com (Add New → Project). Vercel mendeteksi Vite otomatis:
build `npm run build`, output `dist`. `vercel.json` mengarahkan semua alamat ke `index.html`
supaya URL seperti `/logo` dan `/warna` bisa dibuka langsung. Alamat lama `/keluarga` diarahkan ke `/tentang`.

## Struktur

| Lokasi | Isi |
|---|---|
| `src/data/brand.ts` | Semua teks, bagian simbol, huruf T·I·C, daftar halaman, keterangan mockup |
| `src/components/Logo.tsx` | Simbol (geometri dari SVG resmi), wordmark, lockup, logo beranotasi |
| `src/components/AppContext.tsx` | Status menu dan notifikasi singkat (toast) |
| `src/components/Bento.tsx` | Grid blok warna di beranda dan menu (animasi Framer Motion) |
| `src/components/Chrome.tsx` | Rail kiri, menu, intro halaman, pager, footer |
| `src/components/Mockups.tsx` | Isi layar HP, website di laptop, label perangkat, bordir di kaos |
| `src/pages/` | Beranda dan 8 sub-halaman |
| `src/index.css` | Gaya visual (Tailwind + CSS brand) |
| `public/img/` | Foto mockup |

## Catatan

- Warna logo: navy `#0B1F3A` dan biru `#2A7FFF`. Biru gelap `#1A5FD1` untuk teks dan tautan.
- Huruf: Bricolage Grotesque (Google Fonts).
- Data di layar mockup (permohonan, sampel, nomor seri) adalah contoh ilustrasi.
- Foto HP dan kaos berasal dari sumber pihak ketiga; ganti dengan foto berlisensi bebas bila halaman dipublikasikan luas.
