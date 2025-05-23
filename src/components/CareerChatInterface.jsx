import React, { useState, useEffect, useRef } from 'react';
import '../styles/ChatInterface.css';

const CareerChatInterface = () => {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: "Hi there! I'm your career exploration guide. I can help you discover career paths that match your interests and strengths. What kind of work or activities do you enjoy?"
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [threadId, setThreadId] = useState(null);
  const messagesEndRef = useRef(null);

  // OpenAI API configuration
  const ASSISTANT_ID = import.meta.env.VITE_OPENAI_ASSISTANT_ID || 'your-assistant-id';
  const API_KEY = import.meta.env.VITE_OPENAI_API_KEY || 'your-api-key';

  // Auto-scroll to bottom of messages
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Create a new thread when component mounts
  useEffect(() => {
    const createThread = async () => {
      try {
        console.log('Creating new thread...');
        const response = await fetch('https://api.openai.com/v1/threads', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${API_KEY}`,
            'OpenAI-Beta': 'assistants=v2'
          },
          body: JSON.stringify({})
        });

        if (!response.ok) {
          const errorData = await response.json();
          console.error('Thread creation error details:', errorData);
          throw new Error(`Failed to create thread: ${response.status}`);
        }

        const data = await response.json();
        setThreadId(data.id);
        console.log('Thread ID:', data.id);
      } catch (error) {
        console.error('Error creating thread:', error);
      }
    };

    createThread();
  }, []);

  // Handle sending a message
  const handleSendMessage = async () => {
    if (!input.trim() || !threadId) return;

    const userMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      console.log('Sending message to assistant:', input);
      console.log('Thread ID:', threadId);

      // Add message to thread
      const messageResponse = await fetch(`https://api.openai.com/v1/threads/${threadId}/messages`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${API_KEY}`,
          'OpenAI-Beta': 'assistants=v2'
        },
        body: JSON.stringify({
          role: 'user',
          content: input
        })
      });

      if (!messageResponse.ok) {
        const errorData = await messageResponse.json();
        console.error('Message creation error details:', errorData);
        throw new Error(`Failed to add message: ${messageResponse.status}`);
      }

      // Create a run
      const runResponse = await fetch(`https://api.openai.com/v1/threads/${threadId}/runs`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${API_KEY}`,
          'OpenAI-Beta': 'assistants=v2'
        },
        body: JSON.stringify({
          assistant_id: ASSISTANT_ID
        })
      });

      if (!runResponse.ok) {
        const errorData = await runResponse.json();
        console.error('Run creation error details:', errorData);
        throw new Error(`Failed to create run: ${runResponse.status}`);
      }

      const runData = await runResponse.json();
      const runId = runData.id;
      console.log('Run ID:', runId);

      // Poll for run completion
      await pollRunStatus(threadId, runId);

    } catch (error) {
      console.error('Error in chat process:', error);
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: "I'm having trouble connecting to my knowledge base. Please try again in a moment." 
      }]);
      setIsLoading(false);
    }
  };

  // Poll for run status
  const pollRunStatus = async (threadId, runId) => {
    let completed = false;
    let attempts = 0;
    const maxAttempts = 30;

    while (!completed && attempts < maxAttempts) {
      try {
        const response = await fetch(`https://api.openai.com/v1/threads/${threadId}/runs/${runId}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${API_KEY}`,
            'OpenAI-Beta': 'assistants=v2'
          }
        });

        if (!response.ok) {
          const errorData = await response.json();
          console.error('Run status check error details:', errorData);
          throw new Error(`Failed to check run status: ${response.status}`);
        }

        const data = await response.json();
        console.log('Run status:', data.status);

        if (data.status === 'completed') {
          completed = true;
          await retrieveMessages();
        } else if (data.status === 'failed' || data.status === 'cancelled') {
          throw new Error(`Run ended with status: ${data.status}`);
        } else {
          // Wait before polling again
          await new Promise(resolve => setTimeout(resolve, 1000));
          attempts++;
        }
      } catch (error) {
        console.error('Error polling run status:', error);
        setMessages(prev => [...prev, { 
          role: 'assistant', 
          content: "I encountered an error while processing your request. Please try again." 
        }]);
        setIsLoading(false);
        return;
      }
    }

    if (!completed) {
      console.error('Run did not complete within the expected time');
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: "I'm taking too long to respond. Please try again." 
      }]);
      setIsLoading(false);
    }
  };

  // Retrieve messages from the thread
  const retrieveMessages = async () => {
    try {
      const response = await fetch(`https://api.openai.com/v1/threads/${threadId}/messages`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${API_KEY}`,
          'OpenAI-Beta': 'assistants=v2'
        }
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Messages retrieval error details:', errorData);
        throw new Error(`Failed to retrieve messages: ${response.status}`);
      }

      const data = await response.json();
      console.log('Retrieved messages:', data);
      
      // Find the latest assistant message
      const assistantMessages = data.data.filter(msg => msg.role === 'assistant');
      console.log('Assistant messages:', assistantMessages);
      
      if (assistantMessages.length > 0) {
        const latestMessage = assistantMessages[0];
        console.log('Latest message:', latestMessage);
        
        // Check if content exists and has the expected structure
        if (latestMessage.content && latestMessage.content.length > 0 && latestMessage.content[0].text) {
          const messageContent = latestMessage.content[0].text.value;
          console.log('Message content:', messageContent);
          
          setMessages(prev => [
            ...prev.filter(msg => msg.role !== 'assistant' || prev.indexOf(msg) !== prev.length - 1),
            { role: 'assistant', content: messageContent }
          ]);
        } else {
          console.error('Unexpected message structure:', latestMessage);
          throw new Error('Unexpected message structure');
        }
      } else {
        console.error('No assistant messages found');
      }
    } catch (error) {
      console.error('Error retrieving messages:', error);
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: "I had trouble retrieving my response. Please try again." 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-messages">
        {messages.map((message, index) => (
          <div key={index} className={`message ${message.role}`}>
            {message.content}
          </div>
        ))}
        {isLoading && (
          <div className="message assistant loading">
            <div className="typing-indicator">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      <div className="chat-input">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
          disabled={isLoading}
        />
        <button onClick={handleSendMessage} disabled={isLoading || !input.trim()}>
          Send
        </button>
      </div>
    </div>
  );
};

export default CareerChatInterface; 