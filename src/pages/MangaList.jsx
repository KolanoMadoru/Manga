import { useEffect, useState } from 'react';
import { Plus, Search, Filter } from 'lucide-react';
import useMangaStore from '../store/mangaStore';
import useAuthStore from '../store/authStore';
import MangaCard from '../components/manga/MangaCard';
import AddMangaModal from '../components/manga/AddMangaModal';

const MangaList = () => {
  const { mangas, fetchAllMangas, searchMangas } = useMangaStore();
  const { userProfile } = useAuthStore();
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    genre: '',
    status: '',
    sortBy: 'title'
  });

  useEffect(() => {
    const init = async () => {
      await fetchAllMangas();
      setLoading(false);
    };
    init();
  }, []);

  const filteredMangas = searchMangas(searchTerm, {
    genre: filters.genre,
    status: filters.status
  });

  const sortedMangas = [...filteredMangas].sort((a, b) => {
    switch (filters.sortBy) {
      case 'rating':
        return (b.averageRating || 0) - (a.averageRating || 0);
      case 'popular':
        return (b.totalReaders || 0) - (a.totalReaders || 0);
      case 'title':
      default:
        return a.title.localeCompare(b.title);
    }
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Manga Library
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Browse and discover manga
          </p>
        </div>
        
        {userProfile?.role === 'admin' && (
          <button
            onClick={() => setIsModalOpen(true)}
            className="btn-primary flex items-center space-x-2"
          >
            <Plus className="w-5 h-5" />
            <span>Add Manga</span>
          </button>
        )}
      </div>

      <div className="card">
        <div className="grid md:grid-cols-4 gap-4">
          <div className="md:col-span-2 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search manga..."
              className="input-field pl-10"
            />
          </div>

          <select
            value={filters.status}
            onChange={(e) => setFilters({ ...filters, status: e.target.value })}
            className="input-field"
          >
            <option value="">All Status</option>
            <option value="ongoing">Ongoing</option>
            <option value="completed">Completed</option>
          </select>

          <select
            value={filters.sortBy}
            onChange={(e) => setFilters({ ...filters, sortBy: e.target.value })}
            className="input-field"
          >
            <option value="title">Sort by Title</option>
            <option value="rating">Sort by Rating</option>
            <option value="popular">Sort by Popularity</option>
          </select>
        </div>
      </div>

      {sortedMangas.length > 0 ? (
        <div className="grid md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {sortedMangas.map(manga => (
            <MangaCard key={manga.id} manga={manga} />
          ))}
        </div>
      ) : (
        <div className="card text-center py-12">
          <Filter className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600 dark:text-gray-400">
            No manga found
          </p>
        </div>
      )}

      <AddMangaModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default MangaList;
