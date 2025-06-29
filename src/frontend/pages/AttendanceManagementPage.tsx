import React, { useState } from 'react';
import { useAuth } from '@/backend/contexts/AuthContext';
import DashboardLayout from '@/frontend/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Calendar, 
  Clock, 
  CheckCircle, 
  XCircle, 
  AlertTriangle,
  FileText,
  Upload,
  Download,
  BarChart3,
  TrendingUp,
  TrendingDown,
  User,
  Mail,
  Phone,
  MapPin,
  Plus,
  Edit,
  Trash2,
  Eye,
  Send,
  BookOpen
} from 'lucide-react';

const AttendanceManagementPage = () => {
  const { user } = useAuth();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [leaveApplication, setLeaveApplication] = useState({
    fromDate: '',
    toDate: '',
    reason: '',
    type: 'sick',
    description: ''
  });

  // Sample attendance data
  const attendanceData = {
    overall: {
      present: 85,
      absent: 8,
      late: 3,
      total: 96,
      percentage: 88.5
    },
    monthly: [
      { month: 'Jan', present: 22, absent: 2, late: 1 },
      { month: 'Feb', present: 20, absent: 3, late: 2 },
      { month: 'Mar', present: 21, absent: 1, late: 0 },
      { month: 'Apr', present: 22, absent: 2, late: 0 }
    ],
    subjectWise: [
      { subject: 'Mathematics', present: 42, absent: 2, percentage: 95.5 },
      { subject: 'Physics', present: 40, absent: 4, percentage: 90.9 },
      { subject: 'Chemistry', present: 43, absent: 1, percentage: 97.7 },
      { subject: 'English', present: 41, absent: 3, percentage: 93.2 },
      { subject: 'Computer Science', present: 44, absent: 0, percentage: 100 }
    ],
    recentRecords: [
      { date: '2024-01-15', status: 'present', subject: 'Mathematics', time: '08:00 AM' },
      { date: '2024-01-15', status: 'present', subject: 'Physics', time: '09:30 AM' },
      { date: '2024-01-14', status: 'absent', subject: 'Chemistry', time: '11:00 AM' },
      { date: '2024-01-14', status: 'late', subject: 'English', time: '12:30 PM' },
      { date: '2024-01-13', status: 'present', subject: 'Computer Science', time: '02:00 PM' }
    ]
  };

  const leaveApplications = [
    {
      id: 1,
      fromDate: '2024-01-10',
      toDate: '2024-01-12',
      reason: 'Medical Emergency',
      type: 'sick',
      status: 'approved',
      description: 'Had to visit doctor for severe headache and fever',
      submittedAt: '2024-01-09T10:30:00',
      approvedBy: 'Mrs. Sharma',
      approvedAt: '2024-01-09T14:20:00'
    },
    {
      id: 2,
      fromDate: '2024-01-20',
      toDate: '2024-01-22',
      reason: 'Family Function',
      type: 'personal',
      status: 'pending',
      description: 'Attending cousin\'s wedding ceremony',
      submittedAt: '2024-01-15T09:15:00',
      approvedBy: null,
      approvedAt: null
    },
    {
      id: 3,
      fromDate: '2024-01-05',
      toDate: '2024-01-05',
      reason: 'Medical Checkup',
      type: 'medical',
      status: 'approved',
      description: 'Regular dental checkup appointment',
      submittedAt: '2024-01-04T16:45:00',
      approvedBy: 'Mr. Patel',
      approvedAt: '2024-01-04T18:30:00'
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'present': return 'bg-green-100 text-green-800';
      case 'absent': return 'bg-red-100 text-red-800';
      case 'late': return 'bg-yellow-100 text-yellow-800';
      case 'approved': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'present': return <CheckCircle className="h-4 w-4" />;
      case 'absent': return <XCircle className="h-4 w-4" />;
      case 'late': return <AlertTriangle className="h-4 w-4" />;
      case 'approved': return <CheckCircle className="h-4 w-4" />;
      case 'pending': return <Clock className="h-4 w-4" />;
      case 'rejected': return <XCircle className="h-4 w-4" />;
      default: return <AlertTriangle className="h-4 w-4" />;
    }
  };

  const getLeaveTypeColor = (type) => {
    switch (type) {
      case 'sick': return 'bg-red-100 text-red-800';
      case 'personal': return 'bg-blue-100 text-blue-800';
      case 'medical': return 'bg-purple-100 text-purple-800';
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

  const handleLeaveSubmit = () => {
    // Handle leave application submission
    console.log('Submitting leave application:', leaveApplication);
    // Reset form
    setLeaveApplication({
      fromDate: '',
      toDate: '',
      reason: '',
      type: 'sick',
      description: ''
    });
  };

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold tracking-tight mb-2">Attendance Management</h1>
          <p className="text-muted-foreground">Track your attendance, apply for leave, and view reports</p>
        </div>

        {/* Overall Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Overall Attendance</p>
                  <p className="text-2xl font-bold">{attendanceData.overall.percentage}%</p>
                  <p className="text-sm text-green-600 flex items-center gap-1">
                    <TrendingUp className="h-3 w-3" />
                    Good attendance
                  </p>
                </div>
                <Calendar className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Present Days</p>
                  <p className="text-2xl font-bold text-green-600">{attendanceData.overall.present}</p>
                  <p className="text-sm text-gray-600">Out of {attendanceData.overall.total} days</p>
                </div>
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Absent Days</p>
                  <p className="text-2xl font-bold text-red-600">{attendanceData.overall.absent}</p>
                  <p className="text-sm text-gray-600">Need to improve</p>
                </div>
                <XCircle className="h-8 w-8 text-red-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Late Arrivals</p>
                  <p className="text-2xl font-bold text-yellow-600">{attendanceData.overall.late}</p>
                  <p className="text-sm text-gray-600">Try to be on time</p>
                </div>
                <AlertTriangle className="h-8 w-8 text-yellow-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="subject-wise">Subject-wise</TabsTrigger>
            <TabsTrigger value="leave">Leave Applications</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Monthly Trend */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5" />
                    Monthly Attendance Trend
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {attendanceData.monthly.map((month, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <span className="font-medium">{month.month}</span>
                        <div className="flex items-center gap-4">
                          <span className="text-sm text-green-600">P: {month.present}</span>
                          <span className="text-sm text-red-600">A: {month.absent}</span>
                          <span className="text-sm text-yellow-600">L: {month.late}</span>
                          <span className="text-sm font-medium">
                            {Math.round((month.present / (month.present + month.absent + month.late)) * 100)}%
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Recent Records */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="h-5 w-5" />
                    Recent Attendance Records
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {attendanceData.recentRecords.map((record, index) => (
                      <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <div className="font-medium">{record.subject}</div>
                          <div className="text-sm text-gray-600">
                            {formatDate(record.date)} • {record.time}
                          </div>
                        </div>
                        <Badge className={getStatusColor(record.status)}>
                          {getStatusIcon(record.status)}
                          <span className="ml-1">{record.status}</span>
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="subject-wise" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {attendanceData.subjectWise.map((subject, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BookOpen className="h-5 w-5" />
                      {subject.subject}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="text-center">
                        <div className="text-3xl font-bold text-blue-600">{subject.percentage}%</div>
                        <div className="text-sm text-gray-600">Attendance Rate</div>
                      </div>
                      
                      <div className="grid grid-cols-3 gap-2 text-center">
                        <div>
                          <div className="text-lg font-bold text-green-600">{subject.present}</div>
                          <div className="text-xs text-gray-600">Present</div>
                        </div>
                        <div>
                          <div className="text-lg font-bold text-red-600">{subject.absent}</div>
                          <div className="text-xs text-gray-600">Absent</div>
                        </div>
                        <div>
                          <div className="text-lg font-bold text-gray-600">{subject.present + subject.absent}</div>
                          <div className="text-xs text-gray-600">Total</div>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" className="flex-1">
                          <Eye className="h-4 w-4 mr-1" />
                          View Details
                        </Button>
                        <Button size="sm" variant="outline">
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="leave" className="space-y-6">
            {/* Apply for Leave */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Plus className="h-5 w-5" />
                  Apply for Leave
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">From Date</label>
                    <Input
                      type="date"
                      value={leaveApplication.fromDate}
                      onChange={(e) => setLeaveApplication({...leaveApplication, fromDate: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">To Date</label>
                    <Input
                      type="date"
                      value={leaveApplication.toDate}
                      onChange={(e) => setLeaveApplication({...leaveApplication, toDate: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Leave Type</label>
                    <select
                      value={leaveApplication.type}
                      onChange={(e) => setLeaveApplication({...leaveApplication, type: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="sick">Sick Leave</option>
                      <option value="personal">Personal Leave</option>
                      <option value="medical">Medical Leave</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Reason</label>
                    <Input
                      placeholder="Brief reason for leave"
                      value={leaveApplication.reason}
                      onChange={(e) => setLeaveApplication({...leaveApplication, reason: e.target.value})}
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium mb-1">Detailed Description</label>
                    <Textarea
                      placeholder="Provide detailed explanation for your leave request..."
                      value={leaveApplication.description}
                      onChange={(e) => setLeaveApplication({...leaveApplication, description: e.target.value})}
                      rows={3}
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium mb-1">Medical Certificate (if applicable)</label>
                    <Input
                      type="file"
                      accept=".pdf,.jpg,.jpeg,.png"
                      className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <Button onClick={handleLeaveSubmit} className="w-full">
                      <Send className="h-4 w-4 mr-1" />
                      Submit Leave Application
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Leave Applications History */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Leave Applications History
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {leaveApplications.map((application) => (
                    <div key={application.id} className="border rounded-lg p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h4 className="font-medium">{application.reason}</h4>
                            <Badge className={getStatusColor(application.status)}>
                              {getStatusIcon(application.status)}
                              <span className="ml-1">{application.status}</span>
                            </Badge>
                            <Badge className={getLeaveTypeColor(application.type)}>
                              {application.type}
                            </Badge>
                          </div>
                          <div className="text-sm text-gray-600 mb-2">
                            {formatDate(application.fromDate)} - {formatDate(application.toDate)}
                          </div>
                          <p className="text-sm text-gray-700 mb-2">{application.description}</p>
                          <div className="text-xs text-gray-500">
                            Submitted: {formatDate(application.submittedAt)}
                            {application.approvedBy && (
                              <span> • Approved by: {application.approvedBy}</span>
                            )}
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            <Eye className="h-4 w-4" />
                          </Button>
                          {application.status === 'pending' && (
                            <Button size="sm" variant="outline">
                              <Edit className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reports" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Download className="h-5 w-5" />
                    Download Reports
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <Button variant="outline" className="w-full justify-start">
                      <FileText className="h-4 w-4 mr-2" />
                      Monthly Attendance Report
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <FileText className="h-4 w-4 mr-2" />
                      Subject-wise Attendance Report
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <FileText className="h-4 w-4 mr-2" />
                      Leave Application History
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <FileText className="h-4 w-4 mr-2" />
                      Academic Year Summary
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5" />
                    Attendance Analytics
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-3 bg-blue-50 rounded-lg">
                      <h4 className="font-medium text-blue-800 mb-2">Performance Insights</h4>
                      <ul className="text-sm text-blue-700 space-y-1">
                        <li>• Attendance rate above 85% - Excellent!</li>
                        <li>• Most consistent in Computer Science (100%)</li>
                        <li>• Need to improve Physics attendance</li>
                        <li>• Only 3 late arrivals this term</li>
                      </ul>
                    </div>
                    
                    <div className="p-3 bg-green-50 rounded-lg">
                      <h4 className="font-medium text-green-800 mb-2">Recommendations</h4>
                      <ul className="text-sm text-green-700 space-y-1">
                        <li>• Maintain current attendance pattern</li>
                        <li>• Plan ahead for any upcoming absences</li>
                        <li>• Continue punctual arrival</li>
                        <li>• Consider joining study groups for weak subjects</li>
                      </ul>
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

export default AttendanceManagementPage; 