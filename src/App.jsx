// App.js - Main application file for OffScript enhanced website

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import CareerCategoriesPage from './pages/CareerCategoriesPage';
import InteractiveVideoExplorationPage from './components/InteractiveVideoExplorationPage';
import AssessmentPage from './pages/AssessmentPage';
import './styles/index.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/career-categories" element={<CareerCategoriesPage />} />
        <Route path="/video-exploration/:category" element={<InteractiveVideoExplorationPage />} />
        <Route path="/assessment" element={<AssessmentPage />} />
      </Routes>
    </Router>
  );
}

export default App;
