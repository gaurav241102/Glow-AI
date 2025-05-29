export interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  skinType?: string;
  skinConcerns?: string[];
  joinedAt: Date;
}

export interface Message {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  attachmentUrl?: string;
}

export interface SkinAnalysis {
  id: string;
  userId: string;
  imageUrl: string;
  date: Date;
  concerns: string[];
  recommendations: Recommendation[];
}

export interface Recommendation {
  id: string;
  type: 'product' | 'routine' | 'tip';
  title: string;
  description: string;
  imageUrl?: string;
  linkUrl?: string;
}

export interface ProgressPoint {
  date: Date;
  score: number;
  note?: string;
}

export interface ProgressData {
  userId: string;
  points: ProgressPoint[];
}

export interface OnboardingStep {
  id: string;
  title: string;
  description: string;
  isCompleted: boolean;
}