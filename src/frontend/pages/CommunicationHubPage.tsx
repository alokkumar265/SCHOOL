import React, { useState } from 'react';
import { useAuth } from '@/backend/contexts/AuthContext';
import DashboardLayout from '@/frontend/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  MessageSquare, 
  Send, 
  Bell, 
  Users, 
  Search, 
  MoreVertical,
  Phone,
  Video,
  Paperclip,
  Smile,
  Calendar,
  User,
  FileText,
  Image,
  Mic,
  Eye,
  Heart,
  Share2,
  BookOpen,
  GraduationCap,
  Building,
  Mail,
  Plus
} from 'lucide-react';

const CommunicationHubPage = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('students');
  const [selectedChat, setSelectedChat] = useState(null);
  const [messageText, setMessageText] = useState('');

  // Teacher-specific data
  const students = [
    {
      id: 1,
      name: 'Aarav Sharma',
      class: 'Class 10-A',
      avatar: '/student-aarav.jpg',
      online: true,
      lastMessage: 'Sir, I have a question about the algebra assignment',
      lastMessageTime: '2 hours ago',
      unreadCount: 2,
      performance: 'A+',
      attendance: 95
    },
    {
      id: 2,
      name: 'Priya Patel',
      class: 'Class 10-A',
      avatar: '/student-priya.jpg',
      online: false,
      lastMessage: 'Thank you for the clarification on calculus',
      lastMessageTime: '1 day ago',
      unreadCount: 0,
      performance: 'A',
      attendance: 92
    },
    {
      id: 3,
      name: 'Rahul Kumar',
      class: 'Class 9-B',
      avatar: '/student-rahul.jpg',
      online: true,
      lastMessage: 'Can you help me with geometry problem 15?',
      lastMessageTime: '30 minutes ago',
      unreadCount: 1,
      performance: 'B+',
      attendance: 89
    }
  ];

  const parents = [
    {
      id: 1,
      name: 'Mr. & Mrs. Sharma',
      student: 'Aarav Sharma',
      avatar: '/parent-sharma.jpg',
      online: false,
      lastMessage: 'How is Aarav performing in mathematics?',
      lastMessageTime: '3 days ago',
      unreadCount: 0
    },
    {
      id: 2,
      name: 'Mrs. Patel',
      student: 'Priya Patel',
      avatar: '/parent-patel.jpg',
      online: true,
      lastMessage: 'Priya mentioned she needs extra help with calculus',
      lastMessageTime: '1 day ago',
      unreadCount: 1
    }
  ];

  const colleagues = [
    {
      id: 1,
      name: 'Mrs. Gupta',
      subject: 'Physics',
      avatar: '/teacher-gupta.jpg',
      online: true,
      lastMessage: 'Can we coordinate on the science project?',
      lastMessageTime: '1 hour ago',
      unreadCount: 1
    },
    {
      id: 2,
      name: 'Mr. Singh',
      subject: 'Chemistry',
      avatar: '/teacher-singh.jpg',
      online: false,
      lastMessage: 'Great idea for the interdisciplinary project!',
      lastMessageTime: '2 days ago',
      unreadCount: 0
    },
    {
      id: 3,
      name: 'Ms. Reddy',
      subject: 'English',
      avatar: '/teacher-reddy.jpg',
      online: true,
      lastMessage: 'Let\'s discuss the upcoming parent-teacher meeting',
      lastMessageTime: '30 minutes ago',
      unreadCount: 2
    }
  ];

  const announcements = [
    {
      id: 1,
      title: 'Mathematics Assignment Due Date Extended',
      content: 'Due to technical issues, the deadline for the algebra assignment has been extended to Friday, June 28th.',
      author: 'Mathematics Department',
      date: '2024-06-25',
      priority: 'high',
      read: false,
      targetAudience: 'Class 10-A, Class 9-B'
    },
    {
      id: 2,
      title: 'Parent-Teacher Meeting Schedule',
      content: 'Parent-teacher meetings will be held on July 5th and 6th. Please check your email for your scheduled time slot.',
      author: 'School Administration',
      date: '2024-06-24',
      priority: 'medium',
      read: true,
      targetAudience: 'All Parents'
    },
    {
      id: 3,
      title: 'Mathematics Olympiad Registration',
      content: 'Registration for the National Mathematics Olympiad is now open. Interested students should submit their applications by July 10th.',
      author: 'Mathematics Department',
      date: '2024-06-23',
      priority: 'high',
      read: false,
      targetAudience: 'Class 10-A, Class 11-C'
    }
  ];

  const groupDiscussions = [
    {
      id: 1,
      name: 'Mathematics Department',
      members: 8,
      lastMessage: 'Let\'s discuss the new curriculum changes',
      lastMessageTime: '30 minutes ago',
      unreadCount: 3,
      type: 'department'
    },
    {
      id: 2,
      name: 'Class 10-A Parents',
      members: 32,
      lastMessage: 'Thank you for the detailed progress report',
      lastMessageTime: '2 hours ago',
      unreadCount: 0,
      type: 'parent'
    },
    {
      id: 3,
      name: 'Science Teachers',
      members: 12,
      lastMessage: 'Great collaboration on the science fair project',
      lastMessageTime: '1 day ago',
      unreadCount: 1,
      type: 'colleague'
    }
  ];

  const chatMessages = [
    {
      id: 1,
      sender: 'Aarav Sharma',
      message: 'Sir, I have a question about the algebra assignment',
      time: '10:30 AM',
      isTeacher: false
    },
    {
      id: 2,
      sender: 'You',
      message: 'Hello Aarav! Sure, what\'s your question?',
      time: '10:32 AM',
      isTeacher: true
    },
    {
      id: 3,
      sender: 'Aarav Sharma',
      message: 'I\'m stuck on problem 12. Can you explain the quadratic formula again?',
      time: '10:33 AM',
      isTeacher: false
    },
    {
      id: 4,
      sender: 'You',
      message: 'Of course! The quadratic formula is x = (-b ± √(b² - 4ac)) / 2a. Which part is confusing you?',
      time: '10:35 AM',
      isTeacher: true
    }
  ];

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const sendMessage = () => {
    if (messageText.trim()) {
      // Handle sending message
      console.log('Sending message:', messageText);
      setMessageText('');
    }
  };

  const getContactList = () => {
    switch (activeTab) {
      case 'students': return students;
      case 'parents': return parents;
      case 'colleagues': return colleagues;
      default: return students;
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold tracking-tight mb-2">Communication Hub</h1>
          <p className="text-muted-foreground">Connect with students, parents, colleagues, and manage announcements</p>
        </div>

        <Tabs defaultValue="students" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="students">Students</TabsTrigger>
            <TabsTrigger value="parents">Parents</TabsTrigger>
            <TabsTrigger value="colleagues">Colleagues</TabsTrigger>
            <TabsTrigger value="announcements">Announcements</TabsTrigger>
          </TabsList>

          <TabsContent value="students" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Student List */}
              <Card className="lg:col-span-1">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <GraduationCap className="h-5 w-5" />
                    My Students
                  </CardTitle>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input placeholder="Search students..." className="pl-10" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {students.map((student) => (
                      <div
                        key={student.id}
                        className={`p-3 border rounded-lg cursor-pointer transition-all hover:shadow-md ${
                          selectedChat?.id === student.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                        }`}
                        onClick={() => setSelectedChat(student)}
                      >
                        <div className="flex items-center gap-3">
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={student.avatar} />
                            <AvatarFallback>{student.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1 min-w-0">
                            <div className="flex justify-between items-start">
                              <div>
                                <h4 className="font-medium text-sm">{student.name}</h4>
                                <p className="text-xs text-muted-foreground">{student.class}</p>
                              </div>
                              <div className="text-right">
                                <div className="text-xs text-muted-foreground">{student.lastMessageTime}</div>
                                {student.unreadCount > 0 && (
                                  <Badge className="ml-1 text-xs">{student.unreadCount}</Badge>
                                )}
                              </div>
                            </div>
                            <p className="text-xs text-muted-foreground truncate">{student.lastMessage}</p>
                            <div className="flex items-center gap-2 mt-1">
                              <Badge variant="outline" className="text-xs">Grade: {student.performance}</Badge>
                              <Badge variant="outline" className="text-xs">Attendance: {student.attendance}%</Badge>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Chat Area */}
              <Card className="lg:col-span-2">
                {selectedChat ? (
                  <>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={selectedChat.avatar} />
                            <AvatarFallback>{selectedChat.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                          </Avatar>
                          <div>
                            <h3 className="font-semibold">{selectedChat.name}</h3>
                            <p className="text-sm text-muted-foreground">{selectedChat.class}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button size="sm" variant="outline">
                            <Phone className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <Video className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4 mb-4 h-96 overflow-y-auto">
                        {chatMessages.map((message) => (
                          <div
                            key={message.id}
                            className={`flex ${message.isTeacher ? 'justify-end' : 'justify-start'}`}
                          >
                            <div
                              className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                                message.isTeacher
                                  ? 'bg-blue-600 text-white'
                                  : 'bg-gray-100 text-gray-900'
                              }`}
                            >
                              <p className="text-sm">{message.message}</p>
                              <p className={`text-xs mt-1 ${message.isTeacher ? 'text-blue-100' : 'text-gray-500'}`}>
                                {message.time}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="flex items-center gap-2">
                        <Button size="sm" variant="outline">
                          <Paperclip className="h-4 w-4" />
                        </Button>
                        <Input
                          placeholder="Type your message..."
                          value={messageText}
                          onChange={(e) => setMessageText(e.target.value)}
                          onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                          className="flex-1"
                        />
                        <Button size="sm" onClick={sendMessage}>
                          <Send className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </>
                ) : (
                  <CardContent className="flex items-center justify-center h-96">
                    <div className="text-center text-muted-foreground">
                      <MessageSquare className="h-12 w-12 mx-auto mb-4 opacity-50" />
                      <p>Select a student to start chatting</p>
                    </div>
                  </CardContent>
                )}
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="parents" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Parent List */}
              <Card className="lg:col-span-1">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    Parents
                  </CardTitle>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input placeholder="Search parents..." className="pl-10" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {parents.map((parent) => (
                      <div
                        key={parent.id}
                        className={`p-3 border rounded-lg cursor-pointer transition-all hover:shadow-md ${
                          selectedChat?.id === parent.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                        }`}
                        onClick={() => setSelectedChat(parent)}
                      >
                        <div className="flex items-center gap-3">
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={parent.avatar} />
                            <AvatarFallback>{parent.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1 min-w-0">
                            <div className="flex justify-between items-start">
                              <div>
                                <h4 className="font-medium text-sm">{parent.name}</h4>
                                <p className="text-xs text-muted-foreground">Parent of {parent.student}</p>
                              </div>
                              <div className="text-right">
                                <div className="text-xs text-muted-foreground">{parent.lastMessageTime}</div>
                                {parent.unreadCount > 0 && (
                                  <Badge className="ml-1 text-xs">{parent.unreadCount}</Badge>
                                )}
                              </div>
                            </div>
                            <p className="text-xs text-muted-foreground truncate">{parent.lastMessage}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Chat Area */}
              <Card className="lg:col-span-2">
                {selectedChat ? (
                  <>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={selectedChat.avatar} />
                            <AvatarFallback>{selectedChat.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                          </Avatar>
                          <div>
                            <h3 className="font-semibold">{selectedChat.name}</h3>
                            <p className="text-sm text-muted-foreground">Parent of {selectedChat.student}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button size="sm" variant="outline">
                            <Phone className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <Video className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4 mb-4 h-96 overflow-y-auto">
                        {/* Parent chat messages would go here */}
                      </div>
                      <div className="flex items-center gap-2">
                        <Button size="sm" variant="outline">
                          <Paperclip className="h-4 w-4" />
                        </Button>
                        <Input
                          placeholder="Type your message..."
                          value={messageText}
                          onChange={(e) => setMessageText(e.target.value)}
                          onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                          className="flex-1"
                        />
                        <Button size="sm" onClick={sendMessage}>
                          <Send className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </>
                ) : (
                  <CardContent className="flex items-center justify-center h-96">
                    <div className="text-center text-muted-foreground">
                      <MessageSquare className="h-12 w-12 mx-auto mb-4 opacity-50" />
                      <p>Select a parent to start chatting</p>
                    </div>
                  </CardContent>
                )}
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="colleagues" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Colleague List */}
              <Card className="lg:col-span-1">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Building className="h-5 w-5" />
                    Colleagues
                  </CardTitle>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input placeholder="Search colleagues..." className="pl-10" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {colleagues.map((colleague) => (
                      <div
                        key={colleague.id}
                        className={`p-3 border rounded-lg cursor-pointer transition-all hover:shadow-md ${
                          selectedChat?.id === colleague.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                        }`}
                        onClick={() => setSelectedChat(colleague)}
                      >
                        <div className="flex items-center gap-3">
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={colleague.avatar} />
                            <AvatarFallback>{colleague.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1 min-w-0">
                            <div className="flex justify-between items-start">
                              <div>
                                <h4 className="font-medium text-sm">{colleague.name}</h4>
                                <p className="text-xs text-muted-foreground">{colleague.subject}</p>
                              </div>
                              <div className="text-right">
                                <div className="text-xs text-muted-foreground">{colleague.lastMessageTime}</div>
                                {colleague.unreadCount > 0 && (
                                  <Badge className="ml-1 text-xs">{colleague.unreadCount}</Badge>
                                )}
                              </div>
                            </div>
                            <p className="text-xs text-muted-foreground truncate">{colleague.lastMessage}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Chat Area */}
              <Card className="lg:col-span-2">
                {selectedChat ? (
                  <>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={selectedChat.avatar} />
                            <AvatarFallback>{selectedChat.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                          </Avatar>
                          <div>
                            <h3 className="font-semibold">{selectedChat.name}</h3>
                            <p className="text-sm text-muted-foreground">{selectedChat.subject}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button size="sm" variant="outline">
                            <Phone className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <Video className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4 mb-4 h-96 overflow-y-auto">
                        {/* Colleague chat messages would go here */}
                      </div>
                      <div className="flex items-center gap-2">
                        <Button size="sm" variant="outline">
                          <Paperclip className="h-4 w-4" />
                        </Button>
                        <Input
                          placeholder="Type your message..."
                          value={messageText}
                          onChange={(e) => setMessageText(e.target.value)}
                          onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                          className="flex-1"
                        />
                        <Button size="sm" onClick={sendMessage}>
                          <Send className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </>
                ) : (
                  <CardContent className="flex items-center justify-center h-96">
                    <div className="text-center text-muted-foreground">
                      <MessageSquare className="h-12 w-12 mx-auto mb-4 opacity-50" />
                      <p>Select a colleague to start chatting</p>
                    </div>
                  </CardContent>
                )}
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="announcements" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Announcements</h2>
              <Button asChild>
                <Plus className="h-4 w-4 mr-2" />
                Create Announcement
              </Button>
            </div>

            <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {announcements.map((announcement) => (
                <Card key={announcement.id} className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <CardTitle className="text-lg">{announcement.title}</CardTitle>
                        <CardDescription className="mt-2">
                          By {announcement.author} • {announcement.date}
                        </CardDescription>
                      </div>
                      <Badge className={getPriorityColor(announcement.priority)}>
                        {announcement.priority}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-3">{announcement.content}</p>
                    <div className="space-y-2">
                      <p className="text-xs text-muted-foreground">
                        <strong>Target Audience:</strong> {announcement.targetAudience}
                      </p>
                      <div className="flex items-center gap-2">
                        <Button size="sm" variant="outline">
                          <Eye className="h-4 w-4 mr-2" />
                          View Details
                        </Button>
                        <Button size="sm" variant="outline">
                          <Share2 className="h-4 w-4 mr-2" />
                          Share
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default CommunicationHubPage; 