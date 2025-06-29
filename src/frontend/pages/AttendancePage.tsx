import React, { useState } from 'react';
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Attendance, Student } from '@/types';
import { AttendanceChart } from '@/components/analytics/AttendanceChart';
import { TrendsChart } from '@/components/analytics/TrendsChart';
import { Check, Calendar as CalendarIcon, Search, Download, Filter, Users, UserCheck, Clock, CalendarCheck, CheckCircle, XCircle, AlertTriangle, TrendingUp, BarChart3, CalendarDays } from 'lucide-react';
import DashboardLayout from '@/frontend/components/layout/DashboardLayout';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';

const mockAttendance = {
  overall: {
    present: 85,
    absent: 8,
    late: 5,
    total: 98,
    percentage: 86.7
  },
  bySubject: [
    { subject: 'Mathematics', present: 18, absent: 1, late: 1, total: 20, percentage: 90 },
    { subject: 'Science', present: 17, absent: 2, late: 1, total: 20, percentage: 85 },
    { subject: 'English', present: 19, absent: 0, late: 1, total: 20, percentage: 95 },
    { subject: 'History', present: 16, absent: 3, late: 1, total: 20, percentage: 80 },
    { subject: 'Geography', present: 15, absent: 2, late: 3, total: 20, percentage: 75 }
  ],
  monthly: [
    { month: 'September', present: 22, absent: 1, late: 2, total: 25 },
    { month: 'October', present: 20, absent: 2, late: 1, total: 23 },
    { month: 'November', present: 21, absent: 1, late: 2, total: 24 },
    { month: 'December', present: 18, absent: 3, late: 1, total: 22 },
    { month: 'January', present: 4, absent: 1, late: 0, total: 5 }
  ],
  recent: [
    { date: '2024-01-15', status: 'present', subject: 'Mathematics', time: '08:30 AM' },
    { date: '2024-01-14', status: 'present', subject: 'Science', time: '08:25 AM' },
    { date: '2024-01-13', status: 'late', subject: 'English', time: '08:45 AM' },
    { date: '2024-01-12', status: 'present', subject: 'History', time: '08:28 AM' },
    { date: '2024-01-11', status: 'absent', subject: 'Geography', time: 'N/A' },
    { date: '2024-01-10', status: 'present', subject: 'Mathematics', time: '08:32 AM' },
    { date: '2024-01-09', status: 'present', subject: 'Science', time: '08:27 AM' },
    { date: '2024-01-08', status: 'late', subject: 'English', time: '08:42 AM' }
  ]
};

const getStatusIcon = (status) => {
  switch (status) {
    case 'present':
      return <CheckCircle className="h-4 w-4 text-green-500" />;
    case 'absent':
      return <XCircle className="h-4 w-4 text-red-500" />;
    case 'late':
      return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
    default:
      return <Clock className="h-4 w-4 text-gray-500" />;
  }
};

const getStatusBadge = (status) => {
  switch (status) {
    case 'present':
      return <Badge className="bg-green-100 text-green-800">Present</Badge>;
    case 'absent':
      return <Badge className="bg-red-100 text-red-800">Absent</Badge>;
    case 'late':
      return <Badge className="bg-yellow-100 text-yellow-800">Late</Badge>;
    default:
      return <Badge variant="outline">Unknown</Badge>;
  }
};

const getAttendanceColor = (percentage) => {
  if (percentage >= 90) return 'text-green-600';
  if (percentage >= 80) return 'text-blue-600';
  if (percentage >= 70) return 'text-yellow-600';
  return 'text-red-600';
};

const AttendancePage = () => {
  const [date, setDate] = useState<Date>(new Date());
  const [selectedClass, setSelectedClass] = useState<string>("");
  const [selectedSection, setSelectedSection] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("daily");
  const { toast } = useToast();
  
  // Mock data
  const classes = ['6', '7', '8', '9', '10', '11', '12'];
  const sections = ['A', 'B', 'C', 'D'];
  
  const mockStudents: Student[] = [
    { 
      id: '1', userId: '1', admissionNumber: 'VPS-2023-001', rollNumber: '101',
      guardianName: 'John Smith', guardianContact: '+91 9876543210',
      class: '10', section: 'A', address: '123 Main Street, Delhi',
      dateOfBirth: '2005-05-15', admissionDate: '2022-04-01', bloodGroup: 'O+'
    },
    { 
      id: '2', userId: '2', admissionNumber: 'VPS-2023-002', rollNumber: '102',
      guardianName: 'Robert Williams', guardianContact: '+91 9876543211',
      class: '10', section: 'A', address: '456 Park Avenue, Delhi',
      dateOfBirth: '2005-06-22', admissionDate: '2022-04-01', bloodGroup: 'A+'
    },
    { 
      id: '3', userId: '3', admissionNumber: 'VPS-2023-003', rollNumber: '103',
      guardianName: 'Michael Johnson', guardianContact: '+91 9876543212',
      class: '9', section: 'B', address: '789 Oak Lane, Delhi',
      dateOfBirth: '2006-03-10', admissionDate: '2022-04-02', bloodGroup: 'B+'
    },
  ];
  
  const [attendanceData, setAttendanceData] = useState<Record<string, 'present' | 'absent' | 'late' | 'excused'>>({
    '1': 'present',
    '2': 'present',
    '3': 'absent'
  });

  // Attendance statistics
  const attendanceStats = [
    { name: 'Present', value: 85, color: '#4ade80' },
    { name: 'Absent', value: 10, color: '#f87171' },
    { name: 'Late', value: 5, color: '#facc15' },
  ];
  
  const attendanceTrends = [
    { month: 'Jan', attendance: 92, performance: 88 },
    { month: 'Feb', attendance: 88, performance: 92 },
    { month: 'Mar', attendance: 95, performance: 90 },
    { month: 'Apr', attendance: 85, performance: 85 },
    { month: 'May', attendance: 90, performance: 88 },
    { month: 'Jun', attendance: 88, performance: 91 },
  ];

  const handleAttendanceChange = (studentId: string, status: 'present' | 'absent' | 'late' | 'excused') => {
    setAttendanceData(prev => ({
      ...prev,
      [studentId]: status
    }));
  };

  const handleSaveAttendance = () => {
    toast({
      title: "Attendance Saved",
      description: `Attendance for ${format(date, 'PPP')} has been saved successfully.`
    });
  };

  const filteredStudents = mockStudents.filter(student => {
    const matchesClass = selectedClass ? student.class === selectedClass : true;
    const matchesSection = selectedSection ? student.section === selectedSection : true;
    const matchesSearch = student.admissionNumber.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          student.rollNumber.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesClass && matchesSection && matchesSearch;
  });

  const [selectedMonth, setSelectedMonth] = useState('all');

  const getAttendanceStatus = (percentage) => {
    if (percentage >= 95) return { status: 'Excellent', color: 'text-green-600 bg-green-100' };
    if (percentage >= 90) return { status: 'Good', color: 'text-blue-600 bg-blue-100' };
    if (percentage >= 80) return { status: 'Satisfactory', color: 'text-yellow-600 bg-yellow-100' };
    return { status: 'Needs Improvement', color: 'text-red-600 bg-red-100' };
  };

  const currentStatus = getAttendanceStatus(mockAttendance.overall.percentage);

  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto py-8">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold">My Attendance</h1>
            <p className="text-muted-foreground">Track your attendance and punctuality</p>
          </div>
          <div className="flex items-center gap-2">
            <Badge className={currentStatus.color}>
              {currentStatus.status}
            </Badge>
          </div>
        </div>

        {/* Overall Attendance Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Overall Attendance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockAttendance.overall.percentage}%</div>
              <p className="text-xs text-muted-foreground">
                {mockAttendance.overall.present} of {mockAttendance.overall.total} days
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Present Days</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{mockAttendance.overall.present}</div>
              <p className="text-xs text-muted-foreground">Days attended</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Absent Days</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">{mockAttendance.overall.absent}</div>
              <p className="text-xs text-muted-foreground">Days missed</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Late Arrivals</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600">{mockAttendance.overall.late}</div>
              <p className="text-xs text-muted-foreground">Times late</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="by-subject">By Subject</TabsTrigger>
            <TabsTrigger value="recent">Recent Records</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-6">
            {/* Monthly Attendance Chart */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CalendarDays className="h-5 w-5" />
                  Monthly Attendance Trend
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockAttendance.monthly.map((month, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex justify-between text-sm mb-1">
                          <span className="font-medium">{month.month}</span>
                          <span>{Math.round((month.present / month.total) * 100)}%</span>
                        </div>
                        <Progress 
                          value={(month.present / month.total) * 100} 
                          className="h-2"
                        />
                      </div>
                      <div className="ml-4 text-right text-sm text-muted-foreground">
                        <div>{month.present}/{month.total}</div>
                        <div className="text-xs">
                          {month.absent > 0 && <span className="text-red-600">{month.absent} absent</span>}
                          {month.late > 0 && <span className="text-yellow-600 ml-1">{month.late} late</span>}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Attendance Breakdown */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm font-medium">Attendance Breakdown</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span className="text-sm">Present</span>
                      </div>
                      <span className="font-medium">{mockAttendance.overall.present}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <XCircle className="h-4 w-4 text-red-500" />
                        <span className="text-sm">Absent</span>
                      </div>
                      <span className="font-medium">{mockAttendance.overall.absent}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <AlertTriangle className="h-4 w-4 text-yellow-500" />
                        <span className="text-sm">Late</span>
                      </div>
                      <span className="font-medium">{mockAttendance.overall.late}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-sm font-medium">Attendance Goals</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Target: 95%</span>
                        <span>{mockAttendance.overall.percentage}%</span>
                      </div>
                      <Progress 
                        value={mockAttendance.overall.percentage} 
                        className="h-2"
                      />
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {mockAttendance.overall.percentage >= 95 
                        ? "Excellent! You're meeting your attendance goals."
                        : `You need ${Math.ceil((95 - mockAttendance.overall.percentage) / 100 * mockAttendance.overall.total)} more present days to reach 95%`
                      }
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-sm font-medium">Quick Stats</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Best Month:</span>
                      <span className="font-medium">October (87%)</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Most Absent Subject:</span>
                      <span className="font-medium">Geography</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Average Arrival Time:</span>
                      <span className="font-medium">8:32 AM</span>
                    </div>
                    <div className="flex justify-between">
                      <span>School Days:</span>
                      <span className="font-medium">{mockAttendance.overall.total}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="by-subject" className="space-y-6">
            <div className="grid gap-6">
              {mockAttendance.bySubject.map((subject, index) => (
                <Card key={index} className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <CardTitle className="text-lg">{subject.subject}</CardTitle>
                        <p className="text-sm text-muted-foreground mt-1">
                          {subject.present} present, {subject.absent} absent, {subject.late} late
                        </p>
                      </div>
                      <div className="text-right">
                        <div className={`text-2xl font-bold ${getAttendanceColor(subject.percentage)}`}>
                          {subject.percentage}%
                        </div>
                        <div className="text-xs text-muted-foreground">Attendance</div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Attendance Rate</span>
                          <span>{subject.percentage}%</span>
                        </div>
                        <Progress 
                          value={subject.percentage} 
                          className="h-2"
                        />
                      </div>
                      
                      <div className="grid grid-cols-3 gap-4 text-center">
                        <div className="p-2 bg-green-50 rounded">
                          <div className="text-green-600 font-bold">{subject.present}</div>
                          <div className="text-xs text-green-600">Present</div>
                        </div>
                        <div className="p-2 bg-red-50 rounded">
                          <div className="text-red-600 font-bold">{subject.absent}</div>
                          <div className="text-xs text-red-600">Absent</div>
                        </div>
                        <div className="p-2 bg-yellow-50 rounded">
                          <div className="text-yellow-600 font-bold">{subject.late}</div>
                          <div className="text-xs text-yellow-600">Late</div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="recent" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Recent Attendance Records
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {mockAttendance.recent.map((record, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        {getStatusIcon(record.status)}
                        <div>
                          <div className="font-medium">{record.subject}</div>
                          <div className="text-sm text-muted-foreground">
                            {new Date(record.date).toLocaleDateString('en-US', { 
                              weekday: 'short', 
                              month: 'short', 
                              day: 'numeric' 
                            })}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="text-right">
                          <div className="text-sm font-medium">{record.time}</div>
                          <div className="text-xs text-muted-foreground">Arrival time</div>
                        </div>
                        {getStatusBadge(record.status)}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default AttendancePage;
