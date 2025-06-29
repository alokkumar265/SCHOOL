import React, { useState } from 'react';
import DashboardLayout from '@/frontend/components/layout/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  BookOpen, 
  Calendar, 
  CheckCircle, 
  Clock, 
  Download, 
  Edit, 
  Plus,
  FileText,
  Target,
  TrendingUp,
  Users,
  Save,
  X
} from 'lucide-react';
import { Link } from 'react-router-dom';

// Mock syllabus data
const mockSyllabi = [
  {
    id: 1,
    subject: 'Mathematics',
    class: 'Class 10-A',
    academicYear: '2024-2025',
    totalUnits: 8,
    completedUnits: 3,
    totalTopics: 45,
    completedTopics: 18,
    status: 'active',
    units: [
      {
        id: 1,
        title: 'Real Numbers',
        topics: [
          'Euclid\'s Division Lemma',
          'Fundamental Theorem of Arithmetic',
          'Irrational Numbers',
          'Rational Numbers and their Decimal Expansions'
        ],
        duration: '3 weeks',
        status: 'completed',
        completion: 100
      },
      {
        id: 2,
        title: 'Polynomials',
        topics: [
          'Geometrical Meaning of the Zeroes of a Polynomial',
          'Relationship between Zeroes and Coefficients of a Polynomial',
          'Division Algorithm for Polynomials'
        ],
        duration: '4 weeks',
        status: 'completed',
        completion: 100
      },
      {
        id: 3,
        title: 'Pair of Linear Equations in Two Variables',
        topics: [
          'Graphical Method of Solution of a Pair of Linear Equations',
          'Algebraic Methods of Solving a Pair of Linear Equations',
          'Equations Reducible to a Pair of Linear Equations in Two Variables'
        ],
        duration: '5 weeks',
        status: 'completed',
        completion: 100
      },
      {
        id: 4,
        title: 'Quadratic Equations',
        topics: [
          'Standard Form of Quadratic Equation',
          'Solution of Quadratic Equations by Factorization',
          'Solution of Quadratic Equations by Completing the Square',
          'Nature of Roots'
        ],
        duration: '4 weeks',
        status: 'in-progress',
        completion: 60
      },
      {
        id: 5,
        title: 'Arithmetic Progressions',
        topics: [
          'Introduction to Arithmetic Progressions',
          'General Term of an AP',
          'Sum of First n Terms of an AP'
        ],
        duration: '3 weeks',
        status: 'pending',
        completion: 0
      },
      {
        id: 6,
        title: 'Triangles',
        topics: [
          'Similar Figures',
          'Similarity of Triangles',
          'Criteria for Similarity of Triangles',
          'Areas of Similar Triangles'
        ],
        duration: '4 weeks',
        status: 'pending',
        completion: 0
      },
      {
        id: 7,
        title: 'Coordinate Geometry',
        topics: [
          'Distance Formula',
          'Section Formula',
          'Area of a Triangle'
        ],
        duration: '3 weeks',
        status: 'pending',
        completion: 0
      },
      {
        id: 8,
        title: 'Introduction to Trigonometry',
        topics: [
          'Trigonometric Ratios',
          'Trigonometric Ratios of Some Specific Angles',
          'Trigonometric Ratios of Complementary Angles',
          'Trigonometric Identities'
        ],
        duration: '4 weeks',
        status: 'pending',
        completion: 0
      }
    ]
  },
  {
    id: 2,
    subject: 'Mathematics',
    class: 'Class 9-B',
    academicYear: '2024-2025',
    totalUnits: 6,
    completedUnits: 2,
    totalTopics: 35,
    completedTopics: 12,
    status: 'active',
    units: [
      {
        id: 1,
        title: 'Number Systems',
        topics: [
          'Real Numbers',
          'Irrational Numbers',
          'Representation of Real Numbers on the Number Line'
        ],
        duration: '3 weeks',
        status: 'completed',
        completion: 100
      },
      {
        id: 2,
        title: 'Polynomials',
        topics: [
          'Polynomials in One Variable',
          'Zeroes of a Polynomial',
          'Remainder Theorem',
          'Factorisation of Polynomials'
        ],
        duration: '4 weeks',
        status: 'completed',
        completion: 100
      },
      {
        id: 3,
        title: 'Coordinate Geometry',
        topics: [
          'Cartesian System',
          'Plotting a Point in the Plane',
          'Distance Formula'
        ],
        duration: '3 weeks',
        status: 'in-progress',
        completion: 40
      }
    ]
  }
];

const SyllabusPage = () => {
  const [selectedSyllabus, setSelectedSyllabus] = useState(mockSyllabi[0]);
  const [viewMode, setViewMode] = useState('overview');
  const [isEditing, setIsEditing] = useState(false);
  const [editingUnit, setEditingUnit] = useState(null);

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'text-green-600 bg-green-100';
      case 'in-progress': return 'text-blue-600 bg-blue-100';
      case 'pending': return 'text-gray-600 bg-gray-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getProgressColor = (completion) => {
    if (completion >= 80) return 'bg-green-500';
    if (completion >= 50) return 'bg-blue-500';
    return 'bg-yellow-500';
  };

  // Button handlers
  const handleExportSyllabus = () => {
    // Create a downloadable syllabus document
    const syllabusData = {
      subject: selectedSyllabus.subject,
      class: selectedSyllabus.class,
      academicYear: selectedSyllabus.academicYear,
      units: selectedSyllabus.units
    };
    
    const blob = new Blob([JSON.stringify(syllabusData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${selectedSyllabus.subject}-${selectedSyllabus.class}-Syllabus.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleCreateSyllabus = () => {
    // Navigate to syllabus creation page or open modal
    alert('Syllabus creation feature will be implemented here');
  };

  const handleEditSyllabus = () => {
    setIsEditing(!isEditing);
  };

  const handleEditUnit = (unit) => {
    setEditingUnit(unit);
  };

  const handleSaveUnit = () => {
    setEditingUnit(null);
    // Here you would save the unit changes to backend
    alert('Unit changes saved successfully!');
  };

  const handleCancelEdit = () => {
    setEditingUnit(null);
  };

  const handleViewMaterials = (unit) => {
    // Navigate to materials page or open modal
    alert(`Viewing materials for Unit ${unit.id}: ${unit.title}`);
  };

  const handleStudentProgress = (unit) => {
    // Navigate to student progress page
    alert(`Viewing student progress for Unit ${unit.id}: ${unit.title}`);
  };

  const handleUpdateProgress = () => {
    // Navigate to progress update page
    alert('Progress update feature will be implemented here');
  };

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto py-8 px-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-bold">Syllabus Management</h1>
            <p className="text-muted-foreground">Manage and track syllabus progress for your classes</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={handleExportSyllabus}>
              <Download className="h-4 w-4 mr-2" />
              Export Syllabus
            </Button>
            <Button onClick={handleCreateSyllabus}>
              <Plus className="h-4 w-4 mr-2" />
              Create Syllabus
            </Button>
          </div>
        </div>

        <div className="grid gap-6 grid-cols-1 lg:grid-cols-3">
          {/* Syllabus List */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5" />
                  My Syllabi
                </CardTitle>
                <CardDescription>Select a syllabus to view details</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {mockSyllabi.map((syllabus) => (
                    <div
                      key={syllabus.id}
                      className={`p-4 border rounded-lg cursor-pointer transition-all hover:shadow-md ${
                        selectedSyllabus.id === syllabus.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                      }`}
                      onClick={() => setSelectedSyllabus(syllabus)}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-semibold text-lg">{syllabus.subject}</h3>
                        <Badge variant={syllabus.status === 'active' ? 'default' : 'secondary'}>
                          {syllabus.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{syllabus.class}</p>
                      <div className="flex items-center gap-4 text-sm">
                        <div className="flex items-center gap-1">
                          <Target className="h-4 w-4" />
                          <span>{syllabus.completedUnits}/{syllabus.totalUnits} units</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <CheckCircle className="h-4 w-4" />
                          <span>{syllabus.completedTopics}/{syllabus.totalTopics} topics</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Syllabus Details */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-2xl">{selectedSyllabus.subject}</CardTitle>
                    <CardDescription className="text-lg">{selectedSyllabus.class} • {selectedSyllabus.academicYear}</CardDescription>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-blue-600">
                      {Math.round((selectedSyllabus.completedTopics / selectedSyllabus.totalTopics) * 100)}%
                    </div>
                    <div className="text-sm text-muted-foreground">Completion</div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Tabs value={viewMode} onValueChange={setViewMode} className="w-full">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="units">Units</TabsTrigger>
                    <TabsTrigger value="timeline">Timeline</TabsTrigger>
                  </TabsList>

                  <TabsContent value="overview" className="space-y-6">
                    <div className="grid gap-4 grid-cols-1 md:grid-cols-3">
                      <Card>
                        <CardHeader className="pb-3">
                          <CardTitle className="text-lg flex items-center gap-2">
                            <Target className="h-5 w-5" />
                            Progress Summary
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Units Completed:</span>
                            <span className="font-medium">{selectedSyllabus.completedUnits}/{selectedSyllabus.totalUnits}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Topics Covered:</span>
                            <span className="font-medium">{selectedSyllabus.completedTopics}/{selectedSyllabus.totalTopics}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Overall Progress:</span>
                            <span className="font-medium text-blue-600">
                              {Math.round((selectedSyllabus.completedTopics / selectedSyllabus.totalTopics) * 100)}%
                            </span>
                          </div>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader className="pb-3">
                          <CardTitle className="text-lg flex items-center gap-2">
                            <Calendar className="h-5 w-5" />
                            Timeline
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Academic Year:</span>
                            <span className="font-medium">{selectedSyllabus.academicYear}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Total Duration:</span>
                            <span className="font-medium">30 weeks</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Remaining:</span>
                            <span className="font-medium text-amber-600">22 weeks</span>
                          </div>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader className="pb-3">
                          <CardTitle className="text-lg flex items-center gap-2">
                            <TrendingUp className="h-5 w-5" />
                            Performance
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Class Average:</span>
                            <span className="font-medium text-green-600">87.5%</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Top Performer:</span>
                            <span className="font-medium">Ananya Singh (95%)</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Needs Help:</span>
                            <span className="font-medium text-amber-600">3 students</span>
                          </div>
                        </CardContent>
                      </Card>
                    </div>

                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Quick Actions</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                          <Button asChild variant="outline" className="h-auto p-4 flex flex-col items-center gap-2">
                            <Link to="/assignments">
                              <div className="flex flex-col items-center gap-2">
                                <Plus className="h-6 w-6" />
                                <span className="text-sm">Add Assignment</span>
                              </div>
                            </Link>
                          </Button>
                          <Button asChild variant="outline" className="h-auto p-4 flex flex-col items-center gap-2">
                            <Link to="/attendance-management">
                              <div className="flex flex-col items-center gap-2">
                                <Users className="h-6 w-6" />
                                <span className="text-sm">Take Attendance</span>
                              </div>
                            </Link>
                          </Button>
                          <Button asChild variant="outline" className="h-auto p-4 flex flex-col items-center gap-2">
                            <Link to="/gradebook">
                              <div className="flex flex-col items-center gap-2">
                                <FileText className="h-6 w-6" />
                                <span className="text-sm">Grade Papers</span>
                              </div>
                            </Link>
                          </Button>
                          <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2" onClick={handleUpdateProgress}>
                            <div className="flex flex-col items-center gap-2">
                              <Edit className="h-6 w-6" />
                              <span className="text-sm">Update Progress</span>
                            </div>
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="units" className="space-y-4">
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg font-semibold">Syllabus Units</h3>
                      <Button size="sm" variant="outline" onClick={handleEditSyllabus}>
                        <Edit className="h-4 w-4 mr-2" />
                        {isEditing ? 'Cancel Edit' : 'Edit Syllabus'}
                      </Button>
                    </div>
                    <div className="space-y-4">
                      {selectedSyllabus.units.map((unit) => (
                        <Card key={unit.id} className="hover:shadow-md transition-shadow">
                          <CardHeader>
                            <div className="flex justify-between items-start">
                              <div className="flex-1">
                                <CardTitle className="text-lg flex items-center gap-2">
                                  <BookOpen className="h-5 w-5 text-blue-600" />
                                  Unit {unit.id}: {unit.title}
                                </CardTitle>
                                <CardDescription className="mt-2">
                                  Duration: {unit.duration} • {unit.topics.length} topics
                                </CardDescription>
                              </div>
                              <div className="flex items-center gap-3">
                                <Badge className={getStatusColor(unit.status)}>
                                  {unit.status}
                                </Badge>
                                <div className="text-right">
                                  <div className="text-lg font-bold">{unit.completion}%</div>
                                  <div className="text-xs text-muted-foreground">Complete</div>
                                </div>
                              </div>
                            </div>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-4">
                              <div>
                                <div className="flex justify-between text-sm mb-1">
                                  <span>Progress</span>
                                  <span>{unit.completion}%</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                  <div 
                                    className={`h-2 rounded-full ${getProgressColor(unit.completion)}`}
                                    style={{ width: `${unit.completion}%` }}
                                  ></div>
                                </div>
                              </div>
                              
                              <div>
                                <h4 className="font-medium mb-2">Topics:</h4>
                                <ul className="space-y-1">
                                  {unit.topics.map((topic, index) => (
                                    <li key={index} className="flex items-center gap-2 text-sm">
                                      <CheckCircle className="h-4 w-4 text-green-600" />
                                      {topic}
                                    </li>
                                  ))}
                                </ul>
                              </div>

                              <div className="flex gap-2">
                                <Button size="sm" variant="outline" onClick={() => handleEditUnit(unit)}>
                                  <Edit className="h-4 w-4 mr-2" />
                                  Edit Unit
                                </Button>
                                <Button size="sm" variant="outline" onClick={() => handleViewMaterials(unit)}>
                                  <FileText className="h-4 w-4 mr-2" />
                                  View Materials
                                </Button>
                                <Button size="sm" variant="outline" onClick={() => handleStudentProgress(unit)}>
                                  <Users className="h-4 w-4 mr-2" />
                                  Student Progress
                                </Button>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </TabsContent>

                  <TabsContent value="timeline" className="space-y-4">
                    <h3 className="text-lg font-semibold">Syllabus Timeline</h3>
                    <Card>
                      <CardHeader>
                        <CardTitle>Academic Year Timeline</CardTitle>
                        <CardDescription>Track syllabus progress throughout the year</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {selectedSyllabus.units.map((unit, index) => (
                            <div key={unit.id} className="flex items-center gap-4">
                              <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                                <span className="text-sm font-medium text-blue-600">{unit.id}</span>
                              </div>
                              <div className="flex-1">
                                <h4 className="font-medium">{unit.title}</h4>
                                <p className="text-sm text-muted-foreground">{unit.duration}</p>
                              </div>
                              <Badge className={getStatusColor(unit.status)}>
                                {unit.status}
                              </Badge>
                              <div className="text-right">
                                <div className="text-sm font-medium">{unit.completion}%</div>
                                <div className="text-xs text-muted-foreground">Complete</div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default SyllabusPage; 