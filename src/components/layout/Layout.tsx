import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import { mockUser } from '../../utils/mockData';

const Layout: React.FC = () => {
  // In a real app, you would get the user from a context or auth provider
  const user = mockUser;

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header user={user} />
      <main className="flex-1">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
          <Outlet />
        </div>
      </main>
      <footer className="bg-white border-t border-gray-200 py-6">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center">
              <span className="bg-gradient-to-r from-primary-500 to-secondary-500 text-white rounded-full w-6 h-6 flex items-center justify-center">
                <span className="font-bold text-xs">G</span>
              </span>
              <span className="ml-2 text-base font-medium text-gray-900">GlowAI</span>
            </div>
            <div className="text-sm text-gray-500">
              &copy; {new Date().getFullYear()} GlowAI. All rights reserved.
            </div>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-500 hover:text-primary-600 transition-colors">
                Privacy
              </a>
              <a href="#" className="text-gray-500 hover:text-primary-600 transition-colors">
                Terms
              </a>
              <a href="#" className="text-gray-500 hover:text-primary-600 transition-colors">
                Contact
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;