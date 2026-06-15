# Prime Trading Institute — Landing Page Premium

Website landing page premium untuk akademi edukasi trading berbasis disiplin, manajemen risiko, dan pengembangan pola pikir trader.

---

## ✅ Fitur yang Sudah Diimplementasikan

- **Header Sticky** — Transparan saat di atas, gelap saat di-scroll, dengan logo dan navigasi lengkap
- **Mobile Hamburger Menu** — Slide-in navigation panel untuk perangkat mobile
- **Hero Section** — Judul, subjudul, CTA, ilustrasi candlestick SVG original, trust badge
- **Statistik Demonstrasi** — Counter animasi, dilengkapi disclaimer ilustrasi
- **Program Pembelajaran** — 5 kartu program + CTA card (grid responsif)
- **Timeline Cara Belajar** — 4 langkah dengan animasi hover interaktif
- **Testimoni** — 3 testimoni original tanpa klaim profit, dengan featured card
- **FAQ Accordion** — 5 pertanyaan umum, dapat buka/tutup satu per satu
- **Section Kontak** — Satu-satunya tempat info kontak, nomor WA sebagai master
- **Footer** — Logo, tagline, navigasi, info kontak, copyright
- **Back to Top Button** — Muncul setelah scroll 400px
- **Scroll Animations** — Fade-up dengan stagger delay untuk setiap card
- **Active Nav Highlight** — Link navigasi berubah warna sesuai section yang terlihat
- **WhatsApp Dynamic** — Semua tombol WA menggunakan 1 sumber konfigurasi di `js/main.js`
- **Responsive** — Mendukung desktop, tablet, dan mobile

---

## 📁 Struktur File

```
index.html          ← Halaman utama (semua section)
css/
  style.css         ← Semua styling premium
js/
  main.js           ← Semua JavaScript & konfigurasi WA
README.md
```

---

## 🔗 URI / Anchor

| Anchor       | Deskripsi              |
|--------------|------------------------|
| `#beranda`   | Hero section           |
| `#statistik` | Statistik kepercayaan  |
| `#program`   | Program pembelajaran   |
| `#cara-belajar` | Timeline cara belajar |
| `#testimoni` | Testimoni peserta      |
| `#faq`       | FAQ                    |
| `#kontak`    | Informasi kontak       |

---

## ⚙️ Cara Mengubah Nomor WhatsApp

Buka `js/main.js`, cari bagian `WA_CONFIG`:

```js
const WA_CONFIG = {
  number: '6281336307404',  // ← Ubah nomor di sini
  defaultMessage: 'Halo, saya ingin berkonsultasi...'
};
```

Nomor ditulis tanpa `+`, spasi, atau tanda hubung. Semua tombol di seluruh halaman akan otomatis menggunakan nomor terbaru.

Tampilan nomor di section Kontak diambil dari elemen `#wa-number-display` di `index.html`:
```html
<span class="kontak-value" id="wa-number-display">+62 813-3630-7404</span>
```

---

## 🎨 Panduan Warna

| Nama         | HEX      | Penggunaan               |
|--------------|----------|--------------------------|
| Deep Navy    | `#0a1628`| Background utama gelap   |
| Navy         | `#0d2247`| Gradient gelap           |
| Mid Navy     | `#1a3a6b`| Gradient pertengahan     |
| Gold         | `#c9a227`| Aksen utama, CTA         |
| Light Gold   | `#e8c547`| Hover, gradient emas     |
| White        | `#ffffff`| Teks & background terang |
| Off-White    | `#f5f7fa`| Background section terang|

---

## 📌 Catatan Penting

- **Tidak ada klaim profit** di seluruh konten website
- **Kontak hanya di Section Kontak & Footer** — tidak tersebar di section lain
- Semua testimoni adalah **original** dan tidak menyebutkan hasil finansial
- Statistik digunakan sebagai **ilustrasi demonstrasi** dengan disclaimer

---

## 🚀 Cara Deploy

Untuk mempublikasikan website, gunakan **tab Publish** di platform ini. Publish tab akan menangani proses deployment secara otomatis.

---

## 📅 Terakhir Diperbarui

2026-06-15
