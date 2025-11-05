# 🚀 Quick Deploy Guide

## Deploy to Netlify (Easiest Method)

### Step 1: Connect Repository
1. Go to [https://app.netlify.com](https://app.netlify.com)
2. Click "Add new site" → "Import an existing project"
3. Connect your Git provider (GitHub/GitLab/Bitbucket)
4. Select this repository

### Step 2: Configure Build
Netlify will auto-detect settings from `netlify.toml`:
- **Build command**: `npm run build`
- **Publish directory**: `dist`

### Step 3: Set Environment Variables
Add these in Netlify dashboard (Site settings → Environment variables):
```
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

### Step 4: Deploy
Click "Deploy site" and wait 1-3 minutes! 🎉

### Step 5: Configure Firebase
Add your Netlify URL to Firebase authorized domains:
1. Go to Firebase Console → Authentication → Settings
2. Scroll to "Authorized domains"
3. Add: `your-site-name.netlify.app`

## ✅ What's Included

This repository is **ready for Netlify deployment** with:

- ✅ `netlify.toml` - Build configuration
- ✅ `public/_redirects` - SPA routing support
- ✅ `.gitignore` - Ignores Netlify cache
- ✅ Security headers configured
- ✅ Asset caching optimized
- ✅ Node.js version specified

## 📖 Detailed Instructions

For comprehensive deployment guide including:
- CLI deployment
- Drag & drop deployment
- Troubleshooting
- Custom domains
- Continuous deployment

See: **[NETLIFY_DEPLOY.md](./NETLIFY_DEPLOY.md)**

---

**Need help?** Check the [Netlify Documentation](https://docs.netlify.com)
