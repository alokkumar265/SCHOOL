import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { 
  Clock, 
  BookOpen, 
  FileText, 
  Play, 
  Download, 
  Calendar,
  Target,
  TrendingUp,
  Award,
  Users,
  MessageSquare,
  AlertCircle
} from 'lucide-react';
import DashboardLayout from '@/frontend/components/layout/DashboardLayout';

interface MockTest {
  id: string;
  title: string;
  subject: string;
  duration: number;
  questions: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  completed: boolean;
  score?: number;
  totalScore: number;
}

interface PreviousPaper {
  id: string;
  year: number;
  subject: string;
  examType: string;
  downloadUrl: string;
  solutionsUrl?: string;
}

interface StudyMaterial {
  id: string;
  title: string;
  subject: string;
  type: 'Notes' | 'Video' | 'Practice' | 'Formula';
  description: string;
  downloadUrl?: string;
  videoUrl?: string;
}

const ExamPreparationPage = () => {
  const [selectedSubject, setSelectedSubject] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Mock data
  const mockTests: MockTest[] = [
    {
      id: '1',
      title: 'Mathematics Mid-Term Mock Test',
      subject: 'Mathematics',
      duration: 120,
      questions: 50,
      difficulty: 'Medium',
      completed: false,
      totalScore: 100
    },
    {
      id: '2',
      title: 'Physics Unit Test - Mechanics',
      subject: 'Physics',
      duration: 90,
      questions: 30,
      difficulty: 'Hard',
      completed: true,
      score: 85,
      totalScore: 100
    },
    {
      id: '3',
      title: 'English Literature Quiz',
      subject: 'English',
      duration: 60,
      questions: 25,
      difficulty: 'Easy',
      completed: false,
      totalScore: 50
    },
    {
      id: '4',
      title: 'Chemistry Final Practice',
      subject: 'Chemistry',
      duration: 150,
      questions: 60,
      difficulty: 'Hard',
      completed: false,
      totalScore: 120
    }
  ];

  const previousPapers: PreviousPaper[] = [
    {
      id: '1',
      year: 2023,
      subject: 'Mathematics',
      examType: 'Final Exam',
      downloadUrl: '#',
      solutionsUrl: '#'
    },
    {
      id: '2',
      year: 2022,
      subject: 'Physics',
      examType: 'Mid-Term',
      downloadUrl: '#',
      solutionsUrl: '#'
    },
    {
      id: '3',
      year: 2023,
      subject: 'Chemistry',
      examType: 'Unit Test',
      downloadUrl: '#'
    },
    {
      id: '4',
      year: 2022,
      subject: 'English',
      examType: 'Final Exam',
      downloadUrl: '#',
      solutionsUrl: '#'
    }
  ];

  const studyMaterials: StudyMaterial[] = [
    {
      id: '1',
      title: 'Mathematics Formula Sheet',
      subject: 'Mathematics',
      type: 'Formula',
      description: 'Complete formula sheet for all mathematics topics',
      downloadUrl: '#'
    },
    {
      id: '2',
      title: 'Physics Problem Solving Techniques',
      subject: 'Physics',
      type: 'Video',
      description: 'Video lectures on problem-solving strategies',
      videoUrl: '#'
    },
    {
      id: '3',
      title: 'Chemistry Lab Safety Guidelines',
      subject: 'Chemistry',
      type: 'Notes',
      description: 'Important safety protocols for chemistry lab',
      downloadUrl: '#'
    },
    {
      id: '4',
      title: 'English Essay Writing Practice',
      subject: 'English',
      type: 'Practice',
      description: 'Practice essays with sample answers',
      downloadUrl: '#'
    }
  ];

  const upcomingExams = [
    {
      id: '1',
      subject: 'Mathematics',
      examType: 'Final Exam',
      date: '2024-03-15',
      time: '09:00 AM',
      duration: '3 hours',
      room: 'Room 101'
    },
    {
      id: '2',
      subject: 'Physics',
      examType: 'Unit Test',
      date: '2024-03-20',
      time: '10:30 AM',
      duration: '1.5 hours',
      room: 'Room 205'
    }
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-100 text-green-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Hard': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Notes': return 'bg-blue-100 text-blue-800';
      case 'Video': return 'bg-purple-100 text-purple-800';
      case 'Practice': return 'bg-orange-100 text-orange-800';
      case 'Formula': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredMockTests = mockTests.filter(test => 
    (selectedSubject === 'all' || test.subject === selectedSubject) &&
    test.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredStudyMaterials = studyMaterials.filter(material =>
    (selectedSubject === 'all' || material.subject === selectedSubject) &&
    material.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Exam Preparation</h1>
            <p className="text-gray-600 mt-2">Prepare for your exams with mock tests, study materials, and previous papers</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-right">
              <p className="text-sm text-gray-500">Next Exam</p>
              <p className="font-semibold text-gray-900">Mathematics Final</p>
              <p className="text-sm text-gray-500">March 15, 2024</p>
            </div>
            <div className="bg-red-100 p-3 rounded-lg">
              <Clock className="h-6 w-6 text-red-600" />
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="bg-blue-100 p-2 rounded-lg">
                  <Target className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Mock Tests</p>
                  <p className="text-xl font-semibold">{mockTests.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="bg-green-100 p-2 rounded-lg">
                  <TrendingUp className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Completed</p>
                  <p className="text-xl font-semibold">{mockTests.filter(t => t.completed).length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="bg-purple-100 p-2 rounded-lg">
                  <Award className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Average Score</p>
                  <p className="text-xl font-semibold">85%</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="bg-orange-100 p-2 rounded-lg">
                  <BookOpen className="h-5 w-5 text-orange-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Study Materials</p>
                  <p className="text-xl font-semibold">{studyMaterials.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="mock-tests" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="mock-tests">Mock Tests</TabsTrigger>
            <TabsTrigger value="study-materials">Study Materials</TabsTrigger>
            <TabsTrigger value="previous-papers">Previous Papers</TabsTrigger>
            <TabsTrigger value="upcoming-exams">Upcoming Exams</TabsTrigger>
          </TabsList>

          {/* Mock Tests Tab */}
          <TabsContent value="mock-tests" className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <select 
                  value={selectedSubject} 
                  onChange={(e) => setSelectedSubject(e.target.value)}
                  className="border border-gray-300 rounded-lg px-3 py-2"
                >
                  <option value="all">All Subjects</option>
                  <option value="Mathematics">Mathematics</option>
                  <option value="Physics">Physics</option>
                  <option value="Chemistry">Chemistry</option>
                  <option value="English">English</option>
                </select>
              </div>
              <Input
                placeholder="Search mock tests..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-64"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredMockTests.map((test) => (
                <Card key={test.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-lg">{test.title}</CardTitle>
                        <CardDescription className="mt-2">{test.subject}</CardDescription>
                      </div>
                      <Badge className={getDifficultyColor(test.difficulty)}>
                        {test.difficulty}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between text-sm text-gray-600">
                      <span>Duration: {test.duration} min</span>
                      <span>{test.questions} questions</span>
                    </div>
                    
                    {test.completed && test.score !== undefined && (
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span>Your Score</span>
                          <span className="font-semibold">{test.score}/{test.totalScore}</span>
                        </div>
                        <Progress value={(test.score / test.totalScore) * 100} className="h-2" />
                      </div>
                    )}

                    <div className="flex space-x-2">
                      {test.completed ? (
                        <Button variant="outline" className="flex-1">
                          <FileText className="h-4 w-4 mr-2" />
                          View Results
                        </Button>
                      ) : (
                        <Button className="flex-1">
                          <Play className="h-4 w-4 mr-2" />
                          Start Test
                        </Button>
                      )}
                      <Button variant="outline" size="sm">
                        <MessageSquare className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Study Materials Tab */}
          <TabsContent value="study-materials" className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <select 
                  value={selectedSubject} 
                  onChange={(e) => setSelectedSubject(e.target.value)}
                  className="border border-gray-300 rounded-lg px-3 py-2"
                >
                  <option value="all">All Subjects</option>
                  <option value="Mathematics">Mathematics</option>
                  <option value="Physics">Physics</option>
                  <option value="Chemistry">Chemistry</option>
                  <option value="English">English</option>
                </select>
              </div>
              <Input
                placeholder="Search study materials..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-64"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredStudyMaterials.map((material) => (
                <Card key={material.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-lg">{material.title}</CardTitle>
                        <CardDescription className="mt-2">{material.subject}</CardDescription>
                      </div>
                      <Badge className={getTypeColor(material.type)}>
                        {material.type}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-gray-600">{material.description}</p>
                    
                    <div className="flex space-x-2">
                      {material.downloadUrl && (
                        <Button variant="outline" className="flex-1">
                          <Download className="h-4 w-4 mr-2" />
                          Download
                        </Button>
                      )}
                      {material.videoUrl && (
                        <Button className="flex-1">
                          <Play className="h-4 w-4 mr-2" />
                          Watch Video
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Previous Papers Tab */}
          <TabsContent value="previous-papers" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {previousPapers.map((paper) => (
                <Card key={paper.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="text-lg">{paper.subject}</CardTitle>
                    <CardDescription>{paper.examType} - {paper.year}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <Calendar className="h-4 w-4" />
                      <span>{paper.year}</span>
                    </div>
                    
                    <div className="flex space-x-2">
                      <Button variant="outline" className="flex-1">
                        <Download className="h-4 w-4 mr-2" />
                        Question Paper
                      </Button>
                      {paper.solutionsUrl && (
                        <Button variant="outline" className="flex-1">
                          <FileText className="h-4 w-4 mr-2" />
                          Solutions
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Upcoming Exams Tab */}
          <TabsContent value="upcoming-exams" className="space-y-6">
            <div className="space-y-4">
              {upcomingExams.map((exam) => (
                <Card key={exam.id} className="border-l-4 border-l-red-500">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3">
                          <h3 className="text-lg font-semibold">{exam.subject}</h3>
                          <Badge variant="destructive">{exam.examType}</Badge>
                        </div>
                        <div className="mt-2 grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600">
                          <div className="flex items-center space-x-2">
                            <Calendar className="h-4 w-4" />
                            <span>{exam.date}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Clock className="h-4 w-4" />
                            <span>{exam.time}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <AlertCircle className="h-4 w-4" />
                            <span>{exam.duration}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Users className="h-4 w-4" />
                            <span>{exam.room}</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <Button variant="outline">
                          <BookOpen className="h-4 w-4 mr-2" />
                          Study Now
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

export default ExamPreparationPage; 