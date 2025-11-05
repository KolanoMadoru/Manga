# 🚀 MangaShelf - Quick Start Guide

Get up and running with MangaShelf in under 5 minutes!

## ⚡ TL;DR - Fast Setup

```bash
# 1. Install dependencies
npm install

# 2. Setup environment variables
cp .env.example .env
# Edit .env with your Firebase credentials

# 3. Create seed users
npm run seed-users

# 4. Start development server
npm run dev
```

Visit `http://localhost:5173` and login with:
- **Rahman**: rahman@mangashelf.com / rahman123
- **Rivai**: rivai@mangashelf.com / rivai123

## 📋 Prerequisites

- **Node.js** 18+ installed
- **Firebase Account** (free tier is fine)
- **Git** (for version control)
- **Code Editor** (VS Code recommended)

## 🔥 Firebase Setup (5 minutes)

### 1. Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project"
3. Name it "MangaShelf" (or anything you like)
4. Disable Google Analytics (optional)
5. Click "Create project"

### 2. Enable Authentication

1. In Firebase Console, go to **Authentication**
2. Click "Get started"
3. Enable **Email/Password**:
   - Click on "Email/Password"
   - Toggle on "Email/Password"
   - Click "Save"
4. Enable **Google** (optional):
   - Click on "Google"
   - Toggle on "Enable"
   - Select support email
   - Click "Save"

### 3. Create Firestore Database

1. Go to **Firestore Database**
2. Click "Create database"
3. Choose **Start in test mode** (for development)
4. Select a location close to you
5. Click "Enable"

### 4. Enable Storage

1. Go to **Storage**
2. Click "Get started"
3. Choose **Start in test mode**
4. Click "Done"

### 5. Get Firebase Configuration

1. Go to **Project Settings** (gear icon)
2. Scroll down to "Your apps"
3. Click the **Web** icon (`</>`)
4. Register app (name it "MangaShelf Web")
5. Copy the **firebaseConfig** object

## 🔧 Project Setup

### 1. Clone and Install

```bash
# Clone the repository
git clone <your-repo-url>
cd manga-tracker

# Install dependencies
npm install
```

### 2. Configure Environment

Create `.env` file in the root directory:

```bash
cp .env.example .env
```

Edit `.env` and paste your Firebase config:

```env
VITE_FIREBASE_API_KEY=AIzaSy...
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=1:123456789:web:abc123
```

### 3. Create Seed Users

```bash
npm run seed-users
```

You should see:
```
✅ User created successfully!
   Username: Rahman
   Email: rahman@mangashelf.com
   Password: rahman123
   UID: ...

✅ User created successfully!
   Username: Rivai
   Email: rivai@mangashelf.com
   Password: rivai123
   UID: ...
```

### 4. Start Development Server

```bash
npm run dev
```

Open browser to: `http://localhost:5173`

## 🎯 First Steps in the App

### 1. Login with Quick Login

1. Go to `/login`
2. Look for "Quick Login (Seed Users)" section
3. Click **Rahman** or **Rivai** button
4. You're in! 🎉

### 2. Add Your First Manga

1. Go to **Manga** in the navigation
2. Click **Add Manga** button (if you're an admin)
3. Fill in:
   - Title: "One Piece"
   - Author: "Eiichiro Oda"
   - Genres: Action, Adventure
   - Status: Ongoing
   - Upload a cover image
   - Add synopsis
4. Click **Add Manga**

### 3. Add to Your Reading List

1. Click on the manga you just added
2. Click **Add to List**
3. Select status: **Reading**
4. Set current chapter: 1000
5. Add a rating: ⭐⭐⭐⭐⭐
6. Click **Save**

### 4. Write a Review

1. On the manga detail page, scroll to reviews
2. Click **Write Review**
3. Select rating
4. Write your thoughts
5. Click **Submit Review**

### 5. Check Your Dashboard

1. Go to **Dashboard**
2. See your reading statistics
3. View currently reading manga
4. Check recent activity

### 6. Try Social Features

1. Login as **Rivai** (in a different browser or incognito)
2. Add the same manga
3. Write a different review
4. Like Rahman's review
5. Follow Rahman
6. Go to **Social** to see the activity feed

## 🚀 Deploy to Netlify (10 minutes)

### Option 1: Deploy via GitHub

1. **Push to GitHub:**
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin <your-github-repo-url>
git push -u origin main
```

2. **Connect to Netlify:**
   - Go to [Netlify](https://netlify.com)
   - Click "New site from Git"
   - Choose GitHub
   - Select your repository
   - Build settings:
     - **Build command**: `npm run build`
     - **Publish directory**: `dist`
   - Click "Deploy site"

3. **Add Environment Variables:**
   - Go to Site settings > Environment variables
   - Add all `VITE_*` variables from your `.env`

4. **Create Seed Users on Production:**
   - Copy your `.env` values to Netlify
   - Run seed script locally pointing to production Firebase
   - Or manually create the users in Firebase Console

### Option 2: Manual Deploy

```bash
# Build the project
npm run build

# Install Netlify CLI
npm install -g netlify-cli

# Login to Netlify
netlify login

# Deploy
netlify deploy --prod

# Follow the prompts and select the 'dist' folder
```

## 📚 What's Next?

### Learn More

- 📖 [Full Setup Guide](./README_SETUP.md) - Comprehensive documentation
- ✅ [Feature Checklist](./FEATURE_CHECKLIST.md) - See all features
- 👥 [Seed Users Guide](./SEED_USERS_GUIDE.md) - Detailed user management
- 🚀 [Netlify Deployment](./NETLIFY_DEPLOY.md) - Deployment specifics

### Explore Features

- ✅ Browse manga library
- ✅ Track reading progress
- ✅ Write and read reviews
- ✅ Follow friends and see their activity
- ✅ View statistics and insights
- ✅ Toggle dark/light theme
- ✅ Responsive on all devices

### Customize

- Add more seed users (edit `scripts/seed-users.js`)
- Customize theme colors (edit `tailwind.config.cjs`)
- Add manga data (manually or via import)
- Modify user roles and permissions

## 🐛 Common Issues

### "Firebase config not found"
➡️ Make sure `.env` file exists and has valid Firebase credentials

### "Authentication not enabled"
➡️ Enable Email/Password in Firebase Console > Authentication

### Build fails
➡️ Delete `node_modules` and run `npm install` again

### Can't create seed users
➡️ Check Firebase Authentication is enabled and `.env` is configured

### Port already in use
➡️ The default port is 5173. Change in `vite.config.js` or kill the process

## 💡 Tips

- **Use Quick Login buttons** for faster testing
- **Switch between Rahman and Rivai** to test multi-user features
- **Check Firebase Console** to see real-time data changes
- **Use dark mode** for better eye comfort
- **Try on mobile** to see responsive design

## 🎉 You're Ready!

That's it! You now have a fully functional manga tracking app with:
- ✅ Two seed users ready to use
- ✅ Authentication working
- ✅ Firebase connected
- ✅ Development server running
- ✅ Ready for deployment

**Enjoy tracking your manga! 📚✨**

---

Need help? Check the other documentation files or open an issue on GitHub.
