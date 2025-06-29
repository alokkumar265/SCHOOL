import React, { useState } from 'react';
import { useAuth } from '@/backend/contexts/AuthContext';
import DashboardLayout from '@/frontend/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  User, 
  BookOpen, 
  Bell,
  ChevronLeft,
  ChevronRight,
  Download,
  Share2
} from 'lucide-react';

const TimetablePage = () => {
  const { user } = useAuth();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [viewMode, setViewMode] = useState('daily');

  // Sample timetable data
  const timetableData = {
    daily: [
      {
        time: '08:00 - 08:45',
        subject: 'Mathematics',
        teacher: 'Mrs. Sharma',
        room: 'Room 101',
        type: 'Theory',
        status: 'upcoming'
      },
      {
        time: '08:45 - 09:30',
        subject: 'Physics',
        teacher: 'Mr. Patel',
        room: 'Lab 201',
        type: 'Practical',
        status: 'upcoming'
      },
      {
        time: '09:30 - 10:15',
        subject: 'English',
        teacher: 'Ms. Johnson',
        room: 'Room 105',
        type: 'Theory',
        status: 'current'
      },
      {
        time: '10:15 - 10:30',
        subject: 'Break',
        teacher: '',
        room: '',
        type: 'Break',
        status: 'break'
      },
      {
        time: '10:30 - 11:15',
        subject: 'Chemistry',
        teacher: 'Dr. Kumar',
        room: 'Lab 202',
        type: 'Practical',
        status: 'upcoming'
      },
      {
        time: '11:15 - 12:00',
        subject: 'Computer Science',
        teacher: 'Mr. Singh',
        room: 'Computer Lab',
        type: 'Practical',
        status: 'upcoming'
      },
      {
        time: '12:00 - 12:45',
        subject: 'Lunch Break',
        teacher: '',
        room: 'Canteen',
        type: 'Break',
        status: 'break'
      },
      {
        time: '12:45 - 01:30',
        subject: 'Biology',
        teacher: 'Mrs. Gupta',
        room: 'Lab 203',
        type: 'Practical',
        status: 'upcoming'
      },
      {
        time: '01:30 - 02:15',
        subject: 'History',
        teacher: 'Mr. Verma',
        room: 'Room 108',
        type: 'Theory',
        status: 'upcoming'
      },
      {
        time: '02:15 - 03:00',
        subject: 'Physical Education',
        teacher: 'Coach Raj',
        room: 'Ground',
        type: 'Practical',
        status: 'upcoming'
      }
    ],
    weekly: {
      Monday: [
        { time: '08:00-09:30', subject: 'Mathematics', teacher: 'Mrs. Sharma', room: '101' },
        { time: '09:30-11:00', subject: 'Physics', teacher: 'Mr. Patel', room: 'Lab 201' },
        { time: '11:00-12:30', subject: 'English', teacher: 'Ms. Johnson', room: '105' },
        { time: '12:30-02:00', subject: 'Chemistry', teacher: 'Dr. Kumar', room: 'Lab 202' },
        { time: '02:00-03:30', subject: 'Computer Science', teacher: 'Mr. Singh', room: 'Comp Lab' }
      ],
      Tuesday: [
        { time: '08:00-09:30', subject: 'Biology', teacher: 'Mrs. Gupta', room: 'Lab 203' },
        { time: '09:30-11:00', subject: 'Mathematics', teacher: 'Mrs. Sharma', room: '101' },
        { time: '11:00-12:30', subject: 'History', teacher: 'Mr. Verma', room: '108' },
        { time: '12:30-02:00', subject: 'Physics', teacher: 'Mr. Patel', room: 'Lab 201' },
        { time: '02:00-03:30', subject: 'Physical Education', teacher: 'Coach Raj', room: 'Ground' }
      ],
      Wednesday: [
        { time: '08:00-09:30', subject: 'Chemistry', teacher: 'Dr. Kumar', room: 'Lab 202' },
        { time: '09:30-11:00', subject: 'English', teacher: 'Ms. Johnson', room: '105' },
        { time: '11:00-12:30', subject: 'Mathematics', teacher: 'Mrs. Sharma', room: '101' },
        { time: '12:30-02:00', subject: 'Computer Science', teacher: 'Mr. Singh', room: 'Comp Lab' },
        { time: '02:00-03:30', subject: 'Biology', teacher: 'Mrs. Gupta', room: 'Lab 203' }
      ],
      Thursday: [
        { time: '08:00-09:30', subject: 'Physics', teacher: 'Mr. Patel', room: 'Lab 201' },
        { time: '09:30-11:00', subject: 'History', teacher: 'Mr. Verma', room: '108' },
        { time: '11:00-12:30', subject: 'Chemistry', teacher: 'Dr. Kumar', room: 'Lab 202' },
        { time: '12:30-02:00', subject: 'Mathematics', teacher: 'Mrs. Sharma', room: '101' },
        { time: '02:00-03:30', subject: 'English', teacher: 'Ms. Johnson', room: '105' }
      ],
      Friday: [
        { time: '08:00-09:30', subject: 'Computer Science', teacher: 'Mr. Singh', room: 'Comp Lab' },
        { time: '09:30-11:00', subject: 'Biology', teacher: 'Mrs. Gupta', room: 'Lab 203' },
        { time: '11:00-12:30', subject: 'Physical Education', teacher: 'Coach Raj', room: 'Ground' },
        { time: '12:30-02:00', subject: 'Physics', teacher: 'Mr. Patel', room: 'Lab 201' },
        { time: '02:00-03:30', subject: 'Mathematics', teacher: 'Mrs. Sharma', room: '101' }
      ]
    }
  };

  const getCurrentPeriod = () => {
    const now = new Date();
    const currentTime = now.getHours() * 60 + now.getMinutes();
    
    return timetableData.daily.find(period => {
      const [start, end] = period.time.split(' - ');
      const startMinutes = parseInt(start.split(':')[0]) * 60 + parseInt(start.split(':')[1]);
      const endMinutes = parseInt(end.split(':')[0]) * 60 + parseInt(end.split(':')[1]);
      
      return currentTime >= startMinutes && currentTime < endMinutes;
    });
  };

  const currentPeriod = getCurrentPeriod();

  const getStatusColor = (status) => {
    switch (status) {
      case 'current': return 'bg-green-100 text-green-800 border-green-200';
      case 'upcoming': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'break': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'Theory': return 'bg-purple-100 text-purple-800';
      case 'Practical': return 'bg-orange-100 text-orange-800';
      case 'Break': return 'bg-gray-100 text-gray-600';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const navigateDate = (direction) => {
    const newDate = new Date(currentDate);
    if (direction === 'prev') {
      newDate.setDate(newDate.getDate() - 1);
    } else {
      newDate.setDate(newDate.getDate() + 1);
    }
    setCurrentDate(newDate);
  };

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold tracking-tight mb-2">Class Timetable</h1>
          <p className="text-muted-foreground">View your daily and weekly class schedule</p>
        </div>

        <Tabs defaultValue="daily" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="daily">Daily Schedule</TabsTrigger>
            <TabsTrigger value="weekly">Weekly View</TabsTrigger>
          </TabsList>

          <TabsContent value="daily" className="space-y-6">
            {/* Current Period Highlight */}
            {currentPeriod && (
              <Card className="border-green-200 bg-green-50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-green-800">
                    <Bell className="h-5 w-5" />
                    Current Period
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-xl font-semibold">{currentPeriod.subject}</h3>
                      <p className="text-green-700">{currentPeriod.time} • {currentPeriod.room}</p>
                      <p className="text-green-600">Teacher: {currentPeriod.teacher}</p>
                    </div>
                    <Badge className={getTypeColor(currentPeriod.type)}>
                      {currentPeriod.type}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Date Navigation */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <Button variant="outline" size="sm" onClick={() => navigateDate('prev')}>
                    <ChevronLeft className="h-4 w-4 mr-1" />
                    Previous
                  </Button>
                  <h2 className="text-lg font-semibold">{formatDate(currentDate)}</h2>
                  <Button variant="outline" size="sm" onClick={() => navigateDate('next')}>
                    Next
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </Button>
                </div>
              </CardHeader>
            </Card>

            {/* Daily Schedule */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <Calendar className="h-5 w-5" />
                    Today's Schedule
                  </span>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">
                      <Download className="h-4 w-4 mr-1" />
                      Download
                    </Button>
                    <Button size="sm" variant="outline">
                      <Share2 className="h-4 w-4 mr-1" />
                      Share
                    </Button>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {timetableData.daily.map((period, index) => (
                    <div
                      key={index}
                      className={`p-4 border rounded-lg transition-all ${
                        period.status === 'current' ? 'border-green-300 bg-green-50' : 'border-gray-200'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4 text-gray-500" />
                            <span className="font-medium">{period.time}</span>
                          </div>
                          <div>
                            <h3 className="font-semibold">{period.subject}</h3>
                            <div className="flex items-center gap-4 text-sm text-gray-600">
                              <span className="flex items-center gap-1">
                                <User className="h-3 w-3" />
                                {period.teacher}
                              </span>
                              <span className="flex items-center gap-1">
                                <MapPin className="h-3 w-3" />
                                {period.room}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge className={getTypeColor(period.type)}>
                            {period.type}
                          </Badge>
                          {period.status === 'current' && (
                            <Badge className="bg-green-100 text-green-800">
                              Current
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="weekly" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <Calendar className="h-5 w-5" />
                    Weekly Timetable
                  </span>
                  <Button size="sm" variant="outline">
                    <Download className="h-4 w-4 mr-1" />
                    Download PDF
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="border-b">
                        <th className="p-3 text-left font-semibold">Time</th>
                        {Object.keys(timetableData.weekly).map(day => (
                          <th key={day} className="p-3 text-left font-semibold">{day}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {['08:00-09:30', '09:30-11:00', '11:00-12:30', '12:30-02:00', '02:00-03:30'].map(timeSlot => (
                        <tr key={timeSlot} className="border-b">
                          <td className="p-3 font-medium text-sm">{timeSlot}</td>
                          {Object.keys(timetableData.weekly).map(day => {
                            const period = timetableData.weekly[day].find(p => p.time === timeSlot);
                            return (
                              <td key={day} className="p-3">
                                {period ? (
                                  <div className="text-sm">
                                    <div className="font-medium">{period.subject}</div>
                                    <div className="text-gray-600">{period.teacher}</div>
                                    <div className="text-gray-500 text-xs">{period.room}</div>
                                  </div>
                                ) : (
                                  <span className="text-gray-400">-</span>
                                )}
                              </td>
                            );
                          })}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default TimetablePage; 