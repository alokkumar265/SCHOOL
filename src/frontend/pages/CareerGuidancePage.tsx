import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { 
  GraduationCap, 
  Briefcase, 
  Award,
  Users,
  Calendar,
  MapPin,
  DollarSign,
  BookOpen,
  Target,
  TrendingUp,
  FileText,
  ExternalLink,
  Star
} from 'lucide-react';
import DashboardLayout from '@/frontend/components/layout/DashboardLayout';

interface CareerPath {
  id: string;
  title: string;
  description: string;
  salary: string;
  growth: string;
  education: string;
  skills: string[];
  demand: 'High' | 'Medium' | 'Low';
}

interface College {
  id: string;
  name: string;
  location: string;
  ranking: number;
  acceptanceRate: number;
  tuition: number;
  programs: string[];
  deadline: string;
  isApplied: boolean;
}

interface Scholarship {
  id: string;
  name: string;
  amount: number;
  deadline: string;
  eligibility: string[];
  requirements: string[];
  isApplied: boolean;
}

interface Internship {
  id: string;
  company: string;
  position: string;
  location: string;
  duration: string;
  stipend: string;
  requirements: string[];
  deadline: string;
  isApplied: boolean;
}

const CareerGuidancePage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedInterest, setSelectedInterest] = useState('all');

  // Mock data
  const careerPaths: CareerPath[] = [
    {
      id: '1',
      title: 'Software Engineer',
      description: 'Design and develop software applications and systems',
      salary: '$80,000 - $150,000',
      growth: '22% (Much faster than average)',
      education: 'Bachelor\'s in Computer Science',
      skills: ['Programming', 'Problem Solving', 'Teamwork', 'Communication'],
      demand: 'High'
    },
    {
      id: '2',
      title: 'Data Scientist',
      description: 'Analyze complex data to help organizations make decisions',
      salary: '$90,000 - $160,000',
      growth: '36% (Much faster than average)',
      education: 'Bachelor\'s in Statistics, Mathematics, or Computer Science',
      skills: ['Statistics', 'Machine Learning', 'Python', 'SQL'],
      demand: 'High'
    },
    {
      id: '3',
      title: 'Medical Doctor',
      description: 'Diagnose and treat patients\' illnesses and injuries',
      salary: '$200,000 - $400,000',
      growth: '3% (As fast as average)',
      education: 'Medical Degree (MD/DO)',
      skills: ['Patient Care', 'Diagnosis', 'Communication', 'Empathy'],
      demand: 'High'
    },
    {
      id: '4',
      title: 'Environmental Engineer',
      description: 'Solve environmental problems using engineering principles',
      salary: '$70,000 - $120,000',
      growth: '4% (As fast as average)',
      education: 'Bachelor\'s in Environmental Engineering',
      skills: ['Environmental Science', 'Engineering', 'Problem Solving'],
      demand: 'Medium'
    }
  ];

  const colleges: College[] = [
    {
      id: '1',
      name: 'Massachusetts Institute of Technology',
      location: 'Cambridge, MA',
      ranking: 1,
      acceptanceRate: 7,
      tuition: 55000,
      programs: ['Computer Science', 'Engineering', 'Physics'],
      deadline: '2024-12-01',
      isApplied: false
    },
    {
      id: '2',
      name: 'Stanford University',
      location: 'Stanford, CA',
      ranking: 2,
      acceptanceRate: 4,
      tuition: 56000,
      programs: ['Computer Science', 'Engineering', 'Business'],
      deadline: '2024-11-30',
      isApplied: true
    },
    {
      id: '3',
      name: 'University of California, Berkeley',
      location: 'Berkeley, CA',
      ranking: 22,
      acceptanceRate: 15,
      tuition: 44000,
      programs: ['Computer Science', 'Engineering', 'Chemistry'],
      deadline: '2024-11-30',
      isApplied: false
    }
  ];

  const scholarships: Scholarship[] = [
    {
      id: '1',
      name: 'National Merit Scholarship',
      amount: 2500,
      deadline: '2024-05-01',
      eligibility: ['High PSAT scores', 'US Citizen', 'High school senior'],
      requirements: ['PSAT score of 1400+', 'Academic excellence', 'Leadership activities'],
      isApplied: true
    },
    {
      id: '2',
      name: 'Gates Millennium Scholars Program',
      amount: 50000,
      deadline: '2024-01-15',
      eligibility: ['Minority students', 'Financial need', 'Academic excellence'],
      requirements: ['3.3+ GPA', 'Leadership experience', 'Community service'],
      isApplied: false
    },
    {
      id: '3',
      name: 'Coca-Cola Scholars Program',
      amount: 20000,
      deadline: '2024-10-31',
      eligibility: ['High school seniors', 'US Citizens', 'Academic excellence'],
      requirements: ['3.0+ GPA', 'Leadership activities', 'Community service'],
      isApplied: false
    }
  ];

  const internships: Internship[] = [
    {
      id: '1',
      company: 'Google',
      position: 'Software Engineering Intern',
      location: 'Mountain View, CA',
      duration: '12 weeks',
      stipend: '$8,000/month',
      requirements: ['Computer Science major', 'Programming skills', 'GPA 3.5+'],
      deadline: '2024-02-15',
      isApplied: true
    },
    {
      id: '2',
      company: 'Microsoft',
      position: 'Data Science Intern',
      location: 'Redmond, WA',
      duration: '10 weeks',
      stipend: '$7,500/month',
      requirements: ['Statistics/CS major', 'Python/R skills', 'GPA 3.3+'],
      deadline: '2024-03-01',
      isApplied: false
    },
    {
      id: '3',
      company: 'Apple',
      position: 'Product Design Intern',
      location: 'Cupertino, CA',
      duration: '12 weeks',
      stipend: '$7,000/month',
      requirements: ['Design/Engineering major', 'Portfolio required', 'GPA 3.0+'],
      deadline: '2024-02-28',
      isApplied: false
    }
  ];

  const getDemandColor = (demand: string) => {
    switch (demand) {
      case 'High': return 'bg-green-100 text-green-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Low': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredCareerPaths = careerPaths.filter(career =>
    career.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    career.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Career Guidance</h1>
            <p className="text-gray-600 mt-2">Explore career paths, colleges, scholarships, and internship opportunities</p>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="outline">
              <Users className="h-4 w-4 mr-2" />
              Book Counseling
            </Button>
            <Button>
              <FileText className="h-4 w-4 mr-2" />
              Resume Builder
            </Button>
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
                  <p className="text-sm text-gray-500">Career Paths</p>
                  <p className="text-xl font-semibold">{careerPaths.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="bg-green-100 p-2 rounded-lg">
                  <GraduationCap className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Colleges Applied</p>
                  <p className="text-xl font-semibold">{colleges.filter(c => c.isApplied).length}</p>
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
                  <p className="text-sm text-gray-500">Scholarships</p>
                  <p className="text-xl font-semibold">{scholarships.filter(s => s.isApplied).length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="bg-orange-100 p-2 rounded-lg">
                  <Briefcase className="h-5 w-5 text-orange-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Internships</p>
                  <p className="text-xl font-semibold">{internships.filter(i => i.isApplied).length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="careers" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="careers">Career Paths</TabsTrigger>
            <TabsTrigger value="colleges">Colleges</TabsTrigger>
            <TabsTrigger value="scholarships">Scholarships</TabsTrigger>
            <TabsTrigger value="internships">Internships</TabsTrigger>
          </TabsList>

          {/* Career Paths Tab */}
          <TabsContent value="careers" className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <select 
                  value={selectedInterest} 
                  onChange={(e) => setSelectedInterest(e.target.value)}
                  className="border border-gray-300 rounded-lg px-3 py-2"
                >
                  <option value="all">All Interests</option>
                  <option value="technology">Technology</option>
                  <option value="healthcare">Healthcare</option>
                  <option value="engineering">Engineering</option>
                  <option value="business">Business</option>
                </select>
              </div>
              <Input
                placeholder="Search career paths..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-64"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCareerPaths.map((career) => (
                <Card key={career.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-lg">{career.title}</CardTitle>
                        <CardDescription className="mt-2">{career.description}</CardDescription>
                      </div>
                      <Badge className={getDemandColor(career.demand)}>
                        {career.demand} Demand
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center space-x-2">
                        <DollarSign className="h-4 w-4 text-gray-400" />
                        <span className="text-gray-600">Salary: {career.salary}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <TrendingUp className="h-4 w-4 text-gray-400" />
                        <span className="text-gray-600">Growth: {career.growth}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <BookOpen className="h-4 w-4 text-gray-400" />
                        <span className="text-gray-600">Education: {career.education}</span>
                      </div>
                    </div>
                    
                    <div>
                      <p className="text-sm font-medium text-gray-700 mb-2">Key Skills:</p>
                      <div className="flex flex-wrap gap-1">
                        {career.skills.map((skill, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="flex space-x-2">
                      <Button className="flex-1">
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Learn More
                      </Button>
                      <Button variant="outline" size="sm">
                        <Users className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Colleges Tab */}
          <TabsContent value="colleges" className="space-y-6">
            <div className="space-y-4">
              {colleges.map((college) => (
                <Card key={college.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="text-lg font-semibold">{college.name}</h3>
                          <Badge variant="outline">#{college.ranking} Ranking</Badge>
                          <Badge variant="outline">{college.acceptanceRate}% Acceptance</Badge>
                        </div>
                        
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600 mb-4">
                          <div className="flex items-center space-x-2">
                            <MapPin className="h-4 w-4" />
                            <span>{college.location}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <DollarSign className="h-4 w-4" />
                            <span>${college.tuition.toLocaleString()}/year</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Calendar className="h-4 w-4" />
                            <span>Deadline: {new Date(college.deadline).toLocaleDateString()}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <BookOpen className="h-4 w-4" />
                            <span>{college.programs.length} programs</span>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-1 mb-4">
                          {college.programs.map((program, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {program}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      
                      <div className="flex flex-col items-end space-y-2">
                        {college.isApplied ? (
                          <Badge className="bg-green-100 text-green-800">Applied</Badge>
                        ) : (
                          <Badge variant="outline">Not Applied</Badge>
                        )}
                        
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">
                            <ExternalLink className="h-4 w-4 mr-2" />
                            Visit Website
                          </Button>
                          {!college.isApplied && (
                            <Button size="sm">
                              <FileText className="h-4 w-4 mr-2" />
                              Apply Now
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Scholarships Tab */}
          <TabsContent value="scholarships" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {scholarships.map((scholarship) => (
                <Card key={scholarship.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-lg">{scholarship.name}</CardTitle>
                        <CardDescription className="mt-2">
                          ${scholarship.amount.toLocaleString()} scholarship
                        </CardDescription>
                      </div>
                      {scholarship.isApplied ? (
                        <Badge className="bg-green-100 text-green-800">Applied</Badge>
                      ) : (
                        <Badge variant="outline">Open</Badge>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-4 w-4 text-gray-400" />
                        <span className="text-gray-600">
                          Deadline: {new Date(scholarship.deadline).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                    
                    <div>
                      <p className="text-sm font-medium text-gray-700 mb-2">Eligibility:</p>
                      <ul className="text-sm text-gray-600 space-y-1">
                        {scholarship.eligibility.map((item, index) => (
                          <li key={index} className="flex items-center space-x-2">
                            <Star className="h-3 w-3 text-yellow-500" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex space-x-2">
                      {scholarship.isApplied ? (
                        <Button variant="outline" className="flex-1">
                          <FileText className="h-4 w-4 mr-2" />
                          View Application
                        </Button>
                      ) : (
                        <Button className="flex-1">
                          <FileText className="h-4 w-4 mr-2" />
                          Apply Now
                        </Button>
                      )}
                      <Button variant="outline" size="sm">
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Internships Tab */}
          <TabsContent value="internships" className="space-y-6">
            <div className="space-y-4">
              {internships.map((internship) => (
                <Card key={internship.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="text-lg font-semibold">{internship.position}</h3>
                          <Badge variant="outline">{internship.company}</Badge>
                          {internship.isApplied && (
                            <Badge className="bg-green-100 text-green-800">Applied</Badge>
                          )}
                        </div>
                        
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600 mb-4">
                          <div className="flex items-center space-x-2">
                            <MapPin className="h-4 w-4" />
                            <span>{internship.location}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Calendar className="h-4 w-4" />
                            <span>{internship.duration}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <DollarSign className="h-4 w-4" />
                            <span>{internship.stipend}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Calendar className="h-4 w-4" />
                            <span>Deadline: {new Date(internship.deadline).toLocaleDateString()}</span>
                          </div>
                        </div>

                        <div>
                          <p className="text-sm font-medium text-gray-700 mb-2">Requirements:</p>
                          <ul className="text-sm text-gray-600 space-y-1">
                            {internship.requirements.map((req, index) => (
                              <li key={index} className="flex items-center space-x-2">
                                <Star className="h-3 w-3 text-blue-500" />
                                <span>{req}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                      
                      <div className="flex flex-col items-end space-y-2">
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">
                            <ExternalLink className="h-4 w-4 mr-2" />
                            Company Info
                          </Button>
                          {!internship.isApplied && (
                            <Button size="sm">
                              <FileText className="h-4 w-4 mr-2" />
                              Apply Now
                            </Button>
                          )}
                        </div>
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

export default CareerGuidancePage; 