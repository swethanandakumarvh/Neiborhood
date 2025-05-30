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
    title: 'Business Directory',
    description: 'Discover and connect with local businesses in your community.',
    link: '/businesses',
    image: 'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  },
  {
    title: 'Community Events',
    description: 'Stay updated with upcoming events and activities.',
    link: '/events',
    image: 'https://images.pexels.com/photos/7642009/pexels-photo-7642009.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  },
  {
    title: 'Complaint Portal',
    description: 'Submit and track maintenance requests and complaints.',
    link: '/complaints',
    image: 'https://images.pexels.com/photos/4101143/pexels-photo-4101143.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  }
];

function Dashboard() {
  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16 px-8 rounded-2xl">
        <div className="max-w-3xl">
          <h1 className="text-4xl font-bold mb-4">Welcome to MyNeighbourHub</h1>
          <p className="text-xl opacity-90">
            Your one-stop platform for community engagement, local services, and neighborhood connection.
          </p>
        </div>
      </div>

      {/* User Info Card */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-lg font-semibold mb-4">Resident Information</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-gray-600">House ID</p>
            <p className="font-medium">{mockUser.houseId}</p>
          </div>
          <div>
            <p className="text-gray-600">Resident Name</p>
            <p className="font-medium">{mockUser.name}</p>
          </div>
          <div>
            <p className="text-gray-600">Role</p>
            <p className="font-medium capitalize">{mockUser.role}</p>
          </div>
          <div>
            <p className="text-gray-600">Move-in Date</p>
            <p className="font-medium">
              {mockUser.moveInDate.toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feature) => (
          <Link
            key={feature.title}
            to={feature.link}
            className="group bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
          >
            <div className="h-48 overflow-hidden">
              <img
                src={feature.image}
                alt={feature.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          </Link>
        ))}
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6 text-center">
          <div className="text-3xl font-bold text-blue-600 mb-2">500+</div>
          <div className="text-gray-600">Active Residents</div>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6 text-center">
          <div className="text-3xl font-bold text-blue-600 mb-2">50+</div>
          <div className="text-gray-600">Local Businesses</div>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6 text-center">
          <div className="text-3xl font-bold text-blue-600 mb-2">100+</div>
          <div className="text-gray-600">Monthly Events</div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;