import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { OnboardingStep as OnboardingStepType } from '../../../types';
import OnboardingStep from './OnboardingStep';
import Button from '../../ui/Button';
import { mockOnboardingSteps } from '../../../utils/mockData';

interface OnboardingFlowProps {
  onComplete: () => void;
  className?: string;
}

const OnboardingFlow: React.FC<OnboardingFlowProps> = ({
  onComplete,
  className = '',
}) => {
  const [steps, setSteps] = useState<OnboardingStepType[]>(mockOnboardingSteps);
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  
  const handleStepClick = (index: number) => {
    // Only allow clicking on completed steps or the active step
    if (steps[index].isCompleted || index === activeStepIndex) {
      setActiveStepIndex(index);
    }
  };
  
  const handleNext = () => {
    if (activeStepIndex < steps.length - 1) {
      // Mark the current step as completed
      const updatedSteps = [...steps];
      updatedSteps[activeStepIndex].isCompleted = true;
      setSteps(updatedSteps);
      
      // Move to the next step
      setActiveStepIndex(activeStepIndex + 1);
    } else {
      // All steps completed
      const updatedSteps = [...steps];
      updatedSteps[activeStepIndex].isCompleted = true;
      setSteps(updatedSteps);
      
      onComplete();
    }
  };
  
  const handleBack = () => {
    if (activeStepIndex > 0) {
      setActiveStepIndex(activeStepIndex - 1);
    }
  };
  
  const renderStepContent = () => {
    const step = steps[activeStepIndex];
    
    switch (step.id) {
      case '1': // Welcome
        return (
          <div className="text-center max-w-md mx-auto">
            <div className="mb-6">
              <div className="w-16 h-16 mx-auto bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full flex items-center justify-center">
                <span className="text-white text-2xl font-bold">G</span>
              </div>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Welcome to GlowAI</h2>
            <p className="text-gray-600 mb-6">
              Your personal AI-powered skincare assistant that helps you achieve your best skin ever.
            </p>
            <div className="space-y-4">
              <div className="flex items-center p-3 bg-primary-50 rounded-lg">
                <span className="flex-shrink-0 mr-3 text-primary-600">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 9h18v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9Z" />
                    <path d="M3 9V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v4" />
                  </svg>
                </span>
                <span className="text-sm text-primary-800">Get personalized product recommendations</span>
              </div>
              <div className="flex items-center p-3 bg-secondary-50 rounded-lg">
                <span className="flex-shrink-0 mr-3 text-secondary-600">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" />
                    <circle cx="12" cy="13" r="3" />
                  </svg>
                </span>
                <span className="text-sm text-secondary-800">AI-powered skin analysis</span>
              </div>
              <div className="flex items-center p-3 bg-accent-50 rounded-lg">
                <span className="flex-shrink-0 mr-3 text-accent-600">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="m12 14 4-4" />
                    <path d="M3.34 19a10 10 0 1 1 17.32 0" />
                  </svg>
                </span>
                <span className="text-sm text-accent-800">Track your skin's progress over time</span>
              </div>
            </div>
          </div>
        );
      case '2': // Skin profile
        return (
          <div className="max-w-md mx-auto">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Tell us about your skin</h2>
            <p className="text-gray-600 mb-6">
              This helps us provide personalized recommendations for your unique needs.
            </p>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  What's your skin type?
                </label>
                <select className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500">
                  <option value="">Select your skin type</option>
                  <option value="dry">Dry</option>
                  <option value="oily">Oily</option>
                  <option value="combination">Combination</option>
                  <option value="normal">Normal</option>
                  <option value="sensitive">Sensitive</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Select your skin concerns (select all that apply):
                </label>
                <div className="space-y-2">
                  {['Acne', 'Dark spots', 'Fine lines', 'Dryness', 'Redness', 'Uneven texture', 'Large pores', 'Dullness'].map((concern) => (
                    <label key={concern} className="flex items-center">
                      <input type="checkbox" className="rounded text-primary-600 focus:ring-primary-500 mr-2" />
                      <span className="text-sm text-gray-700">{concern}</span>
                    </label>
                  ))}
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  What's your current skincare routine like?
                </label>
                <select className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500">
                  <option value="">Select routine complexity</option>
                  <option value="minimal">Minimal (cleanser + moisturizer)</option>
                  <option value="basic">Basic (cleanser, moisturizer, SPF)</option>
                  <option value="intermediate">Intermediate (basic + serums)</option>
                  <option value="advanced">Advanced (full routine with multiple steps)</option>
                </select>
              </div>
            </div>
          </div>
        );
      case '3': // Image upload
        return (
          <div className="max-w-md mx-auto">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Upload a selfie</h2>
            <p className="text-gray-600 mb-6">
              Our AI will analyze your skin and provide personalized recommendations.
            </p>
            
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center text-center bg-gray-50">
              <div className="mb-4 text-gray-400">
                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" />
                  <circle cx="12" cy="13" r="3" />
                </svg>
              </div>
              <p className="text-sm font-medium text-gray-700 mb-1">
                Drag & drop your selfie here
              </p>
              <p className="text-xs text-gray-500 mb-4">
                or click to select a file
              </p>
              <button
                type="button"
                className="px-4 py-2 text-sm font-medium text-white bg-primary-600 rounded-full hover:bg-primary-700 transition-colors"
              >
                Select Image
              </button>
            </div>
            
            <div className="mt-4 text-xs text-gray-500">
              <p>Tips for the best analysis:</p>
              <ul className="list-disc pl-5 mt-1 space-y-1">
                <li>Use natural lighting</li>
                <li>No makeup for best results</li>
                <li>Face the camera directly</li>
                <li>Your photo is kept private and secure</li>
              </ul>
            </div>
          </div>
        );
      case '4': // Goals
        return (
          <div className="max-w-md mx-auto">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Set your skincare goals</h2>
            <p className="text-gray-600 mb-6">
              What would you like to achieve with your skincare routine?
            </p>
            
            <div className="space-y-3">
              {[
                { id: 'goal1', label: 'Clear up acne and breakouts' },
                { id: 'goal2', label: 'Reduce signs of aging (fine lines, wrinkles)' },
                { id: 'goal3', label: 'Even out skin tone and texture' },
                { id: 'goal4', label: 'Hydrate dry skin' },
                { id: 'goal5', label: 'Reduce redness and irritation' },
                { id: 'goal6', label: 'Brighten dull complexion' },
                { id: 'goal7', label: 'Minimize pores' },
              ].map((goal) => (
                <label key={goal.id} className="flex items-center p-3 bg-white border border-gray-200 rounded-lg hover:border-primary-300 hover:bg-primary-50 transition-colors cursor-pointer">
                  <input
                    type="checkbox"
                    id={goal.id}
                    className="rounded text-primary-600 focus:ring-primary-500 mr-3"
                  />
                  <span className="text-sm text-gray-700">{goal.label}</span>
                </label>
              ))}
              
              <label className="flex items-center p-3 bg-white border border-gray-200 rounded-lg hover:border-primary-300 hover:bg-primary-50 transition-colors cursor-pointer">
                <input
                  type="checkbox"
                  id="goalOther"
                  className="rounded text-primary-600 focus:ring-primary-500 mr-3"
                />
                <span className="text-sm text-gray-700">Other (please specify)</span>
              </label>
              
              <div>
                <textarea
                  placeholder="Tell us more about your skincare goals..."
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 mt-3"
                  rows={3}
                />
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };
  
  return (
    <div className={`bg-white rounded-xl shadow-sm overflow-hidden ${className}`}>
      <div className="flex">
        {/* Side panel with steps */}
        <div className="hidden md:block w-64 bg-gray-50 p-6 border-r border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">Get Started</h2>
          <div className="space-y-0">
            {steps.map((step, index) => (
              <OnboardingStep
                key={step.id}
                step={step}
                index={index}
                isActive={index === activeStepIndex}
                totalSteps={steps.length}
                onClick={() => handleStepClick(index)}
              />
            ))}
          </div>
        </div>
        
        {/* Main content */}
        <div className="flex-1 p-6">
          <div className="md:hidden mb-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Get Started</h2>
              <div className="text-sm text-gray-500">
                Step {activeStepIndex + 1} of {steps.length}
              </div>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-1.5 mb-1">
              <div
                className="bg-primary-600 h-1.5 rounded-full transition-all duration-300 ease-in-out"
                style={{ width: `${((activeStepIndex + 1) / steps.length) * 100}%` }}
              />
            </div>
            <h3 className="text-base font-medium text-primary-600 mt-2">
              {steps[activeStepIndex].title}
            </h3>
          </div>
          
          <div className="min-h-[400px]">
            {renderStepContent()}
          </div>
          
          <div className="flex justify-between mt-6 pt-4 border-t border-gray-200">
            <Button
              variant="outline"
              leftIcon={<ChevronLeft size={16} />}
              onClick={handleBack}
              disabled={activeStepIndex === 0}
            >
              Back
            </Button>
            <Button
              variant="primary"
              rightIcon={<ChevronRight size={16} />}
              onClick={handleNext}
            >
              {activeStepIndex === steps.length - 1 ? 'Complete' : 'Next'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnboardingFlow;