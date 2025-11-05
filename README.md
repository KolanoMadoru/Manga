# 📚 MangaTracker - Manga Reading Tracker & Social Platform

[![Netlify Status](https://api.netlify.com/api/v1/badges/YOUR_SITE_ID/deploy-status)](https://app.netlify.com/sites/YOUR_SITE_NAME/deploys)

A comprehensive web application for tracking manga reading progress with social features built with React.js, Firebase, and Tailwind CSS.

**🚀 Ready for deployment to Netlify!** - See [NETLIFY_DEPLOY.md](./NETLIFY_DEPLOY.md) for instructions.

## ✨ Features

### 👥 User & Authentication
- ✅ Login, Register, and Password Reset
- ✅ Google OAuth authentication
- ✅ **Demo Account** - Try the app instantly without registration
- ✅ Role-based access (Admin & User)
- ✅ User profiles with avatars
- ✅ Profile editing

### 📚 Manga Database
- ✅ Add manga manually (title, author, genre, status, chapters, cover)
- ✅ Search and filter manga (genre, status, year)
- ✅ Detailed manga pages with synopsis, genres, and statistics
- ✅ View readers and average ratings

### 📒 Tracking & Reading Lists
- ✅ Multiple reading statuses:
  - Reading
  - Completed
  - On-Hold
  - Dropped
  - Plan to Read
- ✅ Chapter progress tracking
- ✅ Personal notes and ratings (1-10 scale)
- ✅ Status updates

### 🧑‍🤝‍🧑 Social Features
- ✅ Activity feed showing friends' reading updates
- ✅ Follow/unfollow users
- ✅ Like activities and reviews
- ✅ Comment on activities and reviews
- ✅ Write and share manga reviews
- ✅ View other users' reading lists

### 📊 Statistics & Dashboard
- ✅ Personal dashboard with reading overview
- ✅ Statistics page with charts:
  - Reading status distribution (Pie chart)
  - Top genres (Bar chart)
  - Rating distribution
- ✅ Total manga count, completion stats, and average rating

### 💬 Reviews & Ratings
- ✅ Write detailed reviews with ratings
- ✅ Like and comment on reviews
- ✅ View all reviews for a manga
- ✅ One review per manga per user

### 🎨 UI/UX
- ✅ Modern, responsive design (Mobile First)
- ✅ Dark & Light Mode with persistence
- ✅ Beautiful animations and transitions
- ✅ Tailwind CSS styling
- ✅ Custom color schemes
- ✅ Smooth loading states

## 🛠️ Tech Stack

### Frontend
- **React.js** (v19) - UI library
- **Vite** - Build tool and dev server
- **React Router** (v7) - Client-side routing
- **Zustand** - State management (lightweight alternative to Redux)
- **Tailwind CSS** (v4) - Utility-first CSS framework
- **Headless UI** - Accessible UI components
- **Lucide React** - Beautiful icon library
- **Recharts** - Charting library for statistics
- **date-fns** - Date manipulation

### Backend & Database
- **Firebase Authentication** - User authentication with email/password and Google OAuth
- **Cloud Firestore** - NoSQL database for real-time data
- **Firebase Storage** - File storage for images

## 📁 Project Structure

```
manga-tracker/
├── src/
│   ├── components/
│   │   ├── auth/              # Authentication components
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   └── ProtectedRoute.jsx
│   │   ├── layout/            # Layout components
│   │   │   ├── Navbar.jsx
│   │   │   └── Layout.jsx
│   │   ├── manga/             # Manga-related components
│   │   │   ├── MangaCard.jsx
│   │   │   └── AddMangaModal.jsx
│   │   ├── social/            # Social feature components
│   │   ├── dashboard/         # Dashboard components
│   │   └── common/            # Reusable components
│   ├── pages/                 # Page components
│   │   ├── Home.jsx
│   │   ├── Dashboard.jsx
│   │   ├── MangaList.jsx
│   │   ├── MangaDetail.jsx
│   │   ├── Social.jsx
│   │   ├── Statistics.jsx
│   │   └── Profile.jsx
│   ├── store/                 # Zustand stores
│   │   ├── authStore.js       # Authentication state
│   │   ├── mangaStore.js      # Manga data state
│   │   ├── socialStore.js     # Social features state
│   │   └── themeStore.js      # Theme state
│   ├── services/              # API services
│   ├── hooks/                 # Custom React hooks
│   ├── utils/                 # Utility functions
│   ├── config/                # Configuration files
│   │   └── firebase.js        # Firebase configuration
│   ├── styles/                # Global styles
│   │   └── index.css          # Tailwind imports & custom styles
│   ├── App.jsx                # Main app component
│   └── main.jsx               # Entry point
├── public/                    # Static assets
├── index.html                 # HTML template
├── vite.config.js             # Vite configuration
├── tailwind.config.js         # Tailwind configuration
├── postcss.config.js          # PostCSS configuration
├── package.json               # Dependencies
├── .env.example               # Environment variables example
└── README.md                  # This file
```

## 🗄️ Database Structure (Firestore)

### Collections

#### `users`
```javascript
{
  uid: string,
  email: string,
  displayName: string,
  photoURL: string,
  role: 'admin' | 'user',
  bio: string,
  createdAt: timestamp,
  updatedAt: timestamp,
  stats: {
    totalManga: number,
    reading: number,
    completed: number,
    onHold: number,
    dropped: number,
    planToRead: number
  },
  following: [userId],
  followers: [userId]
}
```

#### `mangas`
```javascript
{
  id: string,
  title: string,
  author: string,
  synopsis: string,
  genres: [string],
  status: 'ongoing' | 'completed',
  totalChapters: number,
  year: number,
  coverImage: string,
  createdBy: userId,
  createdAt: timestamp,
  updatedAt: timestamp,
  totalReaders: number,
  averageRating: number
}
```

#### `userManga`
```javascript
{
  id: string,
  userId: string,
  mangaId: string,
  mangaTitle: string,
  mangaCover: string,
  status: 'reading' | 'completed' | 'onHold' | 'dropped' | 'planToRead',
  currentChapter: number,
  rating: number,
  notes: string,
  startedAt: timestamp,
  completedAt: timestamp,
  createdAt: timestamp,
  updatedAt: timestamp
}
```

#### `reviews`
```javascript
{
  id: string,
  userId: string,
  userName: string,
  userPhoto: string,
  mangaId: string,
  mangaTitle: string,
  rating: number,
  content: string,
  likes: [userId],
  commentsCount: number,
  createdAt: timestamp,
  updatedAt: timestamp
}
```

#### `activities`
```javascript
{
  id: string,
  userId: string,
  userName: string,
  userPhoto: string,
  type: 'completed' | 'reading' | 'review' | 'rating',
  mangaId: string,
  mangaTitle: string,
  rating: number,
  reviewContent: string,
  likes: [userId],
  commentsCount: number,
  createdAt: timestamp
}
```

#### `comments`
```javascript
{
  id: string,
  targetId: string,
  targetType: 'activity' | 'review',
  userId: string,
  userName: string,
  userPhoto: string,
  content: string,
  createdAt: timestamp
}
```

## 🚀 Getting Started

### 🎮 Try Demo Account (No Setup Required!)

Want to test the app immediately? Use the demo account:

**Email:** demo@mangatracker.com  
**Password:** demo123456

Or click **"Try Demo Account"** button on the login page!

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- Firebase account

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/KolanoMadoru/Manga.git
cd Manga
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up Firebase**
   - Go to [Firebase Console](https://console.firebase.google.com/)
   - Create a new project
   - Enable Authentication (Email/Password and Google)
   - Create a Firestore database
   - Enable Firebase Storage
   - Copy your Firebase configuration

4. **Configure environment variables**
   - Copy `.env.example` to `.env`
   - Add your Firebase configuration:
```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

5. **Create Demo Account (Optional)**
```bash
node scripts/create-demo-account.js
```
See [DEMO_ACCOUNT.md](./DEMO_ACCOUNT.md) for more details.

6. **Run the development server**
```bash
npm run dev
```

The app will be available at `http://localhost:3000`

### Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

### Preview Production Build

```bash
npm run preview
```

## 📐 System Architecture

### State Management
The application uses **Zustand** for state management, chosen for its simplicity and performance:

- **authStore** - Manages user authentication and profile
- **mangaStore** - Manages manga data and user lists
- **socialStore** - Manages activities, reviews, and comments
- **themeStore** - Manages dark/light theme preference

### Authentication Flow
1. User registers or logs in via email/password or Google OAuth
2. Firebase Authentication creates/verifies the user
3. User profile is created/fetched from Firestore
4. Auth state is synced across the app via Zustand
5. Protected routes check authentication status

### Data Flow
1. User actions trigger Zustand store methods
2. Store methods interact with Firebase services
3. Firestore real-time listeners update local state
4. UI components react to state changes
5. Optimistic updates provide instant feedback

## 🎨 UI/UX Design Philosophy

- **Mobile-First**: Designed for mobile devices first, then scaled up
- **Dark Mode**: Fully supports dark mode with smooth transitions
- **Accessibility**: Semantic HTML and ARIA labels
- **Performance**: Lazy loading and code splitting
- **Animations**: Smooth transitions and micro-interactions
- **Consistency**: Unified design system with Tailwind CSS

## 🔐 Security

- Firebase Authentication handles user credentials securely
- Firestore security rules protect user data
- Role-based access control for admin features
- XSS protection via React's built-in escaping
- CSRF protection via Firebase SDK

## 🚀 Deployment

### Deploy to Netlify (Recommended)

The easiest way to deploy this application. Netlify configuration is already included!

1. **Quick Deploy**:
   - Push your code to GitHub/GitLab
   - Connect your repository to [Netlify](https://app.netlify.com)
   - Netlify will auto-detect settings from `netlify.toml`
   - Add environment variables in Netlify dashboard
   - Click "Deploy site" ✨

2. **Environment Variables**: Add these in Netlify dashboard under Site settings → Environment variables:
   ```
   VITE_FIREBASE_API_KEY
   VITE_FIREBASE_AUTH_DOMAIN
   VITE_FIREBASE_PROJECT_ID
   VITE_FIREBASE_STORAGE_BUCKET
   VITE_FIREBASE_MESSAGING_SENDER_ID
   VITE_FIREBASE_APP_ID
   ```

3. **Important**: Add your Netlify domain to Firebase authorized domains:
   - Firebase Console → Authentication → Settings → Authorized domains
   - Add: `your-site.netlify.app`

4. **After deployment, trigger a new deploy** to ensure environment variables are loaded.

📖 **Full Guide**: See [NETLIFY_DEPLOY.md](./NETLIFY_DEPLOY.md) for detailed instructions including CLI deployment.

### 🚨 Troubleshooting Deployment Issues

**Authentication not working after deployment?** This is a common issue! Check these guides:

- 🔍 **Quick Fix Guide**: [QUICK_DEBUG_GUIDE.md](./QUICK_DEBUG_GUIDE.md) - Fast solutions for 95% of cases
- 📖 **Complete Guide**: [DEPLOYMENT_TROUBLESHOOTING.md](./DEPLOYMENT_TROUBLESHOOTING.md) - Comprehensive troubleshooting

**Common causes:**
1. ❌ Environment variables not set in Netlify Dashboard
2. ❌ Netlify domain not added to Firebase Authorized Domains
3. ❌ Forgot to redeploy after adding environment variables
4. ❌ Demo account not created in production Firebase

**Helpful commands:**
```bash
# Validate Firebase configuration locally
npm run check-config

# Create demo account
npm run setup-demo
```

The app includes a **visual Config Checker** that appears in production when configuration issues are detected. Look for the yellow "Config Check" button in the bottom-right corner!

### Deploy to Vercel

1. Install Vercel CLI:
```bash
npm install -g vercel
```

2. Deploy:
```bash
vercel
```

3. Add environment variables in Vercel dashboard

### Deploy to Firebase Hosting

1. Install Firebase CLI:
```bash
npm install -g firebase-tools
```

2. Login and initialize:
```bash
firebase login
firebase init hosting
```

3. Build and deploy:
```bash
npm run build
firebase deploy
```

## 🎯 Future Enhancements

- [ ] Import manga from MangaDex API
- [ ] Push notifications for chapter updates
- [ ] Reading history and analytics
- [ ] Manga recommendations based on reading history
- [ ] Community discussions and forums
- [ ] Reading goals and challenges
- [ ] Export reading list (CSV, JSON)
- [ ] Advanced search with filters
- [ ] User badges and achievements
- [ ] Integration with MAL (MyAnimeList)

## 📖 API Documentation

### MangaDex API (Optional Enhancement)
The application is ready to integrate with MangaDex API for importing manga data:

```javascript
// Example API call
const response = await fetch('https://api.mangadex.org/manga?title=your-search');
const data = await response.json();
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📝 License

This project is licensed under the ISC License.

## 👨‍💻 Developer

Created with ❤️ by KolanoMadoru

## 🙏 Acknowledgments

- [React.js](https://react.dev/)
- [Firebase](https://firebase.google.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Zustand](https://github.com/pmndrs/zustand)
- [Lucide Icons](https://lucide.dev/)
- [Recharts](https://recharts.org/)

---

**Note**: This is a comprehensive manga tracking application with authentication, database management, social features, and statistics. Make sure to configure Firebase properly before running the application.

For any questions or issues, please open an issue on GitHub.
