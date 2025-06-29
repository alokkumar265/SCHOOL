import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  Clock, 
  Calendar,
  BookOpen,
  Target,
  CheckCircle,
  AlertCircle,
  Plus,
  Edit,
  Trash2,
  TrendingUp,
  Users
} from 'lucide-react';
import DashboardLayout from '@/frontend/components/layout/DashboardLayout';

interface StudySession {
  id: string;
  subject: string;
  topic: string;
  startTime: string;
  endTime: string;
  duration: number;
  priority: 'High' | 'Medium' | 'Low';
  status: 'Completed' | 'In Progress' | 'Pending';
  notes?: string;
  date: string;
}

interface StudyGoal {
  id: string;
  title: string;
  subject: string;
  target: string;
  deadline: string;
  progress: number;
  status: 'Active' | 'Completed' | 'Overdue';
}

const StudySchedulePage = () => {
  const [showForm, setShowForm] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

  // Mock data
  const studySessions: StudySession[] = [
    {
      id: '1',
      subject: 'Mathematics',
      topic: 'Calculus Integration',
      startTime: '09:00',
      endTime: '10:30',
      duration: 90,
      priority: 'High',
      status: 'Completed',
      notes: 'Focus on integration techniques and practice problems',
      date: '2024-03-08'
    },
    {
      id: '2',
      subject: 'Physics',
      topic: 'Mechanics - Newton\'s Laws',
      startTime: '14:00',
      endTime: '15:30',
      duration: 90,
      priority: 'Medium',
      status: 'In Progress',
      notes: 'Review concepts and solve numerical problems',
      date: '2024-03-08'
    },
    {
      id: '3',
      subject: 'English',
      topic: 'Essay Writing',
      startTime: '16:00',
      endTime: '17:00',
      duration: 60,
      priority: 'Low',
      status: 'Pending',
      notes: 'Practice essay structure and grammar',
      date: '2024-03-08'
    },
    {
      id: '4',
      subject: 'Chemistry',
      topic: 'Organic Chemistry',
      startTime: '19:00',
      endTime: '20:30',
      duration: 90,
      priority: 'High',
      status: 'Pending',
      notes: 'Study reaction mechanisms',
      date: '2024-03-08'
    }
  ];

  const studyGoals: StudyGoal[] = [
    {
      id: '1',
      title: 'Complete Calculus Integration',
      subject: 'Mathematics',
      target: 'Master all integration techniques',
      deadline: '2024-03-15',
      progress: 75,
      status: 'Active'
    },
    {
      id: '2',
      title: 'Physics Lab Report',
      subject: 'Physics',
      target: 'Submit comprehensive lab report',
      deadline: '2024-03-10',
      progress: 100,
      status: 'Completed'
    },
    {
      id: '3',
      title: 'English Literature Essay',
      subject: 'English',
      target: 'Write 2000-word essay on Shakespeare',
      deadline: '2024-03-12',
      progress: 40,
      status: 'Active'
    }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'bg-red-100 text-red-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed': return 'bg-green-100 text-green-800';
      case 'In Progress': return 'bg-blue-100 text-blue-800';
      case 'Pending': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getGoalStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-blue-100 text-blue-800';
      case 'Completed': return 'bg-green-100 text-green-800';
      case 'Overdue': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const todaySessions = studySessions.filter(session => session.date === selectedDate);
  const totalStudyTime = todaySessions.reduce((sum, session) => sum + session.duration, 0);
  const completedSessions = todaySessions.filter(session => session.status === 'Completed').length;

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Study Schedule</h1>
            <p className="text-gray-600 mt-2">Plan and track your study sessions and academic goals</p>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="outline">
              <Calendar className="h-4 w-4 mr-2" />
              View Calendar
            </Button>
            <Button onClick={() => setShowForm(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Add Session
            </Button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="bg-blue-100 p-2 rounded-lg">
                  <Clock className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Today's Study Time</p>
                  <p className="text-xl font-semibold">{Math.floor(totalStudyTime / 60)}h {totalStudyTime % 60}m</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="bg-green-100 p-2 rounded-lg">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Completed Sessions</p>
                  <p className="text-xl font-semibold">{completedSessions}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="bg-purple-100 p-2 rounded-lg">
                  <Target className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Active Goals</p>
                  <p className="text-xl font-semibold">{studyGoals.filter(g => g.status === 'Active').length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="bg-orange-100 p-2 rounded-lg">
                  <TrendingUp className="h-5 w-5 text-orange-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Study Streak</p>
                  <p className="text-xl font-semibold">7 days</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Today's Schedule */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Today's Study Schedule</CardTitle>
                    <CardDescription>
                      {new Date(selectedDate).toLocaleDateString('en-US', { 
                        weekday: 'long', 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}
                    </CardDescription>
                  </div>
                  <Input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-auto"
                  />
                </div>
              </CardHeader>
              <CardContent>
                {todaySessions.length > 0 ? (
                  <div className="space-y-4">
                    {todaySessions.map((session) => (
                      <div key={session.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <h4 className="font-medium">{session.subject}</h4>
                            <Badge className={getPriorityColor(session.priority)}>
                              {session.priority}
                            </Badge>
                            <Badge className={getStatusColor(session.status)}>
                              {session.status}
                            </Badge>
                          </div>
                          
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600">
                            <div className="flex items-center space-x-2">
                              <BookOpen className="h-4 w-4" />
                              <span>{session.topic}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Clock className="h-4 w-4" />
                              <span>{session.startTime} - {session.endTime}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Clock className="h-4 w-4" />
                              <span>{session.duration} min</span>
                            </div>
                          </div>
                          
                          {session.notes && (
                            <p className="text-sm text-gray-600 mt-2">{session.notes}</p>
                          )}
                        </div>
                        
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Clock className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No Study Sessions</h3>
                    <p className="text-gray-600">No study sessions scheduled for this date.</p>
                    <Button onClick={() => setShowForm(true)} className="mt-4">
                      <Plus className="h-4 w-4 mr-2" />
                      Add Session
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Study Goals */}
            <Card>
              <CardHeader>
                <CardTitle>Study Goals</CardTitle>
                <CardDescription>Track your academic goals and progress</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {studyGoals.map((goal) => (
                    <div key={goal.id} className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <h4 className="font-medium">{goal.title}</h4>
                          <Badge className={getGoalStatusColor(goal.status)}>
                            {goal.status}
                          </Badge>
                        </div>
                        <span className="text-sm text-gray-500">
                          Due: {new Date(goal.deadline).toLocaleDateString()}
                        </span>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600">{goal.target}</span>
                          <span className="font-semibold">{goal.progress}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${goal.progress}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions & Tips */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full justify-start">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Study Session
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Target className="h-4 w-4 mr-2" />
                  Set New Goal
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Calendar className="h-4 w-4 mr-2" />
                  View Weekly Plan
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <TrendingUp className="h-4 w-4 mr-2" />
                  Progress Report
                </Button>
              </CardContent>
            </Card>

            {/* Study Tips */}
            <Card>
              <CardHeader>
                <CardTitle>Study Tips</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="p-3 bg-blue-50 rounded-lg">
                  <h4 className="font-medium text-blue-900 mb-1">Pomodoro Technique</h4>
                  <p className="text-sm text-blue-700">Study for 25 minutes, then take a 5-minute break</p>
                </div>
                <div className="p-3 bg-green-50 rounded-lg">
                  <h4 className="font-medium text-green-900 mb-1">Active Recall</h4>
                  <p className="text-sm text-green-700">Test yourself instead of just re-reading</p>
                </div>
                <div className="p-3 bg-purple-50 rounded-lg">
                  <h4 className="font-medium text-purple-900 mb-1">Spaced Repetition</h4>
                  <p className="text-sm text-purple-700">Review material at increasing intervals</p>
                </div>
              </CardContent>
            </Card>

            {/* Upcoming Deadlines */}
            <Card>
              <CardHeader>
                <CardTitle>Upcoming Deadlines</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {studyGoals
                    .filter(goal => goal.status === 'Active')
                    .sort((a, b) => new Date(a.deadline).getTime() - new Date(b.deadline).getTime())
                    .slice(0, 3)
                    .map((goal) => (
                      <div key={goal.id} className="flex items-center space-x-3 p-2 border rounded">
                        <AlertCircle className="h-4 w-4 text-orange-500" />
                        <div className="flex-1">
                          <p className="text-sm font-medium">{goal.title}</p>
                          <p className="text-xs text-gray-500">
                            Due: {new Date(goal.deadline).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Add Study Session Form */}
        {showForm && (
          <Card>
            <CardHeader>
              <CardTitle>Add Study Session</CardTitle>
              <CardDescription>Schedule a new study session</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-700">Subject</label>
                  <select className="w-full border border-gray-300 rounded-lg px-3 py-2 mt-1">
                    <option value="">Select subject</option>
                    <option value="Mathematics">Mathematics</option>
                    <option value="Physics">Physics</option>
                    <option value="Chemistry">Chemistry</option>
                    <option value="English">English</option>
                    <option value="Biology">Biology</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Topic</label>
                  <Input placeholder="Enter topic" className="mt-1" />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Date</label>
                  <Input type="date" className="mt-1" />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Start Time</label>
                  <Input type="time" className="mt-1" />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">End Time</label>
                  <Input type="time" className="mt-1" />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Priority</label>
                  <select className="w-full border border-gray-300 rounded-lg px-3 py-2 mt-1">
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Notes</label>
                <Textarea 
                  placeholder="Add any notes or specific focus areas..."
                  className="mt-1"
                  rows={3}
                />
              </div>
              <div className="flex space-x-2">
                <Button onClick={() => setShowForm(false)}>
                  Save Session
                </Button>
                <Button variant="outline" onClick={() => setShowForm(false)}>
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
};

export default StudySchedulePage; 