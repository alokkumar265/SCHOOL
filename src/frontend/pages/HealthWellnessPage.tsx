import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Heart, 
  Activity, 
  Brain,
  Calendar,
  FileText,
  AlertCircle,
  TrendingUp,
  Users,
  Clock,
  Target,
  CheckCircle,
  Plus
} from 'lucide-react';
import DashboardLayout from '@/frontend/components/layout/DashboardLayout';

interface HealthRecord {
  id: string;
  date: string;
  type: 'Checkup' | 'Vaccination' | 'Emergency' | 'Dental';
  doctor: string;
  diagnosis: string;
  treatment: string;
  followUp?: string;
}

interface FitnessGoal {
  id: string;
  title: string;
  target: number;
  current: number;
  unit: string;
  deadline: string;
  category: 'Steps' | 'Exercise' | 'Sleep' | 'Water';
}

interface MentalHealthResource {
  id: string;
  title: string;
  type: 'Article' | 'Video' | 'Exercise' | 'Contact';
  description: string;
  duration?: string;
  url?: string;
}

const HealthWellnessPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Mock data
  const healthRecords: HealthRecord[] = [
    {
      id: '1',
      date: '2024-02-15',
      type: 'Checkup',
      doctor: 'Dr. Sarah Johnson',
      diagnosis: 'General health checkup - All normal',
      treatment: 'No treatment required',
      followUp: '2024-08-15'
    },
    {
      id: '2',
      date: '2024-01-20',
      type: 'Vaccination',
      doctor: 'Dr. Michael Chen',
      diagnosis: 'Annual flu vaccination',
      treatment: 'Flu shot administered'
    },
    {
      id: '3',
      date: '2023-12-10',
      type: 'Dental',
      doctor: 'Dr. Emily Davis',
      diagnosis: 'Regular dental cleaning',
      treatment: 'Teeth cleaning and fluoride treatment'
    }
  ];

  const fitnessGoals: FitnessGoal[] = [
    {
      id: '1',
      title: 'Daily Steps',
      target: 10000,
      current: 8500,
      unit: 'steps',
      deadline: '2024-03-31',
      category: 'Steps'
    },
    {
      id: '2',
      title: 'Weekly Exercise',
      target: 5,
      current: 3,
      unit: 'sessions',
      deadline: '2024-03-31',
      category: 'Exercise'
    },
    {
      id: '3',
      title: 'Sleep Hours',
      target: 8,
      current: 7,
      unit: 'hours',
      deadline: '2024-03-31',
      category: 'Sleep'
    },
    {
      id: '4',
      title: 'Water Intake',
      target: 8,
      current: 6,
      unit: 'glasses',
      deadline: '2024-03-31',
      category: 'Water'
    }
  ];

  const mentalHealthResources: MentalHealthResource[] = [
    {
      id: '1',
      title: 'Stress Management Techniques',
      type: 'Article',
      description: 'Learn effective ways to manage academic stress',
      duration: '10 min read'
    },
    {
      id: '2',
      title: 'Mindfulness Meditation',
      type: 'Video',
      description: 'Guided meditation for students',
      duration: '15 min',
      url: '#'
    },
    {
      id: '3',
      title: 'Breathing Exercises',
      type: 'Exercise',
      description: 'Simple breathing techniques for anxiety relief',
      duration: '5 min'
    },
    {
      id: '4',
      title: 'School Counselor Contact',
      type: 'Contact',
      description: 'Schedule a session with the school counselor',
      url: '#'
    }
  ];

  const upcomingAppointments = [
    {
      id: '1',
      type: 'Dental Checkup',
      date: '2024-03-20',
      time: '10:00 AM',
      doctor: 'Dr. Emily Davis',
      location: 'School Health Center'
    },
    {
      id: '2',
      type: 'Annual Physical',
      date: '2024-04-15',
      time: '02:30 PM',
      doctor: 'Dr. Sarah Johnson',
      location: 'School Health Center'
    }
  ];

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Checkup': return 'bg-blue-100 text-blue-800';
      case 'Vaccination': return 'bg-green-100 text-green-800';
      case 'Emergency': return 'bg-red-100 text-red-800';
      case 'Dental': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Steps': return 'bg-blue-100 text-blue-800';
      case 'Exercise': return 'bg-green-100 text-green-800';
      case 'Sleep': return 'bg-purple-100 text-purple-800';
      case 'Water': return 'bg-cyan-100 text-cyan-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getResourceColor = (type: string) => {
    switch (type) {
      case 'Article': return 'bg-blue-100 text-blue-800';
      case 'Video': return 'bg-red-100 text-red-800';
      case 'Exercise': return 'bg-green-100 text-green-800';
      case 'Contact': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredGoals = fitnessGoals.filter(goal =>
    selectedCategory === 'all' || goal.category === selectedCategory
  );

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Health & Wellness</h1>
            <p className="text-gray-600 mt-2">Track your health, fitness goals, and access mental health resources</p>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="outline">
              <Plus className="h-4 w-4 mr-2" />
              Add Health Record
            </Button>
            <Button>
              <Users className="h-4 w-4 mr-2" />
              Contact Health Center
            </Button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="bg-green-100 p-2 rounded-lg">
                  <Heart className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Health Score</p>
                  <p className="text-xl font-semibold">92%</p>
                  <p className="text-xs text-green-600">Excellent</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="bg-blue-100 p-2 rounded-lg">
                  <Activity className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Daily Steps</p>
                  <p className="text-xl font-semibold">8,500</p>
                  <p className="text-xs text-blue-600">85% of goal</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="bg-purple-100 p-2 rounded-lg">
                  <Brain className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Sleep Hours</p>
                  <p className="text-xl font-semibold">7.5</p>
                  <p className="text-xs text-purple-600">Good quality</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="bg-orange-100 p-2 rounded-lg">
                  <Calendar className="h-5 w-5 text-orange-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Next Checkup</p>
                  <p className="text-xl font-semibold">Mar 20</p>
                  <p className="text-xs text-orange-600">Dental</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="fitness" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="fitness">Fitness Goals</TabsTrigger>
            <TabsTrigger value="health-records">Health Records</TabsTrigger>
            <TabsTrigger value="mental-health">Mental Health</TabsTrigger>
            <TabsTrigger value="appointments">Appointments</TabsTrigger>
          </TabsList>

          {/* Fitness Goals Tab */}
          <TabsContent value="fitness" className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Your Fitness Goals</h3>
              <div className="flex items-center space-x-4">
                <select 
                  value={selectedCategory} 
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="border border-gray-300 rounded-lg px-3 py-2"
                >
                  <option value="all">All Categories</option>
                  <option value="Steps">Steps</option>
                  <option value="Exercise">Exercise</option>
                  <option value="Sleep">Sleep</option>
                  <option value="Water">Water</option>
                </select>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Goal
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredGoals.map((goal) => (
                <Card key={goal.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-lg">{goal.title}</CardTitle>
                        <CardDescription className="mt-2">
                          Target: {goal.target} {goal.unit}
                        </CardDescription>
                      </div>
                      <Badge className={getCategoryColor(goal.category)}>
                        {goal.category}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span>Progress</span>
                        <span className="font-semibold">{goal.current}/{goal.target} {goal.unit}</span>
                      </div>
                      <Progress value={(goal.current / goal.target) * 100} className="h-2" />
                      <p className="text-xs text-gray-500">
                        Deadline: {new Date(goal.deadline).toLocaleDateString()}
                      </p>
                    </div>

                    <div className="flex space-x-2">
                      <Button className="flex-1">
                        <Target className="h-4 w-4 mr-2" />
                        Update Progress
                      </Button>
                      <Button variant="outline" size="sm">
                        <TrendingUp className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Health Records Tab */}
          <TabsContent value="health-records" className="space-y-6">
            <div className="space-y-4">
              {healthRecords.map((record) => (
                <Card key={record.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="text-lg font-semibold">{record.type}</h3>
                          <Badge className={getTypeColor(record.type)}>
                            {record.type}
                          </Badge>
                          <span className="text-sm text-gray-500">
                            {new Date(record.date).toLocaleDateString()}
                          </span>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600 mb-4">
                          <div>
                            <span className="font-medium">Doctor:</span> {record.doctor}
                          </div>
                          <div>
                            <span className="font-medium">Diagnosis:</span> {record.diagnosis}
                          </div>
                          <div className="md:col-span-2">
                            <span className="font-medium">Treatment:</span> {record.treatment}
                          </div>
                          {record.followUp && (
                            <div>
                              <span className="font-medium">Follow-up:</span> {new Date(record.followUp).toLocaleDateString()}
                            </div>
                          )}
                        </div>
                      </div>
                      
                      <div className="flex flex-col items-end space-y-2">
                        <Button variant="outline" size="sm">
                          <FileText className="h-4 w-4 mr-2" />
                          View Details
                        </Button>
                        <Button variant="outline" size="sm">
                          <FileText className="h-4 w-4 mr-2" />
                          Download Report
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Mental Health Tab */}
          <TabsContent value="mental-health" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mentalHealthResources.map((resource) => (
                <Card key={resource.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-lg">{resource.title}</CardTitle>
                        <CardDescription className="mt-2">{resource.description}</CardDescription>
                      </div>
                      <Badge className={getResourceColor(resource.type)}>
                        {resource.type}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {resource.duration && (
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <Clock className="h-4 w-4" />
                        <span>{resource.duration}</span>
                      </div>
                    )}
                    
                    <div className="flex space-x-2">
                      {resource.type === 'Contact' ? (
                        <Button className="flex-1">
                          <Users className="h-4 w-4 mr-2" />
                          Schedule Session
                        </Button>
                      ) : (
                        <Button className="flex-1">
                          <FileText className="h-4 w-4 mr-2" />
                          Access Resource
                        </Button>
                      )}
                      <Button variant="outline" size="sm">
                        <Heart className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Appointments Tab */}
          <TabsContent value="appointments" className="space-y-6">
            <div className="space-y-4">
              {upcomingAppointments.map((appointment) => (
                <Card key={appointment.id} className="border-l-4 border-l-blue-500">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="text-lg font-semibold">{appointment.type}</h3>
                          <Badge variant="outline">{appointment.doctor}</Badge>
                        </div>
                        
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600">
                          <div className="flex items-center space-x-2">
                            <Calendar className="h-4 w-4" />
                            <span>{new Date(appointment.date).toLocaleDateString()}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Clock className="h-4 w-4" />
                            <span>{appointment.time}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Users className="h-4 w-4" />
                            <span>{appointment.doctor}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <AlertCircle className="h-4 w-4" />
                            <span>{appointment.location}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex flex-col items-end space-y-2">
                        <Button variant="outline">
                          <Calendar className="h-4 w-4 mr-2" />
                          Reschedule
                        </Button>
                        <Button variant="outline" size="sm">
                          <FileText className="h-4 w-4 mr-2" />
                          View Details
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default HealthWellnessPage; 