import React from 'react';
import { ForumPost } from '../types';

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
  }
];

function HelpThreads() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Help Threads</h1>
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
          onClick={() => console.log('Create thread clicked')}
        >
          Create Thread
        </button>
      </div>

      <div className="space-y-4">
        {mockHelpThreads.map(thread => (
          <div key={thread.id} className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-2">{thread.title}</h2>
            <span className="inline-block bg-gray-100 text-gray-700 px-2 py-1 rounded text-sm mb-3">
              {thread.topic}
            </span>
            <p className="text-gray-600 mb-4">{thread.description}</p>
            <div className="flex items-center space-x-4 text-sm text-gray-500">
              <button
                className="flex items-center space-x-1 hover:text-blue-600"
                onClick={() => console.log('Like clicked')}
              >
                <span>👍</span>
                <span>{thread.likes.length}</span>
              </button>
              <button
                className="flex items-center space-x-1 hover:text-blue-600"
                onClick={() => console.log('Comment clicked')}
              >
                <span>💬</span>
                <span>{thread.comments.length}</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HelpThreads;