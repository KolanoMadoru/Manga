import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Star, Users, BookOpen, Heart, MessageCircle } from 'lucide-react';
import useMangaStore from '../store/mangaStore';
import useSocialStore from '../store/socialStore';

const MangaDetail = () => {
  const { id } = useParams();
  const { selectedManga, fetchMangaById } = useMangaStore();
  const { reviews, fetchReviews } = useSocialStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const init = async () => {
      await fetchMangaById(id);
      await fetchReviews(id);
      setLoading(false);
    };
    init();
  }, [id]);

  if (loading || !selectedManga) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="card">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            {selectedManga.coverImage ? (
              <img
                src={selectedManga.coverImage}
                alt={selectedManga.title}
                className="w-full rounded-lg shadow-lg"
              />
            ) : (
              <div className="w-full aspect-[3/4] bg-gradient-to-br from-primary-400 to-purple-500 rounded-lg flex items-center justify-center">
                <span className="text-white text-6xl font-bold">
                  {selectedManga.title[0].toUpperCase()}
                </span>
              </div>
            )}
          </div>

          <div className="md:col-span-3">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              {selectedManga.title}
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-4">
              by {selectedManga.author}
            </p>

            <div className="flex items-center space-x-6 mb-6">
              <div className="flex items-center space-x-2">
                <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                <span className="text-lg font-semibold">
                  {selectedManga.averageRating?.toFixed(1) || 'N/A'}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Users className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                <span>{selectedManga.totalReaders || 0} readers</span>
              </div>
              <div className="flex items-center space-x-2">
                <BookOpen className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                <span>{selectedManga.totalChapters || '?'} chapters</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mb-6">
              <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                selectedManga.status === 'ongoing'
                  ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300'
                  : 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300'
              }`}>
                {selectedManga.status === 'ongoing' ? 'Ongoing' : 'Completed'}
              </span>
              {selectedManga.genres?.map((genre, index) => (
                <span
                  key={index}
                  className="px-3 py-1 rounded-full text-sm bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300"
                >
                  {genre}
                </span>
              ))}
            </div>

            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Synopsis
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                {selectedManga.synopsis}
              </p>
            </div>

            <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <p className="text-gray-600 dark:text-gray-400">Status</p>
                  <p className="font-semibold text-gray-900 dark:text-white capitalize">
                    {selectedManga.status}
                  </p>
                </div>
                <div>
                  <p className="text-gray-600 dark:text-gray-400">Year</p>
                  <p className="font-semibold text-gray-900 dark:text-white">
                    {selectedManga.year}
                  </p>
                </div>
                <div>
                  <p className="text-gray-600 dark:text-gray-400">Author</p>
                  <p className="font-semibold text-gray-900 dark:text-white">
                    {selectedManga.author}
                  </p>
                </div>
                <div>
                  <p className="text-gray-600 dark:text-gray-400">Type</p>
                  <p className="font-semibold text-gray-900 dark:text-white">
                    {selectedManga.type || 'Manga'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="card">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          Reviews ({reviews.length})
        </h2>

        <div className="space-y-6">
          {reviews.length > 0 ? (
            reviews.map(review => (
              <div key={review.id} className="border-b border-gray-200 dark:border-gray-700 pb-6 last:border-0">
                <div className="flex items-start space-x-4">
                  {review.userPhoto ? (
                    <img
                      src={review.userPhoto}
                      alt={review.userName}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-primary-600 flex items-center justify-center text-white font-semibold">
                      {review.userName?.[0]?.toUpperCase()}
                    </div>
                  )}

                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <p className="font-semibold text-gray-900 dark:text-white">
                          {review.userName}
                        </p>
                        <div className="flex items-center space-x-2">
                          <div className="flex items-center">
                            {[...Array(10)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-4 h-4 ${
                                  i < review.rating
                                    ? 'fill-yellow-400 text-yellow-400'
                                    : 'text-gray-300 dark:text-gray-600'
                                }`}
                              />
                            ))}
                          </div>
                          <span className="text-sm font-semibold text-gray-900 dark:text-white">
                            {review.rating}/10
                          </span>
                        </div>
                      </div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {new Date(review.createdAt).toLocaleDateString()}
                      </p>
                    </div>

                    <p className="text-gray-700 dark:text-gray-300 mb-3">
                      {review.content}
                    </p>

                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-1 text-gray-600 dark:text-gray-400">
                        <Heart className="w-4 h-4" />
                        <span className="text-sm">{review.likes?.length || 0}</span>
                      </div>
                      <div className="flex items-center space-x-1 text-gray-600 dark:text-gray-400">
                        <MessageCircle className="w-4 h-4" />
                        <span className="text-sm">{review.commentsCount || 0}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-600 dark:text-gray-400">
                No reviews yet. Be the first to review!
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MangaDetail;
