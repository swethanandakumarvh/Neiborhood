import React, { useState } from 'react';
import { Business } from '../types';

const mockBusinesses: Business[] = [
  {
    id: '1',
    name: 'Local Grocery Store',
    ownerName: 'Jane Smith',
    category: 'Food & Groceries',
    contactInfo: '+1 234-567-8900',
    description: 'Your neighborhood grocery store for fresh produce and daily needs.',
    logoUrl: 'https://images.pexels.com/photos/264547/pexels-photo-264547.jpeg'
  }
];

function BusinessListings() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newBusiness, setNewBusiness] = useState<Partial<Business>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('New business:', newBusiness);
    setIsModalOpen(false);
    setNewBusiness({});
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Local Business Listings</h1>
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
          onClick={() => setIsModalOpen(true)}
        >
          Post Your Business
        </button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {mockBusinesses.map((business) => (
          <div key={business.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            {business.logoUrl && (
              <img
                src={business.logoUrl}
                alt={business.name}
                className="w-full h-48 object-cover"
              />
            )}
            <div className="p-4">
              <h3 className="text-xl font-semibold">{business.name}</h3>
              <p className="text-gray-600">Owner: {business.ownerName}</p>
              <p className="text-sm text-gray-500 mt-2">{business.category}</p>
              <p className="mt-2">{business.description}</p>
              <p className="text-blue-600 mt-2">{business.contactInfo}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Add Business Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h2 className="text-xl font-semibold mb-4">Add Your Business</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Business Name</label>
                <input
                  type="text"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  onChange={(e) => setNewBusiness({ ...newBusiness, name: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Owner Name</label>
                <input
                  type="text"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  onChange={(e) => setNewBusiness({ ...newBusiness, ownerName: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Category</label>
                <input
                  type="text"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  onChange={(e) => setNewBusiness({ ...newBusiness, category: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Contact Info</label>
                <input
                  type="text"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  onChange={(e) => setNewBusiness({ ...newBusiness, contactInfo: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Description</label>
                <textarea
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  rows={3}
                  onChange={(e) => setNewBusiness({ ...newBusiness, description: e.target.value })}
                />
              </div>
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  className="px-4 py-2 text-gray-700 hover:text-gray-900"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default BusinessListings;