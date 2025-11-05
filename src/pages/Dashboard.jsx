import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, TrendingUp, Clock, Check } from 'lucide-react';
import useMangaStore from '../store/mangaStore';
import useSocialStore from '../store/socialStore';
import MangaCard from '../components/manga/MangaCard';

const Dashboard = () => {
  const { userMangaList, mangas, fetchAllMangas } = useMangaStore();
  const { activities, fetchAllActivities } = useSocialStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const init = async () => {
      await Promise.all([
        fetchAllMangas(),
        fetchAllActivities()
      ]);
      setLoading(false);
    };
    init();
  }, []);

  const stats = [
    {
      label: 'Reading',
      value: userMangaList.filter(m => m.status === 'reading').length,
      icon: BookOpen,
      color: 'bg-blue-500'
    },
    {
      label: 'Completed',
      value: userMangaList.filter(m => m.status === 'completed').length,
      icon: Check,
      color: 'bg-green-500'
    },
    {
      label: 'On Hold',
      value: userMangaList.filter(m => m.status === 'onHold').length,
      icon: Clock,
      color: 'bg-yellow-500'
    },
    {
      label: 'Plan to Read',
      value: userMangaList.filter(m => m.status === 'planToRead').length,
      icon: TrendingUp,
      color: 'bg-purple-500'
    }
  ];

  const currentlyReading = userMangaList
    .filter(um => um.status === 'reading')
    .slice(0, 6);

  const recentlyUpdated = activities.slice(0, 5);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Welcome to MangaTracker!
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Explore and track your manga reading journey
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <div key={index} className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                  {stat.label}
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {stat.value}
                </p>
              </div>
              <div className={`${stat.color} p-3 rounded-lg`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Currently Reading
            </h2>
            <Link to="/my-list" className="text-primary-600 hover:text-primary-700 dark:text-primary-400 font-medium">
              View All
            </Link>
          </div>

          {currentlyReading.length > 0 ? (
            <div className="grid md:grid-cols-3 gap-4">
              {currentlyReading.map(userManga => {
                const manga = mangas.find(m => m.id === userManga.mangaId);
                if (!manga) return null;
                return <MangaCard key={userManga.id} manga={manga} />;
              })}
            </div>
          ) : (
            <div className="card text-center py-12">
              <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                You're not reading any manga yet
              </p>
              <Link to="/manga" className="btn-primary inline-block">
                Browse Manga
              </Link>
            </div>
          )}
        </div>

        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Recent Activity
          </h2>
          <div className="space-y-4">
            {recentlyUpdated.length > 0 ? (
              recentlyUpdated.map(activity => (
                <div key={activity.id} className="card">
                  <div className="flex items-start space-x-3">
                    {activity.userPhoto ? (
                      <img
                        src={activity.userPhoto}
                        alt={activity.userName}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-primary-600 flex items-center justify-center text-white font-semibold">
                        {activity.userName?.[0]?.toUpperCase()}
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-gray-900 dark:text-white">
                        <span className="font-semibold">{activity.userName}</span>
                        {activity.type === 'completed' && ' completed '}
                        {activity.type === 'reading' && ' started reading '}
                        {activity.type === 'review' && ' reviewed '}
                        {activity.type === 'rating' && ' rated '}
                        <span className="font-semibold">{activity.mangaTitle}</span>
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        {new Date(activity.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="card text-center py-8">
                <p className="text-gray-600 dark:text-gray-400">
                  No recent activity
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
