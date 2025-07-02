# OpenAI Assistant Setup for OffScript

## Assistant Configuration

### Purpose
Create a specialized OpenAI Assistant that guides users through career exploration, helping them discover paths aligned with their interests, values, and aptitudes.

### Assistant Instructions
```
You are OffScript's Career Guide, an AI assistant specialized in helping young adults (16-24) explore career options.

GOALS:
- Help users discover career paths that align with their interests, values, and aptitudes
- Provide encouraging, non-judgmental guidance that builds confidence
- Ask thoughtful questions to uncover underlying motivations and preferences
- Offer insights about different career categories and their characteristics

CONVERSATION APPROACH:
1. Begin by asking open-ended questions about the user's interests, experiences, and what brings them joy
2. Listen for patterns and themes in their responses
3. Gradually narrow focus toward specific career categories that might resonate
4. Provide balanced information about potential paths, including:
   - Skills and aptitudes typically needed
   - Educational or training pathways
   - Day-to-day realities of the work
   - Growth potential and future outlook

CAREER CATEGORIES TO FOCUS ON:
- Technology & Digital (Software development, IT support, digital marketing)
- Creative & Media (Design, content creation, production)
- Skilled Trades (Electrical, plumbing, construction)
- Business & Entrepreneurship (Small business, startups, management)
- Healthcare & Wellbeing (Nursing, therapy, fitness)
- Sustainability & Environment (Renewable energy, conservation, green technology)
- Public Service & Education (Teaching, government, non-profit)

TONE AND STYLE:
- Conversational and friendly, but professional
- Encouraging without being unrealistic
- Curious and genuinely interested in the user's perspective
- Balanced between listening and providing guidance
- Age-appropriate for young adults (avoid condescension)

IMPORTANT GUIDELINES:
- Never make assumptions about the user's background, abilities, or resources
- Acknowledge that career paths are rarely linear and can change over time
- Emphasize transferable skills that apply across multiple fields
- Encourage exploration and "trying things out" rather than committing to one path
- Highlight both traditional and non-traditional pathways to careers
- When discussing education, present multiple options (university, community college, trade school, self-learning, etc.)
- Avoid reinforcing stereotypes about any profession or field

RESPONSE FORMAT:
- Keep responses concise and engaging
- Use examples and analogies to illustrate points
- Ask follow-up questions to deepen understanding
- Occasionally summarize insights to check understanding
```

### Tools to Enable
- **Knowledge Retrieval**: Enable this tool to allow the assistant to access information about career paths, educational requirements, and industry trends.
- **Code Interpreter**: Optional, could be useful for showing simple data visualizations about career trends.

## Frontend Integration

### Chat Interface Component
```tsx
import React, { useState, useEffect, useRef } from 'react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const ChatInterface: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Add initial welcome message from assistant
  useEffect(() => {
    setMessages([
      {
        role: 'assistant',
        content: "Hi there! I'm your OffScript Career Guide. I'm here to help you explore different career paths that might interest you. What kinds of activities or subjects do you enjoy spending time on?",
        timestamp: new Date()
      }
    ]);
  }, []);

  // Auto-scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async () => {
    if (!input.trim()) return;
    
    // Add user message to chat
    const userMessage = {
      role: 'user',
      content: input,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    
    try {
      // Call API to get assistant response
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: input,
          // Include any necessary context like previous messages or user preferences
        }),
      });
      
      const data = await response.json();
      
      // Add assistant response to chat
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: data.response,
        timestamp: new Date()
      }]);
    } catch (error) {
      console.error('Error getting response:', error);
      // Add error message
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: "I'm sorry, I'm having trouble responding right now. Please try again in a moment.",
        timestamp: new Date()
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full max-h-[600px] bg-white/10 backdrop-blur-md rounded-lg shadow-xl overflow-hidden">
      <div className="p-4 bg-indigo-600 text-white">
        <h2 className="text-xl font-semibold">Career Exploration Guide</h2>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, index) => (
          <div 
            key={index} 
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div 
              className={`max-w-[80%] p-3 rounded-lg ${
                msg.role === 'user' 
                  ? 'bg-indigo-500 text-white rounded-br-none' 
                  : 'bg-white/20 text-white rounded-bl-none'
              }`}
            >
              {msg.content}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-white/20 text-white p-3 rounded-lg rounded-bl-none max-w-[80%]">
              <div className="flex space-x-2">
                <div className="w-2 h-2 rounded-full bg-white animate-bounce"></div>
                <div className="w-2 h-2 rounded-full bg-white animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                <div className="w-2 h-2 rounded-full bg-white animate-bounce" style={{ animationDelay: '0.4s' }}></div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      
      <div className="p-4 border-t border-white/10">
        <div className="flex space-x-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="Ask about career paths..."
            className="flex-1 bg-white/10 text-white placeholder-white/50 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
          <button
            onClick={handleSendMessage}
            disabled={isLoading}
            className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-lg transition duration-200 disabled:opacity-50"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
```

## Backend API Integration

### API Endpoint for OpenAI Communication
```typescript
// This would be implemented as a serverless function or API route

import OpenAI from 'openai';
import { NextApiRequest, NextApiResponse } from 'next';

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Store thread IDs for users (in a real app, this would be in a database)
const userThreads: Record<string, string> = {};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { message, userId = 'anonymous' } = req.body;

    // Get or create thread ID for this user
    let threadId = userThreads[userId];
    if (!threadId) {
      const thread = await openai.beta.threads.create();
      threadId = thread.id;
      userThreads[userId] = threadId;
    }

    // Add user message to thread
    await openai.beta.threads.messages.create(threadId, {
      role: 'user',
      content: message,
    });

    // Run the assistant on the thread
    const run = await openai.beta.threads.runs.create(threadId, {
      assistant_id: process.env.OPENAI_ASSISTANT_ID!,
    });

    // Poll for the run to complete
    let runStatus = await openai.beta.threads.runs.retrieve(threadId, run.id);
    
    // Simple polling mechanism (in production, use a more sophisticated approach)
    while (runStatus.status !== 'completed') {
      if (runStatus.status === 'failed' || runStatus.status === 'cancelled') {
        return res.status(500).json({ error: 'Assistant run failed' });
      }
      
      // Wait a bit before checking again
      await new Promise(resolve => setTimeout(resolve, 1000));
      runStatus = await openai.beta.threads.runs.retrieve(threadId, run.id);
    }

    // Get messages from the thread
    const messages = await openai.beta.threads.messages.list(threadId);
    
    // Find the latest assistant message
    const assistantMessages = messages.data.filter(msg => msg.role === 'assistant');
    if (assistantMessages.length === 0) {
      return res.status(500).json({ error: 'No response from assistant' });
    }
    
    const latestMessage = assistantMessages[0];
    const responseContent = latestMessage.content[0].type === 'text' 
      ? latestMessage.content[0].text.value 
      : 'I received your message but am unable to provide a text response.';

    return res.status(200).json({ response: responseContent });
  } catch (error) {
    console.error('Error processing request:', error);
    return res.status(500).json({ error: 'Error processing request' });
  }
}
```

## Security Considerations

### API Key Protection
- Store the OpenAI API key as an environment variable
- Never expose the API key in client-side code
- Use server-side API routes to make OpenAI API calls

### User Data Handling
- Store conversation history securely
- Implement proper authentication for user-specific data
- Consider data retention policies for conversation history

## Implementation Steps

1. **Create the OpenAI Assistant**:
   - Use the OpenAI dashboard or API to create the assistant
   - Configure with the instructions provided above
   - Enable knowledge retrieval tool
   - Save the Assistant ID for API integration

2. **Set Up API Integration**:
   - Create server-side API endpoint for OpenAI communication
   - Implement secure handling of API keys
   - Set up conversation thread management

3. **Implement Chat Interface**:
   - Add the chat component to the appropriate pages
   - Style to match the existing OffScript design
   - Implement responsive design for mobile compatibility

4. **Test and Refine**:
   - Test conversation flows for different user scenarios
   - Refine assistant instructions based on test results
   - Optimize API usage to minimize costs

5. **Deploy and Monitor**:
   - Deploy the updated website with OpenAI integration
   - Monitor API usage and costs
   - Collect user feedback for further improvements
