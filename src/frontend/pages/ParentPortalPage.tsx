import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  User, 
  BookOpen, 
  Calendar,
  Clock,
  TrendingUp,
  AlertCircle,
  MessageSquare,
  Phone,
  Mail,
  FileText,
  CreditCard,
  Award,
  Users
} from 'lucide-react';
import DashboardLayout from '@/frontend/components/layout/DashboardLayout';

interface StudentInfo {
  id: string;
  name: string;
  grade: string;
  section: string;
  rollNumber: string;
  photo: string;
}

interface AcademicRecord {
  subject: string;
  currentGrade: string;
  previousGrade: string;
  attendance: number;
  assignments: number;
  completedAssignments: number;
}

interface FeeRecord {
  id: string;
  description: string;
  amount: number;
  dueDate: string;
  status: 'Paid' | 'Pending' | 'Overdue';
  paidAmount?: number;
  paidDate?: string;
}

interface Communication {
  id: string;
  from: string;
  subject: string;
  message: string;
  date: string;
  isRead: boolean;
  priority: 'High' | 'Medium' | 'Low';
}

const ParentPortalPage = () => {
  const [selectedStudent, setSelectedStudent] = useState('1');

  // Mock data
  const students: StudentInfo[] = [
    {
      id: '1',
      name: 'Alex Johnson',
      grade: '10',
      section: 'A',
      rollNumber: '10A001',
      photo: '/placeholder.svg'
    },
    {
      id: '2',
      name: 'Sarah Johnson',
      grade: '8',
      section: 'B',
      rollNumber: '8B015',
      photo: '/placeholder.svg'
    }
  ];

  const academicRecords: AcademicRecord[] = [
    {
      subject: 'Mathematics',
      currentGrade: 'A',
      previousGrade: 'B+',
      attendance: 95,
      assignments: 12,
      completedAssignments: 11
    },
    {
      subject: 'Physics',
      currentGrade: 'A-',
      previousGrade: 'A',
      attendance: 92,
      assignments: 8,
      completedAssignments: 8
    },
    {
      subject: 'Chemistry',
      currentGrade: 'B+',
      previousGrade: 'B',
      attendance: 88,
      assignments: 10,
      completedAssignments: 9
    },
    {
      subject: 'English',
      currentGrade: 'A',
      previousGrade: 'A-',
      attendance: 96,
      assignments: 6,
      completedAssignments: 6
    }
  ];

  const feeRecords: FeeRecord[] = [
    {
      id: '1',
      description: 'Tuition Fee - March 2024',
      amount: 5000,
      dueDate: '2024-03-15',
      status: 'Paid',
      paidAmount: 5000,
      paidDate: '2024-03-10'
    },
    {
      id: '2',
      description: 'Library Fee',
      amount: 500,
      dueDate: '2024-03-20',
      status: 'Pending'
    },
    {
      id: '3',
      description: 'Laboratory Fee',
      amount: 1000,
      dueDate: '2024-03-25',
      status: 'Overdue'
    }
  ];

  const communications: Communication[] = [
    {
      id: '1',
      from: 'Mathematics Teacher',
      subject: 'Excellent Progress in Mathematics',
      message: 'Alex has shown remarkable improvement in mathematics this semester...',
      date: '2024-03-08',
      isRead: false,
      priority: 'High'
    },
    {
      id: '2',
      from: 'School Administration',
      subject: 'Parent-Teacher Meeting Schedule',
      message: 'We would like to schedule a parent-teacher meeting...',
      date: '2024-03-07',
      isRead: true,
      priority: 'Medium'
    },
    {
      id: '3',
      from: 'Sports Coach',
      subject: 'Sports Day Participation',
      message: 'Alex has been selected to participate in the upcoming sports day...',
      date: '2024-03-06',
      isRead: true,
      priority: 'Low'
    }
  ];

  const currentStudent = students.find(s => s.id === selectedStudent);

  const getGradeColor = (grade: string) => {
    if (grade.startsWith('A')) return 'text-green-600';
    if (grade.startsWith('B')) return 'text-blue-600';
    if (grade.startsWith('C')) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Paid': return 'bg-green-100 text-green-800';
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      case 'Overdue': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'bg-red-100 text-red-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const totalFees = feeRecords.reduce((sum, fee) => sum + fee.amount, 0);
  const paidFees = feeRecords
    .filter(fee => fee.status === 'Paid')
    .reduce((sum, fee) => sum + (fee.paidAmount || 0), 0);
  const pendingFees = totalFees - paidFees;

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Parent Portal</h1>
            <p className="text-gray-600 mt-2">Monitor your child's academic progress and stay connected with the school</p>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="outline">
              <MessageSquare className="h-4 w-4 mr-2" />
              Contact School
            </Button>
            <Button>
              <Phone className="h-4 w-4 mr-2" />
              Emergency Contact
            </Button>
          </div>
        </div>

        {/* Student Selection */}
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <User className="h-6 w-6 text-blue-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900">Select Student</h3>
                <p className="text-sm text-gray-600">Choose which child's information to view</p>
              </div>
              <select 
                value={selectedStudent} 
                onChange={(e) => setSelectedStudent(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2"
              >
                {students.map(student => (
                  <option key={student.id} value={student.id}>
                    {student.name} - Grade {student.grade}{student.section}
                  </option>
                ))}
              </select>
            </div>
          </CardContent>
        </Card>

        {/* Student Info */}
        {currentStudent && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <div className="bg-blue-100 p-2 rounded-lg">
                    <User className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Student</p>
                    <p className="font-semibold">{currentStudent.name}</p>
                    <p className="text-xs text-gray-500">Grade {currentStudent.grade}{currentStudent.section}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <div className="bg-green-100 p-2 rounded-lg">
                    <TrendingUp className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Average Grade</p>
                    <p className="font-semibold">A-</p>
                    <p className="text-xs text-green-600">+5% from last month</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <div className="bg-purple-100 p-2 rounded-lg">
                    <Calendar className="h-5 w-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Attendance</p>
                    <p className="font-semibold">93%</p>
                    <p className="text-xs text-gray-500">This month</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <div className="bg-orange-100 p-2 rounded-lg">
                    <AlertCircle className="h-5 w-5 text-orange-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Pending Fees</p>
                    <p className="font-semibold">₹{pendingFees.toLocaleString()}</p>
                    <p className="text-xs text-orange-600">Due soon</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Main Content */}
        <Tabs defaultValue="academics" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="academics">Academic Progress</TabsTrigger>
            <TabsTrigger value="fees">Fee Management</TabsTrigger>
            <TabsTrigger value="communications">Communications</TabsTrigger>
            <TabsTrigger value="attendance">Attendance</TabsTrigger>
          </TabsList>

          {/* Academic Progress Tab */}
          <TabsContent value="academics" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Subject-wise Performance */}
              <Card>
                <CardHeader>
                  <CardTitle>Subject-wise Performance</CardTitle>
                  <CardDescription>Current academic performance across all subjects</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {academicRecords.map((record, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-medium">{record.subject}</span>
                        <div className="flex items-center space-x-2">
                          <span className={`font-bold ${getGradeColor(record.currentGrade)}`}>
                            {record.currentGrade}
                          </span>
                          <span className="text-xs text-gray-500">
                            (was {record.previousGrade})
                          </span>
                        </div>
                      </div>
                      <div className="grid grid-cols-3 gap-4 text-sm">
                        <div>
                          <span className="text-gray-500">Attendance:</span>
                          <span className="ml-1 font-medium">{record.attendance}%</span>
                        </div>
                        <div>
                          <span className="text-gray-500">Assignments:</span>
                          <span className="ml-1 font-medium">{record.completedAssignments}/{record.assignments}</span>
                        </div>
                        <div>
                          <Progress value={(record.completedAssignments / record.assignments) * 100} className="h-2" />
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Recent Achievements */}
              <Card>
                <CardHeader>
                  <CardTitle>Recent Achievements</CardTitle>
                  <CardDescription>Latest accomplishments and recognitions</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                    <Award className="h-5 w-5 text-green-600" />
                    <div>
                      <p className="font-medium text-green-900">Mathematics Excellence Award</p>
                      <p className="text-sm text-green-700">Awarded for outstanding performance in mathematics</p>
                      <p className="text-xs text-green-600">March 8, 2024</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                    <Users className="h-5 w-5 text-blue-600" />
                    <div>
                      <p className="font-medium text-blue-900">Science Fair Winner</p>
                      <p className="text-sm text-blue-700">First place in the annual science fair competition</p>
                      <p className="text-xs text-blue-600">February 15, 2024</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-purple-50 rounded-lg">
                    <BookOpen className="h-5 w-5 text-purple-600" />
                    <div>
                      <p className="font-medium text-purple-900">Perfect Attendance</p>
                      <p className="text-sm text-purple-700">100% attendance for the month of February</p>
                      <p className="text-xs text-purple-600">February 29, 2024</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Fee Management Tab */}
          <TabsContent value="fees" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Fee Summary */}
              <Card>
                <CardHeader>
                  <CardTitle>Fee Summary</CardTitle>
                  <CardDescription>Overview of fee payments and dues</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Total Fees:</span>
                      <span className="font-semibold">₹{totalFees.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Paid:</span>
                      <span className="font-semibold text-green-600">₹{paidFees.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Pending:</span>
                      <span className="font-semibold text-orange-600">₹{pendingFees.toLocaleString()}</span>
                    </div>
                  </div>
                  <Progress value={(paidFees / totalFees) * 100} className="h-2" />
                  <Button className="w-full">
                    <CreditCard className="h-4 w-4 mr-2" />
                    Pay Fees Online
                  </Button>
                </CardContent>
              </Card>

              {/* Fee Details */}
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Fee Details</CardTitle>
                    <CardDescription>Detailed breakdown of all fee transactions</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {feeRecords.map((fee) => (
                        <div key={fee.id} className="flex items-center justify-between p-4 border rounded-lg">
                          <div className="flex-1">
                            <h4 className="font-medium">{fee.description}</h4>
                            <p className="text-sm text-gray-600">Due: {new Date(fee.dueDate).toLocaleDateString()}</p>
                            {fee.paidDate && (
                              <p className="text-sm text-green-600">Paid: {new Date(fee.paidDate).toLocaleDateString()}</p>
                            )}
                          </div>
                          <div className="text-right">
                            <p className="font-semibold">₹{fee.amount.toLocaleString()}</p>
                            <Badge className={getStatusColor(fee.status)}>
                              {fee.status}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Communications Tab */}
          <TabsContent value="communications" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>School Communications</CardTitle>
                <CardDescription>Messages and updates from teachers and administration</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {communications.map((comm) => (
                    <div key={comm.id} className={`p-4 border rounded-lg ${!comm.isRead ? 'bg-blue-50 border-blue-200' : ''}`}>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <h4 className="font-medium">{comm.subject}</h4>
                            <Badge className={getPriorityColor(comm.priority)}>
                              {comm.priority}
                            </Badge>
                            {!comm.isRead && (
                              <Badge variant="default" className="bg-blue-600">
                                New
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-gray-600 mb-2">From: {comm.from}</p>
                          <p className="text-gray-700">{comm.message}</p>
                          <p className="text-xs text-gray-500 mt-2">
                            {new Date(comm.date).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">
                            <Mail className="h-4 w-4 mr-2" />
                            Reply
                          </Button>
                          <Button variant="outline" size="sm">
                            <FileText className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Attendance Tab */}
          <TabsContent value="attendance" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Monthly Attendance */}
              <Card>
                <CardHeader>
                  <CardTitle>Monthly Attendance</CardTitle>
                  <CardDescription>Attendance overview for the current month</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span>Present Days</span>
                      <span className="font-semibold">21/22</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Absent Days</span>
                      <span className="font-semibold text-red-600">1</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Attendance Rate</span>
                      <span className="font-semibold text-green-600">95.5%</span>
                    </div>
                    <Progress value={95.5} className="h-2" />
                  </div>
                </CardContent>
              </Card>

              {/* Subject-wise Attendance */}
              <Card>
                <CardHeader>
                  <CardTitle>Subject-wise Attendance</CardTitle>
                  <CardDescription>Attendance breakdown by subject</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {academicRecords.map((record, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <span className="text-sm">{record.subject}</span>
                        <div className="flex items-center space-x-2">
                          <span className="text-sm font-medium">{record.attendance}%</span>
                          <Progress value={record.attendance} className="w-20 h-2" />
                        </div>
                      </div>
                    ))}
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

export default ParentPortalPage; 