import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import useAuthStore from './store/authStore';
import useThemeStore from './store/themeStore';

import Layout from './components/layout/Layout';
import ProtectedRoute from './components/auth/ProtectedRoute';
import FirebaseConfigChecker from './components/common/FirebaseConfigChecker';

import Home from './pages/Home';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Dashboard from './pages/Dashboard';
import MangaList from './pages/MangaList';
import MangaDetail from './pages/MangaDetail';
import Social from './pages/Social';
import Statistics from './pages/Statistics';
import Profile from './pages/Profile';

function App() {
  const { initAuth, loading } = useAuthStore();
  const { theme } = useThemeStore();

  useEffect(() => {
    initAuth();
  }, []);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <Router>
      <FirebaseConfigChecker />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } 
          />
          
          <Route 
            path="/manga" 
            element={
              <ProtectedRoute>
                <MangaList />
              </ProtectedRoute>
            } 
          />
          
          <Route 
            path="/manga/:id" 
            element={
              <ProtectedRoute>
                <MangaDetail />
              </ProtectedRoute>
            } 
          />
          
          <Route 
            path="/social" 
            element={
              <ProtectedRoute>
                <Social />
              </ProtectedRoute>
            } 
          />
          
          <Route 
            path="/statistics" 
            element={
              <ProtectedRoute>
                <Statistics />
              </ProtectedRoute>
            } 
          />
          
          <Route 
            path="/profile" 
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            } 
          />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
