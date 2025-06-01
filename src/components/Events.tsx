import { useState } from 'react';
import { Event } from '../types';
import { format } from 'date-fns';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const eventSchema = z.object({
  name: z.string().min(1, 'Event name is required'),
  dateTime: z.string().min(1, 'Date and time are required'),
  hostName: z.string().min(1, 'Host name is required'),
  location: z.string().min(1, 'Location is required'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  bannerUrl: z.string().url().optional()
});

type EventFormData = z.infer<typeof eventSchema>;

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
  },
  {
    id: '3',
    name: 'Neighborhood Movie Night',
    dateTime: new Date('2023-09-25T19:00:00'),
    hostName: 'Michael Brown',
    location: 'Community Park',
    description: 'Join us for an outdoor movie screening under the stars! Bring your blankets and snacks.',
    rsvpCount: 25,
    comments: [],
    likes: [],
    photos: [],
    bannerUrl: 'https://images.pexels.com/photos/2417726/pexels-photo-2417726.jpeg'
  }
];

function Events() {
  const [events, setEvents] = useState<Event[]>(mockEvents);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { register, handleSubmit, formState: { errors }, reset } = useForm<EventFormData>({
    resolver: zodResolver(eventSchema)
  });

  const onSubmit = (data: EventFormData) => {
    const newEvent: Event = {
      id: (events.length + 1).toString(),
      name: data.name,
      dateTime: new Date(data.dateTime),
      hostName: data.hostName,
      location: data.location,
      description: data.description,
      bannerUrl: data.bannerUrl,
      rsvpCount: 0,
      comments: [],
      likes: [],
      photos: []
    };
    setEvents([...events, newEvent]);
    setIsModalOpen(false);
    reset();
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Community Events</h1>
          <p className="text-gray-400">Join and participate in upcoming community activities</p>
        </div>
        <button
          className="bg-blue-600 text-white px-6 py-3 rounded-full hover:bg-blue-700 transform hover:-translate-y-1 transition-all duration-300 shadow-lg hover:shadow-blue-500/25"
          onClick={() => setIsModalOpen(true)}
        >
          Post New Event
        </button>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        {events.map(event => (
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

      {/* Add Event Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-gray-800 rounded-2xl p-8 max-w-2xl w-full border border-gray-700">
            <h2 className="text-2xl font-semibold mb-6 text-white">Post New Event</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-200 mb-1">Event Name</label>
                <input
                  {...register('name')}
                  className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter event name"
                />
                {errors.name && <p className="text-red-400 text-sm mt-1">{errors.name.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-200 mb-1">Date & Time</label>
                <input
                  type="datetime-local"
                  {...register('dateTime')}
                  className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                {errors.dateTime && <p className="text-red-400 text-sm mt-1">{errors.dateTime.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-200 mb-1">Host Name</label>
                <input
                  {...register('hostName')}
                  className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter host name"
                />
                {errors.hostName && <p className="text-red-400 text-sm mt-1">{errors.hostName.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-200 mb-1">Location</label>
                <input
                  {...register('location')}
                  className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter event location"
                />
                {errors.location && <p className="text-red-400 text-sm mt-1">{errors.location.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-200 mb-1">Description</label>
                <textarea
                  {...register('description')}
                  className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  rows={3}
                  placeholder="Describe your event"
                />
                {errors.description && <p className="text-red-400 text-sm mt-1">{errors.description.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-200 mb-1">Banner Image URL (optional)</label>
                <input
                  {...register('bannerUrl')}
                  className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="https://example.com/image.jpg"
                />
                {errors.bannerUrl && <p className="text-red-400 text-sm mt-1">{errors.bannerUrl.message}</p>}
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
                  Create Event
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Events;