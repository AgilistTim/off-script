# Multiple Career Journey Implementation

## Overview
This document outlines the approach for refactoring the OffScript website to support multiple career journeys beyond the current plumbing example.

## Component Refactoring Strategy

### 1. Career Category Selection Interface

```tsx
// CareerCategorySelectionPage.tsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

interface CareerCategory {
  id: string;
  title: string;
  description: string;
  iconPath: string;
  color: string;
}

// Career categories based on our research
const careerCategories: CareerCategory[] = [
  {
    id: 'tech',
    title: 'Technology & Digital',
    description: 'Explore careers in software development, IT support, digital marketing, and more.',
    iconPath: '/icons/tech-icon.svg', // Placeholder path
    color: 'from-blue-500 to-indigo-600'
  },
  {
    id: 'creative',
    title: 'Creative & Media',
    description: 'Discover paths in design, content creation, video production, and entertainment.',
    iconPath: '/icons/creative-icon.svg', // Placeholder path
    color: 'from-purple-500 to-pink-600'
  },
  {
    id: 'trades',
    title: 'Skilled Trades',
    description: 'Learn about careers in electrical, plumbing, construction, and other hands-on fields.',
    iconPath: '/icons/trades-icon.svg', // Placeholder path
    color: 'from-cyan-500 to-blue-600'
  },
  {
    id: 'business',
    title: 'Business & Entrepreneurship',
    description: 'Explore opportunities in management, startups, marketing, and finance.',
    iconPath: '/icons/business-icon.svg', // Placeholder path
    color: 'from-amber-500 to-orange-600'
  },
  {
    id: 'healthcare',
    title: 'Healthcare & Wellbeing',
    description: 'Discover careers in nursing, therapy, fitness, and medical support.',
    iconPath: '/icons/healthcare-icon.svg', // Placeholder path
    color: 'from-emerald-500 to-green-600'
  }
];

const CareerCategorySelectionPage: React.FC = () => {
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-600 to-indigo-700 text-white flex flex-col items-center p-4 md:p-8">
      <header className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Explore Career Paths</h1>
        <p className="text-xl text-indigo-200 max-w-2xl mx-auto">
          Select a category that interests you to begin your exploration journey.
          Each path offers unique videos and insights to help you discover what resonates with you.
        </p>
      </header>

      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {careerCategories.map((category) => (
          <Link 
            to={`/video-exploration/${category.id}`} 
            key={category.id}
            className={`bg-gradient-to-br ${category.color} hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300 rounded-xl overflow-hidden`}
            onMouseEnter={() => setHoveredCategory(category.id)}
            onMouseLeave={() => setHoveredCategory(null)}
          >
            <div className="p-6 h-full flex flex-col">
              <div className="flex items-center mb-4">
                <div className="bg-white/20 p-3 rounded-full">
                  <img src={category.iconPath} alt="" className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-bold ml-3">{category.title}</h3>
              </div>
              <p className="text-white/90 mb-4 flex-grow">{category.description}</p>
              <div className="flex justify-end">
                <span className="bg-white/20 px-4 py-2 rounded-lg text-sm font-medium">
                  Explore Path
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-12 text-center">
        <p className="text-indigo-200 mb-4">Not sure where to start?</p>
        <Link 
          to="/assessment" 
          className="bg-white text-indigo-700 hover:bg-indigo-100 font-bold py-3 px-8 rounded-lg text-lg transition duration-300 shadow-lg"
        >
          Take Career Assessment
        </Link>
      </div>
    </div>
  );
};

export default CareerCategorySelectionPage;
```

### 2. Refactored Video Exploration Component

```tsx
// InteractiveVideoExplorationPage.tsx
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

// Define interfaces for our data structures
interface ReflectionPrompt {
  id: string;
  question: string;
  options: string[];
}

interface CareerVideo {
  id: string;
  title: string;
  description: string;
  youtubeId: string;
  thumbnailUrl: string;
  prompts: ReflectionPrompt[];
}

interface CategoryData {
  id: string;
  title: string;
  description: string;
  color: string;
  videos: CareerVideo[];
}

// Mock data for career categories
const categoryData: Record<string, CategoryData> = {
  'tech': {
    id: 'tech',
    title: 'Technology & Digital',
    description: 'Explore careers in software development, IT support, and digital marketing.',
    color: 'from-blue-500 to-indigo-600',
    videos: [
      {
        id: 'tech-1',
        title: 'A Day as a Software Developer',
        description: 'Follow Sarah through her day as a full-stack developer at a tech startup.',
        youtubeId: 'eIrMbAQSU34', // Example YouTube ID
        thumbnailUrl: 'https://img.youtube.com/vi/eIrMbAQSU34/hqdefault.jpg',
        prompts: [
          {
            id: 'tech-1-p1',
            question: 'Which aspect of software development shown in the video interests you most?',
            options: [
              'Problem-solving and logical thinking',
              'Creating visual interfaces that users interact with',
              'Working collaboratively with a team',
              'Building something that impacts many people'
            ]
          },
          {
            id: 'tech-1-p2',
            question: 'How do you feel about the balance of independent work and collaboration shown?',
            options: [
              'I prefer more independent work time',
              'I like the mix of solo work and team collaboration',
              'I would want more team interaction',
              'I\'m not sure if this environment would suit me'
            ]
          },
          {
            id: 'tech-1-p3',
            question: 'After seeing this glimpse of software development, what\'s your initial feeling?',
            options: [
              'Excited to learn more about this field',
              'Interested but have questions about specific aspects',
              'It seems challenging in a way I might enjoy',
              'This probably isn\'t the right fit for me'
            ]
          }
        ]
      }
      // Additional videos would be added here
    ]
  },
  'trades': {
    id: 'trades',
    title: 'Skilled Trades',
    description: 'Learn about careers in electrical, plumbing, construction, and other hands-on fields.',
    color: 'from-cyan-500 to-blue-600',
    videos: [
      {
        id: 'trades-1',
        title: 'A Day as a Plumber',
        description: 'Experience what it\'s like to work as a professional plumber solving real-world problems.',
        youtubeId: 'zci3Lw3FJKc',
        thumbnailUrl: 'https://img.youtube.com/vi/zci3Lw3FJKc/hqdefault.jpg',
        prompts: [
          {
            id: 'trades-1-p1',
            question: "Watching the plumber identify and fix the urinal issue, what part of that process did you find most engaging or satisfying?",
            options: [
              "The challenge of diagnosing the problem.",
              "The hands-on process of fixing it.",
              "The moment it was successfully repaired.",
              "The problem-solving aspect in general."
            ]
          },
          {
            id: 'trades-1-p2',
            question: "Imagine yourself doing this kind of work. Which of these aspects would make you feel a sense of purpose or excitement?",
            options: [
              "Helping people directly with a practical need.",
              "The satisfaction of seeing a tangible result from your work.",
              "The independence and variety of tasks each day.",
              "The opportunity to use technical skills and tools."
            ]
          },
          {
            id: 'trades-1-p3',
            question: "After seeing a glimpse of a plumber's day, what's your initial feeling about this type of career?",
            options: [
              "Intrigued and want to know more.",
              "It seems like a valuable and skilled trade.",
              "Probably not the right fit for me.",
              "I admire the problem-solving involved."
            ]
          }
        ]
      }
      // Additional videos would be added here
    ]
  }
  // Additional categories would be defined here
};

const InteractiveVideoExplorationPage: React.FC = () => {
  const { categoryId, videoId } = useParams<{ categoryId: string; videoId?: string }>();
  const [promptVisible, setPromptVisible] = useState(false);
  const [showRecommendationLink, setShowRecommendationLink] = useState(false);
  const [currentPromptData, setCurrentPromptData] = useState<ReflectionPrompt | null>(null);
  const [videoPlayed, setVideoPlayed] = useState(false);
  const [currentPromptIndex, setCurrentPromptIndex] = useState(0);
  
  // Get category data
  const category = categoryData[categoryId || 'trades'] || categoryData['trades'];
  
  // Get video data (first video if none specified)
  const video = videoId 
    ? category.videos.find(v => v.id === videoId) || category.videos[0]
    : category.videos[0];

  const handlePlayVideo = () => {
    setVideoPlayed(true);
    // Show first prompt after a short delay (simulating watching a bit of the video)
    setTimeout(() => {
      setCurrentPromptData(video.prompts[0]);
      setPromptVisible(true);
    }, 2000); // Adjust delay as needed
  };

  const handlePromptResponse = (response: string) => {
    console.log("User selected:", response); // In a real app, this would be saved
    setPromptVisible(false);
    const nextPromptIndex = currentPromptIndex + 1;
    if (nextPromptIndex < video.prompts.length) {
      setCurrentPromptIndex(nextPromptIndex);
      setTimeout(() => {
        setCurrentPromptData(video.prompts[nextPromptIndex]);
        setPromptVisible(true);
      }, 1000);
    } else {
      setShowRecommendationLink(true);
    }
  };

  // Generate gradient class based on category
  const gradientClass = `bg-gradient-to-br ${category.color}`;

  return (
    <div className={`min-h-screen ${gradientClass} text-white flex flex-col items-center p-4 md:p-8`}>
      <header className="text-center mb-8 md:mb-10">
        <h1 className="text-3xl md:text-4xl font-bold mb-3">Interactive Video: {video.title}</h1>
        <p className="text-md md:text-lg text-white/80">Watch the video and reflect on what aspects resonate with you.</p>
      </header>

      <div className="w-full max-w-2xl bg-white/10 backdrop-blur-md p-6 md:p-8 rounded-lg shadow-xl">
        {!videoPlayed ? (
          <div className='flex flex-col items-center'>
             <img src={video.thumbnailUrl} alt="Video Thumbnail" className="w-full max-w-md rounded-md mb-6 shadow-lg"/>
            <button
              onClick={handlePlayVideo}
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg text-lg transition duration-300 shadow-md mb-4"
            >
              Play Video: {video.title}
            </button>
            <p className='text-sm text-white/80'>This demo will show a video snippet and then ask you some questions to understand your interests.</p>
          </div>
        ) : (
          <div className="mb-6 aspect-video">
            <iframe 
              width="100%" 
              height="315" 
              src={`https://www.youtube.com/embed/${video.youtubeId}?autoplay=1&mute=1`} // Added autoplay and mute for better UX in a demo
              title="YouTube video player" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
              allowFullScreen
              className='rounded-md shadow-lg'
            ></iframe>
          </div>
        )}

        {promptVisible && videoPlayed && currentPromptData && (
          <div className="mt-6 p-4 bg-white/20 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-3 text-white">{currentPromptData.question}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {currentPromptData.options.map((option, index) => (
                <button 
                  key={index} 
                  onClick={() => handlePromptResponse(option)} 
                  className="bg-white/20 hover:bg-white/30 text-white py-2 px-4 rounded-md transition duration-300 w-full"
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        )}

        {showRecommendationLink && (
          <div className="mt-10 text-center">
            <p className="text-xl mb-4 text-white/90">Thank you for your responses! Let's see what career paths might interest you.</p>
            <Link
              to={`/recommendations/${categoryId}`}
              className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-8 rounded-lg text-lg transition duration-300 shadow-lg"
            >
              View My Recommendations
            </Link>
          </div>
        )}
      </div>
      <div className="mt-8 flex space-x-4">
         <Link to="/categories" className="text-white/80 hover:text-white transition duration-300">&larr; Back to Categories</Link>
         {category.videos.length > 1 && (
           <Link to={`/video-exploration/${categoryId}`} className="text-white/80 hover:text-white transition duration-300">Explore More Videos in {category.title} &rarr;</Link>
         )}
      </div>
    </div>
  );
};

export default InteractiveVideoExplorationPage;
```

### 3. Updated App Routing

```tsx
// App.tsx
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import CareerCategorySelectionPage from './pages/CareerCategorySelectionPage';
import InteractiveVideoExplorationPage from './pages/InteractiveVideoExplorationPage';
import PersonalizedRecommendationsPage from './pages/PersonalizedRecommendationsPage';
import DashboardPage from './pages/DashboardPage';
import AssessmentPage from './pages/AssessmentPage';
import './App.css'; // Ensure Tailwind is imported

const App: React.FC = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/categories" element={<CareerCategorySelectionPage />} />
          <Route path="/video-exploration/:categoryId" element={<InteractiveVideoExplorationPage />} />
          <Route path="/video-exploration/:categoryId/:videoId" element={<InteractiveVideoExplorationPage />} />
          <Route path="/recommendations/:categoryId" element={<PersonalizedRecommendationsPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/assessment" element={<AssessmentPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
```

### 4. Updated Home Page with Category Selection

```tsx
// HomePage.tsx
import React from 'react';
import { Link } from 'react-router-dom';

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 to-blue-500 text-white flex flex-col items-center justify-center p-8">
      <header className="text-center mb-12">
        <h1 className="text-5xl font-bold mb-4">Welcome to OffScript</h1>
        <p className="text-xl text-purple-200 mb-8">Discover your path. Author your future. Find your purpose.</p>
        <p className="text-lg max-w-2xl mx-auto mb-8">
          OffScript is a revolutionary platform designed to help young people like you explore diverse career paths, understand your emotional resonance with different professions, and build a future you are truly passionate about.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/categories"
            className="bg-white text-purple-600 font-bold py-3 px-8 rounded-lg text-lg hover:bg-purple-100 transition duration-300 shadow-lg"
          >
            Explore Career Categories
          </Link>
          <Link
            to="/assessment"
            className="bg-transparent border-2 border-white text-white font-bold py-3 px-8 rounded-lg text-lg hover:bg-white/10 transition duration-300 shadow-lg"
          >
            Take Career Assessment
          </Link>
        </div>
      </header>

      <section className="w-full max-w-4xl mt-10">
        <h2 className="text-3xl font-semibold text-center mb-8">How OffScript Works</h2>
        <div className="grid md:grid-cols-3 gap-8 text-center">
          <div className="bg-white/20 p-6 rounded-lg shadow-xl">
            <div className="bg-white/20 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold">1</span>
            </div>
            <h3 className="text-2xl font-semibold mb-3">Explore & Discover</h3>
            <p className="text-purple-200">Watch videos about different careers and reflect on what aspects resonate with you.</p>
          </div>
          <div className="bg-white/20 p-6 rounded-lg shadow-xl">
            <div className="bg-white/20 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold">2</span>
            </div>
            <h3 className="text-2xl font-semibold mb-3">Get Personalized Insights</h3>
            <p className="text-purple-200">Receive tailored career suggestions based on your unique interests and responses.</p>
          </div>
          <div className="bg-white/20 p-6 rounded-lg shadow-xl">
            <div className="bg-white/20 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold">3</span>
            </div>
            <h3 className="text-2xl font-semibold mb-3">Plan Your Journey</h3>
            <p className="text-purple-200">Access your personalized dashboard with actionable steps toward your potential future.</p>
          </div>
        </div>
      </section>

      <section className="w-full max-w-4xl mt-16">
        <h2 className="text-3xl font-semibold text-center mb-6">Featured Career Categories</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <Link to="/video-exploration/tech" className="bg-gradient-to-br from-blue-500 to-indigo-600 p-4 rounded-lg text-center hover:shadow-lg transition duration-300">
            <h3 className="font-semibold text-lg">Technology</h3>
          </Link>
          <Link to="/video-exploration/creative" className="bg-gradient-to-br from-purple-500 to-pink-600 p-4 rounded-lg text-center hover:shadow-lg transition duration-300">
            <h3 className="font-semibold text-lg">Creative & Media</h3>
          </Link>
          <Link to="/video-exploration/trades" className="bg-gradient-to-br from-cyan-500 to-blue-600 p-4 rounded-lg text-center hover:shadow-lg transition duration-300">
            <h3 className="font-semibold text-lg">Skilled Trades</h3>
          </Link>
        </div>
        <div className="text-center mt-6">
          <Link to="/categories" className="text-purple-200 hover:text-white underline transition duration-300">
            View All Categories
          </Link>
        </div>
      </section>

      <footer className="mt-16 text-center text-purple-300">
        <p>&copy; 2025 OffScript. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default HomePage;
```

### 5. Assessment Page for OpenAI Integration

```tsx
// AssessmentPage.tsx
import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const AssessmentPage: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Add initial welcome message from assistant
  useEffect(() => {
    setMessages([
      {
        role: 'assistant',
        content: "Hi there! I'm your OffScript Career Guide. I'm here to help you explore different career paths that might interest you. What kinds of activities or subjects do you enjoy spending time on?",
        timestamp: new Date()
      }
    ]);
  }, []);

  // Auto-scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async () => {
    if (!input.trim()) return;
    
    // Add user message to chat
    const userMessage = {
      role: 'user',
      content: input,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    
    try {
      // This is a placeholder for the actual API call
      // In the real implementation, this would call the backend API
      // that communicates with the OpenAI Assistant
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Placeholder response - this would come from the OpenAI Assistant
      let responseContent = "I'm still being configured. Once the OpenAI Assistant is set up, I'll be able to provide personalized guidance based on your interests and preferences.";
      
      // Add assistant response to chat
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: responseContent,
        timestamp: new Date()
      }]);
    } catch (error) {
      console.error('Error getting response:', error);
      // Add error message
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: "I'm sorry, I'm having trouble responding right now. Please try again in a moment.",
        timestamp: new Date()
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 to-purple-700 flex flex-col items-center p-4 md:p-8">
      <header className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">Career Assessment</h1>
        <p className="text-lg text-indigo-200 max-w-2xl">
          Chat with our AI guide to explore your interests, values, and potential career paths.
          This conversation will help us understand what matters to you.
        </p>
      </header>

      <div className="w-full max-w-3xl bg-white/10 backdrop-blur-md rounded-lg shadow-xl overflow-hidden flex flex-col h-[600px]">
        <div className="p-4 bg-indigo-700 text-white">
          <h2 className="text-xl font-semibold">Career Exploration Guide</h2>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((msg, index) => (
            <div 
              key={index} 
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div 
                className={`max-w-[80%] p-3 rounded-lg ${
                  msg.role === 'user' 
                    ? 'bg-indigo-500 text-white rounded-br-none' 
                    : 'bg-white/20 text-white rounded-bl-none'
                }`}
              >
                {msg.content}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-white/20 text-white p-3 rounded-lg rounded-bl-none max-w-[80%]">
                <div className="flex space-x-2">
                  <div className="w-2 h-2 rounded-full bg-white animate-bounce"></div>
                  <div className="w-2 h-2 rounded-full bg-white animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  <div className="w-2 h-2 rounded-full bg-white animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
        
        <div className="p-4 border-t border-white/10">
          <div className="flex space-x-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Tell me about your interests..."
              className="flex-1 bg-white/10 text-white placeholder-white/50 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
            <button
              onClick={handleSendMessage}
              disabled={isLoading}
              className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-lg transition duration-200 disabled:opacity-50"
            >
              Send
            </button>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <Link to="/" className="text-indigo-200 hover:text-white transition duration-300">&larr; Back to Home</Link>
      </div>
    </div>
  );
};

export default AssessmentPage;
```

## Implementation Steps

1. **Create New Components**:
   - CareerCategorySelectionPage.tsx
   - AssessmentPage.tsx (for OpenAI integration)

2. **Refactor Existing Components**:
   - Update InteractiveVideoExplorationPage.tsx to be category-aware
   - Update PersonalizedRecommendationsPage.tsx to handle multiple categories
   - Update DashboardPage.tsx to show cross-category insights
   - Update HomePage.tsx to link to categories

3. **Update Routing**:
   - Implement React Router with parameterized routes
   - Add routes for new components
   - Update navigation links throughout the application

4. **Create Data Models**:
   - Define interfaces for career categories, videos, and prompts
   - Create mock data for initial categories
   - Prepare for future API integration

5. **Style Updates**:
   - Create category-specific color schemes
   - Ensure consistent styling across all components
   - Maintain mobile responsiveness

## Next Steps

1. Implement these refactored components in the existing codebase
2. Test navigation flow between multiple career categories
3. Prepare for OpenAI assistant integration in the Assessment page
4. Begin sourcing content for the prioritized career categories
