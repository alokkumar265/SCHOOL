import React, { useState } from 'react';
import DashboardLayout from '@/frontend/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Trophy, 
  TrendingUp, 
  BookOpen, 
  BarChart3, 
  Award,
  CheckCircle,
  AlertCircle,
  Star
} from 'lucide-react';

const mockGrades = {
  currentSemester: {
    subjects: [
      { name: 'Mathematics', grade: 'A+', percentage: 95, teacher: 'Mrs. Sharma', assignments: 8, completed: 7 },
      { name: 'Science', grade: 'A', percentage: 88, teacher: 'Mr. Patel', assignments: 6, completed: 6 },
      { name: 'English', grade: 'A-', percentage: 85, teacher: 'Ms. Johnson', assignments: 5, completed: 4 },
      { name: 'History', grade: 'B+', percentage: 82, teacher: 'Dr. Kumar', assignments: 4, completed: 4 },
      { name: 'Geography', grade: 'A', percentage: 89, teacher: 'Mrs. Singh', assignments: 3, completed: 3 },
      { name: 'Computer Science', grade: 'A+', percentage: 92, teacher: 'Mr. Gupta', assignments: 7, completed: 7 }
    ],
    overallGPA: 3.8,
    totalAssignments: 33,
    completedAssignments: 31
  },
  previousSemester: {
    subjects: [
      { name: 'Mathematics', grade: 'A', percentage: 88, teacher: 'Mrs. Sharma' },
      { name: 'Science', grade: 'B+', percentage: 82, teacher: 'Mr. Patel' },
      { name: 'English', grade: 'A-', percentage: 86, teacher: 'Ms. Johnson' },
      { name: 'History', grade: 'B', percentage: 78, teacher: 'Dr. Kumar' },
      { name: 'Geography', grade: 'A-', percentage: 84, teacher: 'Mrs. Singh' },
      { name: 'Computer Science', grade: 'A', percentage: 89, teacher: 'Mr. Gupta' }
    ],
    overallGPA: 3.6
  }
};

const gradeToGPA = {
  'A+': 4.0, 'A': 4.0, 'A-': 3.7,
  'B+': 3.3, 'B': 3.0, 'B-': 2.7,
  'C+': 2.3, 'C': 2.0, 'C-': 1.7,
  'D+': 1.3, 'D': 1.0, 'F': 0.0
};

const getGradeColor = (grade) => {
  if (grade.includes('A')) return 'text-green-600 bg-green-100';
  if (grade.includes('B')) return 'text-blue-600 bg-blue-100';
  if (grade.includes('C')) return 'text-yellow-600 bg-yellow-100';
  if (grade.includes('D')) return 'text-orange-600 bg-orange-100';
  return 'text-red-600 bg-red-100';
};

const getProgressColor = (percentage) => {
  if (percentage >= 90) return 'bg-green-500';
  if (percentage >= 80) return 'bg-blue-500';
  if (percentage >= 70) return 'bg-yellow-500';
  return 'bg-red-500';
};

const GradesPage = () => {
  const [selectedSubject, setSelectedSubject] = useState(null);

  const calculateGPA = (subjects) => {
    const totalPoints = subjects.reduce((sum, subject) => {
      return sum + gradeToGPA[subject.grade];
    }, 0);
    return (totalPoints / subjects.length).toFixed(1);
  };

  const getAcademicStanding = (gpa) => {
    if (gpa >= 3.8) return { status: 'Honor Roll', color: 'text-green-600 bg-green-100', icon: Star };
    if (gpa >= 3.5) return { status: 'Dean\'s List', color: 'text-blue-600 bg-blue-100', icon: Award };
    if (gpa >= 3.0) return { status: 'Good Standing', color: 'text-green-600 bg-green-100', icon: CheckCircle };
    return { status: 'Needs Improvement', color: 'text-orange-600 bg-orange-100', icon: AlertCircle };
  };

  const currentStanding = getAcademicStanding(mockGrades.currentSemester.overallGPA);

  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto py-8">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold">My Grades</h1>
            <p className="text-muted-foreground">Track your academic performance and progress</p>
          </div>
          <div className="flex items-center gap-2">
            <Badge className={currentStanding.color}>
              <currentStanding.icon className="h-3 w-3 mr-1" />
              {currentStanding.status}
            </Badge>
          </div>
        </div>

        {/* Overall Performance Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Current GPA</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockGrades.currentSemester.overallGPA}</div>
              <p className="text-xs text-muted-foreground">out of 4.0</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Previous GPA</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockGrades.previousSemester.overallGPA}</div>
              <p className="text-xs text-muted-foreground">Last semester</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">GPA Change</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">+0.2</div>
              <p className="text-xs text-muted-foreground">Improvement</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Assignments</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {mockGrades.currentSemester.completedAssignments}/{mockGrades.currentSemester.totalAssignments}
              </div>
              <p className="text-xs text-muted-foreground">Completed</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="current" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="current">Current Semester</TabsTrigger>
            <TabsTrigger value="previous">Previous Semester</TabsTrigger>
          </TabsList>
          
          <TabsContent value="current" className="space-y-6">
            <div className="grid gap-6">
              {mockGrades.currentSemester.subjects.map((subject, index) => (
                <Card key={index} className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <CardTitle className="text-lg flex items-center gap-2">
                          <BookOpen className="h-5 w-5 text-blue-600" />
                          {subject.name}
                        </CardTitle>
                        <p className="text-sm text-muted-foreground mt-1">
                          Teacher: {subject.teacher}
                        </p>
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge className={getGradeColor(subject.grade)}>
                          {subject.grade}
                        </Badge>
                        <div className="text-right">
                          <div className="text-lg font-bold">{subject.percentage}%</div>
                          <div className="text-xs text-muted-foreground">Score</div>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Performance</span>
                          <span>{subject.percentage}%</span>
                        </div>
                        <Progress 
                          value={subject.percentage} 
                          className="h-2"
                        />
                      </div>
                      
                      {subject.assignments && (
                        <div className="flex items-center justify-between text-sm">
                          <span>Assignments: {subject.completed}/{subject.assignments} completed</span>
                          <div className="flex items-center gap-1">
                            <div className="w-2 h-2 rounded-full bg-green-500"></div>
                            <span className="text-green-600 font-medium">
                              {Math.round((subject.completed / subject.assignments) * 100)}%
                            </span>
                          </div>
                        </div>
                      )}
                      
                      <div className="flex gap-2">
                        <Badge variant="outline" className="text-xs">
                          <TrendingUp className="h-3 w-3 mr-1" />
                          {subject.percentage >= 90 ? 'Excellent' : 
                           subject.percentage >= 80 ? 'Good' : 
                           subject.percentage >= 70 ? 'Satisfactory' : 'Needs Improvement'}
                        </Badge>
                        {subject.percentage >= 95 && (
                          <Badge variant="outline" className="text-xs bg-yellow-50 text-yellow-700">
                            <Star className="h-3 w-3 mr-1" />
                            Top Performer
                          </Badge>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="previous" className="space-y-6">
            <div className="grid gap-6">
              {mockGrades.previousSemester.subjects.map((subject, index) => (
                <Card key={index} className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <CardTitle className="text-lg flex items-center gap-2">
                          <BookOpen className="h-5 w-5 text-blue-600" />
                          {subject.name}
                        </CardTitle>
                        <p className="text-sm text-muted-foreground mt-1">
                          Teacher: {subject.teacher}
                        </p>
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge className={getGradeColor(subject.grade)}>
                          {subject.grade}
                        </Badge>
                        <div className="text-right">
                          <div className="text-lg font-bold">{subject.percentage}%</div>
                          <div className="text-xs text-muted-foreground">Score</div>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Performance</span>
                          <span>{subject.percentage}%</span>
                        </div>
                        <Progress 
                          value={subject.percentage} 
                          className="h-2"
                        />
                      </div>
                      
                      <div className="flex gap-2">
                        <Badge variant="outline" className="text-xs">
                          <TrendingUp className="h-3 w-3 mr-1" />
                          {subject.percentage >= 90 ? 'Excellent' : 
                           subject.percentage >= 80 ? 'Good' : 
                           subject.percentage >= 70 ? 'Satisfactory' : 'Needs Improvement'}
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Academic Insights */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Academic Insights
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-3">Strongest Subjects</h4>
                <div className="space-y-2">
                  {mockGrades.currentSemester.subjects
                    .filter(s => s.percentage >= 90)
                    .map((subject, index) => (
                      <div key={index} className="flex justify-between items-center p-2 bg-green-50 rounded">
                        <span className="font-medium">{subject.name}</span>
                        <span className="text-green-600 font-bold">{subject.percentage}%</span>
                      </div>
                    ))}
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold mb-3">Areas for Improvement</h4>
                <div className="space-y-2">
                  {mockGrades.currentSemester.subjects
                    .filter(s => s.percentage < 85)
                    .map((subject, index) => (
                      <div key={index} className="flex justify-between items-center p-2 bg-yellow-50 rounded">
                        <span className="font-medium">{subject.name}</span>
                        <span className="text-yellow-600 font-bold">{subject.percentage}%</span>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default GradesPage;
