import { useState } from 'react';
import { Camera } from 'lucide-react';
import useAuthStore from '../store/authStore';

const Profile = () => {
  const { user, userProfile, updateUserProfile } = useAuthStore();
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    displayName: userProfile?.displayName || '',
    bio: userProfile?.bio || '',
    photoURL: userProfile?.photoURL || ''
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const result = await updateUserProfile(formData);
    
    if (result.success) {
      setEditing(false);
    }
    
    setLoading(false);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="card">
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center space-x-4">
            <div className="relative">
              {userProfile?.photoURL ? (
                <img
                  src={userProfile.photoURL}
                  alt={userProfile.displayName}
                  className="w-24 h-24 rounded-full object-cover"
                />
              ) : (
                <div className="w-24 h-24 rounded-full bg-primary-600 flex items-center justify-center text-white text-3xl font-bold">
                  {userProfile?.displayName?.[0]?.toUpperCase()}
                </div>
              )}
              {editing && (
                <button className="absolute bottom-0 right-0 p-2 bg-primary-600 rounded-full text-white hover:bg-primary-700 transition-colors">
                  <Camera className="w-4 h-4" />
                </button>
              )}
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                {userProfile?.displayName}
              </h1>
              <p className="text-gray-600 dark:text-gray-400">{user?.email}</p>
              <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500 dark:text-gray-400">
                <span>{userProfile?.followers?.length || 0} followers</span>
                <span>{userProfile?.following?.length || 0} following</span>
              </div>
            </div>
          </div>
          {!editing && (
            <button
              onClick={() => setEditing(true)}
              className="btn-primary"
            >
              Edit Profile
            </button>
          )}
        </div>

        {editing ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Display Name
              </label>
              <input
                type="text"
                name="displayName"
                value={formData.displayName}
                onChange={handleChange}
                className="input-field"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Bio
              </label>
              <textarea
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                rows="4"
                className="input-field"
                placeholder="Tell us about yourself..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Profile Photo URL
              </label>
              <input
                type="url"
                name="photoURL"
                value={formData.photoURL}
                onChange={handleChange}
                className="input-field"
                placeholder="https://example.com/photo.jpg"
              />
            </div>

            <div className="flex space-x-3">
              <button
                type="submit"
                disabled={loading}
                className="btn-primary"
              >
                {loading ? 'Saving...' : 'Save Changes'}
              </button>
              <button
                type="button"
                onClick={() => {
                  setEditing(false);
                  setFormData({
                    displayName: userProfile?.displayName || '',
                    bio: userProfile?.bio || '',
                    photoURL: userProfile?.photoURL || ''
                  });
                }}
                className="btn-secondary"
              >
                Cancel
              </button>
            </div>
          </form>
        ) : (
          <div>
            {userProfile?.bio && (
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                  Bio
                </h3>
                <p className="text-gray-700 dark:text-gray-300">
                  {userProfile.bio}
                </p>
              </div>
            )}

            <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Reading Statistics
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                <div className="text-center p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
                  <div className="text-2xl font-bold text-primary-600">
                    {userProfile?.stats?.totalManga || 0}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Total
                  </div>
                </div>
                <div className="text-center p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">
                    {userProfile?.stats?.reading || 0}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Reading
                  </div>
                </div>
                <div className="text-center p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">
                    {userProfile?.stats?.completed || 0}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Completed
                  </div>
                </div>
                <div className="text-center p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
                  <div className="text-2xl font-bold text-yellow-600">
                    {userProfile?.stats?.onHold || 0}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    On Hold
                  </div>
                </div>
                <div className="text-center p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">
                    {userProfile?.stats?.planToRead || 0}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Plan to Read
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t border-gray-200 dark:border-gray-700 pt-6 mt-6">
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                Member Since
              </h3>
              <p className="text-gray-700 dark:text-gray-300">
                {userProfile?.createdAt ? new Date(userProfile.createdAt).toLocaleDateString() : 'Unknown'}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
