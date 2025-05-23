import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getVideosForCategory, getVideoById, getQuestionsForVideo } from './validatedVideos';
import './InteractiveVideoExplorationPage.css';

const InteractiveVideoExplorationPage = () => {
  const { category, videoId } = useParams();
  const navigate = useNavigate();
  
  const [videos, setVideos] = useState([]);
  const [currentVideo, setCurrentVideo] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [showReflection, setShowReflection] = useState(false);
  const [reflectionResponses, setReflectionResponses] = useState({});
  const [videoError, setVideoError] = useState(false);
  const [currentCategory, setCurrentCategory] = useState(category || 'technology');
  const [activeQuestion, setActiveQuestion] = useState(null);
  const [careerSuggestions, setCareerSuggestions] = useState([]);
  
  // Load videos for the selected category
  useEffect(() => {
    if (!category) {
      navigate('/categories');
      return;
    }
    
    const categoryToUse = category || 'technology';
    setCurrentCategory(categoryToUse);
    
    const categoryVideos = getVideosForCategory(categoryToUse);
    setVideos(categoryVideos);
    
    // If no specific video is selected, use the first one
    if (!videoId && categoryVideos.length > 0) {
      navigate(`/video-exploration/${categoryToUse}/${categoryVideos[0].id}`);
    } else if (videoId) {
      const video = getVideoById(videoId);
      if (video) {
        setCurrentVideo(video);
        setQuestions(getQuestionsForVideo(videoId));
        // Reset video error state when changing videos
        setVideoError(false);
      } else {
        // If video not found, redirect to first video in category
        if (categoryVideos.length > 0) {
          navigate(`/video-exploration/${categoryToUse}/${categoryVideos[0].id}`);
        } else {
          navigate('/categories');
        }
      }
    }
  }, [category, videoId, navigate]);

  // Handle reflection response changes
  const handleReflectionResponse = (questionIndex, response) => {
    setReflectionResponses(prev => ({
      ...prev,
      [currentVideo.id]: {
        ...(prev[currentVideo.id] || {}),
        [questionIndex]: response
      }
    }));
    
    // Store responses in localStorage for persistence
    const allResponses = {
      ...reflectionResponses,
      [currentVideo.id]: {
        ...(reflectionResponses[currentVideo.id] || {}),
        [questionIndex]: response
      }
    };
    localStorage.setItem('reflectionResponses', JSON.stringify(allResponses));
    
    // Generate career suggestions based on responses
    generateCareerSuggestions(allResponses);
  };
  
  // Load saved responses from localStorage on initial load
  useEffect(() => {
    const savedResponses = localStorage.getItem('reflectionResponses');
    if (savedResponses) {
      try {
        const parsedResponses = JSON.parse(savedResponses);
        setReflectionResponses(parsedResponses);
        generateCareerSuggestions(parsedResponses);
      } catch (e) {
        console.error('Error parsing saved responses:', e);
      }
    }
  }, []);

  // Simple algorithm to generate career suggestions based on responses
  const generateCareerSuggestions = (responses) => {
    // This is a placeholder for a more sophisticated algorithm
    // In a real implementation, this would analyze response patterns
    
    const allResponses = Object.values(responses).flatMap(videoResponses => 
      Object.values(videoResponses)
    );
    
    const keywords = {
      outdoor: ['outdoor', 'nature', 'outside', 'physical', 'active', 'hands-on'],
      creative: ['creative', 'design', 'art', 'music', 'writing', 'visual'],
      technical: ['technical', 'computer', 'code', 'programming', 'technology', 'software'],
      analytical: ['analytical', 'analysis', 'data', 'research', 'problem-solving', 'logical'],
      social: ['people', 'helping', 'teaching', 'communicating', 'team', 'social']
    };
    
    const scores = {
      outdoor: 0,
      creative: 0,
      technical: 0,
      analytical: 0,
      social: 0
    };
    
    // Count keyword occurrences in responses
    allResponses.forEach(response => {
      if (!response) return;
      
      const lowerResponse = response.toLowerCase();
      
      Object.entries(keywords).forEach(([category, words]) => {
        words.forEach(word => {
          if (lowerResponse.includes(word)) {
            scores[category]++;
          }
        });
      });
    });
    
    // Map scores to career suggestions
    const suggestions = [];
    
    if (scores.outdoor > 1) {
      suggestions.push('Physical Therapist', 'Park Ranger', 'Environmental Scientist');
    }
    
    if (scores.creative > 1) {
      suggestions.push('Graphic Designer', 'Content Creator', 'UX Designer');
    }
    
    if (scores.technical > 1) {
      suggestions.push('Software Developer', 'IT Specialist', 'Cybersecurity Analyst');
    }
    
    if (scores.analytical > 1) {
      suggestions.push('Data Scientist', 'Financial Analyst', 'Research Scientist');
    }
    
    if (scores.social > 1) {
      suggestions.push('Teacher', 'Counselor', 'Human Resources Specialist');
    }
    
    // Take top 5 unique suggestions
    setCareerSuggestions([...new Set(suggestions)].slice(0, 5));
  };

  // Navigate to next video in the category
  const handleNextVideo = () => {
    const currentIndex = videos.findIndex(v => v.id === currentVideo.id);
    if (currentIndex < videos.length - 1) {
      navigate(`/video-exploration/${currentCategory}/${videos[currentIndex + 1].id}`);
    } else {
      // If this was the last video, go back to categories
      navigate('/categories');
    }
    setShowReflection(false);
    setActiveQuestion(null);
  };

  // Toggle reflection panel
  const toggleReflection = () => {
    setShowReflection(!showReflection);
    setActiveQuestion(null);
  };

  // Handle video error
  const handleVideoError = () => {
    console.error('Error loading video:', currentVideo?.id);
    setVideoError(true);
  };

  // Open YouTube video in a new tab
  const openVideoInNewTab = () => {
    if (currentVideo) {
      window.open(`https://www.youtube.com/watch?v=${currentVideo.id}`, '_blank');
    }
  };

  // Check if a specific question has been answered
  const isQuestionAnswered = (questionIndex) => {
    return Boolean((reflectionResponses[currentVideo?.id] || {})[questionIndex]?.trim());
  };

  // Check if all questions have responses
  const allQuestionsAnswered = () => {
    if (!currentVideo || !questions.length) return false;
    
    return questions.every((_, index) => isQuestionAnswered(index));
  };

  // Handle question click to focus on that question
  const handleQuestionClick = (index) => {
    setActiveQuestion(activeQuestion === index ? null : index);
  };

  // Handle playlist item click
  const handlePlaylistItemClick = (videoItem) => {
    navigate(`/video-exploration/${currentCategory}/${videoItem.id}`);
  };

  return (
    <div className="video-exploration-container">
      <div className="category-header">
        <h2>{currentCategory.charAt(0).toUpperCase() + currentCategory.slice(1)} Careers</h2>
        <button onClick={() => navigate('/categories')} className="back-button">
          ← Back to Categories
        </button>
      </div>
      
      <div className="video-section">
        {currentVideo ? (
          <>
            <h3>{currentVideo.title}</h3>
            <div className="video-container">
              {/* Direct iframe embedding for more reliable playback */}
              <iframe
                src={`https://www.youtube.com/embed/${currentVideo.id}?rel=0&modestbranding=1`}
                title={currentVideo.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="youtube-player"
                onError={handleVideoError}
              ></iframe>
              
              {/* Fallback for unavailable videos */}
              {videoError && (
                <div className="video-fallback">
                  <p>This video cannot be embedded due to YouTube restrictions.</p>
                  <p>You can watch it directly on YouTube without leaving our site:</p>
                  <div className="video-fallback-actions">
                    <button 
                      onClick={openVideoInNewTab} 
                      className="youtube-link-button"
                    >
                      Open Video in New Tab
                    </button>
                  </div>
                  <p className="video-url-display">
                    Video URL: <a href={`https://www.youtube.com/watch?v=${currentVideo.id}`} target="_blank" rel="noopener noreferrer">
                      youtube.com/watch?v={currentVideo.id}
                    </a>
                  </p>
                </div>
              )}
            </div>
            
            <div className="video-controls">
              <button 
                onClick={toggleReflection} 
                className="reflection-button"
              >
                {showReflection ? 'Hide Reflection' : 'Show Reflection Questions'}
              </button>
            </div>
            
            {showReflection && (
              <div className="reflection-panel">
                <h4>Reflect on what you've watched:</h4>
                <div className="questions-list">
                  {questions.map((question, index) => (
                    <div 
                      key={index} 
                      className={`reflection-question-container ${activeQuestion === index ? 'active' : ''} ${isQuestionAnswered(index) ? 'answered' : ''}`}
                      onClick={() => handleQuestionClick(index)}
                    >
                      <div className="question-header">
                        <span className={`question-response-indicator ${isQuestionAnswered(index) ? 'answered' : ''}`}></span>
                        <p className="reflection-question">{question}</p>
                      </div>
                      
                      {(activeQuestion === index || isQuestionAnswered(index)) && (
                        <textarea
                          value={(reflectionResponses[currentVideo.id] || {})[index] || ''}
                          onChange={(e) => handleReflectionResponse(index, e.target.value)}
                          placeholder="Your thoughts on this question..."
                          className="reflection-input"
                          autoFocus={activeQuestion === index}
                        />
                      )}
                    </div>
                  ))}
                </div>
                
                {allQuestionsAnswered() && (
                  <>
                    {careerSuggestions.length > 0 && (
                      <div className="career-suggestions">
                        <h4>Based on your responses, you might enjoy:</h4>
                        <ul className="suggestions-list">
                          {careerSuggestions.map((career, index) => (
                            <li key={index} className="suggestion-item">{career}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                    
                    <button 
                      onClick={handleNextVideo} 
                      className="next-button"
                    >
                      Next Video →
                    </button>
                  </>
                )}
              </div>
            )}
          </>
        ) : (
          <div className="loading">Loading video...</div>
        )}
      </div>
      
      <div className="video-playlist">
        <h4>More {currentCategory.charAt(0).toUpperCase() + currentCategory.slice(1)} Videos:</h4>
        <div className="playlist-items">
          {videos.map((video) => (
            <div 
              key={video.id} 
              className={`playlist-item ${currentVideo && video.id === currentVideo.id ? 'active' : ''}`}
              onClick={() => handlePlaylistItemClick(video)}
            >
              <div className="playlist-item-title">{video.title}</div>
              <div className="playlist-item-duration">{video.duration}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default InteractiveVideoExplorationPage;
