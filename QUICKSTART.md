# ⚡ Quick Start Guide - MangaTracker

Get up and running with MangaTracker in 5 minutes!

## 🎯 For End Users

### Creating an Account

1. **Visit the website**
   - Navigate to the MangaTracker homepage
   - Click "Get Started" or "Sign Up"

2. **Register**
   - **Option 1: Email/Password**
     - Enter your email
     - Create a password (min. 6 characters)
     - Choose a display name
     - Click "Create Account"
   
   - **Option 2: Google Sign-In**
     - Click "Sign up with Google"
     - Select your Google account
     - Authorize the app

3. **Welcome!**
   - You'll be redirected to your dashboard
   - Take a quick tour of the features

### Adding Your First Manga

1. **Browse Manga**
   - Click "Manga" in the navigation
   - Use search or scroll through the list
   - Filter by genre or status if needed

2. **Add to Your List**
   - Click on a manga to view details
   - Click "Add to List" button
   - Choose a status:
     - **Reading** - Currently reading
     - **Completed** - Finished reading
     - **On-Hold** - Paused temporarily
     - **Dropped** - Not continuing
     - **Plan to Read** - Want to read later

3. **Track Progress**
   - Update current chapter number
   - Change status as you progress
   - Add personal notes

### Writing Your First Review

1. **Navigate to a Manga**
   - Click on any manga from your list or the library

2. **Write Review**
   - Scroll to the Reviews section
   - Click "Write Review"
   - Rate the manga (1-10)
   - Share your thoughts
   - Click "Submit Review"

3. **Engage with Others**
   - Like other users' reviews
   - Comment on reviews
   - Follow users with similar tastes

### Using Social Features

1. **Follow Friends**
   - Find friends' profiles
   - Click "Follow" button
   - Their activity will appear in your feed

2. **Activity Feed**
   - Click "Social" in navigation
   - See what friends are reading
   - Like and comment on activities
   - Share your own progress

### Viewing Statistics

1. **Access Stats**
   - Click "Stats" in navigation

2. **Explore Your Data**
   - **Overview Cards**: Total manga, completed count, average rating
   - **Status Chart**: Pie chart of reading statuses
   - **Genre Chart**: Your top genres
   - **Rating Chart**: How you rate manga

3. **Track Progress**
   - Monitor your reading habits
   - Discover your preferences
   - Set personal goals

### Managing Your Profile

1. **Edit Profile**
   - Click your avatar (top right)
   - Select "Profile"
   - Click "Edit Profile"

2. **Update Information**
   - Change display name
   - Add a bio
   - Update profile picture (URL)
   - Save changes

## 🛠️ For Developers

### Quick Setup (5 minutes)

```bash
# 1. Clone repository
git clone https://github.com/KolanoMadoru/Manga.git
cd Manga

# 2. Install dependencies
npm install

# 3. Set up environment
cp .env.example .env
# Add your Firebase credentials to .env

# 4. Start development server
npm run dev
```

Visit `http://localhost:3000` and start coding!

### Quick Firebase Setup

1. **Create Project**
   - Go to [Firebase Console](https://console.firebase.google.com/)
   - Click "Add project"
   - Follow the wizard

2. **Enable Services**
   ```
   Authentication → Enable Email/Password & Google
   Firestore Database → Create database (production mode)
   ```

3. **Get Config**
   - Project Settings → Your apps → Web app
   - Copy configuration
   - Add to `.env` file

4. **Done!** 🎉

### Project Structure Overview

```
src/
├── components/     # Reusable UI components
├── pages/         # Route pages
├── store/         # Zustand state management
├── config/        # Firebase configuration
└── styles/        # Global styles
```

### Making Your First Change

1. **Create a branch**
   ```bash
   git checkout -b feature/my-feature
   ```

2. **Make changes**
   - Edit files in `src/`
   - Changes auto-reload in browser

3. **Test**
   ```bash
   npm run build  # Check if it builds
   ```

4. **Commit and push**
   ```bash
   git add .
   git commit -m "feat: add my feature"
   git push origin feature/my-feature
   ```

5. **Create Pull Request** on GitHub

## 📱 Common Tasks

### As a User

#### Update Reading Progress
```
1. Go to Dashboard
2. Find manga in "Currently Reading"
3. Click manga → Update chapter number
```

#### Rate a Manga
```
1. Open manga detail page
2. Scroll to reviews
3. Write review with rating
   OR
   Update rating in your list
```

#### Find New Manga
```
1. Click "Manga" in navbar
2. Use search bar
3. Apply filters (genre, status)
4. Click manga to view details
```

#### See Friends' Activity
```
1. Click "Social" in navbar
2. Follow users to see their activity
3. Like/comment on posts
```

### As a Developer

#### Add a New Component
```bash
# Create component file
touch src/components/MyComponent.jsx

# Use in another component
import MyComponent from '../components/MyComponent';
```

#### Add a New Page/Route
```javascript
// 1. Create page: src/pages/NewPage.jsx
const NewPage = () => {
  return <div>New Page</div>;
};

// 2. Add route in src/App.jsx
<Route path="/new-page" element={<NewPage />} />
```

#### Add New Store State
```javascript
// src/store/myStore.js
import { create } from 'zustand';

const useMyStore = create((set) => ({
  data: null,
  setData: (data) => set({ data }),
}));

export default useMyStore;
```

#### Query Firestore
```javascript
import { collection, getDocs } from 'firebase/firestore';
import { db } from './config/firebase';

const fetchData = async () => {
  const snapshot = await getDocs(collection(db, 'collectionName'));
  const data = snapshot.docs.map(doc => ({ 
    id: doc.id, 
    ...doc.data() 
  }));
  return data;
};
```

## 🆘 Troubleshooting

### User Issues

**Can't log in**
- ✅ Check email/password are correct
- ✅ Try password reset
- ✅ Clear browser cache
- ✅ Try different browser

**Manga not saving**
- ✅ Check internet connection
- ✅ Refresh the page
- ✅ Try logging out and back in

**Statistics not showing**
- ✅ Add manga to your list first
- ✅ Wait a moment for data to load
- ✅ Refresh the page

### Developer Issues

**Build errors**
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
npm run build
```

**Firebase connection issues**
- ✅ Check `.env` file exists
- ✅ Verify Firebase credentials
- ✅ Restart dev server after changing .env
- ✅ Check Firebase project is active

**Tailwind not working**
- ✅ Check `tailwind.config.js` content paths
- ✅ Verify imports in `src/styles/index.css`
- ✅ Clear browser cache

**Dark mode not persisting**
- ✅ Check browser localStorage
- ✅ Clear localStorage and try again
- ✅ Check browser settings

## 📚 Next Steps

### For Users
1. ✅ Complete your profile
2. ✅ Add 5+ manga to your list
3. ✅ Write your first review
4. ✅ Follow some users
5. ✅ Check out your statistics

### For Developers
1. ✅ Read [ARCHITECTURE.md](./ARCHITECTURE.md)
2. ✅ Check [SETUP_GUIDE.md](./SETUP_GUIDE.md)
3. ✅ Review [CONTRIBUTING.md](./CONTRIBUTING.md)
4. ✅ Explore the codebase
5. ✅ Make your first contribution

## 🎓 Learning Resources

### React
- [Official React Tutorial](https://react.dev/learn)
- [React Hooks Guide](https://react.dev/reference/react)

### Firebase
- [Firebase Web Get Started](https://firebase.google.com/docs/web/setup)
- [Firestore Quickstart](https://firebase.google.com/docs/firestore/quickstart)

### Tailwind CSS
- [Tailwind Documentation](https://tailwindcss.com/docs)
- [Tailwind UI Examples](https://tailwindui.com/components)

### Zustand
- [Zustand README](https://github.com/pmndrs/zustand)
- [Zustand Recipes](https://github.com/pmndrs/zustand#recipes)

## 💬 Get Help

- 📖 Read the full [README.md](./README.md)
- 🔧 Check [SETUP_GUIDE.md](./SETUP_GUIDE.md) for detailed setup
- 🏗️ Review [ARCHITECTURE.md](./ARCHITECTURE.md) for system design
- 💬 Ask in [GitHub Discussions](https://github.com/KolanoMadoru/Manga/discussions)
- 🐛 Report bugs in [Issues](https://github.com/KolanoMadoru/Manga/issues)

## ✅ Checklist

### User Onboarding
- [ ] Account created
- [ ] First manga added
- [ ] Progress tracked
- [ ] First review written
- [ ] User followed
- [ ] Statistics viewed
- [ ] Profile completed

### Developer Onboarding
- [ ] Repository cloned
- [ ] Dependencies installed
- [ ] Firebase configured
- [ ] Dev server running
- [ ] First component created
- [ ] Code built successfully
- [ ] Documentation read

---

**Congratulations!** 🎉 You're now ready to use MangaTracker like a pro!

Have questions? Check the docs or reach out to the community!
