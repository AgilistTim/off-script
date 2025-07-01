import React, { useState } from 'react';
import { Menu, X, Search, MessageCircle, User } from 'lucide-react';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  return (
    <header className="bg-white/95 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center cursor-pointer" onClick={() => scrollToSection('hero')}>
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-lg">
              <MessageCircle className="h-6 w-6 text-white" />
            </div>
            <span className="ml-3 text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              PathFinder
            </span>
          </div>

          <nav className="hidden md:flex space-x-8">
            <button 
              onClick={() => scrollToSection('explore')}
              className="text-gray-700 hover:text-blue-600 transition-colors"
            >
              Explore Careers
            </button>
            <button 
              onClick={() => scrollToSection('videos')}
              className="text-gray-700 hover:text-blue-600 transition-colors"
            >
              Video Library
            </button>
            <button 
              onClick={() => scrollToSection('courses')}
              className="text-gray-700 hover:text-blue-600 transition-colors"
            >
              Courses
            </button>
            <button 
              onClick={() => scrollToSection('pathways')}
              className="text-gray-700 hover:text-blue-600 transition-colors"
            >
              Alt Pathways
            </button>
          </nav>

          <div className="flex items-center space-x-4">
            <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
              <Search className="h-5 w-5" />
            </button>
            <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
              <User className="h-5 w-5" />
            </button>
            <button
              className="md:hidden p-2 text-gray-400 hover:text-gray-600 transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <button 
              onClick={() => scrollToSection('explore')}
              className="block w-full text-left px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-md"
            >
              Explore Careers
            </button>
            <button 
              onClick={() => scrollToSection('videos')}
              className="block w-full text-left px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-md"
            >
              Video Library
            </button>
            <button 
              onClick={() => scrollToSection('courses')}
              className="block w-full text-left px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-md"
            >
              Courses
            </button>
            <button 
              onClick={() => scrollToSection('pathways')}
              className="block w-full text-left px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-md"
            >
              Alt Pathways
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;