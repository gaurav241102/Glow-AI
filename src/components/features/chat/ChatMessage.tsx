import React from 'react';
import { Message } from '../../../types';
import Avatar from '../../ui/Avatar';
import { Bot } from 'lucide-react';

interface ChatMessageProps {
  message: Message;
  isLast?: boolean;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message, isLast }) => {
  const isAI = message.sender === 'ai';
  
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };
  
  return (
    <div 
      className={`flex ${isAI ? 'justify-start' : 'justify-end'} mb-4`}
      id={isLast ? 'last-message' : undefined}
    >
      {isAI && (
        <div className="flex-shrink-0 mr-3">
          <div className="bg-primary-100 text-primary-700 rounded-full w-8 h-8 flex items-center justify-center">
            <Bot size={18} />
          </div>
        </div>
      )}
      
      <div className={`flex flex-col ${isAI ? 'items-start' : 'items-end'} max-w-[75%]`}>
        <div
          className={`
            px-4 py-3 rounded-2xl
            ${
              isAI
                ? 'bg-white border border-gray-200 text-gray-800'
                : 'bg-primary-600 text-white'
            }
          `}
        >
          <p className="text-sm whitespace-pre-wrap">{message.content}</p>
          
          {message.attachmentUrl && (
            <div className="mt-2">
              <img
                src={message.attachmentUrl}
                alt="Attachment"
                className="rounded-lg max-h-48 object-cover"
              />
            </div>
          )}
        </div>
        
        <span className="text-xs text-gray-500 mt-1">
          {formatTime(message.timestamp)}
        </span>
      </div>
      
      {!isAI && (
        <div className="flex-shrink-0 ml-3">
          <Avatar src="https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=150" size="sm" />
        </div>
      )}
    </div>
  );
};

export default ChatMessage;