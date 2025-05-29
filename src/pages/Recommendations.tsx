import React, { useState } from 'react';
import { Filter, Grid, List } from 'lucide-react';
import Card, { CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import Button from '../components/ui/Button';
import Tabs, { TabPanel } from '../components/ui/Tabs';
import RecommendationCard from '../components/features/RecommendationCard';
import { mockRecommendations } from '../utils/mockData';

const Recommendations: React.FC = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  
  const filterRecommendations = (type?: string) => {
    if (type === 'all' || !type) return mockRecommendations;
    return mockRecommendations.filter(rec => rec.type === type);
  };
  
  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-1">Recommendations</h1>
          <p className="text-gray-600">
            Personalized product and routine recommendations for your skin
          </p>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button 
            variant="outline" 
            size="sm" 
            leftIcon={<Filter size={16} />}
          >
            Filter
          </Button>
          
          <div className="flex border border-gray-200 rounded-lg overflow-hidden">
            <button
              type="button"
              onClick={() => setViewMode('grid')}
              className={`px-3 py-2 ${
                viewMode === 'grid'
                  ? 'bg-primary-50 text-primary-600'
                  : 'bg-white text-gray-500 hover:bg-gray-50'
              }`}
              aria-label="Grid view"
            >
              <Grid size={18} />
            </button>
            <button
              type="button"
              onClick={() => setViewMode('list')}
              className={`px-3 py-2 ${
                viewMode === 'list'
                  ? 'bg-primary-50 text-primary-600'
                  : 'bg-white text-gray-500 hover:bg-gray-50'
              }`}
              aria-label="List view"
            >
              <List size={18} />
            </button>
          </div>
        </div>
      </div>
      
      <Card className="mb-6">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Your Recommendations</CardTitle>
            <Tabs
              tabs={[
                { label: 'All', value: 'all' },
                { label: 'Products', value: 'product' },
                { label: 'Routines', value: 'routine' },
                { label: 'Tips', value: 'tip' },
              ]}
              value={activeTab}
              onChange={setActiveTab}
              variant="underline"
            />
          </div>
        </CardHeader>
        <CardContent>
          <TabPanel value={activeTab} tabValue="all">
            <RecommendationsView 
              recommendations={filterRecommendations('all')} 
              viewMode={viewMode} 
            />
          </TabPanel>
          <TabPanel value={activeTab} tabValue="product">
            <RecommendationsView 
              recommendations={filterRecommendations('product')} 
              viewMode={viewMode} 
            />
          </TabPanel>
          <TabPanel value={activeTab} tabValue="routine">
            <RecommendationsView 
              recommendations={filterRecommendations('routine')} 
              viewMode={viewMode} 
            />
          </TabPanel>
          <TabPanel value={activeTab} tabValue="tip">
            <RecommendationsView 
              recommendations={filterRecommendations('tip')} 
              viewMode={viewMode} 
            />
          </TabPanel>
        </CardContent>
      </Card>
      
      <div className="bg-gradient-to-r from-primary-50 to-secondary-50 p-6 rounded-xl border border-primary-100 mb-6">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="mb-4 md:mb-0">
            <h3 className="text-lg font-semibold text-gray-900 mb-1">Need more personalized advice?</h3>
            <p className="text-gray-600">
              Chat with our AI assistant or upload a new selfie for updated recommendations.
            </p>
          </div>
          <div className="flex space-x-3">
            <Button variant="outline">Upload Selfie</Button>
            <Button>Chat Now</Button>
          </div>
        </div>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Recently Added</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {mockRecommendations.slice(0, 3).map((recommendation) => (
              <RecommendationCard
                key={recommendation.id}
                recommendation={recommendation}
                onSave={() => {}}
              />
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

interface RecommendationsViewProps {
  recommendations: any[];
  viewMode: 'grid' | 'list';
}

const RecommendationsView: React.FC<RecommendationsViewProps> = ({
  recommendations,
  viewMode,
}) => {
  if (recommendations.length === 0) {
    return (
      <div className="flex items-center justify-center h-48 bg-gray-50 rounded-lg">
        <p className="text-gray-500">No recommendations found</p>
      </div>
    );
  }
  
  if (viewMode === 'grid') {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {recommendations.map((recommendation) => (
          <RecommendationCard
            key={recommendation.id}
            recommendation={recommendation}
            onSave={() => {}}
          />
        ))}
      </div>
    );
  }
  
  return (
    <div className="space-y-4">
      {recommendations.map((recommendation) => (
        <div
          key={recommendation.id}
          className="flex flex-col md:flex-row border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow"
        >
          {recommendation.imageUrl && (
            <div className="md:w-1/3 h-48 md:h-auto overflow-hidden">
              <img
                src={recommendation.imageUrl}
                alt={recommendation.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}
          <div className="flex-1 p-4 flex flex-col">
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-lg font-semibold text-gray-900">{recommendation.title}</h3>
              <span className="text-xs font-medium uppercase text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                {recommendation.type}
              </span>
            </div>
            <p className="text-gray-600 text-sm mb-4 flex-grow">{recommendation.description}</p>
            <div className="flex justify-end mt-auto">
              {recommendation.linkUrl && (
                <Button variant="ghost\" size="sm\" className="mr-2">
                  Learn more
                </Button>
              )}
              <Button variant="outline" size="sm">
                Save
              </Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Recommendations;