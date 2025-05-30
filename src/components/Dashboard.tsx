import React from 'react';
import { Link } from 'react-router-dom';
import { User } from '../types';

const mockUser: User = {
  id: '1',
  name: 'John Doe',
  houseId: 'A-101',
  role: 'resident',
  moveInDate: new Date('2023-01-01'),
};

const features = [
  {
    title: 'Find Your Local Services',
    description: 'Discover and connect with trusted businesses in your community.',
    link: '/businesses',
    image: 'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg'
  },
  {
    title: 'Community Events',
    description: 'Stay connected with upcoming events and activities.',
    link: '/events',
    image: 'https://images.pexels.com/photos/7642009/pexels-photo-7642009.jpeg'
  },
  {
    title: 'Maintenance & Support',
    description: 'Quick access to maintenance services and community support.',
    link: '/complaints',
    image: 'https://images.pexels.com/photos/4101143/pexels-photo-4101143.jpeg'
  }
];

function Dashboard() {
  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-3xl overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="relative max-w-4xl mx-auto px-8 py-24">
          <h1 className="text-5xl font-bold mb-6">Welcome to MyNeighbourHub</h1>
          <p className="text-xl opacity-90 mb-8">
            Your comprehensive platform for community engagement, local services, and neighborhood connection.
            Experience a new way of community living.
          </p>
          <Link
            to="/businesses"
            className="inline-block bg-white text-blue-600 px-8 py-3 rounded-full font-semibold hover:bg-blue-50 transition-colors"
          >
            Explore Services
          </Link>
        </div>
      </div>

      {/* User Info Card */}
      <div className="bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-2xl font-semibold mb-6">Welcome Back, {mockUser.name}</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-4 bg-blue-50 rounded-xl">
            <p className="text-sm text-blue-600 mb-1">House ID</p>
            <p className="text-lg font-semibold">{mockUser.houseId}</p>
          </div>
          <div className="p-4 bg-green-50 rounded-xl">
            <p className="text-sm text-green-600 mb-1">Role</p>
            <p className="text-lg font-semibold capitalize">{mockUser.role}</p>
          </div>
          <div className="p-4 bg-purple-50 rounded-xl">
            <p className="text-sm text-purple-600 mb-1">Member Since</p>
            <p className="text-lg font-semibold">
              {mockUser.moveInDate.toLocaleDateString()}
            </p>
          </div>
          <div className="p-4 bg-orange-50 rounded-xl">
            <p className="text-sm text-orange-600 mb-1">Status</p>
            <p className="text-lg font-semibold">Active</p>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map((feature) => (
          <Link
            key={feature.title}
            to={feature.link}
            className="group bg-white rounded-2xl shadow-lg overflow-hidden transform hover:-translate-y-1 transition-all duration-300"
          >
            <div className="h-48 overflow-hidden">
              <img
                src={feature.image}
                alt={feature.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2 group-hover:text-blue-600 transition-colors">
                {feature.title}
              </h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          </Link>
        ))}
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-white rounded-2xl shadow-lg p-8 text-center transform hover:-translate-y-1 transition-all duration-300">
          <div className="text-4xl font-bold text-blue-600 mb-2">500+</div>
          <div className="text-gray-600 text-lg">Active Residents</div>
        </div>
        <div className="bg-white rounded-2xl shadow-lg p-8 text-center transform hover:-translate-y-1 transition-all duration-300">
          <div className="text-4xl font-bold text-green-600 mb-2">50+</div>
          <div className="text-gray-600 text-lg">Local Businesses</div>
        </div>
        <div className="bg-white rounded-2xl shadow-lg p-8 text-center transform hover:-translate-y-1 transition-all duration-300">
          <div className="text-4xl font-bold text-purple-600 mb-2">100+</div>
          <div className="text-gray-600 text-lg">Monthly Events</div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;