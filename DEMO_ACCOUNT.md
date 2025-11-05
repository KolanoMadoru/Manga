# Demo Account Setup

## Quick Access

Untuk testing aplikasi MangaTracker, gunakan akun demo berikut:

**Email:** demo@mangatracker.com  
**Password:** demo123456

## Cara Menggunakan Demo Account

### Melalui Aplikasi
1. Buka halaman login
2. Klik tombol **"Try Demo Account"** yang berwarna ungu/pink
3. Anda akan otomatis login ke dashboard

### Manual Login
1. Buka halaman login
2. Masukkan email: `demo@mangatracker.com`
3. Masukkan password: `demo123456`
4. Klik "Sign In"

## Membuat Demo Account di Firebase

Jika akun demo belum ada atau perlu dibuat ulang:

### Cara 1: Menggunakan Script (Recommended)

```bash
# Install dependencies jika belum
npm install

# Set environment variables
# Pastikan file .env sudah dikonfigurasi dengan kredensial Firebase

# Jalankan script
node scripts/create-demo-account.js
```

### Cara 2: Manual via Firebase Console

1. Buka Firebase Console → Authentication
2. Klik "Add User"
3. Masukkan:
   - Email: `demo@mangatracker.com`
   - Password: `demo123456`
4. Klik "Add User"
5. Buka Firestore Database
6. Buat dokumen di collection `users` dengan ID = UID user yang baru dibuat
7. Isi data:
```json
{
  "uid": "[USER_UID]",
  "email": "demo@mangatracker.com",
  "displayName": "Demo User",
  "photoURL": null,
  "role": "user",
  "bio": "This is a demo account for testing MangaTracker features. Feel free to explore!",
  "createdAt": "[TIMESTAMP]",
  "updatedAt": "[TIMESTAMP]",
  "stats": {
    "totalManga": 0,
    "reading": 0,
    "completed": 0,
    "onHold": 0,
    "dropped": 0,
    "planToRead": 0
  },
  "following": [],
  "followers": []
}
```

### Cara 3: Via Aplikasi (Registrasi Manual)

1. Buka halaman `/register`
2. Isi form dengan data:
   - Display Name: `Demo User`
   - Email: `demo@mangatracker.com`
   - Password: `demo123456`
   - Confirm Password: `demo123456`
3. Klik "Create Account"

## Fitur Demo Account

Dengan akun demo, Anda dapat:

✅ Mencari dan menambahkan manga ke reading list  
✅ Melacak progress membaca per chapter  
✅ Memberikan rating dan review  
✅ Melihat statistik pembacaan  
✅ Follow/unfollow pengguna lain  
✅ Melihat social feed activities  
✅ Mengedit profil  
✅ Toggle dark/light mode  

## Keamanan

⚠️ **Catatan Penting:**
- Akun demo adalah akun publik untuk testing
- Jangan gunakan untuk data sensitif
- Data dapat dihapus atau direset sewaktu-waktu
- Untuk production, user harus membuat akun pribadi mereka sendiri

## Reset Demo Account

Jika data demo account perlu di-reset:

```bash
# Hapus user dari Firebase Authentication (manual via console)
# Atau jalankan ulang script create-demo-account.js
```

## Troubleshooting

### Error: "Email already in use"
Akun demo sudah ada. Gunakan kredensial yang ada atau hapus user dari Firebase Console terlebih dahulu.

### Error: "Invalid email or password"
Pastikan email dan password benar:
- Email: `demo@mangatracker.com`
- Password: `demo123456`

### Error: Cannot connect to Firebase
Pastikan environment variables sudah dikonfigurasi dengan benar di file `.env`.

## Support

Jika ada masalah dengan akun demo, silakan hubungi developer atau buat issue di repository.
