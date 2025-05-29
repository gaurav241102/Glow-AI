import React from 'react';
import { SkinAnalysis } from '../../types';
import Card, { CardContent, CardHeader, CardTitle } from '../ui/Card';
import RecommendationCard from './RecommendationCard';
import Progress from '../ui/Progress';

interface AnalysisResultProps {
  analysis: SkinAnalysis;
  className?: string;
}

const AnalysisResult: React.FC<AnalysisResultProps> = ({ analysis, className = '' }) => {
  // Generate random scores for different skin metrics
  const getRandomScore = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;
  
  const skinMetrics = [
    { name: 'Hydration', score: getRandomScore(65, 90), color: 'primary' },
    { name: 'Texture', score: getRandomScore(50, 85), color: 'secondary' },
    { name: 'Brightness', score: getRandomScore(60, 88), color: 'success' },
    { name: 'Pore Size', score: getRandomScore(40, 75), color: 'warning' },
  ];
  
  return (
    <div className={`space-y-6 ${className}`}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Your Skin Analysis</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="aspect-w-1 aspect-h-1 relative rounded-lg overflow-hidden mb-4">
              <img
                src={analysis.imageUrl}
                alt="Skin Analysis"
                className="w-full h-full object-cover"
              />
              
              {/* Annotations could be placed here based on AI analysis */}
              <div className="absolute top-1/4 left-1/4 w-6 h-6 rounded-full border-2 border-primary-500 bg-primary-500 bg-opacity-30 transform -translate-x-1/2 -translate-y-1/2" />
              <div className="absolute top-1/3 right-1/3 w-5 h-5 rounded-full border-2 border-warning-500 bg-warning-500 bg-opacity-30 transform -translate-x-1/2 -translate-y-1/2" />
            </div>
            
            <div>
              <h4 className="text-base font-medium text-gray-900 mb-2">
                Skin Concerns Detected
              </h4>
              <div className="flex flex-wrap gap-2">
                {analysis.concerns.map((concern, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800"
                  >
                    {concern}
                  </span>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="text-base font-medium text-gray-900 mb-3">
                Skin Metrics
              </h4>
              <div className="space-y-3">
                {skinMetrics.map((metric) => (
                  <Progress
                    key={metric.name}
                    value={metric.score}
                    label={metric.name}
                    color={metric.color as any}
                    showValue
                    size="md"
                  />
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>AI Insights</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="prose prose-sm">
              <p>
                Based on our analysis, your skin appears to be <span className="font-medium">combination type</span> with 
                signs of <span className="font-medium">dehydration</span> in the cheek area, and some 
                <span className="font-medium"> mild inflammation</span> around the T-zone.
              </p>
              <p className="mt-3">
                Your skin barrier function seems slightly compromised, which may be contributing to 
                the occasional sensitivity you're experiencing. The texture irregularities are likely
                due to a combination of dehydration and mild sun damage.
              </p>
              <h4 className="text-base font-medium text-gray-900 mt-4 mb-2">
                Key Focus Areas:
              </h4>
              <ul className="list-disc pl-5 space-y-1">
                <li>Hydration boosting with humectant-rich products</li>
                <li>Gentle exfoliation to improve texture (1-2x weekly)</li>
                <li>Barrier repair and protection</li>
                <li>Anti-inflammatory ingredients to calm redness</li>
              </ul>
              <p className="mt-3">
                Your skin has good elasticity and overall health. With consistent care 
                addressing the areas above, you should see significant improvement within 
                4-6 weeks.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div>
        <h3 className="text-xl font-semibold text-gray-900 mb-4">
          Personalized Recommendations
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {analysis.recommendations.map((recommendation) => (
            <RecommendationCard
              key={recommendation.id}
              recommendation={recommendation}
              onSave={() => {}}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AnalysisResult;