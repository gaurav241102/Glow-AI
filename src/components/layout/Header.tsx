import React, { useState } from 'react';
import { Menu, X, Bell, User, Settings } from 'lucide-react';
import { Link } from 'react-router-dom';
import Avatar from '../ui/Avatar';
import { User as UserType } from '../../types';

interface HeaderProps {
  user?: UserType;
}

const Header: React.FC<HeaderProps> = ({ user }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm z-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 justify-between items-center">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2">
              <span className="bg-gradient-to-r from-primary-500 to-secondary-500 text-white rounded-full w-8 h-8 flex items-center justify-center">
                <span className="font-bold">G</span>
              </span>
              <span className="text-xl font-semibold text-gray-900">GlowAI</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/chat" className="text-sm font-medium text-gray-700 hover:text-primary-600 transition-colors">
              Chat
            </Link>
            <Link to="/analyze" className="text-sm font-medium text-gray-700 hover:text-primary-600 transition-colors">
              Skin Analysis
            </Link>
            <Link to="/progress" className="text-sm font-medium text-gray-700 hover:text-primary-600 transition-colors">
              Progress
            </Link>
            <Link to="/recommendations" className="text-sm font-medium text-gray-700 hover:text-primary-600 transition-colors">
              Recommendations
            </Link>
          </nav>

          {/* User Menu & Mobile Menu Button */}
          <div className="flex items-center">
            {user ? (
              <div className="flex items-center space-x-4">
                <button className="text-gray-500 hover:text-gray-700 transition-colors">
                  <Bell size={20} />
                </button>
                <div className="relative">
                  <Avatar 
                    src={user.avatarUrl} 
                    alt={user.name} 
                    size="sm"
                    className="cursor-pointer"
                  />
                </div>
              </div>
            ) : (
              <div className="hidden md:flex items-center space-x-2">
                <Link to="/login" className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-primary-600 transition-colors">
                  Log in
                </Link>
                <Link to="/signup" className="px-4 py-2 text-sm font-medium text-white bg-primary-600 rounded-full hover:bg-primary-700 transition-colors">
                  Sign up
                </Link>
              </div>
            )}

            {/* Mobile menu button */}
            <button
              type="button"
              className="md:hidden ml-4 text-gray-700"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 px-4 py-3">
          <div className="space-y-1">
            <Link 
              to="/chat" 
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50"
              onClick={() => setIsOpen(false)}
            >
              Chat
            </Link>
            <Link 
              to="/analyze" 
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50"
              onClick={() => setIsOpen(false)}
            >
              Skin Analysis
            </Link>
            <Link 
              to="/progress" 
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50"
              onClick={() => setIsOpen(false)}
            >
              Progress
            </Link>
            <Link 
              to="/recommendations" 
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50"
              onClick={() => setIsOpen(false)}
            >
              Recommendations
            </Link>
            
            {!user && (
              <>
                <Link 
                  to="/login" 
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50"
                  onClick={() => setIsOpen(false)}
                >
                  Log in
                </Link>
                <Link 
                  to="/signup" 
                  className="block px-3 py-2 rounded-md text-base font-medium text-primary-600 hover:bg-primary-50"
                  onClick={() => setIsOpen(false)}
                >
                  Sign up
                </Link>
              </>
            )}
            
            {user && (
              <>
                <Link 
                  to="/profile" 
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50"
                  onClick={() => setIsOpen(false)}
                >
                  <div className="flex items-center">
                    <User size={18} className="mr-2" />
                    Profile
                  </div>
                </Link>
                <Link 
                  to="/settings" 
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50"
                  onClick={() => setIsOpen(false)}
                >
                  <div className="flex items-center">
                    <Settings size={18} className="mr-2" />
                    Settings
                  </div>
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;