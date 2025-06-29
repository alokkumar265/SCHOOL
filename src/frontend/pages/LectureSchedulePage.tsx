import React, { useState } from 'react';
import DashboardLayout from '@/frontend/components/layout/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Users, 
  BookOpen, 
  Plus,
  Edit,
  Trash2,
  CheckCircle,
  AlertCircle,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { Link } from 'react-router-dom';

// Mock lecture schedule data
const mockLectureSchedule = [
  {
    id: 1,
    class: 'Class 10-A',
    subject: 'Mathematics',
    day: 'Monday',
    time: '09:00 - 10:30',
    room: 'Room 101',
    students: 32,
    status: 'scheduled',
    topics: ['Algebra', 'Quadratic Equations'],
    materials: ['Textbook Chapter 4', 'Practice Problems']
  },
  {
    id: 2,
    class: 'Class 11-C',
    subject: 'Advanced Mathematics',
    day: 'Monday',
    time: '14:00 - 15:30',
    room: 'Room 201',
    students: 25,
    status: 'scheduled',
    topics: ['Calculus', 'Derivatives'],
    materials: ['Calculus Textbook', 'Online Resources']
  },
  {
    id: 3,
    class: 'Class 9-B',
    subject: 'Mathematics',
    day: 'Tuesday',
    time: '10:30 - 12:00',
    room: 'Room 102',
    students: 28,
    status: 'scheduled',
    topics: ['Geometry', 'Triangles'],
    materials: ['Geometry Workbook', 'Drawing Tools']
  },
  {
    id: 4,
    class: 'Class 8-A',
    subject: 'Mathematics',
    day: 'Tuesday',
    time: '11:45 - 13:15',
    room: 'Room 103',
    students: 35,
    status: 'scheduled',
    topics: ['Basic Algebra', 'Linear Equations'],
    materials: ['Basic Math Textbook', 'Worksheets']
  },
  {
    id: 5,
    class: 'Class 10-A',
    subject: 'Mathematics',
    day: 'Wednesday',
    time: '09:00 - 10:30',
    room: 'Room 101',
    students: 32,
    status: 'scheduled',
    topics: ['Geometry', 'Circles'],
    materials: ['Geometry Textbook', 'Compass']
  },
  {
    id: 6,
    class: 'Class 11-C',
    subject: 'Advanced Mathematics',
    day: 'Wednesday',
    time: '14:00 - 15:30',
    room: 'Room 201',
    students: 25,
    status: 'scheduled',
    topics: ['Integration', 'Definite Integrals'],
    materials: ['Calculus Textbook', 'Integration Tables']
  },
  {
    id: 7,
    class: 'Class 9-B',
    subject: 'Mathematics',
    day: 'Thursday',
    time: '10:30 - 12:00',
    room: 'Room 102',
    students: 28,
    status: 'scheduled',
    topics: ['Statistics', 'Mean and Median'],
    materials: ['Statistics Workbook', 'Calculator']
  },
  {
    id: 8,
    class: 'Class 8-A',
    subject: 'Mathematics',
    day: 'Thursday',
    time: '11:45 - 13:15',
    room: 'Room 103',
    students: 35,
    status: 'scheduled',
    topics: ['Fractions', 'Decimal Operations'],
    materials: ['Basic Math Textbook', 'Fraction Cards']
  },
  {
    id: 9,
    class: 'Class 10-A',
    subject: 'Mathematics',
    day: 'Friday',
    time: '09:00 - 10:30',
    room: 'Room 101',
    students: 32,
    status: 'scheduled',
    topics: ['Trigonometry', 'Sine and Cosine'],
    materials: ['Trigonometry Textbook', 'Scientific Calculator']
  },
  {
    id: 10,
    class: 'Class 11-C',
    subject: 'Advanced Mathematics',
    day: 'Friday',
    time: '14:00 - 15:30',
    room: 'Room 201',
    students: 25,
    status: 'scheduled',
    topics: ['Vectors', 'Vector Operations'],
    materials: ['Advanced Math Textbook', 'Vector Diagrams']
  },
  {
    id: 11,
    class: 'Class 8-A',
    subject: 'Mathematics',
    day: 'Saturday',
    time: '11:45 - 13:15',
    room: 'Room 103',
    students: 35,
    status: 'scheduled',
    topics: ['Review Session', 'Practice Problems'],
    materials: ['Review Materials', 'Practice Tests']
  }
];

const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const LectureSchedulePage = () => {
  const [selectedDay, setSelectedDay] = useState('Monday');
  const [viewMode, setViewMode] = useState('weekly');

  const getStatusColor = (status) => {
    switch (status) {
      case 'scheduled': return 'text-green-600 bg-green-100';
      case 'completed': return 'text-blue-600 bg-blue-100';
      case 'cancelled': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getDaySchedule = (day) => {
    return mockLectureSchedule.filter(lecture => lecture.day === day);
  };

  const getCurrentDaySchedule = () => {
    const today = new Date().toLocaleDateString('en-US', { weekday: 'long' });
    return getDaySchedule(today);
  };

  const getNextLecture = () => {
    const now = new Date();
    const currentTime = now.getHours() * 60 + now.getMinutes();
    
    return mockLectureSchedule.find(lecture => {
      const [start] = lecture.time.split(' - ');
      const [hours, minutes] = start.split(':');
      const lectureTime = parseInt(hours) * 60 + parseInt(minutes);
      return lectureTime > currentTime;
    });
  };

  const nextLecture = getNextLecture();

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto py-8 px-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-bold">Lecture Schedule</h1>
            <p className="text-muted-foreground">Manage your lecture schedules and class timings</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Calendar className="h-4 w-4 mr-2" />
              Export Schedule
            </Button>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Lecture
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
              <div className="text-2xl font-bold">{mockLectureSchedule.length}</div>
              <p className="text-xs text-muted-foreground">This week</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Today's Classes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{getCurrentDaySchedule().length}</div>
              <p className="text-xs text-muted-foreground">Scheduled</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Next Lecture</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-lg font-bold">{nextLecture?.class || 'None'}</div>
              <p className="text-xs text-muted-foreground">{nextLecture?.time || 'No more today'}</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Students</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {mockLectureSchedule.reduce((sum, lecture) => sum + lecture.students, 0)}
              </div>
              <p className="text-xs text-muted-foreground">Across all classes</p>
            </CardContent>
          </Card>
        </div>

        <Tabs value={viewMode} onValueChange={setViewMode} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="weekly">Weekly View</TabsTrigger>
            <TabsTrigger value="daily">Daily View</TabsTrigger>
            <TabsTrigger value="list">List View</TabsTrigger>
          </TabsList>

          <TabsContent value="weekly" className="space-y-6">
            <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {daysOfWeek.map((day) => (
                <Card key={day} className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Calendar className="h-5 w-5 text-blue-600" />
                      {day}
                    </CardTitle>
                    <CardDescription>
                      {getDaySchedule(day).length} classes scheduled
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {getDaySchedule(day).map((lecture) => (
                        <div key={lecture.id} className="p-3 border rounded-lg">
                          <div className="flex justify-between items-start mb-2">
                            <h4 className="font-medium text-sm">{lecture.class}</h4>
                            <Badge className={getStatusColor(lecture.status)}>
                              {lecture.status}
                            </Badge>
                          </div>
                          <p className="text-xs text-muted-foreground mb-1">{lecture.subject}</p>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <Clock className="h-3 w-3" />
                            <span>{lecture.time}</span>
                          </div>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <MapPin className="h-3 w-3" />
                            <span>{lecture.room}</span>
                          </div>
                        </div>
                      ))}
                      {getDaySchedule(day).length === 0 && (
                        <div className="text-center py-4 text-muted-foreground">
                          <Calendar className="h-8 w-8 mx-auto mb-2 opacity-50" />
                          <p className="text-sm">No classes scheduled</p>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="daily" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Daily Schedule</h2>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <span className="font-medium">{selectedDay}</span>
                <Button variant="outline" size="sm">
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="flex gap-2 mb-4">
              {daysOfWeek.map((day) => (
                <Button
                  key={day}
                  variant={selectedDay === day ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedDay(day)}
                >
                  {day.slice(0, 3)}
                </Button>
              ))}
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Schedule for {selectedDay}</CardTitle>
                <CardDescription>
                  {getDaySchedule(selectedDay).length} classes scheduled
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {getDaySchedule(selectedDay).map((lecture) => (
                    <div key={lecture.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                          <BookOpen className="h-6 w-6 text-blue-600" />
                        </div>
                        <div>
                          <h4 className="font-medium">{lecture.class}</h4>
                          <p className="text-sm text-muted-foreground">{lecture.subject}</p>
                          <div className="flex items-center gap-4 text-xs text-muted-foreground mt-1">
                            <span className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {lecture.time}
                            </span>
                            <span className="flex items-center gap-1">
                              <MapPin className="h-3 w-3" />
                              {lecture.room}
                            </span>
                            <span className="flex items-center gap-1">
                              <Users className="h-3 w-3" />
                              {lecture.students} students
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge className={getStatusColor(lecture.status)}>
                          {lecture.status}
                        </Badge>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <CheckCircle className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                  {getDaySchedule(selectedDay).length === 0 && (
                    <div className="text-center py-8 text-muted-foreground">
                      <Calendar className="h-12 w-12 mx-auto mb-4 opacity-50" />
                      <p className="text-lg">No classes scheduled for {selectedDay}</p>
                      <p className="text-sm">Enjoy your day off!</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="list" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">All Lectures</h2>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add New Lecture
              </Button>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Complete Lecture Schedule</CardTitle>
                <CardDescription>Manage all your scheduled lectures</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockLectureSchedule.map((lecture) => (
                    <div key={lecture.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                          <BookOpen className="h-6 w-6 text-blue-600" />
                        </div>
                        <div>
                          <h4 className="font-medium">{lecture.class}</h4>
                          <p className="text-sm text-muted-foreground">{lecture.subject}</p>
                          <div className="flex items-center gap-4 text-xs text-muted-foreground mt-1">
                            <span className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              {lecture.day}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {lecture.time}
                            </span>
                            <span className="flex items-center gap-1">
                              <MapPin className="h-3 w-3" />
                              {lecture.room}
                            </span>
                            <span className="flex items-center gap-1">
                              <Users className="h-3 w-3" />
                              {lecture.students} students
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge className={getStatusColor(lecture.status)}>
                          {lecture.status}
                        </Badge>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <CheckCircle className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Quick Actions */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common tasks for managing your lecture schedule</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Button asChild variant="outline" className="h-auto p-4 flex flex-col items-center gap-2">
                <Link to="/my-classes">
                  <div className="flex flex-col items-center gap-2">
                    <Users className="h-6 w-6" />
                    <span className="text-sm">View Classes</span>
                  </div>
                </Link>
              </Button>
              <Button asChild variant="outline" className="h-auto p-4 flex flex-col items-center gap-2">
                <Link to="/attendance-management">
                  <div className="flex flex-col items-center gap-2">
                    <CheckCircle className="h-6 w-6" />
                    <span className="text-sm">Take Attendance</span>
                  </div>
                </Link>
              </Button>
              <Button asChild variant="outline" className="h-auto p-4 flex flex-col items-center gap-2">
                <Link to="/assignments">
                  <div className="flex flex-col items-center gap-2">
                    <BookOpen className="h-6 w-6" />
                    <span className="text-sm">Create Assignment</span>
                  </div>
                </Link>
              </Button>
              <Button asChild variant="outline" className="h-auto p-4 flex flex-col items-center gap-2">
                <Link to="/gradebook">
                  <div className="flex flex-col items-center gap-2">
                    <AlertCircle className="h-6 w-6" />
                    <span className="text-sm">Grade Papers</span>
                  </div>
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default LectureSchedulePage; 