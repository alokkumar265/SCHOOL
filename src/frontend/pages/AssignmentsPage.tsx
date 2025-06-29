import React, { useState } from 'react';
import { useAuth } from '@/backend/contexts/AuthContext';
import DashboardLayout from '@/frontend/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { 
  BookOpen, 
  Upload, 
  Download, 
  Clock, 
  CheckCircle, 
  XCircle, 
  AlertCircle,
  FileText,
  MessageSquare,
  Star,
  Eye,
  Send,
  Calendar,
  User,
  File,
  Check,
  AlertTriangle
} from 'lucide-react';

const AssignmentsPage = () => {
  const { user } = useAuth();
  const [selectedFile, setSelectedFile] = useState(null);
  const [submissionComment, setSubmissionComment] = useState('');

  // Enhanced assignments data with more details
  const assignments = [
    {
      id: 1,
      title: 'Mathematics Assignment - Calculus',
      subject: 'Mathematics',
      teacher: 'Mrs. Sharma',
      description: 'Solve problems 1-20 from Chapter 5. Show all work and steps clearly.',
      dueDate: '2024-01-15',
      dueTime: '23:59',
      status: 'pending',
      maxMarks: 25,
      submittedAt: null,
      submittedFile: null,
      feedback: null,
      grade: null,
      plagiarismScore: null,
      attachments: ['assignment_math_5.pdf', 'sample_solutions.pdf'],
      requirements: ['PDF format only', 'Maximum 10 pages', 'Show all calculations'],
      category: 'Homework'
    },
    {
      id: 2,
      title: 'Physics Lab Report - Mechanics',
      subject: 'Physics',
      teacher: 'Mr. Patel',
      description: 'Write a comprehensive lab report on the pendulum experiment conducted in class.',
      dueDate: '2024-01-10',
      dueTime: '23:59',
      status: 'submitted',
      maxMarks: 30,
      submittedAt: '2024-01-09T14:30:00',
      submittedFile: 'physics_lab_report.pdf',
      feedback: 'Excellent work! Your analysis is thorough and well-presented. Consider adding more error analysis.',
      grade: 28,
      plagiarismScore: 2,
      attachments: ['lab_manual.pdf', 'data_sheet.xlsx'],
      requirements: ['Word document', 'Include graphs and tables', 'Minimum 5 pages'],
      category: 'Lab Report'
    },
    {
      id: 3,
      title: 'English Essay - Shakespeare',
      subject: 'English',
      teacher: 'Ms. Johnson',
      description: 'Write a 1000-word essay analyzing the theme of love in Romeo and Juliet.',
      dueDate: '2024-01-20',
      dueTime: '23:59',
      status: 'overdue',
      maxMarks: 20,
      submittedAt: null,
      submittedFile: null,
      feedback: null,
      grade: null,
      plagiarismScore: null,
      attachments: ['essay_guidelines.pdf', 'rubric.pdf'],
      requirements: ['1000 words minimum', 'MLA format', 'Include citations'],
      category: 'Essay'
    },
    {
      id: 4,
      title: 'Chemistry Project - Periodic Table',
      subject: 'Chemistry',
      teacher: 'Dr. Kumar',
      description: 'Create a presentation on the modern periodic table and its applications.',
      dueDate: '2024-01-25',
      dueTime: '23:59',
      status: 'pending',
      maxMarks: 35,
      submittedAt: null,
      submittedFile: null,
      feedback: null,
      grade: null,
      plagiarismScore: null,
      attachments: ['project_guidelines.pdf', 'presentation_template.pptx'],
      requirements: ['PowerPoint presentation', '15-20 slides', 'Include references'],
      category: 'Project'
    },
    {
      id: 5,
      title: 'Computer Science Coding Assignment',
      subject: 'Computer Science',
      teacher: 'Mr. Singh',
      description: 'Implement a binary search tree with insertion, deletion, and traversal operations.',
      dueDate: '2024-01-12',
      dueTime: '23:59',
      status: 'submitted',
      maxMarks: 25,
      submittedAt: '2024-01-11T16:45:00',
      submittedFile: 'bst_implementation.zip',
      feedback: 'Good implementation! Code is well-structured. Consider adding more comments for better readability.',
      grade: 23,
      plagiarismScore: 1,
      attachments: ['assignment_spec.pdf', 'test_cases.txt'],
      requirements: ['Java/Python code', 'Include documentation', 'Test cases'],
      category: 'Programming'
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'submitted': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'overdue': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'submitted': return <CheckCircle className="h-4 w-4" />;
      case 'pending': return <Clock className="h-4 w-4" />;
      case 'overdue': return <XCircle className="h-4 w-4" />;
      default: return <AlertCircle className="h-4 w-4" />;
    }
  };

  const getPlagiarismColor = (score) => {
    if (score <= 5) return 'bg-green-100 text-green-800';
    if (score <= 15) return 'bg-yellow-100 text-yellow-800';
    return 'bg-red-100 text-red-800';
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatTime = (timeString) => {
    return new Date(`2000-01-01T${timeString}`).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
  };

  const handleSubmit = (assignmentId) => {
    // Handle assignment submission
    console.log('Submitting assignment:', assignmentId, selectedFile, submissionComment);
    // Reset form
    setSelectedFile(null);
    setSubmissionComment('');
  };

  const getDaysRemaining = (dueDate) => {
    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = due - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold tracking-tight mb-2">Assignments</h1>
          <p className="text-muted-foreground">View, submit, and track your assignments</p>
        </div>

        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="all">All Assignments</TabsTrigger>
            <TabsTrigger value="pending">Pending</TabsTrigger>
            <TabsTrigger value="submitted">Submitted</TabsTrigger>
            <TabsTrigger value="overdue">Overdue</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-6">
            {assignments.map((assignment) => (
              <Card key={assignment.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="flex items-center gap-2 mb-2">
                        <BookOpen className="h-5 w-5 text-blue-600" />
                        {assignment.title}
                      </CardTitle>
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <span className="flex items-center gap-1">
                          <User className="h-3 w-3" />
                          {assignment.teacher}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          Due: {formatDate(assignment.dueDate)} at {formatTime(assignment.dueTime)}
                        </span>
                        <span className="flex items-center gap-1">
                          <Star className="h-3 w-3" />
                          {assignment.maxMarks} marks
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className={getStatusColor(assignment.status)}>
                        {getStatusIcon(assignment.status)}
                        <span className="ml-1">{assignment.status}</span>
                      </Badge>
                      {assignment.status === 'pending' && (
                        <Badge variant="outline" className="text-orange-600">
                          {getDaysRemaining(assignment.dueDate)} days left
                        </Badge>
                      )}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 mb-4">{assignment.description}</p>
                  
                  {/* Requirements */}
                  <div className="mb-4">
                    <h4 className="font-medium mb-2">Requirements:</h4>
                    <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                      {assignment.requirements.map((req, index) => (
                        <li key={index}>{req}</li>
                      ))}
                    </ul>
                  </div>

                  {/* Attachments */}
                  <div className="mb-4">
                    <h4 className="font-medium mb-2">Attachments:</h4>
                    <div className="flex flex-wrap gap-2">
                      {assignment.attachments.map((file, index) => (
                        <Button key={index} size="sm" variant="outline">
                          <Download className="h-3 w-3 mr-1" />
                          {file}
                        </Button>
                      ))}
                    </div>
                  </div>

                  {/* Submission Status */}
                  {assignment.status === 'submitted' && (
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium text-green-800">Submitted</h4>
                          <p className="text-sm text-green-600">
                            Submitted on {formatDate(assignment.submittedAt)}
                          </p>
                          <p className="text-sm text-green-600">
                            File: {assignment.submittedFile}
                          </p>
                        </div>
                        <div className="text-right">
                          {assignment.grade && (
                            <div className="text-lg font-bold text-green-800">
                              Grade: {assignment.grade}/{assignment.maxMarks}
                            </div>
                          )}
                          {assignment.plagiarismScore !== null && (
                            <Badge className={getPlagiarismColor(assignment.plagiarismScore)}>
                              <Check className="h-3 w-3 mr-1" />
                              Plagiarism: {assignment.plagiarismScore}%
                            </Badge>
                          )}
                        </div>
                      </div>
                      {assignment.feedback && (
                        <div className="mt-3 p-3 bg-white rounded border">
                          <h5 className="font-medium text-green-800 mb-1">Teacher Feedback:</h5>
                          <p className="text-sm text-gray-700">{assignment.feedback}</p>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex items-center gap-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4 mr-1" />
                          View Details
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl">
                        <DialogHeader>
                          <DialogTitle>{assignment.title}</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div>
                            <h4 className="font-medium mb-2">Description</h4>
                            <p className="text-gray-700">{assignment.description}</p>
                          </div>
                          <div>
                            <h4 className="font-medium mb-2">Requirements</h4>
                            <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                              {assignment.requirements.map((req, index) => (
                                <li key={index}>{req}</li>
                              ))}
                            </ul>
                          </div>
                          {assignment.status === 'pending' && (
                            <div>
                              <h4 className="font-medium mb-2">Submit Assignment</h4>
                              <div className="space-y-3">
                                <div>
                                  <label className="block text-sm font-medium mb-1">Upload File</label>
                                  <Input
                                    type="file"
                                    onChange={handleFileSelect}
                                    accept=".pdf,.doc,.docx,.zip,.rar"
                                  />
                                </div>
                                <div>
                                  <label className="block text-sm font-medium mb-1">Comments (Optional)</label>
                                  <Textarea
                                    placeholder="Add any comments about your submission..."
                                    value={submissionComment}
                                    onChange={(e) => setSubmissionComment(e.target.value)}
                                  />
                                </div>
                                <Button onClick={() => handleSubmit(assignment.id)}>
                                  <Send className="h-4 w-4 mr-1" />
                                  Submit Assignment
                                </Button>
                              </div>
                            </div>
                          )}
                        </div>
                      </DialogContent>
                    </Dialog>

                    {assignment.status === 'pending' && (
                      <Button size="sm">
                        <Upload className="h-4 w-4 mr-1" />
                        Submit Now
                      </Button>
                    )}
                    
                    <Button variant="outline" size="sm">
                      <MessageSquare className="h-4 w-4 mr-1" />
                      Ask Question
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="pending" className="space-y-6">
            {assignments.filter(a => a.status === 'pending').map((assignment) => (
              <Card key={assignment.id} className="border-yellow-200 bg-yellow-50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5 text-yellow-600" />
                    {assignment.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 mb-4">{assignment.description}</p>
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-gray-600">
                      Due: {formatDate(assignment.dueDate)} • {getDaysRemaining(assignment.dueDate)} days left
                    </div>
                    <Button>
                      <Upload className="h-4 w-4 mr-1" />
                      Submit Assignment
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="submitted" className="space-y-6">
            {assignments.filter(a => a.status === 'submitted').map((assignment) => (
              <Card key={assignment.id} className="border-green-200 bg-green-50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    {assignment.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Submitted on {formatDate(assignment.submittedAt)}</p>
                      {assignment.grade && (
                        <p className="text-lg font-bold text-green-800">
                          Grade: {assignment.grade}/{assignment.maxMarks}
                        </p>
                      )}
                    </div>
                    <div className="text-right">
                      {assignment.plagiarismScore !== null && (
                        <Badge className={getPlagiarismColor(assignment.plagiarismScore)}>
                          Plagiarism: {assignment.plagiarismScore}%
                        </Badge>
                      )}
                    </div>
                  </div>
                  {assignment.feedback && (
                    <div className="mt-3 p-3 bg-white rounded border">
                      <h5 className="font-medium text-green-800 mb-1">Teacher Feedback:</h5>
                      <p className="text-sm text-gray-700">{assignment.feedback}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="overdue" className="space-y-6">
            {assignments.filter(a => a.status === 'overdue').map((assignment) => (
              <Card key={assignment.id} className="border-red-200 bg-red-50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <XCircle className="h-5 w-5 text-red-600" />
                    {assignment.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 mb-4">{assignment.description}</p>
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-red-600">
                      Overdue by {Math.abs(getDaysRemaining(assignment.dueDate))} days
                    </div>
                    <Button variant="destructive">
                      <Upload className="h-4 w-4 mr-1" />
                      Submit Late
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default AssignmentsPage; 