# 🤝 Contributing to MangaTracker

Thank you for your interest in contributing to MangaTracker! This document provides guidelines and instructions for contributing to the project.

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Coding Standards](#coding-standards)
- [Commit Messages](#commit-messages)
- [Pull Request Process](#pull-request-process)
- [Testing](#testing)

## 📜 Code of Conduct

- Be respectful and inclusive
- Welcome newcomers and be patient
- Focus on constructive criticism
- Accept feedback gracefully
- Put the community first

## 🚀 Getting Started

### Prerequisites

- Node.js (v18+)
- npm or yarn
- Git
- Firebase account (for testing)
- Code editor (VS Code recommended)

### Setup Development Environment

1. **Fork the repository**
   ```bash
   # Click "Fork" on GitHub, then clone your fork
   git clone https://github.com/YOUR_USERNAME/Manga.git
   cd Manga
   ```

2. **Add upstream remote**
   ```bash
   git remote add upstream https://github.com/KolanoMadoru/Manga.git
   ```

3. **Install dependencies**
   ```bash
   npm install
   ```

4. **Set up environment variables**
   ```bash
   cp .env.example .env
   # Add your Firebase credentials
   ```

5. **Start development server**
   ```bash
   npm run dev
   ```

## 🔄 Development Workflow

### Branching Strategy

- `main` - Production-ready code
- `develop` - Integration branch for features
- `feature/*` - New features
- `bugfix/*` - Bug fixes
- `hotfix/*` - Urgent production fixes

### Creating a Feature Branch

```bash
# Update your main branch
git checkout main
git pull upstream main

# Create feature branch
git checkout -b feature/your-feature-name

# Work on your feature...
git add .
git commit -m "feat: add your feature"

# Push to your fork
git push origin feature/your-feature-name
```

## 💻 Coding Standards

### JavaScript/React

#### File Naming
- Components: `PascalCase.jsx` (e.g., `MangaCard.jsx`)
- Utilities: `camelCase.js` (e.g., `helpers.js`)
- Stores: `camelCaseStore.js` (e.g., `authStore.js`)
- Constants: `UPPER_SNAKE_CASE.js` (e.g., `API_ENDPOINTS.js`)

#### Component Structure
```jsx
import { useState, useEffect } from 'react';
import useStore from '../store/someStore';

// Component should do one thing well
const ComponentName = ({ prop1, prop2 }) => {
  // 1. Hooks
  const [state, setState] = useState(null);
  const { data, actions } = useStore();

  // 2. Effects
  useEffect(() => {
    // Effect logic
  }, [dependencies]);

  // 3. Event handlers
  const handleClick = () => {
    // Handler logic
  };

  // 4. Early returns
  if (!data) return <Loading />;

  // 5. Render
  return (
    <div className="component-container">
      {/* JSX */}
    </div>
  );
};

export default ComponentName;
```

#### Naming Conventions
- Components: `PascalCase`
- Functions: `camelCase`
- Variables: `camelCase`
- Constants: `UPPER_SNAKE_CASE`
- CSS classes: `kebab-case` or Tailwind utilities
- Boolean variables: `isLoading`, `hasError`, `canEdit`
- Event handlers: `handleClick`, `onSubmit`

#### Best Practices
```jsx
// ✅ Good
const MangaCard = ({ manga, onAddToList }) => {
  const [isAdding, setIsAdding] = useState(false);

  const handleAdd = async () => {
    setIsAdding(true);
    await onAddToList(manga.id);
    setIsAdding(false);
  };

  return (
    <div className="manga-card">
      <button onClick={handleAdd} disabled={isAdding}>
        {isAdding ? 'Adding...' : 'Add to List'}
      </button>
    </div>
  );
};

// ❌ Bad
const mangacard = ({ m, f }) => {
  const [loading, setLoading] = useState(false);
  
  return <div onClick={() => f(m.id)}>Add</div>;
};
```

### CSS/Tailwind

#### Prefer Utility Classes
```jsx
// ✅ Good
<div className="flex items-center space-x-4 p-6 rounded-lg shadow-md">

// ❌ Bad - Don't create custom classes for simple layouts
<div className="custom-container">
```

#### Use Consistent Spacing
- Use Tailwind's spacing scale: `space-x-4`, `p-6`, `mb-4`
- Consistent spacing creates visual harmony

#### Component Classes
```css
/* Only create component classes for repeated complex patterns */
@layer components {
  .btn-primary {
    @apply px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-medium transition-colors;
  }
}
```

### State Management (Zustand)

#### Store Structure
```javascript
const useStore = create((set, get) => ({
  // State
  data: [],
  loading: false,
  error: null,

  // Sync actions
  setData: (data) => set({ data }),
  clearError: () => set({ error: null }),

  // Async actions
  fetchData: async () => {
    set({ loading: true, error: null });
    try {
      const response = await api.getData();
      set({ data: response, loading: false });
      return { success: true };
    } catch (error) {
      set({ error: error.message, loading: false });
      return { success: false, error: error.message };
    }
  },
}));
```

#### Best Practices
- Keep stores focused (single responsibility)
- Always handle loading and error states
- Return success/error from async actions
- Use descriptive action names

### Firebase/Firestore

#### Security
```javascript
// ✅ Good - Check permissions
const deleteReview = async (reviewId) => {
  const review = await getDoc(doc(db, 'reviews', reviewId));
  if (review.data().userId !== currentUser.uid) {
    throw new Error('Unauthorized');
  }
  await deleteDoc(doc(db, 'reviews', reviewId));
};

// ❌ Bad - No permission check
const deleteReview = async (reviewId) => {
  await deleteDoc(doc(db, 'reviews', reviewId));
};
```

#### Queries
```javascript
// ✅ Good - Limited queries
const q = query(
  collection(db, 'manga'),
  where('status', '==', 'ongoing'),
  orderBy('createdAt', 'desc'),
  limit(20)
);

// ❌ Bad - Unlimited queries
const q = query(collection(db, 'manga'));
```

## 📝 Commit Messages

We follow [Conventional Commits](https://www.conventionalcommits.org/):

### Format
```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `perf`: Performance improvements
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

### Examples
```bash
feat(manga): add pagination to manga list

Add infinite scroll pagination to the manga list page to improve
performance with large datasets.

Closes #123

---

fix(auth): resolve login redirect loop

Fixed an issue where users would get stuck in a redirect loop after
logging in due to incorrect auth state handling.

Fixes #456

---

docs(readme): update installation instructions

Updated the README with clearer Firebase setup instructions based
on user feedback.
```

## 🔀 Pull Request Process

### Before Submitting

1. **Test your changes**
   ```bash
   npm run build
   # Manually test in browser
   ```

2. **Update documentation** if needed
   - README.md for new features
   - Code comments for complex logic
   - SETUP_GUIDE.md for setup changes

3. **Check for linting errors** (if linting is set up)

### Creating a Pull Request

1. **Push to your fork**
   ```bash
   git push origin feature/your-feature
   ```

2. **Open PR on GitHub**
   - Click "New Pull Request"
   - Select your fork and branch
   - Fill in the template

3. **PR Title Format**
   ```
   feat(scope): brief description
   ```

4. **PR Description Template**
   ```markdown
   ## Description
   Brief description of changes

   ## Type of Change
   - [ ] Bug fix
   - [ ] New feature
   - [ ] Breaking change
   - [ ] Documentation update

   ## Testing
   - [ ] Tested locally
   - [ ] Added/updated tests
   - [ ] All tests pass

   ## Screenshots (if applicable)
   [Add screenshots]

   ## Related Issues
   Closes #123

   ## Checklist
   - [ ] Code follows style guidelines
   - [ ] Self-review completed
   - [ ] Comments added for complex code
   - [ ] Documentation updated
   - [ ] No new warnings
   ```

### Review Process

1. Maintainer will review your PR
2. Address any feedback or requested changes
3. Once approved, it will be merged
4. Your contribution will be credited!

## 🧪 Testing

### Manual Testing Checklist

For UI changes:
- [ ] Test in Chrome, Firefox, Safari
- [ ] Test responsive design (mobile, tablet, desktop)
- [ ] Test dark mode
- [ ] Test with different data states (empty, loading, error, success)

For new features:
- [ ] Test happy path
- [ ] Test error cases
- [ ] Test edge cases
- [ ] Test with different user roles (admin, user)

### Future: Automated Testing

Once testing infrastructure is set up:
- Write unit tests for utility functions
- Write integration tests for stores
- Write E2E tests for critical user flows

## 🐛 Reporting Bugs

### Before Reporting

1. Check if issue already exists
2. Try to reproduce consistently
3. Test in different browsers

### Bug Report Template

```markdown
**Describe the bug**
A clear description of the bug

**To Reproduce**
Steps to reproduce:
1. Go to '...'
2. Click on '...'
3. See error

**Expected behavior**
What you expected to happen

**Screenshots**
If applicable

**Environment:**
- OS: [e.g., Windows 10]
- Browser: [e.g., Chrome 91]
- Version: [e.g., 1.0.0]

**Additional context**
Any other relevant information
```

## 💡 Feature Requests

### Feature Request Template

```markdown
**Is your feature request related to a problem?**
Description of the problem

**Describe the solution you'd like**
Clear description of desired feature

**Describe alternatives you've considered**
Alternative solutions or features

**Additional context**
Mockups, examples, or other context
```

## 📚 Resources

### Learning Resources
- [React Documentation](https://react.dev/)
- [Firebase Documentation](https://firebase.google.com/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Zustand Documentation](https://github.com/pmndrs/zustand)

### Project-Specific Docs
- [README.md](./README.md) - Project overview
- [SETUP_GUIDE.md](./SETUP_GUIDE.md) - Setup instructions
- [ARCHITECTURE.md](./ARCHITECTURE.md) - System architecture
- [DIAGRAMS.md](./DIAGRAMS.md) - Visual diagrams

## ❓ Questions?

- Open a [GitHub Discussion](https://github.com/KolanoMadoru/Manga/discussions)
- Check existing [Issues](https://github.com/KolanoMadoru/Manga/issues)
- Read the documentation

## 🎉 Recognition

Contributors will be:
- Added to CONTRIBUTORS.md
- Credited in release notes
- Thanked in the community

---

Thank you for contributing to MangaTracker! Your efforts help make this project better for everyone. 🙏
