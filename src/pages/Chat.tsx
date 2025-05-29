import React from 'react';
import ChatInterface from '../components/features/chat/ChatInterface';

const Chat: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Chat with GlowAI</h1>
      <ChatInterface />
    </div>
  );
};

export default Chat;