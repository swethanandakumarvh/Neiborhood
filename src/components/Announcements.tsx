import React from 'react';
import { Announcement } from '../types';
import { format } from 'date-fns';

const mockAnnouncements: Announcement[] = [
  {
    id: '1',
    title: 'Monthly Society Meeting',
    content: 'The monthly society meeting will be held this Sunday at 10 AM in the community hall.',
    targetGroup: ['All'],
    createdAt: new Date('2023-08-20T10:00:00'),
    createdBy: 'Society Secretary'
  }
];

function Announcements() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Community Announcements</h1>
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
          onClick={() => console.log('Post announcement clicked')}
        >
          Post Announcement
        </button>
      </div>

      <div className="space-y-4">
        {mockAnnouncements.map(announcement => (
          <div key={announcement.id} className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-xl font-semibold">{announcement.title}</h2>
              <span className="text-sm text-gray-500">
                {format(announcement.createdAt, 'PPP')}
              </span>
            </div>
            <p className="text-gray-700 mb-4">{announcement.content}</p>
            {announcement.attachmentUrl && (
              <a
                href={announcement.attachmentUrl}
                className="text-blue-600 hover:text-blue-800 flex items-center"
                target="_blank"
                rel="noopener noreferrer"
              >
                📎 View Attachment
              </a>
            )}
            <div className="mt-4 pt-4 border-t border-gray-200 flex justify-between items-center text-sm text-gray-600">
              <span>Target: {announcement.targetGroup.join(', ')}</span>
              <span>Posted by: {announcement.createdBy}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Announcements;