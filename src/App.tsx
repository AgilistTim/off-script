import React, { useEffect, useState } from 'react';
import HomePage from './pages/HomePage';
import InteractiveVideoExplorationPage from './pages/InteractiveVideoExplorationPage';
import PersonalizedRecommendationsPage from './pages/PersonalizedRecommendationsPage';
import DashboardPage from './pages/DashboardPage';
import './App.css'; // Ensure Tailwind is imported

const App: React.FC = () => {
  const [route, setRoute] = useState(window.location.hash || '#home');

  useEffect(() => {
    const handleHashChange = () => {
      setRoute(window.location.hash || '#home');
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  let CurrentPage;
  switch (route) {
    case '#video-exploration':
      CurrentPage = InteractiveVideoExplorationPage;
      break;
    case '#recommendations':
      CurrentPage = PersonalizedRecommendationsPage;
      break;
    case '#dashboard':
      CurrentPage = DashboardPage;
      break;
    case '#home':
    default:
      CurrentPage = HomePage;
      break;
  }

  // Update document title based on route
  useEffect(() => {
    let title = "OffScript Demo";
    if (route.includes('video')) title = "Video Exploration - OffScript Demo";
    else if (route.includes('recommendations')) title = "Recommendations - OffScript Demo";
    else if (route.includes('dashboard')) title = "Dashboard - OffScript Demo";
    document.title = title;
  }, [route]);

  return (
    <div className="App">
      <CurrentPage />
    </div>
  );
};

export default App;

