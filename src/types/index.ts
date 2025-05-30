export interface User {
  id: string;
  name: string;
  houseId: string;
  role: 'resident' | 'admin' | 'moderator';
  moveInDate: Date;
}

export interface Business {
  id: string;
  name: string;
  ownerName: string;
  category: string;
  contactInfo: string;
  description: string;
  logoUrl?: string;
}

export interface Event {
  id: string;
  name: string;
  dateTime: Date;
  hostName: string;
  location: string;
  description: string;
  bannerUrl?: string;
  rsvpCount: number;
  comments: Comment[];
  likes: string[]; // user IDs
  photos: string[];
}

export interface Complaint {
  id: string;
  type: 'Water' | 'Garbage' | 'Streetlight' | 'Others';
  description: string;
  photoUrl?: string;
  status: 'Pending' | 'Assigned' | 'Resolved';
  comments: Comment[];
  userId: string;
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  targetGroup: string[];
  attachmentUrl?: string;
  createdAt: Date;
  createdBy: string;
}

export interface ForumPost {
  id: string;
  title: string;
  topic: string;
  description: string;
  mediaUrl?: string;
  userId: string;
  comments: Comment[];
  likes: string[];
  reactions: Reaction[];
}

export interface Comment {
  id: string;
  content: string;
  userId: string;
  createdAt: Date;
}

export interface Reaction {
  userId: string;
  emoji: string;
}