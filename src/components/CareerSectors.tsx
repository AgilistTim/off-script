import React, { useState } from 'react';
import { Code, Leaf, Heart, DollarSign, Wrench, Camera, ChevronRight, Play } from 'lucide-react';
import SectorDetailModal from './SectorDetailModal';
import { sectorDetailData } from '../data/sectorData';

interface Sector {
  id: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  roles: string[];
  averageSalary: string;
  timeToEntry: string;
  videoCount: number;
  gradient: string;
  growthRate: string;
  ukDemand: string;
}

const sectors: Sector[] = [
  {
    id: 'tech',
    icon: <Code className="h-6 w-6" />,
    title: 'Technology & AI',
    description: 'Build the digital future with AI, data science, and software development',
    roles: ['Data Scientist', 'AI Specialist', 'Software Developer', 'Cybersecurity Analyst'],
    averageSalary: '£65K',
    timeToEntry: '3-6 months',
    videoCount: 47,
    gradient: 'from-blue-500 to-purple-600',
    growthRate: '36% growth (Data Science)',
    ukDemand: 'Critical shortage - 3.5M unfilled positions globally'
  },
  {
    id: 'green-energy',
    icon: <Leaf className="h-6 w-6" />,
    title: 'Green Energy & Sustainability',
    description: 'Lead the UK\'s net-zero transition in renewable energy',
    roles: ['Wind Turbine Technician', 'Solar Installer', 'Energy Analyst', 'Environmental Engineer'],
    averageSalary: '£45K',
    timeToEntry: '2-4 months',
    videoCount: 32,
    gradient: 'from-green-500 to-emerald-600',
    growthRate: '60% growth (Wind), 48% growth (Solar)',
    ukDemand: 'Fastest growing sector - Government net-zero commitment'
  },
  {
    id: 'healthcare',
    icon: <Heart className="h-6 w-6" />,
    title: 'Healthcare & Life Sciences',
    description: 'Support the NHS and growing healthcare technology sector',
    roles: ['Nurse Practitioner', 'Healthcare Assistant', 'Medical Technology', 'Health Data Analyst'],
    averageSalary: '£35K',
    timeToEntry: '4-8 months',
    videoCount: 38,
    gradient: 'from-red-500 to-pink-600',
    growthRate: '46% growth (Nurse Practitioners)',
    ukDemand: '1.9M annual openings - Aging population driving demand'
  },
  {
    id: 'fintech',
    icon: <DollarSign className="h-6 w-6" />,
    title: 'FinTech & Digital Finance',
    description: 'Join London\'s thriving financial technology ecosystem',
    roles: ['Fintech Engineer', 'Blockchain Developer', 'Financial Analyst', 'Risk Assessor'],
    averageSalary: '£75K',
    timeToEntry: '3-5 months',
    videoCount: 29,
    gradient: 'from-yellow-500 to-orange-600',
    growthRate: 'High growth - London FinTech capital',
    ukDemand: 'Strong demand - Brexit creating new opportunities'
  },
  {
    id: 'skilled-trades',
    icon: <Wrench className="h-6 w-6" />,
    title: 'Skilled Trades & Manufacturing',
    description: 'Build and maintain the infrastructure powering modern Britain',
    roles: ['Electrician', 'Plumber', 'HVAC Technician', 'Advanced Manufacturing'],
    averageSalary: '£42K',
    timeToEntry: '6-12 months',
    videoCount: 41,
    gradient: 'from-gray-600 to-slate-700',
    growthRate: '27% growth in advanced manufacturing',
    ukDemand: 'Critical skills shortage - 96,500 apprenticeships available'
  },
  {
    id: 'creative',
    icon: <Camera className="h-6 w-6" />,
    title: 'Creative & Digital Media',
    description: 'Thrive in the UK\'s world-leading creative industries',
    roles: ['Content Creator', 'Digital Designer', 'Video Producer', 'UX/UI Designer'],
    averageSalary: '£38K',
    timeToEntry: '2-6 months',
    videoCount: 35,
    gradient: 'from-pink-500 to-rose-600',
    growthRate: 'Strong growth in digital content',
    ukDemand: 'Portfolio-based hiring - Skills over degrees'
  }
];

const CareerSectors: React.FC = () => {
  const [selectedSector, setSelectedSector] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const handleExploreSector = (sectorId: string) => {
    setSelectedSector(sectorId);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedSector(null);
  };

  const selectedSectorData = selectedSector ? sectorDetailData[selectedSector as keyof typeof sectorDetailData] : null;

  return (
    <section id="explore" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Explore High-Growth UK Career Sectors
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover career paths with verified UK salary data, realistic timelines, 
            and real stories from professionals across Britain's fastest-growing industries.
          </p>
          <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4 max-w-2xl mx-auto">
            <p className="text-blue-800 text-sm">
              <strong>Based on 2025 UK Labour Market Research:</strong> 39% of skills will change by 2030. 
              92% of employers now prioritize soft skills equally with technical expertise.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sectors.map((sector) => (
            <div
              key={sector.id}
              className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer overflow-hidden"
              onClick={() => handleExploreSector(sector.id)}
            >
              <div className={`bg-gradient-to-r ${sector.gradient} p-6 text-white`}>
                <div className="flex items-center justify-between mb-4">
                  <div className="bg-white/20 p-3 rounded-lg">
                    {sector.icon}
                  </div>
                  <div className="text-right">
                    <div className="text-sm opacity-90">Avg. UK Salary</div>
                    <div className="text-lg font-bold">{sector.averageSalary}</div>
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-2">{sector.title}</h3>
                <p className="text-white/90 text-sm mb-3">{sector.description}</p>
                <div className="text-xs bg-white/20 rounded-full px-3 py-1 inline-block">
                  {sector.growthRate}
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <Play className="h-4 w-4 text-gray-500" />
                    <span className="text-sm text-gray-600">{sector.videoCount} videos</span>
                  </div>
                  <div className="text-sm text-gray-600">
                    Entry: {sector.timeToEntry}
                  </div>
                </div>

                <div className="mb-4">
                  <h4 className="font-semibold text-gray-900 mb-2">In-Demand UK Roles:</h4>
                  <div className="flex flex-wrap gap-2">
                    {sector.roles.slice(0, 2).map((role, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
                      >
                        {role}
                      </span>
                    ))}
                    {sector.roles.length > 2 && (
                      <span className="px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                        +{sector.roles.length - 2} more
                      </span>
                    )}
                  </div>
                </div>

                <div className="mb-4 text-xs text-gray-600 bg-gray-50 p-3 rounded-lg">
                  <strong>UK Market:</strong> {sector.ukDemand}
                </div>

                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    handleExploreSector(sector.id);
                  }}
                  className="w-full bg-gray-900 hover:bg-gray-800 text-white py-3 px-4 rounded-lg transition-colors duration-300 flex items-center justify-center space-x-2 group"
                >
                  <span>Explore UK Opportunities</span>
                  <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-blue-900 to-purple-900 rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">Unsure Which UK Sector Suits You?</h3>
            <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
              Take our AI-powered career assessment based on UK labour market data to discover 
              which sectors align with your interests, skills, and the UK job market reality.
            </p>
            <button className="bg-white text-gray-900 hover:bg-gray-100 px-8 py-4 rounded-lg font-semibold transition-colors duration-300 flex items-center space-x-2 mx-auto group">
              <span>Take UK Career Assessment</span>
              <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>

      <SectorDetailModal 
        sector={selectedSectorData}
        isOpen={modalOpen}
        onClose={handleCloseModal}
      />
    </section>
  );
};

export default CareerSectors;