import React, { useState } from 'react';
import DashboardLayout from '@/frontend/components/layout/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Calendar,
  Download,
  FileText,
  Clock,
  MapPin,
  BookOpen,
  CheckCircle,
  AlertCircle,
  Eye,
  Printer,
  Share2,
  Filter,
  Search
} from 'lucide-react';

const ExamsPage = () => {
  const [selectedExam, setSelectedExam] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  // Mock exam data
  const exams = [
    {
      id: 1,
      name: 'Mid-Term Examination',
      subject: 'Mathematics',
      date: '2024-03-15',
      time: '09:00 AM - 12:00 PM',
      duration: '3 hours',
      venue: 'Room 101, Block A',
      status: 'upcoming',
      adminCardAvailable: true,
      resultCardAvailable: false,
      totalMarks: 100,
      passingMarks: 35,
      instructions: [
        'Bring your own stationery',
        'No calculators allowed',
        'Show all calculations clearly',
        'Mobile phones not allowed'
      ],
      syllabus: 'Chapters 1-5: Algebra, Geometry, Trigonometry',
      examType: 'Written',
      examCode: 'MT-MATH-2024-001'
    },
    {
      id: 2,
      name: 'Unit Test - Physics',
      subject: 'Physics',
      date: '2024-03-10',
      time: '02:00 PM - 04:00 PM',
      duration: '2 hours',
      venue: 'Lab 2, Science Block',
      status: 'completed',
      adminCardAvailable: false,
      resultCardAvailable: true,
      totalMarks: 50,
      passingMarks: 17,
      obtainedMarks: 42,
      percentage: 84,
      grade: 'A',
      instructions: [
        'Practical based questions',
        'Bring lab coat',
        'Scientific calculators allowed'
      ],
      syllabus: 'Chapter 3: Mechanics',
      examType: 'Theory + Practical',
      examCode: 'UT-PHY-2024-002'
    },
    {
      id: 3,
      name: 'Final Term Examination',
      subject: 'English',
      date: '2024-04-20',
      time: '10:00 AM - 01:00 PM',
      duration: '3 hours',
      venue: 'Auditorium',
      status: 'upcoming',
      adminCardAvailable: true,
      resultCardAvailable: false,
      totalMarks: 100,
      passingMarks: 35,
      instructions: [
        'Essay writing section included',
        'Bring blue/black pens only',
        'No correction fluid allowed'
      ],
      syllabus: 'Complete syllabus: Grammar, Literature, Writing',
      examType: 'Written',
      examCode: 'FT-ENG-2024-003'
    },
    {
      id: 4,
      name: 'Chemistry Lab Test',
      subject: 'Chemistry',
      date: '2024-03-05',
      time: '11:00 AM - 01:00 PM',
      duration: '2 hours',
      venue: 'Chemistry Lab',
      status: 'completed',
      adminCardAvailable: false,
      resultCardAvailable: true,
      totalMarks: 30,
      passingMarks: 10,
      obtainedMarks: 28,
      percentage: 93,
      grade: 'A+',
      instructions: [
        'Lab safety equipment mandatory',
        'Follow safety protocols',
        'Record observations carefully'
      ],
      syllabus: 'Chapter 2: Chemical Bonding',
      examType: 'Practical',
      examCode: 'LT-CHEM-2024-004'
    }
  ];

  const getStatusBadge = (status) => {
    switch (status) {
      case 'upcoming':
        return <Badge variant="secondary" className="bg-blue-100 text-blue-800">Upcoming</Badge>;
      case 'completed':
        return <Badge variant="secondary" className="bg-green-100 text-green-800">Completed</Badge>;
      case 'ongoing':
        return <Badge variant="secondary" className="bg-orange-100 text-orange-800">Ongoing</Badge>;
      default:
        return <Badge variant="secondary">Unknown</Badge>;
    }
  };

  const getGradeColor = (grade) => {
    switch (grade) {
      case 'A+':
        return 'text-green-600 font-bold';
      case 'A':
        return 'text-green-600';
      case 'B+':
        return 'text-blue-600';
      case 'B':
        return 'text-blue-600';
      case 'C+':
        return 'text-yellow-600';
      case 'C':
        return 'text-yellow-600';
      default:
        return 'text-red-600';
    }
  };

  const filteredExams = exams.filter(exam => {
    const matchesSearch = exam.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         exam.subject.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || exam.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const downloadAdminCard = (exam) => {
    // Mock download functionality
    const adminCardData = {
      studentName: 'Student User',
      rollNumber: '12A001',
      class: 'Class 12',
      section: 'A',
      examName: exam.name,
      examDate: exam.date,
      examTime: exam.time,
      venue: exam.venue,
      examCode: exam.examCode,
      instructions: exam.instructions
    };
    
    const blob = new Blob([JSON.stringify(adminCardData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `admin-card-${exam.examCode}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const downloadResultCard = (exam) => {
    // Mock download functionality
    const resultCardData = {
      studentName: 'Student User',
      rollNumber: '12A001',
      class: 'Class 12',
      section: 'A',
      examName: exam.name,
      examDate: exam.date,
      totalMarks: exam.totalMarks,
      obtainedMarks: exam.obtainedMarks,
      percentage: exam.percentage,
      grade: exam.grade,
      status: exam.obtainedMarks >= exam.passingMarks ? 'PASS' : 'FAIL'
    };
    
    const blob = new Blob([JSON.stringify(resultCardData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `result-card-${exam.examCode}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold tracking-tight mb-2">Examinations</h1>
          <p className="text-muted-foreground">View exam schedules, download admin cards, and check results</p>
        </div>

        <Tabs defaultValue="schedule" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="schedule">Exam Schedule</TabsTrigger>
            <TabsTrigger value="results">Results</TabsTrigger>
            <TabsTrigger value="documents">Documents</TabsTrigger>
          </TabsList>
          
          <TabsContent value="schedule" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Upcoming Examinations
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex gap-4 mb-6">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                      <input
                        type="text"
                        placeholder="Search exams..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="all">All Status</option>
                    <option value="upcoming">Upcoming</option>
                    <option value="completed">Completed</option>
                    <option value="ongoing">Ongoing</option>
                  </select>
                </div>

                <div className="grid gap-4">
                  {filteredExams.map((exam) => (
                    <Card key={exam.id} className="hover:shadow-md transition-shadow">
                      <CardContent className="p-6">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h3 className="text-lg font-semibold mb-1">{exam.name}</h3>
                            <p className="text-muted-foreground mb-2">{exam.subject}</p>
                            <div className="flex items-center gap-4 text-sm">
                              <div className="flex items-center gap-1">
                                <Calendar className="h-4 w-4" />
                                {exam.date}
                              </div>
                              <div className="flex items-center gap-1">
                                <Clock className="h-4 w-4" />
                                {exam.time}
                              </div>
                              <div className="flex items-center gap-1">
                                <MapPin className="h-4 w-4" />
                                {exam.venue}
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            {getStatusBadge(exam.status)}
                            {exam.adminCardAvailable && (
                              <Button size="sm" variant="outline" onClick={() => downloadAdminCard(exam)}>
                                <Download className="h-4 w-4 mr-1" />
                                Admin Card
                              </Button>
                            )}
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                          <div>
                            <p className="text-sm font-medium text-gray-600">Duration</p>
                            <p className="text-sm">{exam.duration}</p>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-600">Total Marks</p>
                            <p className="text-sm">{exam.totalMarks}</p>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-600">Exam Type</p>
                            <p className="text-sm">{exam.examType}</p>
                          </div>
                        </div>

                        <div className="border-t pt-4">
                          <h4 className="font-medium mb-2">Instructions:</h4>
                          <ul className="text-sm text-gray-600 space-y-1">
                            {exam.instructions.map((instruction, index) => (
                              <li key={index} className="flex items-start gap-2">
                                <span className="text-blue-500 mt-1">•</span>
                                {instruction}
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="mt-4 pt-4 border-t">
                          <h4 className="font-medium mb-2">Syllabus Coverage:</h4>
                          <p className="text-sm text-gray-600">{exam.syllabus}</p>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="results" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Exam Results
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  {exams.filter(exam => exam.status === 'completed').map((exam) => (
                    <Card key={exam.id} className="hover:shadow-md transition-shadow">
                      <CardContent className="p-6">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h3 className="text-lg font-semibold mb-1">{exam.name}</h3>
                            <p className="text-muted-foreground mb-2">{exam.subject}</p>
                            <p className="text-sm text-gray-600">Exam Date: {exam.date}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            {getStatusBadge(exam.status)}
                            {exam.resultCardAvailable && (
                              <Button size="sm" variant="outline" onClick={() => downloadResultCard(exam)}>
                                <Download className="h-4 w-4 mr-1" />
                                Result Card
                              </Button>
                            )}
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                          <div className="text-center p-3 bg-gray-50 rounded-lg">
                            <p className="text-sm font-medium text-gray-600">Total Marks</p>
                            <p className="text-lg font-bold">{exam.totalMarks}</p>
                          </div>
                          <div className="text-center p-3 bg-gray-50 rounded-lg">
                            <p className="text-sm font-medium text-gray-600">Obtained</p>
                            <p className="text-lg font-bold text-blue-600">{exam.obtainedMarks}</p>
                          </div>
                          <div className="text-center p-3 bg-gray-50 rounded-lg">
                            <p className="text-sm font-medium text-gray-600">Percentage</p>
                            <p className="text-lg font-bold text-green-600">{exam.percentage}%</p>
                          </div>
                          <div className="text-center p-3 bg-gray-50 rounded-lg">
                            <p className="text-sm font-medium text-gray-600">Grade</p>
                            <p className={`text-lg font-bold ${getGradeColor(exam.grade)}`}>{exam.grade}</p>
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            {exam.obtainedMarks >= exam.passingMarks ? (
                              <CheckCircle className="h-5 w-5 text-green-500" />
                            ) : (
                              <AlertCircle className="h-5 w-5 text-red-500" />
                            )}
                            <span className={`font-medium ${exam.obtainedMarks >= exam.passingMarks ? 'text-green-600' : 'text-red-600'}`}>
                              {exam.obtainedMarks >= exam.passingMarks ? 'PASSED' : 'FAILED'}
                            </span>
                          </div>
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline">
                              <Eye className="h-4 w-4 mr-1" />
                              View Details
                            </Button>
                            <Button size="sm" variant="outline">
                              <Printer className="h-4 w-4 mr-1" />
                              Print
                            </Button>
                            <Button size="sm" variant="outline">
                              <Share2 className="h-4 w-4 mr-1" />
                              Share
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="documents" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Download className="h-5 w-5" />
                  Download Documents
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Admin Cards</h3>
                    <div className="grid gap-4">
                      {exams.filter(exam => exam.adminCardAvailable).map((exam) => (
                        <div key={exam.id} className="flex items-center justify-between p-4 border rounded-lg">
                          <div>
                            <h4 className="font-medium">{exam.name}</h4>
                            <p className="text-sm text-gray-600">{exam.subject} • {exam.date}</p>
                            <p className="text-xs text-gray-500">Exam Code: {exam.examCode}</p>
                          </div>
                          <Button size="sm" onClick={() => downloadAdminCard(exam)}>
                            <Download className="h-4 w-4 mr-1" />
                            Download
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-4">Result Cards</h3>
                    <div className="grid gap-4">
                      {exams.filter(exam => exam.resultCardAvailable).map((exam) => (
                        <div key={exam.id} className="flex items-center justify-between p-4 border rounded-lg">
                          <div>
                            <h4 className="font-medium">{exam.name}</h4>
                            <p className="text-sm text-gray-600">{exam.subject} • {exam.date}</p>
                            <p className="text-sm">
                              <span className="font-medium">Score: </span>
                              {exam.obtainedMarks}/{exam.totalMarks} ({exam.percentage}%) - Grade {exam.grade}
                            </p>
                          </div>
                          <Button size="sm" onClick={() => downloadResultCard(exam)}>
                            <Download className="h-4 w-4 mr-1" />
                            Download
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-4">Other Documents</h3>
                    <div className="grid gap-4">
                      <div className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                          <h4 className="font-medium">Academic Calendar 2024</h4>
                          <p className="text-sm text-gray-600">Complete academic year schedule</p>
                        </div>
                        <Button size="sm" variant="outline">
                          <Download className="h-4 w-4 mr-1" />
                          Download
                        </Button>
                      </div>
                      <div className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                          <h4 className="font-medium">Exam Guidelines</h4>
                          <p className="text-sm text-gray-600">General examination rules and regulations</p>
                        </div>
                        <Button size="sm" variant="outline">
                          <Download className="h-4 w-4 mr-1" />
                          Download
                        </Button>
                      </div>
                      <div className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                          <h4 className="font-medium">Syllabus Overview</h4>
                          <p className="text-sm text-gray-600">Complete syllabus for all subjects</p>
                        </div>
                        <Button size="sm" variant="outline">
                          <Download className="h-4 w-4 mr-1" />
                          Download
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default ExamsPage; 