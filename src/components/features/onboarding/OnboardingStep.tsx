import React from 'react';
import { CheckCircle, Circle } from 'lucide-react';
import { OnboardingStep as OnboardingStepType } from '../../../types';

interface OnboardingStepProps {
  step: OnboardingStepType;
  index: number;
  isActive: boolean;
  totalSteps: number;
  onClick: () => void;
}

const OnboardingStep: React.FC<OnboardingStepProps> = ({
  step,
  index,
  isActive,
  totalSteps,
  onClick,
}) => {
  return (
    <div 
      className={`
        flex items-start w-full relative
        ${isActive ? 'opacity-100' : 'opacity-60'}
        ${step.isCompleted ? 'cursor-pointer' : isActive ? 'cursor-default' : 'cursor-not-allowed'}
      `}
      onClick={step.isCompleted || isActive ? onClick : undefined}
      role={step.isCompleted || isActive ? 'button' : undefined}
      tabIndex={step.isCompleted || isActive ? 0 : undefined}
    >
      {/* Connector line */}
      {index < totalSteps - 1 && (
        <div 
          className={`
            absolute top-6 left-6 ml-[0.5px] h-full w-0.5 -z-10
            ${step.isCompleted ? 'bg-primary-500' : 'bg-gray-200'}
          `}
        />
      )}
      
      {/* Step indicator */}
      <div className="flex-shrink-0 mr-4">
        <div className="flex items-center justify-center w-6 h-6">
          {step.isCompleted ? (
            <CheckCircle className="w-6 h-6 text-primary-500" />
          ) : (
            <Circle className={`w-6 h-6 ${isActive ? 'text-primary-500' : 'text-gray-300'}`} />
          )}
        </div>
      </div>
      
      {/* Step content */}
      <div className={`flex-1 pb-8 ${isActive ? 'text-gray-900' : 'text-gray-500'}`}>
        <h3 className={`text-base font-medium ${isActive ? 'text-primary-600' : ''}`}>
          {step.title}
        </h3>
        <p className="text-sm mt-1">
          {step.description}
        </p>
      </div>
    </div>
  );
};

export default OnboardingStep;