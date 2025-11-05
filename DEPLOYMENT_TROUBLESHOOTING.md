# 🔧 Troubleshooting: Login/Register Tidak Berfungsi di Netlify

## 📋 Analisis Masalah

Setelah menganalisis kode Anda, berikut adalah **penyebab paling umum** mengapa autentikasi tidak berfungsi setelah deployment ke Netlify:

### ✅ Yang Sudah Benar
- ✅ Firebase configuration menggunakan `import.meta.env.VITE_*`
- ✅ Netlify.toml sudah dikonfigurasi dengan benar (SPA redirects)
- ✅ Tidak ada hardcoded localhost URLs
- ✅ Code structure sudah benar

### ❌ Yang Kemungkinan Bermasalah

#### **1. Environment Variables Tidak Diset di Netlify** ⚠️ (PALING UMUM)
Firebase credentials tidak terbaca di production karena belum diset di Netlify dashboard.

#### **2. Firebase Authorized Domains Belum Dikonfigurasi** ⚠️ (SANGAT PENTING)
Domain Netlify Anda belum ditambahkan ke Firebase authorized domains, sehingga Firebase memblokir autentikasi dari domain tersebut.

#### **3. Demo Account Belum Ada di Firebase Production** ⚠️
Jika Anda menggunakan Firebase project berbeda untuk production, demo account mungkin belum dibuat.

#### **4. Browser Blocking Third-Party Cookies**
Firebase Auth menggunakan popup/redirect yang memerlukan third-party cookies.

---

## 🔍 Cara Debugging

### 1. Cek Browser Console
Buka aplikasi Anda di Netlify, tekan `F12`, lalu cek tab **Console**:

```javascript
// Error yang mungkin muncul:
❌ "Firebase: Error (auth/unauthorized-domain)"
   → Domain Netlify belum ditambahkan ke Firebase

❌ "Firebase: Error (auth/api-key-not-valid)"
   → Environment variable VITE_FIREBASE_API_KEY salah/kosong

❌ "Firebase: Error (auth/user-not-found)"
   → User belum terdaftar (untuk demo account)

❌ "auth/configuration-not-found"
   → Firebase config tidak terbaca (env variables kosong)
```

### 2. Cek Network Tab
Buka tab **Network** di DevTools:
- Filter: `XHR/Fetch`
- Coba login
- Lihat request ke `identitytoolkit.googleapis.com` atau `firebaseapp.com`
- Cek response body untuk error details

### 3. Cek Firebase Config di Production
Buka Console browser dan ketik:
```javascript
console.log(import.meta.env);
```
**Harusnya menampilkan:**
```javascript
{
  VITE_FIREBASE_API_KEY: "AIzaSy...",
  VITE_FIREBASE_AUTH_DOMAIN: "your-project.firebaseapp.com",
  VITE_FIREBASE_PROJECT_ID: "your-project",
  // ... dll
}
```

**Jika undefined atau "demo-..."**, berarti environment variables tidak terbaca.

### 4. Cek Netlify Build Logs
1. Buka Netlify Dashboard
2. Klik site Anda → **Deploys** tab
3. Klik deploy terbaru
4. Cek apakah ada error saat build

---

## 🛠️ Solusi Step-by-Step

### ✅ Solusi 1: Setup Environment Variables di Netlify

#### Langkah 1: Dapatkan Firebase Credentials
1. Buka [Firebase Console](https://console.firebase.google.com)
2. Pilih project Anda
3. Klik ⚙️ (Settings) → **Project settings**
4. Scroll ke bawah ke bagian **Your apps**
5. Pilih Web App Anda
6. Copy nilai-nilai ini:
   - `apiKey`
   - `authDomain`
   - `projectId`
   - `storageBucket`
   - `messagingSenderId`
   - `appId`

#### Langkah 2: Tambahkan ke Netlify
1. Buka [Netlify Dashboard](https://app.netlify.com)
2. Pilih site Anda
3. Klik **Site configuration** → **Environment variables**
4. Klik **Add a variable** atau **Add environment variables**
5. Tambahkan satu per satu:

```bash
Key: VITE_FIREBASE_API_KEY
Value: AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXX

Key: VITE_FIREBASE_AUTH_DOMAIN
Value: your-project.firebaseapp.com

Key: VITE_FIREBASE_PROJECT_ID
Value: your-project-id

Key: VITE_FIREBASE_STORAGE_BUCKET
Value: your-project.appspot.com

Key: VITE_FIREBASE_MESSAGING_SENDER_ID
Value: 123456789012

Key: VITE_FIREBASE_APP_ID
Value: 1:123456789012:web:abcdef0123456789abcdef
```

#### Langkah 3: Redeploy
1. Setelah menambahkan semua variables
2. Klik **Deploys** tab
3. Klik **Trigger deploy** → **Clear cache and deploy site**

⚠️ **PENTING**: Netlify perlu rebuild setelah menambah environment variables!

---

### ✅ Solusi 2: Tambahkan Domain Netlify ke Firebase Authorized Domains

#### Langkah 1: Dapatkan URL Netlify Anda
URL Anda biasanya: `https://your-site-name.netlify.app`

#### Langkah 2: Tambahkan ke Firebase
1. Buka [Firebase Console](https://console.firebase.google.com)
2. Pilih project Anda
3. Klik **Authentication** (menu kiri)
4. Klik tab **Settings**
5. Scroll ke **Authorized domains**
6. Klik **Add domain**
7. Masukkan: `your-site-name.netlify.app` (tanpa https://)
8. Klik **Add**

#### Default Domains (Jangan Dihapus):
- `localhost`
- `*.firebaseapp.com`

#### Tambahkan Domain Netlify:
- `your-site-name.netlify.app`
- `your-custom-domain.com` (jika punya custom domain)

⚠️ **SANGAT PENTING**: Tanpa ini, Firebase akan **memblokir semua autentikasi** dari Netlify!

---

### ✅ Solusi 3: Buat Demo Account di Firebase

Jika Anda menggunakan fitur demo account, pastikan sudah dibuat di Firebase:

#### Opsi A: Buat via Script (Recommended)
```bash
# Di local machine Anda
npm install
node scripts/create-demo-account.js
```

#### Opsi B: Buat Manual via Firebase Console
1. Buka Firebase Console → **Authentication** → **Users**
2. Klik **Add user**
3. Email: `demo@mangatracker.com`
4. Password: `demo123456`
5. Klik **Add user**

#### Opsi C: Register via UI
1. Deploy dulu tanpa demo (nonaktifkan demo button sementara)
2. Register manual dengan:
   - Email: `demo@mangatracker.com`
   - Password: `demo123456`
   - Display Name: `Demo User`
3. Aktifkan kembali demo button

---

### ✅ Solusi 4: Enable Google Sign-In (Jika Pakai Google Auth)

1. Firebase Console → **Authentication** → **Sign-in method**
2. Cari **Google** provider
3. Klik **Enable**
4. Set **Project support email**
5. Klik **Save**

⚠️ Jika Google Sign-In tidak di-enable, tombol "Sign in with Google" akan error.

---

## 🧪 Testing Checklist

Setelah melakukan solusi di atas, test hal-hal berikut:

### ✅ Test 1: Cek Environment Variables
```javascript
// Buka Console di production site
console.log('API Key:', import.meta.env.VITE_FIREBASE_API_KEY);
console.log('Auth Domain:', import.meta.env.VITE_FIREBASE_AUTH_DOMAIN);
```
**Expected**: Nilai-nilai seharusnya muncul, bukan undefined

### ✅ Test 2: Test Register
1. Buka `/register`
2. Isi form dengan email baru
3. Submit
4. **Expected**: Redirect ke dashboard

### ✅ Test 3: Test Login
1. Buka `/login`
2. Login dengan akun yang baru dibuat
3. **Expected**: Redirect ke dashboard

### ✅ Test 4: Test Demo Account
1. Buka `/login`
2. Klik "Try Demo Account"
3. **Expected**: Auto-login dan redirect ke dashboard

### ✅ Test 5: Test Google Login
1. Buka `/login`
2. Klik "Sign in with Google"
3. **Expected**: Popup Google login muncul
4. Pilih akun Google
5. **Expected**: Login berhasil

### ✅ Test 6: Test Logout
1. Setelah login, klik Logout
2. **Expected**: Redirect ke home/login

---

## 🐛 Common Errors & Fixes

### Error: "auth/unauthorized-domain"
**Penyebab**: Domain Netlify belum ditambahkan ke Firebase  
**Solusi**: Ikuti **Solusi 2** di atas

### Error: "auth/api-key-not-valid"
**Penyebab**: Environment variable salah atau kosong  
**Solusi**: Double-check **Solusi 1**, pastikan no typo

### Error: "auth/user-not-found" (Demo Account)
**Penyebab**: Demo user belum dibuat di Firebase  
**Solusi**: Ikuti **Solusi 3** di atas

### Error: "auth/popup-blocked"
**Penyebab**: Browser memblokir popup Google login  
**Solusi**: 
- User harus allow popup di browser
- Atau ganti ke `signInWithRedirect` instead of `signInWithPopup`

### Error: "auth/network-request-failed"
**Penyebab**: Koneksi internet bermasalah atau Firebase down  
**Solusi**: Cek koneksi, coba lagi

### Error: Environment variables undefined
**Penyebab**: Netlify belum rebuild setelah add env vars  
**Solusi**: Trigger new deploy di Netlify

---

## 🚀 Best Practices Deployment

### 1. Environment Variables Management
```bash
# .env.local (LOKAL - tidak di-commit)
VITE_FIREBASE_API_KEY=your_local_key
VITE_FIREBASE_AUTH_DOMAIN=your-dev.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-dev-project
# ... dll

# Netlify: Set di dashboard (PRODUCTION)
# Gunakan Firebase project production yang berbeda (recommended)
```

### 2. Separate Firebase Projects
**Recommended**: Buat 2 Firebase projects
- `your-app-dev` → untuk development (localhost)
- `your-app-prod` → untuk production (Netlify)

**Kenapa?**
- Data terpisah
- Quota terpisah
- Lebih aman

### 3. Security Rules
Pastikan Firestore rules aman:
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read: if request.auth != null;
      allow write: if request.auth.uid == userId;
    }
    
    match /mangas/{mangaId} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    
    // ... rules lainnya
  }
}
```

### 4. Custom Domain (Optional tapi Recommended)
1. Beli domain (Namecheap, Google Domains, dll)
2. Netlify → Domain settings → Add custom domain
3. Update DNS records
4. **PENTING**: Tambahkan custom domain ke Firebase authorized domains!

### 5. Enable HTTPS (Otomatis di Netlify)
Netlify otomatis provide SSL certificate via Let's Encrypt.
Firebase Auth HANYA bekerja di HTTPS (kecuali localhost).

---

## 📝 Quick Command Reference

### Cek Environment Variables (Local)
```bash
# Cek file .env.local ada
cat .env.local

# Test dev server
npm run dev
```

### Deploy ke Netlify via CLI
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login
netlify login

# Deploy
netlify deploy --prod
```

### Check Build Locally
```bash
# Build production
npm run build

# Test production build locally
npm run preview
```

### Firebase Commands
```bash
# Create demo account
node scripts/create-demo-account.js

# Deploy Firebase rules (if any)
firebase deploy --only firestore:rules
```

---

## 🎯 Deployment Checklist

Gunakan checklist ini setiap kali deploy:

### Pre-Deployment
- [ ] Code sudah di-commit ke Git
- [ ] No hardcoded secrets/credentials di code
- [ ] `.env` sudah di-`.gitignore`
- [ ] Build berhasil locally (`npm run build`)
- [ ] Preview production build berhasil (`npm run preview`)

### Netlify Setup
- [ ] Environment variables sudah diset (semua VITE_FIREBASE_*)
- [ ] Build settings benar:
  - Build command: `npm run build`
  - Publish directory: `dist`
- [ ] `netlify.toml` sudah ada dan benar

### Firebase Setup
- [ ] Domain Netlify sudah di authorized domains
- [ ] Authentication providers enabled (Email, Google, dll)
- [ ] Demo account sudah dibuat (jika pakai)
- [ ] Firestore rules sudah deploy
- [ ] Firebase project production ready

### Post-Deployment Testing
- [ ] Site bisa diakses via URL Netlify
- [ ] Register user baru berhasil
- [ ] Login berhasil
- [ ] Demo account berhasil
- [ ] Google login berhasil (jika pakai)
- [ ] Logout berhasil
- [ ] Data persist setelah refresh
- [ ] No console errors
- [ ] Network requests sukses (no 401/403)

---

## 🆘 Masih Bermasalah?

Jika setelah mengikuti semua langkah di atas masih bermasalah:

### 1. Kirim Info Berikut
```bash
# 1. Screenshot console errors (F12 → Console)
# 2. Screenshot network errors (F12 → Network)
# 3. Netlify build log (copy paste)
# 4. Screenshot Firebase authorized domains
# 5. Screenshot Netlify environment variables (censor values)
```

### 2. Cek Firebase Status
https://status.firebase.google.com/
(Pastikan tidak ada downtime)

### 3. Test dengan Incognito Mode
Kadang browser cache/cookies menyebabkan masalah

### 4. Cek Firebase Billing
Jika project sudah exceed quota, auth mungkin tidak bekerja

---

## 📚 Dokumentasi Tambahan

- [Firebase Auth Docs](https://firebase.google.com/docs/auth/web/start)
- [Netlify Environment Variables](https://docs.netlify.com/environment-variables/overview/)
- [Vite Environment Variables](https://vitejs.dev/guide/env-and-mode.html)
- [Firebase Authorized Domains](https://firebase.google.com/docs/auth/web/redirect-best-practices)

---

**Good luck! 🚀**

Jika semua langkah di atas diikuti dengan benar, autentikasi Anda seharusnya sudah bekerja di Netlify.
