import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  FileText, 
  Download,
  TrendingUp,
  TrendingDown,
  Calendar,
  Clock,
  Award,
  AlertCircle,
  BarChart3,
  PieChart,
  LineChart,
  CheckCircle,
  Users
} from 'lucide-react';
import DashboardLayout from '@/frontend/components/layout/DashboardLayout';

interface AcademicReport {
  id: string;
  type: 'Mid-Term' | 'Final' | 'Unit Test' | 'Annual';
  subject: string;
  grade: string;
  percentage: number;
  rank: number;
  totalStudents: number;
  date: string;
  teacher: string;
  comments: string;
}

interface AttendanceReport {
  id: string;
  month: string;
  totalDays: number;
  presentDays: number;
  absentDays: number;
  attendancePercentage: number;
  subjects: {
    subject: string;
    attendance: number;
  }[];
}

const ReportsPage = () => {
  const [selectedReport, setSelectedReport] = useState('academic');

  // Mock data
  const academicReports: AcademicReport[] = [
    {
      id: '1',
      type: 'Mid-Term',
      subject: 'Mathematics',
      grade: 'A',
      percentage: 92,
      rank: 3,
      totalStudents: 45,
      date: '2024-02-15',
      teacher: 'Dr. Sarah Johnson',
      comments: 'Excellent performance in calculus. Shows strong problem-solving skills.'
    },
    {
      id: '2',
      type: 'Unit Test',
      subject: 'Physics',
      grade: 'A-',
      percentage: 88,
      rank: 5,
      totalStudents: 45,
      date: '2024-02-20',
      teacher: 'Dr. Michael Chen',
      comments: 'Good understanding of mechanics concepts. Needs improvement in numerical problems.'
    },
    {
      id: '3',
      type: 'Final',
      subject: 'Chemistry',
      grade: 'B+',
      percentage: 85,
      rank: 8,
      totalStudents: 45,
      date: '2024-01-30',
      teacher: 'Dr. Emily Davis',
      comments: 'Solid performance in organic chemistry. Lab work is commendable.'
    }
  ];

  const attendanceReports: AttendanceReport[] = [
    {
      id: '1',
      month: 'March 2024',
      totalDays: 22,
      presentDays: 21,
      absentDays: 1,
      attendancePercentage: 95.5,
      subjects: [
        { subject: 'Mathematics', attendance: 96 },
        { subject: 'Physics', attendance: 94 },
        { subject: 'Chemistry', attendance: 93 },
        { subject: 'English', attendance: 97 }
      ]
    },
    {
      id: '2',
      month: 'February 2024',
      totalDays: 20,
      presentDays: 19,
      absentDays: 1,
      attendancePercentage: 95,
      subjects: [
        { subject: 'Mathematics', attendance: 95 },
        { subject: 'Physics', attendance: 94 },
        { subject: 'Chemistry', attendance: 96 },
        { subject: 'English', attendance: 95 }
      ]
    }
  ];

  const getGradeColor = (grade: string) => {
    if (grade.startsWith('A')) return 'text-green-600';
    if (grade.startsWith('B')) return 'text-blue-600';
    if (grade.startsWith('C')) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getPerformanceTrend = (percentage: number) => {
    if (percentage >= 90) return { trend: 'up', color: 'text-green-600', text: 'Excellent' };
    if (percentage >= 80) return { trend: 'up', color: 'text-blue-600', text: 'Good' };
    if (percentage >= 70) return { trend: 'stable', color: 'text-yellow-600', text: 'Average' };
    return { trend: 'down', color: 'text-red-600', text: 'Needs Improvement' };
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Reports</h1>
            <p className="text-gray-600 mt-2">View and download your academic and attendance reports</p>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="outline">
              <Calendar className="h-4 w-4 mr-2" />
              Generate Report
            </Button>
            <Button>
              <Download className="h-4 w-4 mr-2" />
              Download All
            </Button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="bg-blue-100 p-2 rounded-lg">
                  <Award className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Average Grade</p>
                  <p className="text-xl font-semibold">A-</p>
                  <p className="text-xs text-green-600">+2% from last month</p>
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
                  <p className="text-sm text-gray-500">Class Rank</p>
                  <p className="text-xl font-semibold">#3</p>
                  <p className="text-xs text-green-600">Top 10%</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="bg-purple-100 p-2 rounded-lg">
                  <Clock className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Attendance</p>
                  <p className="text-xl font-semibold">95.5%</p>
                  <p className="text-xs text-green-600">Excellent</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="bg-orange-100 p-2 rounded-lg">
                  <FileText className="h-5 w-5 text-orange-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Reports</p>
                  <p className="text-xl font-semibold">{academicReports.length}</p>
                  <p className="text-xs text-gray-500">This semester</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="academic" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="academic">Academic Reports</TabsTrigger>
            <TabsTrigger value="attendance">Attendance Reports</TabsTrigger>
          </TabsList>

          {/* Academic Reports Tab */}
          <TabsContent value="academic" className="space-y-6">
            <div className="space-y-4">
              {academicReports.map((report) => {
                const performance = getPerformanceTrend(report.percentage);
                return (
                  <Card key={report.id} className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <h3 className="text-lg font-semibold">{report.subject}</h3>
                            <Badge variant="outline">{report.type}</Badge>
                            <span className={`font-bold text-lg ${getGradeColor(report.grade)}`}>
                              {report.grade}
                            </span>
                            <Badge className={performance.color}>
                              {performance.text}
                            </Badge>
                          </div>
                          
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600 mb-4">
                            <div className="flex items-center space-x-2">
                              <BarChart3 className="h-4 w-4" />
                              <span>Score: {report.percentage}%</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Award className="h-4 w-4" />
                              <span>Rank: #{report.rank}/{report.totalStudents}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Calendar className="h-4 w-4" />
                              <span>{new Date(report.date).toLocaleDateString()}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Users className="h-4 w-4" />
                              <span>{report.teacher}</span>
                            </div>
                          </div>

                          <div className="space-y-2">
                            <div className="flex items-center justify-between text-sm">
                              <span>Performance</span>
                              <span className="font-semibold">{report.percentage}%</span>
                            </div>
                            <Progress value={report.percentage} className="h-2" />
                          </div>

                          <div className="mt-4">
                            <h4 className="font-medium text-gray-900 mb-2">Teacher Comments</h4>
                            <p className="text-sm text-gray-600">{report.comments}</p>
                          </div>
                        </div>
                        
                        <div className="flex flex-col items-end space-y-2">
                          <div className="flex items-center space-x-2">
                            {performance.trend === 'up' && <TrendingUp className="h-4 w-4 text-green-600" />}
                            {performance.trend === 'down' && <TrendingDown className="h-4 w-4 text-red-600" />}
                            {performance.trend === 'stable' && <BarChart3 className="h-4 w-4 text-yellow-600" />}
                          </div>
                          
                          <div className="flex space-x-2">
                            <Button variant="outline" size="sm">
                              <FileText className="h-4 w-4 mr-2" />
                              View Details
                            </Button>
                            <Button variant="outline" size="sm">
                              <Download className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>

          {/* Attendance Reports Tab */}
          <TabsContent value="attendance" className="space-y-6">
            <div className="space-y-4">
              {attendanceReports.map((report) => (
                <Card key={report.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="text-lg font-semibold">{report.month}</h3>
                          <Badge className={report.attendancePercentage >= 95 ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}>
                            {report.attendancePercentage >= 95 ? 'Excellent' : 'Good'}
                          </Badge>
                        </div>
                        
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600 mb-4">
                          <div className="flex items-center space-x-2">
                            <Calendar className="h-4 w-4" />
                            <span>Total Days: {report.totalDays}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <CheckCircle className="h-4 w-4 text-green-500" />
                            <span>Present: {report.presentDays}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <AlertCircle className="h-4 w-4 text-red-500" />
                            <span>Absent: {report.absentDays}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Clock className="h-4 w-4" />
                            <span>Attendance: {report.attendancePercentage}%</span>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <div className="flex items-center justify-between text-sm">
                            <span>Overall Attendance</span>
                            <span className="font-semibold">{report.attendancePercentage}%</span>
                          </div>
                          <Progress value={report.attendancePercentage} className="h-2" />
                        </div>

                        <div className="mt-4">
                          <h4 className="font-medium text-gray-900 mb-2">Subject-wise Attendance</h4>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {report.subjects.map((subject, index) => (
                              <div key={index} className="space-y-1">
                                <p className="text-sm font-medium">{subject.subject}</p>
                                <div className="flex items-center space-x-2">
                                  <Progress value={subject.attendance} className="h-1 flex-1" />
                                  <span className="text-xs text-gray-500">{subject.attendance}%</span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex flex-col items-end space-y-2">
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">
                            <BarChart3 className="h-4 w-4 mr-2" />
                            View Chart
                          </Button>
                          <Button variant="outline" size="sm">
                            <Download className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Report Generation */}
        <Card>
          <CardHeader>
            <CardTitle>Generate Custom Reports</CardTitle>
            <CardDescription>Create personalized reports for specific time periods or subjects</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Report Type</label>
                <select className="w-full border border-gray-300 rounded-lg px-3 py-2">
                  <option value="">Select report type</option>
                  <option value="academic">Academic Performance</option>
                  <option value="attendance">Attendance Report</option>
                  <option value="comprehensive">Comprehensive Report</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Time Period</label>
                <select className="w-full border border-gray-300 rounded-lg px-3 py-2">
                  <option value="">Select period</option>
                  <option value="week">This Week</option>
                  <option value="month">This Month</option>
                  <option value="semester">This Semester</option>
                  <option value="custom">Custom Range</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Subject</label>
                <select className="w-full border border-gray-300 rounded-lg px-3 py-2">
                  <option value="">All Subjects</option>
                  <option value="mathematics">Mathematics</option>
                  <option value="physics">Physics</option>
                  <option value="chemistry">Chemistry</option>
                  <option value="english">English</option>
                </select>
              </div>
            </div>
            <div className="flex space-x-2 mt-4">
              <Button>
                <FileText className="h-4 w-4 mr-2" />
                Generate Report
              </Button>
              <Button variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Export Data
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default ReportsPage; 