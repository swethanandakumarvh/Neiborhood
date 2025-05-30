import React, { useState } from 'react';
import { ForumPost } from '../types';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const forumPostSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  topic: z.string().min(1, 'Topic is required'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  mediaUrl: z.string().url().optional()
});

type ForumPostFormData = z.infer<typeof forumPostSchema>;

const mockPosts: ForumPost[] = [
  {
    id: '1',
    title: 'Weekly Recipe Share: Homemade Pizza',
    topic: 'Recipes',
    description: 'Sharing my family\'s favorite pizza recipe. Perfect for weekend gatherings!',
    userId: '1',
    comments: [],
    likes: [],
    reactions: [],
    mediaUrl: 'https://images.pexels.com/photos/2147491/pexels-photo-2147491.jpeg'
  },
  {
    id: '2',
    title: 'Book Club: September Read',
    topic: 'Book Club',
    description: 'This month we\'re reading "The Midnight Library". Join our discussion next week!',
    userId: '2',
    comments: [],
    likes: [],
    reactions: [],
    mediaUrl: 'https://images.pexels.com/photos/2908984/pexels-photo-2908984.jpeg'
  }
];

function LadiesCorner() {
  const [posts, setPosts] = useState<ForumPost[]>(mockPosts);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { register, handleSubmit, formState: { errors }, reset } = useForm<ForumPostFormData>({
    resolver: zodResolver(forumPostSchema)
  });

  const onSubmit = (data: ForumPostFormData) => {
    const newPost: ForumPost = {
      id: (posts.length + 1).toString(),
      title: data.title,
      topic: data.topic,
      description: data.description,
      mediaUrl: data.mediaUrl,
      userId: '1', // Mock user ID
      comments: [],
      likes: [],
      reactions: []
    };
    setPosts([...posts, newPost]);
    setIsModalOpen(false);
    reset();
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Ladies' Corner</h1>
          <p className="text-gray-400">A space for women to connect, share, and support each other</p>
        </div>
        <button
          className="bg-blue-600 text-white px-6 py-3 rounded-full hover:bg-blue-700 transform hover:-translate-y-1 transition-all duration-300 shadow-lg hover:shadow-blue-500/25"
          onClick={() => setIsModalOpen(true)}
        >
          Create Post
        </button>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        {posts.map(post => (
          <div key={post.id} className="bg-gray-800 rounded-2xl shadow-xl overflow-hidden transform hover:-translate-y-2 transition-all duration-300 border border-gray-700 hover:border-blue-500/50">
            {post.mediaUrl && (
              <div className="h-48 overflow-hidden">
                <img
                  src={post.mediaUrl}
                  alt={post.title}
                  className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-500"
                />
              </div>
            )}
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-xl font-semibold text-white group-hover:text-blue-400 transition-colors">
                  {post.title}
                </h2>
                <span className="px-3 py-1 bg-blue-900 text-blue-200 text-sm rounded-full">
                  {post.topic}
                </span>
              </div>
              <p className="text-gray-300 mb-6">{post.description}</p>
              <div className="flex items-center space-x-6 text-sm">
                <button className="flex items-center space-x-2 text-pink-400 hover:text-pink-300 transition-colors">
                  <span>❤️</span>
                  <span>({post.likes.length})</span>
                </button>
                <button className="flex items-center space-x-2 text-blue-400 hover:text-blue-300 transition-colors">
                  <span>💬</span>
                  <span>({post.comments.length})</span>
                </button>
                <button className="flex items-center space-x-2 text-purple-400 hover:text-purple-300 transition-colors">
                  <span>😊</span>
                  <span>({post.reactions.length})</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Create Post Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-gray-800 rounded-2xl p-8 max-w-2xl w-full border border-gray-700">
            <h2 className="text-2xl font-semibold mb-6 text-white">Create New Post</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-200 mb-1">Title</label>
                <input
                  {...register('title')}
                  className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter post title"
                />
                {errors.title && <p className="text-red-400 text-sm mt-1">{errors.title.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-200 mb-1">Topic</label>
                <input
                  {...register('topic')}
                  className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g., Recipes, Book Club, Fitness"
                />
                {errors.topic && <p className="text-red-400 text-sm mt-1">{errors.topic.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-200 mb-1">Description</label>
                <textarea
                  {...register('description')}
                  className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  rows={3}
                  placeholder="Share your thoughts..."
                />
                {errors.description && <p className="text-red-400 text-sm mt-1">{errors.description.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-200 mb-1">Image URL (optional)</label>
                <input
                  {...register('mediaUrl')}
                  className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="https://example.com/image.jpg"
                />
                {errors.mediaUrl && <p className="text-red-400 text-sm mt-1">{errors.mediaUrl.message}</p>}
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
                  Create Post
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default LadiesCorner;