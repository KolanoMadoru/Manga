# 🏗️ Architecture Documentation - MangaTracker

This document provides a comprehensive overview of the MangaTracker application architecture, design decisions, and system flow.

## 📐 High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        User Interface                        │
│                     (React Components)                       │
└──────────────────────────┬──────────────────────────────────┘
                           │
┌──────────────────────────▼──────────────────────────────────┐
│                    State Management                          │
│                       (Zustand)                              │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐  │
│  │   Auth   │  │   Manga  │  │  Social  │  │   Theme  │  │
│  │  Store   │  │   Store  │  │   Store  │  │   Store  │  │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘  │
└──────────────────────────┬──────────────────────────────────┘
                           │
┌──────────────────────────▼──────────────────────────────────┐
│                    Firebase Services                         │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │     Auth     │  │  Firestore   │  │   Storage    │     │
│  │              │  │   Database   │  │              │     │
│  └──────────────┘  └──────────────┘  └──────────────┘     │
└─────────────────────────────────────────────────────────────┘
```

## 🎯 Design Philosophy

### 1. Component-Based Architecture
- **Atomic Design**: Components organized from simple to complex
- **Separation of Concerns**: Logic separated from presentation
- **Reusability**: Shared components for common UI patterns
- **Composition**: Complex UIs built from simple components

### 2. State Management Strategy
Using **Zustand** for its simplicity and performance:
- **Minimal boilerplate** compared to Redux
- **No providers** needed
- **Built-in persist** for localStorage
- **TypeScript ready** (for future enhancement)
- **Async actions** handled naturally

### 3. Data Flow
```
User Action → Zustand Action → Firebase API → Firestore
                                              ↓
User Interface ← Zustand State ← Real-time Listener
```

## 🗂️ Directory Structure Explained

```
src/
├── components/          # Reusable UI components
│   ├── auth/           # Authentication-specific components
│   ├── layout/         # Layout components (Navbar, Layout)
│   ├── manga/          # Manga-related components
│   ├── social/         # Social feature components
│   ├── dashboard/      # Dashboard-specific components
│   └── common/         # Shared, generic components
│
├── pages/              # Top-level page components (routes)
│   ├── Home.jsx
│   ├── Dashboard.jsx
│   ├── MangaList.jsx
│   ├── MangaDetail.jsx
│   ├── Social.jsx
│   ├── Statistics.jsx
│   └── Profile.jsx
│
├── store/              # Zustand state stores
│   ├── authStore.js    # Authentication & user state
│   ├── mangaStore.js   # Manga data & user lists
│   ├── socialStore.js  # Activities, reviews, comments
│   └── themeStore.js   # UI theme preferences
│
├── services/           # API service layers (future)
│   └── mangadex.js     # MangaDex API integration
│
├── hooks/              # Custom React hooks (future)
│   └── useManga.js     # Manga-related hooks
│
├── utils/              # Utility functions (future)
│   └── helpers.js      # Helper functions
│
├── config/             # Configuration files
│   └── firebase.js     # Firebase initialization
│
└── styles/             # Global styles
    └── index.css       # Tailwind imports & custom styles
```

## 🔄 Data Flow Patterns

### Authentication Flow

```
┌─────────────┐
│   User      │
│ Registers   │
└──────┬──────┘
       │
       ▼
┌─────────────────────────────────────┐
│  authStore.register()               │
│  - createUserWithEmailAndPassword() │
│  - updateProfile()                  │
│  - createUserProfile()              │
└──────┬──────────────────────────────┘
       │
       ▼
┌─────────────────────────────────┐
│  Firebase Authentication        │
│  - Creates user account         │
│  - Returns user credentials     │
└──────┬──────────────────────────┘
       │
       ▼
┌─────────────────────────────────┐
│  Firestore                      │
│  - Saves user profile           │
│  - Sets default stats           │
└──────┬──────────────────────────┘
       │
       ▼
┌─────────────────────────────────┐
│  authStore updates              │
│  - Sets user state              │
│  - Sets userProfile state       │
└──────┬──────────────────────────┘
       │
       ▼
┌─────────────────────────────────┐
│  UI Updates                     │
│  - Redirects to dashboard       │
│  - Shows user interface         │
└─────────────────────────────────┘
```

### Manga Tracking Flow

```
User adds manga to list
        ↓
mangaStore.addToUserList()
        ↓
Creates userManga document in Firestore
        ↓
Updates manga statistics (totalReaders)
        ↓
Creates activity for social feed
        ↓
Local state updates
        ↓
UI re-renders with new data
```

### Social Interaction Flow

```
User writes review
        ↓
socialStore.addReview()
        ↓
Validates (one review per manga)
        ↓
Creates review document
        ↓
Creates activity document
        ↓
Updates local state
        ↓
UI shows new review + activity
```

## 🗄️ Database Schema Design

### Why Firestore?

**Pros:**
- Real-time updates
- Scalable
- No server management
- Built-in security rules
- Offline support
- Easy integration with Firebase Auth

**Cons:**
- Query limitations
- Cost at scale
- No joins

### Collection Design

#### users
**Purpose**: Store user profiles and metadata

**Key Fields**:
- `uid`: Unique identifier (matches Firebase Auth)
- `stats`: Embedded document for quick access
- `following/followers`: Arrays for social graph

**Why Arrays for following/followers?**
- Fast to check membership
- Limited to 100 connections (reasonable for MVP)
- Could migrate to subcollection for scaling

#### mangas
**Purpose**: Central manga database

**Why Separate Collection?**
- Single source of truth
- Reduces data duplication
- Easy to update manga info

#### userManga
**Purpose**: Track user's reading progress

**Why Separate from manga?**
- User-specific data
- Allows multiple users to track same manga
- Easier to query user's specific list

**Composite Key Pattern**:
```javascript
query(userMangaRef, 
  where('userId', '==', userId),
  where('mangaId', '==', mangaId)
)
```

#### reviews & activities
**Purpose**: Social features

**Denormalization Strategy**:
- Store `userName` and `userPhoto` directly
- Trade-off: Slight data duplication for read performance
- Benefit: No need to join with users collection

### Indexing Strategy

Firestore automatically creates single-field indexes. Composite indexes needed:

```
Collection: userManga
Fields: userId (Ascending), status (Ascending)

Collection: activities
Fields: userId (Ascending), createdAt (Descending)

Collection: reviews
Fields: mangaId (Ascending), createdAt (Descending)
```

## 🎨 UI/UX Architecture

### Component Hierarchy

```
App
├── Router
    ├── Layout
    │   ├── Navbar
    │   └── Outlet
    │       ├── Home
    │       ├── Dashboard
    │       ├── MangaList
    │       │   ├── MangaCard (multiple)
    │       │   └── AddMangaModal
    │       ├── MangaDetail
    │       ├── Social
    │       ├── Statistics
    │       └── Profile
    └── Auth Pages
        ├── Login
        └── Register
```

### Styling Architecture

**Tailwind CSS Layers**:

1. **Base Layer**: Global resets and defaults
2. **Components Layer**: Reusable component classes
   - `.btn-primary`
   - `.btn-secondary`
   - `.input-field`
   - `.card`
   - `.manga-card`
3. **Utilities Layer**: Atomic utility classes

**Dark Mode Implementation**:
- Class-based strategy (`dark:` prefix)
- Controlled by `themeStore`
- Persisted in localStorage
- Applied to `<html>` element

### Responsive Design Strategy

**Breakpoints** (Tailwind defaults):
- `sm`: 640px
- `md`: 768px
- `lg`: 1024px
- `xl`: 1280px
- `2xl`: 1536px

**Mobile-First Approach**:
```jsx
// Base styles for mobile
<div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4">
  {/* Scales from 1 → 3 → 4 columns */}
</div>
```

## 🔐 Security Architecture

### Authentication Security

**Firebase Auth Handles**:
- Password hashing (bcrypt)
- Session management
- Token refresh
- CSRF protection

**App-Level Security**:
- Protected routes via `ProtectedRoute` component
- Auth state checked before rendering
- Redirect to login if not authenticated

### Firestore Security

**Security Rules Pattern**:
```javascript
// Helper functions for reusability
function isSignedIn() {
  return request.auth != null;
}

function isOwner(userId) {
  return request.auth.uid == userId;
}

// Apply to collections
match /userManga/{docId} {
  allow update: if isSignedIn() && isOwner(resource.data.userId);
}
```

**Principle of Least Privilege**:
- Users can only read their own sensitive data
- Write operations restricted to owners
- Admin role checked via Firestore lookup

### XSS Protection

**React's Built-in Protection**:
- Automatic escaping of text content
- Use `dangerouslySetInnerHTML` only when necessary

**User Input Sanitization**:
- Review content stored as plain text
- No HTML rendering from user input
- URLs validated before rendering

## 🚀 Performance Optimizations

### Current Optimizations

1. **Code Splitting**: React Router handles route-based splitting
2. **Lazy Loading**: Images load on demand
3. **Optimistic Updates**: UI updates before server confirmation
4. **Memoization**: React's built-in memoization for re-renders
5. **Firestore Limits**: Queries limited to 50 documents

### Future Optimizations

1. **React.lazy**: Dynamic imports for large components
2. **Virtual Scrolling**: For long manga lists
3. **Image Optimization**: WebP format, lazy loading
4. **CDN**: Serve static assets from CDN
5. **Service Worker**: Offline support with PWA

## 📊 Scalability Considerations

### Current Limitations

1. **Following/Followers**: Limited to 100 each (Firestore array limit)
2. **Activity Feed**: Limited to 10 users at once (Firestore 'in' query limit)
3. **No Pagination**: Loads all data at once

### Scaling Strategies

**For 1,000 users**:
- Current architecture sufficient
- Add pagination to manga list
- Implement infinite scroll

**For 10,000 users**:
- Move following/followers to subcollections
- Implement cursor-based pagination
- Add caching layer (Redis)
- Use Cloud Functions for aggregations

**For 100,000+ users**:
- Consider dedicated backend (Node.js/Express)
- Use PostgreSQL for complex queries
- Implement microservices architecture
- Add message queue (RabbitMQ/Kafka)
- CDN for static assets

## 🔄 State Management Deep Dive

### Why Zustand over Redux?

**Zustand Advantages**:
- 75% less boilerplate
- No context providers needed
- Built-in persist middleware
- Simpler async actions
- Better TypeScript support
- Smaller bundle size (1KB)

**Comparison**:
```javascript
// Redux
const mapStateToProps = (state) => ({ user: state.user });
const mapDispatchToProps = { login };
export default connect(mapStateToProps, mapDispatchToProps)(Component);

// Zustand
const { user, login } = useAuthStore();
```

### Store Architecture

Each store follows this pattern:

```javascript
create((set, get) => ({
  // State
  data: [],
  loading: false,
  error: null,
  
  // Sync actions
  setData: (data) => set({ data }),
  
  // Async actions
  fetchData: async () => {
    set({ loading: true, error: null });
    try {
      const data = await api.get();
      set({ data, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  }
}))
```

### State Persistence

**themeStore** uses persist middleware:
```javascript
persist(
  (set) => ({ /* store */ }),
  { name: 'theme-storage' }
)
```

**Why not persist all stores?**
- Auth state managed by Firebase
- Manga data should be fresh
- Social data updates frequently
- Theme is user preference (persist)

## 🧪 Testing Strategy (Future)

### Unit Tests
- Store actions
- Utility functions
- Custom hooks

### Integration Tests
- Component interactions
- Store integration
- Firebase interactions

### E2E Tests
- User flows (register → login → add manga)
- Critical paths
- Cross-browser testing

**Recommended Tools**:
- Vitest (unit tests)
- React Testing Library (component tests)
- Cypress (E2E tests)

## 📈 Monitoring & Analytics (Future)

### Error Tracking
- Firebase Crashlytics
- Sentry integration

### Analytics
- Firebase Analytics
- User behavior tracking
- Feature usage stats

### Performance Monitoring
- Firebase Performance Monitoring
- Core Web Vitals
- Bundle size tracking

## 🔮 Future Architecture Enhancements

### Phase 1: Immediate Improvements
- [ ] Add pagination
- [ ] Implement search debouncing
- [ ] Add loading skeletons
- [ ] Error boundaries

### Phase 2: Feature Additions
- [ ] Real-time notifications
- [ ] WebSocket connections
- [ ] PWA capabilities
- [ ] Offline support

### Phase 3: Scale Preparation
- [ ] Migrate to subcollections for social graph
- [ ] Add caching layer
- [ ] Implement rate limiting
- [ ] Add monitoring

### Phase 4: Advanced Features
- [ ] GraphQL API
- [ ] Microservices architecture
- [ ] Machine learning recommendations
- [ ] Advanced analytics

## 📝 Design Decisions Log

### Why React Router over Next.js?
- Simpler setup for SPA
- No SSR needed initially
- Smaller bundle
- Easier Firebase integration

### Why Firebase over Custom Backend?
- Faster development
- No server management
- Built-in auth
- Real-time capabilities
- Scalable out of the box

### Why Tailwind over CSS-in-JS?
- Better performance (no runtime)
- Smaller bundle
- Better DX with IntelliSense
- Easier to maintain
- Dark mode built-in

### Why Firestore over PostgreSQL?
- Real-time updates crucial for social features
- Simpler to set up and scale
- Better offline support
- No need for complex joins initially
- Perfect for document-based data

---

This architecture is designed to be:
- **Scalable**: Can grow with user base
- **Maintainable**: Clear separation of concerns
- **Performant**: Optimized for speed
- **Secure**: Multiple layers of security
- **Developer-Friendly**: Easy to understand and extend
