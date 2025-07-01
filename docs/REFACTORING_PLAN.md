# Off-Script Refactoring Plan

## 1. Overview of Changes

We're transforming Off-Script from a static informational site about alternative UK career pathways to an interactive, youth-focused career exploration platform with:
- AI-driven conversation (chat + voice)
- Video exploration feed
- Gamification elements
- Dynamic dashboard
- Report generation
- Parent/educator portal

## 2. Technical Stack Updates

### Current Stack
- React
- TypeScript
- Tailwind CSS
- Vite

### Required Additions
- Backend: Node.js with Express
- Database: Firebase Auth and Firestore
- AI: OpenAI GPT
- Voice: ElevenLabs
- Animation: Framer Motion
- State Management: Zustand
- Routing: React Router
- Video: YouTube API integration

## 3. Project Structure Refactoring

### New Structure
```
src/
  - App.tsx
  - components/
    - common/
      - Header.tsx
      - Footer.tsx
      - Navigation.tsx
    - auth/
      - Login.tsx
      - Register.tsx
      - ProfileSetup.tsx
    - dashboard/
      - Dashboard.tsx
      - FutureScape.tsx
      - SkillsMatrix.tsx
      - Achievements.tsx
    - exploration/
      - VideoFeed.tsx
      - VideoPlayer.tsx
      - ReflectionPrompts.tsx
      - CareerPaths.tsx
    - ai/
      - ChatInterface.tsx
      - VoiceChat.tsx
      - ReflectionAnalysis.tsx
    - gamification/
      - Quests.tsx
      - Streaks.tsx
      - Badges.tsx
    - reports/
      - ReportGenerator.tsx
      - ShareOptions.tsx
      - PresentationBuilder.tsx
    - parent-portal/
      - ParentView.tsx
      - AccessRequests.tsx
      - FeedbackInterface.tsx
  - context/
    - AuthContext.tsx
    - UserContext.tsx
    - GameContext.tsx
  - hooks/
    - useAI.ts
    - useVoice.ts
    - useVideos.ts
    - useReports.ts
  - services/
    - firebase.ts
    - openai.ts
    - elevenlabs.ts
    - youtube.ts
  - utils/
    - analytics.ts
    - formatters.ts
    - validators.ts
  - data/
    - careerPaths.ts
    - questData.ts
    - badgeData.ts
    - reflectionPrompts.ts
  - styles/
    - animations.ts
    - theme.ts
```

## 4. Component Reuse and Refactoring

### Components to Keep and Modify
1. **AIChat.tsx** - Expand with voice capabilities using ElevenLabs
2. **VideoFeed.tsx** - Refactor to TikTok-style scrollable feed
3. **Header.tsx** - Update with authentication and profile elements
4. **Footer.tsx** - Keep with minor updates
5. **CareerSectors.tsx** - Refactor into more dynamic exploration components

### Components to Replace
1. **Hero.tsx** - Replace with personalized dashboard
2. **AlternativePathways.tsx** - Replace with gamified progression system
3. **CourseRecommendations.tsx** - Replace with AI-driven personalized recommendations
4. **SectorDetailModal.tsx** - Replace with more interactive career path exploration

## 5. Implementation Phases

### Phase 1: Foundation (Weeks 1-2)
1. Set up Firebase authentication and Firestore
2. Create user profile system
3. Implement basic routing structure
4. Set up project structure and dependencies

### Phase 2: Core Features (Weeks 3-4)
1. Refactor video feed to TikTok-style interface
2. Enhance AI chat with more sophisticated conversation
3. Create basic dashboard view
4. Implement reflection prompts system

### Phase 3: Gamification & Reports (Weeks 5-6)
1. Implement streaks, badges, and quests
2. Create report generation functionality
3. Build sharing capabilities
4. Develop initial parent/educator portal

### Phase 4: Advanced Features (Weeks 7-8)
1. Integrate ElevenLabs voice chat
2. Create dynamic roadmap visualization
3. Develop skills matrix
4. Add advanced analytics

### Phase 5: Polish & Testing (Weeks 9-10)
1. Add animations and transitions
2. Conduct user testing
3. Fix bugs and optimize performance
4. Prepare for launch

## 6. Key Feature Implementation Details

### AI-Driven Conversational Exploration
- Refactor existing AIChat.tsx to support more sophisticated conversations
- Add voice interaction using ElevenLabs
- Implement contextual prompts based on video viewing history
- Create sentiment analysis for user responses

### Video Exploration Feed
- Transform current VideoFeed.tsx into a TikTok-style scrollable interface
- Integrate with YouTube API for content
- Add interactive prompts after video viewing
- Implement tagging and recommendation system

### Gamification Layer
- Create streak tracking for daily app usage
- Implement badge system for achievements
- Develop quest system with progression tracking
- Add visual rewards and celebrations

### Dynamic Dashboard & Roadmap
- Create personalized dashboard showing progress
- Implement "Futurescape" visualization of career options
- Develop skills matrix showing strengths and gaps
- Add milestone tracking

### Reports & Presentation Tools
- Create report generator with career insights
- Implement export to PDF and Google Slides
- Add sharable web links
- Develop presentation templates

### Parent/Educator Portal
- Implement request-to-view access system
- Create restricted dashboard for parents/educators
- Add feedback and question capability
- Ensure youth control over shared information

## 7. Data Structure Changes

### User Profile
```typescript
interface UserProfile {
  uid: string;
  displayName: string;
  email: string;
  interests: string[];
  watchHistory: {
    videoId: string;
    watchedAt: Date;
    completionPercentage: number;
  }[];
  reflections: {
    id: string;
    promptId: string;
    response: string;
    sentiment: string;
    createdAt: Date;
  }[];
  achievements: {
    badgeId: string;
    earnedAt: Date;
  }[];
  streaks: {
    currentStreak: number;
    longestStreak: number;
    lastActive: Date;
  };
  quests: {
    questId: string;
    progress: number;
    completed: boolean;
    startedAt: Date;
    completedAt?: Date;
  }[];
  parentConnections: {
    uid: string;
    status: 'pending' | 'approved' | 'rejected';
    requestedAt: Date;
    updatedAt: Date;
  }[];
}
```

### Career Path Data
```typescript
interface CareerPath {
  id: string;
  title: string;
  description: string;
  videos: string[];
  skills: {
    id: string;
    name: string;
    level: number;
  }[];
  milestones: {
    id: string;
    title: string;
    description: string;
    timeToAchieve: string;
  }[];
  salaryRange: {
    entry: number;
    mid: number;
    senior: number;
  };
  relatedPaths: string[];
}
```

## 8. Progress Tracking

| Feature | Status | Notes |
|---------|--------|-------|
| Project Setup | Not Started | |
| Firebase Integration | Not Started | |
| Authentication | Not Started | |
| Video Feed Refactoring | Not Started | |
| AI Chat Enhancement | Not Started | |
| Voice Integration | Not Started | |
| Dashboard Creation | Not Started | |
| Gamification System | Not Started | |
| Report Generation | Not Started | |
| Parent Portal | Not Started | |

## 9. Next Steps

1. Update package.json with new dependencies
2. Set up Firebase project
3. Create authentication system
4. Refactor existing components to match new structure
5. Implement core features in priority order

_Last Updated: June 8, 2025_
