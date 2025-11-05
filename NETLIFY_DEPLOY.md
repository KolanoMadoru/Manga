# Panduan Deploy ke Netlify

Proyek MangaTracker sudah dikonfigurasi untuk deployment di Netlify. Ikuti langkah-langkah berikut:

## 🚀 Cara Deploy

### Method 1: Deploy via Netlify Dashboard (Recommended)

1. **Login ke Netlify**
   - Buka [netlify.app](https://app.netlify.com)
   - Login atau daftar akun baru

2. **Import Project**
   - Klik "Add new site" → "Import an existing project"
   - Pilih provider Git (GitHub/GitLab/Bitbucket)
   - Authorize Netlify untuk mengakses repository
   - Pilih repository `Manga`

3. **Konfigurasi Build Settings**
   
   Netlify akan otomatis mendeteksi settings dari `netlify.toml`, tapi pastikan:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
   - **Branch to deploy**: `main` atau branch pilihan Anda

4. **Set Environment Variables**
   
   Di dashboard Netlify, buka:
   - Site settings → Environment variables → Add a variable
   
   Tambahkan variables berikut (dari Firebase console):
   ```
   VITE_FIREBASE_API_KEY=your_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=your_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   VITE_FIREBASE_APP_ID=your_app_id
   ```

5. **Deploy**
   - Klik "Deploy site"
   - Tunggu proses build selesai (sekitar 1-3 menit)
   - Site akan tersedia di URL seperti: `https://random-name-123456.netlify.app`

6. **Custom Domain (Optional)**
   - Buka Site settings → Domain management
   - Klik "Add custom domain"
   - Ikuti instruksi untuk konfigurasi DNS

### Method 2: Deploy via Netlify CLI

1. **Install Netlify CLI**
   ```bash
   npm install -g netlify-cli
   ```

2. **Login**
   ```bash
   netlify login
   ```

3. **Initialize Site**
   ```bash
   netlify init
   ```
   
   Ikuti prompt untuk:
   - Connect ke Git repository
   - Pilih team
   - Buat nama site baru

4. **Set Environment Variables**
   ```bash
   netlify env:set VITE_FIREBASE_API_KEY "your_api_key"
   netlify env:set VITE_FIREBASE_AUTH_DOMAIN "your_domain"
   netlify env:set VITE_FIREBASE_PROJECT_ID "your_project_id"
   netlify env:set VITE_FIREBASE_STORAGE_BUCKET "your_bucket"
   netlify env:set VITE_FIREBASE_MESSAGING_SENDER_ID "your_sender_id"
   netlify env:set VITE_FIREBASE_APP_ID "your_app_id"
   ```

5. **Deploy**
   ```bash
   # Deploy draft (untuk preview)
   netlify deploy
   
   # Deploy production
   netlify deploy --prod
   ```

### Method 3: Drag & Drop Deploy

1. **Build Locally**
   ```bash
   npm install
   npm run build
   ```

2. **Deploy via Drag & Drop**
   - Buka [Netlify Drop](https://app.netlify.com/drop)
   - Drag folder `dist` ke browser
   - Site akan langsung live!
   
   ⚠️ **Note**: Environment variables harus di-set manual di dashboard setelah upload.

## 📋 Konfigurasi yang Sudah Ada

Proyek ini sudah dilengkapi dengan:

### ✅ netlify.toml
File konfigurasi utama Netlify yang berisi:
- Build command dan output directory
- SPA redirect rules (untuk React Router)
- Security headers
- Cache headers untuk assets
- Node.js version

### ✅ public/_redirects
Backup redirect rules untuk SPA routing:
```
/* /index.html 200
```

File ini memastikan semua routes React Router bekerja dengan benar.

## 🔧 Troubleshooting

### Build Gagal

**Error: "Command failed with exit code 1"**
- Pastikan semua dependencies terinstall
- Check console log untuk error spesifik
- Pastikan Node.js version sesuai (v18+)

**Error: "Environment variable not found"**
- Periksa semua environment variables sudah di-set
- Pastikan prefix `VITE_` ada di setiap variable
- Redeploy setelah menambahkan variables

### Routing Tidak Bekerja

**Error 404 saat refresh page**
- Pastikan file `netlify.toml` ada di root project
- Pastikan file `public/_redirects` ada
- Check redirect rules di Netlify dashboard

### Firebase Connection Error

**Error: "Firebase: Error (auth/...)"**
- Periksa environment variables di Netlify dashboard
- Pastikan Firebase project sudah dikonfigurasi dengan benar
- Add domain Netlify ke Firebase authorized domains:
  - Firebase Console → Authentication → Settings
  - Authorized domains → Add domain
  - Tambahkan: `your-site.netlify.app`

### Performance Issues

**Site lambat loading**
- Enable Netlify's built-in CDN (otomatis aktif)
- Pastikan assets di-minify (sudah otomatis via Vite)
- Consider menggunakan Netlify's Image CDN untuk optimasi gambar

## 🔄 Continuous Deployment

Setelah setup awal, Netlify akan otomatis:
- Deploy setiap push ke branch production
- Create preview deploys untuk pull requests
- Run build checks sebelum merge

### Branch Deploys

Konfigurasi deploy per branch:
- Site settings → Build & deploy → Continuous deployment
- Deploy contexts:
  - **Production**: branch `main`
  - **Branch deploys**: semua branches
  - **Deploy previews**: pull requests

## 🔐 Security Notes

1. **Environment Variables**
   - JANGAN commit `.env` ke Git
   - Set semua variables di Netlify dashboard
   - Firebase credentials di environment variables aman

2. **Firebase Rules**
   - Pastikan Firestore rules sudah di-set dengan benar
   - Jangan expose sensitive data di frontend

3. **Authorized Domains**
   - Tambahkan domain Netlify ke Firebase authorized domains
   - Hapus unauthorized domains untuk keamanan

## 📊 Monitoring

Netlify menyediakan:
- **Analytics**: Traffic dan performance metrics
- **Build logs**: Detailed build process logs
- **Deploy logs**: History semua deployments
- **Forms**: Jika Anda tambahkan contact forms
- **Functions**: Untuk serverless functions (optional)

## 💡 Tips

1. **Preview Deploys**: Setiap PR akan dapat preview URL untuk testing
2. **Rollback**: Bisa rollback ke deploy sebelumnya kapan saja
3. **Split Testing**: A/B testing untuk compare versions
4. **Asset Optimization**: Otomatis minify dan compress assets
5. **HTTPS**: SSL certificate otomatis (gratis!)

## 🆘 Support

Jika ada masalah:
- [Netlify Docs](https://docs.netlify.com)
- [Netlify Community](https://answers.netlify.com)
- [Vite Deployment Guide](https://vitejs.dev/guide/static-deploy.html)

---

**Happy Deploying! 🎉**
