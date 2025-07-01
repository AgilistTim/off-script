import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import CareerSectors from './components/CareerSectors';
import VideoFeed from './components/VideoFeed';
import AIChat from './components/AIChat';
import CourseRecommendations from './components/CourseRecommendations';
import AlternativePathways from './components/AlternativePathways';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <Hero />
      <CareerSectors />
      <VideoFeed />
      <CourseRecommendations />
      <AlternativePathways />
      <Footer />
      <AIChat />
    </div>
  );
}

export default App;