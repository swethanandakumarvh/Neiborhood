import { useState } from 'react';
import { ForumPost } from '../types';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const threadSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  topic: z.string().min(1, 'Topic is required'),
  description: z.string().min(10, 'Description must be at least 10 characters')
});

type ThreadFormData = z.infer<typeof threadSchema>;

const mockHelpThreads: ForumPost[] = [
  {
    id: '1',
    title: 'Need help with plumbing',
    topic: 'Maintenance',
    description: 'Looking for a reliable plumber in the area. Any recommendations?',
    userId: '1',
    comments: [],
    likes: [],
    reactions: []
  },
  {
    id: '2',
    title: 'WiFi connectivity issues',
    topic: 'Technology',
    description: 'Having trouble with internet connection in Block C. Anyone else experiencing this?',
    userId: '2',
    comments: [],
    likes: [],
    reactions: []
  }
];

function HelpThreads() {
  const [threads, setThreads] = useState<ForumPost[]>(mockHelpThreads);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { register, handleSubmit, formState: { errors }, reset } = useForm<ThreadFormData>({
    resolver: zodResolver(threadSchema)
  });

  const onSubmit = (data: ThreadFormData) => {
    const newThread: ForumPost = {
      id: (threads.length + 1).toString(),
      title: data.title,
      topic: data.topic,
      description: data.description,
      userId: '1', // Mock user ID
      comments: [],
      likes: [],
      reactions: []
    };
    setThreads([...threads, newThread]);
    setIsModalOpen(false);
    reset();
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Help Threads</h1>
          <p className="text-gray-400">Ask questions and get help from your community</p>
        </div>
        <button
          className="bg-blue-600 text-white px-6 py-3 rounded-full hover:bg-blue-700 transform hover:-translate-y-1 transition-all duration-300 shadow-lg hover:shadow-blue-500/25"
          onClick={() => setIsModalOpen(true)}
        >
          Create Thread
        </button>
      </div>

      <div className="grid gap-6">
        {threads.map(thread => (
          <div 
            key={thread.id} 
            className="bg-gray-800 rounded-2xl shadow-xl p-6 transform hover:-translate-y-1 transition-all duration-300 border border-gray-700 hover:border-blue-500/50"
          >
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-xl font-semibold text-white">{thread.title}</h2>
              <span className="px-3 py-1 bg-blue-900 text-blue-200 text-sm rounded-full">
                {thread.topic}
              </span>
            </div>
            <p className="text-gray-300 mb-6">{thread.description}</p>
            <div className="flex items-center space-x-6">
              <button className="flex items-center space-x-2 text-blue-400 hover:text-blue-300 transition-colors">
                <span>👍</span>
                <span>({thread.likes.length})</span>
              </button>
              <button className="flex items-center space-x-2 text-green-400 hover:text-green-300 transition-colors">
                <span>💬</span>
                <span>({thread.comments.length})</span>
              </button>
              <button className="flex items-center space-x-2 text-purple-400 hover:text-purple-300 transition-colors">
                <span>⭐</span>
                <span>({thread.reactions.length})</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Create Thread Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-gray-800 rounded-2xl p-8 max-w-2xl w-full border border-gray-700">
            <h2 className="text-2xl font-semibold mb-6 text-white">Create New Thread</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-200 mb-1">Title</label>
                <input
                  {...register('title')}
                  className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter thread title"
                />
                {errors.title && <p className="text-red-400 text-sm mt-1">{errors.title.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-200 mb-1">Topic</label>
                <input
                  {...register('topic')}
                  className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g., Maintenance, Technology, Security"
                />
                {errors.topic && <p className="text-red-400 text-sm mt-1">{errors.topic.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-200 mb-1">Description</label>
                <textarea
                  {...register('description')}
                  className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  rows={3}
                  placeholder="Describe your question or issue"
                />
                {errors.description && <p className="text-red-400 text-sm mt-1">{errors.description.message}</p>}
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
                  Create Thread
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default HelpThreads;