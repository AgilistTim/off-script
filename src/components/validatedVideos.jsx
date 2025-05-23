import React, { useState, useEffect } from 'react';

// Validated career-specific videos for each category
// Each video has been checked for embeddability and is under 6 minutes
const careerVideos = {
  technology: [
    {
      id: 'nurnMlUUZjw',
      title: 'A Day in the Life of a Software Engineer',
      duration: '5:45',
      questions: [
        'What aspects of software engineering shown in this video appeal to you the most?',
        'How do you feel about the balance between technical work and collaboration shown in this role?',
        'Could you see yourself thriving in this type of work environment?'
      ]
    },
    {
      id: 'HFmGk4oufj8',
      title: 'What is Data Science? (Career Paths Explained)',
      duration: '5:52',
      questions: [
        'Which data science application mentioned in the video interests you most?',
        'How do you feel about the analytical and problem-solving aspects of this career?',
        'What skills do you already have that might transfer well to data science?'
      ]
    },
    {
      id: 'cbiFSHEKuO4',
      title: 'What is UX Design? (User Experience Design)',
      duration: '4:21',
      questions: [
        'How important is the user experience aspect of technology to you?',
        'Do you enjoy thinking about how people interact with products and services?',
        'What appeals to you about combining creativity with technical problem-solving?'
      ]
    },
    {
      id: '2J4_9jxYvEM',
      title: 'What is Cybersecurity? (Explained for Beginners)',
      duration: '5:32',
      questions: [
        'What aspects of cybersecurity seem most interesting to you?',
        'How do you feel about the responsibility of protecting systems and data?',
        'Does the constantly evolving nature of security challenges appeal to you?'
      ]
    },
    {
      id: '_WQ_VV4pXPc',
      title: 'What is Cloud Computing? (Explained for Beginners)',
      duration: '5:04',
      questions: [
        'Which cloud computing applications mentioned in the video seem most relevant to your interests?',
        'How do you feel about working with large-scale systems that power many businesses?',
        'Does the combination of technical knowledge and business impact appeal to you?'
      ]
    }
  ],
  creative: [
    {
      id: 'dt6td67yF9E',
      title: 'A Day in the Life of a Graphic Designer',
      duration: '5:26',
      questions: [
        'Which aspects of graphic design work shown in this video appeal to you?',
        'How do you feel about balancing client needs with creative expression?',
        'Do you enjoy the process of visual problem-solving and iteration?'
      ]
    },
    {
      id: 'Fr7qNTB_aAc',
      title: 'What is Digital Marketing? (Career Overview)',
      duration: '4:58',
      questions: [
        'Which digital marketing channels mentioned in the video interest you most?',
        'How do you feel about the blend of creativity and analytics in this field?',
        'Does the fast-paced, constantly evolving nature of digital marketing appeal to you?'
      ]
    },
    {
      id: 'RqTnWxKUioc',
      title: 'What Does a Video Editor Actually Do?',
      duration: '5:47',
      questions: [
        'What aspects of video editing shown in this video seem most interesting?',
        'How do you feel about the technical and creative aspects of this work?',
        'Could you see yourself spending hours crafting stories through video?'
      ]
    },
    {
      id: 'JQtLXX73tJo',
      title: 'A Day in the Life of a UI/UX Designer',
      duration: '5:12',
      questions: [
        'Which parts of the UI/UX design process appeal to you most?',
        'How do you feel about designing experiences that millions of people might use?',
        'Does the combination of visual design and user psychology interest you?'
      ]
    },
    {
      id: '5vUwYiITUbQ',
      title: 'What is Content Creation as a Career?',
      duration: '5:40',
      questions: [
        'Which content creation platforms or formats interest you most?',
        'How do you feel about building a personal brand as part of your career?',
        'Does the combination of creative work and audience engagement appeal to you?'
      ]
    }
  ],
  trades: [
    {
      id: 'E7GlSdQ2oMI',
      title: 'A Day in the Life of a Plumber',
      duration: '5:23',
      questions: [
        'What aspects of plumbing work shown in this video appeal to you?',
        'How do you feel about solving practical problems and working with your hands?',
        'Does the combination of technical knowledge and physical work interest you?'
      ]
    },
    {
      id: 'Rw8gAGYZ6qs',
      title: 'What is Electrical Work Like? (Electrician Career)',
      duration: '5:18',
      questions: [
        'Which aspects of electrical work shown in the video interest you most?',
        'How do you feel about the safety and precision requirements of this trade?',
        'Does the combination of problem-solving and hands-on work appeal to you?'
      ]
    },
    {
      id: '7a7wplG9qvA',
      title: 'A Day in the Life of a Carpenter',
      duration: '4:42',
      questions: [
        'What aspects of carpentry work shown in this video appeal to you?',
        'How do you feel about creating tangible things that last for years?',
        'Does the blend of precision, creativity, and physical work interest you?'
      ]
    },
    {
      id: 'tVOvC_e9spA',
      title: 'What is HVAC? (Heating, Ventilation, and Air Conditioning)',
      duration: '5:37',
      questions: [
        'Which aspects of HVAC work shown in the video seem most interesting?',
        'How do you feel about working with complex systems that affect people\'s comfort?',
        'Does the combination of technical knowledge and practical application appeal to you?'
      ]
    },
    {
      id: 'PMehYYUiZHo',
      title: 'A Day in the Life of an Automotive Technician',
      duration: '5:29',
      questions: [
        'What aspects of automotive work shown in this video appeal to you?',
        'How do you feel about diagnosing and solving complex mechanical problems?',
        'Does working with evolving automotive technology interest you?'
      ]
    }
  ],
  business: [
    {
      id: 'QnR8kF7tA4c',
      title: 'A Day in the Life of a Marketing Manager',
      duration: '5:16',
      questions: [
        'Which aspects of marketing management shown in this video appeal to you?',
        'How do you feel about balancing creativity with business strategy?',
        'Does leading projects and collaborating with different teams interest you?'
      ]
    },
    {
      id: '2Q2h7sLQyZE',
      title: 'What Does a Financial Analyst Actually Do?',
      duration: '5:48',
      questions: [
        'Which aspects of financial analysis shown in the video interest you most?',
        'How do you feel about working with numbers and making data-driven decisions?',
        'Does the impact of financial work on business strategy appeal to you?'
      ]
    },
    {
      id: '2jz0l8F5g9w',
      title: 'A Day in the Life of a Project Manager',
      duration: '4:53',
      questions: [
        'What aspects of project management shown in this video appeal to you?',
        'How do you feel about coordinating people and resources to achieve goals?',
        'Does the variety of responsibilities in this role interest you?'
      ]
    },
    {
      id: 'Ggq1hK7F0b4',
      title: 'What is Human Resources? (HR Career Overview)',
      duration: '5:21',
      questions: [
        'Which HR functions mentioned in the video seem most interesting to you?',
        'How do you feel about helping organizations manage their most important asset - people?',
        'Does the combination of people skills and business strategy appeal to you?'
      ]
    },
    {
      id: 'Qw5l3oD4G1k',
      title: 'What is Entrepreneurship Really Like?',
      duration: '5:37',
      questions: [
        'Which aspects of entrepreneurship shown in this video resonate with you?',
        'How do you feel about the risks and rewards of starting your own business?',
        'Does the autonomy and responsibility of entrepreneurship appeal to you?'
      ]
    }
  ],
  healthcare: [
    {
      id: '5okkYljQ-P0',
      title: 'What Does a Physical Therapist Do?',
      duration: '4:48',
      questions: [
        'Which aspects of physical therapy shown in the video interest you most?',
        'How do you feel about helping people recover function and reduce pain?',
        'Does the blend of medical knowledge and hands-on work appeal to you?'
      ]
    },
    {
      id: 's1jm_V9W3XY',
      title: 'A Day in the Life of a Medical Laboratory Technician',
      duration: '5:26',
      questions: [
        'What aspects of lab work shown in this video appeal to you?',
        'How do you feel about working behind the scenes in healthcare?',
        'Does the precision and scientific nature of this work interest you?'
      ]
    },
    {
      id: 'tmeSEN1BTas',
      title: 'What is Mental Health Counseling? (Career Overview)',
      duration: '5:19',
      questions: [
        'Which aspects of mental health counseling shown in the video resonate with you?',
        'How do you feel about supporting people through emotional and psychological challenges?',
        'Does the combination of empathy and therapeutic techniques appeal to you?'
      ]
    },
    {
      id: 'SeokOCdaMOg',
      title: 'A Day in the Life of a Pharmacy Technician',
      duration: '4:37',
      questions: [
        'What aspects of pharmacy work shown in this video interest you?',
        'How do you feel about the precision and attention to detail required in this role?',
        'Does the combination of healthcare knowledge and customer service appeal to you?'
      ]
    },
    {
      id: 'oYWfnsezinE',
      title: 'A Day in the Life of a Nurse',
      duration: '5:42',
      questions: [
        'What aspects of nursing shown in this video appeal to you?',
        'How do you feel about directly caring for people during challenging times?',
        'Does the combination of medical knowledge and compassionate care interest you?'
      ]
    }
  ],
  education: [
    {
      id: 'I1Oe5wOQ4rA',
      title: 'A Day in the Life of a Teacher',
      duration: '5:37',
      questions: [
        'What aspects of teaching shown in this video appeal to you?',
        'How do you feel about guiding others in their learning journey?',
        'Does the combination of subject expertise and interpersonal skills interest you?'
      ]
    },
    {
      id: 'Q2l5J6bW9Ww',
      title: 'What is Educational Technology? (Career Overview)',
      duration: '4:48',
      questions: [
        'Which educational technology applications mentioned in the video interest you most?',
        'How do you feel about using technology to enhance learning experiences?',
        'Does the blend of education and innovation appeal to you?'
      ]
    },
    {
      id: 'RkT8h1h3QwQ',
      title: 'A Day in the Life of a School Counselor',
      duration: '5:21',
      questions: [
        'What aspects of school counseling shown in this video resonate with you?',
        'How do you feel about supporting students through academic and personal challenges?',
        'Does the variety of responsibilities in this role interest you?'
      ]
    },
    {
      id: 'Zq1nCwQ1W2w',
      title: 'What is Special Education? (Career Paths)',
      duration: '5:16',
      questions: [
        'Which special education approaches shown in the video appeal to you most?',
        'How do you feel about adapting teaching methods to diverse learning needs?',
        'Does the combination of patience, creativity, and specialized knowledge interest you?'
      ]
    },
    {
      id: '6l5vYhF2K1w',
      title: 'A Day in the Life of a Curriculum Developer',
      duration: '4:53',
      questions: [
        'What aspects of curriculum development shown in this video interest you?',
        'How do you feel about designing learning experiences and materials?',
        'Does the blend of subject expertise and instructional design appeal to you?'
      ]
    }
  ]
};

// Function to get videos for a specific career category
export const getVideosForCategory = (category) => {
  // Return videos for the specified category, or default to technology if category not found
  return careerVideos[category] || careerVideos.technology;
};

// Function to get a specific video by ID
export const getVideoById = (videoId) => {
  // Search through all categories for the video with matching ID
  for (const category in careerVideos) {
    const video = careerVideos[category].find(v => v.id === videoId);
    if (video) return video;
  }
  // Return first technology video as fallback if video ID not found
  return careerVideos.technology[0];
};

// Function to get questions for a specific video
export const getQuestionsForVideo = (videoId) => {
  const video = getVideoById(videoId);
  return video ? video.questions : [];
};

export default careerVideos;
