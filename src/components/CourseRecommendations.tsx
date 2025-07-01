import React, { useState } from 'react';
import { Star, Clock, Users, Award, CheckCircle, ExternalLink } from 'lucide-react';

interface Course {
  id: string;
  title: string;
  provider: string;
  rating: number;
  students: string;
  duration: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  price: string;
  image: string;
  skills: string[];
  jobOutcomes: string[];
  verified: boolean;
  completionRate: number;
}

const courses: Course[] = [
  {
    id: '1',
    title: 'Complete Frontend Development Bootcamp',
    provider: 'TechAcademy',
    rating: 4.8,
    students: '12.5K',
    duration: '12 weeks',
    level: 'Beginner',
    price: '$299',
    image: 'https://images.pexels.com/photos/574071/pexels-photo-574071.jpeg?auto=compress&cs=tinysrgb&w=400',
    skills: ['React', 'JavaScript', 'CSS', 'HTML', 'Git'],
    jobOutcomes: ['Frontend Developer', 'Web Developer', 'UI Developer'],
    verified: true,
    completionRate: 87
  },
  {
    id: '2',
    title: 'Solar Installation Certification Program',
    provider: 'GreenTech Institute',
    rating: 4.9,
    students: '3.2K',
    duration: '8 weeks',
    level: 'Beginner',
    price: '$459',
    image: 'https://images.pexels.com/photos/9875899/pexels-photo-9875899.jpeg?auto=compress&cs=tinysrgb&w=400',
    skills: ['Solar Panel Installation', 'Electrical Safety', 'System Design', 'OSHA Compliance'],
    jobOutcomes: ['Solar Installer', 'Renewable Energy Technician', 'Project Coordinator'],
    verified: true,
    completionRate: 94
  },
  {
    id: '3',
    title: 'Digital Marketing & Analytics Fast Track',
    provider: 'MarketPro Academy',
    rating: 4.7,
    students: '8.9K',
    duration: '6 weeks',
    level: 'Intermediate',
    price: '$199',
    image: 'https://images.pexels.com/photos/265087/pexels-photo-265087.jpeg?auto=compress&cs=tinysrgb&w=400',
    skills: ['Google Analytics', 'SEO', 'Social Media Marketing', 'PPC Advertising'],
    jobOutcomes: ['Digital Marketing Specialist', 'SEO Analyst', 'Content Marketing Manager'],
    verified: true,
    completionRate: 82
  },
  {
    id: '4',
    title: 'Healthcare Administration Essentials',
    provider: 'MedLearn',
    rating: 4.6,
    students: '5.7K',
    duration: '10 weeks',
    level: 'Beginner',
    price: '$349',
    image: 'https://images.pexels.com/photos/4021775/pexels-photo-4021775.jpeg?auto=compress&cs=tinysrgb&w=400',
    skills: ['Medical Terminology', 'Patient Management', 'Insurance Processing', 'HIPAA Compliance'],
    jobOutcomes: ['Medical Assistant', 'Healthcare Coordinator', 'Patient Services Representative'],
    verified: true,
    completionRate: 91
  },
  {
    id: '5',
    title: 'Electrical Systems & Smart Home Technology',
    provider: 'TradeSkills Pro',
    rating: 4.8,
    students: '4.1K',
    duration: '16 weeks',
    level: 'Intermediate',
    price: '$599',
    image: 'https://images.pexels.com/photos/8849295/pexels-photo-8849295.jpeg?auto=compress&cs=tinysrgb&w=400',
    skills: ['Electrical Wiring', 'Smart Home Systems', 'Code Compliance', 'Troubleshooting'],
    jobOutcomes: ['Electrician Assistant', 'Smart Home Installer', 'Maintenance Technician'],
    verified: true,
    completionRate: 89
  },
  {
    id: '6',
    title: 'UX/UI Design Portfolio Builder',
    provider: 'DesignCraft',
    rating: 4.9,
    students: '7.3K',
    duration: '14 weeks',
    level: 'Beginner',
    price: '$399',
    image: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=400',
    skills: ['Figma', 'User Research', 'Prototyping', 'Design Systems', 'Usability Testing'],
    jobOutcomes: ['UX Designer', 'UI Designer', 'Product Designer'],
    verified: true,
    completionRate: 85
  }
];

const CourseRecommendations: React.FC = () => {
  const [selectedLevel, setSelectedLevel] = useState<string>('All');
  const [filteredCourses, setFilteredCourses] = useState(courses);

  const levels = ['All', 'Beginner', 'Intermediate', 'Advanced'];

  const handleLevelFilter = (level: string) => {
    setSelectedLevel(level);
    if (level === 'All') {
      setFilteredCourses(courses);
    } else {
      setFilteredCourses(courses.filter(course => course.level === level));
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <section id="courses" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Fast-Track Your Skills
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Curated courses from verified providers with proven job placement rates. 
            Learn in-demand skills that employers actually need, not outdated curriculum.
          </p>
        </div>

        <div className="flex justify-center mb-12">
          <div className="flex bg-white rounded-lg p-1 shadow-md">
            {levels.map((level) => (
              <button
                key={level}
                onClick={() => handleLevelFilter(level)}
                className={`px-6 py-3 rounded-md transition-all duration-300 ${
                  selectedLevel === level
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {level}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCourses.map((course) => (
            <div
              key={course.id}
              className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden"
            >
              <div className="relative">
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-full h-48 object-cover"
                />
                {course.verified && (
                  <div className="absolute top-4 left-4 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center space-x-1">
                    <CheckCircle className="h-3 w-3" />
                    <span>Verified Provider</span>
                  </div>
                )}
                <div className="absolute top-4 right-4 bg-black/80 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  {course.level}
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm text-gray-600">{course.provider}</span>
                  <span className="text-2xl font-bold text-green-600">{course.price}</span>
                </div>

                <h3 className="font-bold text-lg text-gray-900 mb-3 line-clamp-2">
                  {course.title}
                </h3>

                <div className="flex items-center space-x-4 mb-4 text-sm text-gray-600">
                  <div className="flex items-center space-x-1">
                    {renderStars(course.rating)}
                    <span className="ml-1 font-semibold">{course.rating}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Users className="h-4 w-4" />
                    <span>{course.students}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="h-4 w-4" />
                    <span>{course.duration}</span>
                  </div>
                </div>

                <div className="mb-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Skills You'll Learn:</h4>
                  <div className="flex flex-wrap gap-2">
                    {course.skills.slice(0, 3).map((skill, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                      >
                        {skill}
                      </span>
                    ))}
                    {course.skills.length > 3 && (
                      <span className="px-3 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                        +{course.skills.length - 3} more
                      </span>
                    )}
                  </div>
                </div>

                <div className="mb-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Completion Rate</span>
                    <span className="font-semibold text-green-600">{course.completionRate}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                    <div
                      className="bg-green-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${course.completionRate}%` }}
                    />
                  </div>
                </div>

                <button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3 px-4 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center space-x-2">
                  <span>Enroll Now</span>
                  <ExternalLink className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-600 mb-4">
            Can't find the right course? Our AI advisor can recommend personalized learning paths.
          </p>
          <button className="bg-white hover:bg-gray-50 text-gray-900 px-8 py-4 rounded-lg font-semibold border-2 border-gray-300 hover:border-gray-400 transition-all duration-300">
            Get Personal Recommendations
          </button>
        </div>
      </div>
    </section>
  );
};

export default CourseRecommendations;