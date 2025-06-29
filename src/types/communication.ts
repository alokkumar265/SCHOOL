
export interface Message {
  id: string;
  senderId: string;
  senderName: string;
  senderRole: 'admin' | 'teacher' | 'student' | 'parent' | 'staff';
  senderAvatar?: string;
  receiverId: string;
  receiverName: string;
  receiverRole: 'admin' | 'teacher' | 'student' | 'parent' | 'staff';
  content: string;
  timestamp: string;
  read: boolean;
  subject?: string;
  attachment?: string;
  attachmentType?: 'image' | 'document' | 'other';
}

export interface Conversation {
  id: string;
  participants: {
    id: string;
    name: string;
    role: 'admin' | 'teacher' | 'student' | 'parent' | 'staff';
    avatar?: string;
  }[];
  lastMessage?: {
    content: string;
    timestamp: string;
    senderId: string;
  };
  unreadCount: number;
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  author: string;
  authorRole: 'admin' | 'teacher' | 'staff';
  timestamp: string;
  targetAudience: ('students' | 'parents' | 'teachers' | 'staff' | 'all')[];
  attachment?: string;
  attachmentType?: 'image' | 'document' | 'other';
  important: boolean;
}
