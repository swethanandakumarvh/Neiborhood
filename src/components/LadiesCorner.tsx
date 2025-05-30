import React from 'react';
import { ForumPost } from '../types';

const mockPosts: ForumPost[] = [
  {
    id: '1',
    title: 'Weekly Recipe Share: Homemade Pizza',
    topic: 'Recipes',
    description: 'Sharing my family\'s favorite pizza recipe. Perfect for weekend gatherings!',
    userId: '1',
    comments: [],
    likes: [],
    reactions: []
  }
];

function LadiesCorner() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Ladies' Corner</h1>
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
          onClick={() => console.log('Post to forum clicked')}
        >
          Post to Forum
        </button>
      </div>

      <div className="grid gap-6">
        {mockPosts.map(post => (
          <div key={post.id} className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
            <span className="inline-block bg-blue-100 text-blue-800 text-sm px-2 py-1 rounded-full mb-4">
              {post.topic}
            </span>
            <p className="text-gray-600 mb-4">{post.description}</p>
            {post.mediaUrl && (
              <img
                src={post.mediaUrl}
                alt="Post media"
                className="w-full h-48 object-cover rounded-md mb-4"
              />
            )}
            <div className="flex items-center space-x-4 text-sm">
              <button
                className="text-gray-600 hover:text-gray-800"
                onClick={() => console.log('Like clicked')}
              >
                ❤️ ({post.likes.length})
              </button>
              <button
                className="text-gray-600 hover:text-gray-800"
                onClick={() => console.log('Comment clicked')}
              >
                💬 ({post.comments.length})
              </button>
              <button
                className="text-gray-600 hover:text-gray-800"
                onClick={() => console.log('React clicked')}
              >
                😊 ({post.reactions.length})
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default LadiesCorner;