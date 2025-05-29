import { Message, Recommendation, ProgressPoint, User, OnboardingStep } from '../types';

// Mock user data
export const mockUser: User = {
  id: '1',
  name: 'Alex Johnson',
  email: 'alex@example.com',
  avatarUrl: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=150',
  skinType: 'Combination',
  skinConcerns: ['Acne', 'Dark spots', 'Fine lines'],
  joinedAt: new Date('2023-09-15'),
};

// Mock chat messages
export const mockMessages: Message[] = [
  {
    id: '1',
    content: 'Hello! How can I help with your skincare today?',
    sender: 'ai',
    timestamp: new Date(Date.now() - 3600000 * 2),
  },
  {
    id: '2',
    content: "I've been noticing some dry patches on my cheeks lately. What should I do?",
    sender: 'user',
    timestamp: new Date(Date.now() - 3600000),
  },
  {
    id: '3',
    content: "Based on your skin type, I'd recommend adding a hydrating serum with hyaluronic acid to your routine. Apply it on damp skin for best results. Would you like some product recommendations?",
    sender: 'ai',
    timestamp: new Date(Date.now() - 3500000),
  },
  {
    id: '4',
    content: 'Yes, please recommend some products for me!',
    sender: 'user',
    timestamp: new Date(Date.now() - 3400000),
  },
];

// Mock recommendations
export const mockRecommendations: Recommendation[] = [
  {
    id: '1',
    type: 'product',
    title: 'Hydrating Serum',
    description: 'A lightweight hyaluronic acid serum that deeply hydrates the skin.',
    imageUrl: 'https://images.pexels.com/photos/3685530/pexels-photo-3685530.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    id: '2',
    type: 'product',
    title: 'Gentle Cleanser',
    description: 'Non-stripping cleanser suitable for daily use on sensitive skin.',
    imageUrl: 'https://images.pexels.com/photos/4465124/pexels-photo-4465124.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    id: '3',
    type: 'routine',
    title: 'Evening Routine',
    description: 'A calming evening routine to repair and hydrate your skin overnight.',
    imageUrl: 'https://images.pexels.com/photos/3762879/pexels-photo-3762879.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    id: '4',
    type: 'tip',
    title: 'Hydration Boost',
    description: 'Try using a humidifier at night to prevent dry skin, especially during winter months.',
    imageUrl: 'https://images.pexels.com/photos/3851254/pexels-photo-3851254.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
];

// Mock progress data
export const mockProgressPoints: ProgressPoint[] = [
  { date: new Date('2023-09-20'), score: 65, note: 'Started new routine' },
  { date: new Date('2023-10-01'), score: 68 },
  { date: new Date('2023-10-15'), score: 72, note: 'Added hydrating serum' },
  { date: new Date('2023-11-01'), score: 75 },
  { date: new Date('2023-11-15'), score: 79, note: 'Consistent with SPF' },
  { date: new Date('2023-12-01'), score: 82 },
  { date: new Date('2023-12-15'), score: 85, note: 'Added vitamin C' },
  { date: new Date('2024-01-01'), score: 88 },
];

// Onboarding steps
export const mockOnboardingSteps: OnboardingStep[] = [
  {
    id: '1',
    title: 'Welcome to GlowAI',
    description: 'Your personal skincare assistant powered by AI.',
    isCompleted: true,
  },
  {
    id: '2',
    title: 'Tell us about your skin',
    description: 'Help us understand your skin type and concerns.',
    isCompleted: false,
  },
  {
    id: '3',
    title: 'Upload a selfie',
    description: 'Get a personalized skin analysis and recommendations.',
    isCompleted: false,
  },
  {
    id: '4',
    title: 'Set your goals',
    description: 'What do you want to achieve with your skincare routine?',
    isCompleted: false,
  },
];