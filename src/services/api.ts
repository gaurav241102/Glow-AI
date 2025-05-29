import axios from 'axios';
import { Message, SkinAnalysis } from '../types';

const API_BASE_URL = 'http://localhost:8000';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const sendChatMessage = async (message: string): Promise<Message> => {
  const response = await api.post('/chat', { message });
  return {
    id: `msg-${Date.now()}`,
    content: response.data.response.generated_text || response.data.response,
    sender: 'ai',
    timestamp: new Date(),
  };
};

export const analyzeSkinImage = async (file: File): Promise<SkinAnalysis> => {
  const formData = new FormData();
  formData.append('file', file);

  const response = await api.post('/analyze-skin', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return {
    id: `analysis-${Date.now()}`,
    userId: '1', // Replace with actual user ID from auth
    imageUrl: URL.createObjectURL(file),
    date: new Date(),
    concerns: response.data.concerns,
    recommendations: response.data.recommendations.map((rec: string) => ({
      id: `rec-${Date.now()}-${Math.random()}`,
      type: 'product',
      title: rec,
      description: rec,
    })),
  };
};