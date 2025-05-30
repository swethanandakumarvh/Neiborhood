import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BellIcon, Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-gray-800 border-b border-gray-700">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="font-bold text-2xl text-blue-400 hover:text-blue-300 transition-colors">
            MyNeighbourHub
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/businesses" className="text-gray-300 hover:text-white hover:bg-gray-700 px-3 py-2 rounded-md transition-colors">
              Businesses
            </Link>
            <Link to="/events" className="text-gray-300 hover:text-white hover:bg-gray-700 px-3 py-2 rounded-md transition-colors">
              Events
            </Link>
            <Link to="/complaints" className="text-gray-300 hover:text-white hover:bg-gray-700 px-3 py-2 rounded-md transition-colors">
              Complaints
            </Link>
            <Link to="/announcements" className="text-gray-300 hover:text-white hover:bg-gray-700 px-3 py-2 rounded-md transition-colors">
              Announcements
            </Link>
            <Link to="/ladies-corner" className="text-gray-300 hover:text-white hover:bg-gray-700 px-3 py-2 rounded-md transition-colors">
              Ladies' Corner
            </Link>
            <Link to="/help-threads" className="text-gray-300 hover:text-white hover:bg-gray-700 px-3 py-2 rounded-md transition-colors">
              Help Threads
            </Link>
            
            <div className="flex items-center space-x-4">
              <button className="relative p-2 text-gray-300 hover:text-white hover:bg-gray-700 rounded-full transition-colors">
                <BellIcon className="h-6 w-6" />
                <span className="absolute top-0 right-0 h-4 w-4 bg-blue-500 rounded-full text-xs text-white flex items-center justify-center">
                  3
                </span>
              </button>
              <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors">
                Sign In
              </button>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              className="text-gray-300 hover:text-white p-2"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <XMarkIcon className="h-6 w-6" />
              ) : (
                <Bars3Icon className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 space-y-2">
            <Link
              to="/businesses"
              className="block px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-white rounded-lg transition-colors"
            >
              Businesses
            </Link>
            <Link
              to="/events"
              className="block px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-white rounded-lg transition-colors"
            >
              Events
            </Link>
            <Link
              to="/complaints"
              className="block px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-white rounded-lg transition-colors"
            >
              Complaints
            </Link>
            <Link
              to="/announcements"
              className="block px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-white rounded-lg transition-colors"
            >
              Announcements
            </Link>
            <Link
              to="/ladies-corner"
              className="block px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-white rounded-lg transition-colors"
            >
              Ladies' Corner
            </Link>
            <Link
              to="/help-threads"
              className="block px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-white rounded-lg transition-colors"
            >
              Help Threads
            </Link>
            <div className="px-4 py-2 flex items-center justify-between">
              <button className="relative text-gray-300 hover:text-white">
                <BellIcon className="h-6 w-6" />
                <span className="absolute -top-1 -right-1 h-4 w-4 bg-blue-500 rounded-full text-xs text-white flex items-center justify-center">
                  3
                </span>
              </button>
              <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors">
                Sign In
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navigation;