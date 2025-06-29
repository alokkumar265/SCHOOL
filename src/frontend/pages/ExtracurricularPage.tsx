import React, { useState } from 'react';
import { useAuth } from '@/backend/contexts/AuthContext';
import DashboardLayout from '@/frontend/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { 
  Trophy, 
  Users, 
  Calendar, 
  Clock, 
  MapPin, 
  Star,
  Award,
  Target,
  TrendingUp,
  Activity,
  Music,
  Palette,
  Dumbbell,
  BookOpen,
  Camera,
  Mic,
  Heart,
  Plus,
  Edit,
  Eye,
  Download,
  Share2,
  Bookmark,
  CheckCircle,
  XCircle,
  AlertTriangle,
  User,
  Mail,
  Phone,
  CalendarDays,
  BarChart3,
  FileText,
  Video,
  Image,
  Link,
  Filter
} from 'lucide-react';

const ExtracurricularPage = () => {
  const { user } = useAuth();
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [showJoinModal, setShowJoinModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Sample extracurricular activities data
  const activities = [
    {
      id: 1,
      name: 'School Band',
      category: 'Music',
      description: 'Join our school band and learn to play various musical instruments. Perform at school events and competitions.',
      instructor: 'Mr. Rajesh Kumar',
      instructorEmail: 'rajesh.kumar@school.edu',
      instructorPhone: '+91 9876543210',
      schedule: 'Monday, Wednesday, Friday',
      time: '3:30 PM - 5:00 PM',
      venue: 'Music Room 101',
      capacity: 25,
      enrolled: 18,
      maxLevel: 'Advanced',
      requirements: ['Basic music knowledge', 'Commitment to practice', 'Own instrument (optional)'],
      achievements: ['District Music Competition - 1st Place', 'State Band Festival - 2nd Place'],
      upcomingEvents: [
        { name: 'Annual Music Concert', date: '2024-02-15', type: 'Performance' },
        { name: 'Inter-School Band Competition', date: '2024-03-10', type: 'Competition' }
      ],
      status: 'active',
      image: '/placeholder.svg',
      tags: ['Music', 'Performance', 'Team Building']
    },
    {
      id: 2,
      name: 'Art & Craft Club',
      category: 'Arts',
      description: 'Express your creativity through various art forms including painting, sculpture, and digital art.',
      instructor: 'Ms. Priya Sharma',
      instructorEmail: 'priya.sharma@school.edu',
      instructorPhone: '+91 9876543211',
      schedule: 'Tuesday, Thursday',
      time: '4:00 PM - 5:30 PM',
      venue: 'Art Studio 205',
      capacity: 20,
      enrolled: 15,
      maxLevel: 'All Levels',
      requirements: ['Interest in art', 'Basic supplies provided'],
      achievements: ['National Art Exhibition - Best Display', 'City Art Festival - 3rd Place'],
      upcomingEvents: [
        { name: 'Art Exhibition', date: '2024-02-20', type: 'Exhibition' },
        { name: 'Painting Competition', date: '2024-03-05', type: 'Competition' }
      ],
      status: 'active',
      image: '/placeholder.svg',
      tags: ['Arts', 'Creativity', 'Exhibition']
    },
    {
      id: 3,
      name: 'Sports Club',
      category: 'Sports',
      description: 'Participate in various sports activities including cricket, football, basketball, and athletics.',
      instructor: 'Coach Amit Singh',
      instructorEmail: 'amit.singh@school.edu',
      instructorPhone: '+91 9876543212',
      schedule: 'Monday, Wednesday, Friday',
      time: '6:00 AM - 7:30 AM',
      venue: 'School Ground & Gymnasium',
      capacity: 40,
      enrolled: 35,
      maxLevel: 'All Levels',
      requirements: ['Sports shoes', 'Water bottle', 'Physical fitness'],
      achievements: ['District Cricket Championship - Winners', 'Inter-School Athletics - 2nd Place'],
      upcomingEvents: [
        { name: 'Annual Sports Meet', date: '2024-02-25', type: 'Competition' },
        { name: 'Cricket Tournament', date: '2024-03-15', type: 'Tournament' }
      ],
      status: 'active',
      image: '/placeholder.svg',
      tags: ['Sports', 'Fitness', 'Team Sports']
    },
    {
      id: 4,
      name: 'Debate Club',
      category: 'Academic',
      description: 'Develop public speaking skills and critical thinking through structured debates and discussions.',
      instructor: 'Dr. Meera Patel',
      instructorEmail: 'meera.patel@school.edu',
      instructorPhone: '+91 9876543213',
      schedule: 'Tuesday, Friday',
      time: '3:00 PM - 4:30 PM',
      venue: 'Debate Hall 301',
      capacity: 30,
      enrolled: 22,
      maxLevel: 'Intermediate',
      requirements: ['Good communication skills', 'Interest in current affairs'],
      achievements: ['State Debate Competition - 1st Place', 'National Youth Parliament - Best Speaker'],
      upcomingEvents: [
        { name: 'Inter-School Debate', date: '2024-02-18', type: 'Competition' },
        { name: 'Model UN Conference', date: '2024-03-12', type: 'Conference' }
      ],
      status: 'active',
      image: '/placeholder.svg',
      tags: ['Academic', 'Public Speaking', 'Critical Thinking']
    },
    {
      id: 5,
      name: 'Photography Club',
      category: 'Technology',
      description: 'Learn photography techniques, digital editing, and participate in photo walks and exhibitions.',
      instructor: 'Mr. Arjun Verma',
      instructorEmail: 'arjun.verma@school.edu',
      instructorPhone: '+91 9876543214',
      schedule: 'Saturday',
      time: '10:00 AM - 12:00 PM',
      venue: 'Photography Lab 401',
      capacity: 15,
      enrolled: 12,
      maxLevel: 'All Levels',
      requirements: ['Camera (phone camera acceptable)', 'Basic computer skills'],
      achievements: ['City Photography Contest - 1st Place', 'Nature Photography Award'],
      upcomingEvents: [
        { name: 'Photo Exhibition', date: '2024-02-28', type: 'Exhibition' },
        { name: 'Nature Photography Trip', date: '2024-03-20', type: 'Trip' }
      ],
      status: 'active',
      image: '/placeholder.svg',
      tags: ['Technology', 'Photography', 'Creative']
    },
    {
      id: 6,
      name: 'Science Club',
      category: 'Academic',
      description: 'Explore scientific concepts through experiments, projects, and participation in science fairs.',
      instructor: 'Dr. Sanjay Gupta',
      instructorEmail: 'sanjay.gupta@school.edu',
      instructorPhone: '+91 9876543215',
      schedule: 'Thursday, Saturday',
      time: '2:00 PM - 4:00 PM',
      venue: 'Science Lab 501',
      capacity: 25,
      enrolled: 20,
      maxLevel: 'Advanced',
      requirements: ['Interest in science', 'Lab safety awareness'],
      achievements: ['State Science Fair - Best Project', 'National Science Olympiad - 3rd Place'],
      upcomingEvents: [
        { name: 'Science Fair', date: '2024-02-22', type: 'Fair' },
        { name: 'Science Olympiad', date: '2024-03-08', type: 'Competition' }
      ],
      status: 'active',
      image: '/placeholder.svg',
      tags: ['Academic', 'Science', 'Experiments']
    }
  ];

  // Student's enrolled activities
  const enrolledActivities = [
    {
      id: 1,
      name: 'School Band',
      category: 'Music',
      enrollmentDate: '2024-01-15',
      attendance: 85,
      achievements: ['District Music Competition - 1st Place'],
      upcomingEvents: ['Annual Music Concert - Feb 15'],
      progress: 75,
      instructor: 'Mr. Rajesh Kumar'
    },
    {
      id: 3,
      name: 'Sports Club',
      category: 'Sports',
      enrollmentDate: '2024-01-10',
      attendance: 92,
      achievements: ['District Cricket Championship - Winners'],
      upcomingEvents: ['Annual Sports Meet - Feb 25'],
      progress: 88,
      instructor: 'Coach Amit Singh'
    }
  ];

  // Student's achievements
  const achievements = [
    {
      id: 1,
      title: 'District Music Competition - 1st Place',
      activity: 'School Band',
      date: '2024-01-20',
      description: 'Won first place in the district-level music competition playing the guitar.',
      certificate: 'certificate_music_2024.pdf',
      points: 100
    },
    {
      id: 2,
      title: 'District Cricket Championship - Winners',
      activity: 'Sports Club',
      date: '2024-01-15',
      description: 'Part of the winning team in the district cricket championship.',
      certificate: 'certificate_cricket_2024.pdf',
      points: 150
    },
    {
      id: 3,
      title: 'Best Attendance Award',
      activity: 'Sports Club',
      date: '2024-01-30',
      description: 'Achieved 95% attendance in sports activities.',
      certificate: 'certificate_attendance_2024.pdf',
      points: 50
    }
  ];

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'Music': return <Music className="h-5 w-5" />;
      case 'Arts': return <Palette className="h-5 w-5" />;
      case 'Sports': return <Dumbbell className="h-5 w-5" />;
      case 'Academic': return <BookOpen className="h-5 w-5" />;
      case 'Technology': return <Camera className="h-5 w-5" />;
      default: return <Activity className="h-5 w-5" />;
    }
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case 'Music': return 'bg-purple-100 text-purple-800';
      case 'Arts': return 'bg-pink-100 text-pink-800';
      case 'Sports': return 'bg-green-100 text-green-800';
      case 'Academic': return 'bg-blue-100 text-blue-800';
      case 'Technology': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'inactive': return 'bg-red-100 text-red-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const handleJoinActivity = (activity) => {
    setSelectedActivity(activity);
    setShowJoinModal(true);
  };

  const handleJoinSubmit = () => {
    // Handle join activity submission
    console.log('Joining activity:', selectedActivity);
    setShowJoinModal(false);
    setSelectedActivity(null);
  };

  const filteredActivities = activities.filter(activity =>
    activity.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    activity.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    activity.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPoints = achievements.reduce((sum, achievement) => sum + achievement.points, 0);
  const totalActivities = enrolledActivities.length;
  const averageAttendance = enrolledActivities.length > 0 
    ? enrolledActivities.reduce((sum, activity) => sum + activity.attendance, 0) / enrolledActivities.length 
    : 0;

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold tracking-tight mb-2">Extracurricular Activities</h1>
          <p className="text-muted-foreground">Explore and participate in various extracurricular activities to enhance your skills and interests</p>
        </div>

        {/* Overall Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Activities</p>
                  <p className="text-2xl font-bold">{totalActivities}</p>
                  <p className="text-sm text-blue-600 flex items-center gap-1">
                    <TrendingUp className="h-3 w-3" />
                    Enrolled
                  </p>
                </div>
                <Activity className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Achievement Points</p>
                  <p className="text-2xl font-bold text-green-600">{totalPoints}</p>
                  <p className="text-sm text-gray-600">Total earned</p>
                </div>
                <Trophy className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Average Attendance</p>
                  <p className="text-2xl font-bold text-purple-600">{Math.round(averageAttendance)}%</p>
                  <p className="text-sm text-gray-600">In activities</p>
                </div>
                <Users className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Available Activities</p>
                  <p className="text-2xl font-bold text-orange-600">{activities.length}</p>
                  <p className="text-sm text-gray-600">To explore</p>
                </div>
                <Plus className="h-8 w-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="available" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="available">Available Activities</TabsTrigger>
            <TabsTrigger value="enrolled">My Activities</TabsTrigger>
            <TabsTrigger value="achievements">Achievements</TabsTrigger>
            <TabsTrigger value="events">Upcoming Events</TabsTrigger>
          </TabsList>

          <TabsContent value="available" className="space-y-6">
            {/* Search and Filter */}
            <Card>
              <CardContent className="p-6">
                <div className="flex gap-4">
                  <div className="flex-1">
                    <Input
                      placeholder="Search activities..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full"
                    />
                  </div>
                  <Button variant="outline">
                    <Filter className="h-4 w-4 mr-2" />
                    Filter
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Activities Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredActivities.map((activity) => (
                <Card key={activity.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-2">
                        {getCategoryIcon(activity.category)}
                        <div>
                          <CardTitle className="text-lg">{activity.name}</CardTitle>
                          <Badge className={getCategoryColor(activity.category)}>
                            {activity.category}
                          </Badge>
                        </div>
                      </div>
                      <Badge className={getStatusColor(activity.status)}>
                        {activity.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                      {activity.description}
                    </p>
                    
                    <div className="space-y-3 mb-4">
                      <div className="flex items-center gap-2 text-sm">
                        <User className="h-4 w-4 text-gray-500" />
                        <span>{activity.instructor}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Calendar className="h-4 w-4 text-gray-500" />
                        <span>{activity.schedule}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Clock className="h-4 w-4 text-gray-500" />
                        <span>{activity.time}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <MapPin className="h-4 w-4 text-gray-500" />
                        <span>{activity.venue}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mb-4">
                      <div className="text-sm">
                        <span className="font-medium">{activity.enrolled}</span>
                        <span className="text-gray-500">/{activity.capacity} enrolled</span>
                      </div>
                      <Progress value={(activity.enrolled / activity.capacity) * 100} className="w-20" />
                    </div>

                    <div className="flex gap-2">
                      <Button 
                        onClick={() => handleJoinActivity(activity)}
                        className="flex-1"
                        disabled={activity.enrolled >= activity.capacity}
                      >
                        <Plus className="h-4 w-4 mr-1" />
                        {activity.enrolled >= activity.capacity ? 'Full' : 'Join'}
                      </Button>
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="enrolled" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {enrolledActivities.map((activity) => (
                <Card key={activity.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-2">
                        {getCategoryIcon(activity.category)}
                        <div>
                          <CardTitle className="text-lg">{activity.name}</CardTitle>
                          <Badge className={getCategoryColor(activity.category)}>
                            {activity.category}
                          </Badge>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Progress</span>
                        <span className="text-sm text-gray-600">{activity.progress}%</span>
                      </div>
                      <Progress value={activity.progress} className="w-full" />
                      
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Attendance</span>
                        <span className="text-sm text-gray-600">{activity.attendance}%</span>
                      </div>
                      <Progress value={activity.attendance} className="w-full" />
                      
                      <div className="space-y-2">
                        <div className="text-sm">
                          <span className="font-medium">Instructor:</span> {activity.instructor}
                        </div>
                        <div className="text-sm">
                          <span className="font-medium">Enrolled:</span> {formatDate(activity.enrollmentDate)}
                        </div>
                      </div>

                      {activity.achievements.length > 0 && (
                        <div>
                          <h4 className="text-sm font-medium mb-2">Recent Achievements</h4>
                          <div className="space-y-1">
                            {activity.achievements.map((achievement, index) => (
                              <div key={index} className="text-sm text-green-600 flex items-center gap-1">
                                <CheckCircle className="h-3 w-3" />
                                {achievement}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {activity.upcomingEvents.length > 0 && (
                        <div>
                          <h4 className="text-sm font-medium mb-2">Upcoming Events</h4>
                          <div className="space-y-1">
                            {activity.upcomingEvents.map((event, index) => (
                              <div key={index} className="text-sm text-blue-600 flex items-center gap-1">
                                <Calendar className="h-3 w-3" />
                                {event}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      <div className="flex gap-2">
                        <Button variant="outline" className="flex-1">
                          <Eye className="h-4 w-4 mr-1" />
                          View Details
                        </Button>
                        <Button variant="outline">
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="achievements" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {achievements.map((achievement) => (
                <Card key={achievement.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-2">
                        <Trophy className="h-5 w-5 text-yellow-600" />
                        <div>
                          <CardTitle className="text-lg">{achievement.title}</CardTitle>
                          <Badge className="bg-yellow-100 text-yellow-800">
                            {achievement.points} points
                          </Badge>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-gray-600">{formatDate(achievement.date)}</div>
                        <div className="text-sm font-medium">{achievement.activity}</div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 mb-4">{achievement.description}</p>
                    
                    <div className="flex gap-2">
                      <Button variant="outline" className="flex-1">
                        <Download className="h-4 w-4 mr-1" />
                        Download Certificate
                      </Button>
                      <Button variant="outline">
                        <Share2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="events" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {activities.flatMap(activity => 
                activity.upcomingEvents.map((event, index) => ({
                  ...event,
                  activityName: activity.name,
                  activityCategory: activity.category,
                  id: `${activity.id}-${index}`
                }))
              ).sort((a, b) => new Date(a.date) - new Date(b.date)).map((event) => (
                <Card key={event.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-5 w-5 text-blue-600" />
                        <div>
                          <CardTitle className="text-lg">{event.name}</CardTitle>
                          <Badge className={getCategoryColor(event.activityCategory)}>
                            {event.activityCategory}
                          </Badge>
                        </div>
                      </div>
                      <Badge className="bg-blue-100 text-blue-800">
                        {event.type}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-sm">
                        <Calendar className="h-4 w-4 text-gray-500" />
                        <span>{formatDate(event.date)}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Activity className="h-4 w-4 text-gray-500" />
                        <span>{event.activityName}</span>
                      </div>
                      
                      <div className="flex gap-2">
                        <Button variant="outline" className="flex-1">
                          <Calendar className="h-4 w-4 mr-1" />
                          Add to Calendar
                        </Button>
                        <Button variant="outline">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Join Activity Modal */}
        {showJoinModal && selectedActivity && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <Card className="w-full max-w-md mx-4">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Plus className="h-5 w-5" />
                  Join {selectedActivity.name}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Why do you want to join?</label>
                    <Textarea
                      placeholder="Tell us about your interest in this activity..."
                      rows={3}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Previous Experience (if any)</label>
                    <Textarea
                      placeholder="Describe any relevant experience..."
                      rows={2}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Commitment Level</label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option value="high">High - Can attend regularly</option>
                      <option value="medium">Medium - Can attend most sessions</option>
                      <option value="low">Low - Limited availability</option>
                    </select>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button onClick={handleJoinSubmit} className="flex-1">
                      <CheckCircle className="h-4 w-4 mr-1" />
                      Join Activity
                    </Button>
                    <Button 
                      variant="outline" 
                      onClick={() => setShowJoinModal(false)}
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default ExtracurricularPage; 