import { useEffect, useState } from 'react';
import { Heart, MessageCircle, BookOpen } from 'lucide-react';
import useAuthStore from '../store/authStore';
import useSocialStore from '../store/socialStore';

const Social = () => {
  const { user, userProfile } = useAuthStore();
  const { activities, fetchActivities, likeActivity, addComment } = useSocialStore();
  const [loading, setLoading] = useState(true);
  const [commentForm, setCommentForm] = useState({});

  useEffect(() => {
    const init = async () => {
      if (user) {
        await fetchActivities(user.uid, true);
      }
      setLoading(false);
    };
    init();
  }, [user]);

  const handleLike = async (activityId) => {
    if (!user) return;
    await likeActivity(activityId, user.uid);
  };

  const handleComment = async (activityId) => {
    if (!user || !userProfile || !commentForm[activityId]) return;

    await addComment(
      activityId,
      'activity',
      user.uid,
      userProfile.displayName,
      userProfile.photoURL,
      commentForm[activityId]
    );

    setCommentForm({ ...commentForm, [activityId]: '' });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Social Feed
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          See what your friends are reading
        </p>
      </div>

      <div className="space-y-4">
        {activities.length > 0 ? (
          activities.map(activity => (
            <div key={activity.id} className="card">
              <div className="flex items-start space-x-3">
                {activity.userPhoto ? (
                  <img
                    src={activity.userPhoto}
                    alt={activity.userName}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-primary-600 flex items-center justify-center text-white font-semibold">
                    {activity.userName?.[0]?.toUpperCase()}
                  </div>
                )}

                <div className="flex-1">
                  <div className="mb-3">
                    <p className="text-gray-900 dark:text-white">
                      <span className="font-semibold">{activity.userName}</span>
                      {activity.type === 'completed' && ' completed '}
                      {activity.type === 'reading' && ' started reading '}
                      {activity.type === 'review' && ' reviewed '}
                      {activity.type === 'rating' && ' rated '}
                      <span className="font-semibold">{activity.mangaTitle}</span>
                      {activity.rating && (
                        <span className="ml-2 px-2 py-0.5 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300 rounded text-sm font-semibold">
                          {activity.rating}/10
                        </span>
                      )}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                      {new Date(activity.createdAt).toLocaleString()}
                    </p>
                  </div>

                  {activity.reviewContent && (
                    <div className="mb-3 p-3 bg-gray-50 dark:bg-gray-900 rounded-lg">
                      <p className="text-gray-700 dark:text-gray-300">
                        {activity.reviewContent}
                      </p>
                    </div>
                  )}

                  <div className="flex items-center space-x-4 mb-3">
                    <button
                      onClick={() => handleLike(activity.id)}
                      className={`flex items-center space-x-1 ${
                        activity.likes?.includes(user?.uid)
                          ? 'text-red-600 dark:text-red-400'
                          : 'text-gray-600 dark:text-gray-400'
                      } hover:text-red-600 dark:hover:text-red-400 transition-colors`}
                    >
                      <Heart className={`w-5 h-5 ${activity.likes?.includes(user?.uid) ? 'fill-current' : ''}`} />
                      <span>{activity.likes?.length || 0}</span>
                    </button>
                    <button className="flex items-center space-x-1 text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                      <MessageCircle className="w-5 h-5" />
                      <span>{activity.commentsCount || 0}</span>
                    </button>
                  </div>

                  <div className="border-t border-gray-200 dark:border-gray-700 pt-3">
                    <div className="flex items-center space-x-2">
                      <input
                        type="text"
                        value={commentForm[activity.id] || ''}
                        onChange={(e) => setCommentForm({ ...commentForm, [activity.id]: e.target.value })}
                        placeholder="Write a comment..."
                        className="input-field text-sm"
                        onKeyPress={(e) => {
                          if (e.key === 'Enter') {
                            handleComment(activity.id);
                          }
                        }}
                      />
                      <button
                        onClick={() => handleComment(activity.id)}
                        className="btn-primary text-sm"
                        disabled={!commentForm[activity.id]}
                      >
                        Post
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="card text-center py-12">
            <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              No activities yet
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-500">
              Follow friends to see their manga activity
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Social;
