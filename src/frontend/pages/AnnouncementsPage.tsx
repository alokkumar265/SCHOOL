import React, { useState } from 'react';
import { useAuth } from '@/backend/contexts/AuthContext';
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
  FileText,
  GraduationCap,
  Award,
  Briefcase
} from 'lucide-react';

const AnnouncementsPage = () => {
  const { user } = useAuth();
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
      attachments: ['assignment_guidelines.pdf'],
      category: 'academic'
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
      attachments: ['meeting_schedule.pdf'],
      category: 'general'
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
      attachments: ['olympiad_guidelines.pdf', 'registration_form.pdf'],
      category: 'academic'
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
      attachments: [],
      category: 'academic'
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
      attachments: [],
      category: 'extracurricular'
    }
  ];

  // Alumni-specific announcements
  const alumniAnnouncements = [
    {
      id: 101,
      title: 'Annual Alumni Meet 2024 - Registration Open',
      content: 'We are excited to announce the Annual Alumni Meet 2024! Join us for a day of networking, reminiscing, and celebrating our school community. The event will be held on December 15th, 2024, at the school campus. Early bird registration closes on November 30th.',
      author: 'Alumni Association',
      date: '2024-06-25',
      priority: 'high',
      status: 'active',
      targetAudience: ['All Alumni'],
      readCount: 156,
      attachments: ['event_schedule.pdf', 'registration_form.pdf'],
      category: 'alumni'
    },
    {
      id: 102,
      title: 'Alumni Career Fair - November 2024',
      content: 'The annual Alumni Career Fair is scheduled for November 20th, 2024. This is a great opportunity for alumni to showcase job opportunities and for current students to network with professionals. Companies interested in participating should register by October 15th.',
      author: 'Career Guidance Department',
      date: '2024-06-24',
      priority: 'high',
      status: 'active',
      targetAudience: ['All Alumni', 'Current Students'],
      readCount: 89,
      attachments: ['career_fair_guidelines.pdf'],
      category: 'career'
    },
    {
      id: 103,
      title: 'Alumni Mentorship Program - New Batch',
      content: 'Applications are now open for the Alumni Mentorship Program 2024-25. Alumni can volunteer to mentor current students in their areas of expertise. The program will run from September 2024 to May 2025. Apply by August 31st.',
      author: 'Student Affairs Department',
      date: '2024-06-23',
      priority: 'medium',
      status: 'active',
      targetAudience: ['All Alumni'],
      readCount: 67,
      attachments: ['mentorship_application.pdf', 'program_guidelines.pdf'],
      category: 'mentorship'
    },
    {
      id: 104,
      title: 'Alumni Newsletter - June 2024 Edition',
      content: 'The June 2024 edition of our Alumni Newsletter is now available! This month features alumni success stories, upcoming events, and updates from the school. Don\'t miss out on the latest news from your alma mater.',
      author: 'Alumni Association',
      date: '2024-06-22',
      priority: 'low',
      status: 'active',
      targetAudience: ['All Alumni'],
      readCount: 234,
      attachments: ['newsletter_june_2024.pdf'],
      category: 'newsletter'
    },
    {
      id: 105,
      title: 'Alumni Achievement Spotlight - Dr. Priya Sharma',
      content: 'Congratulations to Dr. Priya Sharma (Batch 2020) for being recognized as "Young Scientist of the Year" by the National Science Foundation. Dr. Sharma\'s research in machine learning applications has been published in top-tier journals.',
      author: 'Alumni Association',
      date: '2024-06-21',
      priority: 'medium',
      status: 'active',
      targetAudience: ['All Alumni'],
      readCount: 189,
      attachments: ['achievement_article.pdf'],
      category: 'achievement'
    },
    {
      id: 106,
      title: 'Alumni Donation Drive - School Development Fund',
      content: 'The Alumni Association is launching its annual donation drive for the School Development Fund. Your contributions help maintain and improve school facilities, provide scholarships, and support various programs. Every contribution makes a difference.',
      author: 'Alumni Association',
      date: '2024-06-20',
      priority: 'medium',
      status: 'active',
      targetAudience: ['All Alumni'],
      readCount: 145,
      attachments: ['donation_form.pdf', 'fund_utilization_report.pdf'],
      category: 'donation'
    }
  ];

  // Combine announcements based on user role
  const allAnnouncements = user?.role === 'alumni' ? [...alumniAnnouncements, ...announcements] : announcements;

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

  const getCategoryColor = (category) => {
    switch (category) {
      case 'alumni': return 'bg-purple-100 text-purple-800';
      case 'career': return 'bg-blue-100 text-blue-800';
      case 'mentorship': return 'bg-green-100 text-green-800';
      case 'newsletter': return 'bg-orange-100 text-orange-800';
      case 'achievement': return 'bg-yellow-100 text-yellow-800';
      case 'donation': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredAnnouncements = allAnnouncements.filter(announcement => {
    const matchesSearch = announcement.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         announcement.content.toLowerCase().includes(searchTerm.toLowerCase());
    
    let matchesTab = false;
    if (user?.role === 'alumni') {
      // Alumni-specific filtering
      matchesTab = activeTab === 'all' || announcement.category === activeTab;
    } else {
      // Original priority-based filtering
      matchesTab = activeTab === 'all' || announcement.priority === activeTab;
    }
    
    return matchesSearch && matchesTab;
  });

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto py-8 px-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-bold">
              {user?.role === 'alumni' ? 'Alumni Announcements' : 'Announcements'}
            </h1>
            <p className="text-muted-foreground">
              {user?.role === 'alumni' 
                ? 'Stay updated with alumni events, career opportunities, and school news' 
                : 'Create and manage announcements for your classes and school community'}
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
            {user?.role !== 'alumni' && (
              <Button onClick={() => setShowCreateForm(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Create Announcement
              </Button>
            )}
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid gap-4 grid-cols-1 md:grid-cols-4 mb-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {user?.role === 'alumni' ? 'Total Announcements' : 'Total Announcements'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{allAnnouncements.length}</div>
              <p className="text-xs text-muted-foreground">This month</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {user?.role === 'alumni' ? 'Alumni Events' : 'High Priority'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">
                {user?.role === 'alumni' 
                  ? allAnnouncements.filter(a => a.category === 'alumni').length
                  : allAnnouncements.filter(a => a.priority === 'high').length
                }
              </div>
              <p className="text-xs text-muted-foreground">
                {user?.role === 'alumni' ? 'Upcoming events' : 'Urgent announcements'}
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {user?.role === 'alumni' ? 'Career Opportunities' : 'Total Views'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {user?.role === 'alumni' 
                  ? allAnnouncements.filter(a => a.category === 'career').length
                  : allAnnouncements.reduce((sum, a) => sum + a.readCount, 0)
                }
              </div>
              <p className="text-xs text-muted-foreground">
                {user?.role === 'alumni' ? 'Job postings & fairs' : 'Combined read count'}
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {user?.role === 'alumni' ? 'Mentorship Programs' : 'Active'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                {user?.role === 'alumni' 
                  ? allAnnouncements.filter(a => a.category === 'mentorship').length
                  : allAnnouncements.filter(a => a.status === 'active').length
                }
              </div>
              <p className="text-xs text-muted-foreground">
                {user?.role === 'alumni' ? 'Available programs' : 'Currently active'}
              </p>
            </CardContent>
          </Card>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="all">All</TabsTrigger>
            {user?.role === 'alumni' ? (
              <>
                <TabsTrigger value="alumni">Events</TabsTrigger>
                <TabsTrigger value="career">Career</TabsTrigger>
                <TabsTrigger value="mentorship">Mentorship</TabsTrigger>
              </>
            ) : (
              <>
                <TabsTrigger value="high">High Priority</TabsTrigger>
                <TabsTrigger value="medium">Medium Priority</TabsTrigger>
                <TabsTrigger value="low">Low Priority</TabsTrigger>
              </>
            )}
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
                          {user?.role === 'alumni' && announcement.category && (
                            <Badge className={getCategoryColor(announcement.category)}>
                              {announcement.category}
                            </Badge>
                          )}
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