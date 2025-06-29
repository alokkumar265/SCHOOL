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
  EyeOff,
  Activity
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const ProfilePage = () => {
  const { user } = useAuth();
  const [editingProfile, setEditingProfile] = useState(false);
  const [profileSaved, setProfileSaved] = useState(false);

  // Admin profile state
  const [adminProfile, setAdminProfile] = useState({
    // Basic Information
    name: 'Mr. Rajesh Kumar',
    email: 'rajesh.kumar@school.edu',
    phone: '+91 98765 43210',
    alternatePhone: '+91 98765 43212',
    dateOfBirth: '1975-08-20',
    age: '48 years',
    gender: 'Male',
    bloodGroup: 'B+',
    nationality: 'Indian',
    religion: 'Hindu',
    maritalStatus: 'Married',
    spouseName: 'Mrs. Priya Kumar',
    spouseOccupation: 'Doctor',
    spousePhone: '+91 98765 43213',
    
    // Family Information
    fatherName: 'Mr. Suresh Kumar',
    motherName: 'Mrs. Radha Kumar',
    fatherOccupation: 'Retired Government Officer',
    motherOccupation: 'Homemaker',
    fatherPhone: '+91 98765 43214',
    motherPhone: '+91 98765 43215',
    children: [
      { name: 'Rahul Kumar', age: '22', occupation: 'Software Engineer' },
      { name: 'Priya Kumar', age: '19', occupation: 'Medical Student' }
    ],
    
    // Emergency Contacts
    emergencyContact: '+91 98765 43211',
    emergencyRelation: 'Spouse',
    emergencyContact2: '+91 98765 43216',
    emergencyRelation2: 'Son',
    
    // Professional Information
    employeeId: 'ADM2020001',
    department: 'Administration',
    designation: 'School Principal',
    joiningDate: '2020-01-01',
    experience: '4 years',
    totalExperience: '15 years (including previous institutions)',
    qualification: 'M.Ed. in Educational Administration',
    specialization: 'School Management, Educational Leadership, Policy Development',
    responsibilities: ['Overall School Management', 'Staff Supervision', 'Academic Planning', 'Budget Management', 'Parent Relations'],
    departments: ['Administration', 'Academics', 'Finance', 'Human Resources', 'Student Affairs'],
    totalStaff: 45,
    totalStudents: 1200,
    
    // Salary Information
    basicSalary: 75000,
    allowances: 25000,
    totalSalary: 100000,
    salaryGrade: 'Grade 1',
    incrementDate: '2024-01-01',
    nextIncrementDate: '2025-01-01',
    
    // Bank Details for Salary
    bankName: 'HDFC Bank',
    accountNumber: '1234567890',
    ifscCode: 'HDFC0001234',
    branchName: 'Mumbai Central Branch',
    accountType: 'Savings',
    accountHolderName: 'Mr. Rajesh Kumar',
    
    // Academic Background
    highestQualification: 'M.Ed. in Educational Administration',
    university: 'University of Mumbai',
    graduationYear: '2010',
    thesis: 'Effective School Leadership in Digital Age',
    supervisor: 'Dr. Meera Patel',
    previousQualifications: [
      'B.Ed. - University of Mumbai (2008) - First Class',
      'M.A. Education - University of Mumbai (2006) - First Class',
      'B.A. Education - University of Mumbai (2004) - First Class',
      'Higher Secondary - St. Xavier\'s School (2001) - 92%',
      'Secondary - St. Xavier\'s School (1999) - 88%'
    ],
    
    // Professional Experience
    previousExperience: [
      'Vice Principal - St. Xavier\'s School (2015-2020) - 5 years',
      'Senior Teacher - St. Xavier\'s School (2010-2015) - 5 years',
      'Teacher - Public School (2008-2010) - 2 years'
    ],
    
    // Address Information
    currentAddress: '456 Admin Colony, Bandra West, Mumbai, Maharashtra - 400050',
    permanentAddress: '789 Family Lane, Andheri East, Mumbai, Maharashtra - 400069',
    city: 'Mumbai',
    state: 'Maharashtra',
    pincode: '400050',
    country: 'India',
    addressType: 'Owned',
    yearsAtCurrentAddress: '8 years',
    
    // Additional Contact Information
    whatsappNumber: '+91 98765 43210',
    linkedinProfile: 'linkedin.com/in/rajeshkumar',
    professionalEmail: 'principal@school.edu',
    
    // Professional Achievements
    achievements: [
      'Best Principal Award 2023 - District Level',
      'School Excellence Award 2022 - State Level',
      'Digital Transformation Leader 2021 - National Level',
      'Student Satisfaction Rating: 4.9/5 (2023)',
      'Staff Satisfaction Rating: 4.8/5 (2023)',
      'Parent Satisfaction Rating: 4.7/5 (2023)',
      '100% Board Results (2022, 2023)',
      'Zero Dropout Rate (2021-2023)',
      'Excellence in School Management Award (2022)',
      'Educational Innovation Award (2021)'
    ],
    
    // Skills & Certifications
    skills: [
      'Educational Leadership',
      'School Administration',
      'Strategic Planning',
      'Budget Management',
      'Staff Development',
      'Curriculum Planning',
      'Policy Development',
      'Parent Relations',
      'Student Welfare',
      'Crisis Management',
      'Digital Transformation',
      'Quality Assurance',
      'Performance Management',
      'Community Relations'
    ],
    certifications: [
      'Certified School Administrator (2023)',
      'Educational Leadership Program (2022)',
      'Digital School Management (2021)',
      'Student Safety & Welfare (2020)',
      'Financial Management for Schools (2019)'
    ]
  });

  // Teacher profile state (existing)
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

  // Alumni profile state
  const [alumniProfile, setAlumniProfile] = useState({
    // Basic Information
    name: 'Priya Sharma',
    email: 'priya.sharma@alumni.school.edu',
    phone: '+91 98765 43210',
    alternatePhone: '+91 98765 43212',
    dateOfBirth: '1995-08-15',
    age: '28 years',
    gender: 'Female',
    bloodGroup: 'O+',
    nationality: 'Indian',
    religion: 'Hindu',
    maritalStatus: 'Single',
    
    // Family Information
    fatherName: 'Mr. Rajesh Sharma',
    motherName: 'Mrs. Sunita Sharma',
    fatherOccupation: 'Business Owner',
    motherOccupation: 'Homemaker',
    fatherPhone: '+91 98765 43214',
    motherPhone: '+91 98765 43215',
    
    // Emergency Contacts
    emergencyContact: '+91 98765 43211',
    emergencyRelation: 'Father',
    emergencyContact2: '+91 98765 43216',
    emergencyRelation2: 'Mother',
    
    // Alumni Information
    alumniId: 'AL2020-001',
    graduationYear: '2020',
    degree: 'Bachelor of Science',
    major: 'Computer Science',
    minor: 'Mathematics',
    gpa: '3.8/4.0',
    honors: 'Dean\'s List (2018-2020), Magna Cum Laude',
    graduationDate: '2020-05-15',
    schoolName: 'Veena Public School',
    schoolLocation: 'Mumbai, Maharashtra',
    
    // Current Professional Information
    currentCompany: 'Tech Solutions Inc.',
    position: 'Software Engineer',
    department: 'Engineering',
    joiningDate: '2020-08-01',
    experience: '3.5 years',
    totalExperience: '3.5 years',
    salary: '₹12,00,000 per annum',
    location: 'Mumbai, Maharashtra',
    workType: 'Full-time',
    
    // Previous Experience
    previousExperience: [
      'Software Developer - StartupXYZ (2020-2021) - 1 year',
      'Intern - TechCorp (2019-2020) - 6 months',
      'Research Assistant - University Lab (2018-2019) - 1 year'
    ],
    
    // Academic Background
    highestQualification: 'Bachelor of Science in Computer Science',
    university: 'University of Mumbai',
    graduationYear: '2020',
    thesis: 'Machine Learning Applications in Educational Technology',
    supervisor: 'Dr. Amit Patel',
    previousQualifications: [
      'Higher Secondary - Veena Public School (2016) - 92%',
      'Secondary - Veena Public School (2014) - 88%'
    ],
    
    // Address Information
    currentAddress: '456 Alumni Colony, Bandra West, Mumbai, Maharashtra - 400050',
    permanentAddress: '789 Family Lane, Andheri East, Mumbai, Maharashtra - 400069',
    city: 'Mumbai',
    state: 'Maharashtra',
    pincode: '400050',
    country: 'India',
    addressType: 'Rented',
    yearsAtCurrentAddress: '2 years',
    
    // Additional Contact Information
    whatsappNumber: '+91 98765 43210',
    linkedinProfile: 'linkedin.com/in/priyasharma',
    githubProfile: 'github.com/priyasharma',
    portfolio: 'priyasharma.dev',
    
    // Professional Achievements
    achievements: [
      'Employee of the Year 2023 - Tech Solutions Inc.',
      'Led development of 5 major software projects (2021-2023)',
      'Mentored 10+ junior developers (2022-2023)',
      'Published 3 technical articles on Medium (2022-2023)',
      'Speaker at Tech Conference 2023',
      'Open Source Contributor - 15+ repositories',
      'Certified AWS Developer (2022)',
      'Google Cloud Professional Developer (2023)',
      'Microsoft Azure Developer Associate (2023)',
      'Best Alumni Award 2022 - Veena Public School'
    ],
    
    // Skills & Certifications
    skills: [
      'JavaScript/TypeScript',
      'React.js/Next.js',
      'Node.js/Express.js',
      'Python/Django',
      'Java/Spring Boot',
      'AWS/Cloud Computing',
      'Docker/Kubernetes',
      'Machine Learning',
      'Data Structures & Algorithms',
      'System Design',
      'Agile/Scrum',
      'Git/GitHub',
      'RESTful APIs',
      'Microservices Architecture'
    ],
    certifications: [
      'AWS Certified Developer Associate (2023)',
      'Google Cloud Professional Developer (2023)',
      'Microsoft Azure Developer Associate (2023)',
      'Certified Scrum Master (2022)',
      'MongoDB Developer Certification (2022)',
      'React Developer Certification (2021)',
      'Python Programming Certification (2021)',
      'Machine Learning Specialization (2020)'
    ],
    
    // Alumni Activities
    alumniActivities: [
      'Alumni Association Member (2020-Present)',
      'Career Guidance Volunteer (2021-Present)',
      'Mentorship Program Participant (2022-Present)',
      'Alumni Newsletter Contributor (2021-2023)',
      'Homecoming Event Organizer (2022, 2023)',
      'Scholarship Fund Donor (2021-2023)',
      'Guest Speaker at School Events (2022, 2023)',
      'Alumni Directory Committee Member (2023)'
    ],
    
    // Performance Metrics
    currentYearPerformance: {
      projectCompletion: '95%',
      clientSatisfaction: '4.9/5',
      codeQuality: '4.8/5',
      teamCollaboration: '4.7/5',
      innovation: '4.6/5',
      leadership: '4.5/5'
    },
    
    // Work Schedule
    workSchedule: {
      workingDays: 'Monday to Friday',
      workingHours: '9:00 AM - 6:00 PM',
      remoteWork: 'Hybrid (3 days office, 2 days remote)',
      timezone: 'IST (UTC+5:30)',
      onCall: 'Weekend rotation'
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
    panCard: 'uploaded',
    aadharCard: 'uploaded',
    passport: 'uploaded',
    alumniCard: 'uploaded',
    degreeCertificate: 'uploaded',
    transcript: 'uploaded',
    awardsCertificates: 'uploaded',
    professionalCertifications: 'uploaded'
  });

  // Role-based profile selection
  const currentProfile = user?.role === 'admin' ? adminProfile : user?.role === 'alumni' ? alumniProfile : profile;
  const currentProfileSetter = user?.role === 'admin' ? setAdminProfile : user?.role === 'alumni' ? setAlumniProfile : setProfile;

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    if (user?.role === 'admin') {
      setAdminProfile(prev => ({ ...prev, [name]: value }));
    } else if (user?.role === 'alumni') {
      setAlumniProfile(prev => ({ ...prev, [name]: value }));
    } else {
      setProfile(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleProfileSave = () => {
    setProfileSaved(true);
    setTimeout(() => setProfileSaved(false), 3000);
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const photoUrl = event.target.result as string;
        if (user?.role === 'admin') {
          setAdminProfile(prev => ({ ...prev, profilePhoto: photoUrl }));
        } else if (user?.role === 'alumni') {
          setAlumniProfile(prev => ({ ...prev, profilePhoto: photoUrl }));
        } else {
          setProfile(prev => ({ ...prev, profilePhoto: photoUrl }));
        }
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
          <h1 className="text-3xl font-bold tracking-tight mb-2">
            {user?.role === 'admin' ? 'Admin Profile' : user?.role === 'alumni' ? 'Alumni Profile' : 'Teacher Profile'}
          </h1>
          <p className="text-muted-foreground">
            {user?.role === 'admin' ? 'View and manage your complete administrative information.' : 
             user?.role === 'alumni' ? 'View and manage your complete alumni information.' : 
             'View and manage your complete professional information.'}
          </p>
        </div>

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-5 lg:w-[500px]">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="career">
              {user?.role === 'alumni' ? 'Career' : 'Professional'}
            </TabsTrigger>
            <TabsTrigger value="academic">Academic</TabsTrigger>
            <TabsTrigger value="activities">
              {user?.role === 'alumni' ? 'Activities' : 'Research'}
            </TabsTrigger>
            {user?.role === 'alumni' && (
              <TabsTrigger value="personal-details">Personal Details</TabsTrigger>
            )}
            {user?.role !== 'alumni' && (
              <>
                <TabsTrigger value="performance">Performance</TabsTrigger>
                <TabsTrigger value="personal">Personal</TabsTrigger>
                <TabsTrigger value="documents">Documents</TabsTrigger>
              </>
            )}
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
                        {(currentProfile as any).profilePhoto ? (
                          <AvatarImage src={(currentProfile as any).profilePhoto} alt={currentProfile.name} />
                        ) : (
                          <AvatarFallback className="text-2xl bg-blue-600 text-white">
                            {getInitials(currentProfile.name)}
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
                      <h2 className="text-xl font-semibold">{currentProfile.name}</h2>
                      <p className="text-muted-foreground">
                        {(currentProfile as any).designation || (currentProfile as any).position}
                      </p>
                      {user?.role === 'alumni' ? (
                        <p className="text-sm text-muted-foreground">{(currentProfile as any).schoolName}</p>
                      ) : (
                        <p className="text-sm text-muted-foreground">{(currentProfile as any).department} Department</p>
                      )}
                      <p className="text-sm text-muted-foreground">
                        {user?.role === 'alumni' ? `Alumni ID: ${(currentProfile as any).alumniId}` : `Employee ID: ${(currentProfile as any).employeeId}`}
                      </p>
                    </div>
                  </div>

                  {/* Quick Stats */}
                  <div className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {user?.role === 'alumni' ? (
                      // Alumni-specific stats
                      <>
                        <div className="p-4 bg-blue-50 rounded-lg">
                          <div className="flex items-center gap-2">
                            <Briefcase className="h-5 w-5 text-blue-600" />
                            <span className="font-medium">Experience</span>
                          </div>
                          <p className="text-2xl font-bold text-blue-600">{currentProfile.experience}</p>
                        </div>
                        <div className="p-4 bg-green-50 rounded-lg">
                          <div className="flex items-center gap-2">
                            <GraduationCap className="h-5 w-5 text-green-600" />
                            <span className="font-medium">Graduation</span>
                          </div>
                          <p className="text-2xl font-bold text-green-600">{currentProfile.graduationYear}</p>
                        </div>
                        <div className="p-4 bg-purple-50 rounded-lg">
                          <div className="flex items-center gap-2">
                            <Star className="h-5 w-5 text-purple-600" />
                            <span className="font-medium">GPA</span>
                          </div>
                          <p className="text-2xl font-bold text-purple-600">{(currentProfile as any).gpa || 'N/A'}</p>
                        </div>
                        <div className="p-4 bg-orange-50 rounded-lg">
                          <div className="flex items-center gap-2">
                            <TrendingUp className="h-5 w-5 text-orange-600" />
                            <span className="font-medium">Satisfaction</span>
                          </div>
                          <p className="text-2xl font-bold text-orange-600">{(currentProfile as any).currentYearPerformance?.clientSatisfaction || '4.8/5'}</p>
                        </div>
                      </>
                    ) : (
                      // Teacher/Admin stats
                      <>
                        <div className="p-4 bg-blue-50 rounded-lg">
                          <div className="flex items-center gap-2">
                            <Users className="h-5 w-5 text-blue-600" />
                            <span className="font-medium">Students</span>
                          </div>
                          <p className="text-2xl font-bold text-blue-600">{(currentProfile as any).totalStudents || 'N/A'}</p>
                        </div>
                        <div className="p-4 bg-purple-50 rounded-lg">
                          <div className="flex items-center gap-2">
                            <BookOpen className="h-5 w-5 text-purple-600" />
                            <span className="font-medium">Subjects</span>
                          </div>
                          <p className="text-2xl font-bold text-purple-600">{(currentProfile as any).subjects?.length || 0}</p>
                        </div>
                        <div className="p-4 bg-purple-50 rounded-lg">
                          <div className="flex items-center gap-2">
                            <Clock className="h-5 w-5 text-purple-600" />
                            <span className="font-medium">Experience</span>
                          </div>
                          <p className="text-2xl font-bold text-purple-600">{currentProfile.experience}</p>
                        </div>
                        <div className="p-4 bg-orange-50 rounded-lg">
                          <div className="flex items-center gap-2">
                            <Star className="h-5 w-5 text-orange-600" />
                            <span className="font-medium">Rating</span>
                          </div>
                          <p className="text-2xl font-bold text-orange-600">{(currentProfile as any).currentYearPerformance?.studentSatisfaction || '4.8/5'}</p>
                        </div>
                      </>
                    )}
                  </div>
                </div>

                {/* Contact Information */}
                <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{currentProfile.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{currentProfile.phone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{currentProfile.city}, {currentProfile.state}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">
                      {user?.role === 'alumni' ? `Graduated: ${(currentProfile as any).graduationDate}` : `Joined: ${currentProfile.joiningDate}`}
                    </span>
                  </div>
                </div>

                {/* Role-specific Information */}
                {user?.role === 'alumni' ? (
                  // Alumni-specific information
                  <div className="mt-6">
                    <h3 className="font-semibold mb-3">Alumni Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <h4 className="font-medium text-sm text-muted-foreground">Degree</h4>
                        <p className="text-sm mt-1">{(currentProfile as any).degree} in {(currentProfile as any).major}</p>
                      </div>
                      <div>
                        <h4 className="font-medium text-sm text-muted-foreground">Current Position</h4>
                        <p className="text-sm mt-1">{(currentProfile as any).position} at {(currentProfile as any).currentCompany}</p>
                      </div>
                      <div>
                        <h4 className="font-medium text-sm text-muted-foreground">Location</h4>
                        <p className="text-sm mt-1">{(currentProfile as any).location}</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  // Teaching Information for teachers/admins
                  <div className="mt-6">
                    <h3 className="font-semibold mb-3">Teaching Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <h4 className="font-medium text-sm text-muted-foreground">Subjects</h4>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {(currentProfile as any).subjects?.map((subject, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {subject}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h4 className="font-medium text-sm text-muted-foreground">Classes</h4>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {(currentProfile as any).classes?.map((cls, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {cls}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h4 className="font-medium text-sm text-muted-foreground">Specialization</h4>
                        <p className="text-sm mt-1">{(currentProfile as any).specialization}</p>
                      </div>
                    </div>
                  </div>
                )}

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
          
          <TabsContent value="career" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Briefcase className="h-5 w-5" />
                  {user?.role === 'alumni' ? 'Career Information' : 'Professional Information'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {editingProfile ? (
                  <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {user?.role === 'alumni' ? (
                      // Alumni career form fields
                      <>
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Alumni ID</label>
                          <Input name="alumniId" value={(currentProfile as any).alumniId} onChange={handleProfileChange} />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Graduation Year</label>
                          <Input name="graduationYear" value={currentProfile.graduationYear} onChange={handleProfileChange} />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Degree</label>
                          <Input name="degree" value={(currentProfile as any).degree} onChange={handleProfileChange} />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Major</label>
                          <Input name="major" value={(currentProfile as any).major} onChange={handleProfileChange} />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium">GPA</label>
                          <Input name="gpa" value={(currentProfile as any).gpa} onChange={handleProfileChange} />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Current Company</label>
                          <Input name="currentCompany" value={(currentProfile as any).currentCompany} onChange={handleProfileChange} />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Position</label>
                          <Input name="position" value={(currentProfile as any).position} onChange={handleProfileChange} />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Experience</label>
                          <Input name="experience" value={currentProfile.experience} onChange={handleProfileChange} />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Location</label>
                          <Input name="location" value={(currentProfile as any).location} onChange={handleProfileChange} />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Work Type</label>
                          <select name="workType" value={(currentProfile as any).workType} onChange={handleProfileChange} className="w-full p-2 border border-gray-300 rounded-md">
                            <option value="Full-time">Full-time</option>
                            <option value="Part-time">Part-time</option>
                            <option value="Contract">Contract</option>
                            <option value="Freelance">Freelance</option>
                            <option value="Self-employed">Self-employed</option>
                          </select>
                        </div>
                        <div className="space-y-2 md:col-span-2">
                          <label className="text-sm font-medium">Honors & Awards</label>
                          <Input name="honors" value={(currentProfile as any).honors} onChange={handleProfileChange} />
                        </div>
                      </>
                    ) : (
                      // Teacher professional form fields
                      <>
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Employee ID</label>
                          <Input name="employeeId" value={(currentProfile as any).employeeId} onChange={handleProfileChange} />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Department</label>
                          <Input name="department" value={(currentProfile as any).department} onChange={handleProfileChange} />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Designation</label>
                          <Input name="designation" value={(currentProfile as any).designation} onChange={handleProfileChange} />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Joining Date</label>
                          <Input name="joiningDate" value={(currentProfile as any).joiningDate} onChange={handleProfileChange} type="date" />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Experience</label>
                          <Input name="experience" value={currentProfile.experience} onChange={handleProfileChange} />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Qualification</label>
                          <Input name="qualification" value={(currentProfile as any).qualification} onChange={handleProfileChange} />
                        </div>
                        <div className="space-y-2 md:col-span-2">
                          <label className="text-sm font-medium">Specialization</label>
                          <Input name="specialization" value={(currentProfile as any).specialization} onChange={handleProfileChange} />
                        </div>
                        <div className="space-y-2 md:col-span-2">
                          <label className="text-sm font-medium">Subjects (comma separated)</label>
                          <Input name="subjects" value={(currentProfile as any).subjects?.join(', ') || ''} onChange={(e) => {
                            const subjects = e.target.value.split(',').map(s => s.trim());
                            currentProfileSetter({ ...currentProfile, subjects });
                          }} />
                        </div>
                        <div className="space-y-2 md:col-span-2">
                          <label className="text-sm font-medium">Classes (comma separated)</label>
                          <Input name="classes" value={(currentProfile as any).classes?.join(', ') || ''} onChange={(e) => {
                            const classes = e.target.value.split(',').map(c => c.trim());
                            currentProfileSetter({ ...currentProfile, classes });
                          }} />
                        </div>
                      </>
                    )}
                  </form>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {user?.role === 'alumni' ? (
                      // Alumni career display
                      <>
                        <div><span className="font-medium">Alumni ID:</span> {(currentProfile as any).alumniId}</div>
                        <div><span className="font-medium">Graduation Year:</span> {currentProfile.graduationYear}</div>
                        <div><span className="font-medium">Degree:</span> {(currentProfile as any).degree}</div>
                        <div><span className="font-medium">Major:</span> {(currentProfile as any).major}</div>
                        <div><span className="font-medium">GPA:</span> {(currentProfile as any).gpa || 'N/A'}</div>
                        <div><span className="font-medium">Current Company:</span> {(currentProfile as any).currentCompany}</div>
                        <div><span className="font-medium">Position:</span> {(currentProfile as any).position}</div>
                        <div><span className="font-medium">Experience:</span> {currentProfile.experience}</div>
                        <div><span className="font-medium">Location:</span> {(currentProfile as any).location}</div>
                        <div><span className="font-medium">Work Type:</span> {(currentProfile as any).workType}</div>
                        <div className="md:col-span-2">
                          <span className="font-medium">Honors & Awards:</span> {(currentProfile as any).honors || 'N/A'}
                        </div>
                      </>
                    ) : (
                      // Teacher professional display
                      <>
                        <div><span className="font-medium">Employee ID:</span> {(currentProfile as any).employeeId}</div>
                        <div><span className="font-medium">Department:</span> {(currentProfile as any).department}</div>
                        <div><span className="font-medium">Designation:</span> {(currentProfile as any).designation}</div>
                        <div><span className="font-medium">Joining Date:</span> {(currentProfile as any).joiningDate}</div>
                        <div><span className="font-medium">Experience:</span> {currentProfile.experience}</div>
                        <div><span className="font-medium">Qualification:</span> {(currentProfile as any).qualification}</div>
                        <div className="md:col-span-2"><span className="font-medium">Specialization:</span> {(currentProfile as any).specialization}</div>
                        <div className="md:col-span-2">
                          <span className="font-medium">Subjects:</span>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {(currentProfile as any).subjects?.map((subject, index) => (
                              <Badge key={index} variant="secondary">
                                {subject}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <div className="md:col-span-2">
                          <span className="font-medium">Classes:</span>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {(currentProfile as any).classes?.map((cls, index) => (
                              <Badge key={index} variant="outline">
                                {cls}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </>
                    )}
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
                    {editingProfile ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Qualification</label>
                          <Input 
                            name="highestQualification" 
                            value={currentProfile.highestQualification} 
                            onChange={handleProfileChange}
                            placeholder="e.g., Bachelor of Science in Computer Science"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium">University</label>
                          <Input 
                            name="university" 
                            value={currentProfile.university} 
                            onChange={handleProfileChange}
                            placeholder="e.g., University of Mumbai"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Graduation Year</label>
                          <Input 
                            name="graduationYear" 
                            value={currentProfile.graduationYear} 
                            onChange={handleProfileChange}
                            placeholder="e.g., 2020"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Thesis/Project</label>
                          <Input 
                            name="thesis" 
                            value={(currentProfile as any).thesis} 
                            onChange={handleProfileChange}
                            placeholder="e.g., Machine Learning Applications in Educational Technology"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Supervisor</label>
                          <Input 
                            name="supervisor" 
                            value={(currentProfile as any).supervisor} 
                            onChange={handleProfileChange}
                            placeholder="e.g., Dr. Amit Patel"
                          />
                        </div>
                      </div>
                    ) : (
                      <div className="bg-blue-50 p-4 rounded-lg">
                        <div className="font-semibold">{currentProfile.highestQualification}</div>
                        <div className="text-sm text-muted-foreground">{currentProfile.university} • {currentProfile.graduationYear}</div>
                        {(currentProfile as any).thesis && (
                          <div className="text-sm text-muted-foreground mt-1">Thesis: {(currentProfile as any).thesis}</div>
                        )}
                        {(currentProfile as any).supervisor && (
                          <div className="text-sm text-muted-foreground">Supervisor: {(currentProfile as any).supervisor}</div>
                        )}
                      </div>
                    )}
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-3">Previous Qualifications</h4>
                    {editingProfile ? (
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Previous Qualifications (one per line)</label>
                        <textarea 
                          name="previousQualifications" 
                          value={currentProfile.previousQualifications?.join('\n') || ''} 
                          onChange={(e) => {
                            const qualifications = e.target.value.split('\n').map(q => q.trim()).filter(q => q);
                            currentProfileSetter({ ...currentProfile, previousQualifications: qualifications });
                          }} 
                          className="w-full p-3 border border-gray-300 rounded-md min-h-[100px]"
                          placeholder="Higher Secondary - Veena Public School (2016) - 92%&#10;Secondary - Veena Public School (2014) - 88%"
                        />
                      </div>
                    ) : (
                      <div className="space-y-2">
                        {currentProfile.previousQualifications?.map((qual, index) => (
                          <div key={index} className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                            <GraduationCap className="h-4 w-4 text-blue-600" />
                            <span className="text-sm">{qual}</span>
                          </div>
                        ))}
                        {(!currentProfile.previousQualifications || currentProfile.previousQualifications.length === 0) && (
                          <div className="text-center text-muted-foreground py-4">
                            No previous qualifications recorded yet.
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-3">Previous Experience</h4>
                    {editingProfile ? (
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Previous Experience (one per line)</label>
                        <textarea 
                          name="previousExperience" 
                          value={currentProfile.previousExperience?.join('\n') || ''} 
                          onChange={(e) => {
                            const experience = e.target.value.split('\n').map(exp => exp.trim()).filter(exp => exp);
                            currentProfileSetter({ ...currentProfile, previousExperience: experience });
                          }} 
                          className="w-full p-3 border border-gray-300 rounded-md min-h-[100px]"
                          placeholder="Software Developer Intern - TechCorp (2019-2020)&#10;Freelance Web Developer - Various Clients (2018-2019)"
                        />
                      </div>
                    ) : (
                      <div className="space-y-2">
                        {currentProfile.previousExperience?.map((exp, index) => (
                          <div key={index} className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                            <Briefcase className="h-4 w-4 text-green-600" />
                            <span className="text-sm">{exp}</span>
                          </div>
                        ))}
                        {(!currentProfile.previousExperience || currentProfile.previousExperience.length === 0) && (
                          <div className="text-center text-muted-foreground py-4">
                            No previous experience recorded yet.
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="activities" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5" />
                  {user?.role === 'alumni' ? 'Alumni Activities & Achievements' : 'Research & Publications'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {user?.role === 'alumni' ? (
                  // Alumni activities content
                  <div className="space-y-6">
                    <div>
                      <h4 className="font-medium mb-3">Professional Skills</h4>
                      {editingProfile ? (
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Skills (comma separated)</label>
                          <Input 
                            name="skills" 
                            value={currentProfile.skills?.join(', ') || ''} 
                            onChange={(e) => {
                              const skills = e.target.value.split(',').map(s => s.trim()).filter(s => s);
                              currentProfileSetter({ ...currentProfile, skills });
                            }} 
                            placeholder="e.g., React, Node.js, Leadership, Teamwork"
                          />
                        </div>
                      ) : (
                        <div className="flex flex-wrap gap-2">
                          {currentProfile.skills?.map((skill, index) => (
                            <span key={index} className="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-medium">
                              {skill}
                            </span>
                          ))}
                          {(!currentProfile.skills || currentProfile.skills.length === 0) && (
                            <div className="text-center text-muted-foreground py-4">
                              No skills recorded yet.
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                    
                    <div>
                      <h4 className="font-medium mb-3">Alumni Achievements</h4>
                      {editingProfile ? (
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Achievements (one per line)</label>
                          <textarea 
                            name="achievements" 
                            value={currentProfile.achievements?.join('\n') || ''} 
                            onChange={(e) => {
                              const achievements = e.target.value.split('\n').map(a => a.trim()).filter(a => a);
                              currentProfileSetter({ ...currentProfile, achievements });
                            }} 
                            className="w-full p-3 border border-gray-300 rounded-md min-h-[100px]"
                            placeholder="Employee of the Year 2023 - Tech Solutions Inc.&#10;Led development of 5 major software projects (2021-2023)&#10;Mentored 10+ junior developers (2022-2023)"
                          />
                        </div>
                      ) : (
                        <div className="flex flex-wrap gap-2">
                          {currentProfile.achievements?.map((achievement, index) => (
                            <span key={index} className="inline-flex items-center px-3 py-1 rounded-full bg-yellow-100 text-yellow-800 text-xs font-medium">
                              {achievement}
                            </span>
                          ))}
                          {(!currentProfile.achievements || currentProfile.achievements.length === 0) && (
                            <div className="text-center text-muted-foreground py-4">
                              No achievements recorded yet.
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                    
                    <div>
                      <h4 className="font-medium mb-3">Certifications</h4>
                      {editingProfile ? (
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Certifications (one per line)</label>
                          <textarea 
                            name="certifications" 
                            value={currentProfile.certifications?.join('\n') || ''} 
                            onChange={(e) => {
                              const certifications = e.target.value.split('\n').map(c => c.trim()).filter(c => c);
                              currentProfileSetter({ ...currentProfile, certifications });
                            }} 
                            className="w-full p-3 border border-gray-300 rounded-md min-h-[100px]"
                            placeholder="AWS Certified Developer Associate (2023)&#10;Google Cloud Professional Developer (2023)&#10;Microsoft Azure Developer Associate (2023)"
                          />
                        </div>
                      ) : (
                        <div className="flex flex-wrap gap-2">
                          {currentProfile.certifications?.map((cert, index) => (
                            <span key={index} className="inline-flex items-center px-3 py-1 rounded-full bg-green-100 text-green-800 text-xs font-medium">
                              {cert}
                            </span>
                          ))}
                          {(!currentProfile.certifications || currentProfile.certifications.length === 0) && (
                            <div className="text-center text-muted-foreground py-4">
                              No certifications recorded yet.
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                ) : (
                  // Teacher research content
                  <div className="space-y-6">
                    <div>
                      <h4 className="font-medium mb-3">PhD Thesis</h4>
                      <div className="bg-blue-50 p-4 rounded-lg">
                        <div className="font-semibold">{currentProfile.phdThesis}</div>
                        <div className="text-sm text-muted-foreground">Supervisor: {currentProfile.supervisor}</div>
                        <div className="text-sm text-muted-foreground">{currentProfile.university} • {currentProfile.graduationYear}</div>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-medium mb-3">Research Papers</h4>
                      <div className="space-y-2">
                        {currentProfile.researchPapers?.map((paper, index) => (
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
                            {currentProfile.skills?.map((skill, index) => (
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
                            {currentProfile.certifications?.map((cert, index) => (
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
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="personal-details" className="space-y-6">
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
                      <label className="text-sm font-medium">Father's Name</label>
                      <Input name="fatherName" value={(currentProfile as any).fatherName || ''} onChange={handleProfileChange} />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Father's Occupation</label>
                      <Input name="fatherOccupation" value={(currentProfile as any).fatherOccupation || ''} onChange={handleProfileChange} />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Father's Phone</label>
                      <Input name="fatherPhone" value={(currentProfile as any).fatherPhone || ''} onChange={handleProfileChange} />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Father's Email</label>
                      <Input name="fatherEmail" value={(currentProfile as any).fatherEmail || ''} onChange={handleProfileChange} type="email" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Mother's Name</label>
                      <Input name="motherName" value={(currentProfile as any).motherName || ''} onChange={handleProfileChange} />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Mother's Occupation</label>
                      <Input name="motherOccupation" value={(currentProfile as any).motherOccupation || ''} onChange={handleProfileChange} />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Mother's Phone</label>
                      <Input name="motherPhone" value={(currentProfile as any).motherPhone || ''} onChange={handleProfileChange} />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Mother's Email</label>
                      <Input name="motherEmail" value={(currentProfile as any).motherEmail || ''} onChange={handleProfileChange} type="email" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Guardian's Name</label>
                      <Input name="guardianName" value={(currentProfile as any).guardianName || ''} onChange={handleProfileChange} />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Guardian's Phone</label>
                      <Input name="guardianPhone" value={(currentProfile as any).guardianPhone || ''} onChange={handleProfileChange} />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Guardian's Email</label>
                      <Input name="guardianEmail" value={(currentProfile as any).guardianEmail || ''} onChange={handleProfileChange} type="email" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Guardian's Relationship</label>
                      <Input name="guardianRelationship" value={(currentProfile as any).guardianRelationship || ''} onChange={handleProfileChange} />
                    </div>
                  </form>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div><span className="font-medium">Father's Name:</span> {(currentProfile as any).fatherName || 'Not specified'}</div>
                    <div><span className="font-medium">Father's Occupation:</span> {(currentProfile as any).fatherOccupation || 'Not specified'}</div>
                    <div><span className="font-medium">Father's Phone:</span> {(currentProfile as any).fatherPhone || 'Not specified'}</div>
                    <div><span className="font-medium">Father's Email:</span> {(currentProfile as any).fatherEmail || 'Not specified'}</div>
                    <div><span className="font-medium">Mother's Name:</span> {(currentProfile as any).motherName || 'Not specified'}</div>
                    <div><span className="font-medium">Mother's Occupation:</span> {(currentProfile as any).motherOccupation || 'Not specified'}</div>
                    <div><span className="font-medium">Mother's Phone:</span> {(currentProfile as any).motherPhone || 'Not specified'}</div>
                    <div><span className="font-medium">Mother's Email:</span> {(currentProfile as any).motherEmail || 'Not specified'}</div>
                    <div><span className="font-medium">Guardian's Name:</span> {(currentProfile as any).guardianName || 'Not specified'}</div>
                    <div><span className="font-medium">Guardian's Phone:</span> {(currentProfile as any).guardianPhone || 'Not specified'}</div>
                    <div><span className="font-medium">Guardian's Email:</span> {(currentProfile as any).guardianEmail || 'Not specified'}</div>
                    <div><span className="font-medium">Guardian's Relationship:</span> {(currentProfile as any).guardianRelationship || 'Not specified'}</div>
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
                      <label className="text-sm font-medium">Emergency Contact 1</label>
                      <Input name="emergencyContact1" value={(currentProfile as any).emergencyContact1 || ''} onChange={handleProfileChange} />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Emergency Phone 1</label>
                      <Input name="emergencyPhone1" value={(currentProfile as any).emergencyPhone1 || ''} onChange={handleProfileChange} />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Emergency Relationship 1</label>
                      <Input name="emergencyRelationship1" value={(currentProfile as any).emergencyRelationship1 || ''} onChange={handleProfileChange} />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Emergency Contact 2</label>
                      <Input name="emergencyContact2" value={(currentProfile as any).emergencyContact2 || ''} onChange={handleProfileChange} />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Emergency Phone 2</label>
                      <Input name="emergencyPhone2" value={(currentProfile as any).emergencyPhone2 || ''} onChange={handleProfileChange} />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Emergency Relationship 2</label>
                      <Input name="emergencyRelationship2" value={(currentProfile as any).emergencyRelationship2 || ''} onChange={handleProfileChange} />
                    </div>
                  </form>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div><span className="font-medium">Emergency Contact 1:</span> {(currentProfile as any).emergencyContact1 || 'Not specified'}</div>
                    <div><span className="font-medium">Emergency Phone 1:</span> {(currentProfile as any).emergencyPhone1 || 'Not specified'}</div>
                    <div><span className="font-medium">Emergency Relationship 1:</span> {(currentProfile as any).emergencyRelationship1 || 'Not specified'}</div>
                    <div><span className="font-medium">Emergency Contact 2:</span> {(currentProfile as any).emergencyContact2 || 'Not specified'}</div>
                    <div><span className="font-medium">Emergency Phone 2:</span> {(currentProfile as any).emergencyPhone2 || 'Not specified'}</div>
                    <div><span className="font-medium">Emergency Relationship 2:</span> {(currentProfile as any).emergencyRelationship2 || 'Not specified'}</div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Additional Personal Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Additional Personal Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                {editingProfile ? (
                  <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Date of Birth</label>
                      <Input name="dateOfBirth" value={currentProfile.dateOfBirth} onChange={handleProfileChange} type="date" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Age</label>
                      <Input name="age" value={currentProfile.age} onChange={handleProfileChange} />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Gender</label>
                      <select name="gender" value={currentProfile.gender} onChange={handleProfileChange} className="w-full p-2 border border-gray-300 rounded-md">
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Blood Group</label>
                      <Input name="bloodGroup" value={currentProfile.bloodGroup} onChange={handleProfileChange} />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Nationality</label>
                      <Input name="nationality" value={currentProfile.nationality} onChange={handleProfileChange} />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Religion</label>
                      <Input name="religion" value={currentProfile.religion} onChange={handleProfileChange} />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Marital Status</label>
                      <select name="maritalStatus" value={currentProfile.maritalStatus} onChange={handleProfileChange} className="w-full p-2 border border-gray-300 rounded-md">
                        <option value="Single">Single</option>
                        <option value="Married">Married</option>
                        <option value="Divorced">Divorced</option>
                        <option value="Widowed">Widowed</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Spouse Name</label>
                      <Input name="spouseName" value={(currentProfile as any).spouseName || ''} onChange={handleProfileChange} />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Spouse Occupation</label>
                      <Input name="spouseOccupation" value={(currentProfile as any).spouseOccupation || ''} onChange={handleProfileChange} />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Spouse Phone</label>
                      <Input name="spousePhone" value={(currentProfile as any).spousePhone || ''} onChange={handleProfileChange} />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Number of Children</label>
                      <Input name="numberOfChildren" value={(currentProfile as any).numberOfChildren || ''} onChange={handleProfileChange} type="number" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Hobbies & Interests</label>
                      <Input name="hobbies" value={(currentProfile as any).hobbies || ''} onChange={handleProfileChange} placeholder="e.g., Reading, Traveling, Photography" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Languages Known</label>
                      <Input name="languages" value={(currentProfile as any).languages || ''} onChange={handleProfileChange} placeholder="e.g., English, Hindi, Marathi" />
                    </div>
                  </form>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div><span className="font-medium">Date of Birth:</span> {currentProfile.dateOfBirth}</div>
                    <div><span className="font-medium">Age:</span> {currentProfile.age}</div>
                    <div><span className="font-medium">Gender:</span> {currentProfile.gender}</div>
                    <div><span className="font-medium">Blood Group:</span> {currentProfile.bloodGroup}</div>
                    <div><span className="font-medium">Nationality:</span> {currentProfile.nationality}</div>
                    <div><span className="font-medium">Religion:</span> {currentProfile.religion}</div>
                    <div><span className="font-medium">Marital Status:</span> {currentProfile.maritalStatus}</div>
                    <div><span className="font-medium">Spouse Name:</span> {(currentProfile as any).spouseName || 'Not specified'}</div>
                    <div><span className="font-medium">Spouse Occupation:</span> {(currentProfile as any).spouseOccupation || 'Not specified'}</div>
                    <div><span className="font-medium">Spouse Phone:</span> {(currentProfile as any).spousePhone || 'Not specified'}</div>
                    <div><span className="font-medium">Number of Children:</span> {(currentProfile as any).numberOfChildren || 'Not specified'}</div>
                    <div><span className="font-medium">Hobbies & Interests:</span> {(currentProfile as any).hobbies || 'Not specified'}</div>
                    <div><span className="font-medium">Languages Known:</span> {(currentProfile as any).languages || 'Not specified'}</div>
                  </div>
                )}
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
                    <p className="text-2xl font-bold text-blue-600">{(currentProfile as any).currentYearPerformance?.averageAttendance || 'N/A'}</p>
                  </div>
                  <div className="p-4 bg-green-50 rounded-lg">
                    <div className="flex items-center gap-2">
                      <Star className="h-5 w-5 text-green-600" />
                      <span className="font-medium">Satisfaction</span>
                    </div>
                    <p className="text-2xl font-bold text-green-600">{(currentProfile as any).currentYearPerformance?.studentSatisfaction || 'N/A'}</p>
                  </div>
                  <div className="p-4 bg-purple-50 rounded-lg">
                    <div className="flex items-center gap-2">
                      <Target className="h-5 w-5 text-purple-600" />
                      <span className="font-medium">Completion</span>
                    </div>
                    <p className="text-2xl font-bold text-purple-600">{(currentProfile as any).currentYearPerformance?.completionRate || 'N/A'}</p>
                  </div>
                  <div className="p-4 bg-orange-50 rounded-lg">
                    <div className="flex items-center gap-2">
                      <Trophy className="h-5 w-5 text-orange-600" />
                      <span className="font-medium">Avg Score</span>
                    </div>
                    <p className="text-2xl font-bold text-orange-600">{(currentProfile as any).currentYearPerformance?.averageScore || 'N/A'}</p>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-3">Achievements</h4>
                  <div className="space-y-2">
                    {currentProfile.achievements?.map((achievement, index) => (
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
                      <Input name="name" value={currentProfile.name} onChange={handleProfileChange} required />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Email</label>
                      <Input name="email" value={currentProfile.email} onChange={handleProfileChange} type="email" required />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Phone Number</label>
                      <Input name="phone" value={currentProfile.phone} onChange={handleProfileChange} />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Alternate Phone</label>
                      <Input name="alternatePhone" value={currentProfile.alternatePhone} onChange={handleProfileChange} />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">WhatsApp Number</label>
                      <Input name="whatsappNumber" value={currentProfile.whatsappNumber} onChange={handleProfileChange} />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Date of Birth</label>
                      <Input name="dateOfBirth" value={currentProfile.dateOfBirth} onChange={handleProfileChange} type="date" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Gender</label>
                      <select name="gender" value={currentProfile.gender} onChange={handleProfileChange} className="w-full p-2 border border-gray-300 rounded-md">
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Blood Group</label>
                      <Input name="bloodGroup" value={currentProfile.bloodGroup} onChange={handleProfileChange} />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Nationality</label>
                      <Input name="nationality" value={currentProfile.nationality} onChange={handleProfileChange} />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Religion</label>
                      <Input name="religion" value={currentProfile.religion} onChange={handleProfileChange} />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Marital Status</label>
                      <select name="maritalStatus" value={currentProfile.maritalStatus} onChange={handleProfileChange} className="w-full p-2 border border-gray-300 rounded-md">
                        <option value="Single">Single</option>
                        <option value="Married">Married</option>
                        <option value="Divorced">Divorced</option>
                        <option value="Widowed">Widowed</option>
                      </select>
                    </div>
                  </form>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div><span className="font-medium">Full Name:</span> {currentProfile.name}</div>
                    <div><span className="font-medium">Email:</span> {currentProfile.email}</div>
                    <div><span className="font-medium">Phone:</span> {currentProfile.phone}</div>
                    <div><span className="font-medium">Alternate Phone:</span> {currentProfile.alternatePhone}</div>
                    <div><span className="font-medium">WhatsApp:</span> {currentProfile.whatsappNumber}</div>
                    <div><span className="font-medium">Date of Birth:</span> {currentProfile.dateOfBirth}</div>
                    <div><span className="font-medium">Age:</span> {currentProfile.age}</div>
                    <div><span className="font-medium">Gender:</span> {currentProfile.gender}</div>
                    <div><span className="font-medium">Blood Group:</span> {currentProfile.bloodGroup}</div>
                    <div><span className="font-medium">Nationality:</span> {currentProfile.nationality}</div>
                    <div><span className="font-medium">Religion:</span> {currentProfile.religion}</div>
                    <div><span className="font-medium">Marital Status:</span> {currentProfile.maritalStatus}</div>
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
                      <Input name="spouseName" value={currentProfile.spouseName} onChange={handleProfileChange} />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Spouse Occupation</label>
                      <Input name="spouseOccupation" value={currentProfile.spouseOccupation} onChange={handleProfileChange} />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Spouse Phone</label>
                      <Input name="spousePhone" value={currentProfile.spousePhone} onChange={handleProfileChange} />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Father's Name</label>
                      <Input name="fatherName" value={currentProfile.fatherName} onChange={handleProfileChange} />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Father's Occupation</label>
                      <Input name="fatherOccupation" value={currentProfile.fatherOccupation} onChange={handleProfileChange} />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Father's Phone</label>
                      <Input name="fatherPhone" value={currentProfile.fatherPhone} onChange={handleProfileChange} />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Mother's Name</label>
                      <Input name="motherName" value={currentProfile.motherName} onChange={handleProfileChange} />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Mother's Occupation</label>
                      <Input name="motherOccupation" value={currentProfile.motherOccupation} onChange={handleProfileChange} />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Mother's Phone</label>
                      <Input name="motherPhone" value={currentProfile.motherPhone} onChange={handleProfileChange} />
                    </div>
                  </form>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div><span className="font-medium">Spouse Name:</span> {currentProfile.spouseName}</div>
                    <div><span className="font-medium">Spouse Occupation:</span> {currentProfile.spouseOccupation}</div>
                    <div><span className="font-medium">Spouse Phone:</span> {currentProfile.spousePhone}</div>
                    <div><span className="font-medium">Father's Name:</span> {currentProfile.fatherName}</div>
                    <div><span className="font-medium">Father's Occupation:</span> {currentProfile.fatherOccupation}</div>
                    <div><span className="font-medium">Father's Phone:</span> {currentProfile.fatherPhone}</div>
                    <div><span className="font-medium">Mother's Name:</span> {currentProfile.motherName}</div>
                    <div><span className="font-medium">Mother's Occupation:</span> {currentProfile.motherOccupation}</div>
                    <div><span className="font-medium">Mother's Phone:</span> {currentProfile.motherPhone}</div>
                    <div className="md:col-span-2">
                      <span className="font-medium">Children:</span>
                      <div className="mt-2 space-y-1">
                        {currentProfile.children?.map((child, index) => (
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
                      <Input name="emergencyContact" value={currentProfile.emergencyContact} onChange={handleProfileChange} />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Primary Emergency Relation</label>
                      <Input name="emergencyRelation" value={currentProfile.emergencyRelation} onChange={handleProfileChange} />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Secondary Emergency Contact</label>
                      <Input name="emergencyContact2" value={currentProfile.emergencyContact2} onChange={handleProfileChange} />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Secondary Emergency Relation</label>
                      <Input name="emergencyRelation2" value={currentProfile.emergencyRelation2} onChange={handleProfileChange} />
                    </div>
                  </form>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div><span className="font-medium">Primary Emergency:</span> {currentProfile.emergencyContact} ({currentProfile.emergencyRelation})</div>
                    <div><span className="font-medium">Secondary Emergency:</span> {currentProfile.emergencyContact2} ({currentProfile.emergencyRelation2})</div>
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
                      <Input name="currentAddress" value={currentProfile.currentAddress} onChange={handleProfileChange} />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <label className="text-sm font-medium">Permanent Address</label>
                      <Input name="permanentAddress" value={currentProfile.permanentAddress} onChange={handleProfileChange} />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">City</label>
                      <Input name="city" value={currentProfile.city} onChange={handleProfileChange} />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">State</label>
                      <Input name="state" value={currentProfile.state} onChange={handleProfileChange} />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Pincode</label>
                      <Input name="pincode" value={currentProfile.pincode} onChange={handleProfileChange} />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Country</label>
                      <Input name="country" value={currentProfile.country} onChange={handleProfileChange} />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Address Type</label>
                      <select name="addressType" value={currentProfile.addressType} onChange={handleProfileChange} className="w-full p-2 border border-gray-300 rounded-md">
                        <option value="Owned">Owned</option>
                        <option value="Rented">Rented</option>
                        <option value="Leased">Leased</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Years at Current Address</label>
                      <Input name="yearsAtCurrentAddress" value={currentProfile.yearsAtCurrentAddress} onChange={handleProfileChange} />
                    </div>
                  </form>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="md:col-span-2"><span className="font-medium">Current Address:</span> {currentProfile.currentAddress}</div>
                    <div className="md:col-span-2"><span className="font-medium">Permanent Address:</span> {currentProfile.permanentAddress}</div>
                    <div><span className="font-medium">City:</span> {currentProfile.city}</div>
                    <div><span className="font-medium">State:</span> {currentProfile.state}</div>
                    <div><span className="font-medium">Pincode:</span> {currentProfile.pincode}</div>
                    <div><span className="font-medium">Country:</span> {currentProfile.country}</div>
                    <div><span className="font-medium">Address Type:</span> {currentProfile.addressType}</div>
                    <div><span className="font-medium">Years at Current Address:</span> {currentProfile.yearsAtCurrentAddress}</div>
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
                      <Input name="linkedinProfile" value={currentProfile.linkedinProfile} onChange={handleProfileChange} />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">ResearchGate Profile</label>
                      <Input name="researchGateProfile" value={currentProfile.researchGateProfile} onChange={handleProfileChange} />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Google Scholar Profile</label>
                      <Input name="googleScholarProfile" value={currentProfile.googleScholarProfile} onChange={handleProfileChange} />
                    </div>
                  </form>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div><span className="font-medium">LinkedIn:</span> <a href={`https://${currentProfile.linkedinProfile}`} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">{currentProfile.linkedinProfile}</a></div>
                    <div><span className="font-medium">ResearchGate:</span> <a href={`https://${currentProfile.researchGateProfile}`} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">{currentProfile.researchGateProfile}</a></div>
                    <div><span className="font-medium">Google Scholar:</span> <a href={`https://${currentProfile.googleScholarProfile}`} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">{currentProfile.googleScholarProfile}</a></div>
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
                      <Input name="healthInfo.bloodPressure" value={currentProfile.healthInfo.bloodPressure} onChange={handleProfileChange} />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Diabetes</label>
                      <select name="healthInfo.diabetes" value={currentProfile.healthInfo.diabetes} onChange={handleProfileChange} className="w-full p-2 border border-gray-300 rounded-md">
                        <option value="No">No</option>
                        <option value="Yes">Yes</option>
                        <option value="Pre-diabetic">Pre-diabetic</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Allergies</label>
                      <Input name="healthInfo.allergies" value={currentProfile.healthInfo.allergies} onChange={handleProfileChange} />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Last Medical Checkup</label>
                      <Input name="healthInfo.lastMedicalCheckup" value={currentProfile.healthInfo.lastMedicalCheckup} onChange={handleProfileChange} type="date" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Next Medical Checkup</label>
                      <Input name="healthInfo.nextMedicalCheckup" value={currentProfile.healthInfo.nextMedicalCheckup} onChange={handleProfileChange} type="date" />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <label className="text-sm font-medium">Emergency Medical Information</label>
                      <Input name="healthInfo.emergencyMedicalInfo" value={currentProfile.healthInfo.emergencyMedicalInfo} onChange={handleProfileChange} />
                    </div>
                  </form>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div><span className="font-medium">Blood Pressure:</span> {currentProfile.healthInfo.bloodPressure}</div>
                    <div><span className="font-medium">Diabetes:</span> {currentProfile.healthInfo.diabetes}</div>
                    <div><span className="font-medium">Allergies:</span> {currentProfile.healthInfo.allergies}</div>
                    <div><span className="font-medium">Last Medical Checkup:</span> {currentProfile.healthInfo.lastMedicalCheckup}</div>
                    <div><span className="font-medium">Next Medical Checkup:</span> {currentProfile.healthInfo.nextMedicalCheckup}</div>
                    <div className="md:col-span-2"><span className="font-medium">Emergency Medical Info:</span> {currentProfile.healthInfo.emergencyMedicalInfo}</div>
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
                      <Input name="workSchedule.workingDays" value={currentProfile.workSchedule.workingDays} onChange={handleProfileChange} />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Working Hours</label>
                      <Input name="workSchedule.workingHours" value={currentProfile.workSchedule.workingHours} onChange={handleProfileChange} />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Office Hours</label>
                      <Input name="workSchedule.officeHours" value={currentProfile.workSchedule.officeHours} onChange={handleProfileChange} />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Lunch Break</label>
                      <Input name="workSchedule.lunchBreak" value={currentProfile.workSchedule.lunchBreak} onChange={handleProfileChange} />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Extra Classes</label>
                      <Input name="workSchedule.extraClasses" value={currentProfile.workSchedule.extraClasses} onChange={handleProfileChange} />
                    </div>
                  </form>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div><span className="font-medium">Working Days:</span> {currentProfile.workSchedule.workingDays}</div>
                    <div><span className="font-medium">Working Hours:</span> {currentProfile.workSchedule.workingHours}</div>
                    <div><span className="font-medium">Office Hours:</span> {currentProfile.workSchedule.officeHours}</div>
                    <div><span className="font-medium">Lunch Break:</span> {currentProfile.workSchedule.lunchBreak}</div>
                    <div><span className="font-medium">Extra Classes:</span> {currentProfile.workSchedule.extraClasses}</div>
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
                    <Badge variant={currentProfile.resume === 'uploaded' ? 'default' : 'secondary'}>
                      {currentProfile.resume === 'uploaded' ? 'Uploaded' : 'Pending'}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-2">
                      <Award className="h-4 w-4 text-green-600" />
                      <span>Educational Certificates</span>
                    </div>
                    <Badge variant={currentProfile.educationalCertificates === 'uploaded' ? 'default' : 'secondary'}>
                      {currentProfile.educationalCertificates === 'uploaded' ? 'Uploaded' : 'Pending'}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-2">
                      <Briefcase className="h-4 w-4 text-purple-600" />
                      <span>Experience Certificates</span>
                    </div>
                    <Badge variant={currentProfile.experienceCertificates === 'uploaded' ? 'default' : 'secondary'}>
                      {currentProfile.experienceCertificates === 'uploaded' ? 'Uploaded' : 'Pending'}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-2">
                      <Shield className="h-4 w-4 text-orange-600" />
                      <span>ID Proof</span>
                    </div>
                    <Badge variant={currentProfile.idProof === 'uploaded' ? 'default' : 'secondary'}>
                      {currentProfile.idProof === 'uploaded' ? 'Uploaded' : 'Pending'}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-2">
                      <MapPinIcon className="h-4 w-4 text-red-600" />
                      <span>Address Proof</span>
                    </div>
                    <Badge variant={currentProfile.addressProof === 'uploaded' ? 'default' : 'secondary'}>
                      {currentProfile.addressProof === 'uploaded' ? 'Uploaded' : 'Pending'}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-2">
                      <Shield className="h-4 w-4 text-indigo-600" />
                      <span>Police Verification</span>
                    </div>
                    <Badge variant={currentProfile.policeVerification === 'uploaded' ? 'default' : 'secondary'}>
                      {currentProfile.policeVerification === 'uploaded' ? 'Uploaded' : 'Pending'}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-2">
                      <Heart className="h-4 w-4 text-pink-600" />
                      <span>Medical Certificate</span>
                    </div>
                    <Badge variant={currentProfile.medicalCertificate === 'uploaded' ? 'default' : 'secondary'}>
                      {currentProfile.medicalCertificate === 'uploaded' ? 'Uploaded' : 'Pending'}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-2">
                      <CreditCard className="h-4 w-4 text-emerald-600" />
                      <span>Bank Passbook</span>
                    </div>
                    <Badge variant={currentProfile.bankPassbook === 'uploaded' ? 'default' : 'secondary'}>
                      {currentProfile.bankPassbook === 'uploaded' ? 'Uploaded' : 'Pending'}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-2">
                      <CreditCard className="h-4 w-4 text-amber-600" />
                      <span>PAN Card</span>
                    </div>
                    <Badge variant={currentProfile.panCard === 'uploaded' ? 'default' : 'secondary'}>
                      {currentProfile.panCard === 'uploaded' ? 'Uploaded' : 'Pending'}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-2">
                      <CreditCard className="h-4 w-4 text-cyan-600" />
                      <span>Aadhar Card</span>
                    </div>
                    <Badge variant={currentProfile.aadharCard === 'uploaded' ? 'default' : 'secondary'}>
                      {currentProfile.aadharCard === 'uploaded' ? 'Uploaded' : 'Pending'}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-2">
                      <Globe className="h-4 w-4 text-violet-600" />
                      <span>Passport</span>
                    </div>
                    <Badge variant={currentProfile.passport === 'uploaded' ? 'default' : 'secondary'}>
                      {currentProfile.passport === 'uploaded' ? 'Uploaded' : 'Pending'}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-2">
                      <Heart className="h-4 w-4 text-rose-600" />
                      <span>Marriage Certificate</span>
                    </div>
                    <Badge variant={currentProfile.marriageCertificate === 'uploaded' ? 'default' : 'secondary'}>
                      {currentProfile.marriageCertificate === 'uploaded' ? 'Uploaded' : 'Pending'}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-teal-600" />
                      <span>Children Birth Certificates</span>
                    </div>
                    <Badge variant={currentProfile.childrenBirthCertificates === 'uploaded' ? 'default' : 'secondary'}>
                      {currentProfile.childrenBirthCertificates === 'uploaded' ? 'Uploaded' : 'Pending'}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-2">
                      <BookOpen className="h-4 w-4 text-lime-600" />
                      <span>Research Publications</span>
                    </div>
                    <Badge variant={currentProfile.researchPublications === 'uploaded' ? 'default' : 'secondary'}>
                      {currentProfile.researchPublications === 'uploaded' ? 'Uploaded' : 'Pending'}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-2">
                      <Trophy className="h-4 w-4 text-yellow-600" />
                      <span>Awards Certificates</span>
                    </div>
                    <Badge variant={currentProfile.awardsCertificates === 'uploaded' ? 'default' : 'secondary'}>
                      {currentProfile.awardsCertificates === 'uploaded' ? 'Uploaded' : 'Pending'}
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
