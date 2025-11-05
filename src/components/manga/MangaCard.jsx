import { Link } from 'react-router-dom';
import { Star, Users } from 'lucide-react';

const MangaCard = ({ manga }) => {
  return (
    <Link 
      to={`/manga/${manga.id}`}
      className="manga-card group"
    >
      <div className="relative aspect-[3/4] overflow-hidden">
        {manga.coverImage ? (
          <img
            src={manga.coverImage}
            alt={manga.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-primary-400 to-purple-500 flex items-center justify-center">
            <span className="text-white text-4xl font-bold">
              {manga.title?.[0]?.toUpperCase()}
            </span>
          </div>
        )}
        
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <div className="flex items-center justify-between text-white text-sm">
              <div className="flex items-center space-x-1">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span>{manga.averageRating?.toFixed(1) || 'N/A'}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Users className="w-4 h-4" />
                <span>{manga.totalReaders || 0}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute top-2 right-2">
          <span className={`px-2 py-1 rounded text-xs font-semibold ${
            manga.status === 'ongoing' 
              ? 'bg-green-500 text-white' 
              : 'bg-blue-500 text-white'
          }`}>
            {manga.status === 'ongoing' ? 'Ongoing' : 'Completed'}
          </span>
        </div>
      </div>

      <div className="p-4">
        <h3 className="font-semibold text-gray-900 dark:text-white mb-1 line-clamp-2">
          {manga.title}
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
          {manga.author}
        </p>
        <div className="flex flex-wrap gap-1">
          {manga.genres?.slice(0, 2).map((genre, index) => (
            <span
              key={index}
              className="text-xs px-2 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 rounded"
            >
              {genre}
            </span>
          ))}
          {manga.genres?.length > 2 && (
            <span className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded">
              +{manga.genres.length - 2}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
};

export default MangaCard;
