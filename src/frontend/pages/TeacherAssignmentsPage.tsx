import React, { useState } from 'react';
import DashboardLayout from '@/frontend/components/layout/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  ClipboardList, 
  Plus, 
  Search, 
  Filter,
  Calendar,
  Clock,
  Users,
  FileText,
  CheckCircle,
  AlertCircle,
  Eye,
  Edit,
  Trash2,
  Send,
  Download,
  Upload,
  FileUp,
  FileDown,
  X,
  Save,
  Share2,
  Printer,
  Mail
} from 'lucide-react';

// Type definitions
interface Assignment {
  id: number;
  title: string;
  class: string;
  subject: string;
  dueDate: string;
  status: 'pending' | 'completed' | 'overdue';
  totalStudents: number;
  submitted: number;
  graded: number;
  type: 'quiz' | 'test' | 'project' | 'assignment';
  description: string;
  attachments: string[];
  submissions: Submission[];
}

interface Submission {
  studentId: number;
  studentName: string;
  submittedAt: string;
  file: string;
  graded: boolean;
  score: number | null;
}

interface FormData {
  title: string;
  description: string;
  class: string;
  type: 'quiz' | 'test' | 'project' | 'assignment';
  dueDate: string;
  attachments: string[];
}

const TeacherAssignmentsPage = () => {
  const [activeTab, setActiveTab] = useState<string>('pending');
  const [showCreateForm, setShowCreateForm] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedAssignment, setSelectedAssignment] = useState<Assignment | null>(null);
  const [showDetails, setShowDetails] = useState<boolean>(false);
  const [showGrading, setShowGrading] = useState<boolean>(false);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [formData, setFormData] = useState<FormData>({
    title: '',
    description: '',
    class: '',
    type: 'quiz' as const,
    dueDate: '',
    attachments: []
  });

  // Mock assignments data
  const [assignments, setAssignments] = useState<Assignment[]>([
    {
      id: 1,
      title: 'Algebra Quiz',
      class: 'Class 10-A',
      subject: 'Mathematics',
      dueDate: '2024-06-25',
      status: 'pending',
      totalStudents: 32,
      submitted: 28,
      graded: 0,
      type: 'quiz',
      description: 'Quiz covering algebraic expressions and equations',
      attachments: ['algebra_quiz.pdf', 'solution_key.pdf'],
      submissions: [
        { studentId: 1, studentName: 'John Doe', submittedAt: '2024-06-20', file: 'john_quiz.pdf', graded: false, score: null },
        { studentId: 2, studentName: 'Jane Smith', submittedAt: '2024-06-21', file: 'jane_quiz.pdf', graded: false, score: null }
      ]
    },
    {
      id: 2,
      title: 'Geometry Project',
      class: 'Class 9-B',
      subject: 'Mathematics',
      dueDate: '2024-06-28',
      status: 'pending',
      totalStudents: 28,
      submitted: 22,
      graded: 0,
      type: 'project',
      description: 'Create a geometric design using various shapes and angles',
      attachments: ['project_guidelines.pdf', 'rubric.pdf'],
      submissions: [
        { studentId: 3, studentName: 'Mike Johnson', submittedAt: '2024-06-25', file: 'mike_project.pdf', graded: false, score: null }
      ]
    },
    {
      id: 3,
      title: 'Calculus Assignment',
      class: 'Class 11-C',
      subject: 'Advanced Mathematics',
      dueDate: '2024-06-30',
      status: 'pending',
      totalStudents: 25,
      submitted: 20,
      graded: 0,
      type: 'assignment',
      description: 'Solve calculus problems involving derivatives and integrals',
      attachments: ['calculus_problems.pdf'],
      submissions: []
    },
    {
      id: 4,
      title: 'Basic Math Test',
      class: 'Class 8-A',
      subject: 'Mathematics',
      dueDate: '2024-07-02',
      status: 'pending',
      totalStudents: 35,
      submitted: 30,
      graded: 0,
      type: 'test',
      description: 'Comprehensive test on basic mathematical operations',
      attachments: ['math_test.pdf', 'answer_sheet.pdf'],
      submissions: []
    },
    {
      id: 5,
      title: 'Trigonometry Quiz',
      class: 'Class 10-A',
      subject: 'Mathematics',
      dueDate: '2024-06-20',
      status: 'completed',
      totalStudents: 32,
      submitted: 30,
      graded: 30,
      type: 'quiz',
      description: 'Quiz on trigonometric functions and identities',
      attachments: ['trig_quiz.pdf'],
      submissions: [
        { studentId: 1, studentName: 'John Doe', submittedAt: '2024-06-18', file: 'john_trig.pdf', graded: true, score: 85 },
        { studentId: 2, studentName: 'Jane Smith', submittedAt: '2024-06-19', file: 'jane_trig.pdf', graded: true, score: 92 }
      ]
    }
  ]);

  const getStatusColor = (status: string): string => {
    switch (status) {
      case 'pending': return 'text-orange-600 bg-orange-100';
      case 'completed': return 'text-green-600 bg-green-100';
      case 'overdue': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getTypeColor = (type: string): string => {
    switch (type) {
      case 'quiz': return 'text-blue-600 bg-blue-100';
      case 'test': return 'text-purple-600 bg-purple-100';
      case 'project': return 'text-green-600 bg-green-100';
      case 'assignment': return 'text-yellow-600 bg-yellow-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getProgressPercentage = (submitted: number, total: number): number => {
    return Math.round((submitted / total) * 100);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const files = Array.from(e.target.files || []);
    setUploadedFiles(prev => [...prev, ...files]);
    setFormData(prev => ({
      ...prev,
      attachments: [...prev.attachments, ...files.map(f => f.name)]
    }));
  };

  const handleRemoveFile = (fileName: string): void => {
    setUploadedFiles(prev => prev.filter(f => f.name !== fileName));
    setFormData(prev => ({
      ...prev,
      attachments: prev.attachments.filter(name => name !== fileName)
    }));
  };

  const handleFormSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    const newAssignment: Assignment = {
      id: assignments.length + 1,
      ...formData,
      subject: 'Mathematics',
      status: 'pending',
      totalStudents: 30,
      submitted: 0,
      graded: 0,
      submissions: [],
      attachments: formData.attachments
    };
    setAssignments(prev => [...prev, newAssignment]);
    setFormData({
      title: '',
      description: '',
      class: '',
      type: 'quiz' as const,
      dueDate: '',
      attachments: []
    });
    setUploadedFiles([]);
    setShowCreateForm(false);
  };

  const handleDownloadAll = (assignment: Assignment): void => {
    // Simulate downloading all submissions
    const link = document.createElement('a');
    link.href = '#';
    link.download = `${assignment.title}_submissions.zip`;
    link.click();
  };

  const handleExportGrades = (assignment: Assignment): void => {
    const gradesData = assignment.submissions.map(sub => ({
      studentName: sub.studentName,
      score: sub.score || 'Not graded',
      submittedAt: sub.submittedAt
    }));
    
    const csvContent = "data:text/csv;charset=utf-8," 
      + "Student Name,Score,Submitted At\n"
      + gradesData.map(row => `${row.studentName},${row.score},${row.submittedAt}`).join("\n");
    
    const link = document.createElement('a');
    link.href = encodeURI(csvContent);
    link.download = `${assignment.title}_grades.csv`;
    link.click();
  };

  const handleImportGrades = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        // Process CSV file and update grades
        console.log('Importing grades from:', file.name);
      };
      reader.readAsText(file);
    }
  };

  const handleDeleteAssignment = (assignmentId: number): void => {
    if (window.confirm('Are you sure you want to delete this assignment?')) {
      setAssignments(prev => prev.filter(a => a.id !== assignmentId));
    }
  };

  const handleSendReminder = (assignment: Assignment): void => {
    // Simulate sending reminder emails
    alert(`Reminder emails sent to ${assignment.totalStudents - assignment.submitted} students for ${assignment.title}`);
  };

  const filteredAssignments = assignments.filter(assignment => {
    const matchesSearch = assignment.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         assignment.class.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTab = activeTab === 'all' || assignment.status === activeTab;
    return matchesSearch && matchesTab;
  });

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto py-8 px-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-bold">Assignment Management</h1>
            <p className="text-muted-foreground">Create, grade, and track student assignments and submissions</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
            <Button onClick={() => setShowCreateForm(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Create Assignment
            </Button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid gap-4 grid-cols-1 md:grid-cols-4 mb-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Assignments</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{assignments.length}</div>
              <p className="text-xs text-muted-foreground">This semester</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Pending Grading</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">
                {assignments.filter(a => a.status === 'pending').length}
              </div>
              <p className="text-xs text-muted-foreground">To be graded</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Average Submission</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">
                {Math.round(assignments.reduce((sum, a) => sum + getProgressPercentage(a.submitted, a.totalStudents), 0) / assignments.length)}%
              </div>
              <p className="text-xs text-muted-foreground">Submission rate</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Completed</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                {assignments.filter(a => a.status === 'completed').length}
              </div>
              <p className="text-xs text-muted-foreground">Fully graded</p>
            </CardContent>
          </Card>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="pending">Pending</TabsTrigger>
            <TabsTrigger value="overdue">Overdue</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="space-y-6">
            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search assignments..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Assignments List */}
            <div className="space-y-4">
              {filteredAssignments.map((assignment) => (
                <Card key={assignment.id} className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <CardTitle className="text-lg">{assignment.title}</CardTitle>
                          <Badge className={getTypeColor(assignment.type)}>
                            {assignment.type}
                          </Badge>
                          <Badge className={getStatusColor(assignment.status)}>
                            {assignment.status}
                          </Badge>
                        </div>
                        <CardDescription className="flex items-center gap-4">
                          <span className="flex items-center gap-1">
                            <Users className="h-4 w-4" />
                            {assignment.class}
                          </span>
                          <span className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            Due: {assignment.dueDate}
                          </span>
                          <span className="flex items-center gap-1">
                            <FileText className="h-4 w-4" />
                            {assignment.submitted}/{assignment.totalStudents} submitted
                          </span>
                        </CardDescription>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => {
                            setSelectedAssignment(assignment);
                            setShowDetails(true);
                          }}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleDeleteAssignment(assignment.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">{assignment.description}</p>
                    
                    {/* Attachments */}
                    {assignment.attachments.length > 0 && (
                      <div className="mb-4">
                        <h4 className="text-sm font-medium mb-2">Attachments:</h4>
                        <div className="flex flex-wrap gap-2">
                          {assignment.attachments.map((file, index) => (
                            <Badge key={index} variant="outline" className="cursor-pointer hover:bg-blue-50">
                              <FileText className="h-3 w-3 mr-1" />
                              {file}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Submission Progress</span>
                          <span>{getProgressPercentage(assignment.submitted, assignment.totalStudents)}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-blue-600 h-2 rounded-full" 
                            style={{ width: `${getProgressPercentage(assignment.submitted, assignment.totalStudents)}%` }}
                          ></div>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between pt-3 border-t">
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <CheckCircle className="h-4 w-4" />
                            {assignment.graded} graded
                          </span>
                          <span className="flex items-center gap-1">
                            <AlertCircle className="h-4 w-4" />
                            {assignment.submitted - assignment.graded} pending
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => handleDownloadAll(assignment)}
                          >
                            <Download className="h-4 w-4 mr-2" />
                            Download All
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => handleExportGrades(assignment)}
                          >
                            <FileDown className="h-4 w-4 mr-2" />
                            Export Grades
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => handleSendReminder(assignment)}
                          >
                            <Mail className="h-4 w-4 mr-2" />
                            Send Reminder
                          </Button>
                          <Button 
                            size="sm"
                            onClick={() => {
                              setSelectedAssignment(assignment);
                              setShowGrading(true);
                            }}
                          >
                            <Send className="h-4 w-4 mr-2" />
                            Grade Now
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
              
              {filteredAssignments.length === 0 && (
                <Card>
                  <CardContent className="flex items-center justify-center py-12">
                    <div className="text-center text-muted-foreground">
                      <ClipboardList className="h-12 w-12 mx-auto mb-4 opacity-50" />
                      <p className="text-lg">No assignments found</p>
                      <p className="text-sm">Try adjusting your search or filters</p>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>
        </Tabs>

        {/* Create Assignment Modal */}
        {showCreateForm && (
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Create New Assignment</CardTitle>
              <CardDescription>Set up a new assignment for your students</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleFormSubmit} className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Assignment Title</label>
                  <Input 
                    placeholder="Enter assignment title" 
                    value={formData.title}
                    onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                    required
                  />
                </div>
                
                <div>
                  <label className="text-sm font-medium">Description</label>
                  <Textarea 
                    placeholder="Enter assignment description" 
                    rows={3}
                    value={formData.description}
                    onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                    required
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="text-sm font-medium">Class</label>
                    <Select value={formData.class} onValueChange={(value) => setFormData(prev => ({ ...prev, class: value }))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select class" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Class 10-A">Class 10-A</SelectItem>
                        <SelectItem value="Class 9-B">Class 9-B</SelectItem>
                        <SelectItem value="Class 11-C">Class 11-C</SelectItem>
                        <SelectItem value="Class 8-A">Class 8-A</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium">Type</label>
                    <Select value={formData.type} onValueChange={(value) => setFormData(prev => ({ ...prev, type: value as 'quiz' | 'test' | 'project' | 'assignment' }))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="quiz">Quiz</SelectItem>
                        <SelectItem value="test">Test</SelectItem>
                        <SelectItem value="project">Project</SelectItem>
                        <SelectItem value="assignment">Assignment</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium">Due Date</label>
                    <Input 
                      type="date" 
                      value={formData.dueDate}
                      onChange={(e) => setFormData(prev => ({ ...prev, dueDate: e.target.value }))}
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium">Attachments</label>
                  <div className="mt-2">
                    <input
                      type="file"
                      multiple
                      onChange={handleFileUpload}
                      className="hidden"
                      id="file-upload"
                    />
                    <label htmlFor="file-upload" className="cursor-pointer">
                      <Button type="button" variant="outline" className="w-full">
                        <Upload className="h-4 w-4 mr-2" />
                        Upload Files
                      </Button>
                    </label>
                  </div>
                  {uploadedFiles.length > 0 && (
                    <div className="mt-2 space-y-1">
                      {uploadedFiles.map((file, index) => (
                        <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                          <span className="text-sm">{file.name}</span>
                          <Button
                            type="button"
                            size="sm"
                            variant="ghost"
                            onClick={() => handleRemoveFile(file.name)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                
                <div className="flex justify-end gap-2 pt-4">
                  <Button type="button" variant="outline" onClick={() => setShowCreateForm(false)}>
                    Cancel
                  </Button>
                  <Button type="submit">
                    <Save className="h-4 w-4 mr-2" />
                    Create Assignment
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        {/* Assignment Details Modal */}
        {showDetails && selectedAssignment && (
          <Card className="mt-6">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle>{selectedAssignment.title}</CardTitle>
                  <CardDescription>Assignment Details and Submissions</CardDescription>
                </div>
                <Button variant="outline" size="sm" onClick={() => setShowDetails(false)}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium mb-2">Assignment Info</h4>
                    <div className="space-y-2 text-sm">
                      <p><span className="font-medium">Class:</span> {selectedAssignment.class}</p>
                      <p><span className="font-medium">Type:</span> {selectedAssignment.type}</p>
                      <p><span className="font-medium">Due Date:</span> {selectedAssignment.dueDate}</p>
                      <p><span className="font-medium">Status:</span> {selectedAssignment.status}</p>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Statistics</h4>
                    <div className="space-y-2 text-sm">
                      <p><span className="font-medium">Total Students:</span> {selectedAssignment.totalStudents}</p>
                      <p><span className="font-medium">Submitted:</span> {selectedAssignment.submitted}</p>
                      <p><span className="font-medium">Graded:</span> {selectedAssignment.graded}</p>
                      <p><span className="font-medium">Submission Rate:</span> {getProgressPercentage(selectedAssignment.submitted, selectedAssignment.totalStudents)}%</p>
                    </div>
                  </div>
                </div>

                {selectedAssignment.submissions.length > 0 && (
                  <div>
                    <h4 className="font-medium mb-2">Recent Submissions</h4>
                    <div className="space-y-2">
                      {selectedAssignment.submissions.slice(0, 5).map((submission, index) => (
                        <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                          <div>
                            <p className="font-medium">{submission.studentName}</p>
                            <p className="text-sm text-muted-foreground">Submitted: {submission.submittedAt}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge variant={submission.graded ? "default" : "secondary"}>
                              {submission.graded ? `Score: ${submission.score}` : 'Not graded'}
                            </Badge>
                            <Button size="sm" variant="outline">
                              <Download className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex justify-end gap-2 pt-4 border-t">
                  <Button variant="outline" onClick={() => setShowDetails(false)}>
                    Close
                  </Button>
                  <Button onClick={() => {
                    setShowDetails(false);
                    setShowGrading(true);
                  }}>
                    <Send className="h-4 w-4 mr-2" />
                    Grade Submissions
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Grading Modal */}
        {showGrading && selectedAssignment && (
          <Card className="mt-6">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle>Grade Submissions - {selectedAssignment.title}</CardTitle>
                  <CardDescription>Review and grade student submissions</CardDescription>
                </div>
                <Button variant="outline" size="sm" onClick={() => setShowGrading(false)}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-4 mb-4">
                  <Button variant="outline">
                    <FileUp className="h-4 w-4 mr-2" />
                    Import Grades
                    <input
                      type="file"
                      accept=".csv"
                      onChange={handleImportGrades}
                      className="hidden"
                      id="import-grades"
                    />
                  </Button>
                  <Button variant="outline" onClick={() => handleExportGrades(selectedAssignment)}>
                    <FileDown className="h-4 w-4 mr-2" />
                    Export Grades
                  </Button>
                  <Button variant="outline">
                    <Printer className="h-4 w-4 mr-2" />
                    Print Grades
                  </Button>
                </div>

                {selectedAssignment.submissions.length > 0 ? (
                  <div className="space-y-2">
                    {selectedAssignment.submissions.map((submission, index) => (
                      <div key={index} className="flex items-center justify-between p-3 border rounded">
                        <div>
                          <p className="font-medium">{submission.studentName}</p>
                          <p className="text-sm text-muted-foreground">File: {submission.file}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Input
                            type="number"
                            placeholder="Score"
                            className="w-20"
                            defaultValue={submission.score || ''}
                          />
                          <Button size="sm" variant="outline">
                            <Download className="h-4 w-4" />
                          </Button>
                          <Button size="sm">
                            <Save className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>No submissions yet</p>
                  </div>
                )}

                <div className="flex justify-end gap-2 pt-4 border-t">
                  <Button variant="outline" onClick={() => setShowGrading(false)}>
                    Cancel
                  </Button>
                  <Button>
                    <Save className="h-4 w-4 mr-2" />
                    Save All Grades
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

export default TeacherAssignmentsPage; 