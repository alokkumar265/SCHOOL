import React, { useState } from 'react';
import DashboardLayout from '@/frontend/components/layout/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Users, 
  Calendar, 
  Clock, 
  MapPin, 
  BookOpen, 
  Trophy, 
  Eye, 
  Plus,
  Search,
  Filter,
  BarChart3,
  UserCheck,
  UserX,
  AlertCircle
} from 'lucide-react';

const TeacherClassesPage = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedClass, setSelectedClass] = useState(null);

  // Mock class data
  const classes = [
    {
      id: 1,
      name: 'Class 10-A',
      subject: 'Mathematics',
      students: 32,
      attendance: 94.5,
      performance: 88.2,
      room: 'Room 101',
      schedule: 'Mon, Wed, Fri - 9:00 AM',
      nextClass: 'Today, 9:00 AM',
      pendingAssignments: 2,
      recentActivity: 'Algebra Quiz graded - 28/32 submissions'
    },
    {
      id: 2,
      name: 'Class 9-B',
      subject: 'Mathematics',
      students: 28,
      attendance: 91.2,
      performance: 85.7,
      room: 'Room 102',
      schedule: 'Tue, Thu - 10:30 AM',
      nextClass: 'Tomorrow, 10:30 AM',
      pendingAssignments: 1,
      recentActivity: 'Geometry Project due - 22/28 submissions'
    },
    {
      id: 3,
      name: 'Class 11-C',
      subject: 'Advanced Mathematics',
      students: 25,
      attendance: 96.8,
      performance: 92.1,
      room: 'Room 201',
      schedule: 'Mon, Wed, Fri - 2:00 PM',
      nextClass: 'Today, 2:00 PM',
      pendingAssignments: 1,
      recentActivity: 'Calculus Assignment graded - 20/25 submissions'
    },
    {
      id: 4,
      name: 'Class 8-A',
      subject: 'Mathematics',
      students: 35,
      attendance: 88.9,
      performance: 82.5,
      room: 'Room 103',
      schedule: 'Tue, Thu, Sat - 11:45 AM',
      nextClass: 'Tomorrow, 11:45 AM',
      pendingAssignments: 1,
      recentActivity: 'Basic Math Test due - 30/35 submissions'
    }
  ];

  const students = [
    {
      id: 1,
      name: 'Aarav Sharma',
      class: 'Class 10-A',
      avatar: '/student-aarav.jpg',
      attendance: 95,
      performance: 88,
      assignments: 8,
      status: 'present'
    },
    {
      id: 2,
      name: 'Priya Patel',
      class: 'Class 10-A',
      avatar: '/student-priya.jpg',
      attendance: 92,
      performance: 92,
      assignments: 9,
      status: 'present'
    },
    {
      id: 3,
      name: 'Rahul Kumar',
      class: 'Class 9-B',
      avatar: '/student-rahul.jpg',
      attendance: 89,
      performance: 85,
      assignments: 7,
      status: 'absent'
    },
    {
      id: 4,
      name: 'Ananya Singh',
      class: 'Class 11-C',
      avatar: '/student-ananya.jpg',
      attendance: 98,
      performance: 95,
      assignments: 10,
      status: 'present'
    },
    {
      id: 5,
      name: 'Vikram Mehta',
      class: 'Class 8-A',
      avatar: '/student-vikram.jpg',
      attendance: 87,
      performance: 82,
      assignments: 6,
      status: 'late'
    }
  ];

  const getAttendanceColor = (attendance) => {
    if (attendance >= 95) return 'text-green-600 bg-green-100';
    if (attendance >= 90) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  const getPerformanceColor = (performance) => {
    if (performance >= 90) return 'text-green-600 bg-green-100';
    if (performance >= 80) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'present': return 'text-green-600 bg-green-100';
      case 'absent': return 'text-red-600 bg-red-100';
      case 'late': return 'text-yellow-600 bg-yellow-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const filteredClasses = classes.filter(cls => 
    cls.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cls.subject.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto py-8 px-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-bold">My Classes</h1>
            <p className="text-muted-foreground">Manage your classes, track student progress, and handle assignments</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Class
            </Button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid gap-4 grid-cols-1 md:grid-cols-4 mb-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Classes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{classes.length}</div>
              <p className="text-xs text-muted-foreground">Active classes</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Students</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {classes.reduce((sum, cls) => sum + cls.students, 0)}
              </div>
              <p className="text-xs text-muted-foreground">Across all classes</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Average Attendance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                {Math.round(classes.reduce((sum, cls) => sum + cls.attendance, 0) / classes.length)}%
              </div>
              <p className="text-xs text-muted-foreground">Overall attendance</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Pending Assignments</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">
                {classes.reduce((sum, cls) => sum + cls.pendingAssignments, 0)}
              </div>
              <p className="text-xs text-muted-foreground">To be graded</p>
            </CardContent>
          </Card>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Class Overview</TabsTrigger>
            <TabsTrigger value="students">Student Management</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search classes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Classes Grid */}
            <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {filteredClasses.map((cls) => (
                <Card key={cls.id} className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <CardTitle className="text-lg">{cls.name}</CardTitle>
                        <CardDescription className="mt-2">
                          {cls.subject}
                        </CardDescription>
                      </div>
                      <div className="flex flex-col gap-1">
                        <Badge className={getAttendanceColor(cls.attendance)}>
                          {cls.attendance}% Attendance
                        </Badge>
                        <Badge className={getPerformanceColor(cls.performance)}>
                          {cls.performance}% Performance
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-sm">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        <span>{cls.students} students</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <span>{cls.room}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span>{cls.schedule}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span>Next: {cls.nextClass}</span>
                      </div>
                      
                      <div className="pt-3 border-t">
                        <p className="text-xs text-muted-foreground mb-2">
                          Recent Activity: {cls.recentActivity}
                        </p>
                        <div className="flex items-center gap-2">
                          <Button size="sm" variant="outline" className="flex-1">
                            <Eye className="h-4 w-4 mr-2" />
                            View Details
                          </Button>
                          <Button size="sm" variant="outline">
                            <UserCheck className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="students" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Student Management</h2>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Student
              </Button>
            </div>

            <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {students.map((student) => (
                <Card key={student.id} className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={student.avatar} />
                        <AvatarFallback>{student.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <CardTitle className="text-lg">{student.name}</CardTitle>
                        <CardDescription>{student.class}</CardDescription>
                      </div>
                      <Badge className={getStatusColor(student.status)}>
                        {student.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span>Attendance:</span>
                        <span className="font-medium">{student.attendance}%</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Performance:</span>
                        <span className="font-medium">{student.performance}%</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Assignments:</span>
                        <span className="font-medium">{student.assignments}</span>
                      </div>
                      
                      <div className="flex items-center gap-2 pt-3 border-t">
                        <Button size="sm" variant="outline" className="flex-1">
                          <Eye className="h-4 w-4 mr-2" />
                          View Profile
                        </Button>
                        <Button size="sm" variant="outline">
                          <BarChart3 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Attendance Overview</CardTitle>
                  <CardDescription>Overall attendance across all classes</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Present</span>
                      <span className="font-medium">85%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Absent</span>
                      <span className="font-medium">10%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Late</span>
                      <span className="font-medium">5%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Performance Analytics</CardTitle>
                  <CardDescription>Student vs. Class Average</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Math</span>
                      <div className="flex items-center gap-2">
                        <span className="font-medium">91/100</span>
                        <Badge className="text-green-600 bg-green-100">+3.2%</Badge>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Science</span>
                      <div className="flex items-center gap-2">
                        <span className="font-medium">88/100</span>
                        <Badge className="text-yellow-600 bg-yellow-100">-1.5%</Badge>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">English</span>
                      <div className="flex items-center gap-2">
                        <span className="font-medium">94/100</span>
                        <Badge className="text-green-600 bg-green-100">+2.8%</Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default TeacherClassesPage; 