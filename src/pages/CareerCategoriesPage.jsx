import React from 'react';
import { Link } from 'react-router-dom';
import { getVideosForCategory } from './validatedVideos';

const CareerCategoriesPage = () => {
  const categories = [
    {
      id: 'technology',
      name: 'Technology',
      description: 'Explore careers in software development, data science, cybersecurity, and more.',
      icon: '💻',
      color: 'from-blue-500 to-cyan-400',
      examples: ['Software Developer', 'Data Scientist', 'UX Designer', 'IT Manager', 'Cybersecurity Analyst']
    },
    {
      id: 'healthcare',
      name: 'Healthcare',
      description: 'Discover opportunities in medicine, nursing, therapy, and healthcare administration.',
      icon: '🏥',
      color: 'from-green-500 to-emerald-400',
      examples: ['Physician', 'Registered Nurse', 'Physical Therapist', 'Healthcare Administrator', 'Medical Researcher']
    },
    {
      id: 'creative',
      name: 'Creative Arts',
      description: 'Find your path in design, writing, film, music, and other creative fields.',
      icon: '🎨',
      color: 'from-purple-500 to-pink-400',
      examples: ['Graphic Designer', 'Content Creator', 'Film Producer', 'Musician', 'Photographer']
    },
    {
      id: 'business',
      name: 'Business & Finance',
      description: 'Explore careers in management, marketing, finance, and entrepreneurship.',
      icon: '📊',
      color: 'from-amber-500 to-yellow-400',
      examples: ['Marketing Manager', 'Financial Analyst', 'Entrepreneur', 'Human Resources', 'Business Consultant']
    },
    {
      id: 'trades',
      name: 'Skilled Trades',
      description: 'Discover opportunities in construction, manufacturing, electrical work, and more.',
      icon: '🔧',
      color: 'from-red-500 to-orange-400',
      examples: ['Electrician', 'Carpenter', 'Plumber', 'Welder', 'HVAC Technician']
    },
    {
      id: 'education',
      name: 'Education',
      description: 'Find your path in teaching, training, counseling, and educational administration.',
      icon: '🎓',
      color: 'from-indigo-500 to-blue-400',
      examples: ['Teacher', 'School Counselor', 'Education Administrator', 'Corporate Trainer', 'Educational Researcher']
    }
  ];

  // Get the first video ID for each category to use in links
  const getCategoryFirstVideoId = (categoryId) => {
    const videos = getVideosForCategory(categoryId);
    return videos && videos.length > 0 ? videos[0].id : null;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-600 to-indigo-700 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Explore Career Categories</h1>
          <p className="text-xl text-indigo-200 max-w-3xl mx-auto">
            Discover different career paths that might inspire you. Each category offers videos and insights from professionals in the field.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category) => {
            const firstVideoId = getCategoryFirstVideoId(category.id);
            return (
              <div 
                key={category.id}
                className={`bg-gradient-to-br ${category.color} rounded-xl shadow-xl overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-2xl`}
              >
                <div className="p-6">
                  <div className="text-4xl mb-4">{category.icon}</div>
                  <h3 className="text-2xl font-bold mb-2">{category.name}</h3>
                  <p className="text-white/90 mb-4">{category.description}</p>
                  <div className="mb-6">
                    <h4 className="font-semibold mb-2">Example Careers:</h4>
                    <ul className="list-disc list-inside text-white/90">
                      {category.examples.map((example, index) => (
                        <li key={index}>{example}</li>
                      ))}
                    </ul>
                  </div>
                  <Link 
                    to={firstVideoId ? `/video-exploration/${category.id}/${firstVideoId}` : `/video-exploration/${category.id}`}
                    className="inline-block bg-white/20 hover:bg-white/30 text-white font-medium py-2 px-4 rounded-lg transition duration-300"
                  >
                    Explore {category.name} Videos
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-12 text-center">
          <p className="text-xl mb-6">Not sure where to start? Our AI guide can help you discover your interests.</p>
          <Link 
            to="/assessment"
            className="inline-block bg-white text-indigo-700 font-bold py-3 px-8 rounded-lg shadow-lg hover:bg-indigo-100 transition duration-300"
          >
            Get Personalized Guidance
          </Link>
        </div>

        <div className="mt-8 text-center">
          <Link to="/" className="text-indigo-200 hover:text-white transition duration-300">
            &larr; Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CareerCategoriesPage;
