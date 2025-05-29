import React from 'react';
import { Edit2, Settings, Bookmark, Calendar, LogOut } from 'lucide-react';
import Card, { CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import Button from '../components/ui/Button';
import Avatar from '../components/ui/Avatar';
import Tabs, { TabPanel } from '../components/ui/Tabs';
import { mockUser, mockMessages, mockRecommendations } from '../utils/mockData';

const Profile: React.FC = () => {
  const [activeTab, setActiveTab] = React.useState('info');
  const user = mockUser;
  
  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-6">
        <div className="bg-gradient-to-r from-primary-500 to-secondary-500 h-32" />
        <div className="px-6 pb-6">
          <div className="flex flex-col md:flex-row items-start md:items-end -mt-16 mb-4 gap-4">
            <Avatar
              src={user.avatarUrl}
              alt={user.name}
              size="xl"
              className="ring-4 ring-white w-24 h-24"
            />
            <div className="flex-1 mt-4 md:mt-0">
              <h1 className="text-2xl font-bold text-gray-900">{user.name}</h1>
              <p className="text-gray-600">Member since {user.joinedAt.toLocaleDateString()}</p>
            </div>
            <div className="mt-4 md:mt-0">
              <Button
                variant="outline"
                leftIcon={<Edit2 size={16} />}
              >
                Edit Profile
              </Button>
            </div>
          </div>
          
          <div className="flex overflow-x-auto pb-1">
            <Tabs
              tabs={[
                { label: 'Profile Info', value: 'info', icon: <User size={16} /> },
                { label: 'History', value: 'history', icon: <Calendar size={16} /> },
                { label: 'Saved Items', value: 'saved', icon: <Bookmark size={16} /> },
                { label: 'Settings', value: 'settings', icon: <Settings size={16} /> },
              ]}
              value={activeTab}
              onChange={setActiveTab}
              variant="underline"
            />
          </div>
        </div>
      </div>
      
      <div className="mb-6">
        <TabPanel value={activeTab} tabValue="info">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
                      value={user.name}
                      readOnly
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
                      value={user.email}
                      readOnly
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Skin Type
                    </label>
                    <input
                      type="text"
                      className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
                      value={user.skinType}
                      readOnly
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Skin Concerns
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {user.skinConcerns?.map((concern, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800"
                        >
                          {concern}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Account</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <button
                    type="button"
                    className="flex items-center w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-500"
                  >
                    <Settings size={16} className="mr-2" />
                    Account Settings
                  </button>
                  
                  <button
                    type="button"
                    className="flex items-center w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-500"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="mr-2"
                    >
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    </svg>
                    Privacy Settings
                  </button>
                  
                  <button
                    type="button"
                    className="flex items-center w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-500"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="mr-2"
                    >
                      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                    </svg>
                    Get Support
                  </button>
                  
                  <div className="pt-4 border-t border-gray-200">
                    <button
                      type="button"
                      className="flex items-center w-full px-4 py-2 text-sm font-medium text-error-600 bg-white border border-error-300 rounded-lg hover:bg-error-50 focus:outline-none focus:ring-2 focus:ring-error-500"
                    >
                      <LogOut size={16} className="mr-2" />
                      Sign Out
                    </button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabPanel>
        
        <TabPanel value={activeTab} tabValue="history">
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <h3 className="text-base font-medium text-gray-900 mb-2">
                  Recent Conversations
                </h3>
                
                <div className="space-y-3">
                  {mockMessages.slice(0, 3).map((message) => (
                    <div key={message.id} className="bg-gray-50 p-3 rounded-lg">
                      <div className="flex justify-between items-start mb-1">
                        <span className="text-sm font-medium text-gray-700">
                          {message.sender === 'user' ? 'You' : 'GlowAI'}
                        </span>
                        <span className="text-xs text-gray-500">
                          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600">
                        {message.content.length > 100
                          ? message.content.substring(0, 100) + '...'
                          : message.content}
                      </p>
                    </div>
                  ))}
                </div>
                
                <h3 className="text-base font-medium text-gray-900 mb-2 pt-4 border-t border-gray-200">
                  Recent Analyses
                </h3>
                
                <div className="space-y-3">
                  {[1, 2].map((i) => (
                    <div key={i} className="bg-gray-50 p-3 rounded-lg flex items-center">
                      <div className="flex-shrink-0 mr-3">
                        <div className="w-12 h-12 bg-gray-200 rounded-lg overflow-hidden">
                          <img
                            src={`https://images.pexels.com/photos/3762879/pexels-photo-3762879.jpeg?auto=compress&cs=tinysrgb&w=100`}
                            alt="Analysis"
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <span className="text-sm font-medium text-gray-700">
                            Skin Analysis #{i}
                          </span>
                          <span className="text-xs text-gray-500">
                            {new Date(Date.now() - i * 24 * 60 * 60 * 1000).toLocaleDateString()}
                          </span>
                        </div>
                        <p className="text-xs text-gray-500">
                          {i === 1 ? 'Concerns: Dryness, Fine lines' : 'Concerns: Acne, Redness'}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabPanel>
        
        <TabPanel value={activeTab} tabValue="saved">
          <Card>
            <CardHeader>
              <CardTitle>Saved Items</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {mockRecommendations.slice(0, 3).map((recommendation) => (
                  <div
                    key={recommendation.id}
                    className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow"
                  >
                    {recommendation.imageUrl && (
                      <div className="h-32 overflow-hidden">
                        <img
                          src={recommendation.imageUrl}
                          alt={recommendation.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    <div className="p-3">
                      <div className="flex justify-between items-start mb-1">
                        <h3 className="text-sm font-medium text-gray-900">{recommendation.title}</h3>
                        <span className="text-xs font-medium uppercase text-gray-500 bg-gray-100 px-1.5 py-0.5 rounded-full">
                          {recommendation.type}
                        </span>
                      </div>
                      <p className="text-xs text-gray-600 line-clamp-2 mb-2">
                        {recommendation.description}
                      </p>
                      <div className="flex justify-end">
                        <button
                          type="button"
                          className="text-xs text-primary-600 hover:text-primary-700"
                        >
                          View
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="flex justify-center mt-4">
                <Button variant="outline" size="sm">
                  View All Saved Items
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabPanel>
        
        <TabPanel value={activeTab} tabValue="settings">
          <Card>
            <CardHeader>
              <CardTitle>Account Settings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="text-base font-medium text-gray-900 mb-3">
                    Notification Preferences
                  </h3>
                  <div className="space-y-2">
                    {[
                      'Product recommendations',
                      'Skin analysis reminders',
                      'Routine reminders',
                      'Progress updates',
                      'New features and improvements',
                    ].map((item, index) => (
                      <label key={index} className="flex items-center justify-between p-3 bg-white border border-gray-200 rounded-lg">
                        <span className="text-sm text-gray-700">{item}</span>
                        <div className="relative inline-flex items-center">
                          <input
                            type="checkbox"
                            className="sr-only"
                            defaultChecked={index < 3}
                          />
                          <div className={`block w-10 h-6 rounded-full ${index < 3 ? 'bg-primary-600' : 'bg-gray-300'}`}></div>
                          <div className={`absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition ${index < 3 ? 'transform translate-x-4' : ''}`}></div>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>
                
                <div className="pt-4 border-t border-gray-200">
                  <h3 className="text-base font-medium text-gray-900 mb-3">
                    Privacy Settings
                  </h3>
                  <div className="space-y-2">
                    {[
                      'Allow data collection for better recommendations',
                      'Share anonymous skin data for research',
                      'Show progress in community (anonymized)',
                    ].map((item, index) => (
                      <label key={index} className="flex items-center justify-between p-3 bg-white border border-gray-200 rounded-lg">
                        <span className="text-sm text-gray-700">{item}</span>
                        <div className="relative inline-flex items-center">
                          <input
                            type="checkbox"
                            className="sr-only"
                            defaultChecked={index === 0}
                          />
                          <div className={`block w-10 h-6 rounded-full ${index === 0 ? 'bg-primary-600' : 'bg-gray-300'}`}></div>
                          <div className={`absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition ${index === 0 ? 'transform translate-x-4' : ''}`}></div>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>
                
                <div className="pt-4 border-t border-gray-200">
                  <h3 className="text-base font-medium text-gray-900 mb-3">
                    Account Management
                  </h3>
                  <div className="space-y-3">
                    <Button
                      variant="outline"
                      className="w-full justify-start"
                    >
                      Change Password
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full justify-start"
                    >
                      Export My Data
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-error-600 border-error-300 hover:bg-error-50"
                    >
                      Delete Account
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabPanel>
      </div>
    </div>
  );
};

export default Profile;