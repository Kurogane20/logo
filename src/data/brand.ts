// Semua teks dan data brand ada di sini supaya mudah diedit tanpa menyentuh komponen.

export const COPY = {
  name: 'DIGITIC',
  stm: 'DIGITIC adalah wajah solusi software PT SUCOFINDO.',
  full: 'Digital + TIC',
  nameP: 'DIGITIC adalah gabungan Digital dan TIC (Testing, Inspection, Certification). Keahlian inti PT SUCOFINDO, kini hadir dalam bentuk digital.',
  w1: 'DIGI', w2: 'TIC',
  c1: 'Navy · fondasi digital yang stabil', c2: 'Biru · keahlian TIC sebagai inti',
  philH: 'Melengkapi bagian yang hilang',
  philP: 'Tiga modul bergaris adalah sistem klien yang sudah berjalan. Modul biru adalah solusi DIGITIC yang baru terpasang, sedikit bergeser seolah baru dimasukkan, sehingga sistem bekerja utuh.',
}

// [id bagian di simbol, judul, penjelasan]
export const PARTS: [string, string, string][] = [
  ['mods', 'Tiga modul bergaris', 'Sistem yang sudah berjalan: proses bisnis, data, dan infrastruktur klien. Garis terbuka menandakan sistem yang transparan dan siap dikembangkan.'],
  ['solid', 'Modul yang dipasang', 'Solusi DIGITIC: komponen software yang melengkapi sistem. Posisinya sedikit bergeser, seolah baru terpasang.'],
  ['grid', 'Susunan grid 2×2', 'Arsitektur yang tertata, modular, dan dapat diskalakan. Tiap modul bisa berdiri sendiri, tapi nilainya paling besar saat saling terhubung.'],
]

// Huruf T, I, C dan modul digital: dipakai di beranda dan halaman Tentang.
export const TIC: [string, string, string][] = [
  ['T', 'Testing', 'Uji laboratorium'],
  ['I', 'Inspection', 'Inspeksi lapangan'],
  ['C', 'Certification', 'Sertifikat'],
]

export const PAGES: [string, string][] = [
  ['tentang', 'Tentang DIGITIC'],
  ['logo', 'Logo'],
  ['anatomi', 'Anatomi'],
  ['warna', 'Warna'],
  ['tipografi', 'Tipografi'],
  ['variasi', 'Variasi'],
  ['penggunaan', 'Dasar Penggunaan'],
  ['penerapan', 'Penerapan'],
]

export const MOCK: Record<string, [string, string]> = {
  seragam: ['Seragam', 'Logo dibordir di dada kiri dengan warna asli: navy dan biru di atas kain terang.'],
  aplikasi: ['Aplikasi seluler', 'Lockup kecil di kepala aplikasi. Biru hanya untuk status, navigasi aktif, dan aksi utama.'],
  website: ['Website', 'Lockup horizontal di navigasi, warna aksen hanya untuk tombol utama dan data penting.'],
  perangkat: ['Perangkat', 'Label putih dengan logo navy dan nomor seri, ditempel di sisi depan enclosure gateway.'],
}

export const SERIAL = 'DGT-GW-0114'
