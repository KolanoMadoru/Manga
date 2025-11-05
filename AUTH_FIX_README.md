# 🔧 Fix: Authentication Not Working on Netlify

## ⚡ Quick Summary

Your authentication (login/register/demo) isn't working on Netlify because of **configuration issues**, not code issues. Your code is fine! 

## 🎯 The Fix (2 Steps - Takes 5 Minutes)

### Step 1: Add Environment Variables to Netlify

1. Go to [Netlify Dashboard](https://app.netlify.com)
2. Select your site
3. **Site configuration** → **Environment variables**
4. Click **Add a variable**
5. Add these 6 variables (get values from [Firebase Console](https://console.firebase.google.com)):

```
VITE_FIREBASE_API_KEY
VITE_FIREBASE_AUTH_DOMAIN
VITE_FIREBASE_PROJECT_ID
VITE_FIREBASE_STORAGE_BUCKET
VITE_FIREBASE_MESSAGING_SENDER_ID
VITE_FIREBASE_APP_ID
```

6. **Important:** Click **Deploys** tab → **Trigger deploy** → **Clear cache and deploy site**

### Step 2: Add Your Netlify Domain to Firebase

1. Copy your Netlify URL (e.g., `my-manga-app.netlify.app`)
2. Go to [Firebase Console](https://console.firebase.google.com)
3. **Authentication** → **Settings** tab
4. Scroll to **Authorized domains**
5. Click **Add domain**
6. Paste your Netlify domain (WITHOUT `https://`)
7. Click **Add**

### Step 3: Test!

Visit your deployed site and:
- ✅ Try to register a new user
- ✅ Try to login
- ✅ Try the demo account

## 🔍 Visual Debugging Tool

This project now includes a **Config Checker** tool!

When you visit your deployed site, look for a **yellow "Config Check" button** in the bottom-right corner.

**Click it to see:**
- ✅ Status of each Firebase config variable
- 🔧 Specific instructions for your environment
- 📋 Quick links to Firebase Console

If all configs are valid, the button will hide automatically.

## 📚 Full Documentation

### For Quick Fixes (5 min read):
📖 **[QUICK_DEBUG_GUIDE.md](./QUICK_DEBUG_GUIDE.md)** - Common errors and fast solutions

### For Complete Understanding (15 min read):
📖 **[DEPLOYMENT_TROUBLESHOOTING.md](./DEPLOYMENT_TROUBLESHOOTING.md)** - Everything you need to know

### For Development Commands:
📖 **[CHEATSHEET.md](./CHEATSHEET.md)** - All commands and workflows

## 🧪 Validate Configuration

```bash
# Check if Firebase config is valid (locally)
npm run check-config

# Create demo account (if using demo feature)
npm run setup-demo

# Build and test locally before deploying
npm run build
npm run preview
```

## ❓ Still Not Working?

1. **Check browser console** (F12 → Console tab)
   - Look for Firebase errors
   
2. **Click "Config Check" button** on your deployed site
   - Copy diagnostics if needed
   
3. **Common mistakes:**
   - ❌ Forgot to redeploy after adding env vars
   - ❌ Added domain with `https://` (should be without)
   - ❌ Typo in environment variable names
   - ❌ Wrong Firebase project selected

4. **Read detailed guides:**
   - Start with `QUICK_DEBUG_GUIDE.md`
   - Then read `DEPLOYMENT_TROUBLESHOOTING.md` if needed

## 💡 Why This Happens

Firebase authentication requires:
1. **Valid credentials** → Environment variables
2. **Authorized domain** → Your Netlify domain must be whitelisted

Without these, Firebase will **block ALL authentication requests** for security reasons.

This is by design and is actually protecting your app! 🔒

## 🎉 Success!

Once you complete the 2 steps above, your authentication will work perfectly!

The same code that works on localhost will work on Netlify - you just needed the proper configuration.

---

**Need Help?** Open an issue with:
- Screenshot of browser console errors
- Screenshot from "Config Check" button
- Your Netlify domain
- Screenshot of Firebase authorized domains

We'll help you debug! 🚀

---

**Quick Links:**
- [Firebase Console](https://console.firebase.google.com) - Get credentials & add domain
- [Netlify Dashboard](https://app.netlify.com) - Add environment variables
- [Firebase Status](https://status.firebase.google.com/) - Check if Firebase is down
- [Netlify Status](https://www.netlifystatus.com/) - Check if Netlify is down
