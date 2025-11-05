import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Star, Users, BookOpen, Plus, Edit, MessageCircle, Heart } from 'lucide-react';
import useMangaStore from '../store/mangaStore';
import useSocialStore from '../store/socialStore';
import useAuthStore from '../store/authStore';

const MangaDetail = () => {
  const { id } = useParams();
  const { user, userProfile } = useAuthStore();
  const { selectedManga, fetchMangaById, userMangaList, fetchUserMangaList, addToUserList, updateUserManga } = useMangaStore();
  const { reviews, fetchReviews, addReview, likeReview } = useSocialStore();
  const [loading, setLoading] = useState(true);
  const [userManga, setUserManga] = useState(null);
  const [reviewForm, setReviewForm] = useState({ rating: 0, content: '' });
  const [showReviewForm, setShowReviewForm] = useState(false);

  useEffect(() => {
    const init = async () => {
      await fetchMangaById(id);
      await fetchReviews(id);
      if (user) {
        await fetchUserMangaList(user.uid);
      }
      setLoading(false);
    };
    init();
  }, [id, user]);

  useEffect(() => {
    if (userMangaList && id) {
      const found = userMangaList.find(um => um.mangaId === id);
      setUserManga(found);
    }
  }, [userMangaList, id]);

  const handleAddToList = async (status) => {
    if (!user || !selectedManga) return;

    const result = await addToUserList(
      user.uid,
      id,
      {
        title: selectedManga.title,
        coverImage: selectedManga.coverImage
      },
      status
    );

    if (result.success) {
      await fetchUserMangaList(user.uid);
    }
  };

  const handleUpdateProgress = async (chapter) => {
    if (!userManga) return;

    await updateUserManga(userManga.id, {
      currentChapter: parseInt(chapter)
    });
    await fetchUserMangaList(user.uid);
  };

  const handleUpdateStatus = async (status) => {
    if (!userManga) return;

    await updateUserManga(userManga.id, { status });
    await fetchUserMangaList(user.uid);
  };

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    if (!user || !userProfile) return;

    const result = await addReview(
      user.uid,
      userProfile.displayName,
      userProfile.photoURL,
      id,
      selectedManga.title,
      reviewForm.rating,
      reviewForm.content
    );

    if (result.success) {
      setReviewForm({ rating: 0, content: '' });
      setShowReviewForm(false);
      await fetchReviews(id);
    }
  };

  const handleLikeReview = async (reviewId) => {
    if (!user) return;
    await likeReview(reviewId, user.uid);
  };

  if (loading || !selectedManga) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  const userReview = reviews.find(r => r.userId === user?.uid);

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

            {user && (
              <div className="mt-4 space-y-2">
                {!userManga ? (
                  <>
                    <button
                      onClick={() => handleAddToList('reading')}
                      className="w-full btn-primary flex items-center justify-center space-x-2"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Add to List</span>
                    </button>
                    <select
                      onChange={(e) => handleAddToList(e.target.value)}
                      className="input-field text-sm"
                      defaultValue=""
                    >
                      <option value="" disabled>Quick Add</option>
                      <option value="reading">Reading</option>
                      <option value="completed">Completed</option>
                      <option value="onHold">On Hold</option>
                      <option value="dropped">Dropped</option>
                      <option value="planToRead">Plan to Read</option>
                    </select>
                  </>
                ) : (
                  <>
                    <select
                      value={userManga.status}
                      onChange={(e) => handleUpdateStatus(e.target.value)}
                      className="input-field text-sm"
                    >
                      <option value="reading">Reading</option>
                      <option value="completed">Completed</option>
                      <option value="onHold">On Hold</option>
                      <option value="dropped">Dropped</option>
                      <option value="planToRead">Plan to Read</option>
                    </select>
                    <div>
                      <label className="block text-xs text-gray-600 dark:text-gray-400 mb-1">
                        Current Chapter
                      </label>
                      <input
                        type="number"
                        value={userManga.currentChapter}
                        onChange={(e) => handleUpdateProgress(e.target.value)}
                        className="input-field text-sm"
                        min="0"
                        max={selectedManga.totalChapters || 9999}
                      />
                    </div>
                  </>
                )}
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
                  <p className="text-gray-600 dark:text-gray-400">Chapters</p>
                  <p className="font-semibold text-gray-900 dark:text-white">
                    {selectedManga.totalChapters || 'Ongoing'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Reviews
          </h2>
          {user && !userReview && (
            <button
              onClick={() => setShowReviewForm(!showReviewForm)}
              className="btn-primary text-sm"
            >
              Write Review
            </button>
          )}
        </div>

        {showReviewForm && (
          <form onSubmit={handleSubmitReview} className="mb-6 p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Your Rating
              </label>
              <div className="flex space-x-2">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
                  <button
                    key={num}
                    type="button"
                    onClick={() => setReviewForm({ ...reviewForm, rating: num })}
                    className={`w-10 h-10 rounded-lg font-semibold transition-colors ${
                      reviewForm.rating >= num
                        ? 'bg-primary-600 text-white'
                        : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                    }`}
                  >
                    {num}
                  </button>
                ))}
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Your Review
              </label>
              <textarea
                value={reviewForm.content}
                onChange={(e) => setReviewForm({ ...reviewForm, content: e.target.value })}
                rows="4"
                className="input-field"
                placeholder="Share your thoughts..."
                required
              />
            </div>
            <div className="flex space-x-2">
              <button type="submit" className="btn-primary">
                Submit Review
              </button>
              <button
                type="button"
                onClick={() => setShowReviewForm(false)}
                className="btn-secondary"
              >
                Cancel
              </button>
            </div>
          </form>
        )}

        <div className="space-y-4">
          {reviews.length > 0 ? (
            reviews.map(review => (
              <div key={review.id} className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                <div className="flex items-start space-x-3">
                  {review.userPhoto ? (
                    <img
                      src={review.userPhoto}
                      alt={review.userName}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-primary-600 flex items-center justify-center text-white font-semibold">
                      {review.userName[0].toUpperCase()}
                    </div>
                  )}
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <p className="font-semibold text-gray-900 dark:text-white">
                          {review.userName}
                        </p>
                        <div className="flex items-center space-x-2">
                          <div className="flex items-center space-x-1">
                            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                            <span className="text-sm font-semibold">{review.rating}/10</span>
                          </div>
                          <span className="text-sm text-gray-500 dark:text-gray-400">
                            {new Date(review.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-700 dark:text-gray-300 mb-3">
                      {review.content}
                    </p>
                    <div className="flex items-center space-x-4">
                      <button
                        onClick={() => handleLikeReview(review.id)}
                        className={`flex items-center space-x-1 text-sm ${
                          review.likes?.includes(user?.uid)
                            ? 'text-red-600 dark:text-red-400'
                            : 'text-gray-600 dark:text-gray-400'
                        } hover:text-red-600 dark:hover:text-red-400 transition-colors`}
                      >
                        <Heart className={`w-4 h-4 ${review.likes?.includes(user?.uid) ? 'fill-current' : ''}`} />
                        <span>{review.likes?.length || 0}</span>
                      </button>
                      <button className="flex items-center space-x-1 text-sm text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                        <MessageCircle className="w-4 h-4" />
                        <span>{review.commentsCount || 0}</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-8 text-gray-600 dark:text-gray-400">
              No reviews yet. Be the first to review!
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MangaDetail;
