import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import DashboardLayout from '@/frontend/components/layout/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Users, 
  BookOpen, 
  Trophy, 
  TrendingUp,
  TrendingDown,
  CheckCircle,
  XCircle,
  AlertCircle,
  Download,
  Upload,
  Filter,
  Search,
  Plus,
  Edit,
  Save,
  Trash2
} from 'lucide-react';

// Mock data for teacher gradebook
const mockClasses = [
  { id: 1, name: 'Class 10-A', subject: 'Mathematics', students: 32 },
  { id: 2, name: 'Class 9-B', subject: 'Mathematics', students: 28 },
  { id: 3, name: 'Class 11-C', subject: 'Advanced Mathematics', students: 25 },
  { id: 4, name: 'Class 8-A', subject: 'Mathematics', students: 35 }
];

const mockAssignments = [
  {
    id: 1,
    title: 'Algebra Quiz',
    class: 'Class 10-A',
    dueDate: '2024-06-25',
    totalMarks: 100,
    weightage: 15,
    status: 'grading',
    submissions: 28,
    totalStudents: 32
  },
  {
    id: 2,
    title: 'Geometry Project',
    class: 'Class 9-B',
    dueDate: '2024-06-28',
    totalMarks: 50,
    weightage: 20,
    status: 'grading',
    submissions: 22,
    totalStudents: 28
  },
  {
    id: 3,
    title: 'Calculus Assignment',
    class: 'Class 11-C',
    dueDate: '2024-06-30',
    totalMarks: 75,
    weightage: 25,
    status: 'active',
    submissions: 20,
    totalStudents: 25
  },
  {
    id: 4,
    title: 'Basic Math Test',
    class: 'Class 8-A',
    dueDate: '2024-07-02',
    totalMarks: 100,
    weightage: 30,
    status: 'active',
    submissions: 30,
    totalStudents: 35
  }
];

const mockStudents = [
  { id: 1, name: 'Aarav Sharma', roll: '01', class: 'Class 10-A', attendance: 95, overallGrade: 'A+', assignments: 8 },
  { id: 2, name: 'Priya Patel', roll: '02', class: 'Class 10-A', attendance: 92, overallGrade: 'A', assignments: 9 },
  { id: 3, name: 'Rahul Kumar', roll: '03', class: 'Class 10-A', attendance: 89, overallGrade: 'B+', assignments: 7 },
  { id: 4, name: 'Ananya Singh', roll: '04', class: 'Class 10-A', attendance: 98, overallGrade: 'A+', assignments: 10 },
  { id: 5, name: 'Vikram Mehta', roll: '05', class: 'Class 10-A', attendance: 87, overallGrade: 'B', assignments: 6 }
];

const mockGrades = [
  { studentId: 1, assignmentId: 1, marks: 95, grade: 'A+', submitted: true, feedback: 'Excellent work!' },
  { studentId: 2, assignmentId: 1, marks: 88, grade: 'A', submitted: true, feedback: 'Good understanding' },
  { studentId: 3, assignmentId: 1, marks: 75, grade: 'B+', submitted: true, feedback: 'Needs improvement' },
  { studentId: 4, assignmentId: 1, marks: 92, grade: 'A', submitted: true, feedback: 'Very good work' },
  { studentId: 5, assignmentId: 1, marks: 68, grade: 'C+', submitted: true, feedback: 'Please review concepts' }
];

const GradebookPage = () => {
  const [selectedClass, setSelectedClass] = useState(mockClasses[0]);
  const [selectedAssignment, setSelectedAssignment] = useState(mockAssignments[0]);
  const [viewMode, setViewMode] = useState('assignments');
  const [searchTerm, setSearchTerm] = useState('');
  const [editingGrades, setEditingGrades] = useState({});

  const getGradeColor = (grade) => {
    if (grade.includes('A')) return 'text-green-600 bg-green-100';
    if (grade.includes('B')) return 'text-blue-600 bg-blue-100';
    if (grade.includes('C')) return 'text-yellow-600 bg-yellow-100';
    if (grade.includes('D')) return 'text-orange-600 bg-orange-100';
    return 'text-red-600 bg-red-100';
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'text-green-600 bg-green-100';
      case 'grading': return 'text-blue-600 bg-blue-100';
      case 'completed': return 'text-gray-600 bg-gray-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const calculateGrade = (marks, totalMarks) => {
    const percentage = (marks / totalMarks) * 100;
    if (percentage >= 90) return 'A+';
    if (percentage >= 80) return 'A';
    if (percentage >= 70) return 'B+';
    if (percentage >= 60) return 'B';
    if (percentage >= 50) return 'C+';
    if (percentage >= 40) return 'C';
    return 'F';
  };

  const handleGradeChange = (studentId, assignmentId, value) => {
    setEditingGrades(prev => ({
      ...prev,
      [`${studentId}-${assignmentId}`]: value
    }));
  };

  const saveGrades = () => {
    // Here you would typically save to backend
    console.log('Saving grades:', editingGrades);
    setEditingGrades({});
  };

  const filteredStudents = mockStudents.filter(student =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.roll.includes(searchTerm)
  );

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto py-8 px-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-bold">Gradebook</h1>
            <p className="text-muted-foreground">Manage grades, assignments, and student performance</p>
          </div>
          <div className="flex gap-2">
            <Button asChild variant="outline">
              <Link to="/assignments">
                <div className="flex items-center">
                  <Plus className="h-4 w-4 mr-2" />
                  Create Assignment
                </div>
              </Link>
            </Button>
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export Grades
            </Button>
          </div>
        </div>

        {/* Class Selection */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-lg">Select Class</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {mockClasses.map((cls) => (
                <div
                  key={cls.id}
                  className={`p-4 border rounded-lg cursor-pointer transition-all hover:shadow-md ${
                    selectedClass.id === cls.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                  }`}
                  onClick={() => setSelectedClass(cls)}
                >
                  <h3 className="font-semibold text-lg">{cls.name}</h3>
                  <p className="text-sm text-muted-foreground">{cls.subject}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <Users className="h-4 w-4" />
                    <span className="text-sm">{cls.students} students</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Tabs value={viewMode} onValueChange={setViewMode} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="assignments">Assignments</TabsTrigger>
            <TabsTrigger value="students">Students</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="assignments" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Assignments - {selectedClass.name}</h2>
              <Button asChild>
                <Link to="/assignments">
                  <div className="flex items-center">
                    <Plus className="h-4 w-4 mr-2" />
                    New Assignment
                  </div>
                </Link>
              </Button>
            </div>

            <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {mockAssignments
                .filter(assignment => assignment.class === selectedClass.name)
                .map((assignment) => (
                  <Card key={assignment.id} className="hover:shadow-md transition-shadow">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <CardTitle className="text-lg">{assignment.title}</CardTitle>
                          <CardDescription>Due: {assignment.dueDate}</CardDescription>
                        </div>
                        <Badge className={getStatusColor(assignment.status)}>
                          {assignment.status}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex justify-between text-sm">
                          <span>Total Marks:</span>
                          <span className="font-medium">{assignment.totalMarks}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Weightage:</span>
                          <span className="font-medium">{assignment.weightage}%</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Submissions:</span>
                          <span className="font-medium">{assignment.submissions}/{assignment.totalStudents}</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-blue-600 h-2 rounded-full" 
                            style={{ width: `${(assignment.submissions / assignment.totalStudents) * 100}%` }}
                          ></div>
                        </div>
                        <div className="flex gap-2">
                          <Button 
                            size="sm" 
                            className="flex-1"
                            onClick={() => setSelectedAssignment(assignment)}
                          >
                            Grade Now
                          </Button>
                          <Button size="sm" variant="outline">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </TabsContent>

          <TabsContent value="students" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Students - {selectedClass.name}</h2>
              <div className="flex gap-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search students..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 w-64"
                  />
                </div>
                <Button variant="outline">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </Button>
              </div>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Student Performance</CardTitle>
                <CardDescription>View and manage individual student grades</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredStudents.map((student) => (
                    <div key={student.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                          <Users className="h-6 w-6 text-blue-600" />
                        </div>
                        <div>
                          <h4 className="font-medium">{student.name}</h4>
                          <p className="text-sm text-muted-foreground">Roll No: {student.roll}</p>
                        </div>
                      </div>
                      <div className="flex gap-6 text-sm">
                        <div className="text-center">
                          <div className="font-medium text-green-600">{student.attendance}%</div>
                          <div className="text-xs text-muted-foreground">Attendance</div>
                        </div>
                        <div className="text-center">
                          <Badge className={getGradeColor(student.overallGrade)}>
                            {student.overallGrade}
                          </Badge>
                          <div className="text-xs text-muted-foreground mt-1">Overall Grade</div>
                        </div>
                        <div className="text-center">
                          <div className="font-medium text-amber-600">{student.assignments}</div>
                          <div className="text-xs text-muted-foreground">Assignments</div>
                        </div>
                      </div>
                      <Button asChild size="sm" variant="outline">
                        <Link to={`/students/${student.id}`}>View Details</Link>
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <h2 className="text-xl font-semibold">Performance Analytics - {selectedClass.name}</h2>
            
            <div className="grid gap-6 grid-cols-1 md:grid-cols-3">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-green-600" />
                    Class Average
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-green-600">87.5%</div>
                  <p className="text-sm text-muted-foreground">+2.3% from last month</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Trophy className="h-5 w-5 text-blue-600" />
                    Top Performer
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-lg font-semibold">Ananya Singh</div>
                  <div className="text-2xl font-bold text-blue-600">95%</div>
                  <p className="text-sm text-muted-foreground">Grade: A+</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertCircle className="h-5 w-5 text-amber-600" />
                    Needs Attention
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-lg font-semibold">Vikram Mehta</div>
                  <div className="text-2xl font-bold text-amber-600">68%</div>
                  <p className="text-sm text-muted-foreground">Grade: C+</p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Grade Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">A+ (90-100%)</span>
                    <div className="flex items-center gap-2">
                      <div className="w-32 bg-gray-200 rounded-full h-2">
                        <div className="bg-green-600 h-2 rounded-full" style={{ width: '25%' }}></div>
                      </div>
                      <span className="text-sm font-medium">8 students</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">A (80-89%)</span>
                    <div className="flex items-center gap-2">
                      <div className="w-32 bg-gray-200 rounded-full h-2">
                        <div className="bg-blue-600 h-2 rounded-full" style={{ width: '40%' }}></div>
                      </div>
                      <span className="text-sm font-medium">13 students</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">B+ (70-79%)</span>
                    <div className="flex items-center gap-2">
                      <div className="w-32 bg-gray-200 rounded-full h-2">
                        <div className="bg-yellow-600 h-2 rounded-full" style={{ width: '25%' }}></div>
                      </div>
                      <span className="text-sm font-medium">8 students</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">B (60-69%)</span>
                    <div className="flex items-center gap-2">
                      <div className="w-32 bg-gray-200 rounded-full h-2">
                        <div className="bg-orange-600 h-2 rounded-full" style={{ width: '10%' }}></div>
                      </div>
                      <span className="text-sm font-medium">3 students</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Grade Entry Modal (simplified as inline) */}
        {selectedAssignment && (
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Grade Assignment: {selectedAssignment.title}</CardTitle>
              <CardDescription>Enter grades for {selectedClass.name} students</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockStudents
                  .filter(student => student.class === selectedClass.name)
                  .map((student) => {
                    const existingGrade = mockGrades.find(
                      g => g.studentId === student.id && g.assignmentId === selectedAssignment.id
                    );
                    const gradeKey = `${student.id}-${selectedAssignment.id}`;
                    const currentValue = editingGrades[gradeKey] || existingGrade?.marks || '';

                    return (
                      <div key={student.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                            <Users className="h-5 w-5 text-blue-600" />
                          </div>
                          <div>
                            <h4 className="font-medium">{student.name}</h4>
                            <p className="text-sm text-muted-foreground">Roll No: {student.roll}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-2">
                            <Label htmlFor={`marks-${student.id}`} className="text-sm">Marks:</Label>
                            <Input
                              id={`marks-${student.id}`}
                              type="number"
                              min="0"
                              max={selectedAssignment.totalMarks}
                              value={currentValue}
                              onChange={(e) => handleGradeChange(student.id, selectedAssignment.id, e.target.value)}
                              className="w-20"
                            />
                            <span className="text-sm text-muted-foreground">/ {selectedAssignment.totalMarks}</span>
                          </div>
                          <div className="text-center">
                            <Badge className={getGradeColor(calculateGrade(currentValue, selectedAssignment.totalMarks))}>
                              {currentValue ? calculateGrade(currentValue, selectedAssignment.totalMarks) : '-'}
                            </Badge>
                          </div>
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="outline">
                              <CheckCircle className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                <div className="flex justify-end gap-2 pt-4">
                  <Button variant="outline" onClick={() => setSelectedAssignment(null)}>
                    Cancel
                  </Button>
                  <Button onClick={saveGrades}>
                    <Save className="h-4 w-4 mr-2" />
                    Save Grades
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
};

export default GradebookPage; 