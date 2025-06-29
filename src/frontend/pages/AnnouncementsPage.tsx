import React, { useState } from 'react';
import DashboardLayout from '@/frontend/components/layout/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Bell, 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  Share2, 
  Calendar,
  Users,
  AlertTriangle,
  CheckCircle,
  Clock,
  Send,
  Filter,
  Search,
  FileText
} from 'lucide-react';

const AnnouncementsPage = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // Mock announcements data
  const announcements = [
    {
      id: 1,
      title: 'Mathematics Assignment Due Date Extended',
      content: 'Due to technical issues, the deadline for the algebra assignment has been extended to Friday, June 28th. All students in Class 10-A and Class 9-B are requested to submit their assignments by the new deadline.',
      author: 'Mathematics Department',
      date: '2024-06-25',
      priority: 'high',
      status: 'active',
      targetAudience: ['Class 10-A', 'Class 9-B'],
      readCount: 45,
      attachments: ['assignment_guidelines.pdf']
    },
    {
      id: 2,
      title: 'Parent-Teacher Meeting Schedule',
      content: 'Parent-teacher meetings will be held on July 5th and 6th. Please check your email for your scheduled time slot. Meetings will be conducted in Room 101 from 2:00 PM to 6:00 PM.',
      author: 'School Administration',
      date: '2024-06-24',
      priority: 'medium',
      status: 'active',
      targetAudience: ['All Parents'],
      readCount: 28,
      attachments: ['meeting_schedule.pdf']
    },
    {
      id: 3,
      title: 'Mathematics Olympiad Registration',
      content: 'Registration for the National Mathematics Olympiad is now open. Interested students from Class 10-A and Class 11-C should submit their applications by July 10th. The competition will be held on August 15th.',
      author: 'Mathematics Department',
      date: '2024-06-23',
      priority: 'high',
      status: 'active',
      targetAudience: ['Class 10-A', 'Class 11-C'],
      readCount: 32,
      attachments: ['olympiad_guidelines.pdf', 'registration_form.pdf']
    },
    {
      id: 4,
      title: 'Class 9-B Geometry Test Postponed',
      content: 'The geometry test scheduled for tomorrow has been postponed to next Monday due to the school\'s annual sports day. Students should continue their preparation.',
      author: 'Mathematics Department',
      date: '2024-06-22',
      priority: 'medium',
      status: 'active',
      targetAudience: ['Class 9-B'],
      readCount: 18,
      attachments: []
    },
    {
      id: 5,
      title: 'Mathematics Club Meeting',
      content: 'The Mathematics Club will meet this Friday at 3:00 PM in Room 201. We will discuss upcoming competitions and plan study sessions. All interested students are welcome.',
      author: 'Mathematics Department',
      date: '2024-06-21',
      priority: 'low',
      status: 'active',
      targetAudience: ['All Students'],
      readCount: 15,
      attachments: []
    }
  ];

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'low': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'text-green-600 bg-green-100';
      case 'draft': return 'text-gray-600 bg-gray-100';
      case 'archived': return 'text-blue-600 bg-blue-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const filteredAnnouncements = announcements.filter(announcement => {
    const matchesSearch = announcement.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         announcement.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTab = activeTab === 'all' || announcement.priority === activeTab;
    return matchesSearch && matchesTab;
  });

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto py-8 px-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-bold">Announcements</h1>
            <p className="text-muted-foreground">Create and manage announcements for your classes and school community</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
            <Button onClick={() => setShowCreateForm(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Create Announcement
            </Button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid gap-4 grid-cols-1 md:grid-cols-4 mb-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Announcements</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{announcements.length}</div>
              <p className="text-xs text-muted-foreground">This month</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">High Priority</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">
                {announcements.filter(a => a.priority === 'high').length}
              </div>
              <p className="text-xs text-muted-foreground">Urgent announcements</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Views</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {announcements.reduce((sum, a) => sum + a.readCount, 0)}
              </div>
              <p className="text-xs text-muted-foreground">Combined read count</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Active</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                {announcements.filter(a => a.status === 'active').length}
              </div>
              <p className="text-xs text-muted-foreground">Currently active</p>
            </CardContent>
          </Card>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="high">High Priority</TabsTrigger>
            <TabsTrigger value="medium">Medium Priority</TabsTrigger>
            <TabsTrigger value="low">Low Priority</TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="space-y-6">
            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search announcements..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Announcements List */}
            <div className="space-y-4">
              {filteredAnnouncements.map((announcement) => (
                <Card key={announcement.id} className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <CardTitle className="text-lg">{announcement.title}</CardTitle>
                          <Badge className={getPriorityColor(announcement.priority)}>
                            {announcement.priority}
                          </Badge>
                          <Badge className={getStatusColor(announcement.status)}>
                            {announcement.status}
                          </Badge>
                        </div>
                        <CardDescription className="flex items-center gap-4">
                          <span className="flex items-center gap-1">
                            <Users className="h-4 w-4" />
                            {announcement.author}
                          </span>
                          <span className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            {announcement.date}
                          </span>
                          <span className="flex items-center gap-1">
                            <Eye className="h-4 w-4" />
                            {announcement.readCount} views
                          </span>
                        </CardDescription>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button size="sm" variant="outline">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <Share2 className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">{announcement.content}</p>
                    
                    <div className="space-y-3">
                      <div>
                        <h4 className="font-medium text-sm mb-1">Target Audience:</h4>
                        <div className="flex flex-wrap gap-1">
                          {(announcement.targetAudience || []).map((audience, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {audience}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      
                      {(announcement.attachments || []).length > 0 && (
                        <div>
                          <h4 className="font-medium text-sm mb-1">Attachments:</h4>
                          <div className="flex flex-wrap gap-2">
                            {(announcement.attachments || []).map((attachment, index) => (
                              <Button key={index} size="sm" variant="outline">
                                <FileText className="h-4 w-4 mr-2" />
                                {attachment}
                              </Button>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      <div className="flex items-center justify-between pt-3 border-t">
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            Posted {announcement.date}
                          </span>
                          <span className="flex items-center gap-1">
                            <Eye className="h-4 w-4" />
                            {announcement.readCount} views
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button size="sm" variant="outline">
                            <Eye className="h-4 w-4 mr-2" />
                            View Details
                          </Button>
                          <Button size="sm" variant="outline">
                            <Send className="h-4 w-4 mr-2" />
                            Send Reminder
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
              
              {filteredAnnouncements.length === 0 && (
                <Card>
                  <CardContent className="flex items-center justify-center py-12">
                    <div className="text-center text-muted-foreground">
                      <Bell className="h-12 w-12 mx-auto mb-4 opacity-50" />
                      <p className="text-lg">No announcements found</p>
                      <p className="text-sm">Try adjusting your search or filters</p>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>
        </Tabs>

        {/* Create Announcement Modal (simplified as inline) */}
        {showCreateForm && (
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Create New Announcement</CardTitle>
              <CardDescription>Share important information with your students and parents</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Title</label>
                  <Input placeholder="Enter announcement title" />
                </div>
                
                <div>
                  <label className="text-sm font-medium">Content</label>
                  <Textarea placeholder="Enter announcement content" rows={4} />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">Priority</label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select priority" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="high">High</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="low">Low</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium">Target Audience</label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select audience" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all-students">All Students</SelectItem>
                        <SelectItem value="class-10-a">Class 10-A</SelectItem>
                        <SelectItem value="class-9-b">Class 9-B</SelectItem>
                        <SelectItem value="class-11-c">Class 11-C</SelectItem>
                        <SelectItem value="all-parents">All Parents</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="flex justify-end gap-2 pt-4">
                  <Button variant="outline" onClick={() => setShowCreateForm(false)}>
                    Cancel
                  </Button>
                  <Button>
                    <Send className="h-4 w-4 mr-2" />
                    Publish Announcement
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
};

export default AnnouncementsPage; 