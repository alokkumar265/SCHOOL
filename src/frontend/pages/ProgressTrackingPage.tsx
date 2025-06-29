import React, { useState } from 'react';
import { useAuth } from '@/backend/contexts/AuthContext';
import DashboardLayout from '@/frontend/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  TrendingUp, 
  TrendingDown, 
  Target, 
  Award, 
  BookOpen, 
  BarChart3,
  Calendar,
  Clock,
  Star,
  CheckCircle,
  AlertTriangle,
  ArrowUp,
  ArrowDown,
  Minus,
  Lightbulb,
  Bookmark,
  Share2
} from 'lucide-react';

const ProgressTrackingPage = () => {
  const { user } = useAuth();
  const [selectedPeriod, setSelectedPeriod] = useState('current');

  // Sample progress data
  const subjects = [
    {
      id: 1,
      name: 'Mathematics',
      currentGrade: 85,
      previousGrade: 78,
      targetGrade: 90,
      improvement: '+7%',
      trend: 'up',
      assignments: 12,
      completed: 10,
      attendance: 92,
      teacher: 'Mrs. Sharma',
      strengths: ['Problem Solving', 'Algebra', 'Calculus'],
      weaknesses: ['Geometry', 'Statistics'],
      recommendations: [
        'Practice more geometry problems',
        'Focus on statistical analysis',
        'Review calculus concepts'
      ]
    },
    {
      id: 2,
      name: 'Physics',
      currentGrade: 78,
      previousGrade: 82,
      targetGrade: 85,
      improvement: '-4%',
      trend: 'down',
      assignments: 8,
      completed: 7,
      attendance: 88,
      teacher: 'Mr. Patel',
      strengths: ['Mechanics', 'Electromagnetism'],
      weaknesses: ['Optics', 'Modern Physics'],
      recommendations: [
        'Study optics concepts more thoroughly',
        'Practice numerical problems',
        'Attend extra classes for modern physics'
      ]
    },
    {
      id: 3,
      name: 'Chemistry',
      currentGrade: 92,
      previousGrade: 89,
      targetGrade: 90,
      improvement: '+3%',
      trend: 'up',
      assignments: 10,
      completed: 10,
      attendance: 95,
      teacher: 'Dr. Kumar',
      strengths: ['Organic Chemistry', 'Physical Chemistry'],
      weaknesses: ['Inorganic Chemistry'],
      recommendations: [
        'Continue excellent work',
        'Focus on inorganic chemistry',
        'Help peers with organic chemistry'
      ]
    },
    {
      id: 4,
      name: 'English',
      currentGrade: 88,
      previousGrade: 85,
      targetGrade: 88,
      improvement: '+3%',
      trend: 'up',
      assignments: 6,
      completed: 6,
      attendance: 90,
      teacher: 'Ms. Johnson',
      strengths: ['Essay Writing', 'Literature Analysis'],
      weaknesses: ['Grammar', 'Vocabulary'],
      recommendations: [
        'Practice grammar exercises',
        'Expand vocabulary through reading',
        'Continue excellent writing skills'
      ]
    },
    {
      id: 5,
      name: 'Computer Science',
      currentGrade: 95,
      previousGrade: 92,
      targetGrade: 90,
      improvement: '+3%',
      trend: 'up',
      assignments: 15,
      completed: 15,
      attendance: 98,
      teacher: 'Mr. Singh',
      strengths: ['Programming', 'Data Structures', 'Algorithms'],
      weaknesses: ['Database Management'],
      recommendations: [
        'Excellent performance!',
        'Learn advanced database concepts',
        'Consider taking advanced programming courses'
      ]
    }
  ];

  const goals = [
    {
      id: 1,
      title: 'Achieve 90% in Mathematics',
      target: 90,
      current: 85,
      deadline: '2024-03-15',
      status: 'in-progress',
      progress: 85
    },
    {
      id: 2,
      title: 'Improve Physics to 85%',
      target: 85,
      current: 78,
      deadline: '2024-03-20',
      status: 'needs-attention',
      progress: 78
    },
    {
      id: 3,
      title: 'Maintain Chemistry above 90%',
      target: 90,
      current: 92,
      deadline: '2024-03-25',
      status: 'achieved',
      progress: 100
    },
    {
      id: 4,
      title: 'Complete all assignments on time',
      target: 100,
      current: 95,
      deadline: '2024-03-30',
      status: 'in-progress',
      progress: 95
    }
  ];

  const overallStats = {
    currentGPA: 8.76,
    previousGPA: 8.45,
    improvement: '+0.31',
    attendance: 92.6,
    assignmentsCompleted: 48,
    totalAssignments: 51,
    subjectsAboveTarget: 3,
    totalSubjects: 5
  };

  const getTrendIcon = (trend) => {
    switch (trend) {
      case 'up': return <ArrowUp className="h-4 w-4 text-green-600" />;
      case 'down': return <ArrowDown className="h-4 w-4 text-red-600" />;
      default: return <Minus className="h-4 w-4 text-gray-600" />;
    }
  };

  const getTrendColor = (trend) => {
    switch (trend) {
      case 'up': return 'text-green-600';
      case 'down': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const getGoalStatusColor = (status) => {
    switch (status) {
      case 'achieved': return 'bg-green-100 text-green-800';
      case 'in-progress': return 'bg-blue-100 text-blue-800';
      case 'needs-attention': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getGoalStatusIcon = (status) => {
    switch (status) {
      case 'achieved': return <CheckCircle className="h-4 w-4" />;
      case 'in-progress': return <Clock className="h-4 w-4" />;
      case 'needs-attention': return <AlertTriangle className="h-4 w-4" />;
      default: return <Target className="h-4 w-4" />;
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold tracking-tight mb-2">Progress Tracking</h1>
          <p className="text-muted-foreground">Monitor your academic performance and track your goals</p>
        </div>

        {/* Overall Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Current GPA</p>
                  <p className="text-2xl font-bold">{overallStats.currentGPA}</p>
                  <p className="text-sm text-green-600 flex items-center gap-1">
                    <TrendingUp className="h-3 w-3" />
                    {overallStats.improvement} from last term
                  </p>
                </div>
                <Award className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Attendance</p>
                  <p className="text-2xl font-bold">{overallStats.attendance}%</p>
                  <p className="text-sm text-gray-600">Overall attendance</p>
                </div>
                <Calendar className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Assignments</p>
                  <p className="text-2xl font-bold">{overallStats.assignmentsCompleted}/{overallStats.totalAssignments}</p>
                  <p className="text-sm text-gray-600">Completed</p>
                </div>
                <CheckCircle className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Subjects Above Target</p>
                  <p className="text-2xl font-bold">{overallStats.subjectsAboveTarget}/{overallStats.totalSubjects}</p>
                  <p className="text-sm text-gray-600">Meeting goals</p>
                </div>
                <Target className="h-8 w-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="subjects" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="subjects">Subject Analysis</TabsTrigger>
            <TabsTrigger value="goals">Goals & Targets</TabsTrigger>
            <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
          </TabsList>

          <TabsContent value="subjects" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {subjects.map((subject) => (
                <Card key={subject.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="flex items-center gap-2">
                        <BookOpen className="h-5 w-5 text-blue-600" />
                        {subject.name}
                      </CardTitle>
                      <div className="flex items-center gap-2">
                        <Badge className={getTrendColor(subject.trend)}>
                          {getTrendIcon(subject.trend)}
                          <span className="ml-1">{subject.improvement}</span>
                        </Badge>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <span>Teacher: {subject.teacher}</span>
                      <span>Attendance: {subject.attendance}%</span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {/* Grade Progress */}
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium">Current Grade</span>
                          <span className="text-lg font-bold">{subject.currentGrade}%</span>
                        </div>
                        <div className="space-y-2">
                          <Progress value={subject.currentGrade} className="h-2" />
                          <div className="flex justify-between text-xs text-gray-500">
                            <span>Previous: {subject.previousGrade}%</span>
                            <span>Target: {subject.targetGrade}%</span>
                          </div>
                        </div>
                      </div>

                      {/* Assignment Progress */}
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium">Assignments</span>
                          <span className="text-sm">{subject.completed}/{subject.assignments}</span>
                        </div>
                        <Progress value={(subject.completed / subject.assignments) * 100} className="h-2" />
                      </div>

                      {/* Strengths and Weaknesses */}
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <h4 className="font-medium text-sm mb-2 text-green-700">Strengths</h4>
                          <div className="space-y-1">
                            {subject.strengths.map((strength, index) => (
                              <div key={index} className="text-xs text-green-600 flex items-center gap-1">
                                <CheckCircle className="h-3 w-3" />
                                {strength}
                              </div>
                            ))}
                          </div>
                        </div>
                        <div>
                          <h4 className="font-medium text-sm mb-2 text-red-700">Areas to Improve</h4>
                          <div className="space-y-1">
                            {subject.weaknesses.map((weakness, index) => (
                              <div key={index} className="text-xs text-red-600 flex items-center gap-1">
                                <AlertTriangle className="h-3 w-3" />
                                {weakness}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Recommendations */}
                      <div>
                        <h4 className="font-medium text-sm mb-2 flex items-center gap-1">
                          <Lightbulb className="h-4 w-4 text-yellow-600" />
                          Recommendations
                        </h4>
                        <div className="space-y-1">
                          {subject.recommendations.map((rec, index) => (
                            <div key={index} className="text-xs text-gray-600 flex items-center gap-1">
                              <Star className="h-3 w-3 text-yellow-500" />
                              {rec}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="goals" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {goals.map((goal) => (
                <Card key={goal.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{goal.title}</CardTitle>
                      <Badge className={getGoalStatusColor(goal.status)}>
                        {getGoalStatusIcon(goal.status)}
                        <span className="ml-1">{goal.status.replace('-', ' ')}</span>
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <span>Target: {goal.target}%</span>
                      <span>Current: {goal.current}%</span>
                      <span>Deadline: {new Date(goal.deadline).toLocaleDateString()}</span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium">Progress</span>
                          <span className="text-sm font-bold">{goal.progress}%</span>
                        </div>
                        <Progress value={goal.progress} className="h-3" />
                      </div>
                      
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          <Bookmark className="h-4 w-4 mr-1" />
                          Update Progress
                        </Button>
                        <Button size="sm" variant="outline">
                          <Share2 className="h-4 w-4 mr-1" />
                          Share Goal
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Add New Goal */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  Add New Goal
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Goal Title</label>
                    <input
                      type="text"
                      placeholder="e.g., Achieve 95% in Physics"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Target Grade (%)</label>
                    <input
                      type="number"
                      placeholder="90"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Deadline</label>
                    <input
                      type="date"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
                <Button className="mt-4">
                  <Target className="h-4 w-4 mr-1" />
                  Add Goal
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="recommendations" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Lightbulb className="h-5 w-5 text-yellow-600" />
                    Study Recommendations
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-3 bg-blue-50 rounded-lg">
                      <h4 className="font-medium text-blue-800 mb-2">Focus Areas</h4>
                      <ul className="text-sm text-blue-700 space-y-1">
                        <li>• Spend more time on Physics optics and modern physics</li>
                        <li>• Practice geometry problems in Mathematics</li>
                        <li>• Improve grammar and vocabulary in English</li>
                        <li>• Learn advanced database concepts in Computer Science</li>
                      </ul>
                    </div>
                    
                    <div className="p-3 bg-green-50 rounded-lg">
                      <h4 className="font-medium text-green-800 mb-2">Strengths to Leverage</h4>
                      <ul className="text-sm text-green-700 space-y-1">
                        <li>• Excellent programming skills - consider advanced courses</li>
                        <li>• Strong chemistry performance - help peers</li>
                        <li>• Good essay writing - participate in competitions</li>
                        <li>• Consistent attendance - maintain this habit</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5 text-purple-600" />
                    Performance Insights
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-3 bg-purple-50 rounded-lg">
                      <h4 className="font-medium text-purple-800 mb-2">Trends</h4>
                      <ul className="text-sm text-purple-700 space-y-1">
                        <li>• GPA improved by 0.31 points this term</li>
                        <li>• 4 out of 5 subjects showing improvement</li>
                        <li>• Assignment completion rate at 94%</li>
                        <li>• Attendance above 90% in all subjects</li>
                      </ul>
                    </div>
                    
                    <div className="p-3 bg-orange-50 rounded-lg">
                      <h4 className="font-medium text-orange-800 mb-2">Action Items</h4>
                      <ul className="text-sm text-orange-700 space-y-1">
                        <li>• Schedule extra classes for Physics</li>
                        <li>• Join Mathematics study group</li>
                        <li>• Practice English grammar daily</li>
                        <li>• Set up tutoring sessions for weak areas</li>
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

export default ProgressTrackingPage; 