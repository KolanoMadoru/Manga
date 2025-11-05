import { useEffect, useState } from 'react';
import { Heart, MessageCircle, BookOpen } from 'lucide-react';
import useSocialStore from '../store/socialStore';

const Social = () => {
  const { activities, fetchAllActivities } = useSocialStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const init = async () => {
      await fetchAllActivities();
      setLoading(false);
    };
    init();
  }, []);

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
          Community manga activity and reviews
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

                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1 text-gray-600 dark:text-gray-400">
                      <Heart className="w-5 h-5" />
                      <span>{activity.likes?.length || 0}</span>
                    </div>
                    <div className="flex items-center space-x-1 text-gray-600 dark:text-gray-400">
                      <MessageCircle className="w-5 h-5" />
                      <span>{activity.commentsCount || 0}</span>
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
              Check back later for manga activity
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Social;
