import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MessageSquare, Camera, BarChart3, FileText } from 'lucide-react';
import Button from '../components/ui/Button';
import OnboardingFlow from '../components/features/onboarding/OnboardingFlow';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const [showOnboarding, setShowOnboarding] = useState(false);
  
  const handleCompleteOnboarding = () => {
    setShowOnboarding(false);
    navigate('/chat');
  };
  
  if (showOnboarding) {
    return (
      <div className="max-w-4xl mx-auto">
        <OnboardingFlow onComplete={handleCompleteOnboarding} />
      </div>
    );
  }
  
  return (
    <div className="max-w-6xl mx-auto">
      {/* Hero Section */}
      <div className="flex flex-col md:flex-row items-center gap-8 mb-16">
        <div className="flex-1 text-center md:text-left">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Your Personal AI Skincare Assistant
          </h1>
          <p className="text-lg text-gray-600 mb-6">
            Get personalized skincare advice, product recommendations, and track your skin's progress over time.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start">
            <Button
              size="lg"
              onClick={() => setShowOnboarding(true)}
            >
              Get Started
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => navigate('/chat')}
            >
              Try Now
            </Button>
          </div>
        </div>
        <div className="flex-1">
          <div className="relative">
            <img
              src="https://images.pexels.com/photos/3762879/pexels-photo-3762879.jpeg?auto=compress&cs=tinysrgb&w=600"
              alt="Skincare Routine"
              className="rounded-2xl shadow-lg"
            />
            <div className="absolute -bottom-6 -left-6 bg-white p-3 rounded-xl shadow-md">
              <img
                src="https://images.pexels.com/photos/3851254/pexels-photo-3851254.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt="Skincare Products"
                className="w-32 h-24 object-cover rounded-lg"
              />
            </div>
            <div className="absolute -top-6 -right-6 bg-white p-3 rounded-xl shadow-md">
              <img
                src="https://images.pexels.com/photos/4465124/pexels-photo-4465124.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt="Face Care"
                className="w-32 h-24 object-cover rounded-lg"
              />
            </div>
          </div>
        </div>
      </div>
      
      {/* Features Section */}
      <div className="mb-16">
        <h2 className="text-2xl font-bold text-gray-900 text-center mb-10">
          How GlowAI Works
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 text-center hover:shadow-md transition-shadow">
            <div className="bg-primary-100 text-primary-600 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
              <MessageSquare size={24} />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Chat with AI
            </h3>
            <p className="text-gray-600 text-sm">
              Ask questions about your skin concerns and get personalized advice from our AI assistant.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 text-center hover:shadow-md transition-shadow">
            <div className="bg-secondary-100 text-secondary-600 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
              <Camera size={24} />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Skin Analysis
            </h3>
            <p className="text-gray-600 text-sm">
              Upload a selfie and get an AI-powered analysis of your skin condition and concerns.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 text-center hover:shadow-md transition-shadow">
            <div className="bg-accent-100 text-accent-600 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
              <FileText size={24} />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Recommendations
            </h3>
            <p className="text-gray-600 text-sm">
              Get personalized product and routine recommendations based on your skin needs.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 text-center hover:shadow-md transition-shadow">
            <div className="bg-success-100 text-success-600 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
              <BarChart3 size={24} />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Progress Tracking
            </h3>
            <p className="text-gray-600 text-sm">
              Monitor your skin's improvement over time with visual progress tracking.
            </p>
          </div>
        </div>
      </div>
      
      {/* Testimonials Section */}
      <div className="mb-16">
        <h2 className="text-2xl font-bold text-gray-900 text-center mb-10">
          What Our Users Say
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center mb-4">
              <div className="flex-shrink-0 mr-3">
                <img
                  src="https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150"
                  alt="User"
                  className="w-10 h-10 rounded-full object-cover"
                />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-gray-900">Sarah K.</h4>
                <div className="flex text-yellow-400">
                  {'★'.repeat(5)}
                </div>
              </div>
            </div>
            <p className="text-gray-600 text-sm">
              "The AI recommendations were spot on! My skin has never looked better. I love how it tracks my progress and adjusts recommendations over time."
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center mb-4">
              <div className="flex-shrink-0 mr-3">
                <img
                  src="https://images.pexels.com/photos/697509/pexels-photo-697509.jpeg?auto=compress&cs=tinysrgb&w=150"
                  alt="User"
                  className="w-10 h-10 rounded-full object-cover"
                />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-gray-900">Michael T.</h4>
                <div className="flex text-yellow-400">
                  {'★'.repeat(5)}
                </div>
              </div>
            </div>
            <p className="text-gray-600 text-sm">
              "As someone who knew nothing about skincare, this app has been a game-changer. The AI explained everything in simple terms and helped me establish a routine."
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center mb-4">
              <div className="flex-shrink-0 mr-3">
                <img
                  src="https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150"
                  alt="User"
                  className="w-10 h-10 rounded-full object-cover"
                />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-gray-900">Aisha J.</h4>
                <div className="flex text-yellow-400">
                  {'★'.repeat(4)}{'☆'}
                </div>
              </div>
            </div>
            <p className="text-gray-600 text-sm">
              "I've struggled with acne for years and tried everything. The personalized approach from GlowAI finally helped me get it under control. So grateful!"
            </p>
          </div>
        </div>
      </div>
      
      {/* CTA Section */}
      <div className="bg-gradient-to-r from-primary-500 to-secondary-500 rounded-2xl p-10 text-center text-white">
        <h2 className="text-2xl font-bold mb-4">
          Start Your Skincare Journey Today
        </h2>
        <p className="mb-6 max-w-2xl mx-auto">
          Join thousands of users who have transformed their skin with personalized AI-powered skincare advice.
        </p>
        <Button
          size="lg"
          className="bg-white text-primary-600 hover:bg-gray-100"
          onClick={() => setShowOnboarding(true)}
        >
          Get Started for Free
        </Button>
      </div>
    </div>
  );
};

export default Home;