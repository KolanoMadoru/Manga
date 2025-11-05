# MangaShelf - Setup & Deployment Guide

![MangaShelf](https://img.shields.io/badge/React-19.2.0-blue) ![Firebase](https://img.shields.io/badge/Firebase-12.5.0-orange) ![Tailwind](https://img.shields.io/badge/TailwindCSS-3.4.18-cyan)

## 📖 Overview

MangaShelf is a comprehensive manga tracking application built with React.js where you and your friends can track manga reading progress, share reviews, and interact with each other's lists.

## 🚀 Features

### ✅ Authentication & User Management
- ✅ Email/Password Registration & Login
- ✅ Google OAuth Authentication
- ✅ **Two Seed Users (Rahman & Rivai)** - Auto-created for easy testing
- ✅ User profiles with avatars and bio
- ✅ Profile viewing and editing

### 📚 Manga Management
- ✅ Add manga with cover images, genres, authors
- ✅ Track reading status (Reading, Completed, On-Hold, Dropped, Plan to Read)
- ✅ Chapter progress tracking
- ✅ Personal ratings and notes
- ✅ View all manga, your manga, and friends' manga

### ⭐ Social Features
- ✅ Bookmark manga from other users
- ✅ Review and rate manga
- ✅ Comment on reviews
- ✅ Like comments
- ✅ Activity feed with real-time updates
- ✅ Follow/unfollow friends
- ✅ @mention friends in comments

### 🔍 Search & Filter
- ✅ Search by title and author
- ✅ Filter by genre, status, rating
- ✅ Filter bookmarked manga

### 📊 Statistics & Analytics
- ✅ Total manga read
- ✅ Genre distribution
- ✅ Reading progress percentage
- ✅ Top 5 bookmarked manga from friends

### 🎨 UI/UX
- ✅ Dark Mode & Light Mode
- ✅ Fully responsive (Mobile, Tablet, Desktop)
- ✅ Smooth animations and transitions
- ✅ Infinite scroll / Pagination support

## 🛠️ Technology Stack

| Category | Technology |
|----------|-----------|
| **Frontend** | React.js 19.2.0 + Vite |
| **Routing** | React Router 7.9.5 |
| **State Management** | Zustand 5.0.8 |
| **Styling** | Tailwind CSS 3.4.18 |
| **UI Components** | Headless UI + Lucide React Icons |
| **Charts** | Recharts 3.3.0 |
| **Backend** | Firebase (Auth, Firestore, Storage) |
| **Build Tool** | Vite 7.1.12 |

## 📦 Installation

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Firebase project (free tier is sufficient)

### Step 1: Clone the Repository
```bash
git clone <your-repo-url>
cd manga-tracker
```

### Step 2: Install Dependencies
```bash
npm install
```

### Step 3: Firebase Setup

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project or use an existing one
3. Enable **Authentication** (Email/Password and Google providers)
4. Enable **Firestore Database** (Start in test mode for development)
5. Enable **Storage** (Start in test mode for development)
6. Get your Firebase configuration from Project Settings > General

### Step 4: Environment Variables

Create a `.env` file in the root directory:

```env
VITE_FIREBASE_API_KEY=your_api_key_here
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain_here
VITE_FIREBASE_PROJECT_ID=your_project_id_here
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket_here
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id_here
VITE_FIREBASE_APP_ID=your_app_id_here
```

⚠️ **Important**: All environment variables must be prefixed with `VITE_` for Vite to expose them.

### Step 5: Seed Initial Users

Run the seed script to create Rahman and Rivai accounts:

```bash
npm run seed-users
```

This will create:
- **Rahman** - rahman@mangashelf.com / rahman123
- **Rivai** - rivai@mangashelf.com / rivai123

### Step 6: Run Development Server

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

## 👥 Default User Accounts

After running the seed script, you can login with:

| Username | Email | Password |
|----------|-------|----------|
| **Rahman** | rahman@mangashelf.com | rahman123 |
| **Rivai** | rivai@mangashelf.com | rivai123 |

Or use the **Quick Login** buttons on the login page!

## 🚀 Deployment to Netlify

### Method 1: Manual Deployment

1. **Build the project:**
```bash
npm run build
```

2. **Install Netlify CLI:**
```bash
npm install -g netlify-cli
```

3. **Deploy:**
```bash
netlify deploy --prod
```

4. **Set environment variables in Netlify:**
   - Go to Site settings > Environment variables
   - Add all `VITE_*` variables from your `.env` file

### Method 2: GitHub Integration (Recommended)

1. **Push your code to GitHub**

2. **Connect to Netlify:**
   - Go to [Netlify](https://netlify.com)
   - Click "New site from Git"
   - Select your repository
   - Configure build settings:
     - **Build command:** `npm run build`
     - **Publish directory:** `dist`

3. **Add Environment Variables:**
   - Go to Site settings > Environment variables
   - Add all Firebase config variables

4. **Deploy!**
   - Every push to main branch will trigger automatic deployment

### Netlify Configuration

The project includes `netlify.toml` for proper SPA routing:

```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

## 📁 Project Structure

```
manga-tracker/
├── public/              # Static assets
├── scripts/             # Utility scripts
│   ├── seed-users.js    # Create Rahman & Rivai accounts
│   └── check-firebase-config.js
├── src/
│   ├── components/      # React components
│   │   ├── auth/        # Login, Register, ProtectedRoute
│   │   ├── common/      # Reusable components
│   │   ├── layout/      # Layout components (Navbar, Footer)
│   │   └── manga/       # Manga-related components
│   ├── pages/           # Route pages
│   │   ├── Home.jsx
│   │   ├── Dashboard.jsx
│   │   ├── MangaList.jsx
│   │   ├── MangaDetail.jsx
│   │   ├── Social.jsx
│   │   ├── Statistics.jsx
│   │   └── Profile.jsx
│   ├── store/           # Zustand state management
│   │   ├── authStore.js
│   │   ├── mangaStore.js
│   │   ├── socialStore.js
│   │   └── themeStore.js
│   ├── config/
│   │   └── firebase.js  # Firebase configuration
│   ├── styles/          # Global styles
│   ├── App.jsx          # Main app component
│   └── main.jsx         # Entry point
├── .env                 # Environment variables (create this)
├── .env.example         # Example environment file
├── netlify.toml         # Netlify configuration
├── package.json
├── vite.config.js
└── tailwind.config.cjs
```

## 🔥 Firebase Collections

The app uses the following Firestore collections:

### `users`
```javascript
{
  uid: string,
  email: string,
  displayName: string,
  photoURL: string | null,
  bio: string,
  role: 'user' | 'admin',
  stats: {
    totalManga: number,
    reading: number,
    completed: number,
    onHold: number,
    dropped: number,
    planToRead: number
  },
  following: [userId],
  followers: [userId],
  createdAt: timestamp,
  updatedAt: timestamp
}
```

### `mangas`
```javascript
{
  title: string,
  author: string,
  genres: [string],
  status: 'ongoing' | 'completed',
  synopsis: string,
  coverImage: string,
  totalChapters: number,
  totalReaders: number,
  averageRating: number,
  createdBy: userId,
  createdAt: timestamp,
  updatedAt: timestamp
}
```

### `userManga`
```javascript
{
  userId: string,
  mangaId: string,
  status: 'reading' | 'completed' | 'onHold' | 'dropped' | 'planToRead',
  currentChapter: number,
  rating: number,
  notes: string,
  startedAt: timestamp,
  completedAt: timestamp | null,
  updatedAt: timestamp
}
```

### `reviews`
```javascript
{
  userId: string,
  mangaId: string,
  userName: string,
  userPhoto: string,
  rating: number,
  content: string,
  likes: [userId],
  createdAt: timestamp,
  updatedAt: timestamp
}
```

### `activities`
```javascript
{
  userId: string,
  userName: string,
  userPhoto: string,
  type: 'reading' | 'completed' | 'review' | 'rating',
  mangaId: string,
  mangaTitle: string,
  content: string,
  createdAt: timestamp
}
```

### `comments`
```javascript
{
  reviewId: string,
  userId: string,
  userName: string,
  userPhoto: string,
  content: string,
  mentions: [userId],
  likes: [userId],
  createdAt: timestamp,
  updatedAt: timestamp
}
```

## 🧪 Testing

The project is set up for testing with Jest and React Testing Library (tests to be implemented):

```bash
npm run test
```

## 📝 Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run seed-users` | Create Rahman & Rivai seed users |
| `npm run check-config` | Check Firebase configuration |

## 🤝 Team Collaboration Guide

### For New Team Members

1. **Clone and setup:**
```bash
git clone <repo-url>
cd manga-tracker
npm install
```

2. **Get `.env` file from team lead** or create your own Firebase project

3. **Run seed users:**
```bash
npm run seed-users
```

4. **Start developing:**
```bash
npm run dev
```

### Git Workflow

```bash
# Create feature branch
git checkout -b feature/your-feature-name

# Make changes and commit
git add .
git commit -m "feat: add new feature"

# Push and create PR
git push origin feature/your-feature-name
```

### Code Style

- Use functional components with hooks
- Follow existing naming conventions
- Use Tailwind utility classes for styling
- Keep components small and focused
- Use Zustand for state management

## 🐛 Troubleshooting

### Firebase Auth Error
- Check if Email/Password and Google OAuth are enabled in Firebase Console
- Verify environment variables are correct

### Build Errors
- Clear node_modules: `rm -rf node_modules && npm install`
- Clear Vite cache: `rm -rf .vite && npm run dev`

### Netlify Deployment Issues
- Ensure all environment variables are set in Netlify
- Check build logs for specific errors
- Verify `netlify.toml` exists in root

## 📄 License

ISC

## 🙏 Acknowledgments

- React.js team
- Firebase team
- Tailwind CSS team
- Open source community

---

**Made with ❤️ for manga enthusiasts**

For questions or issues, please open an issue on GitHub.
