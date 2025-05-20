# Sistem Absensi XI Pemasaran

Sistem absensi untuk kelas XI Pemasaran SMK Informatika Bina Generasi 3.

## Fitur

- Manajemen data siswa
- Upload foto profil siswa
- Pencatatan absensi (hadir, terlambat, sakit, izin, alfa)
- Rekap absensi per bulan
- Grafik kehadiran siswa
- Tanda tangan digital wali kelas

## Persyaratan Sistem

- Node.js (v14 atau lebih baru)
- PostgreSQL (v12 atau lebih baru)
- NPM atau Yarn

## Instalasi

1. Clone repository ini
2. Install dependencies:
   ```bash
   npm install
   ```
3. Buat file `.env` di root project dengan konfigurasi berikut:
   ```
   DB_NAME=school_absent
   DB_USER=postgres
   DB_PASSWORD=postgres
   DB_HOST=localhost
   PORT=3000
   SESSION_SECRET=your-secret-key-here
   ```
4. Buat database PostgreSQL:
   ```sql
   CREATE DATABASE school_absent;
   ```
5. Jalankan migrasi database:
   ```bash
   npm run migrate
   ```
6. Jalankan aplikasi:
   ```bash
   npm start
   ```

## Penggunaan

1. Buka browser dan akses `http://localhost:3000`
2. Login menggunakan kredensial yang telah disediakan
3. Mulai mencatat absensi siswa

## Struktur Project

```
src/
├── config/         # Konfigurasi database dan aplikasi
├── controllers/    # Controller untuk menangani logika bisnis
├── models/         # Model database
├── routes/         # Definisi route
├── views/          # Template EJS
└── public/         # File statis (CSS, JS, gambar)
```

## Kontribusi

Silakan buat issue atau pull request untuk kontribusi.

## Lisensi

MIT 