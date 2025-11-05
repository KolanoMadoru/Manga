import { Link, useNavigate } from 'react-router-dom';
import { Menu } from '@headlessui/react';
import { 
  BookOpen, 
  Home, 
  Users, 
  BarChart3, 
  Moon, 
  Sun, 
  LogOut, 
  User, 
  Settings,
  Bell,
  Search
} from 'lucide-react';
import useAuthStore from '../../store/authStore';
import useThemeStore from '../../store/themeStore';

const Navbar = () => {
  const { user, userProfile, logout } = useAuthStore();
  const { theme, toggleTheme } = useThemeStore();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

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

            {user && (
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
            )}
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

            {user ? (
              <>
                <button className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors relative">
                  <Bell className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                  <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                </button>

                <Menu as="div" className="relative">
                  <Menu.Button className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                    {userProfile?.photoURL ? (
                      <img
                        src={userProfile.photoURL}
                        alt={userProfile.displayName}
                        className="w-8 h-8 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-primary-600 flex items-center justify-center text-white font-semibold">
                        {userProfile?.displayName?.[0]?.toUpperCase() || 'U'}
                      </div>
                    )}
                  </Menu.Button>

                  <Menu.Items className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-800 rounded-lg shadow-lg py-1 border border-gray-200 dark:border-gray-700">
                    <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        {userProfile?.displayName}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                        {user.email}
                      </p>
                    </div>

                    <Menu.Item>
                      {({ active }) => (
                        <Link
                          to="/profile"
                          className={`${
                            active ? 'bg-gray-100 dark:bg-gray-700' : ''
                          } flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-300`}
                        >
                          <User className="w-4 h-4" />
                          <span>Profile</span>
                        </Link>
                      )}
                    </Menu.Item>

                    <Menu.Item>
                      {({ active }) => (
                        <Link
                          to="/settings"
                          className={`${
                            active ? 'bg-gray-100 dark:bg-gray-700' : ''
                          } flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-300`}
                        >
                          <Settings className="w-4 h-4" />
                          <span>Settings</span>
                        </Link>
                      )}
                    </Menu.Item>

                    <div className="border-t border-gray-200 dark:border-gray-700 my-1"></div>

                    <Menu.Item>
                      {({ active }) => (
                        <button
                          onClick={handleLogout}
                          className={`${
                            active ? 'bg-gray-100 dark:bg-gray-700' : ''
                          } flex items-center space-x-2 px-4 py-2 text-sm text-red-600 dark:text-red-400 w-full text-left`}
                        >
                          <LogOut className="w-4 h-4" />
                          <span>Logout</span>
                        </button>
                      )}
                    </Menu.Item>
                  </Menu.Items>
                </Menu>
              </>
            ) : (
              <div className="flex items-center space-x-2">
                <Link
                  to="/login"
                  className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="btn-primary"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
