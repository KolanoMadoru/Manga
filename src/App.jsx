import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import useThemeStore from './store/themeStore';

import Layout from './components/layout/Layout';

import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import MangaList from './pages/MangaList';
import MangaDetail from './pages/MangaDetail';
import Social from './pages/Social';
import Statistics from './pages/Statistics';

function App() {
  const { theme } = useThemeStore();

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/manga" element={<MangaList />} />
          <Route path="/manga/:id" element={<MangaDetail />} />
          <Route path="/social" element={<Social />} />
          <Route path="/statistics" element={<Statistics />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
