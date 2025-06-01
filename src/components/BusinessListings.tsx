import { useState } from 'react';
import { Business } from '../types';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const businessSchema = z.object({
  name: z.string().min(1, 'Business name is required'),
  ownerName: z.string().min(1, 'Owner name is required'),
  category: z.string().min(1, 'Category is required'),
  contactInfo: z.string().min(1, 'Contact information is required'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  logoUrl: z.string().url().optional()
});

type BusinessFormData = z.infer<typeof businessSchema>;

const mockBusinesses: Business[] = [
  {
    id: '1',
    name: 'Local Grocery Store',
    ownerName: 'Jane Smith',
    category: 'Food & Groceries',
    contactInfo: '+1 234-567-8900',
    description: 'Your neighborhood grocery store for fresh produce and daily needs.',
    logoUrl: 'https://images.pexels.com/photos/264547/pexels-photo-264547.jpeg'
  },
  {
    id: '2',
    name: 'Sweet Delights Bakery',
    ownerName: 'Maria Rodriguez',
    category: 'Bakery',
    contactInfo: '+1 234-567-8901',
    description: 'Artisanal bakery offering fresh bread, pastries, and custom cakes made from scratch daily.',
    logoUrl: 'https://images.pexels.com/photos/1070946/pexels-photo-1070946.jpeg'
  },
  {
    id: '3',
    name: 'Crafty Hands Workshop',
    ownerName: 'Emily Chen',
    category: 'Handcrafts',
    contactInfo: '+1 234-567-8902',
    description: 'Handmade jewelry, pottery, and textile arts. Custom orders welcome. Weekly workshops available.',
    logoUrl: 'https://images.pexels.com/photos/3094217/pexels-photo-3094217.jpeg'
  }
];

function BusinessListings() {
  const [businesses, setBusinesses] = useState<Business[]>(mockBusinesses);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { register, handleSubmit, formState: { errors }, reset } = useForm<BusinessFormData>({
    resolver: zodResolver(businessSchema)
  });

  const onSubmit = (data: BusinessFormData) => {
    const newBusiness: Business = {
      id: (businesses.length + 1).toString(),
      ...data
    };
    setBusinesses([...businesses, newBusiness]);
    setIsModalOpen(false);
    reset();
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Local Business Directory</h1>
          <p className="text-gray-400">Discover and support businesses in your community</p>
        </div>
        <button
          className="bg-blue-600 text-white px-6 py-3 rounded-full hover:bg-blue-700 transition-colors"
          onClick={() => setIsModalOpen(true)}
        >
          Add Your Business
        </button>
      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {businesses.map((business) => (
          <div key={business.id} className="bg-gray-800 rounded-2xl shadow-xl overflow-hidden transform hover:-translate-y-1 transition-all duration-300 border border-gray-700">
            {business.logoUrl && (
              <div className="h-48 overflow-hidden">
                <img
                  src={business.logoUrl}
                  alt={business.name}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2 text-white">{business.name}</h3>
              <p className="text-sm text-blue-400 mb-3">{business.category}</p>
              <p className="text-gray-300 mb-4">{business.description}</p>
              <div className="pt-4 border-t border-gray-700">
                <p className="text-gray-300"><span className="font-medium text-gray-200">Owner:</span> {business.ownerName}</p>
                <p className="text-gray-300"><span className="font-medium text-gray-200">Contact:</span> {business.contactInfo}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Business Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-gray-800 rounded-2xl p-8 max-w-2xl w-full border border-gray-700">
            <h2 className="text-2xl font-semibold mb-6 text-white">Add Your Business</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-200 mb-1">Business Name</label>
                <input
                  {...register('name')}
                  className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter business name"
                />
                {errors.name && <p className="text-red-400 text-sm mt-1">{errors.name.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-200 mb-1">Owner Name</label>
                <input
                  {...register('ownerName')}
                  className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter owner name"
                />
                {errors.ownerName && <p className="text-red-400 text-sm mt-1">{errors.ownerName.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-200 mb-1">Category</label>
                <input
                  {...register('category')}
                  className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g., Food & Groceries, Bakery, Handcrafts"
                />
                {errors.category && <p className="text-red-400 text-sm mt-1">{errors.category.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-200 mb-1">Contact Information</label>
                <input
                  {...register('contactInfo')}
                  className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Phone number or email"
                />
                {errors.contactInfo && <p className="text-red-400 text-sm mt-1">{errors.contactInfo.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-200 mb-1">Description</label>
                <textarea
                  {...register('description')}
                  className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  rows={3}
                  placeholder="Describe your business"
                />
                {errors.description && <p className="text-red-400 text-sm mt-1">{errors.description.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-200 mb-1">Logo URL (optional)</label>
                <input
                  {...register('logoUrl')}
                  className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="https://example.com/logo.jpg"
                />
                {errors.logoUrl && <p className="text-red-400 text-sm mt-1">{errors.logoUrl.message}</p>}
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
                  Add Business
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