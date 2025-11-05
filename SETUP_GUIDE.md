# 🚀 Setup Guide - MangaTracker

This guide will walk you through setting up the MangaTracker application from scratch.

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v18.0.0 or higher) - [Download](https://nodejs.org/)
- **npm** (comes with Node.js) or **yarn**
- A **Firebase** account - [Sign up](https://firebase.google.com/)
- A code editor (VS Code recommended)
- Git (optional)

## 🔥 Firebase Setup

### Step 1: Create a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project"
3. Enter a project name (e.g., "MangaTracker")
4. (Optional) Enable Google Analytics
5. Click "Create project"

### Step 2: Register Your Web App

1. In your Firebase project, click the web icon (</>) to add a web app
2. Enter an app nickname (e.g., "MangaTracker Web")
3. Check "Also set up Firebase Hosting" (optional)
4. Click "Register app"
5. Copy the Firebase configuration object

### Step 3: Enable Authentication

1. In Firebase Console, go to "Authentication"
2. Click "Get started"
3. Enable the following sign-in methods:
   - **Email/Password**: Toggle on
   - **Google**: Toggle on and configure
     - Select a support email
     - Add your domain to authorized domains

### Step 4: Create Firestore Database

1. In Firebase Console, go to "Firestore Database"
2. Click "Create database"
3. Choose "Start in production mode"
4. Select a location (choose closest to your users)
5. Click "Enable"

### Step 5: Set Up Firestore Security Rules

In Firestore Database, go to "Rules" and paste:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Helper functions
    function isSignedIn() {
      return request.auth != null;
    }
    
    function isOwner(userId) {
      return request.auth.uid == userId;
    }
    
    function isAdmin() {
      return isSignedIn() && get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
    }
    
    // Users collection
    match /users/{userId} {
      allow read: if isSignedIn();
      allow create: if isSignedIn();
      allow update: if isOwner(userId);
      allow delete: if isOwner(userId) || isAdmin();
    }
    
    // Mangas collection
    match /mangas/{mangaId} {
      allow read: if isSignedIn();
      allow create: if isAdmin();
      allow update: if isAdmin();
      allow delete: if isAdmin();
    }
    
    // User manga list
    match /userManga/{userMangaId} {
      allow read: if isSignedIn();
      allow create: if isSignedIn();
      allow update: if isSignedIn() && isOwner(resource.data.userId);
      allow delete: if isSignedIn() && isOwner(resource.data.userId);
    }
    
    // Reviews
    match /reviews/{reviewId} {
      allow read: if isSignedIn();
      allow create: if isSignedIn();
      allow update: if isSignedIn() && isOwner(resource.data.userId);
      allow delete: if isSignedIn() && (isOwner(resource.data.userId) || isAdmin());
    }
    
    // Activities
    match /activities/{activityId} {
      allow read: if isSignedIn();
      allow create: if isSignedIn();
      allow update: if isSignedIn();
      allow delete: if isSignedIn() && (isOwner(resource.data.userId) || isAdmin());
    }
    
    // Comments
    match /comments/{commentId} {
      allow read: if isSignedIn();
      allow create: if isSignedIn();
      allow update: if isSignedIn() && isOwner(resource.data.userId);
      allow delete: if isSignedIn() && (isOwner(resource.data.userId) || isAdmin());
    }
  }
}
```

### Step 6: Enable Firebase Storage

1. In Firebase Console, go to "Storage"
2. Click "Get started"
3. Use default security rules or configure as needed
4. Click "Done"

## 💻 Local Development Setup

### Step 1: Clone or Download Project

```bash
# If using git
git clone https://github.com/KolanoMadoru/Manga.git
cd Manga

# Or download and extract the ZIP file
```

### Step 2: Install Dependencies

```bash
npm install
```

This will install all required packages:
- react, react-dom
- react-router-dom
- zustand
- firebase
- tailwindcss
- vite
- and more...

### Step 3: Configure Environment Variables

1. Copy the example environment file:
```bash
cp .env.example .env
```

2. Open `.env` and add your Firebase configuration:
```env
VITE_FIREBASE_API_KEY=AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789012
VITE_FIREBASE_APP_ID=1:123456789012:web:abcdef123456
```

**Important**: Never commit your `.env` file to version control!

### Step 4: Start Development Server

```bash
npm run dev
```

The application will start at `http://localhost:3000`

### Step 5: Create Your First Admin User

1. Register a new account through the app
2. Go to Firebase Console → Firestore Database
3. Find your user document in the `users` collection
4. Edit the document and change `role` from `"user"` to `"admin"`
5. Refresh the app to see admin features

## 🧪 Testing Your Setup

### Test Authentication
1. Navigate to `/register`
2. Create a new account
3. Try logging in
4. Test Google OAuth login

### Test Manga Management (Admin Only)
1. Go to `/manga`
2. Click "Add Manga"
3. Fill in manga details
4. Save and verify it appears in the list

### Test Reading List
1. Click on a manga
2. Click "Add to List"
3. Update reading progress
4. Change status

### Test Social Features
1. Write a review
2. Like an activity
3. Comment on a review

### Test Statistics
1. Add multiple manga to your list
2. Rate some manga
3. Go to `/statistics`
4. Verify charts display correctly

## 🌐 Production Deployment

### Deploy to Vercel

1. Install Vercel CLI:
```bash
npm install -g vercel
```

2. Login to Vercel:
```bash
vercel login
```

3. Deploy:
```bash
npm run build
vercel --prod
```

4. Add environment variables:
   - Go to your project on Vercel
   - Settings → Environment Variables
   - Add all VITE_* variables from your .env

### Deploy to Firebase Hosting

1. Install Firebase CLI:
```bash
npm install -g firebase-tools
```

2. Login:
```bash
firebase login
```

3. Initialize Firebase Hosting:
```bash
firebase init hosting
```

Select:
- Use existing project
- Public directory: `dist`
- Single-page app: Yes
- GitHub deploys: Optional

4. Build and deploy:
```bash
npm run build
firebase deploy
```

### Deploy to Netlify

1. Build the project:
```bash
npm run build
```

2. Install Netlify CLI:
```bash
npm install -g netlify-cli
```

3. Deploy:
```bash
netlify deploy --prod --dir=dist
```

4. Add environment variables in Netlify dashboard

## 🔧 Troubleshooting

### Firebase Connection Issues

**Problem**: "Firebase: Error (auth/configuration-not-found)"

**Solution**: 
- Check your .env file has correct values
- Ensure all VITE_ prefixed variables
- Restart dev server after changing .env

### Build Errors

**Problem**: Module not found errors

**Solution**:
```bash
rm -rf node_modules package-lock.json
npm install
```

### Tailwind CSS Not Working

**Problem**: Styles not applied

**Solution**:
- Check `tailwind.config.js` content paths
- Verify `@tailwind` directives in `src/styles/index.css`
- Clear browser cache

### Dark Mode Issues

**Problem**: Dark mode not persisting

**Solution**:
- Check browser localStorage
- Verify `themeStore.js` persist configuration
- Clear localStorage and try again

### Firestore Permission Denied

**Problem**: Missing or insufficient permissions

**Solution**:
- Check Firestore security rules
- Verify user is authenticated
- Check if trying to access another user's data

## 📚 Additional Resources

- [React Documentation](https://react.dev/)
- [Firebase Documentation](https://firebase.google.com/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Vite Documentation](https://vitejs.dev/)
- [Zustand Documentation](https://github.com/pmndrs/zustand)

## 🆘 Getting Help

If you encounter issues:
1. Check this guide thoroughly
2. Review error messages in browser console
3. Check Firebase Console for errors
4. Search GitHub issues
5. Create a new issue with details

## ✅ Verification Checklist

Before considering your setup complete:

- [ ] Firebase project created
- [ ] Authentication enabled (Email + Google)
- [ ] Firestore database created
- [ ] Security rules configured
- [ ] Environment variables set
- [ ] Dependencies installed
- [ ] Dev server runs without errors
- [ ] Can register and login
- [ ] Can add manga (if admin)
- [ ] Can add manga to reading list
- [ ] Can view statistics
- [ ] Dark mode works
- [ ] Social features work
- [ ] Ready for production deployment

---

**Congratulations!** 🎉 Your MangaTracker application is now set up and ready to use!
