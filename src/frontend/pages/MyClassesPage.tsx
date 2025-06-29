import React, { useState } from 'react';
import DashboardLayout from '@/frontend/components/layout/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Users, 
  BookOpen, 
  Clock, 
  MapPin, 
  Calendar, 
  ClipboardList, 
  Trophy, 
  TrendingUp,
  User,
  CheckCircle,
  XCircle,
  AlertCircle
} from 'lucide-react';
import { Link } from 'react-router-dom';

// Mock data for teacher classes
const mockTeacherClasses = [
  {
    id: 1,
    name: 'Class 10-A',
    subject: 'Mathematics',
    students: 32,
    schedule: 'Mon, Wed, Fri - 9:00 AM',
    room: 'Room 101',
    attendance: 94.5,
    assignments: 3,
    nextClass: 'Today, 9:00 AM',
    description: 'Advanced Mathematics for Class 10 students focusing on algebra, geometry, and trigonometry.',
    studentsList: [
      { id: 1, name: 'Aarav Sharma', roll: '01', attendance: 95, performance: 88, assignments: 8 },
      { id: 2, name: 'Priya Patel', roll: '02', attendance: 92, performance: 92, assignments: 9 },
      { id: 3, name: 'Rahul Kumar', roll: '03', attendance: 89, performance: 85, assignments: 7 },
      { id: 4, name: 'Ananya Singh', roll: '04', attendance: 98, performance: 95, assignments: 10 },
      { id: 5, name: 'Vikram Mehta', roll: '05', attendance: 87, performance: 82, assignments: 6 }
    ]
  },
  {
    id: 2,
    name: 'Class 9-B',
    subject: 'Mathematics',
    students: 28,
    schedule: 'Tue, Thu - 10:30 AM',
    room: 'Room 102',
    attendance: 91.2,
    assignments: 2,
    nextClass: 'Tomorrow, 10:30 AM',
    description: 'Foundation Mathematics for Class 9 students covering basic algebra and geometry concepts.',
    studentsList: [
      { id: 6, name: 'Sneha Reddy', roll: '01', attendance: 94, performance: 89, assignments: 7 },
      { id: 7, name: 'Arjun Verma', roll: '02', attendance: 91, performance: 87, assignments: 8 },
      { id: 8, name: 'Zara Khan', roll: '03', attendance: 88, performance: 84, assignments: 6 },
      { id: 9, name: 'Aditya Joshi', roll: '04', attendance: 96, performance: 91, assignments: 9 },
      { id: 10, name: 'Maya Gupta', roll: '05', attendance: 85, performance: 79, assignments: 5 }
    ]
  },
  {
    id: 3,
    name: 'Class 11-C',
    subject: 'Advanced Mathematics',
    students: 25,
    schedule: 'Mon, Wed, Fri - 2:00 PM',
    room: 'Room 201',
    attendance: 96.8,
    assignments: 1,
    nextClass: 'Today, 2:00 PM',
    description: 'Higher Secondary Mathematics including calculus, statistics, and advanced algebra.',
    studentsList: [
      { id: 11, name: 'Riya Malhotra', roll: '01', attendance: 97, performance: 93, assignments: 9 },
      { id: 12, name: 'Karan Singh', roll: '02', attendance: 95, performance: 90, assignments: 8 },
      { id: 13, name: 'Pooja Sharma', roll: '03', attendance: 92, performance: 88, assignments: 7 },
      { id: 14, name: 'Dev Patel', roll: '04', attendance: 99, performance: 96, assignments: 10 },
      { id: 15, name: 'Neha Kapoor', roll: '05', attendance: 89, performance: 85, assignments: 6 }
    ]
  },
  {
    id: 4,
    name: 'Class 8-A',
    subject: 'Mathematics',
    students: 35,
    schedule: 'Tue, Thu, Sat - 11:45 AM',
    room: 'Room 103',
    attendance: 88.9,
    assignments: 4,
    nextClass: 'Tomorrow, 11:45 AM',
    description: 'Basic Mathematics for Class 8 students with focus on arithmetic and basic geometry.',
    studentsList: [
      { id: 16, name: 'Aisha Khan', roll: '01', attendance: 90, performance: 86, assignments: 7 },
      { id: 17, name: 'Rohan Das', roll: '02', attendance: 87, performance: 83, assignments: 6 },
      { id: 18, name: 'Ishita Roy', roll: '03', attendance: 93, performance: 89, assignments: 8 },
      { id: 19, name: 'Vedant Kumar', roll: '04', attendance: 85, performance: 81, assignments: 5 },
      { id: 20, name: 'Tanvi Singh', roll: '05', attendance: 91, performance: 87, assignments: 7 }
    ]
  }
];

const MyClassesPage = () => {
  const [selectedClass, setSelectedClass] = useState(mockTeacherClasses[0]);

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto py-8 px-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-bold">My Classes</h1>
            <p className="text-muted-foreground">Manage your classes, students, and academic activities</p>
          </div>
          <div className="flex gap-2">
            <Button asChild variant="outline">
              <Link to="/assignments">Create Assignment</Link>
            </Button>
            <Button asChild>
              <Link to="/attendance-management">Take Attendance</Link>
            </Button>
          </div>
        </div>

        <div className="grid gap-6 grid-cols-1 lg:grid-cols-3">
          {/* Class List */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5" />
                  My Classes
                </CardTitle>
                <CardDescription>Select a class to view details</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {mockTeacherClasses.map((cls) => (
                    <div
                      key={cls.id}
                      className={`p-4 border rounded-lg cursor-pointer transition-all hover:shadow-md ${
                        selectedClass.id === cls.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                      }`}
                      onClick={() => setSelectedClass(cls)}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-semibold text-lg">{cls.name}</h3>
                        <Badge variant={cls.attendance >= 90 ? 'default' : 'secondary'}>
                          {cls.attendance}%
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{cls.subject}</p>
                      <div className="flex items-center gap-4 text-sm">
                        <div className="flex items-center gap-1">
                          <Users className="h-4 w-4" />
                          <span>{cls.students}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          <span>{cls.schedule}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Class Details */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-2xl">{selectedClass.name}</CardTitle>
                    <CardDescription className="text-lg">{selectedClass.subject}</CardDescription>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-green-600">{selectedClass.attendance}%</div>
                    <div className="text-sm text-muted-foreground">Attendance Rate</div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="overview" className="w-full">
                  <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="students">Students</TabsTrigger>
                    <TabsTrigger value="attendance">Attendance</TabsTrigger>
                    <TabsTrigger value="assignments">Assignments</TabsTrigger>
                  </TabsList>

                  <TabsContent value="overview" className="space-y-4">
                    <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
                      <Card>
                        <CardHeader className="pb-3">
                          <CardTitle className="text-lg flex items-center gap-2">
                            <MapPin className="h-5 w-5" />
                            Class Information
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Room:</span>
                            <span className="font-medium">{selectedClass.room}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Schedule:</span>
                            <span className="font-medium">{selectedClass.schedule}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Next Class:</span>
                            <span className="font-medium text-blue-600">{selectedClass.nextClass}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Total Students:</span>
                            <span className="font-medium">{selectedClass.students}</span>
                          </div>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader className="pb-3">
                          <CardTitle className="text-lg flex items-center gap-2">
                            <TrendingUp className="h-5 w-5" />
                            Performance Stats
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Average Attendance:</span>
                            <span className="font-medium text-green-600">{selectedClass.attendance}%</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Active Assignments:</span>
                            <span className="font-medium">{selectedClass.assignments}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Class Average:</span>
                            <span className="font-medium text-blue-600">87.5%</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Top Performer:</span>
                            <span className="font-medium">Ananya Singh (95%)</span>
                          </div>
                        </CardContent>
                      </Card>
                    </div>

                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Class Description</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-muted-foreground">{selectedClass.description}</p>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="students" className="space-y-4">
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg font-semibold">Student List</h3>
                      <Button asChild size="sm" variant="outline">
                        <Link to="/gradebook">View Gradebook</Link>
                      </Button>
                    </div>
                    <div className="space-y-3">
                      {selectedClass.studentsList.map((student) => (
                        <div key={student.id} className="flex items-center justify-between p-4 border rounded-lg">
                          <div className="flex items-center gap-4">
                            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                              <User className="h-5 w-5 text-blue-600" />
                            </div>
                            <div>
                              <h4 className="font-medium">{student.name}</h4>
                              <p className="text-sm text-muted-foreground">Roll No: {student.roll}</p>
                            </div>
                          </div>
                          <div className="flex gap-6 text-sm">
                            <div className="text-center">
                              <div className="font-medium text-green-600">{student.attendance}%</div>
                              <div className="text-xs text-muted-foreground">Attendance</div>
                            </div>
                            <div className="text-center">
                              <div className="font-medium text-blue-600">{student.performance}%</div>
                              <div className="text-xs text-muted-foreground">Performance</div>
                            </div>
                            <div className="text-center">
                              <div className="font-medium text-amber-600">{student.assignments}</div>
                              <div className="text-xs text-muted-foreground">Assignments</div>
                            </div>
                          </div>
                          <Button asChild size="sm" variant="outline">
                            <Link to={`/students/${student.id}`}>View Profile</Link>
                          </Button>
                        </div>
                      ))}
                    </div>
                  </TabsContent>

                  <TabsContent value="attendance" className="space-y-4">
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg font-semibold">Attendance Management</h3>
                      <Button asChild>
                        <Link to="/attendance-management">Take Today's Attendance</Link>
                      </Button>
                    </div>
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Today's Attendance</CardTitle>
                        <CardDescription>Mark attendance for {selectedClass.name}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          {selectedClass.studentsList.slice(0, 5).map((student) => (
                            <div key={student.id} className="flex items-center justify-between p-3 border rounded-lg">
                              <div className="flex items-center gap-3">
                                <User className="h-5 w-5 text-gray-500" />
                                <div>
                                  <h4 className="font-medium">{student.name}</h4>
                                  <p className="text-sm text-muted-foreground">Roll No: {student.roll}</p>
                                </div>
                              </div>
                              <div className="flex gap-2">
                                <Button size="sm" variant="outline" className="text-green-600 hover:text-green-700">
                                  <CheckCircle className="h-4 w-4 mr-1" />
                                  Present
                                </Button>
                                <Button size="sm" variant="outline" className="text-red-600 hover:text-red-700">
                                  <XCircle className="h-4 w-4 mr-1" />
                                  Absent
                                </Button>
                                <Button size="sm" variant="outline" className="text-amber-600 hover:text-amber-700">
                                  <AlertCircle className="h-4 w-4 mr-1" />
                                  Late
                                </Button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="assignments" className="space-y-4">
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg font-semibold">Assignments</h3>
                      <Button asChild>
                        <Link to="/assignments">Create New Assignment</Link>
                      </Button>
                    </div>
                    <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-lg">Active Assignments</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-3">
                            <div className="p-3 border rounded-lg">
                              <h4 className="font-medium">Algebra Quiz</h4>
                              <p className="text-sm text-muted-foreground">Due: June 25, 2024</p>
                              <div className="mt-2 flex justify-between text-sm">
                                <span>Submissions: 28/32</span>
                                <Badge variant="default">87.5%</Badge>
                              </div>
                            </div>
                            <div className="p-3 border rounded-lg">
                              <h4 className="font-medium">Geometry Project</h4>
                              <p className="text-sm text-muted-foreground">Due: June 28, 2024</p>
                              <div className="mt-2 flex justify-between text-sm">
                                <span>Submissions: 22/28</span>
                                <Badge variant="secondary">78.6%</Badge>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader>
                          <CardTitle className="text-lg">Quick Actions</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-3">
                            <Button asChild className="w-full justify-start">
                              <Link to="/assignments">
                                <ClipboardList className="h-4 w-4 mr-2" />
                                Create Assignment
                              </Link>
                            </Button>
                            <Button asChild variant="outline" className="w-full justify-start">
                              <Link to="/gradebook">
                                <Trophy className="h-4 w-4 mr-2" />
                                Grade Assignments
                              </Link>
                            </Button>
                            <Button asChild variant="outline" className="w-full justify-start">
                              <Link to="/assignments">
                                <BookOpen className="h-4 w-4 mr-2" />
                                View All Assignments
                              </Link>
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default MyClassesPage; 