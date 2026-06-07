# iTrack - Internship Tracker

**iTrack** adalah aplikasi HRIS sederhana untuk pengelolaan program internship/magang, khususnya untuk kebutuhan absensi, laporan harian, izin, monitoring peserta, dan export data.

Aplikasi ini dirancang dengan tampilan **mobile-first**, mendukung pengalaman seperti aplikasi native, serta siap digunakan sebagai **PWA**.

## Fitur Utama

### Peserta Internship

- Login akun peserta
- Registrasi akun baru
- Cek status pendaftaran
- Reset password dengan OTP
- Absensi check-in dan check-out
- Validasi lokasi berbasis GPS
- Selfie menggunakan kamera
- Absen luar lokasi
- Input laporan kerja harian
- Upload dokumentasi dari kamera atau galeri
- Pengajuan izin
- Edit profil dan foto profil
- Riwayat absensi, laporan, dan izin

### Admin

- Dashboard monitoring
- Monitoring absensi peserta
- Validasi laporan kerja
- Approval pengajuan izin
- Verifikasi pendaftaran peserta
- Data peserta internship
- Pengaturan sistem
- Export data absensi ke PDF/CSV
- Export laporan kerja ke PDF/CSV

## Teknologi

- Frontend: HTML, CSS, JavaScript
- Backend: Google Apps Script Web App
- Database: Google Spreadsheet
- Penyimpanan file: Google Drive
- PWA: Service Worker dan Web Manifest

## Struktur File

```text
id.html
manifest.webmanifest
sw.js
