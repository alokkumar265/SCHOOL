import React, { useState } from 'react';
import DashboardLayout from '@/frontend/components/layout/DashboardLayout';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { useAuth } from '@/backend/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { Message, Conversation, Announcement } from '@/types/communication';
import ConversationList from '@/components/messages/ConversationList';
import MessageView from '@/components/messages/MessageView';
import { 
  Search, 
  Send, 
  Users, 
  PlusCircle, 
  Paperclip, 
  Bell, 
  MailPlus, 
  MessageSquare,
  Download
} from 'lucide-react';

const MessagesPage = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("messages");
  const [newMessage, setNewMessage] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);
  
  // Mock data for conversations
  const mockConversations: Conversation[] = [
    {
      id: "1",
      participants: [
        {
          id: "current-user",
          name: "You",
          role: "teacher",
          avatar: ""
        },
        {
          id: "2",
          name: "John Smith",
          role: "parent",
          avatar: ""
        }
      ],
      lastMessage: {
        content: "Thank you for the update on Alex's progress.",
        timestamp: new Date(new Date().getTime() - 3600000).toISOString(),
        senderId: "2"
      },
      unreadCount: 0
    },
    {
      id: "2",
      participants: [
        {
          id: "current-user",
          name: "You",
          role: "teacher",
          avatar: ""
        },
        {
          id: "3",
          name: "Sarah Davis",
          role: "parent",
          avatar: ""
        }
      ],
      lastMessage: {
        content: "Can we schedule a meeting to discuss Emma's performance?",
        timestamp: new Date(new Date().getTime() - 86400000).toISOString(),
        senderId: "3"
      },
      unreadCount: 2
    },
    {
      id: "3",
      participants: [
        {
          id: "current-user",
          name: "You",
          role: "teacher",
          avatar: ""
        },
        {
          id: "4",
          name: "Robert Johnson",
          role: "teacher",
          avatar: ""
        }
      ],
      lastMessage: {
        content: "I've shared the lesson plan for next week.",
        timestamp: new Date(new Date().getTime() - 172800000).toISOString(),
        senderId: "current-user"
      },
      unreadCount: 0
    }
  ];
  
  // Mock data for messages
  const mockMessages: Record<string, Message[]> = {
    "1": [
      {
        id: "msg1",
        senderId: "current-user",
        senderName: "You",
        senderRole: "teacher",
        receiverId: "2",
        receiverName: "John Smith",
        receiverRole: "parent",
        content: "Hello Mr. Smith, I wanted to discuss Alex's recent progress in mathematics.",
        timestamp: new Date(new Date().getTime() - 7200000).toISOString(),
        read: true
      },
      {
        id: "msg2",
        senderId: "2",
        senderName: "John Smith",
        senderRole: "parent",
        receiverId: "current-user",
        receiverName: "You",
        receiverRole: "teacher",
        content: "Hello! Thank you for reaching out. How is Alex doing in your class?",
        timestamp: new Date(new Date().getTime() - 5400000).toISOString(),
        read: true
      },
      {
        id: "msg3",
        senderId: "current-user",
        senderName: "You",
        senderRole: "teacher",
        receiverId: "2",
        receiverName: "John Smith",
        receiverRole: "parent",
        content: "Alex has shown significant improvement in problem-solving skills. I've attached the recent test results.",
        timestamp: new Date(new Date().getTime() - 4500000).toISOString(),
        read: true,
        attachment: "alex_math_results.pdf",
        attachmentType: "document"
      },
      {
        id: "msg4",
        senderId: "2",
        senderName: "John Smith",
        senderRole: "parent",
        receiverId: "current-user",
        receiverName: "You",
        receiverRole: "teacher",
        content: "Thank you for the update on Alex's progress.",
        timestamp: new Date(new Date().getTime() - 3600000).toISOString(),
        read: true
      }
    ],
    "2": [
      {
        id: "msg5",
        senderId: "3",
        senderName: "Sarah Davis",
        senderRole: "parent",
        receiverId: "current-user",
        receiverName: "You",
        receiverRole: "teacher",
        content: "Hello, I'm Emma's mother. I wanted to check in on how she's doing in your class.",
        timestamp: new Date(new Date().getTime() - 172800000).toISOString(),
        read: true
      },
      {
        id: "msg6",
        senderId: "current-user",
        senderName: "You",
        senderRole: "teacher",
        receiverId: "3",
        receiverName: "Sarah Davis",
        receiverRole: "parent",
        content: "Hello Mrs. Davis. Emma is doing well overall, but I've noticed she's having some difficulties with the recent topics.",
        timestamp: new Date(new Date().getTime() - 158400000).toISOString(),
        read: true
      },
      {
        id: "msg7",
        senderId: "3",
        senderName: "Sarah Davis",
        senderRole: "parent",
        receiverId: "current-user",
        receiverName: "You",
        receiverRole: "teacher",
        content: "I see. What specific areas is she struggling with?",
        timestamp: new Date(new Date().getTime() - 86400000).toISOString(),
        read: false
      },
      {
        id: "msg8",
        senderId: "3",
        senderName: "Sarah Davis",
        senderRole: "parent",
        receiverId: "current-user",
        receiverName: "You",
        receiverRole: "teacher",
        content: "Can we schedule a meeting to discuss Emma's performance?",
        timestamp: new Date(new Date().getTime() - 86400000).toISOString(),
        read: false
      }
    ],
    "3": [
      {
        id: "msg9",
        senderId: "4",
        senderName: "Robert Johnson",
        senderRole: "teacher",
        receiverId: "current-user",
        receiverName: "You",
        receiverRole: "teacher",
        content: "Hi there, do you have the curriculum plan for the science department?",
        timestamp: new Date(new Date().getTime() - 259200000).toISOString(),
        read: true
      },
      {
        id: "msg10",
        senderId: "current-user",
        senderName: "You",
        senderRole: "teacher",
        receiverId: "4",
        receiverName: "Robert Johnson",
        receiverRole: "teacher",
        content: "Yes, I'll send it right away. Let me know if you need anything else.",
        timestamp: new Date(new Date().getTime() - 244800000).toISOString(),
        read: true
      },
      {
        id: "msg11",
        senderId: "4",
        senderName: "Robert Johnson",
        senderRole: "teacher",
        receiverId: "current-user",
        receiverName: "You",
        receiverRole: "teacher",
        content: "Thank you! Also, when is the next department meeting?",
        timestamp: new Date(new Date().getTime() - 172800000).toISOString(),
        read: true
      },
      {
        id: "msg12",
        senderId: "current-user",
        senderName: "You",
        senderRole: "teacher",
        receiverId: "4",
        receiverName: "Robert Johnson",
        receiverRole: "teacher",
        content: "I've shared the lesson plan for next week.",
        timestamp: new Date(new Date().getTime() - 172800000).toISOString(),
        read: true,
        attachment: "science_curriculum.pdf",
        attachmentType: "document"
      }
    ]
  };
  
  // Mock data for announcements
  const mockAnnouncements: Announcement[] = [
    {
      id: "1",
      title: "School Closure Due to Weather",
      content: "Due to the forecasted heavy snowfall, the school will remain closed on Friday, December 15th. Stay safe and warm!",
      author: "Principal Stevens",
      authorRole: "admin",
      timestamp: new Date(new Date().getTime() - 86400000).toISOString(),
      targetAudience: ["all"],
      important: true
    },
    {
      id: "2",
      title: "Parent-Teacher Conference Schedule",
      content: "The Parent-Teacher conferences will be held next week. Please check the attached schedule for your assigned time slot.",
      author: "Admin Office",
      authorRole: "admin",
      timestamp: new Date(new Date().getTime() - 172800000).toISOString(),
      targetAudience: ["parents", "teachers"],
      attachment: "conference_schedule.pdf",
      attachmentType: "document",
      important: false
    },
    {
      id: "3",
      title: "Annual Science Fair Registration Open",
      content: "Registration for the Annual Science Fair is now open! Students interested in participating should submit their project proposals by October 30th.",
      author: "Science Department",
      authorRole: "teacher",
      timestamp: new Date(new Date().getTime() - 259200000).toISOString(),
      targetAudience: ["students", "parents"],
      important: false
    }
  ];

  // Aggregate all messages from all conversations
  const allMessages = Object.values(mockMessages)
    .flat()
    .filter(msg => msg.receiverId === "current-user" || msg.senderId === "current-user")
    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedConversation) return;
    
    // In a real app, you would send the message to the backend
    toast({
      title: "Message Sent",
      description: "Your message has been sent successfully."
    });
    
    // Clear input
    setNewMessage("");
  };

  const handleCreateNewConversation = () => {
    // In a real app, this would open a modal to select recipients
    toast({
      title: "New Conversation",
      description: "This would open a recipient selection dialog."
    });
  };

  const handleSelectConversation = (conversation: Conversation) => {
    setSelectedConversation(conversation);
    
    // In a real app, this would mark messages as read
    // For demo, we're just updating the UI
    const updatedConversations = mockConversations.map(conv => {
      if (conv.id === conversation.id) {
        return { ...conv, unreadCount: 0 };
      }
      return conv;
    });
    
    // This is just for the demo UI, in a real app you'd update state
    console.log("Updated conversations:", updatedConversations);
  };

  const handleAttachFile = () => {
    // In a real app, this would open a file picker
    toast({
      title: "Attach File",
      description: "File attachment feature would be implemented here."
    });
  };

  const filteredConversations = mockConversations.filter(conversation => {
    const otherParticipant = conversation.participants.find(p => p.id !== "current-user");
    return otherParticipant?.name.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <DashboardLayout>
      <div className="space-y-4 h-[calc(100vh-10rem)]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Messages</h1>
            <p className="text-muted-foreground">
              Communicate with parents, students and staff
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={handleCreateNewConversation}>
              <MessageSquare className="mr-2 h-4 w-4" />
              New Message
            </Button>
            <Button onClick={handleCreateNewConversation}>
              <MailPlus className="mr-2 h-4 w-4" />
              New Announcement
            </Button>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full flex flex-col">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="messages">
              <MessageSquare className="mr-2 h-4 w-4" />
              Messages
            </TabsTrigger>
            <TabsTrigger value="all">
              All Messages
            </TabsTrigger>
            <TabsTrigger value="announcements">
              <Bell className="mr-2 h-4 w-4" />
              Announcements
            </TabsTrigger>
          </TabsList>
          
          <div className="flex-1 overflow-hidden mt-4">
            <TabsContent value="messages" className="h-full flex flex-col">
              <Card className="flex-1 flex flex-col sm:flex-row overflow-hidden">
                {/* Conversations List */}
                <div className="w-full sm:w-80 border-r">
                  <div className="p-3 border-b">
                    <div className="relative">
                      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Search conversations..."
                        className="pl-8"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>
                  </div>
                  
                  <ConversationList
                    conversations={filteredConversations}
                    selectedConversationId={selectedConversation?.id || null}
                    onSelectConversation={handleSelectConversation}
                    className="h-[calc(100%-56px)]"
                  />
                </div>
                
                {/* Message View */}
                <div className="flex-1 flex flex-col overflow-hidden">
                  {selectedConversation ? (
                    <>
                      <div className="p-3 border-b flex items-center justify-between">
                        <div className="font-medium">
                          {selectedConversation.participants.find(p => p.id !== "current-user")?.name}
                        </div>
                      </div>
                      
                      <MessageView
                        messages={mockMessages[selectedConversation.id] || []}
                        currentUserId="current-user"
                      />
                      
                      <div className="p-3 border-t">
                        <div className="flex space-x-2">
                          <Button
                            size="icon"
                            variant="ghost"
                            className="flex-shrink-0"
                            onClick={handleAttachFile}
                          >
                            <Paperclip className="h-5 w-5" />
                          </Button>
                          <Input
                            placeholder="Type your message..."
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                          />
                          <Button 
                            className="flex-shrink-0" 
                            onClick={handleSendMessage}
                            disabled={!newMessage.trim()}
                          >
                            <Send className="h-5 w-5" />
                          </Button>
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="flex-1 flex flex-col items-center justify-center p-4 text-center">
                      <Users className="h-12 w-12 text-muted-foreground mb-4" />
                      <h3 className="font-medium text-lg mb-1">Your Messages</h3>
                      <p className="text-muted-foreground mb-4">
                        Select a conversation or start a new one
                      </p>
                      <Button onClick={handleCreateNewConversation}>
                        <PlusCircle className="mr-2 h-4 w-4" />
                        New Conversation
                      </Button>
                    </div>
                  )}
                </div>
              </Card>
            </TabsContent>
            
            <TabsContent value="all">
              <Card className="p-4">
                <h2 className="text-lg font-semibold mb-4">All Messages</h2>
                {allMessages.length === 0 ? (
                  <div className="text-center text-muted-foreground">No messages yet.</div>
                ) : (
                  <ul className="space-y-4">
                    {allMessages.map(msg => (
                      <li key={msg.id} className={`p-3 rounded-lg shadow-sm ${msg.senderRole === 'admin' || msg.senderRole === 'staff' ? 'bg-blue-50 border-l-4 border-blue-500' : 'bg-gray-50'}`}>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium">{msg.senderName}</span>
                          <span className="text-xs text-muted-foreground">({msg.senderRole})</span>
                          <span className="ml-auto text-xs text-gray-400">{new Date(msg.timestamp).toLocaleString()}</span>
                        </div>
                        <div>{msg.content}</div>
                        {msg.attachment && (
                          <div className="mt-2 text-xs text-blue-700">Attachment: {msg.attachment}</div>
                        )}
                      </li>
                    ))}
                  </ul>
                )}
              </Card>
            </TabsContent>

            <TabsContent value="announcements" className="h-full">
              <Card className="h-full flex flex-col overflow-hidden">
                <div className="p-4 border-b">
                  <h3 className="text-lg font-medium">School Announcements</h3>
                  <p className="text-sm text-muted-foreground">
                    Important announcements from the school administration
                  </p>
                </div>
                
                <div className="flex-1 overflow-auto p-4 space-y-4">
                  {mockAnnouncements.map((announcement) => (
                    <Card key={announcement.id}>
                      <div className="p-4 space-y-2">
                        <div className="flex items-center justify-between">
                          <h3 className="font-medium text-lg flex items-center">
                            {announcement.important && (
                              <span className="bg-red-500 h-2 w-2 rounded-full mr-2"></span>
                            )}
                            {announcement.title}
                          </h3>
                          <div className="text-sm text-muted-foreground">
                            {new Date(announcement.timestamp).toLocaleDateString()}
                          </div>
                        </div>
                        
                        <Separator />
                        
                        <p className="text-sm">{announcement.content}</p>
                        
                        {announcement.attachment && (
                          <div className="flex items-center gap-2 p-2 rounded bg-muted text-sm">
                            <Paperclip className="h-4 w-4" />
                            <span className="flex-1 truncate">{announcement.attachment}</span>
                            <Button variant="ghost" size="sm">
                              <Download className="h-4 w-4" />
                            </Button>
                          </div>
                        )}
                        
                        <div className="flex justify-between items-center text-sm text-muted-foreground">
                          <div>By: {announcement.author}</div>
                          <div>
                            For: {announcement.targetAudience.map(a => a.charAt(0).toUpperCase() + a.slice(1)).join(", ")}
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </Card>
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default MessagesPage;
