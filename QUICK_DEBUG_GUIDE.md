# 🚨 Quick Debug Guide - Auth Not Working on Netlify

## 🎯 Most Common Causes (95% of cases)

### 1. Environment Variables Not Set ⚠️
**Check:** Netlify Dashboard → Site configuration → Environment variables

**Required variables:**
```
VITE_FIREBASE_API_KEY
VITE_FIREBASE_AUTH_DOMAIN
VITE_FIREBASE_PROJECT_ID
VITE_FIREBASE_STORAGE_BUCKET
VITE_FIREBASE_MESSAGING_SENDER_ID
VITE_FIREBASE_APP_ID
```

**After adding:** Trigger new deploy (required for env vars to take effect)

---

### 2. Firebase Authorized Domains ⚠️
**Check:** Firebase Console → Authentication → Settings → Authorized domains

**Must include:**
- `your-site.netlify.app` (your actual Netlify domain)
- `localhost` (for local development)

**Without this:** Firebase will block ALL authentication attempts with error:
```
auth/unauthorized-domain
```

---

### 3. Demo Account Not Created ⚠️
If using demo account feature, create it first:

```bash
node scripts/create-demo-account.js
```

Or manually in Firebase Console → Authentication → Users:
- Email: demo@mangatracker.com
- Password: demo123456

---

## 🔍 Browser Debug Commands

Open browser console (F12) and run these:

### Check if environment variables are loaded:
```javascript
console.log('API Key:', import.meta.env.VITE_FIREBASE_API_KEY);
console.log('Auth Domain:', import.meta.env.VITE_FIREBASE_AUTH_DOMAIN);
console.log('Project ID:', import.meta.env.VITE_FIREBASE_PROJECT_ID);
```

**Expected:** Should show real values, NOT "demo-..." or undefined

### Check current domain:
```javascript
console.log('Current domain:', window.location.hostname);
```

### Check Firebase Auth instance:
```javascript
import { auth } from './src/config/firebase';
console.log('Firebase App Name:', auth.app.name);
console.log('Firebase Auth Domain:', auth.app.options.authDomain);
```

---

## 🐛 Error Messages & Solutions

| Error | Cause | Solution |
|-------|-------|----------|
| `auth/unauthorized-domain` | Domain not in Firebase authorized domains | Add Netlify domain to Firebase Console |
| `auth/api-key-not-valid` | Wrong or missing API key | Check environment variables |
| `auth/user-not-found` | User doesn't exist | For demo: create demo account |
| `auth/configuration-not-found` | Firebase config not loaded | Check env vars, redeploy |
| `auth/popup-blocked` | Browser blocked popup | User must allow popup, or use redirect |
| `auth/network-request-failed` | Network/CORS issue | Check Firebase domain settings |

---

## ✅ Step-by-Step Fix (Follow in Order)

### Step 1: Verify Environment Variables in Netlify
1. Go to Netlify Dashboard
2. Select your site
3. Site configuration → Environment variables
4. Verify all 6 VITE_FIREBASE_* variables exist
5. If missing, add them from Firebase Console
6. **Trigger new deploy** (Important!)

### Step 2: Add Netlify Domain to Firebase
1. Get your Netlify URL (e.g., `my-app.netlify.app`)
2. Go to Firebase Console
3. Authentication → Settings → Authorized domains
4. Click "Add domain"
5. Paste: `my-app.netlify.app` (without https://)
6. Save

### Step 3: Create Demo Account (if needed)
```bash
node scripts/create-demo-account.js
```

### Step 4: Test in Browser
1. Clear browser cache
2. Open Netlify site
3. Try register new user
4. Try login
5. Try demo account

### Step 5: Check Browser Console
- Should see no red errors
- Network tab → Filter "identitytoolkit" → Should see successful requests

---

## 🧪 Validation Checklist

Run through this checklist:

- [ ] All 6 environment variables set in Netlify
- [ ] Netlify domain added to Firebase authorized domains
- [ ] New deploy triggered after adding env vars
- [ ] Demo account created in Firebase (if using demo)
- [ ] Browser console shows no errors
- [ ] Network tab shows successful Firebase requests
- [ ] Can register new user successfully
- [ ] Can login with created user
- [ ] Can use demo account (if enabled)
- [ ] Can logout successfully

---

## 🎨 Visual Debug Tool

This project now includes a visual Firebase Config Checker!

When you visit the deployed site, look for a **yellow "Config Check" button** in the bottom-right corner.

Click it to see:
- ✅/❌ Status of each Firebase config variable
- Current domain and environment
- Quick links to Firebase Console
- Copy diagnostics for troubleshooting

The button only appears when:
- Running in production AND config is invalid, OR
- Running in development with invalid config

---

## 📞 Still Not Working?

### Gather Debug Info:
1. Screenshot of browser console errors
2. Screenshot of Network tab (filter: identitytoolkit)
3. Screenshot of Netlify environment variables (hide values)
4. Screenshot of Firebase authorized domains
5. Copy output from "Config Check" button

### Check These:
- Firebase project status: https://status.firebase.google.com/
- Netlify status: https://www.netlifystatus.com/
- Try in incognito/private mode (to rule out cache issues)
- Try different browser (to rule out browser-specific issues)

### Common Oversights:
- ❌ Forgot to redeploy after adding env vars
- ❌ Added domain with `https://` (should be without)
- ❌ Typo in environment variable names
- ❌ Using wrong Firebase project (dev vs prod)
- ❌ Firebase billing quota exceeded

---

## 📚 Related Documentation

- Full guide: [DEPLOYMENT_TROUBLESHOOTING.md](./DEPLOYMENT_TROUBLESHOOTING.md)
- Validate config locally: `node scripts/check-firebase-config.js`
- Demo account setup: [DEMO_ACCOUNT.md](./DEMO_ACCOUNT.md)

---

**Remember:** 95% of authentication issues on Netlify are caused by missing environment variables or Firebase authorized domains. Start there! 🎯
