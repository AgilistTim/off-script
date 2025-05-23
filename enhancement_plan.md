# OffScript Enhancement and Expansion Plan

## Executive Summary

This document outlines a comprehensive plan to enhance the existing OffScript demo website to meet the POC requirements, with a focus on the user's prioritized features: OpenAI integration, multiple career journeys, and content sourcing from multiple providers. The plan adopts a phased approach, starting with core AI functionality and career path expansion.

## Phase 1: OpenAI Integration & Career Path Expansion

### 1.1 Career Category Analysis & Selection

**Objective:** Identify and implement the most relevant career categories for the target audience.

**Tasks:**
- Conduct research on career interests and trends among young adults (16-24)
- Analyze labor market data to identify high-growth and accessible career paths
- Select 5-7 diverse career categories that represent different aptitudes and interests
- Define key characteristics, skills, and pathways for each category

**Recommended Career Categories:**
1. Technology & Digital (Software development, IT support, digital marketing)
2. Healthcare & Wellbeing (Nursing, therapy, fitness)
3. Creative & Media (Design, content creation, production)
4. Skilled Trades (Electrical, plumbing, construction)
5. Business & Entrepreneurship (Small business, startups, management)
6. Public Service (Education, government, non-profit)
7. Sustainability & Environment (Renewable energy, conservation, green technology)

**Deliverables:**
- Career category profiles with key characteristics and skills
- Content sourcing strategy for each category
- Implementation priority order based on audience relevance

### 1.2 OpenAI Integration

**Objective:** Implement conversational AI for personalized assessment and guidance.

**Tasks:**
- Create OpenAI assistant with custom instructions for career guidance
- Develop conversation flows for initial assessment
- Implement API integration between frontend and OpenAI
- Design and build conversational UI component
- Create feedback loop to improve AI responses

**Technical Implementation:**
```typescript
// Example OpenAI Assistant creation and integration
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Create an Assistant
const assistant = await openai.beta.assistants.create({
  name: "OffScript Career Guide",
  instructions: `You are a career guidance assistant for young adults exploring career options.
  Your goal is to help them discover paths that align with their interests, values, and aptitudes.
  Ask thoughtful questions about their preferences, experiences, and aspirations.
  Provide encouraging, non-judgmental responses that help them reflect on their options.`,
  tools: [{ type: "retrieval" }],
  model: "gpt-4-turbo",
});

// Create a Thread for the conversation
const thread = await openai.beta.threads.create();

// Add a Message to the Thread
await openai.beta.threads.messages.create(thread.id, {
  role: "user",
  content: userMessage,
});

// Run the Assistant
const run = await openai.beta.threads.runs.create(thread.id, {
  assistant_id: assistant.id,
});

// Retrieve the Assistant's response
const messages = await openai.beta.threads.messages.list(thread.id);
```

**Deliverables:**
- OpenAI assistant configuration
- Conversational UI component
- API integration for message handling
- Response processing and storage system

### 1.3 Multiple Career Journey Implementation

**Objective:** Expand the platform to support exploration of multiple career categories.

**Tasks:**
- Refactor the existing video exploration component to be category-agnostic
- Create a career category selection interface
- Implement content management system for multiple categories
- Develop category-specific reflection prompts and recommendations
- Create a unified user journey that spans multiple categories

**Technical Implementation:**
```typescript
// Example Career Category Interface
interface CareerCategory {
  id: string;
  title: string;
  description: string;
  iconPath: string;
  videos: CareerVideo[];
  reflectionPrompts: ReflectionPrompt[];
  recommendedPaths: CareerPath[];
}

// Example Career Selection Component
const CareerCategorySelection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {careerCategories.map(category => (
        <div 
          key={category.id}
          className={`p-6 rounded-lg cursor-pointer transition-all ${
            selectedCategory === category.id ? 'bg-primary-600 text-white' : 'bg-white/10'
          }`}
          onClick={() => setSelectedCategory(category.id)}
        >
          <img src={category.iconPath} alt={category.title} className="w-16 h-16 mb-4" />
          <h3 className="text-xl font-semibold mb-2">{category.title}</h3>
          <p className="text-sm">{category.description}</p>
        </div>
      ))}
    </div>
  );
};
```

**Deliverables:**
- Career category selection interface
- Refactored video exploration component
- Category-specific content management system
- Enhanced recommendation engine for multiple categories

### 1.4 Content Sourcing Strategy

**Objective:** Establish a system for sourcing and managing content from multiple providers.

**Tasks:**
- Define content requirements for each career category
- Identify quality content sources (YouTube, educational platforms, industry sites)
- Create content curation guidelines and quality standards
- Implement content metadata system for tracking sources and relevance
- Develop a content refresh strategy

**Content Sources:**
- YouTube channels focused on career exploration and day-in-the-life content
- Educational platforms (Khan Academy, Coursera, edX)
- Industry association resources
- Government career information portals
- Professional networking sites

**Deliverables:**
- Content sourcing guidelines
- Initial content library for selected career categories
- Content metadata schema
- Curation and refresh process documentation

## Phase 2: User Experience & Data Persistence

### 2.1 User Authentication & Profiles

**Objective:** Implement user registration, authentication, and profile management.

**Tasks:**
- Set up Firebase Authentication
- Create user registration and login flows
- Develop user profile data model
- Implement profile creation and editing functionality
- Add session management and persistence

**Technical Implementation:**
```typescript
// Firebase Authentication Setup
import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, doc, setDoc } from 'firebase/firestore';

const firebaseConfig = {
  // Firebase configuration
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// User Registration
const registerUser = async (email: string, password: string, displayName: string) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    
    // Create user profile
    await setDoc(doc(db, "users", user.uid), {
      displayName,
      email,
      createdAt: new Date(),
      interests: [],
      exploredCategories: [],
      recommendations: []
    });
    
    return user;
  } catch (error) {
    console.error("Error registering user:", error);
    throw error;
  }
};
```

**Deliverables:**
- Firebase Authentication integration
- User registration and login components
- Profile management interface
- Session persistence implementation

### 2.2 Data Persistence & Progress Tracking

**Objective:** Implement systems to store user responses and track progress across sessions.

**Tasks:**
- Set up Firebase Firestore database
- Design data models for user responses and progress
- Implement data storage and retrieval functions
- Create progress tracking visualization
- Add resume functionality for incomplete journeys

**Technical Implementation:**
```typescript
// Data Models
interface UserResponse {
  userId: string;
  categoryId: string;
  videoId: string;
  promptId: string;
  response: string;
  timestamp: Date;
}

interface UserProgress {
  userId: string;
  completedCategories: string[];
  currentCategory: string | null;
  completedVideos: Record<string, string[]>; // categoryId -> videoIds
  skillsIdentified: Skill[];
  recommendedPaths: CareerPath[];
}

// Storing User Responses
const saveUserResponse = async (userId: string, categoryId: string, videoId: string, promptId: string, response: string) => {
  try {
    const responseRef = doc(collection(db, "userResponses"));
    await setDoc(responseRef, {
      userId,
      categoryId,
      videoId,
      promptId,
      response,
      timestamp: new Date()
    });
    
    // Update user progress
    await updateUserProgress(userId, categoryId, videoId);
    
    return responseRef.id;
  } catch (error) {
    console.error("Error saving response:", error);
    throw error;
  }
};
```

**Deliverables:**
- Firebase Firestore database setup
- Data models and storage functions
- Progress tracking visualization
- Journey resume functionality

### 2.3 Enhanced UI/UX & Information Density

**Objective:** Improve the user interface with increased information density and enhanced interactivity.

**Tasks:**
- Redesign key interfaces to increase information density
- Add data visualizations for skills and career paths
- Implement enhanced animations and transitions
- Improve mobile responsiveness
- Add accessibility features

**Technical Implementation:**
```typescript
// Example of Enhanced Dashboard with Recharts
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const EnhancedSkillsChart: React.FC<{ skills: Skill[] }> = ({ skills }) => {
  return (
    <div className="bg-white/10 backdrop-blur-md p-6 rounded-lg shadow-xl">
      <h3 className="text-xl font-semibold mb-4">Your Skills Profile</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={skills}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="level" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
      <div className="mt-4 grid grid-cols-2 gap-3">
        {skills.map(skill => (
          <div key={skill.name} className="bg-white/5 p-3 rounded">
            <div className="flex justify-between">
              <span>{skill.name}</span>
              <span>{skill.level}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5 mt-1">
              <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${skill.level}%` }}></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
```

**Deliverables:**
- Redesigned interfaces with increased information density
- Enhanced data visualizations
- Animation and transition improvements
- Accessibility enhancements

## Phase 3: Advanced Features & Integration

### 3.1 Voice Interface Implementation

**Objective:** Implement voice interaction using Vapi.

**Tasks:**
- Set up Vapi integration with provided credentials
- Design voice interaction flows
- Implement voice widget UI component
- Create fallback mechanisms for text input
- Test and optimize voice recognition accuracy

**Technical Implementation:**
```typescript
// Vapi Integration
const VoiceInterface: React.FC = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://cdn.vapi.ai/widget.js';
    script.async = true;
    document.body.appendChild(script);
    
    script.onload = () => {
      // @ts-ignore
      window.vapi = new window.Vapi({
        agentId: 'd346c275-7cee-47cb-ba7b-8590dd754d9e',
        apiKey: 'e50ff16a-e1ef-4555-ba90-b9c583389acc',
        styles: {
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          width: '60px',
          height: '60px',
          borderRadius: '50%',
          backgroundColor: '#3A86FF',
          boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 9999
        }
      });
    };
    
    return () => {
      document.body.removeChild(script);
      // @ts-ignore
      if (window.vapi) {
        // @ts-ignore
        window.vapi.destroy();
      }
    };
  }, []);
  
  return <div id="vapi-widget"></div>;
};
```

**Deliverables:**
- Vapi integration
- Voice interaction UI component
- Voice interaction flows
- Fallback text input mechanisms

### 3.2 Analytics & Insights

**Objective:** Implement analytics tracking and insights generation.

**Tasks:**
- Set up Firebase Analytics
- Define key metrics and events to track
- Implement event tracking throughout the application
- Create admin dashboard for analytics visualization
- Develop insights generation from user data

**Technical Implementation:**
```typescript
// Firebase Analytics Setup
import { getAnalytics, logEvent } from 'firebase/analytics';

const analytics = getAnalytics(app);

// Event Tracking
const trackEvent = (eventName: string, eventParams?: Record<string, any>) => {
  logEvent(analytics, eventName, eventParams);
};

// Example Usage
const handleVideoPlay = (videoId: string, categoryId: string) => {
  trackEvent('video_play', {
    video_id: videoId,
    category_id: categoryId,
    timestamp: new Date().toISOString()
  });
  
  // Video play logic
};
```

**Deliverables:**
- Firebase Analytics integration
- Event tracking implementation
- Analytics dashboard
- Insights generation system

### 3.3 Instagram Content Integration

**Objective:** Implement Instagram content integration for additional career insights.

**Tasks:**
- Research Instagram API limitations and alternatives
- Design Instagram content display component
- Implement content fetching and caching
- Create content moderation system
- Integrate Instagram content into career exploration flow

**Technical Implementation:**
```typescript
// Instagram Content Component (using Instagram Basic Display API)
interface InstagramPost {
  id: string;
  media_url: string;
  permalink: string;
  caption: string;
  timestamp: string;
}

const InstagramFeed: React.FC<{ hashtag: string }> = ({ hashtag }) => {
  const [posts, setPosts] = useState<InstagramPost[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        // In a real implementation, this would be a backend API call
        // as Instagram API requires server-side authentication
        const response = await fetch(`/api/instagram-posts?hashtag=${hashtag}`);
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error("Error fetching Instagram posts:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchPosts();
  }, [hashtag]);
  
  if (loading) return <div>Loading posts...</div>;
  
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {posts.map(post => (
        <a 
          key={post.id} 
          href={post.permalink} 
          target="_blank" 
          rel="noopener noreferrer"
          className="block overflow-hidden rounded-lg"
        >
          <img src={post.media_url} alt={post.caption} className="w-full h-auto" />
        </a>
      ))}
    </div>
  );
};
```

**Deliverables:**
- Instagram content integration strategy
- Content display component
- Content fetching and caching system
- Moderation guidelines and tools

## Implementation Timeline

### Phase 1 (Weeks 1-4)
- Week 1: Career category analysis and selection
- Week 2: OpenAI integration setup and initial implementation
- Week 3: Multiple career journey implementation
- Week 4: Content sourcing and initial library creat
(Content truncated due to size limit. Use line ranges to read in chunks)