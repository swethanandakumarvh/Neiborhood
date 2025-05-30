import React from 'react';
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
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Local Business Listings</h1>
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
          onClick={() => console.log('Add business clicked')}
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
    </div>
  );
}

export default BusinessListings;