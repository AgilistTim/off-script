import React from 'react';
import { Link } from 'react-router-dom';
import CareerChatInterface from './CareerChatInterface';

const AssessmentPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-600 to-indigo-700 text-white flex flex-col items-center p-4 md:p-8">
      <header className="text-center mb-10">
        <h1 className="text-4xl font-bold mb-3">Career Assessment</h1>
        <p className="text-xl text-white/80 max-w-2xl mx-auto">
          Chat with our AI career guide to explore your interests, values, and potential career paths.
        </p>
      </header>

      <div className="w-full max-w-4xl grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white/10 backdrop-blur-md p-6 rounded-lg shadow-xl">
          <h2 className="text-2xl font-bold mb-4">How It Works</h2>
          <ol className="space-y-4 text-white/90">
            <li className="flex">
              <span className="bg-indigo-500 rounded-full w-8 h-8 flex items-center justify-center mr-3 flex-shrink-0">1</span>
              <p>Share your interests, skills, and what matters to you in a career</p>
            </li>
            <li className="flex">
              <span className="bg-indigo-500 rounded-full w-8 h-8 flex items-center justify-center mr-3 flex-shrink-0">2</span>
              <p>Our AI guide will ask thoughtful questions to understand your preferences</p>
            </li>
            <li className="flex">
              <span className="bg-indigo-500 rounded-full w-8 h-8 flex items-center justify-center mr-3 flex-shrink-0">3</span>
              <p>Receive personalized career suggestions based on your conversation</p>
            </li>
            <li className="flex">
              <span className="bg-indigo-500 rounded-full w-8 h-8 flex items-center justify-center mr-3 flex-shrink-0">4</span>
              <p>Explore recommended career paths through videos and detailed information</p>
            </li>
          </ol>
          
          <div className="mt-6">
            <Link to="/categories" className="text-indigo-200 hover:text-white transition duration-300">
              Prefer to browse career categories directly? &rarr;
            </Link>
          </div>
        </div>
        
        <div className="h-[600px]">
          <CareerChatInterface />
        </div>
      </div>
      
      <div className="mt-8">
        <Link to="/" className="text-white/80 hover:text-white transition duration-300">
          &larr; Back to Home
        </Link>
      </div>
    </div>
  );
};

export default AssessmentPage;
