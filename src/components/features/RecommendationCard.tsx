import React from 'react';
import { ExternalLink } from 'lucide-react';
import { Recommendation } from '../../types';
import Card, { CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '../ui/Card';
import Button from '../ui/Button';

interface RecommendationCardProps {
  recommendation: Recommendation;
  onSave?: () => void;
  className?: string;
}

const RecommendationCard: React.FC<RecommendationCardProps> = ({
  recommendation,
  onSave,
  className = '',
}) => {
  const getIconByType = (type: string) => {
    switch (type) {
      case 'product':
        return (
          <div className="bg-primary-100 text-primary-700 p-2 rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg\" width="20\" height="20\" viewBox="0 0 24 24\" fill="none\" stroke="currentColor\" strokeWidth="2\" strokeLinecap="round\" strokeLinejoin="round">
              <path d="M3 9h18v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9Z"/>
              <path d="M3 9V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v4"/>
              <path d="M9 2v7"/>
              <path d="M15 2v7"/>
            </svg>
          </div>
        );
      case 'routine':
        return (
          <div className="bg-secondary-100 text-secondary-700 p-2 rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"/>
              <polyline points="12 6 12 12 16 14"/>
            </svg>
          </div>
        );
      case 'tip':
        return (
          <div className="bg-accent-100 text-accent-700 p-2 rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 22v-5"/>
              <path d="M9 7V2"/>
              <path d="M15 7V2"/>
              <path d="M9 12a3 3 0 1 0 6 0 3 3 0 1 0-6 0Z"/>
              <path d="M6 16.5h12"/>
              <path d="M12 17a5 5 0 0 0 5-5"/>
              <path d="M7 12a5 5 0 0 0 5 5"/>
            </svg>
          </div>
        );
      default:
        return null;
    }
  };
  
  return (
    <Card className={`h-full transition-all hover:shadow-md ${className}`} hoverEffect>
      <CardHeader className="flex items-start">
        <div className="flex justify-between w-full">
          <div className="flex items-center">
            {getIconByType(recommendation.type)}
            <CardTitle className="ml-2">{recommendation.title}</CardTitle>
          </div>
          <span className="text-xs font-medium uppercase text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
            {recommendation.type}
          </span>
        </div>
      </CardHeader>
      
      <CardContent>
        {recommendation.imageUrl && (
          <div className="mb-3 overflow-hidden rounded-lg">
            <img
              src={recommendation.imageUrl}
              alt={recommendation.title}
              className="w-full h-48 object-cover transition-transform hover:scale-105"
            />
          </div>
        )}
        
        <CardDescription className="text-gray-700">
          {recommendation.description}
        </CardDescription>
      </CardContent>
      
      <CardFooter className="flex justify-between">
        {recommendation.linkUrl && (
          <Button
            variant="ghost"
            size="sm"
            rightIcon={<ExternalLink size={14} />}
          >
            Learn more
          </Button>
        )}
        
        {onSave && (
          <Button
            variant="outline"
            size="sm"
            onClick={onSave}
          >
            Save
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default RecommendationCard;