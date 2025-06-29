import React, { useState } from 'react';
import { useAuth } from '@/backend/contexts/AuthContext';
import DashboardLayout from '@/frontend/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  BookOpen, 
  Play, 
  Download, 
  Search, 
  Filter,
  Users,
  MessageSquare,
  Star,
  Clock,
  FileText,
  Video,
  Book,
  Users2,
  Calendar,
  Bookmark,
  Share2,
  Eye,
  Heart
} from 'lucide-react';

const StudyResourcesPage = () => {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('all');

  // Digital Textbooks
  const textbooks = [
    {
      id: 1,
      title: 'Advanced Mathematics - Class 12',
      subject: 'Mathematics',
      author: 'NCERT',
      format: 'PDF',
      size: '45.2 MB',
      pages: 450,
      rating: 4.8,
      downloads: 1250,
      description: 'Comprehensive textbook covering calculus, algebra, and trigonometry for Class 12 students.',
      cover: '/textbook-math.jpg',
      chapters: [
        'Relations and Functions',
        'Inverse Trigonometric Functions',
        'Matrices',
        'Determinants',
        'Continuity and Differentiability',
        'Application of Derivatives',
        'Integrals',
        'Application of Integrals',
        'Differential Equations',
        'Vector Algebra',
        'Three Dimensional Geometry',
        'Linear Programming',
        'Probability'
      ]
    },
    {
      id: 2,
      title: 'Physics Fundamentals - Class 12',
      subject: 'Physics',
      author: 'NCERT',
      format: 'PDF',
      size: '38.7 MB',
      pages: 380,
      rating: 4.6,
      downloads: 980,
      description: 'Complete physics textbook with detailed explanations and solved examples.',
      cover: '/textbook-physics.jpg',
      chapters: [
        'Electric Charges and Fields',
        'Electrostatic Potential and Capacitance',
        'Current Electricity',
        'Moving Charges and Magnetism',
        'Magnetism and Matter',
        'Electromagnetic Induction',
        'Alternating Current',
        'Electromagnetic Waves',
        'Ray Optics and Optical Instruments',
        'Wave Optics',
        'Dual Nature of Radiation and Matter',
        'Atoms',
        'Nuclei',
        'Semiconductor Electronics',
        'Communication Systems'
      ]
    },
    {
      id: 3,
      title: 'Chemistry: Principles and Applications',
      subject: 'Chemistry',
      author: 'NCERT',
      format: 'PDF',
      size: '42.1 MB',
      pages: 420,
      rating: 4.7,
      downloads: 1100,
      description: 'Modern chemistry textbook with practical applications and laboratory procedures.',
      cover: '/textbook-chemistry.jpg',
      chapters: [
        'The Solid State',
        'Solutions',
        'Electrochemistry',
        'Chemical Kinetics',
        'Surface Chemistry',
        'General Principles and Processes of Isolation of Elements',
        'The p-Block Elements',
        'The d and f Block Elements',
        'Coordination Compounds',
        'Haloalkanes and Haloarenes',
        'Alcohols, Phenols and Ethers',
        'Aldehydes, Ketones and Carboxylic Acids',
        'Amines',
        'Biomolecules',
        'Polymers',
        'Chemistry in Everyday Life'
      ]
    }
  ];

  // Video Lectures
  const videoLectures = [
    {
      id: 1,
      title: 'Calculus: Introduction to Derivatives',
      subject: 'Mathematics',
      teacher: 'Mrs. Sharma',
      duration: '45:30',
      views: 1250,
      rating: 4.9,
      thumbnail: '/video-calculus.jpg',
      description: 'Comprehensive introduction to derivatives with practical examples and applications.',
      topics: ['Definition of Derivative', 'Power Rule', 'Product Rule', 'Quotient Rule', 'Chain Rule'],
      difficulty: 'Intermediate'
    },
    {
      id: 2,
      title: 'Electromagnetic Induction Explained',
      subject: 'Physics',
      teacher: 'Mr. Patel',
      duration: '52:15',
      views: 890,
      rating: 4.7,
      thumbnail: '/video-induction.jpg',
      description: 'Detailed explanation of electromagnetic induction with experiments and demonstrations.',
      topics: ['Faraday\'s Law', 'Lenz\'s Law', 'Self Induction', 'Mutual Induction', 'AC Generator'],
      difficulty: 'Advanced'
    },
    {
      id: 3,
      title: 'Organic Chemistry: Reaction Mechanisms',
      subject: 'Chemistry',
      teacher: 'Dr. Kumar',
      duration: '38:45',
      views: 1100,
      rating: 4.8,
      thumbnail: '/video-organic.jpg',
      description: 'Step-by-step guide to understanding organic reaction mechanisms.',
      topics: ['SN1 Reaction', 'SN2 Reaction', 'E1 Reaction', 'E2 Reaction', 'Free Radical Substitution'],
      difficulty: 'Advanced'
    },
    {
      id: 4,
      title: 'Shakespeare: Romeo and Juliet Analysis',
      subject: 'English',
      teacher: 'Ms. Johnson',
      duration: '41:20',
      views: 750,
      rating: 4.6,
      thumbnail: '/video-shakespeare.jpg',
      description: 'Literary analysis of Shakespeare\'s classic tragedy with character studies.',
      topics: ['Plot Analysis', 'Character Development', 'Themes', 'Symbolism', 'Literary Devices'],
      difficulty: 'Intermediate'
    }
  ];

  // Practice Questions
  const practiceQuestions = [
    {
      id: 1,
      title: 'Mathematics Practice Set - Calculus',
      subject: 'Mathematics',
      questions: 50,
      timeLimit: 90,
      difficulty: 'Hard',
      completed: 1250,
      rating: 4.8,
      topics: ['Derivatives', 'Integration', 'Applications'],
      description: 'Comprehensive practice questions covering all aspects of calculus.'
    },
    {
      id: 2,
      title: 'Physics MCQs - Electromagnetism',
      subject: 'Physics',
      questions: 40,
      timeLimit: 60,
      difficulty: 'Medium',
      completed: 980,
      rating: 4.6,
      topics: ['Electric Fields', 'Magnetic Fields', 'Electromagnetic Induction'],
      description: 'Multiple choice questions to test understanding of electromagnetic concepts.'
    },
    {
      id: 3,
      title: 'Chemistry Problem Solving',
      subject: 'Chemistry',
      questions: 35,
      timeLimit: 75,
      difficulty: 'Hard',
      completed: 850,
      rating: 4.7,
      topics: ['Organic Chemistry', 'Physical Chemistry', 'Inorganic Chemistry'],
      description: 'Problem-solving questions with detailed solutions and explanations.'
    }
  ];

  // Study Groups
  const studyGroups = [
    {
      id: 1,
      name: 'Mathematics Study Group',
      subject: 'Mathematics',
      members: 25,
      activeMembers: 18,
      lastActivity: '2 hours ago',
      description: 'Group for discussing advanced mathematics concepts and problem-solving strategies.',
      topics: ['Calculus', 'Algebra', 'Trigonometry', 'Statistics'],
      isMember: true
    },
    {
      id: 2,
      name: 'Physics Enthusiasts',
      subject: 'Physics',
      members: 32,
      activeMembers: 24,
      lastActivity: '1 hour ago',
      description: 'Discussion group for physics concepts, experiments, and theoretical problems.',
      topics: ['Mechanics', 'Electromagnetism', 'Optics', 'Modern Physics'],
      isMember: false
    },
    {
      id: 3,
      name: 'Chemistry Lab Partners',
      subject: 'Chemistry',
      members: 20,
      activeMembers: 15,
      lastActivity: '30 minutes ago',
      description: 'Group for sharing lab experiences and understanding chemical reactions.',
      topics: ['Organic Chemistry', 'Inorganic Chemistry', 'Physical Chemistry'],
      isMember: true
    },
    {
      id: 4,
      name: 'English Literature Circle',
      subject: 'English',
      members: 18,
      activeMembers: 12,
      lastActivity: '3 hours ago',
      description: 'Literary analysis and discussion of classic and modern texts.',
      topics: ['Shakespeare', 'Poetry', 'Prose', 'Drama'],
      isMember: false
    }
  ];

  const subjects = ['all', 'Mathematics', 'Physics', 'Chemistry', 'English', 'Biology', 'Computer Science'];

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-100 text-green-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Hard': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredTextbooks = textbooks.filter(book => 
    selectedSubject === 'all' || book.subject === selectedSubject
  );

  const filteredVideos = videoLectures.filter(video => 
    selectedSubject === 'all' || video.subject === selectedSubject
  );

  const filteredQuestions = practiceQuestions.filter(question => 
    selectedSubject === 'all' || question.subject === selectedSubject
  );

  const filteredGroups = studyGroups.filter(group => 
    selectedSubject === 'all' || group.subject === selectedSubject
  );

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold tracking-tight mb-2">Study Resources</h1>
          <p className="text-muted-foreground">Access digital textbooks, video lectures, practice questions, and join study groups</p>
        </div>

        {/* Search and Filter */}
        <div className="mb-6 flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search resources..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          <div className="flex gap-2">
            <select
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {subjects.map(subject => (
                <option key={subject} value={subject}>
                  {subject === 'all' ? 'All Subjects' : subject}
                </option>
              ))}
            </select>
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-1" />
              Filter
            </Button>
          </div>
        </div>

        <Tabs defaultValue="textbooks" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="textbooks">Digital Textbooks</TabsTrigger>
            <TabsTrigger value="videos">Video Lectures</TabsTrigger>
            <TabsTrigger value="practice">Practice Questions</TabsTrigger>
            <TabsTrigger value="groups">Study Groups</TabsTrigger>
          </TabsList>

          <TabsContent value="textbooks" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTextbooks.map((book) => (
                <Card key={book.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-lg mb-2">{book.title}</CardTitle>
                        <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                          <Book className="h-4 w-4" />
                          <span>{book.subject}</span>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <span>By {book.author}</span>
                          <span>{book.pages} pages</span>
                        </div>
                      </div>
                      <Badge variant="outline">{book.format}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 mb-4 text-sm">{book.description}</p>
                    
                    <div className="flex items-center gap-2 mb-4">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${
                              i < Math.floor(book.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-gray-600">({book.rating})</span>
                      <span className="text-sm text-gray-500">• {book.downloads} downloads</span>
                    </div>

                    <div className="space-y-2 mb-4">
                      <h4 className="font-medium text-sm">Chapters:</h4>
                      <div className="text-xs text-gray-600 max-h-20 overflow-y-auto">
                        {book.chapters.slice(0, 5).map((chapter, index) => (
                          <div key={index} className="mb-1">• {chapter}</div>
                        ))}
                        {book.chapters.length > 5 && (
                          <div className="text-blue-600">+{book.chapters.length - 5} more chapters</div>
                        )}
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button size="sm" className="flex-1">
                        <Download className="h-4 w-4 mr-1" />
                        Download
                      </Button>
                      <Button size="sm" variant="outline">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="outline">
                        <Bookmark className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="videos" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredVideos.map((video) => (
                <Card key={video.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="relative mb-4">
                      <div className="aspect-video bg-gray-200 rounded-lg flex items-center justify-center">
                        <Play className="h-12 w-12 text-white bg-black bg-opacity-50 rounded-full p-2" />
                      </div>
                      <Badge className={getDifficultyColor(video.difficulty)} className="absolute top-2 right-2">
                        {video.difficulty}
                      </Badge>
                    </div>
                    <CardTitle className="text-lg mb-2">{video.title}</CardTitle>
                    <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                      <Video className="h-4 w-4" />
                      <span>{video.subject}</span>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span>By {video.teacher}</span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {video.duration}
                      </span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 mb-4 text-sm">{video.description}</p>
                    
                    <div className="flex items-center gap-2 mb-4">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${
                              i < Math.floor(video.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-gray-600">({video.rating})</span>
                      <span className="text-sm text-gray-500">• {video.views} views</span>
                    </div>

                    <div className="space-y-2 mb-4">
                      <h4 className="font-medium text-sm">Topics Covered:</h4>
                      <div className="flex flex-wrap gap-1">
                        {video.topics.map((topic, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {topic}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button size="sm" className="flex-1">
                        <Play className="h-4 w-4 mr-1" />
                        Watch Now
                      </Button>
                      <Button size="sm" variant="outline">
                        <Download className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="outline">
                        <Bookmark className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="practice" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredQuestions.map((question) => (
                <Card key={question.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="text-lg mb-2">{question.title}</CardTitle>
                    <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                      <FileText className="h-4 w-4" />
                      <span>{question.subject}</span>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span>{question.questions} questions</span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {question.timeLimit} min
                      </span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 mb-4 text-sm">{question.description}</p>
                    
                    <div className="flex items-center gap-2 mb-4">
                      <Badge className={getDifficultyColor(question.difficulty)}>
                        {question.difficulty}
                      </Badge>
                      <span className="text-sm text-gray-500">• {question.completed} completed</span>
                    </div>

                    <div className="space-y-2 mb-4">
                      <h4 className="font-medium text-sm">Topics:</h4>
                      <div className="flex flex-wrap gap-1">
                        {question.topics.map((topic, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {topic}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button size="sm" className="flex-1">
                        <Play className="h-4 w-4 mr-1" />
                        Start Practice
                      </Button>
                      <Button size="sm" variant="outline">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="outline">
                        <Bookmark className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="groups" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredGroups.map((group) => (
                <Card key={group.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="text-lg mb-2">{group.name}</CardTitle>
                    <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                      <Users2 className="h-4 w-4" />
                      <span>{group.subject}</span>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span>{group.members} members</span>
                      <span>{group.activeMembers} active</span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 mb-4 text-sm">{group.description}</p>
                    
                    <div className="space-y-2 mb-4">
                      <h4 className="font-medium text-sm">Topics:</h4>
                      <div className="flex flex-wrap gap-1">
                        {group.topics.map((topic, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {topic}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center justify-between mb-4">
                      <span className="text-sm text-gray-500">Last active: {group.lastActivity}</span>
                      {group.isMember && (
                        <Badge className="bg-green-100 text-green-800">Member</Badge>
                      )}
                    </div>

                    <div className="flex gap-2">
                      {group.isMember ? (
                        <Button size="sm" className="flex-1">
                          <MessageSquare className="h-4 w-4 mr-1" />
                          Open Chat
                        </Button>
                      ) : (
                        <Button size="sm" className="flex-1">
                          <Users className="h-4 w-4 mr-1" />
                          Join Group
                        </Button>
                      )}
                      <Button size="sm" variant="outline">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="outline">
                        <Share2 className="h-4 w-4" />
                      </Button>
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

export default StudyResourcesPage; 