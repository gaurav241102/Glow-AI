import React, { useState, useRef, useEffect } from 'react';
import { Send, Image, Mic, PlusCircle } from 'lucide-react';
import { Message } from '../../../types';
import ChatMessage from './ChatMessage';
import Button from '../../ui/Button';
import { sendChatMessage } from '../../../services/api';

const ChatInterface: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!input.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: `msg-${Date.now()}`,
      content: input,
      sender: 'user',
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    
    try {
      const aiResponse = await sendChatMessage(input);
      setMessages(prev => [...prev, aiResponse]);
    } catch (error) {
      console.error('Failed to get AI response:', error);
      // Add error message
      setMessages(prev => [...prev, {
        id: `msg-${Date.now()}`,
        content: "I'm sorry, I'm having trouble responding right now. Please try again later.",
        sender: 'ai',
        timestamp: new Date(),
      }]);
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="flex flex-col h-[calc(100vh-12rem)] bg-gray-50 rounded-xl overflow-hidden border border-gray-200">
      {/* Chat header */}
      <div className="bg-white p-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900">Skincare Assistant</h2>
        <p className="text-sm text-gray-500">Ask me anything about your skin concerns</p>
      </div>
      
      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-gray-50 to-white">
        {messages.map((message, index) => (
          <ChatMessage 
            key={message.id} 
            message={message} 
            isLast={index === messages.length - 1}
          />
        ))}
        
        {isLoading && (
          <div className="flex justify-start mb-4">
            <div className="flex-shrink-0 mr-3">
              <div className="bg-primary-100 text-primary-700 rounded-full w-8 h-8 flex items-center justify-center">
                <Bot size={18} />
              </div>
            </div>
            <div className="bg-white border border-gray-200 px-4 py-3 rounded-2xl">
              <div className="flex space-x-2">
                <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: '600ms' }}></div>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>
      
      {/* Input area */}
      <div className="bg-white border-t border-gray-200 p-4">
        <form onSubmit={handleSubmit} className="flex items-end space-x-2">
          <div className="flex-1 bg-gray-100 rounded-2xl px-4 py-2 focus-within:ring-2 focus-within:ring-primary-500 focus-within:ring-opacity-50">
            <div className="flex items-end">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about your skin concerns..."
                className="w-full bg-transparent border-0 focus:ring-0 resize-none max-h-32 py-2 text-sm"
                rows={1}
                style={{ minHeight: '40px' }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSubmit(e);
                  }
                }}
              />
              <div className="flex space-x-2 ml-2 mb-2">
                <button
                  type="button"
                  className="text-gray-500 hover:text-primary-600 transition-colors"
                  aria-label="Upload image"
                >
                  <Image size={18} />
                </button>
                <button
                  type="button"
                  className="text-gray-500 hover:text-primary-600 transition-colors"
                  aria-label="Voice input"
                >
                  <Mic size={18} />
                </button>
                <button
                  type="button"
                  className="text-gray-500 hover:text-primary-600 transition-colors"
                  aria-label="More options"
                >
                  <PlusCircle size={18} />
                </button>
              </div>
            </div>
          </div>
          <Button
            type="submit"
            variant="primary"
            size="md"
            className="rounded-full w-10 h-10 flex items-center justify-center p-0"
            aria-label="Send message"
            disabled={!input.trim() || isLoading}
          >
            <Send size={18} />
          </Button>
        </form>
      </div>
    </div>
  );
};

const Bot: React.FC<{ size: number }> = ({ size }) => {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      <path d="M12 8V4H8" />
      <rect width="16" height="12" x="4" y="8" rx="2" />
      <path d="M2 14h2" />
      <path d="M20 14h2" />
      <path d="M15 13v2" />
      <path d="M9 13v2" />
    </svg>
  );
};

export default ChatInterface;