import { Link } from 'react-router-dom';
import { BookOpen, Users, BarChart3, Star } from 'lucide-react';

const Home = () => {
  const features = [
    {
      icon: BookOpen,
      title: 'Track Your Reading',
      description: 'Keep track of all the manga you\'re reading, completed, or planning to read.'
    },
    {
      icon: Users,
      title: 'Connect with Friends',
      description: 'Follow friends, share reviews, and discover new manga together.'
    },
    {
      icon: BarChart3,
      title: 'View Statistics',
      description: 'Analyze your reading habits with detailed statistics and insights.'
    },
    {
      icon: Star,
      title: 'Rate & Review',
      description: 'Share your thoughts and help others discover great manga.'
    }
  ];

  return (
    <div className="min-h-screen">
      <section className="bg-gradient-to-br from-primary-600 to-purple-600 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-5xl font-bold mb-6 fade-in">
              Track Your Manga Journey
            </h1>
            <p className="text-xl mb-8 text-primary-100">
              Organize, track, and share your manga reading experience with friends
            </p>
            <div className="flex justify-center space-x-4">
              <Link to="/register" className="px-8 py-3 bg-white text-primary-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                Get Started
              </Link>
              <Link to="/login" className="px-8 py-3 border-2 border-white text-white rounded-lg font-semibold hover:bg-white/10 transition-colors">
                Sign In
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">
            Features
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center fade-in">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 dark:bg-primary-900/30 rounded-full mb-4">
                  <feature.icon className="w-8 h-8 text-primary-600 dark:text-primary-400" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">
                  Your Personal Manga Library
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  Organize your manga collection with custom lists, track your reading progress, 
                  and never lose track of where you left off.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-gray-700 dark:text-gray-300">
                      Multiple reading statuses (Reading, Completed, On-Hold, etc.)
                    </span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-gray-700 dark:text-gray-300">
                      Chapter progress tracking
                    </span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-gray-700 dark:text-gray-300">
                      Personal notes and ratings
                    </span>
                  </li>
                </ul>
              </div>
              <div className="bg-gradient-to-br from-primary-500 to-purple-600 rounded-lg p-8 text-white">
                <div className="space-y-4">
                  <div className="bg-white/10 backdrop-blur rounded-lg p-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-16 bg-white/20 rounded"></div>
                      <div className="flex-1">
                        <div className="h-4 bg-white/30 rounded mb-2"></div>
                        <div className="h-3 bg-white/20 rounded w-2/3"></div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white/10 backdrop-blur rounded-lg p-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-16 bg-white/20 rounded"></div>
                      <div className="flex-1">
                        <div className="h-4 bg-white/30 rounded mb-2"></div>
                        <div className="h-3 bg-white/20 rounded w-2/3"></div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white/10 backdrop-blur rounded-lg p-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-16 bg-white/20 rounded"></div>
                      <div className="flex-1">
                        <div className="h-4 bg-white/30 rounded mb-2"></div>
                        <div className="h-3 bg-white/20 rounded w-2/3"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">
            Ready to Start?
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
            Join thousands of manga readers tracking their journey
          </p>
          <Link to="/register" className="inline-block px-8 py-3 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 transition-colors">
            Create Free Account
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
