import { useState } from 'react';
import { Complaint } from '../types';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const complaintSchema = z.object({
  type: z.enum(['Water', 'Garbage', 'Streetlight', 'Others'], {
    required_error: 'Please select a complaint type'
  }),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  photoUrl: z.string().url().optional()
});

type ComplaintFormData = z.infer<typeof complaintSchema>;

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
  const [complaints, setComplaints] = useState<Complaint[]>(mockComplaints);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { register, handleSubmit, formState: { errors }, reset } = useForm<ComplaintFormData>({
    resolver: zodResolver(complaintSchema)
  });

  const onSubmit = (data: ComplaintFormData) => {
    const newComplaint: Complaint = {
      id: (complaints.length + 1).toString(),
      type: data.type,
      description: data.description,
      photoUrl: data.photoUrl,
      status: 'Pending',
      comments: [],
      userId: '1' // Mock user ID
    };
    setComplaints([...complaints, newComplaint]);
    setIsModalOpen(false);
    reset();
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Complaint Portal</h1>
          <p className="text-gray-400">Submit and track your maintenance requests</p>
        </div>
        <button
          className="bg-blue-600 text-white px-6 py-3 rounded-full hover:bg-blue-700 transform hover:-translate-y-1 transition-all duration-300 shadow-lg hover:shadow-blue-500/25"
          onClick={() => setIsModalOpen(true)}
        >
          Raise New Complaint
        </button>
      </div>

      <div className="bg-gray-800 rounded-2xl shadow-xl overflow-hidden border border-gray-700">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-700">
            <thead className="bg-gray-900">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Type</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Description</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {complaints.map((complaint) => (
                <tr key={complaint.id} className="hover:bg-gray-700 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-3 py-1 inline-flex text-sm leading-5 font-semibold rounded-full ${
                      complaint.type === 'Water' ? 'bg-blue-900 text-blue-200' :
                      complaint.type === 'Garbage' ? 'bg-green-900 text-green-200' :
                      complaint.type === 'Streetlight' ? 'bg-yellow-900 text-yellow-200' :
                      'bg-purple-900 text-purple-200'
                    }`}>
                      {complaint.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-300">{complaint.description}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 inline-flex text-sm leading-5 font-semibold rounded-full ${
                      complaint.status === 'Pending' ? 'bg-yellow-900 text-yellow-200' :
                      complaint.status === 'Assigned' ? 'bg-blue-900 text-blue-200' :
                      'bg-green-900 text-green-200'
                    }`}>
                      {complaint.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <button
                      className="text-blue-400 hover:text-blue-300 font-medium transition-colors"
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

      {/* Add Complaint Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-gray-800 rounded-2xl p-8 max-w-2xl w-full border border-gray-700">
            <h2 className="text-2xl font-semibold mb-6 text-white">Raise New Complaint</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-200 mb-1">Complaint Type</label>
                <select
                  {...register('type')}
                  className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select a type</option>
                  <option value="Water">Water</option>
                  <option value="Garbage">Garbage</option>
                  <option value="Streetlight">Streetlight</option>
                  <option value="Others">Others</option>
                </select>
                {errors.type && <p className="text-red-400 text-sm mt-1">{errors.type.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-200 mb-1">Description</label>
                <textarea
                  {...register('description')}
                  className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  rows={3}
                  placeholder="Describe your complaint"
                />
                {errors.description && <p className="text-red-400 text-sm mt-1">{errors.description.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-200 mb-1">Photo URL (optional)</label>
                <input
                  {...register('photoUrl')}
                  className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="https://example.com/photo.jpg"
                />
                {errors.photoUrl && <p className="text-red-400 text-sm mt-1">{errors.photoUrl.message}</p>}
              </div>

              <div className="flex justify-end space-x-4 pt-4">
                <button
                  type="button"
                  className="px-6 py-2 text-gray-300 hover:text-white font-medium"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Submit Complaint
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default ComplaintPortal;