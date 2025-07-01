import React from 'react';
import { MessageCircle, Mail, Phone, MapPin, Github, Twitter, Linkedin, Heart } from 'lucide-react';

const Footer: React.FC = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center mb-4 cursor-pointer" onClick={() => scrollToSection('hero')}>
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-lg">
                <MessageCircle className="h-6 w-6 text-white" />
              </div>
              <span className="ml-3 text-xl font-bold">PathFinder</span>
            </div>
            <p className="text-gray-400 mb-6 leading-relaxed">
              Empowering young adults to discover alternative career pathways through 
              AI-powered guidance and verified industry insights.
            </p>
            <div className="flex space-x-4">
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                <Github className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Explore */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Explore</h3>
            <ul className="space-y-3">
              <li><button onClick={() => scrollToSection('explore')} className="text-gray-400 hover:text-white transition-colors">Career Sectors</button></li>
              <li><button onClick={() => scrollToSection('videos')} className="text-gray-400 hover:text-white transition-colors">Video Library</button></li>
              <li><button onClick={() => scrollToSection('courses')} className="text-gray-400 hover:text-white transition-colors">Course Recommendations</button></li>
              <li><button onClick={() => scrollToSection('pathways')} className="text-gray-400 hover:text-white transition-colors">Alternative Pathways</button></li>
              <li><button onClick={() => scrollToSection('hero')} className="text-gray-400 hover:text-white transition-colors">Success Stories</button></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Resources</h3>
            <ul className="space-y-3">
              <li><button onClick={() => scrollToSection('explore')} className="text-gray-400 hover:text-white transition-colors">Career Assessment</button></li>
              <li><button onClick={() => scrollToSection('videos')} className="text-gray-400 hover:text-white transition-colors">Salary Data</button></li>
              <li><button onClick={() => scrollToSection('courses')} className="text-gray-400 hover:text-white transition-colors">Industry Reports</button></li>
              <li><button onClick={() => scrollToSection('pathways')} className="text-gray-400 hover:text-white transition-colors">Learning Partners</button></li>
              <li><button onClick={() => scrollToSection('hero')} className="text-gray-400 hover:text-white transition-colors">Help Center</button></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-gray-400" />
                <a href="mailto:hello@pathfinder.com" className="text-gray-400 hover:text-white transition-colors">hello@pathfinder.com</a>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-4 w-4 text-gray-400" />
                <a href="tel:+15551234567" className="text-gray-400 hover:text-white transition-colors">+1 (555) 123-4567</a>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="h-4 w-4 text-gray-400" />
                <span className="text-gray-400">San Francisco, CA</span>
              </div>
            </div>
            
            <div className="mt-6">
              <h4 className="font-semibold mb-2">Stay Updated</h4>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-2 bg-gray-800 border border-gray-700 rounded-l-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-r-lg transition-colors">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-400 text-sm mb-4 md:mb-0">
              © 2025 PathFinder. All rights reserved.
            </div>
            <div className="flex items-center space-x-6 text-sm">
              <button onClick={() => scrollToSection('hero')} className="text-gray-400 hover:text-white transition-colors">Privacy Policy</button>
              <button onClick={() => scrollToSection('hero')} className="text-gray-400 hover:text-white transition-colors">Terms of Service</button>
              <button onClick={() => scrollToSection('hero')} className="text-gray-400 hover:text-white transition-colors">Cookie Policy</button>
            </div>
          </div>
          <div className="text-center mt-4 text-gray-500 text-sm flex items-center justify-center">
            Made with <Heart className="h-4 w-4 mx-1 text-red-500" /> for ambitious young professionals
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;