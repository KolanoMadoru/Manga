# 🚀 MangaTracker - Command Cheatsheet

Quick reference untuk development, debugging, dan deployment.

## 📦 Installation & Setup

```bash
# Clone repository
git clone https://github.com/KolanoMadoru/Manga.git
cd Manga

# Install dependencies
npm install

# Setup environment variables
cp .env.example .env.local
# Edit .env.local dengan Firebase credentials
```

## 🔧 Development Commands

```bash
# Start development server (http://localhost:3000)
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview

# Validate Firebase configuration
npm run check-config

# Create demo account in Firebase
npm run setup-demo
```

## 🔍 Debugging Commands

### Check Firebase Configuration
```bash
# Validate environment variables
npm run check-config

# Manual check specific variable
echo $VITE_FIREBASE_API_KEY
```

### Browser Console Commands
```javascript
// Check if environment variables loaded
console.log('API Key:', import.meta.env.VITE_FIREBASE_API_KEY);
console.log('Auth Domain:', import.meta.env.VITE_FIREBASE_AUTH_DOMAIN);
console.log('Project ID:', import.meta.env.VITE_FIREBASE_PROJECT_ID);

// Check all env vars
console.log(import.meta.env);

// Check current domain
console.log('Domain:', window.location.hostname);

// Check Firebase auth instance
import { auth } from './src/config/firebase';
console.log('Firebase App:', auth.app.name);
console.log('Auth Domain:', auth.app.options.authDomain);
```

## 🚀 Netlify Deployment

### Via Netlify Dashboard (Easiest)
```bash
# 1. Push code to GitHub/GitLab
git add .
git commit -m "Ready for deployment"
git push origin main

# 2. Go to Netlify Dashboard
# - Connect repository
# - Build settings auto-detected from netlify.toml
# - Add environment variables (see below)
# - Deploy!
```

### Via Netlify CLI
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login to Netlify
netlify login

# Initialize (first time)
netlify init

# Deploy preview
netlify deploy

# Deploy to production
netlify deploy --prod

# Open site
netlify open:site

# Open admin dashboard
netlify open:admin
```

## 🔐 Environment Variables Setup

### Required Variables (Add to Netlify Dashboard)
```bash
VITE_FIREBASE_API_KEY=AIzaSy...
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789012
VITE_FIREBASE_APP_ID=1:123456789012:web:abcdef...
```

### Where to Add in Netlify
```
Netlify Dashboard 
→ Site configuration 
→ Environment variables 
→ Add a variable
```

### Important Notes
- ⚠️ **Must** have `VITE_` prefix for Vite to expose them
- ⚠️ After adding variables, **trigger new deploy** (required!)
- ⚠️ Variables only available at **build time**, not runtime

## 🔥 Firebase Console Commands

### Get Firebase Credentials
```
1. Go to: https://console.firebase.google.com
2. Select your project
3. Click ⚙️ → Project settings
4. Scroll to "Your apps" section
5. Select/Create Web App
6. Copy credentials
```

### Add Netlify Domain to Authorized Domains
```
1. Firebase Console → Authentication
2. Click "Settings" tab
3. Scroll to "Authorized domains"
4. Click "Add domain"
5. Enter: your-site.netlify.app (without https://)
6. Save
```

### Create Demo Account
```
Option 1 - Via Script:
npm run setup-demo

Option 2 - Via Firebase Console:
1. Authentication → Users
2. Add user
   - Email: demo@mangatracker.com
   - Password: demo123456
3. Save
```

## 🐛 Troubleshooting Commands

### Check Build Locally
```bash
# Clean build
rm -rf dist node_modules package-lock.json
npm install
npm run build
npm run preview
```

### Check Netlify Build Logs
```bash
# Via CLI
netlify logs

# Via Dashboard
Netlify Dashboard → Deploys → Click deploy → View logs
```

### Clear Netlify Cache & Redeploy
```bash
# Via Dashboard
Deploys → Trigger deploy → Clear cache and deploy site
```

### Test Production Build Locally
```bash
# Build
npm run build

# Serve with http-server (install if needed)
npx http-server dist -p 8080

# Or use vite preview
npm run preview
```

## 🧪 Testing Checklist

```bash
# Local testing
□ npm run check-config (all ✅)
□ npm run dev (works)
□ npm run build (success)
□ npm run preview (works)
□ Test login/register locally
□ Test demo account locally

# Production testing
□ Environment variables set in Netlify
□ Domain added to Firebase authorized domains
□ New deploy triggered after env var changes
□ npm run setup-demo (if using demo)
□ Visit deployed site
□ Check "Config Check" button (should show ✅)
□ Test register new user
□ Test login
□ Test demo account
□ Test logout
□ Check browser console (no errors)
□ Check network tab (successful requests)
```

## 🔗 Quick Links

### Project Resources
- 📖 Full README: `README.md`
- 🔧 Troubleshooting: `DEPLOYMENT_TROUBLESHOOTING.md`
- 🔍 Quick Debug: `QUICK_DEBUG_GUIDE.md`
- 📋 Fixes Summary: `FIXES_APPLIED.md`
- 🎯 Demo Account: `DEMO_ACCOUNT.md`
- 🚀 Netlify Deploy: `NETLIFY_DEPLOY.md`

### External Links
- [Firebase Console](https://console.firebase.google.com)
- [Netlify Dashboard](https://app.netlify.com)
- [Firebase Status](https://status.firebase.google.com)
- [Netlify Status](https://www.netlifystatus.com)

## 💡 Pro Tips

### Development
```bash
# Run dev with specific port
PORT=3001 npm run dev

# Build and preview in one command
npm run build && npm run preview
```

### Git Workflow
```bash
# Create feature branch
git checkout -b feature/your-feature

# Commit changes
git add .
git commit -m "feat: your feature description"

# Push to branch
git push origin feature/your-feature

# Merge to main (after review)
git checkout main
git merge feature/your-feature
git push origin main
```

### Netlify Deploy Triggers
```bash
# Deploy specific branch
git push origin develop
# (Configure branch deploy in Netlify)

# Deploy via API (advanced)
curl -X POST -d {} https://api.netlify.com/build_hooks/YOUR_HOOK_ID
```

### Firebase Commands (Advanced)
```bash
# Install Firebase CLI
npm install -g firebase-tools

# Login
firebase login

# Initialize project
firebase init

# Deploy Firestore rules
firebase deploy --only firestore:rules

# Deploy Firebase functions (if any)
firebase deploy --only functions
```

## 🆘 When Things Go Wrong

### Authentication not working on Netlify?
```bash
# 1. Check config
npm run check-config

# 2. Check visual debugger on deployed site
# Look for yellow "Config Check" button

# 3. Read guides
# - QUICK_DEBUG_GUIDE.md (quick fix)
# - DEPLOYMENT_TROUBLESHOOTING.md (detailed)
```

### Build failing?
```bash
# Clean install
rm -rf node_modules package-lock.json
npm install
npm run build
```

### Environment variables not working?
```bash
# Check if set correctly
netlify env:list

# Set via CLI
netlify env:set VITE_FIREBASE_API_KEY "your-value"

# After setting, redeploy
netlify deploy --prod
```

### Cache issues?
```bash
# Clear browser cache
# Or test in incognito mode

# Clear Netlify cache
# Dashboard → Deploys → Trigger deploy → Clear cache and deploy
```

## 📱 Mobile Testing

```bash
# Get local IP
ifconfig | grep inet  # Mac/Linux
ipconfig              # Windows

# Run dev server accessible on network
npm run dev -- --host

# Access from mobile
# http://YOUR_IP:3000
```

## 🎯 Common Workflows

### First Time Setup
```bash
git clone <repo>
cd Manga
npm install
cp .env.example .env.local
# Edit .env.local with Firebase credentials
npm run check-config
npm run dev
```

### Regular Development
```bash
git pull
npm install
npm run dev
# Make changes
npm run build
git add .
git commit -m "your message"
git push
```

### Pre-Deployment Check
```bash
npm run check-config
npm run build
npm run preview
# Test all features
# If OK, deploy
```

### Post-Deployment
```bash
# Visit site
# Check "Config Check" button
# Test authentication
# Check browser console
# Monitor Netlify analytics
```

---

**💡 Tip:** Bookmark this file for quick reference during development!

**🆘 Need help?** Check documentation files or open an issue on GitHub.
