import React from 'react';
import { Event } from '../types';
import { format } from 'date-fns';

const mockEvents: Event[] = [
  {
    id: '1',
    name: 'Community Garden Day',
    dateTime: new Date('2023-09-15T10:00:00'),
    hostName: 'Sarah Johnson',
    location: 'Community Garden',
    description: 'Join us for a day of gardening and community building!',
    rsvpCount: 15,
    comments: [],
    likes: [],
    photos: [],
    bannerUrl: 'https://images.pexels.com/photos/1072824/pexels-photo-1072824.jpeg'
  },
  {
    id: '2',
    name: 'Weekend Art Workshop',
    dateTime: new Date('2023-09-20T14:00:00'),
    hostName: 'Emily Chen',
    location: 'Community Center',
    description: 'Express your creativity in our weekend art workshop. All materials provided!',
    rsvpCount: 12,
    comments: [],
    likes: [],
    photos: [],
    bannerUrl: 'https://images.pexels.com/photos/3183132/pexels-photo-3183132.jpeg'
  }
];

function Events() {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Community Events</h1>
          <p className="text-gray-400">Join and participate in upcoming community activities</p>
        </div>
        <button
          className="bg-blue-600 text-white px-6 py-3 rounded-full hover:bg-blue-700 transform hover:-translate-y-1 transition-all duration-300 shadow-lg hover:shadow-blue-500/25"
          onClick={() => console.log('Post new event clicked')}
        >
          Post New Event
        </button>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        {mockEvents.map(event => (
          <div 
            key={event.id} 
            className="group bg-gray-800 rounded-2xl shadow-xl overflow-hidden transform hover:-translate-y-2 transition-all duration-300 border border-gray-700 hover:border-blue-500/50 hover:shadow-2xl hover:shadow-blue-500/10"
          >
            {event.bannerUrl && (
              <div className="h-48 overflow-hidden">
                <img
                  src={event.bannerUrl}
                  alt={event.name}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                />
              </div>
            )}
            <div className="p-6">
              <h2 className="text-2xl font-semibold mb-2 text-white group-hover:text-blue-400 transition-colors">
                {event.name}
              </h2>
              <div className="space-y-3 text-gray-300">
                <p className="flex items-center">
                  <span className="w-24 text-gray-400">Date & Time:</span>
                  <span>{format(event.dateTime, 'PPP p')}</span>
                </p>
                <p className="flex items-center">
                  <span className="w-24 text-gray-400">Host:</span>
                  <span>{event.hostName}</span>
                </p>
                <p className="flex items-center">
                  <span className="w-24 text-gray-400">Location:</span>
                  <span>{event.location}</span>
                </p>
                <p className="pt-3 text-gray-300">{event.description}</p>
              </div>
              <div className="mt-6 pt-4 border-t border-gray-700 flex items-center space-x-6">
                <button
                  className="flex items-center space-x-2 text-blue-400 hover:text-blue-300 transition-colors"
                  onClick={() => console.log('RSVP clicked')}
                >
                  <span className="text-lg">👥</span>
                  <span>RSVP ({event.rsvpCount})</span>
                </button>
                <button
                  className="flex items-center space-x-2 text-red-400 hover:text-red-300 transition-colors"
                  onClick={() => console.log('Like clicked')}
                >
                  <span className="text-lg">❤️</span>
                  <span>({event.likes.length})</span>
                </button>
                <button
                  className="flex items-center space-x-2 text-gray-400 hover:text-gray-300 transition-colors"
                  onClick={() => console.log('Comment clicked')}
                >
                  <span className="text-lg">💬</span>
                  <span>({event.comments.length})</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Events;