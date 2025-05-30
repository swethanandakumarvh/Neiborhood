import React, { useState } from 'react';
import { Announcement } from '../types';
import { format } from 'date-fns';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const announcementSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  content: z.string().min(10, 'Content must be at least 10 characters'),
  targetGroup: z.string().min(1, 'Target group is required'),
  attachmentUrl: z.string().url().optional()
});

type AnnouncementFormData = z.infer<typeof announcementSchema>;

const mockAnnouncements: Announcement[] = [
  {
    id: '1',
    title: 'Monthly Society Meeting',
    content: 'The monthly society meeting will be held this Sunday at 10 AM in the community hall.',
    targetGroup: ['All'],
    createdAt: new Date('2023-08-20T10:00:00'),
    createdBy: 'Society Secretary',
    attachmentUrl: 'https://images.pexels.com/photos/7642009/pexels-photo-7642009.jpeg'
  },
  {
    id: '2',
    title: 'Building Maintenance Notice',
    content: 'Annual building maintenance work will commence from next week. Please ensure cooperation.',
    targetGroup: ['All'],
    createdAt: new Date('2023-08-19T14:00:00'),
    createdBy: 'Maintenance Committee',
    attachmentUrl: 'https://images.pexels.com/photos/8961065/pexels-photo-8961065.jpeg'
  }
];

function Announcements() {
  const [announcements, setAnnouncements] = useState<Announcement[]>(mockAnnouncements);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { register, handleSubmit, formState: { errors }, reset } = useForm<AnnouncementFormData>({
    resolver: zodResolver(announcementSchema)
  });

  const onSubmit = (data: AnnouncementFormData) => {
    const newAnnouncement: Announcement = {
      id: (announcements.length + 1).toString(),
      title: data.title,
      content: data.content,
      targetGroup: [data.targetGroup],
      attachmentUrl: data.attachmentUrl,
      createdAt: new Date(),
      createdBy: 'Swetha G'
    };
    setAnnouncements([newAnnouncement, ...announcements]);
    setIsModalOpen(false);
    reset();
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Community Announcements</h1>
          <p className="text-gray-400">Stay updated with important community notices</p>
        </div>
        <button
          className="bg-blue-600 text-white px-6 py-3 rounded-full hover:bg-blue-700 transform hover:-translate-y-1 transition-all duration-300 shadow-lg hover:shadow-blue-500/25"
          onClick={() => setIsModalOpen(true)}
        >
          Post Announcement
        </button>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        {announcements.map(announcement => (
          <div
            key={announcement.id}
            className="bg-gray-800 rounded-2xl shadow-xl overflow-hidden transform hover:-translate-y-2 transition-all duration-300 border border-gray-700 hover:border-blue-500/50"
          >
            {announcement.attachmentUrl && (
              <div className="h-48 overflow-hidden">
                <img
                  src={announcement.attachmentUrl}
                  alt={announcement.title}
                  className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-500"
                />
              </div>
            )}
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-xl font-semibold text-white group-hover:text-blue-400 transition-colors">
                  {announcement.title}
                </h2>
                <span className="text-sm text-gray-400">
                  {format(announcement.createdAt, 'PPP')}
                </span>
              </div>
              <p className="text-gray-300 mb-6">{announcement.content}</p>
              <div className="flex items-center justify-between pt-4 border-t border-gray-700">
                <div className="flex items-center space-x-2">
                  <span className="text-gray-400">Target:</span>
                  <span className="px-3 py-1 bg-blue-900 text-blue-200 text-sm rounded-full">
                    {announcement.targetGroup.join(', ')}
                  </span>
                </div>
                <span className="text-gray-400">Posted by: {announcement.createdBy}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Create Announcement Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-gray-800 rounded-2xl p-8 max-w-2xl w-full border border-gray-700">
            <h2 className="text-2xl font-semibold mb-6 text-white">Post New Announcement</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-200 mb-1">Title</label>
                <input
                  {...register('title')}
                  className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter announcement title"
                />
                {errors.title && <p className="text-red-400 text-sm mt-1">{errors.title.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-200 mb-1">Content</label>
                <textarea
                  {...register('content')}
                  className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  rows={3}
                  placeholder="Enter announcement content"
                />
                {errors.content && <p className="text-red-400 text-sm mt-1">{errors.content.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-200 mb-1">Target Group</label>
                <input
                  {...register('targetGroup')}
                  className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g., All, Block A, Senior Citizens"
                />
                {errors.targetGroup && <p className="text-red-400 text-sm mt-1">{errors.targetGroup.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-200 mb-1">Attachment URL (optional)</label>
                <input
                  {...register('attachmentUrl')}
                  className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="https://example.com/image.jpg"
                />
                {errors.attachmentUrl && <p className="text-red-400 text-sm mt-1">{errors.attachmentUrl.message}</p>}
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
                  Post Announcement
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Announcements;