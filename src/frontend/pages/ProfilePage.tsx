import React, { useState } from 'react';
import { useAuth } from '@/backend/contexts/AuthContext';
import DashboardLayout from '@/frontend/components/layout/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  User, 
  Camera,
  Edit3,
  Save,
  X,
  Mail,
  Phone,
  MapPin,
  Calendar,
  GraduationCap,
  School,
  Users,
  Heart,
  FileText,
  Award,
  BookOpen,
  Clock,
  Trophy,
  Upload,
  Briefcase,
  BookMarked,
  Star,
  Target,
  TrendingUp,
  Award as Certificate,
  Globe,
  Building,
  MapPinIcon,
  CreditCard,
  Shield,
  Settings,
  Bell,
  Lock,
  Eye,
  EyeOff
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const ProfilePage = () => {
  const { user } = useAuth();
  const [editingProfile, setEditingProfile] = useState(false);
  const [profileSaved, setProfileSaved] = useState(false);

  // Comprehensive teacher profile state
  const [profile, setProfile] = useState({
    // Basic Information
    name: 'Dr. Sarah Johnson',
    email: 'sarah.johnson@school.edu',
    phone: '+91 98765 43210',
    alternatePhone: '+91 98765 43212',
    dateOfBirth: '1985-03-15',
    age: '38 years',
    gender: 'Female',
    bloodGroup: 'A+',
    nationality: 'Indian',
    religion: 'Christian',
    maritalStatus: 'Married',
    spouseName: 'Mr. Robert Johnson',
    spouseOccupation: 'Software Engineer',
    spousePhone: '+91 98765 43213',
    
    // Family Information
    fatherName: 'Mr. John Smith',
    motherName: 'Mrs. Mary Smith',
    fatherOccupation: 'Retired Bank Manager',
    motherOccupation: 'Homemaker',
    fatherPhone: '+91 98765 43214',
    motherPhone: '+91 98765 43215',
    children: [
      { name: 'Emma Johnson', age: '12', school: 'St. Mary\'s School' },
      { name: 'Alex Johnson', age: '8', school: 'St. Mary\'s School' }
    ],
    
    // Emergency Contacts
    emergencyContact: '+91 98765 43211',
    emergencyRelation: 'Spouse',
    emergencyContact2: '+91 98765 43216',
    emergencyRelation2: 'Father',
    
    // Professional Information
    employeeId: 'TCH2023001',
    department: 'Mathematics',
    designation: 'Senior Mathematics Teacher',
    joiningDate: '2018-06-01',
    experience: '6 years',
    totalExperience: '8 years (including previous institutions)',
    qualification: 'Ph.D. in Mathematics',
    specialization: 'Advanced Calculus, Linear Algebra, Number Theory',
    subjects: ['Mathematics', 'Advanced Mathematics', 'Statistics', 'Applied Mathematics'],
    classes: ['Class 10-A', 'Class 11-C', 'Class 12-B'],
    totalStudents: 85,
    currentYearStudents: 85,
    previousYearStudents: 78,
    
    // Salary Information
    basicSalary: 45000,
    allowances: 15000,
    totalSalary: 65000,
    salaryGrade: 'Grade 3',
    incrementDate: '2024-06-01',
    nextIncrementDate: '2025-06-01',
    
    // Bank Details for Salary
    bankName: 'State Bank of India',
    accountNumber: '1234567890',
    ifscCode: 'SBIN0001234',
    branchName: 'Mumbai Main Branch',
    accountType: 'Savings',
    accountHolderName: 'Dr. Sarah Johnson',
    
    // Academic Background
    highestQualification: 'Ph.D. in Mathematics',
    university: 'University of Mumbai',
    graduationYear: '2015',
    phdThesis: 'Advanced Applications of Linear Algebra in Cryptography',
    supervisor: 'Dr. Rajesh Kumar',
    previousQualifications: [
      'M.Sc. Mathematics - University of Mumbai (2012) - First Class with Distinction',
      'B.Sc. Mathematics - University of Mumbai (2010) - First Class',
      'B.Ed. - University of Mumbai (2011) - First Class',
      'Higher Secondary - St. Mary\'s School (2007) - 95%',
      'Secondary - St. Mary\'s School (2005) - 92%'
    ],
    
    // Professional Experience
    previousExperience: [
      'Assistant Professor - St. Xavier\'s College (2015-2018) - 3 years',
      'Mathematics Tutor - Private Institute (2012-2015) - 3 years',
      'Research Assistant - University of Mumbai (2010-2012) - 2 years'
    ],
    
    // Address Information
    currentAddress: '123 Teacher Colony, Andheri West, Mumbai, Maharashtra - 400001',
    permanentAddress: '456 Family Lane, Bandra East, Mumbai, Maharashtra - 400002',
    city: 'Mumbai',
    state: 'Maharashtra',
    pincode: '400001',
    country: 'India',
    addressType: 'Owned',
    yearsAtCurrentAddress: '5 years',
    
    // Additional Contact Information
    whatsappNumber: '+91 98765 43210',
    linkedinProfile: 'linkedin.com/in/sarahjohnson',
    researchGateProfile: 'researchgate.net/profile/sarah_johnson',
    googleScholarProfile: 'scholar.google.com/citations?user=sarahjohnson',
    
    // Professional Achievements
    achievements: [
      'Best Teacher Award 2023 - School Level',
      'Published 5 research papers in international journals (2020-2023)',
      'Led Mathematics Olympiad team to state level (2022, 2023)',
      'Conducted 10+ workshops for teachers (2021-2023)',
      'Student satisfaction rating: 4.8/5 (2023)',
      'Received Excellence in Teaching Award (2022)',
      'Published textbook chapter on Advanced Calculus (2021)',
      'Member of Mathematics Teachers Association (2020-Present)',
      'Coordinated Annual Mathematics Festival (2021, 2022, 2023)',
      'Mentored 15+ junior teachers (2020-2023)'
    ],
    
    // Research & Publications
    researchPapers: [
      'Linear Algebra Applications in Modern Cryptography - International Journal of Mathematics (2023)',
      'Teaching Advanced Mathematics to High School Students - Educational Research Quarterly (2022)',
      'Number Theory in Secondary Education - Mathematics Education Journal (2021)',
      'Student Engagement in Mathematics Classrooms - Teaching and Learning Research (2020)',
      'Assessment Methods in Mathematics Education - Educational Assessment Review (2020)'
    ],
    
    // Skills & Certifications
    skills: [
      'Advanced Mathematics Teaching',
      'Curriculum Development',
      'Student Assessment',
      'Educational Technology',
      'Research Methodology',
      'Leadership & Mentoring',
      'Online Teaching Platforms',
      'Data Analysis',
      'Statistical Software (SPSS, R)',
      'Presentation Skills',
      'Parent Communication',
      'Classroom Management',
      'Special Education Needs',
      'Multilingual Teaching (English, Hindi)'
    ],
    certifications: [
      'Google Certified Educator Level 1 & 2 (2023)',
      'Microsoft Office Specialist (2022)',
      'Advanced Teaching Methodology (2021)',
      'Digital Learning Tools Certification (2021)',
      'Child Psychology and Development (2020)',
      'First Aid and CPR Certification (2020)',
      'Cyber Security Awareness (2023)',
      'Mental Health First Aid (2022)'
    ],
    
    // Performance Metrics
    currentYearPerformance: {
      averageAttendance: '98%',
      studentSatisfaction: '4.8/5',
      completionRate: '95%',
      averageScore: '87%',
      parentSatisfaction: '4.7/5',
      colleagueRating: '4.6/5',
      administrativeRating: '4.8/5'
    },
    
    // Work Schedule
    workSchedule: {
      workingDays: 'Monday to Friday',
      workingHours: '8:00 AM - 3:30 PM',
      officeHours: '2:00 PM - 3:30 PM',
      lunchBreak: '12:30 PM - 1:30 PM',
      extraClasses: 'Saturday (9:00 AM - 12:00 PM)'
    },
    
    // Health Information
    healthInfo: {
      bloodPressure: 'Normal',
      diabetes: 'No',
      allergies: 'None',
      lastMedicalCheckup: '2024-01-15',
      nextMedicalCheckup: '2025-01-15',
      emergencyMedicalInfo: 'No known allergies'
    },
    
    // Documents
    profilePhoto: '',
    resume: 'uploaded',
    educationalCertificates: 'uploaded',
    experienceCertificates: 'uploaded',
    idProof: 'uploaded',
    addressProof: 'uploaded',
    policeVerification: 'uploaded',
    medicalCertificate: 'uploaded',
    bankPassbook: 'uploaded',
    panCard: 'uploaded',
    aadharCard: 'uploaded',
    passport: 'uploaded',
    marriageCertificate: 'uploaded',
    childrenBirthCertificates: 'uploaded',
    researchPublications: 'uploaded',
    awardsCertificates: 'uploaded'
  });

  const handleProfileChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
    setProfileSaved(false);
  };

  const handleProfileSave = () => {
    setProfileSaved(true);
    setEditingProfile(false);
    setTimeout(() => setProfileSaved(false), 3000);
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfile({ ...profile, profilePhoto: e.target.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const getInitials = (name) => {
    return name
      .split(' ')
      .map((part) => part[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold tracking-tight mb-2">Teacher Profile</h1>
          <p className="text-muted-foreground">View and manage your complete professional information.</p>
        </div>

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-7">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="professional">Professional</TabsTrigger>
            <TabsTrigger value="academic">Academic</TabsTrigger>
            <TabsTrigger value="research">Research</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="personal">Personal</TabsTrigger>
            <TabsTrigger value="documents">Documents</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <User className="h-5 w-5" />
                    Profile Overview
                  </span>
                  <Button size="sm" variant="outline" onClick={() => setEditingProfile(!editingProfile)}>
                    {editingProfile ? <X className="h-4 w-4 mr-1" /> : <Edit3 className="h-4 w-4 mr-1" />}
                    {editingProfile ? 'Cancel' : 'Edit Profile'}
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col md:flex-row gap-6">
                  {/* Profile Photo Section */}
                  <div className="flex flex-col items-center space-y-4">
                    <div className="relative">
                      <Avatar className="h-32 w-32">
                        {profile.profilePhoto ? (
                          <AvatarImage src={profile.profilePhoto} alt={profile.name} />
                        ) : (
                          <AvatarFallback className="text-2xl bg-blue-600 text-white">
                            {getInitials(profile.name)}
                          </AvatarFallback>
                        )}
                      </Avatar>
                      {editingProfile && (
                        <label className="absolute bottom-0 right-0 bg-blue-600 text-white p-2 rounded-full cursor-pointer hover:bg-blue-700">
                          <Camera className="h-4 w-4" />
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handlePhotoUpload}
                            className="hidden"
                          />
                        </label>
                      )}
                    </div>
                    <div className="text-center">
                      <h2 className="text-xl font-semibold">{profile.name}</h2>
                      <p className="text-muted-foreground">{profile.designation}</p>
                      <p className="text-sm text-muted-foreground">{profile.department} Department</p>
                      <p className="text-sm text-muted-foreground">Employee ID: {profile.employeeId}</p>
                    </div>
                  </div>

                  {/* Quick Stats */}
                  <div className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="p-4 bg-blue-50 rounded-lg">
                      <div className="flex items-center gap-2">
                        <Users className="h-5 w-5 text-blue-600" />
                        <span className="font-medium">Students</span>
                      </div>
                      <p className="text-2xl font-bold text-blue-600">{profile.totalStudents}</p>
                    </div>
                    <div className="p-4 bg-green-50 rounded-lg">
                      <div className="flex items-center gap-2">
                        <BookOpen className="h-5 w-5 text-green-600" />
                        <span className="font-medium">Subjects</span>
                      </div>
                      <p className="text-2xl font-bold text-green-600">{profile.subjects.length}</p>
                    </div>
                    <div className="p-4 bg-purple-50 rounded-lg">
                      <div className="flex items-center gap-2">
                        <Award className="h-5 w-5 text-purple-600" />
                        <span className="font-medium">Experience</span>
                      </div>
                      <p className="text-2xl font-bold text-purple-600">{profile.experience}</p>
                    </div>
                    <div className="p-4 bg-orange-50 rounded-lg">
                      <div className="flex items-center gap-2">
                        <Star className="h-5 w-5 text-orange-600" />
                        <span className="font-medium">Rating</span>
                      </div>
                      <p className="text-2xl font-bold text-orange-600">{profile.currentYearPerformance.studentSatisfaction}</p>
                    </div>
                  </div>
                </div>

                {/* Contact Information */}
                <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{profile.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{profile.phone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{profile.city}, {profile.state}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">Joined: {profile.joiningDate}</span>
                  </div>
                </div>

                {/* Teaching Information */}
                <div className="mt-6">
                  <h3 className="font-semibold mb-3">Teaching Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <h4 className="font-medium text-sm text-muted-foreground">Subjects</h4>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {profile.subjects.map((subject, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {subject}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium text-sm text-muted-foreground">Classes</h4>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {profile.classes.map((cls, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {cls}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium text-sm text-muted-foreground">Specialization</h4>
                      <p className="text-sm mt-1">{profile.specialization}</p>
                    </div>
                  </div>
                </div>

                {editingProfile && (
                  <div className="mt-6 flex gap-2">
                    <Button onClick={handleProfileSave}>
                      <Save className="h-4 w-4 mr-1" />
                      Save Changes
                    </Button>
                    <Button variant="outline" onClick={() => setEditingProfile(false)}>
                      <X className="h-4 w-4 mr-1" />
                      Cancel
                    </Button>
                  </div>
                )}
                {profileSaved && (
                  <div className="text-green-600 text-sm mt-4 flex items-center gap-2">
                    <span>✓</span> Profile updated successfully!
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="professional" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Briefcase className="h-5 w-5" />
                  Professional Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                {editingProfile ? (
                  <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Employee ID</label>
                      <Input name="employeeId" value={profile.employeeId} onChange={handleProfileChange} />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Department</label>
                      <Input name="department" value={profile.department} onChange={handleProfileChange} />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Designation</label>
                      <Input name="designation" value={profile.designation} onChange={handleProfileChange} />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Joining Date</label>
                      <Input name="joiningDate" value={profile.joiningDate} onChange={handleProfileChange} type="date" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Experience</label>
                      <Input name="experience" value={profile.experience} onChange={handleProfileChange} />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Qualification</label>
                      <Input name="qualification" value={profile.qualification} onChange={handleProfileChange} />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <label className="text-sm font-medium">Specialization</label>
                      <Input name="specialization" value={profile.specialization} onChange={handleProfileChange} />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <label className="text-sm font-medium">Subjects (comma separated)</label>
                      <Input name="subjects" value={profile.subjects.join(', ')} onChange={(e) => {
                        const subjects = e.target.value.split(',').map(s => s.trim());
                        setProfile({ ...profile, subjects });
                      }} />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <label className="text-sm font-medium">Classes (comma separated)</label>
                      <Input name="classes" value={profile.classes.join(', ')} onChange={(e) => {
                        const classes = e.target.value.split(',').map(c => c.trim());
                        setProfile({ ...profile, classes });
                      }} />
                    </div>
                  </form>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div><span className="font-medium">Employee ID:</span> {profile.employeeId}</div>
                    <div><span className="font-medium">Department:</span> {profile.department}</div>
                    <div><span className="font-medium">Designation:</span> {profile.designation}</div>
                    <div><span className="font-medium">Joining Date:</span> {profile.joiningDate}</div>
                    <div><span className="font-medium">Experience:</span> {profile.experience}</div>
                    <div><span className="font-medium">Qualification:</span> {profile.qualification}</div>
                    <div className="md:col-span-2"><span className="font-medium">Specialization:</span> {profile.specialization}</div>
                    <div className="md:col-span-2">
                      <span className="font-medium">Subjects:</span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {profile.subjects.map((subject, index) => (
                          <Badge key={index} variant="secondary">
                            {subject}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div className="md:col-span-2">
                      <span className="font-medium">Classes:</span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {profile.classes.map((cls, index) => (
                          <Badge key={index} variant="outline">
                            {cls}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Skills & Certifications */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5" />
                  Skills & Certifications
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium mb-3">Skills</h4>
                    <div className="flex flex-wrap gap-2">
                      {profile.skills.map((skill, index) => (
                        <Badge key={index} variant="secondary">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium mb-3">Certifications</h4>
                    <div className="space-y-2">
                      {profile.certifications.map((cert, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <Award className="h-4 w-4 text-green-600" />
                          <span className="text-sm">{cert}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Bank Details */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5" />
                  Bank Details for Salary
                </CardTitle>
              </CardHeader>
              <CardContent>
                {editingProfile ? (
                  <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Bank Name</label>
                      <Input name="bankName" value={profile.bankName} onChange={handleProfileChange} />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Account Number</label>
                      <Input name="accountNumber" value={profile.accountNumber} onChange={handleProfileChange} />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">IFSC Code</label>
                      <Input name="ifscCode" value={profile.ifscCode} onChange={handleProfileChange} />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Branch Name</label>
                      <Input name="branchName" value={profile.branchName} onChange={handleProfileChange} />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Account Type</label>
                      <Input name="accountType" value={profile.accountType} onChange={handleProfileChange} />
                    </div>
                  </form>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div><span className="font-medium">Bank Name:</span> {profile.bankName}</div>
                    <div><span className="font-medium">Account Number:</span> {profile.accountNumber}</div>
                    <div><span className="font-medium">IFSC Code:</span> {profile.ifscCode}</div>
                    <div><span className="font-medium">Branch Name:</span> {profile.branchName}</div>
                    <div><span className="font-medium">Account Type:</span> {profile.accountType}</div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="academic" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <GraduationCap className="h-5 w-5" />
                  Academic Background
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h4 className="font-medium mb-3">Highest Qualification</h4>
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <div className="font-semibold">{profile.highestQualification}</div>
                      <div className="text-sm text-muted-foreground">{profile.university} • {profile.graduationYear}</div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-3">Previous Qualifications</h4>
                    <div className="space-y-2">
                      {profile.previousQualifications.map((qual, index) => (
                        <div key={index} className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                          <GraduationCap className="h-4 w-4 text-blue-600" />
                          <span className="text-sm">{qual}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-3">Previous Experience</h4>
                    <div className="space-y-2">
                      {profile.previousExperience.map((exp, index) => (
                        <div key={index} className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                          <Briefcase className="h-4 w-4 text-green-600" />
                          <span className="text-sm">{exp}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="research" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5" />
                  Research & Publications
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h4 className="font-medium mb-3">PhD Thesis</h4>
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <div className="font-semibold">{profile.phdThesis}</div>
                      <div className="text-sm text-muted-foreground">Supervisor: {profile.supervisor}</div>
                      <div className="text-sm text-muted-foreground">{profile.university} • {profile.graduationYear}</div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-3">Research Papers</h4>
                    <div className="space-y-2">
                      {profile.researchPapers.map((paper, index) => (
                        <div key={index} className="flex items-start gap-2 p-3 bg-gray-50 rounded-lg">
                          <BookOpen className="h-4 w-4 text-blue-600 mt-0.5" />
                          <div className="text-sm">
                            <div className="font-medium">{paper}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-3">Skills & Certifications</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h5 className="font-medium text-sm text-muted-foreground mb-2">Skills</h5>
                        <div className="space-y-1">
                          {profile.skills.map((skill, index) => (
                            <div key={index} className="flex items-center gap-2 p-2 bg-gray-50 rounded">
                              <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                              <span className="text-sm">{skill}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h5 className="font-medium text-sm text-muted-foreground mb-2">Certifications</h5>
                        <div className="space-y-1">
                          {profile.certifications.map((cert, index) => (
                            <div key={index} className="flex items-center gap-2 p-2 bg-gray-50 rounded">
                              <Award className="h-3 w-3 text-green-600" />
                              <span className="text-sm">{cert}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="performance" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Performance Metrics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <div className="flex items-center gap-2">
                      <Clock className="h-5 w-5 text-blue-600" />
                      <span className="font-medium">Attendance</span>
                    </div>
                    <p className="text-2xl font-bold text-blue-600">{profile.currentYearPerformance.averageAttendance}</p>
                  </div>
                  <div className="p-4 bg-green-50 rounded-lg">
                    <div className="flex items-center gap-2">
                      <Star className="h-5 w-5 text-green-600" />
                      <span className="font-medium">Satisfaction</span>
                    </div>
                    <p className="text-2xl font-bold text-green-600">{profile.currentYearPerformance.studentSatisfaction}</p>
                  </div>
                  <div className="p-4 bg-purple-50 rounded-lg">
                    <div className="flex items-center gap-2">
                      <Target className="h-5 w-5 text-purple-600" />
                      <span className="font-medium">Completion</span>
                    </div>
                    <p className="text-2xl font-bold text-purple-600">{profile.currentYearPerformance.completionRate}</p>
                  </div>
                  <div className="p-4 bg-orange-50 rounded-lg">
                    <div className="flex items-center gap-2">
                      <Trophy className="h-5 w-5 text-orange-600" />
                      <span className="font-medium">Avg Score</span>
                    </div>
                    <p className="text-2xl font-bold text-orange-600">{profile.currentYearPerformance.averageScore}</p>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-3">Achievements</h4>
                  <div className="space-y-2">
                    {profile.achievements.map((achievement, index) => (
                      <div key={index} className="flex items-center gap-2 p-3 bg-yellow-50 rounded-lg">
                        <Award className="h-4 w-4 text-yellow-600" />
                        <span className="text-sm">{achievement}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="personal" className="space-y-6">
            {/* Basic Personal Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Basic Personal Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                {editingProfile ? (
                  <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Full Name</label>
                      <Input name="name" value={profile.name} onChange={handleProfileChange} required />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Email</label>
                      <Input name="email" value={profile.email} onChange={handleProfileChange} type="email" required />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Phone Number</label>
                      <Input name="phone" value={profile.phone} onChange={handleProfileChange} />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Alternate Phone</label>
                      <Input name="alternatePhone" value={profile.alternatePhone} onChange={handleProfileChange} />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">WhatsApp Number</label>
                      <Input name="whatsappNumber" value={profile.whatsappNumber} onChange={handleProfileChange} />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Date of Birth</label>
                      <Input name="dateOfBirth" value={profile.dateOfBirth} onChange={handleProfileChange} type="date" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Gender</label>
                      <select name="gender" value={profile.gender} onChange={handleProfileChange} className="w-full p-2 border border-gray-300 rounded-md">
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Blood Group</label>
                      <Input name="bloodGroup" value={profile.bloodGroup} onChange={handleProfileChange} />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Nationality</label>
                      <Input name="nationality" value={profile.nationality} onChange={handleProfileChange} />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Religion</label>
                      <Input name="religion" value={profile.religion} onChange={handleProfileChange} />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Marital Status</label>
                      <select name="maritalStatus" value={profile.maritalStatus} onChange={handleProfileChange} className="w-full p-2 border border-gray-300 rounded-md">
                        <option value="Single">Single</option>
                        <option value="Married">Married</option>
                        <option value="Divorced">Divorced</option>
                        <option value="Widowed">Widowed</option>
                      </select>
                    </div>
                  </form>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div><span className="font-medium">Full Name:</span> {profile.name}</div>
                    <div><span className="font-medium">Email:</span> {profile.email}</div>
                    <div><span className="font-medium">Phone:</span> {profile.phone}</div>
                    <div><span className="font-medium">Alternate Phone:</span> {profile.alternatePhone}</div>
                    <div><span className="font-medium">WhatsApp:</span> {profile.whatsappNumber}</div>
                    <div><span className="font-medium">Date of Birth:</span> {profile.dateOfBirth}</div>
                    <div><span className="font-medium">Age:</span> {profile.age}</div>
                    <div><span className="font-medium">Gender:</span> {profile.gender}</div>
                    <div><span className="font-medium">Blood Group:</span> {profile.bloodGroup}</div>
                    <div><span className="font-medium">Nationality:</span> {profile.nationality}</div>
                    <div><span className="font-medium">Religion:</span> {profile.religion}</div>
                    <div><span className="font-medium">Marital Status:</span> {profile.maritalStatus}</div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Family Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Family Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                {editingProfile ? (
                  <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Spouse Name</label>
                      <Input name="spouseName" value={profile.spouseName} onChange={handleProfileChange} />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Spouse Occupation</label>
                      <Input name="spouseOccupation" value={profile.spouseOccupation} onChange={handleProfileChange} />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Spouse Phone</label>
                      <Input name="spousePhone" value={profile.spousePhone} onChange={handleProfileChange} />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Father's Name</label>
                      <Input name="fatherName" value={profile.fatherName} onChange={handleProfileChange} />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Father's Occupation</label>
                      <Input name="fatherOccupation" value={profile.fatherOccupation} onChange={handleProfileChange} />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Father's Phone</label>
                      <Input name="fatherPhone" value={profile.fatherPhone} onChange={handleProfileChange} />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Mother's Name</label>
                      <Input name="motherName" value={profile.motherName} onChange={handleProfileChange} />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Mother's Occupation</label>
                      <Input name="motherOccupation" value={profile.motherOccupation} onChange={handleProfileChange} />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Mother's Phone</label>
                      <Input name="motherPhone" value={profile.motherPhone} onChange={handleProfileChange} />
                    </div>
                  </form>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div><span className="font-medium">Spouse Name:</span> {profile.spouseName}</div>
                    <div><span className="font-medium">Spouse Occupation:</span> {profile.spouseOccupation}</div>
                    <div><span className="font-medium">Spouse Phone:</span> {profile.spousePhone}</div>
                    <div><span className="font-medium">Father's Name:</span> {profile.fatherName}</div>
                    <div><span className="font-medium">Father's Occupation:</span> {profile.fatherOccupation}</div>
                    <div><span className="font-medium">Father's Phone:</span> {profile.fatherPhone}</div>
                    <div><span className="font-medium">Mother's Name:</span> {profile.motherName}</div>
                    <div><span className="font-medium">Mother's Occupation:</span> {profile.motherOccupation}</div>
                    <div><span className="font-medium">Mother's Phone:</span> {profile.motherPhone}</div>
                    <div className="md:col-span-2">
                      <span className="font-medium">Children:</span>
                      <div className="mt-2 space-y-1">
                        {profile.children.map((child, index) => (
                          <div key={index} className="text-sm text-muted-foreground">
                            {child.name} ({child.age}) - {child.school}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Emergency Contacts */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Phone className="h-5 w-5" />
                  Emergency Contacts
                </CardTitle>
              </CardHeader>
              <CardContent>
                {editingProfile ? (
                  <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Primary Emergency Contact</label>
                      <Input name="emergencyContact" value={profile.emergencyContact} onChange={handleProfileChange} />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Primary Emergency Relation</label>
                      <Input name="emergencyRelation" value={profile.emergencyRelation} onChange={handleProfileChange} />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Secondary Emergency Contact</label>
                      <Input name="emergencyContact2" value={profile.emergencyContact2} onChange={handleProfileChange} />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Secondary Emergency Relation</label>
                      <Input name="emergencyRelation2" value={profile.emergencyRelation2} onChange={handleProfileChange} />
                    </div>
                  </form>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div><span className="font-medium">Primary Emergency:</span> {profile.emergencyContact} ({profile.emergencyRelation})</div>
                    <div><span className="font-medium">Secondary Emergency:</span> {profile.emergencyContact2} ({profile.emergencyRelation2})</div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Address Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  Address Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                {editingProfile ? (
                  <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2 md:col-span-2">
                      <label className="text-sm font-medium">Current Address</label>
                      <Input name="currentAddress" value={profile.currentAddress} onChange={handleProfileChange} />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <label className="text-sm font-medium">Permanent Address</label>
                      <Input name="permanentAddress" value={profile.permanentAddress} onChange={handleProfileChange} />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">City</label>
                      <Input name="city" value={profile.city} onChange={handleProfileChange} />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">State</label>
                      <Input name="state" value={profile.state} onChange={handleProfileChange} />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Pincode</label>
                      <Input name="pincode" value={profile.pincode} onChange={handleProfileChange} />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Country</label>
                      <Input name="country" value={profile.country} onChange={handleProfileChange} />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Address Type</label>
                      <select name="addressType" value={profile.addressType} onChange={handleProfileChange} className="w-full p-2 border border-gray-300 rounded-md">
                        <option value="Owned">Owned</option>
                        <option value="Rented">Rented</option>
                        <option value="Leased">Leased</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Years at Current Address</label>
                      <Input name="yearsAtCurrentAddress" value={profile.yearsAtCurrentAddress} onChange={handleProfileChange} />
                    </div>
                  </form>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="md:col-span-2"><span className="font-medium">Current Address:</span> {profile.currentAddress}</div>
                    <div className="md:col-span-2"><span className="font-medium">Permanent Address:</span> {profile.permanentAddress}</div>
                    <div><span className="font-medium">City:</span> {profile.city}</div>
                    <div><span className="font-medium">State:</span> {profile.state}</div>
                    <div><span className="font-medium">Pincode:</span> {profile.pincode}</div>
                    <div><span className="font-medium">Country:</span> {profile.country}</div>
                    <div><span className="font-medium">Address Type:</span> {profile.addressType}</div>
                    <div><span className="font-medium">Years at Current Address:</span> {profile.yearsAtCurrentAddress}</div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Social Media & Professional Links */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="h-5 w-5" />
                  Social Media & Professional Links
                </CardTitle>
              </CardHeader>
              <CardContent>
                {editingProfile ? (
                  <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">LinkedIn Profile</label>
                      <Input name="linkedinProfile" value={profile.linkedinProfile} onChange={handleProfileChange} />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">ResearchGate Profile</label>
                      <Input name="researchGateProfile" value={profile.researchGateProfile} onChange={handleProfileChange} />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Google Scholar Profile</label>
                      <Input name="googleScholarProfile" value={profile.googleScholarProfile} onChange={handleProfileChange} />
                    </div>
                  </form>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div><span className="font-medium">LinkedIn:</span> <a href={`https://${profile.linkedinProfile}`} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">{profile.linkedinProfile}</a></div>
                    <div><span className="font-medium">ResearchGate:</span> <a href={`https://${profile.researchGateProfile}`} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">{profile.researchGateProfile}</a></div>
                    <div><span className="font-medium">Google Scholar:</span> <a href={`https://${profile.googleScholarProfile}`} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">{profile.googleScholarProfile}</a></div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Health Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Heart className="h-5 w-5" />
                  Health Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                {editingProfile ? (
                  <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Blood Pressure</label>
                      <Input name="healthInfo.bloodPressure" value={profile.healthInfo.bloodPressure} onChange={handleProfileChange} />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Diabetes</label>
                      <select name="healthInfo.diabetes" value={profile.healthInfo.diabetes} onChange={handleProfileChange} className="w-full p-2 border border-gray-300 rounded-md">
                        <option value="No">No</option>
                        <option value="Yes">Yes</option>
                        <option value="Pre-diabetic">Pre-diabetic</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Allergies</label>
                      <Input name="healthInfo.allergies" value={profile.healthInfo.allergies} onChange={handleProfileChange} />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Last Medical Checkup</label>
                      <Input name="healthInfo.lastMedicalCheckup" value={profile.healthInfo.lastMedicalCheckup} onChange={handleProfileChange} type="date" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Next Medical Checkup</label>
                      <Input name="healthInfo.nextMedicalCheckup" value={profile.healthInfo.nextMedicalCheckup} onChange={handleProfileChange} type="date" />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <label className="text-sm font-medium">Emergency Medical Information</label>
                      <Input name="healthInfo.emergencyMedicalInfo" value={profile.healthInfo.emergencyMedicalInfo} onChange={handleProfileChange} />
                    </div>
                  </form>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div><span className="font-medium">Blood Pressure:</span> {profile.healthInfo.bloodPressure}</div>
                    <div><span className="font-medium">Diabetes:</span> {profile.healthInfo.diabetes}</div>
                    <div><span className="font-medium">Allergies:</span> {profile.healthInfo.allergies}</div>
                    <div><span className="font-medium">Last Medical Checkup:</span> {profile.healthInfo.lastMedicalCheckup}</div>
                    <div><span className="font-medium">Next Medical Checkup:</span> {profile.healthInfo.nextMedicalCheckup}</div>
                    <div className="md:col-span-2"><span className="font-medium">Emergency Medical Info:</span> {profile.healthInfo.emergencyMedicalInfo}</div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Work Schedule */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Work Schedule
                </CardTitle>
              </CardHeader>
              <CardContent>
                {editingProfile ? (
                  <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Working Days</label>
                      <Input name="workSchedule.workingDays" value={profile.workSchedule.workingDays} onChange={handleProfileChange} />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Working Hours</label>
                      <Input name="workSchedule.workingHours" value={profile.workSchedule.workingHours} onChange={handleProfileChange} />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Office Hours</label>
                      <Input name="workSchedule.officeHours" value={profile.workSchedule.officeHours} onChange={handleProfileChange} />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Lunch Break</label>
                      <Input name="workSchedule.lunchBreak" value={profile.workSchedule.lunchBreak} onChange={handleProfileChange} />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Extra Classes</label>
                      <Input name="workSchedule.extraClasses" value={profile.workSchedule.extraClasses} onChange={handleProfileChange} />
                    </div>
                  </form>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div><span className="font-medium">Working Days:</span> {profile.workSchedule.workingDays}</div>
                    <div><span className="font-medium">Working Hours:</span> {profile.workSchedule.workingHours}</div>
                    <div><span className="font-medium">Office Hours:</span> {profile.workSchedule.officeHours}</div>
                    <div><span className="font-medium">Lunch Break:</span> {profile.workSchedule.lunchBreak}</div>
                    <div><span className="font-medium">Extra Classes:</span> {profile.workSchedule.extraClasses}</div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="documents" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Documents
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-blue-600" />
                      <span>Resume</span>
                    </div>
                    <Badge variant={profile.resume === 'uploaded' ? 'default' : 'secondary'}>
                      {profile.resume === 'uploaded' ? 'Uploaded' : 'Pending'}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-2">
                      <Award className="h-4 w-4 text-green-600" />
                      <span>Educational Certificates</span>
                    </div>
                    <Badge variant={profile.educationalCertificates === 'uploaded' ? 'default' : 'secondary'}>
                      {profile.educationalCertificates === 'uploaded' ? 'Uploaded' : 'Pending'}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-2">
                      <Briefcase className="h-4 w-4 text-purple-600" />
                      <span>Experience Certificates</span>
                    </div>
                    <Badge variant={profile.experienceCertificates === 'uploaded' ? 'default' : 'secondary'}>
                      {profile.experienceCertificates === 'uploaded' ? 'Uploaded' : 'Pending'}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-2">
                      <Shield className="h-4 w-4 text-orange-600" />
                      <span>ID Proof</span>
                    </div>
                    <Badge variant={profile.idProof === 'uploaded' ? 'default' : 'secondary'}>
                      {profile.idProof === 'uploaded' ? 'Uploaded' : 'Pending'}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-2">
                      <MapPinIcon className="h-4 w-4 text-red-600" />
                      <span>Address Proof</span>
                    </div>
                    <Badge variant={profile.addressProof === 'uploaded' ? 'default' : 'secondary'}>
                      {profile.addressProof === 'uploaded' ? 'Uploaded' : 'Pending'}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-2">
                      <Shield className="h-4 w-4 text-indigo-600" />
                      <span>Police Verification</span>
                    </div>
                    <Badge variant={profile.policeVerification === 'uploaded' ? 'default' : 'secondary'}>
                      {profile.policeVerification === 'uploaded' ? 'Uploaded' : 'Pending'}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-2">
                      <Heart className="h-4 w-4 text-pink-600" />
                      <span>Medical Certificate</span>
                    </div>
                    <Badge variant={profile.medicalCertificate === 'uploaded' ? 'default' : 'secondary'}>
                      {profile.medicalCertificate === 'uploaded' ? 'Uploaded' : 'Pending'}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-2">
                      <CreditCard className="h-4 w-4 text-emerald-600" />
                      <span>Bank Passbook</span>
                    </div>
                    <Badge variant={profile.bankPassbook === 'uploaded' ? 'default' : 'secondary'}>
                      {profile.bankPassbook === 'uploaded' ? 'Uploaded' : 'Pending'}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-2">
                      <CreditCard className="h-4 w-4 text-amber-600" />
                      <span>PAN Card</span>
                    </div>
                    <Badge variant={profile.panCard === 'uploaded' ? 'default' : 'secondary'}>
                      {profile.panCard === 'uploaded' ? 'Uploaded' : 'Pending'}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-2">
                      <CreditCard className="h-4 w-4 text-cyan-600" />
                      <span>Aadhar Card</span>
                    </div>
                    <Badge variant={profile.aadharCard === 'uploaded' ? 'default' : 'secondary'}>
                      {profile.aadharCard === 'uploaded' ? 'Uploaded' : 'Pending'}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-2">
                      <Globe className="h-4 w-4 text-violet-600" />
                      <span>Passport</span>
                    </div>
                    <Badge variant={profile.passport === 'uploaded' ? 'default' : 'secondary'}>
                      {profile.passport === 'uploaded' ? 'Uploaded' : 'Pending'}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-2">
                      <Heart className="h-4 w-4 text-rose-600" />
                      <span>Marriage Certificate</span>
                    </div>
                    <Badge variant={profile.marriageCertificate === 'uploaded' ? 'default' : 'secondary'}>
                      {profile.marriageCertificate === 'uploaded' ? 'Uploaded' : 'Pending'}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-teal-600" />
                      <span>Children Birth Certificates</span>
                    </div>
                    <Badge variant={profile.childrenBirthCertificates === 'uploaded' ? 'default' : 'secondary'}>
                      {profile.childrenBirthCertificates === 'uploaded' ? 'Uploaded' : 'Pending'}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-2">
                      <BookOpen className="h-4 w-4 text-lime-600" />
                      <span>Research Publications</span>
                    </div>
                    <Badge variant={profile.researchPublications === 'uploaded' ? 'default' : 'secondary'}>
                      {profile.researchPublications === 'uploaded' ? 'Uploaded' : 'Pending'}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-2">
                      <Trophy className="h-4 w-4 text-yellow-600" />
                      <span>Awards Certificates</span>
                    </div>
                    <Badge variant={profile.awardsCertificates === 'uploaded' ? 'default' : 'secondary'}>
                      {profile.awardsCertificates === 'uploaded' ? 'Uploaded' : 'Pending'}
                    </Badge>
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

export default ProfilePage;
