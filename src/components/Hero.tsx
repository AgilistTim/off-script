import React from 'react';
import { ArrowRight, Sparkles, Target, Users } from 'lucide-react';

const Hero: React.FC = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-purple-900 text-white overflow-hidden">
      <div className="absolute inset-0 bg-black/20" />
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
        <div className="lg:grid lg:grid-cols-2 lg:gap-8 items-center">
          <div className="mb-12 lg:mb-0">
            <div className="flex items-center space-x-2 mb-6">
              <Sparkles className="h-6 w-6 text-yellow-400" />
              <span className="text-yellow-400 font-semibold">Discover Your UK Career Future</span>
            </div>
            
            <h1 className="text-4xl lg:text-6xl font-bold leading-tight mb-6">
              Skip University Debt,
              <span className="block bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                Land UK Jobs
              </span>
            </h1>
            
            <p className="text-xl text-blue-100 mb-8 leading-relaxed">
              Discover alternative career pathways through AI-powered guidance, real UK salary data, 
              and verified industry insights. Your dream job doesn't require £35K+ student debt.
            </p>

            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 mb-8 border border-white/20">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-yellow-400">92%</div>
                  <div className="text-sm text-blue-100">Employers prioritize soft skills</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-green-400">79%</div>
                  <div className="text-sm text-blue-100">Bootcamp employment rate</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-orange-400">13x</div>
                  <div className="text-sm text-blue-100">Cheaper than university</div>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <button 
                onClick={() => scrollToSection('explore')}
                className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 px-8 py-4 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2"
              >
                <span>Explore UK Careers</span>
                <ArrowRight className="h-5 w-5" />
              </button>
              <button 
                onClick={() => scrollToSection('videos')}
                className="border-2 border-white/30 hover:border-white/50 px-8 py-4 rounded-lg font-semibold transition-all duration-300 hover:bg-white/10"
              >
                Watch UK Career Stories
              </button>
            </div>
          </div>
          
          <div className="relative">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20 hover:bg-white/20 transition-all duration-300">
                  <Target className="h-8 w-8 text-green-400 mb-3" />
                  <h3 className="font-semibold mb-2">10x Faster Entry</h3>
                  <p className="text-sm text-blue-100">UK alternative pathways: months not years to career-ready.</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20 hover:bg-white/20 transition-all duration-300 mt-8">
                  <Users className="h-8 w-8 text-purple-400 mb-3" />
                  <h3 className="font-semibold mb-2">50K+ UK Success Stories</h3>
                  <p className="text-sm text-blue-100">Join thousands who've launched careers without university debt.</p>
                </div>
              </div>
              <div className="space-y-4 mt-8">
                <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20 hover:bg-white/20 transition-all duration-300">
                  <div className="w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full mb-3 flex items-center justify-center">
                    <span className="text-black font-bold text-sm">AI</span>
                  </div>
                  <h3 className="font-semibold mb-2">UK-Specific Guidance</h3>
                  <p className="text-sm text-blue-100">AI recommendations based on UK job market data and regional opportunities.</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20 hover:bg-white/20 transition-all duration-300">
                  <div className="w-8 h-8 bg-red-500 rounded-full mb-3 flex items-center justify-center">
                    <span className="text-white font-bold text-sm">£</span>
                  </div>
                  <h3 className="font-semibold mb-2">Real UK Salaries</h3>
                  <p className="text-sm text-blue-100">Verified salary data from actual UK professionals, not estimates.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;