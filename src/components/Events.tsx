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
    photos: []
  }
];

function Events() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Community Events</h1>
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
          onClick={() => console.log('Post new event clicked')}
        >
          Post New Event
        </button>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {mockEvents.map(event => (
          <div key={event.id} className="bg-white rounded-lg shadow-md p-6">
            {event.bannerUrl && (
              <img
                src={event.bannerUrl}
                alt={event.name}
                className="w-full h-48 object-cover rounded-md mb-4"
              />
            )}
            <h2 className="text-xl font-semibold mb-2">{event.name}</h2>
            <div className="space-y-2 text-gray-600">
              <p>
                <span className="font-medium">Date & Time:</span>{' '}
                {format(event.dateTime, 'PPP p')}
              </p>
              <p>
                <span className="font-medium">Host:</span> {event.hostName}
              </p>
              <p>
                <span className="font-medium">Location:</span> {event.location}
              </p>
              <p>{event.description}</p>
            </div>
            <div className="mt-4 flex items-center space-x-4">
              <button
                className="text-blue-600 hover:text-blue-800"
                onClick={() => console.log('RSVP clicked')}
              >
                RSVP ({event.rsvpCount})
              </button>
              <button
                className="text-red-600 hover:text-red-800"
                onClick={() => console.log('Like clicked')}
              >
                ❤️ ({event.likes.length})
              </button>
              <button
                className="text-gray-600 hover:text-gray-800"
                onClick={() => console.log('Comment clicked')}
              >
                💬 ({event.comments.length})
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Events;