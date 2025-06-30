import { useAuth } from '@/backend/contexts/AuthContext';
import DashboardLayout from '@/frontend/components/layout/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { User, Users, BookOpen, Calendar, Building, MessageSquare, TrendingUp, TrendingDown, GraduationCap, Network, Award, ClipboardList, Activity, Clock, Trophy, Bell, CreditCard, Briefcase, FileText, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { StatCard } from '@/components/analytics/DashboardStats';
import { AttendanceChart } from '@/components/analytics/AttendanceChart';
import { PerformanceChart } from '@/components/analytics/PerformanceChart';
import { TrendsChart } from '@/components/analytics/TrendsChart';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

// Place all mock data here so it's available everywhere
const mockStudent = {
  name: 'Aarav Sharma',
  class: '10',
  section: 'B',
  roll: '23',
  avatar: '',
};

// Teacher-specific mock data
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
    nextClass: 'Today, 9:00 AM'
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
    nextClass: 'Tomorrow, 10:30 AM'
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
    nextClass: 'Today, 2:00 PM'
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
    nextClass: 'Tomorrow, 11:45 AM'
  }
];

const mockTeacherStudents = [
  { id: 1, name: 'Aarav Sharma', class: '10-A', attendance: 95, performance: 88, assignments: 8 },
  { id: 2, name: 'Priya Patel', class: '10-A', attendance: 92, performance: 92, assignments: 9 },
  { id: 3, name: 'Rahul Kumar', class: '9-B', attendance: 89, performance: 85, assignments: 7 },
  { id: 4, name: 'Ananya Singh', class: '11-C', attendance: 98, performance: 95, assignments: 10 },
  { id: 5, name: 'Vikram Mehta', class: '8-A', attendance: 87, performance: 82, assignments: 6 }
];

const mockPendingAssignments = [
  { id: 1, title: 'Algebra Quiz', class: '10-A', dueDate: '2024-06-25', submissions: 28, total: 32 },
  { id: 2, title: 'Geometry Project', class: '9-B', dueDate: '2024-06-28', submissions: 22, total: 28 },
  { id: 3, title: 'Calculus Assignment', class: '11-C', dueDate: '2024-06-30', submissions: 20, total: 25 },
  { id: 4, title: 'Basic Math Test', class: '8-A', dueDate: '2024-07-02', submissions: 30, total: 35 }
];

const mockTeacherSchedule = [
  { day: 'Monday', classes: ['10-A (9:00 AM)', '11-C (2:00 PM)'] },
  { day: 'Tuesday', classes: ['9-B (10:30 AM)', '8-A (11:45 AM)'] },
  { day: 'Wednesday', classes: ['10-A (9:00 AM)', '11-C (2:00 PM)'] },
  { day: 'Thursday', classes: ['9-B (10:30 AM)', '8-A (11:45 AM)'] },
  { day: 'Friday', classes: ['10-A (9:00 AM)', '11-C (2:00 PM)'] },
  { day: 'Saturday', classes: ['8-A (11:45 AM)'] }
];

const mockAttendance = {
  overall: 92.3,
  subjectWise: [
    { subject: 'Math', percent: 95 },
    { subject: 'Science', percent: 90 },
    { subject: 'English', percent: 93 },
    { subject: 'History', percent: 89 },
    { subject: 'Geography', percent: 94 },
  ],
  trend: [92, 91, 93, 90, 92, 94, 95],
};

const mockGrades = {
  gpa: 3.8,
  subjectWise: [
    { subject: 'Math', grade: 'A', score: 91 },
    { subject: 'Science', grade: 'B+', score: 85 },
    { subject: 'English', grade: 'A+', score: 96 },
    { subject: 'History', grade: 'B', score: 78 },
    { subject: 'Geography', grade: 'A', score: 90 },
  ],
  trend: [3.6, 3.7, 3.8, 3.8, 3.9],
};
const mockAssignments = {
  due: 2,
  submitted: 18,
  overdue: 1,
  completion: 90,
};
const mockExams = {
  next: { name: 'Midterm Science', date: '2024-07-10' },
  recent: [
    { name: 'Math', score: 91, total: 100 },
    { name: 'English', score: 96, total: 100 },
    { name: 'History', score: 78, total: 100 },
  ],
};
const mockLibrary = {
  borrowed: 2,
  dueSoon: 1,
};
const mockFees = {
  paid: 24000,
  pending: 8000,
  overdue: 0,
};
const mockActivityFeed = [
  { type: 'grade', text: 'Received A+ in English', date: '2024-06-20' },
  { type: 'attendance', text: 'Present in all classes this week', date: '2024-06-18' },
  { type: 'assignment', text: 'Submitted Science Project', date: '2024-06-17' },
  { type: 'exam', text: 'Scored 91/100 in Math Exam', date: '2024-06-15' },
  { type: 'fee', text: 'Paid July Tuition Fee', date: '2024-06-10' },
];

// Mock data for charts
const mockAttendanceData = [
  { name: 'Present', value: 85, color: '#4ade80' },
  { name: 'Absent', value: 10, color: '#f87171' },
  { name: 'Late', value: 5, color: '#facc15' },
];

const mockPerformanceData = [
  { subject: 'Math', average: 85, classAverage: 78 },
  { subject: 'Science', average: 72, classAverage: 75 },
  { subject: 'English', average: 90, classAverage: 82 },
  { subject: 'History', average: 78, classAverage: 80 },
  { subject: 'Geography', average: 88, classAverage: 79 },
];

const mockTrendsData = [
  { month: 'Jan', attendance: 92, performance: 85 },
  { month: 'Feb', attendance: 88, performance: 83 },
  { month: 'Mar', attendance: 91, performance: 87 },
  { month: 'Apr', attendance: 85, performance: 80 },
  { month: 'May', attendance: 90, performance: 88 },
  { month: 'Jun', attendance: 95, performance: 90 },
];

// Time-based greeting function
const getTimeBasedGreeting = () => {
  const hour = new Date().getHours();
  
  if (hour >= 5 && hour < 12) {
    return 'Good morning';
  } else if (hour >= 12 && hour < 17) {
    return 'Good afternoon';
  } else if (hour >= 17 && hour < 22) {
    return 'Good evening';
  } else {
    return 'Good night';
  }
};

const Dashboard = () => {
  const { user } = useAuth();
  const [currentGreeting, setCurrentGreeting] = useState(getTimeBasedGreeting());
  
  // Update greeting every minute
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentGreeting(getTimeBasedGreeting());
    }, 60000); // Update every minute
    
    return () => clearInterval(interval);
  }, []);

  // Donation state for alumni
  const [donationAmount, setDonationAmount] = useState('');
  const [donationMessage, setDonationMessage] = useState('');
  const [donations, setDonations] = useState(() => {
    const saved = localStorage.getItem('alumniDonations');
    return saved ? JSON.parse(saved) : [];
  });
  const [donateLoading, setDonateLoading] = useState(false);

  useEffect(() => {
    localStorage.setItem('alumniDonations', JSON.stringify(donations));
  }, [donations]);

  const handleDonate = () => {
    if (!donationAmount || isNaN(Number(donationAmount)) || Number(donationAmount) <= 0) return;
    setDonateLoading(true);
    setTimeout(() => {
      setDonations(prev => [
        {
          amount: Number(donationAmount),
          message: donationMessage,
          date: new Date().toISOString(),
        },
        ...prev,
      ]);
      setDonationAmount('');
      setDonationMessage('');
      setDonateLoading(false);
    }, 800);
  };

  // Get display name based on user role
  const getDisplayName = () => {
    if (user?.role === 'admin') {
      return 'Administrator';
    }
    return user?.name || 'User';
  };

  // Get role display name
  const getRoleDisplayName = () => {
    switch (user?.role) {
      case 'admin':
        return 'Administrator';
      case 'teacher':
        return 'Teacher';
      case 'student':
        return 'Student';
      case 'alumni':
        return 'Alumni';
      case 'staff':
        return 'Staff';
      default:
        return 'User';
    }
  };

  // Mock data based on user role
  const getStatCards = () => {
    switch (user?.role) {
      case 'admin':
        return (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <StatCard
              title="Total Students"
              value="1,234"
              description="Active students in the system"
              icon={Users}
              trend={2.5}
            />
            <StatCard
              title="Departments"
              value="8"
              description="Academic departments"
              icon={Building}
              trend={0}
            />
            <StatCard
              title="Teachers"
              value="45"
              description="Active faculty members"
              icon={User}
              trend={1.8}
            />
            <StatCard
              title="Revenue"
              value="₹2.4M"
              description="This academic year"
              icon={TrendingUp}
              trend={5.2}
            />
          </div>
        );
      case 'teacher':
        return (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <StatCard
              title="My Classes"
              value="4"
              description="Active classes"
              icon={BookOpen}
              trend={0}
            />
            <StatCard
              title="My Students"
              value="120"
              description="Total students"
              icon={Users}
              trend={2.1}
            />
            <StatCard
              title="Assignments to Grade"
              value="8"
              description="Pending submissions"
              icon={ClipboardList}
              trend={-1.5}
            />
            <StatCard
              title="Upcoming Events"
              value="3"
              description="This week"
              icon={Calendar}
              trend={0.8}
            />
          </div>
        );
      case 'student':
        return (
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            <StatCard title="Attendance" value={`${mockAttendance.overall}%`} description="Overall attendance" icon={User} trend={1.2} color="text-green-600" />
            <StatCard title="Current GPA" value={mockGrades.gpa.toFixed(2)} description="Grade Point Average" icon={Award} trend={0.3} color="text-blue-600" />
            <StatCard title="Assignments" value={`${mockAssignments.submitted}/${mockAssignments.submitted + mockAssignments.due + mockAssignments.overdue}`} description="Submitted/Total" icon={BookOpen} trend={-0.5} color="text-amber-600" />
            <StatCard title="Fees Paid" value={`₹${mockFees.paid.toLocaleString()}`} description="This year" icon={TrendingUp} trend={0.8} color="text-green-700" />
          </div>
        );
      case 'alumni':
        return null; // Alumni doesn't need stat cards in the main area
      case 'staff':
        return (
          <div className="grid gap-4 grid-cols-1 md:grid-cols-3">
            <StatCard title="My Salary" value="₹45,000" description="Current Month" icon={CreditCard} trend={0.5} color="text-green-600" />
            <StatCard title="Salary History" value="12 Payments" description="Last 12 months" icon={FileText} trend={0.2} color="text-blue-600" />
            <StatCard title="Announcements" value="3" description="Unread" icon={Bell} trend={1.1} color="text-amber-600" />
          </div>
        );
      default:
        return null;
    }
  };

  // Charts based on user role
  const getCharts = () => {
    switch (user?.role) {
      case 'admin':
        return (
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
            <Card>
              <CardHeader><CardTitle>Student Enrollment Trends</CardTitle></CardHeader>
              <CardContent><TrendsChart data={mockTrendsData} /></CardContent>
            </Card>
            <Card>
              <CardHeader><CardTitle>Department Performance</CardTitle></CardHeader>
              <CardContent><PerformanceChart data={mockPerformanceData} /></CardContent>
            </Card>
            <Card>
              <CardHeader><CardTitle>Overall Attendance</CardTitle></CardHeader>
              <CardContent><AttendanceChart data={mockAttendanceData} /></CardContent>
            </Card>
            <Card>
              <CardHeader><CardTitle>Recent Activities</CardTitle></CardHeader>
              <CardContent>
                <ul className="space-y-1">
                  {mockActivityFeed.slice(0, 5).map((item, idx) => (
                    <li key={idx} className="flex justify-between text-sm">
                      <span>{item.text}</span>
                      <span className="text-muted-foreground">{item.date}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        );
      case 'teacher':
        return (
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
            <Card>
              <CardHeader><CardTitle>Class Attendance Overview</CardTitle></CardHeader>
              <CardContent><AttendanceChart data={mockAttendanceData} /></CardContent>
            </Card>
            <Card>
              <CardHeader><CardTitle>Student Performance</CardTitle></CardHeader>
              <CardContent><PerformanceChart data={mockPerformanceData} /></CardContent>
            </Card>
            <Card>
              <CardHeader><CardTitle>Assignment Submission Rate</CardTitle></CardHeader>
              <CardContent>
                <div className="flex flex-col items-center">
                  <div className="w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center text-2xl font-bold text-blue-600">
                    {mockAssignments.completion}%
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">Submission Rate</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader><CardTitle>Recent Exam Results</CardTitle></CardHeader>
              <CardContent>
                <ul className="space-y-1">
                  {mockExams.recent.map(exam => (
                    <li key={exam.name} className="flex justify-between">
                      <span>{exam.name}</span>
                      <span className="font-semibold">{exam.score}/{exam.total}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        );
      case 'student':
        return (
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
            <AttendanceChart data={mockAttendanceData} />
            <Card>
              <CardHeader><CardTitle>Performance by Subject</CardTitle></CardHeader>
              <CardContent><PerformanceChart data={mockPerformanceData} /></CardContent>
            </Card>
            <Card>
              <CardHeader><CardTitle>Assignment Completion</CardTitle></CardHeader>
              <CardContent>
                <div className="flex flex-col items-center">
                  <div className="w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center text-2xl font-bold text-blue-600">
                    {mockAssignments.completion}%
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">Completed</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader><CardTitle>Recent Exam Results</CardTitle></CardHeader>
              <CardContent>
                <ul className="space-y-1">
                  {mockExams.recent.map(exam => (
                    <li key={exam.name} className="flex justify-between">
                      <span>{exam.name}</span>
                      <span className="font-semibold">{exam.score}/{exam.total}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        );
      case 'alumni':
        return null; // Alumni has their own custom layout
      case 'staff':
        return (
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
            <Card>
              <CardHeader><CardTitle>Recent Announcements</CardTitle></CardHeader>
              <CardContent>
                <ul className="space-y-1">
                  <li className="flex justify-between text-sm"><span>Staff Meeting</span><span className="text-muted-foreground">Today</span></li>
                  <li className="flex justify-between text-sm"><span>Policy Update</span><span className="text-muted-foreground">2 days ago</span></li>
                  <li className="flex justify-between text-sm"><span>Holiday Notice</span><span className="text-muted-foreground">Last week</span></li>
                </ul>
              </CardContent>
            </Card>
            <Card>
              <CardHeader><CardTitle>Feedback</CardTitle></CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">You have 2 new feedback messages.</p>
              </CardContent>
            </Card>
          </div>
        );
      default:
        return null;
    }
  };

  // Teacher-specific comprehensive content
  const getTeacherContent = () => {
    return (
      <div className="space-y-6">
        {/* Greeting and teacher info */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold">{currentGreeting}, {user?.name || 'Teacher'}!</h2>
            <p className="text-muted-foreground">
              Mathematics Department | Senior Teacher
            </p>
          </div>
        </div>

        {/* Stat Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">My Classes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockTeacherClasses.length}</div>
              <p className="text-xs text-muted-foreground">Active classes</p>
              <Button asChild size="sm" variant="link" className="mt-2 p-0 h-auto">
                <Link to="/teacher-classes">View More</Link>
              </Button>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">My Students</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockTeacherStudents.length * mockTeacherClasses.length}</div>
              <p className="text-xs text-muted-foreground">Total students</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Assignments to Grade</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">{mockPendingAssignments.length}</div>
              <p className="text-xs text-muted-foreground">Pending submissions</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Upcoming Events</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">3</div>
              <p className="text-xs text-muted-foreground">This week</p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5" />
              Quick Actions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Button asChild variant="outline" className="h-auto p-4 flex flex-col items-center gap-2">
                <Link to="/teacher-assignments">
                  <ClipboardList className="h-6 w-6" />
                  <span className="text-sm">Add Assignment</span>
                </Link>
              </Button>
              <Button asChild variant="outline" className="h-auto p-4 flex flex-col items-center gap-2">
                <Link to="/attendance-management">
                  <Clock className="h-6 w-6" />
                  <span className="text-sm">Take Attendance</span>
                </Link>
              </Button>
              <Button asChild variant="outline" className="h-auto p-4 flex flex-col items-center gap-2">
                <Link to="/gradebook">
                  <Trophy className="h-6 w-6" />
                  <span className="text-sm">Grade Papers</span>
                </Link>
              </Button>
              <Button asChild variant="outline" className="h-auto p-4 flex flex-col items-center gap-2">
                <Link to="/announcements">
                  <Bell className="h-6 w-6" />
                  <span className="text-sm">Post Announcement</span>
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Analytics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Class Attendance Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <AttendanceChart data={mockAttendanceData} />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Student Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <PerformanceChart data={mockPerformanceData} />
            </CardContent>
          </Card>
        </div>
      </div>
    );
  };

  const getAdminContent = () => {
    return (
      <div className="space-y-6">
        {/* Welcome Section */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              Welcome back, {getDisplayName()}!
            </h1>
            <p className="text-muted-foreground">
              Here's what's happening with your school management system today.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">{currentGreeting}</span>
          </div>
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5" />
              Quick Actions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Button asChild variant="outline" className="h-auto p-4 flex flex-col items-center gap-2">
                <Link to="/users">
                  <Users className="h-6 w-6" />
                  <span className="text-sm">Manage Users</span>
                </Link>
              </Button>
              <Button asChild variant="outline" className="h-auto p-4 flex flex-col items-center gap-2">
                <Link to="/students">
                  <Users className="h-6 w-6" />
                  <span className="text-sm">Students</span>
                </Link>
              </Button>
              <Button asChild variant="outline" className="h-auto p-4 flex flex-col items-center gap-2">
                <Link to="/fees">
                  <CreditCard className="h-6 w-6" />
                  <span className="text-sm">Fee Management</span>
                </Link>
              </Button>
              <Button asChild variant="outline" className="h-auto p-4 flex flex-col items-center gap-2">
                <Link to="/announcements">
                  <Bell className="h-6 w-6" />
                  <span className="text-sm">Announcements</span>
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Analytics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>School Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <AttendanceChart data={mockAttendanceData} />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Academic Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <PerformanceChart data={mockPerformanceData} />
            </CardContent>
          </Card>
        </div>

        {/* Recent Activities */}
        <Card>
          <CardHeader>
            <CardTitle>Recent System Activities</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockActivityFeed.slice(0, 8).map((item, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-sm">{item.text}</span>
                  </div>
                  <span className="text-xs text-muted-foreground">{item.date}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  };

  const getAlumniContent = () => {
    return (
      <div className="space-y-6">
        {/* Welcome Section */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              Welcome back, {getDisplayName()}!
            </h1>
            <p className="text-muted-foreground">
              Stay connected with your alma mater and fellow alumni. Here's what's happening in the alumni community.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">{currentGreeting}</span>
          </div>
        </div>

        {/* Alumni Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Alumni Network</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">1,247</div>
              <p className="text-xs text-muted-foreground">Total alumni</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Upcoming Events</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">5</div>
              <p className="text-xs text-muted-foreground">This month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Mentorship</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-600">12</div>
              <p className="text-xs text-muted-foreground">Active mentors</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Job Postings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">8</div>
              <p className="text-xs text-muted-foreground">New opportunities</p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5" />
              Quick Actions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Button asChild variant="outline" className="h-auto p-4 flex flex-col items-center gap-2">
                <Link to="/alumni-directory">
                  <Users className="h-6 w-6" />
                  <span className="text-sm">Alumni Directory</span>
                </Link>
              </Button>
              <Button asChild variant="outline" className="h-auto p-4 flex flex-col items-center gap-2">
                <Link to="/events">
                  <Calendar className="h-6 w-6" />
                  <span className="text-sm">Events & Reunions</span>
                </Link>
              </Button>
              <Button asChild variant="outline" className="h-auto p-4 flex flex-col items-center gap-2">
                <Link to="/job-board">
                  <Briefcase className="h-6 w-6" />
                  <span className="text-sm">Job Board</span>
                </Link>
              </Button>
              <Button asChild variant="outline" className="h-auto p-4 flex flex-col items-center gap-2">
                <Link to="/mentorship">
                  <GraduationCap className="h-6 w-6" />
                  <span className="text-sm">Mentorship</span>
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Recent Activities & Updates */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Recent Alumni Activities</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-sm">Annual Alumni Meet registration opened</span>
                  </div>
                  <span className="text-xs text-muted-foreground">2 hours ago</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm">New job posting: Senior Developer at TechCorp</span>
                  </div>
                  <span className="text-xs text-muted-foreground">1 day ago</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    <span className="text-sm">Mentorship program applications closing soon</span>
                  </div>
                  <span className="text-xs text-muted-foreground">3 days ago</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                    <span className="text-sm">Alumni newsletter published</span>
                  </div>
                  <span className="text-xs text-muted-foreground">1 week ago</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Upcoming Events</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <h4 className="font-medium">Annual Alumni Meet 2024</h4>
                    <p className="text-sm text-muted-foreground">December 15, 2024</p>
                  </div>
                  <Button size="sm" variant="outline">Register</Button>
                </div>
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <h4 className="font-medium">Career Fair</h4>
                    <p className="text-sm text-muted-foreground">November 20, 2024</p>
                  </div>
                  <Button size="sm" variant="outline">Attend</Button>
                </div>
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <h4 className="font-medium">Mentorship Workshop</h4>
                    <p className="text-sm text-muted-foreground">November 10, 2024</p>
                  </div>
                  <Button size="sm" variant="outline">Join</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Alumni Network Stats */}
        <Card>
          <CardHeader>
            <CardTitle>Alumni Network Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">45%</div>
                <p className="text-sm text-muted-foreground">Alumni in Tech Industry</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">78%</div>
                <p className="text-sm text-muted-foreground">Active Alumni Network</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600 mb-2">23</div>
                <p className="text-sm text-muted-foreground">Countries Represented</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  };

  // Staff-specific content
  const getStaffContent = () => {
    return (
      <div className="space-y-6">
        {/* Greeting and staff info */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold">{currentGreeting}, {user?.name || 'Staff'}!</h2>
            <p className="text-muted-foreground">
              Department: {user?.department || 'Administration'}
            </p>
          </div>
        </div>

        {/* Stat Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <StatCard title="My Salary" value="₹45,000" description="Current Month" icon={CreditCard} trend={0.5} color="text-green-600" />
          <StatCard title="Salary History" value="12 Payments" description="Last 12 months" icon={FileText} trend={0.2} color="text-blue-600" />
          <StatCard title="Announcements" value="3" description="Unread" icon={Bell} trend={1.1} color="text-amber-600" />
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5" />
              Quick Actions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Button asChild variant="outline" className="h-auto p-4 flex flex-col items-center gap-2">
                <Link to="/salary-management">
                  <CreditCard className="h-6 w-6" />
                  <span className="text-sm">View Salary</span>
                </Link>
              </Button>
              <Button asChild variant="outline" className="h-auto p-4 flex flex-col items-center gap-2">
                <Link to="/profile">
                  <User className="h-6 w-6" />
                  <span className="text-sm">Profile</span>
                </Link>
              </Button>
              <Button asChild variant="outline" className="h-auto p-4 flex flex-col items-center gap-2">
                <Link to="/announcements">
                  <Bell className="h-6 w-6" />
                  <span className="text-sm">Announcements</span>
                </Link>
              </Button>
              <Button asChild variant="outline" className="h-auto p-4 flex flex-col items-center gap-2">
                <Link to="/feedback">
                  <MessageSquare className="h-6 w-6" />
                  <span className="text-sm">Feedback</span>
                </Link>
              </Button>
              <Button asChild variant="outline" className="h-auto p-4 flex flex-col items-center gap-2">
                <Link to="/settings">
                  <Settings className="h-6 w-6" />
                  <span className="text-sm">Settings</span>
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Analytics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card>
            <CardHeader><CardTitle>Recent Announcements</CardTitle></CardHeader>
            <CardContent>
              <ul className="space-y-1">
                <li className="flex justify-between text-sm"><span>Staff Meeting</span><span className="text-muted-foreground">Today</span></li>
                <li className="flex justify-between text-sm"><span>Policy Update</span><span className="text-muted-foreground">2 days ago</span></li>
                <li className="flex justify-between text-sm"><span>Holiday Notice</span><span className="text-muted-foreground">Last week</span></li>
              </ul>
            </CardContent>
          </Card>
          <Card>
            <CardHeader><CardTitle>Feedback</CardTitle></CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">You have 2 new feedback messages.</p>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  };

  if (user?.role === 'teacher') {
    return (
      <DashboardLayout>
        {getTeacherContent()}
      </DashboardLayout>
    );
  }

  if (user?.role === 'admin') {
    return (
      <DashboardLayout>
        {getAdminContent()}
      </DashboardLayout>
    );
  }

  if (user?.role === 'alumni') {
    return (
      <DashboardLayout>
        {getAlumniContent()}
      </DashboardLayout>
    );
  }

  if (user?.role === 'staff') {
    return (
      <DashboardLayout>
        {getStaffContent()}
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      {getStatCards()}
      {getCharts()}
    </DashboardLayout>
  );
};

export default Dashboard;
