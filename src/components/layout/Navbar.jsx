import { Link } from 'react-router-dom';
import { 
  BookOpen, 
  Home, 
  Users, 
  BarChart3, 
  Moon, 
  Sun
} from 'lucide-react';
import useThemeStore from '../../store/themeStore';

const Navbar = () => {
  const { theme, toggleTheme } = useThemeStore();

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-8">
            <Link to="/" className="flex items-center space-x-2">
              <BookOpen className="w-8 h-8 text-primary-600" />
              <span className="text-xl font-bold text-gray-900 dark:text-white">
                MangaTracker
              </span>
            </Link>

            <div className="hidden md:flex items-center space-x-6">
              <Link
                to="/dashboard"
                className="flex items-center space-x-1 text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
              >
                <Home className="w-5 h-5" />
                <span>Dashboard</span>
              </Link>
              <Link
                to="/manga"
                className="flex items-center space-x-1 text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
              >
                <BookOpen className="w-5 h-5" />
                <span>Manga</span>
              </Link>
              <Link
                to="/social"
                className="flex items-center space-x-1 text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
              >
                <Users className="w-5 h-5" />
                <span>Social</span>
              </Link>
              <Link
                to="/statistics"
                className="flex items-center space-x-1 text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
              >
                <BarChart3 className="w-5 h-5" />
                <span>Stats</span>
              </Link>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              aria-label="Toggle theme"
            >
              {theme === 'light' ? (
                <Moon className="w-5 h-5 text-gray-700 dark:text-gray-300" />
              ) : (
                <Sun className="w-5 h-5 text-gray-700 dark:text-gray-300" />
              )}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
