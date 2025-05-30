import React from 'react';
import { User } from '../types';

const mockUser: User = {
  id: '1',
  name: 'John Doe',
  houseId: 'A-101',
  role: 'resident',
  moveInDate: new Date('2023-01-01'),
};

function Dashboard() {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h1 className="text-2xl font-bold mb-6">Welcome to MyNeighbourHub</h1>
      
      <div className="bg-gray-50 p-4 rounded-lg">
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
        
        <button
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
          onClick={() => console.log('Edit profile clicked')}
        >
          Edit Profile
        </button>
      </div>
    </div>
  );
}

export default Dashboard;