import React from 'react';
import { Link } from 'react-router-dom';
import { BellIcon } from '@heroicons/react/24/outline';

function Navigation() {
  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="font-bold text-xl text-blue-600">
            MyNeighbourHub
          </Link>
          
          <div className="flex items-center space-x-4">
            <Link to="/businesses" className="hover:text-blue-600">Businesses</Link>
            <Link to="/events" className="hover:text-blue-600">Events</Link>
            <Link to="/complaints" className="hover:text-blue-600">Complaints</Link>
            <Link to="/announcements" className="hover:text-blue-600">Announcements</Link>
            <Link to="/ladies-corner" className="hover:text-blue-600">Ladies' Corner</Link>
            <Link to="/help-threads" className="hover:text-blue-600">Help Threads</Link>
            
            <button className="relative p-2 hover:bg-gray-100 rounded-full">
              <BellIcon className="h-6 w-6" />
              <span className="absolute top-0 right-0 h-4 w-4 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
                3
              </span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navigation;