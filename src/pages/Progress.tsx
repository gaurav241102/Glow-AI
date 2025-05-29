import React, { useState } from 'react';
import { Calendar, Filter } from 'lucide-react';
import Card, { CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import ProgressChart from '../components/features/ProgressChart';
import Tabs from '../components/ui/Tabs';
import { TabPanel } from '../components/ui/Tabs';
import Button from '../components/ui/Button';
import { mockProgressPoints } from '../utils/mockData';

const Progress: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overall');
  const [timeRange, setTimeRange] = useState('3m');
  
  // Filter progress data based on selected time range
  const getFilteredData = () => {
    const now = new Date();
    let pastDate = new Date();
    
    switch (timeRange) {
      case '1m':
        pastDate.setMonth(now.getMonth() - 1);
        break;
      case '3m':
        pastDate.setMonth(now.getMonth() - 3);
        break;
      case '6m':
        pastDate.setMonth(now.getMonth() - 6);
        break;
      case '1y':
        pastDate.setFullYear(now.getFullYear() - 1);
        break;
      default:
        pastDate.setMonth(now.getMonth() - 3);
    }
    
    return mockProgressPoints.filter(point => point.date >= pastDate);
  };
  
  const filteredData = getFilteredData();
  
  // Generate key metrics
  const calculateMetrics = () => {
    if (filteredData.length < 2) {
      return { change: 0, improvement: false };
    }
    
    const first = filteredData[0].score;
    const last = filteredData[filteredData.length - 1].score;
    const change = last - first;
    
    return {
      change: Math.abs(change),
      improvement: change > 0,
    };
  };
  
  const metrics = calculateMetrics();
  
  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-1">Skin Progress</h1>
          <p className="text-gray-600">
            Track your skin's improvement over time
          </p>
        </div>
        
        <div className="flex items-center space-x-2">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            <option value="1m">Last Month</option>
            <option value="3m">Last 3 Months</option>
            <option value="6m">Last 6 Months</option>
            <option value="1y">Last Year</option>
          </select>
          
          <Button variant="outline" size="sm" leftIcon={<Filter size={16} />}>
            Filter
          </Button>
          
          <Button variant="outline" size="sm" leftIcon={<Calendar size={16} />}>
            History
          </Button>
        </div>
      </div>
      
      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card className="bg-gradient-to-br from-primary-50 to-white border border-primary-100">
          <CardContent className="py-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Current Score</p>
                <p className="text-2xl font-bold text-primary-600">
                  {filteredData.length > 0 ? filteredData[filteredData.length - 1].score : 'N/A'}
                </p>
              </div>
              <div className="bg-primary-100 text-primary-600 p-2 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2v20M2 12h20M12 9v6M9 12h6" />
                </svg>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-secondary-50 to-white border border-secondary-100">
          <CardContent className="py-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Progress</p>
                <div className="flex items-center">
                  <p className="text-2xl font-bold text-secondary-600">
                    {metrics.change}%
                  </p>
                  {metrics.change > 0 && (
                    <span className={`ml-1 ${metrics.improvement ? 'text-success-500' : 'text-error-500'}`}>
                      {metrics.improvement ? '↑' : '↓'}
                    </span>
                  )}
                </div>
              </div>
              <div className="bg-secondary-100 text-secondary-600 p-2 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m2 12 5.6 5.6a1 1 0 0 0 1.4 0L16 10" />
                  <path d="m15 10 6 6" />
                </svg>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-accent-50 to-white border border-accent-100">
          <CardContent className="py-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Analyses</p>
                <p className="text-2xl font-bold text-accent-600">{filteredData.length}</p>
              </div>
              <div className="bg-accent-100 text-accent-600 p-2 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" />
                  <circle cx="12" cy="13" r="3" />
                </svg>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-success-50 to-white border border-success-100">
          <CardContent className="py-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Streak</p>
                <p className="text-2xl font-bold text-success-600">23 days</p>
              </div>
              <div className="bg-success-100 text-success-600 p-2 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22V8" />
                  <path d="m9 12 3-4 3 4" />
                  <path d="M14 2H8.5a2.5 2.5 0 0 0 0 5H12v1H8.5a2.5 2.5 0 0 0 0 5H12" />
                </svg>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Progress Chart */}
      <Card className="mb-6">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Progress Over Time</CardTitle>
            <Tabs
              tabs={[
                { label: 'Overall', value: 'overall' },
                { label: 'Hydration', value: 'hydration' },
                { label: 'Texture', value: 'texture' },
                { label: 'Brightness', value: 'brightness' },
              ]}
              value={activeTab}
              onChange={setActiveTab}
              variant="pills"
            />
          </div>
        </CardHeader>
        <CardContent>
          <TabPanel value={activeTab} tabValue="overall">
            <ProgressChart data={filteredData} height={300} />
          </TabPanel>
          <TabPanel value={activeTab} tabValue="hydration">
            <ProgressChart 
              data={filteredData.map(p => ({...p, score: p.score + Math.random() * 10 - 5}))} 
              height={300} 
            />
          </TabPanel>
          <TabPanel value={activeTab} tabValue="texture">
            <ProgressChart 
              data={filteredData.map(p => ({...p, score: p.score - Math.random() * 15 - 5}))} 
              height={300} 
            />
          </TabPanel>
          <TabPanel value={activeTab} tabValue="brightness">
            <ProgressChart 
              data={filteredData.map(p => ({...p, score: p.score + Math.random() * 15 - 10}))} 
              height={300} 
            />
          </TabPanel>
        </CardContent>
      </Card>
      
      {/* Journey Timeline */}
      <Card>
        <CardHeader>
          <CardTitle>Your Skincare Journey</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative">
            <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200" />
            
            {filteredData.filter(point => point.note).map((point, index) => (
              <div key={index} className="flex mb-6 relative">
                <div className="absolute left-4 top-3 -ml-2 w-4 h-4 rounded-full bg-primary-500 z-10" />
                <div className="ml-10">
                  <p className="text-sm text-gray-500 mb-1">
                    {point.date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                  </p>
                  <div className="bg-white rounded-lg p-4 border border-gray-200">
                    <div className="flex justify-between items-start">
                      <h4 className="text-base font-medium text-gray-900">Milestone</h4>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800">
                        Score: {point.score}
                      </span>
                    </div>
                    <p className="text-gray-700 mt-1">{point.note}</p>
                  </div>
                </div>
              </div>
            ))}
            
            <div className="flex items-center justify-center mt-4">
              <Button variant="outline" size="sm">
                View Complete History
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Progress;