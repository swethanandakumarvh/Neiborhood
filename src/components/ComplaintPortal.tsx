import React, { useState } from 'react';
import { Complaint } from '../types';

const mockComplaints: Complaint[] = [
  {
    id: '1',
    type: 'Water',
    description: 'Low water pressure in Block A',
    status: 'Pending',
    comments: [],
    userId: '1'
  },
  {
    id: '2',
    type: 'Streetlight',
    description: 'Street light not working near house B-15',
    status: 'Assigned',
    comments: [],
    userId: '2'
  }
];

function ComplaintPortal() {
  const [complaints] = useState<Complaint[]>(mockComplaints);

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Complaint Portal</h1>
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
          onClick={() => console.log('New complaint clicked')}
        >
          Raise New Complaint
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {complaints.map((complaint) => (
              <tr key={complaint.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                    {complaint.type}
                  </span>
                </td>
                <td className="px-6 py-4">{complaint.description}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    complaint.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                    complaint.status === 'Assigned' ? 'bg-blue-100 text-blue-800' :
                    'bg-green-100 text-green-800'
                  }`}>
                    {complaint.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <button
                    className="text-blue-600 hover:text-blue-900"
                    onClick={() => console.log('View details clicked', complaint.id)}
                  >
                    View Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ComplaintPortal;