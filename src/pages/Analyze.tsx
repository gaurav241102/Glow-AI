import React, { useState } from 'react';
import ImageUploader from '../components/features/ImageUploader';
import AnalysisResult from '../components/features/AnalysisResult';
import Button from '../components/ui/Button';
import { SkinAnalysis } from '../types';
import { mockRecommendations } from '../utils/mockData';

const Analyze: React.FC = () => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<SkinAnalysis | null>(null);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  
  const handleImageUpload = (file: File) => {
    const reader = new FileReader();
    reader.onload = () => {
      setUploadedImage(reader.result as string);
    };
    reader.readAsDataURL(file);
  };
  
  const handleAnalyze = () => {
    if (!uploadedImage) return;
    
    setIsAnalyzing(true);
    
    // Simulate analysis delay
    setTimeout(() => {
      const mockAnalysis: SkinAnalysis = {
        id: '1',
        userId: '1',
        imageUrl: uploadedImage,
        date: new Date(),
        concerns: ['Dryness', 'Uneven texture', 'Mild inflammation'],
        recommendations: mockRecommendations,
      };
      
      setResult(mockAnalysis);
      setIsAnalyzing(false);
    }, 3000);
  };
  
  const handleReset = () => {
    setResult(null);
    setUploadedImage(null);
  };
  
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-900 mb-2">Skin Analysis</h1>
      <p className="text-gray-600 mb-6">
        Upload a selfie to get an AI-powered analysis of your skin condition and personalized recommendations.
      </p>
      
      {!result ? (
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Upload Your Selfie
            </h2>
            
            <ImageUploader
              onImageUpload={handleImageUpload}
              aspectRatio="1:1"
              className="mb-6"
            />
            
            <div className="flex justify-end">
              <Button
                onClick={handleAnalyze}
                disabled={!uploadedImage || isAnalyzing}
                isLoading={isAnalyzing}
              >
                {isAnalyzing ? 'Analyzing...' : 'Analyze Skin'}
              </Button>
            </div>
          </div>
          
          <div className="bg-gray-50 p-6 border-t border-gray-200">
            <h3 className="text-sm font-semibold text-gray-900 mb-3">
              Tips for the best analysis:
            </h3>
            <ul className="text-sm text-gray-600 space-y-2">
              <li className="flex items-start">
                <span className="text-primary-600 mr-2">•</span>
                Use natural lighting for the most accurate results
              </li>
              <li className="flex items-start">
                <span className="text-primary-600 mr-2">•</span>
                Take the photo without makeup if possible
              </li>
              <li className="flex items-start">
                <span className="text-primary-600 mr-2">•</span>
                Face the camera directly, showing your full face
              </li>
              <li className="flex items-start">
                <span className="text-primary-600 mr-2">•</span>
                Your photo is processed securely and privately
              </li>
            </ul>
          </div>
        </div>
      ) : (
        <div>
          <div className="flex justify-end mb-4">
            <Button variant="outline" onClick={handleReset}>
              New Analysis
            </Button>
          </div>
          <AnalysisResult analysis={result} />
        </div>
      )}
    </div>
  );
};

export default Analyze;