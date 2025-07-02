import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';

// Placeholder video data
const demoVideos = [
  {
    id: 'video1',
    title: 'How I Became a Software Developer Without a Degree',
    creator: 'TechJourney',
    thumbnail: 'https://via.placeholder.com/320x180?text=Software+Dev',
    duration: '12:45',
    views: '45K',
    category: 'Technology'
  },
  {
    id: 'video2',
    title: 'My Path to Becoming a Renewable Energy Technician',
    creator: 'GreenFuture',
    thumbnail: 'https://via.placeholder.com/320x180?text=Energy+Tech',
    duration: '8:32',
    views: '28K',
    category: 'Green Energy'
  },
  {
    id: 'video3',
    title: 'From Retail to Healthcare: My Career Change Story',
    creator: 'HealthCareer',
    thumbnail: 'https://via.placeholder.com/320x180?text=Healthcare',
    duration: '15:20',
    views: '37K',
    category: 'Healthcare'
  },
  {
    id: 'video4',
    title: 'Starting My Own Digital Marketing Business',
    creator: 'MarketingPro',
    thumbnail: 'https://via.placeholder.com/320x180?text=Marketing',
    duration: '10:15',
    views: '52K',
    category: 'Digital Media'
  },
  {
    id: 'video5',
    title: 'Apprenticeship vs. University: My Experience in Construction',
    creator: 'BuilderPath',
    thumbnail: 'https://via.placeholder.com/320x180?text=Construction',
    duration: '14:08',
    views: '31K',
    category: 'Skilled Trades'
  },
  {
    id: 'video6',
    title: 'How I Broke Into the Finance Industry',
    creator: 'FinanceInsider',
    thumbnail: 'https://via.placeholder.com/320x180?text=Finance',
    duration: '11:52',
    views: '43K',
    category: 'FinTech'
  }
];

// Video card component
const VideoCard: React.FC<{
  video: typeof demoVideos[0];
  onClick: () => void;
}> = ({ video, onClick }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden cursor-pointer"
      onClick={onClick}
    >
      <div className="relative">
        <img 
          src={video.thumbnail} 
          alt={video.title}
          className="w-full h-48 object-cover"
        />
        <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded">
          {video.duration}
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="font-semibold text-gray-800 dark:text-white mb-1 line-clamp-2">
          {video.title}
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
          {video.creator}
        </p>
        <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
          <span>{video.views} views</span>
          <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded-full">
            {video.category}
          </span>
        </div>
      </div>
    </motion.div>
  );
};

const VideoExploration: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedVideo, setSelectedVideo] = useState<typeof demoVideos[0] | null>(null);
  
  // Filter videos based on search query
  const filteredVideos = demoVideos.filter(video => 
    video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    video.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    video.creator.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const handleVideoClick = (video: typeof demoVideos[0]) => {
    setSelectedVideo(video);
  };
  
  const closeVideoModal = () => {
    setSelectedVideo(null);
  };

  return (
    <div className="max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-4 md:mb-0">
            Video Exploration
          </h1>
          
          <div className="relative">
            <input
              type="text"
              placeholder="Search videos..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 w-full md:w-64 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            />
            <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
        </div>
        
        {/* Categories */}
        <div className="flex overflow-x-auto pb-4 mb-6 space-x-2">
          {['All', 'Technology', 'Green Energy', 'Healthcare', 'FinTech', 'Skilled Trades', 'Digital Media'].map((category) => (
            <button
              key={category}
              onClick={() => setSearchQuery(category === 'All' ? '' : category)}
              className={`px-4 py-2 rounded-full whitespace-nowrap ${
                (category === 'All' && searchQuery === '') || 
                (category !== 'All' && searchQuery === category)
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
        
        {/* Video Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredVideos.map((video) => (
            <VideoCard 
              key={video.id} 
              video={video} 
              onClick={() => handleVideoClick(video)} 
            />
          ))}
        </div>
        
        {filteredVideos.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600 dark:text-gray-400">
              No videos found matching your search.
            </p>
          </div>
        )}
      </motion.div>
      
      {/* Video Modal (placeholder) */}
      {selectedVideo && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-4xl overflow-hidden">
            <div className="p-4 border-b dark:border-gray-700 flex justify-between items-center">
              <h3 className="font-semibold text-gray-800 dark:text-white">
                {selectedVideo.title}
              </h3>
              <button 
                onClick={closeVideoModal}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                ✕
              </button>
            </div>
            
            <div className="aspect-w-16 aspect-h-9 bg-gray-900">
              <div className="flex items-center justify-center h-full">
                <p className="text-white text-center p-4">
                  Video player placeholder - in the actual implementation, this would be a real video player.
                </p>
              </div>
            </div>
            
            <div className="p-4">
              <h4 className="font-medium text-gray-800 dark:text-white mb-2">
                {selectedVideo.title}
              </h4>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                {selectedVideo.creator} • {selectedVideo.views} views
              </p>
              
              <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <h5 className="font-medium text-gray-800 dark:text-white mb-2">
                  Reflect on this video
                </h5>
                <p className="text-gray-600 dark:text-gray-300 mb-3">
                  What aspects of this career path interest you the most?
                </p>
                <textarea
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  rows={3}
                  placeholder="Share your thoughts..."
                ></textarea>
                <button className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoExploration;
