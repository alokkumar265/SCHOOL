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
  Calendar, 
  MapPin, 
  Clock, 
  Users, 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  Share2,
  Bell,
  CheckCircle,
  AlertTriangle,
  BookOpen,
  GraduationCap,
  Building,
  Filter,
  Search
} from 'lucide-react';

const EventsPage = () => {
  const [activeTab, setActiveTab] = useState('upcoming');
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // Mock events data
  const events = [
    {
      id: 1,
      title: 'Mathematics Olympiad',
      description: 'Annual mathematics competition for students of Class 10 and 11. Students will compete in algebra, geometry, and calculus.',
      date: '2024-07-15',
      time: '09:00 AM - 02:00 PM',
      location: 'School Auditorium',
      type: 'academic',
      category: 'competition',
      organizer: 'Mathematics Department',
      participants: 45,
      maxParticipants: 50,
      status: 'upcoming',
      priority: 'high',
      targetAudience: ['Class 10-A', 'Class 11-C'],
      requirements: ['Registration required', 'Bring calculator', 'No mobile phones']
    },
    {
      id: 2,
      title: 'Parent-Teacher Meeting',
      description: 'Semi-annual parent-teacher meeting to discuss student progress and address concerns.',
      date: '2024-07-05',
      time: '02:00 PM - 06:00 PM',
      location: 'Room 101',
      type: 'administrative',
      category: 'meeting',
      organizer: 'School Administration',
      participants: 28,
      maxParticipants: 35,
      status: 'upcoming',
      priority: 'high',
      targetAudience: ['All Parents'],
      requirements: ['Appointment required', 'Bring student progress report']
    },
    {
      id: 3,
      title: 'Mathematics Club Meeting',
      description: 'Monthly meeting of the Mathematics Club to discuss upcoming activities and plan study sessions.',
      date: '2024-06-28',
      time: '03:00 PM - 04:30 PM',
      location: 'Room 201',
      type: 'academic',
      category: 'club',
      organizer: 'Mathematics Department',
      participants: 15,
      maxParticipants: 20,
      status: 'upcoming',
      priority: 'medium',
      targetAudience: ['All Students'],
      requirements: ['Open to all interested students']
    },
    {
      id: 4,
      title: 'Teacher Training Workshop',
      description: 'Professional development workshop on modern teaching methodologies and technology integration.',
      date: '2024-06-25',
      time: '10:00 AM - 04:00 PM',
      location: 'Conference Room',
      type: 'professional',
      category: 'workshop',
      organizer: 'HR Department',
      participants: 12,
      maxParticipants: 15,
      status: 'completed',
      priority: 'medium',
      targetAudience: ['All Teachers'],
      requirements: ['Registration required', 'Bring laptop']
    },
    {
      id: 5,
      title: 'Annual Sports Day',
      description: 'Annual sports day with various athletic competitions and cultural performances.',
      date: '2024-08-20',
      time: '08:00 AM - 06:00 PM',
      location: 'School Ground',
      type: 'cultural',
      category: 'sports',
      organizer: 'Physical Education Department',
      participants: 120,
      maxParticipants: 150,
      status: 'upcoming',
      priority: 'medium',
      targetAudience: ['All Students', 'All Staff'],
      requirements: ['Sports uniform required', 'Parent consent needed']
    },
    {
      id: 6,
      title: 'Science Fair',
      description: 'Annual science fair showcasing student projects and innovations.',
      date: '2024-09-10',
      time: '09:00 AM - 03:00 PM',
      location: 'Science Labs',
      type: 'academic',
      category: 'exhibition',
      organizer: 'Science Department',
      participants: 35,
      maxParticipants: 40,
      status: 'upcoming',
      priority: 'high',
      targetAudience: ['Class 9-B', 'Class 10-A', 'Class 11-C'],
      requirements: ['Project submission required', 'Display materials needed']
    }
  ];

  const getTypeColor = (type) => {
    switch (type) {
      case 'academic': return 'text-blue-600 bg-blue-100';
      case 'administrative': return 'text-purple-600 bg-purple-100';
      case 'professional': return 'text-green-600 bg-green-100';
      case 'cultural': return 'text-orange-600 bg-orange-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

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
      case 'upcoming': return 'text-blue-600 bg-blue-100';
      case 'ongoing': return 'text-green-600 bg-green-100';
      case 'completed': return 'text-gray-600 bg-gray-100';
      case 'cancelled': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const filteredEvents = events.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTab = activeTab === 'all' || event.status === activeTab;
    return matchesSearch && matchesTab;
  });

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto py-8 px-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-bold">Events & Activities</h1>
            <p className="text-muted-foreground">Manage and participate in school events, academic activities, and professional development</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
            <Button onClick={() => setShowCreateForm(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Create Event
            </Button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid gap-4 grid-cols-1 md:grid-cols-4 mb-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Events</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{events.length}</div>
              <p className="text-xs text-muted-foreground">This academic year</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Upcoming</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">
                {events.filter(e => e.status === 'upcoming').length}
              </div>
              <p className="text-xs text-muted-foreground">Scheduled events</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">High Priority</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">
                {events.filter(e => e.priority === 'high').length}
              </div>
              <p className="text-xs text-muted-foreground">Important events</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">My Events</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                {events.filter(e => e.organizer === 'Mathematics Department').length}
              </div>
              <p className="text-xs text-muted-foreground">Organized by me</p>
            </CardContent>
          </Card>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="all">All Events</TabsTrigger>
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
            <TabsTrigger value="ongoing">Ongoing</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="space-y-6">
            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search events..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Events Grid */}
            <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {filteredEvents.map((event) => (
                <Card key={event.id} className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <CardTitle className="text-lg">{event.title}</CardTitle>
                        <CardDescription className="mt-2">
                          {event.organizer} • {event.category}
                        </CardDescription>
                      </div>
                      <div className="flex flex-col gap-1">
                        <Badge className={getTypeColor(event.type)}>
                          {event.type}
                        </Badge>
                        <Badge className={getPriorityColor(event.priority)}>
                          {event.priority}
                        </Badge>
                        <Badge className={getStatusColor(event.status)}>
                          {event.status}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4 line-clamp-3">{event.description}</p>
                    
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-sm">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span>{event.date}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span>{event.time}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <span>{event.location}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        <span>{event.participants}/{event.maxParticipants} participants</span>
                      </div>
                      
                      <div>
                        <h4 className="font-medium text-sm mb-1">Target Audience:</h4>
                        <div className="flex flex-wrap gap-1">
                          {(event.targetAudience || []).map((audience, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {audience}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      
                      {(event.requirements || []).length > 0 && (
                        <div>
                          <h4 className="font-medium text-sm mb-1">Requirements:</h4>
                          <ul className="text-xs text-muted-foreground space-y-1">
                            {(event.requirements || []).map((req, index) => (
                              <li key={index} className="flex items-center gap-1">
                                <CheckCircle className="h-3 w-3" />
                                {req}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                      
                      <div className="flex items-center justify-between pt-3 border-t">
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
                        <div className="flex items-center gap-2">
                          {event.organizer === 'Mathematics Department' && (
                            <>
                              <Button size="sm" variant="outline">
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button size="sm" variant="outline">
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
              
              {filteredEvents.length === 0 && (
                <Card className="col-span-full">
                  <CardContent className="flex items-center justify-center py-12">
                    <div className="text-center text-muted-foreground">
                      <Calendar className="h-12 w-12 mx-auto mb-4 opacity-50" />
                      <p className="text-lg">No events found</p>
                      <p className="text-sm">Try adjusting your search or filters</p>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>
        </Tabs>

        {/* Create Event Modal (simplified as inline) */}
        {showCreateForm && (
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Create New Event</CardTitle>
              <CardDescription>Organize academic, administrative, or cultural events</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Event Title</label>
                  <Input placeholder="Enter event title" />
                </div>
                
                <div>
                  <label className="text-sm font-medium">Description</label>
                  <Textarea placeholder="Enter event description" rows={3} />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">Date</label>
                    <Input type="date" />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Time</label>
                    <Input type="time" />
                  </div>
                </div>
                
                <div>
                  <label className="text-sm font-medium">Location</label>
                  <Input placeholder="Enter event location" />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="text-sm font-medium">Event Type</label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="academic">Academic</SelectItem>
                        <SelectItem value="administrative">Administrative</SelectItem>
                        <SelectItem value="professional">Professional</SelectItem>
                        <SelectItem value="cultural">Cultural</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
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
                    <label className="text-sm font-medium">Max Participants</label>
                    <Input type="number" placeholder="50" />
                  </div>
                </div>
                
                <div className="flex justify-end gap-2 pt-4">
                  <Button variant="outline" onClick={() => setShowCreateForm(false)}>
                    Cancel
                  </Button>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Create Event
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

export default EventsPage; 