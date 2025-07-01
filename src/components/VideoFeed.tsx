import React, { useState } from 'react';
import { Play, Clock, User, ThumbsUp, Eye, ExternalLink } from 'lucide-react';

interface Video {
  id: string;
  title: string;
  creator: string;
  thumbnail: string;
  duration: string;
  views: string;
  likes: string;
  sector: string;
  role: string;
  verified: boolean;
  videoUrl: string;
  ukFocused: boolean;
  salaryMentioned: string;
  description: string;
  location: string;
}

const videos: Video[] = [
  {
    id: '1',
    title: 'Day in the Life: Wind Turbine Technician in Scotland',
    creator: 'James MacLeod',
    thumbnail: 'https://images.pexels.com/photos/9875899/pexels-photo-9875899.jpeg?auto=compress&cs=tinysrgb&w=400',
    duration: '8:45',
    views: '127K',
    likes: '3.2K',
    sector: 'Green Energy',
    role: 'Wind Turbine Technician',
    verified: true,
    videoUrl: 'https://www.youtube.com/embed/ZbZSe6N_BXs',
    ukFocused: true,
    salaryMentioned: '£45K starting, £55K with experience',
    description: 'Follow James through a typical day maintaining offshore wind turbines in the North Sea. Learn about the physical demands, safety protocols, and career progression in renewable energy.',
    location: 'Aberdeen, Scotland'
  },
  {
    id: '2',
    title: 'Frontend Developer: Building FinTech Apps in London',
    creator: 'Priya Sharma',
    thumbnail: 'https://images.pexels.com/photos/574077/pexels-photo-574077.jpeg?auto=compress&cs=tinysrgb&w=400',
    duration: '12:30',
    views: '89K',
    likes: '2.1K',
    sector: 'Technology',
    role: 'Frontend Developer',
    verified: true,
    videoUrl: 'https://www.youtube.com/embed/UB1O30fR-EE',
    ukFocused: true,
    salaryMentioned: '£65K after 18-month bootcamp',
    description: 'Priya shares her journey from marketing to tech through a London coding bootcamp. See her daily work building financial applications and the skills that matter most.',
    location: 'London, England'
  },
  {
    id: '3',
    title: 'NHS Healthcare Assistant: Real Patient Care Stories',
    creator: 'Sarah Johnson',
    thumbnail: 'https://images.pexels.com/photos/4021775/pexels-photo-4021775.jpeg?auto=compress&cs=tinysrgb&w=400',
    duration: '6:20',
    views: '156K',
    likes: '4.8K',
    sector: 'Healthcare',
    role: 'Healthcare Assistant',
    verified: true,
    videoUrl: 'https://www.youtube.com/embed/QH2-TGUlwu4',
    ukFocused: true,
    salaryMentioned: '£22K starting, £35K with experience',
    description: 'Sarah takes you through her shifts at an NHS hospital, showing the rewarding but challenging work of patient care and the clear progression pathways available.',
    location: 'Birmingham, England'
  },
  {
    id: '4',
    title: 'Data Scientist: AI Projects at UK Startup',
    creator: 'Alex Chen',
    thumbnail: 'https://images.pexels.com/photos/7567486/pexels-photo-7567486.jpeg?auto=compress&cs=tinysrgb&w=400',
    duration: '15:15',
    views: '94K',
    likes: '2.7K',
    sector: 'Technology',
    role: 'Data Scientist',
    verified: true,
    videoUrl: 'https://www.youtube.com/embed/X8PmDvoLQ_c',
    ukFocused: true,
    salaryMentioned: '£75K with self-taught skills + portfolio',
    description: 'Alex demonstrates how they built machine learning models for a Manchester startup, showing the practical application of data science in business.',
    location: 'Manchester, England'
  },
  {
    id: '5',
    title: 'Electrician Apprentice: Smart Home Installation',
    creator: 'Tom Williams',
    thumbnail: 'https://images.pexels.com/photos/8849295/pexels-photo-8849295.jpeg?auto=compress&cs=tinysrgb&w=400',
    duration: '10:05',
    views: '73K',
    likes: '1.9K',
    sector: 'Skilled Trades',
    role: 'Electrician',
    verified: true,
    videoUrl: 'https://www.youtube.com/embed/09839DpTctU',
    ukFocused: true,
    salaryMentioned: '£18K apprentice, £42K qualified',
    description: 'Tom shows the modern side of electrical work, installing smart home systems and renewable energy connections while earning and learning through his apprenticeship.',
    location: 'Newcastle, England'
  },
  {
    id: '6',
    title: 'UX Designer: From Bootcamp to BBC',
    creator: 'Emma Thompson',
    thumbnail: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=400',
    duration: '9:42',
    views: '112K',
    likes: '3.5K',
    sector: 'Creative',
    role: 'UX Designer',
    verified: true,
    videoUrl: 'https://www.youtube.com/embed/Ovj4hFxko7c',
    ukFocused: true,
    salaryMentioned: '£38K entry level, £58K after 3 years',
    description: 'Emma shares her career transition from retail to UX design through an intensive bootcamp, now working on digital products for the BBC.',
    location: 'London, England'
  },
  {
    id: '7',
    title: 'Solar Panel Installer: Green Energy Career',
    creator: 'David Roberts',
    thumbnail: 'https://images.pexels.com/photos/9875899/pexels-photo-9875899.jpeg?auto=compress&cs=tinysrgb&w=400',
    duration: '7:30',
    views: '68K',
    likes: '1.8K',
    sector: 'Green Energy',
    role: 'Solar Installer',
    verified: true,
    videoUrl: 'https://www.youtube.com/embed/ZbZSe6N_BXs',
    ukFocused: true,
    salaryMentioned: '£35K starting, £45K with certifications',
    description: 'David demonstrates residential and commercial solar installations, explaining the technical skills needed and the growing demand for renewable energy workers.',
    location: 'Bristol, England'
  },
  {
    id: '8',
    title: 'Cybersecurity Analyst: Protecting UK Businesses',
    creator: 'Zara Ahmed',
    thumbnail: 'https://images.pexels.com/photos/60504/security-protection-anti-virus-software-60504.jpeg?auto=compress&cs=tinysrgb&w=400',
    duration: '11:20',
    views: '85K',
    likes: '2.4K',
    sector: 'Technology',
    role: 'Cybersecurity Analyst',
    verified: true,
    videoUrl: 'https://www.youtube.com/embed/UB1O30fR-EE',
    ukFocused: true,
    salaryMentioned: '£50K entry, £85K senior level',
    description: 'Zara shows the daily work of monitoring and protecting business networks, explaining how she entered cybersecurity through professional certifications.',
    location: 'Edinburgh, Scotland'
  }
];

const VideoFeed: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [filteredVideos, setFilteredVideos] = useState(videos);
  const [playingVideo, setPlayingVideo] = useState<Video | null>(null);

  const sectors = ['All', 'Technology', 'Green Energy', 'Healthcare', 'Skilled Trades', 'Creative'];

  const handleFilterChange = (sector: string) => {
    setSelectedFilter(sector);
    if (sector === 'All') {
      setFilteredVideos(videos);
    } else {
      setFilteredVideos(videos.filter(video => video.sector === sector));
    }
  };

  const handleVideoPlay = (video: Video) => {
    setPlayingVideo(video);
  };

  const handleVideoClose = () => {
    setPlayingVideo(null);
  };

  return (
    <section id="videos" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Real UK Career Stories
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Watch verified UK professionals share their daily experiences, salary realities, 
            and career journeys in Britain's fastest-growing industries.
          </p>
          <div className="mt-6 bg-green-50 border border-green-200 rounded-lg p-4 max-w-2xl mx-auto">
            <p className="text-green-800 text-sm">
              <strong>All videos feature UK-based professionals</strong> with verified credentials 
              and real salary discussions based on current UK market rates.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {sectors.map((sector) => (
            <button
              key={sector}
              onClick={() => handleFilterChange(sector)}
              className={`px-6 py-3 rounded-full transition-all duration-300 ${
                selectedFilter === sector
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {sector}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredVideos.map((video) => (
            <div
              key={video.id}
              className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden cursor-pointer"
              onClick={() => handleVideoPlay(video)}
            >
              <div className="relative">
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                  <div className="bg-white/90 p-4 rounded-full hover:bg-white transition-colors">
                    <Play className="h-8 w-8 text-gray-900" />
                  </div>
                </div>
                <div className="absolute bottom-3 right-3 bg-black/80 text-white px-2 py-1 rounded text-sm">
                  {video.duration}
                </div>
                {video.verified && (
                  <div className="absolute top-3 left-3 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                    UK Verified
                  </div>
                )}
                {video.ukFocused && (
                  <div className="absolute top-3 right-3 bg-blue-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                    🇬🇧 UK
                  </div>
                )}
              </div>

              <div className="p-6">
                <div className="flex items-center space-x-2 mb-3">
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 text-xs rounded-full font-semibold">
                    {video.sector}
                  </span>
                  <span className="px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                    {video.role}
                  </span>
                </div>

                <h3 className="font-semibold text-gray-900 mb-3 line-clamp-2">
                  {video.title}
                </h3>

                <div className="flex items-center space-x-2 mb-3">
                  <User className="h-4 w-4 text-gray-500" />
                  <span className="text-sm text-gray-600">{video.creator}</span>
                  <span className="text-sm text-gray-500">• {video.location}</span>
                </div>

                {video.salaryMentioned && (
                  <div className="mb-3 text-sm bg-yellow-50 border border-yellow-200 rounded-lg p-2">
                    <strong className="text-yellow-800">UK Salary Discussed:</strong>
                    <span className="text-yellow-700 ml-1">{video.salaryMentioned}</span>
                  </div>
                )}

                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1">
                      <Eye className="h-4 w-4" />
                      <span>{video.views}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <ThumbsUp className="h-4 w-4" />
                      <span>{video.likes}</span>
                    </div>
                  </div>
                </div>

                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    handleVideoPlay(video);
                  }}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg transition-colors duration-300 flex items-center justify-center space-x-2"
                >
                  <Play className="h-4 w-4" />
                  <span>Watch Career Story</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105">
            Load More UK Career Videos
          </button>
        </div>
      </div>

      {/* Video Modal */}
      {playingVideo && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden">
            <div className="flex justify-between items-center p-4 border-b">
              <div>
                <h3 className="text-lg font-semibold">{playingVideo.title}</h3>
                <p className="text-sm text-gray-600">{playingVideo.creator} • {playingVideo.location}</p>
              </div>
              <button
                onClick={handleVideoClose}
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                ×
              </button>
            </div>
            <div className="aspect-video">
              <iframe
                src={playingVideo.videoUrl}
                title={playingVideo.title}
                className="w-full h-full"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
            <div className="p-4 bg-gray-50">
              <div className="mb-3">
                <p className="text-sm text-gray-700">{playingVideo.description}</p>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-gray-600">
                    <strong>Role:</strong> {playingVideo.role}
                  </span>
                  <span className="text-sm text-gray-600">
                    <strong>Salary:</strong> {playingVideo.salaryMentioned}
                  </span>
                  <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                    UK Verified Professional
                  </span>
                </div>
                <a
                  href={playingVideo.videoUrl.replace('/embed/', '/watch?v=')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-1 text-blue-600 hover:text-blue-800 text-sm"
                >
                  <ExternalLink className="h-4 w-4" />
                  <span>Watch on YouTube</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default VideoFeed;