import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useAppStore } from '../stores/useAppStore';
import { motion } from 'framer-motion';

const Profile: React.FC = () => {
  const { currentUser, logout } = useAuth();
  const { userProgress, resetProgress } = useAppStore();
  const [isEditing, setIsEditing] = useState(false);
  const [displayName, setDisplayName] = useState(currentUser?.displayName || '');
  
  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Failed to log out', error);
    }
  };
  
  const handleSaveProfile = () => {
    // In a real implementation, we would update the user profile here
    setIsEditing(false);
  };
  
  const handleResetProgress = () => {
    if (window.confirm('Are you sure you want to reset all your progress? This action cannot be undone.')) {
      resetProgress();
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">Your Profile</h1>
        
        {/* Profile Info */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="flex items-center mb-4 md:mb-0">
              <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center text-xl font-bold text-blue-600 dark:text-blue-400">
                {currentUser?.displayName?.charAt(0) || 'U'}
              </div>
              
              <div className="ml-4">
                {isEditing ? (
                  <input
                    type="text"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  />
                ) : (
                  <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
                    {currentUser?.displayName || 'User'}
                  </h2>
                )}
                <p className="text-gray-500 dark:text-gray-400">{currentUser?.email}</p>
              </div>
            </div>
            
            <div>
              {isEditing ? (
                <div className="space-x-2">
                  <button
                    onClick={handleSaveProfile}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setIsEditing(false)}
                    className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setIsEditing(true)}
                  className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  Edit Profile
                </button>
              )}
            </div>
          </div>
        </div>
        
        {/* Progress Summary */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Your Progress</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-2">Activity</h3>
              <ul className="space-y-2">
                <li className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Videos watched:</span>
                  <span className="font-medium text-gray-800 dark:text-white">{userProgress.videosWatched.length}</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Total watch time:</span>
                  <span className="font-medium text-gray-800 dark:text-white">
                    {Math.floor(userProgress.totalWatchTime / 3600)}h {Math.floor((userProgress.totalWatchTime % 3600) / 60)}m
                  </span>
                </li>
                <li className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Quests completed:</span>
                  <span className="font-medium text-gray-800 dark:text-white">{userProgress.completedQuests.length}</span>
                </li>
              </ul>
            </div>
            
            <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-2">Career Paths</h3>
              {userProgress.selectedPaths.length > 0 ? (
                <ul className="space-y-1">
                  {userProgress.selectedPaths.map((path, index) => (
                    <li key={index} className="text-gray-600 dark:text-gray-400">• {path}</li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-600 dark:text-gray-400">No career paths selected yet.</p>
              )}
            </div>
          </div>
        </div>
        
        {/* Account Actions */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Account Actions</h2>
          
          <div className="space-y-4">
            <button
              onClick={handleResetProgress}
              className="w-full py-2 px-4 border border-red-300 dark:border-red-700 text-red-600 dark:text-red-400 rounded-md hover:bg-red-50 dark:hover:bg-red-900/30 transition-colors text-left"
            >
              Reset Progress
            </button>
            
            <button
              onClick={handleLogout}
              className="w-full py-2 px-4 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-left"
            >
              Sign Out
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Profile;
