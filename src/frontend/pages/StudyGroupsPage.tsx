import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  Users, 
  MessageSquare, 
  Calendar,
  Clock,
  BookOpen,
  Plus,
  Search,
  Video,
  FileText,
  Share2,
  Settings
} from 'lucide-react';
import DashboardLayout from '@/frontend/components/layout/DashboardLayout';

interface StudyGroup {
  id: string;
  name: string;
  subject: string;
  description: string;
  members: number;
  maxMembers: number;
  isPublic: boolean;
  isJoined: boolean;
  nextMeeting?: string;
  topics: string[];
  createdBy: string;
}

interface GroupMessage {
  id: string;
  sender: string;
  message: string;
  timestamp: string;
  type: 'text' | 'file' | 'link';
}

const StudyGroupsPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGroup, setSelectedGroup] = useState<string | null>(null);
  const [newMessage, setNewMessage] = useState('');

  // Mock data
  const studyGroups: StudyGroup[] = [
    {
      id: '1',
      name: 'Mathematics Study Group',
      subject: 'Mathematics',
      description: 'Advanced mathematics study group for calculus and algebra',
      members: 8,
      maxMembers: 12,
      isPublic: true,
      isJoined: true,
      nextMeeting: '2024-03-10T15:00:00',
      topics: ['Calculus', 'Algebra', 'Trigonometry'],
      createdBy: 'John Smith'
    },
    {
      id: '2',
      name: 'Physics Lab Partners',
      subject: 'Physics',
      description: 'Collaborative physics lab work and problem solving',
      members: 6,
      maxMembers: 8,
      isPublic: true,
      isJoined: false,
      topics: ['Mechanics', 'Thermodynamics', 'Electromagnetism'],
      createdBy: 'Sarah Johnson'
    },
    {
      id: '3',
      name: 'English Literature Circle',
      subject: 'English',
      description: 'Discussion group for classic literature and essay writing',
      members: 10,
      maxMembers: 15,
      isPublic: true,
      isJoined: true,
      nextMeeting: '2024-03-12T14:00:00',
      topics: ['Shakespeare', 'Essay Writing', 'Poetry'],
      createdBy: 'Emily Davis'
    },
    {
      id: '4',
      name: 'Chemistry Study Team',
      subject: 'Chemistry',
      description: 'Chemistry study group focusing on organic chemistry',
      members: 5,
      maxMembers: 10,
      isPublic: false,
      isJoined: false,
      topics: ['Organic Chemistry', 'Lab Safety', 'Reactions'],
      createdBy: 'Mike Wilson'
    }
  ];

  const groupMessages: GroupMessage[] = [
    {
      id: '1',
      sender: 'John Smith',
      message: 'Hi everyone! I have a question about calculus integration.',
      timestamp: '2024-03-08T10:30:00',
      type: 'text'
    },
    {
      id: '2',
      sender: 'Alice Brown',
      message: 'I can help with that! Which specific problem are you working on?',
      timestamp: '2024-03-08T10:35:00',
      type: 'text'
    },
    {
      id: '3',
      sender: 'John Smith',
      message: 'https://drive.google.com/file/d/1234567890/view',
      timestamp: '2024-03-08T10:40:00',
      type: 'link'
    }
  ];

  const filteredGroups = studyGroups.filter(group =>
    group.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    group.subject.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const currentGroup = studyGroups.find(group => group.id === selectedGroup);

  const handleJoinGroup = (groupId: string) => {
    // Handle join group logic
    console.log('Joining group:', groupId);
  };

  const handleLeaveGroup = (groupId: string) => {
    // Handle leave group logic
    console.log('Leaving group:', groupId);
  };

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      // Handle send message logic
      console.log('Sending message:', newMessage);
      setNewMessage('');
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Study Groups</h1>
            <p className="text-gray-600 mt-2">Collaborate with classmates and enhance your learning</p>
          </div>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Create Study Group
          </Button>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="bg-blue-100 p-2 rounded-lg">
                  <Users className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Total Groups</p>
                  <p className="text-xl font-semibold">{studyGroups.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="bg-green-100 p-2 rounded-lg">
                  <Users className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Joined Groups</p>
                  <p className="text-xl font-semibold">{studyGroups.filter(g => g.isJoined).length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="bg-purple-100 p-2 rounded-lg">
                  <MessageSquare className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Active Discussions</p>
                  <p className="text-xl font-semibold">12</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="bg-orange-100 p-2 rounded-lg">
                  <Calendar className="h-5 w-5 text-orange-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Upcoming Meetings</p>
                  <p className="text-xl font-semibold">3</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Study Groups List */}
          <div className="lg:col-span-1 space-y-4">
            <div className="flex items-center space-x-2">
              <Search className="h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search study groups..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1"
              />
            </div>

            <div className="space-y-3">
              {filteredGroups.map((group) => (
                <Card 
                  key={group.id} 
                  className={`cursor-pointer transition-all hover:shadow-md ${
                    selectedGroup === group.id ? 'ring-2 ring-blue-500' : ''
                  }`}
                  onClick={() => setSelectedGroup(group.id)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900">{group.name}</h3>
                        <p className="text-sm text-gray-600 mt-1">{group.subject}</p>
                        <p className="text-xs text-gray-500 mt-1 line-clamp-2">{group.description}</p>
                        
                        <div className="flex items-center space-x-4 mt-3">
                          <div className="flex items-center space-x-1 text-xs text-gray-500">
                            <Users className="h-3 w-3" />
                            <span>{group.members}/{group.maxMembers}</span>
                          </div>
                          {group.nextMeeting && (
                            <div className="flex items-center space-x-1 text-xs text-gray-500">
                              <Calendar className="h-3 w-3" />
                              <span>Next: {new Date(group.nextMeeting).toLocaleDateString()}</span>
                            </div>
                          )}
                        </div>

                        <div className="flex flex-wrap gap-1 mt-2">
                          {group.topics.slice(0, 2).map((topic, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {topic}
                            </Badge>
                          ))}
                          {group.topics.length > 2 && (
                            <Badge variant="secondary" className="text-xs">
                              +{group.topics.length - 2} more
                            </Badge>
                          )}
                        </div>
                      </div>
                      
                      <div className="flex flex-col items-end space-y-2">
                        {group.isPublic ? (
                          <Badge variant="outline" className="text-xs">Public</Badge>
                        ) : (
                          <Badge variant="outline" className="text-xs">Private</Badge>
                        )}
                        
                        {group.isJoined ? (
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleLeaveGroup(group.id);
                            }}
                          >
                            Leave
                          </Button>
                        ) : (
                          <Button 
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleJoinGroup(group.id);
                            }}
                          >
                            Join
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Group Details and Chat */}
          <div className="lg:col-span-2">
            {currentGroup ? (
              <div className="space-y-6">
                {/* Group Header */}
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-xl">{currentGroup.name}</CardTitle>
                        <CardDescription>{currentGroup.subject} • Created by {currentGroup.createdBy}</CardDescription>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button variant="outline" size="sm">
                          <Video className="h-4 w-4 mr-2" />
                          Start Meeting
                        </Button>
                        <Button variant="outline" size="sm">
                          <Settings className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">{currentGroup.description}</p>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div className="flex items-center space-x-2">
                        <Users className="h-4 w-4 text-gray-400" />
                        <span>{currentGroup.members} members</span>
                      </div>
                      {currentGroup.nextMeeting && (
                        <div className="flex items-center space-x-2">
                          <Calendar className="h-4 w-4 text-gray-400" />
                          <span>Next: {new Date(currentGroup.nextMeeting).toLocaleDateString()}</span>
                        </div>
                      )}
                      <div className="flex items-center space-x-2">
                        <Clock className="h-4 w-4 text-gray-400" />
                        <span>Active now</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <BookOpen className="h-4 w-4 text-gray-400" />
                        <span>{currentGroup.topics.length} topics</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Chat Section */}
                <Card>
                  <CardHeader>
                    <CardTitle>Group Discussion</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {/* Messages */}
                      <div className="space-y-3 max-h-96 overflow-y-auto">
                        {groupMessages.map((message) => (
                          <div key={message.id} className="flex space-x-3">
                            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                              <span className="text-sm font-medium text-blue-600">
                                {message.sender.charAt(0)}
                              </span>
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center space-x-2">
                                <span className="font-medium text-sm">{message.sender}</span>
                                <span className="text-xs text-gray-500">
                                  {new Date(message.timestamp).toLocaleTimeString()}
                                </span>
                              </div>
                              <p className="text-sm text-gray-700 mt-1">{message.message}</p>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Message Input */}
                      <div className="flex space-x-2 pt-4 border-t">
                        <Textarea
                          placeholder="Type your message..."
                          value={newMessage}
                          onChange={(e) => setNewMessage(e.target.value)}
                          className="flex-1 min-h-[60px]"
                        />
                        <div className="flex flex-col space-y-2">
                          <Button size="sm" variant="outline">
                            <FileText className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <Share2 className="h-4 w-4" />
                          </Button>
                          <Button onClick={handleSendMessage}>
                            Send
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ) : (
              <Card>
                <CardContent className="p-12 text-center">
                  <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Select a Study Group</h3>
                  <p className="text-gray-600">Choose a study group from the list to view details and participate in discussions.</p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default StudyGroupsPage; 