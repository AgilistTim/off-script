import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Send, Mic, Volume2, User } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

// Message type definition
interface Message {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: Date;
}

// Initial messages to guide the user
const initialMessages: Message[] = [
  {
    id: '1',
    sender: 'ai',
    text: 'Hi there! I\'m your OffScript AI assistant. I\'m here to help you explore career options and reflect on what you\'ve learned from videos.',
    timestamp: new Date()
  },
  {
    id: '2',
    sender: 'ai',
    text: 'You can ask me questions about different career paths, discuss your interests and skills, or get help creating reports to share with parents or educators.',
    timestamp: new Date()
  }
];

const AIChat: React.FC = () => {
  const { currentUser } = useAuth();
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [newMessage, setNewMessage] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Auto-scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  // Handle sending a new message
  const handleSendMessage = () => {
    if (!newMessage.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: newMessage,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setNewMessage('');
    setIsTyping(true);
    
    // Simulate AI response after a short delay
    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: getSimulatedResponse(newMessage),
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1500);
  };
  
  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSendMessage();
  };
  
  // Toggle voice recording (placeholder functionality)
  const toggleRecording = () => {
    setIsRecording(!isRecording);
    
    // If turning off recording, simulate sending a voice message
    if (isRecording) {
      setNewMessage('This is a simulated voice message');
      setTimeout(() => {
        handleSendMessage();
      }, 500);
    }
  };
  
  // Format timestamp for display
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };
  
  // Simulated AI responses (in a real implementation, this would call an API)
  const getSimulatedResponse = (message: string) => {
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes('hello') || lowerMessage.includes('hi')) {
      return `Hello ${currentUser?.displayName || 'there'}! How can I help you with your career exploration today?`;
    } else if (lowerMessage.includes('technology') || lowerMessage.includes('software') || lowerMessage.includes('programming')) {
      return 'Technology careers are growing rapidly! There are many paths like software development, cybersecurity, data analysis, and UX design that don\'t always require a traditional degree. Would you like to explore specific roles in technology?';
    } else if (lowerMessage.includes('healthcare')) {
      return 'Healthcare offers many career options beyond being a doctor or nurse. Roles like medical technician, health information specialist, or care coordinator often have shorter training paths. What aspects of healthcare interest you?';
    } else if (lowerMessage.includes('trade') || lowerMessage.includes('skilled trade')) {
      return 'Skilled trades are in high demand! Electricians, plumbers, HVAC technicians, and welders often earn competitive salaries after apprenticeships rather than expensive degrees. Would you like to learn more about apprenticeship programs?';
    } else if (lowerMessage.includes('report') || lowerMessage.includes('presentation')) {
      return 'I can help you create a report or presentation about your career interests. What specific information would you like to include to share with your parents or teachers?';
    } else {
      return 'That\'s an interesting point to explore. Would you like to dive deeper into specific career paths, or should we discuss how your skills and interests might align with different options?';
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden h-[70vh] flex flex-col"
      >
        {/* Chat header */}
        <div className="p-4 border-b dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
          <h1 className="text-xl font-semibold text-gray-800 dark:text-white">
            AI Career Assistant
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Ask questions, reflect on videos, or get help with career planning
          </p>
        </div>
        
        {/* Messages area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] rounded-lg p-3 ${
                  message.sender === 'user'
                    ? 'bg-blue-600 text-white rounded-br-none'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white rounded-bl-none'
                }`}
              >
                <div className="flex items-center mb-1">
                  {message.sender === 'ai' ? (
                    <div className="w-6 h-6 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mr-2">
                      <Volume2 size={14} className="text-blue-600 dark:text-blue-400" />
                    </div>
                  ) : (
                    <div className="w-6 h-6 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center mr-2">
                      <User size={14} className="text-blue-600 dark:text-blue-400" />
                    </div>
                  )}
                  <span className="text-xs opacity-75">
                    {message.sender === 'ai' ? 'AI Assistant' : 'You'} • {formatTime(message.timestamp)}
                  </span>
                </div>
                <p>{message.text}</p>
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-3 rounded-bl-none">
                <div className="flex space-x-2">
                  <div className="w-2 h-2 bg-gray-400 dark:bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                  <div className="w-2 h-2 bg-gray-400 dark:bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                  <div className="w-2 h-2 bg-gray-400 dark:bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
        
        {/* Input area */}
        <form onSubmit={handleSubmit} className="p-4 border-t dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
          <div className="flex items-center">
            <button
              type="button"
              onClick={toggleRecording}
              className={`p-2 rounded-full mr-2 ${
                isRecording
                  ? 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400 animate-pulse'
                  : 'bg-gray-100 text-gray-500 dark:bg-gray-700 dark:text-gray-400'
              }`}
            >
              <Mic size={20} />
            </button>
            
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            />
            
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-r-lg hover:bg-blue-700 transition-colors"
            >
              <Send size={20} />
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default AIChat;
