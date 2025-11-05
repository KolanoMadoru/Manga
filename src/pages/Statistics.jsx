import { useEffect, useState } from 'react';
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { TrendingUp } from 'lucide-react';
import useAuthStore from '../store/authStore';
import useMangaStore from '../store/mangaStore';

const COLORS = ['#0ea5e9', '#10b981', '#f59e0b', '#8b5cf6', '#ef4444'];

const Statistics = () => {
  const { user } = useAuthStore();
  const { userMangaList, fetchUserMangaList, mangas } = useMangaStore();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    byStatus: [],
    byGenre: [],
    byRating: []
  });

  useEffect(() => {
    const init = async () => {
      if (user) {
        await fetchUserMangaList(user.uid);
      }
      setLoading(false);
    };
    init();
  }, [user]);

  useEffect(() => {
    if (userMangaList.length > 0) {
      const statusData = [
        { name: 'Reading', value: userMangaList.filter(m => m.status === 'reading').length },
        { name: 'Completed', value: userMangaList.filter(m => m.status === 'completed').length },
        { name: 'On Hold', value: userMangaList.filter(m => m.status === 'onHold').length },
        { name: 'Dropped', value: userMangaList.filter(m => m.status === 'dropped').length },
        { name: 'Plan to Read', value: userMangaList.filter(m => m.status === 'planToRead').length }
      ].filter(item => item.value > 0);

      const genreCount = {};
      userMangaList.forEach(um => {
        const manga = mangas.find(m => m.id === um.mangaId);
        if (manga?.genres) {
          manga.genres.forEach(genre => {
            genreCount[genre] = (genreCount[genre] || 0) + 1;
          });
        }
      });

      const genreData = Object.entries(genreCount)
        .map(([name, value]) => ({ name, value }))
        .sort((a, b) => b.value - a.value)
        .slice(0, 10);

      const ratingData = [
        { range: '1-2', count: userMangaList.filter(m => m.rating >= 1 && m.rating < 3).length },
        { range: '3-4', count: userMangaList.filter(m => m.rating >= 3 && m.rating < 5).length },
        { range: '5-6', count: userMangaList.filter(m => m.rating >= 5 && m.rating < 7).length },
        { range: '7-8', count: userMangaList.filter(m => m.rating >= 7 && m.rating < 9).length },
        { range: '9-10', count: userMangaList.filter(m => m.rating >= 9 && m.rating <= 10).length }
      ].filter(item => item.count > 0);

      setStats({
        byStatus: statusData,
        byGenre: genreData,
        byRating: ratingData
      });
    }
  }, [userMangaList, mangas]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  const totalManga = userMangaList.length;
  const completed = userMangaList.filter(m => m.status === 'completed').length;
  const averageRating = userMangaList.length > 0
    ? (userMangaList.reduce((sum, m) => sum + (m.rating || 0), 0) / userMangaList.filter(m => m.rating > 0).length).toFixed(1)
    : 0;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Statistics
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Your manga reading statistics and insights
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="card text-center">
          <div className="text-4xl font-bold text-primary-600 mb-2">
            {totalManga}
          </div>
          <div className="text-gray-600 dark:text-gray-400">
            Total Manga
          </div>
        </div>
        <div className="card text-center">
          <div className="text-4xl font-bold text-green-600 mb-2">
            {completed}
          </div>
          <div className="text-gray-600 dark:text-gray-400">
            Completed
          </div>
        </div>
        <div className="card text-center">
          <div className="text-4xl font-bold text-yellow-600 mb-2">
            {averageRating || 'N/A'}
          </div>
          <div className="text-gray-600 dark:text-gray-400">
            Average Rating
          </div>
        </div>
      </div>

      {stats.byStatus.length > 0 && (
        <div className="card">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
            Reading Status Distribution
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={stats.byStatus}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {stats.byStatus.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      )}

      {stats.byGenre.length > 0 && (
        <div className="card">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
            Top Genres
          </h2>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={stats.byGenre}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" angle={-45} textAnchor="end" height={100} />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#0ea5e9" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}

      {stats.byRating.length > 0 && (
        <div className="card">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
            Rating Distribution
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={stats.byRating}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="range" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#10b981" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}

      {userMangaList.length === 0 && (
        <div className="card text-center py-12">
          <TrendingUp className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            No statistics available yet
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-500">
            Start adding manga to your list to see statistics
          </p>
        </div>
      )}
    </div>
  );
};

export default Statistics;
