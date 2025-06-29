import React, { useState } from 'react';
import DashboardLayout from '@/frontend/components/layout/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { 
  Shield, 
  Bell, 
  BookOpen, 
  Download,
  FileText,
  Users,
  Settings,
  Clock,
  Target,
  Award,
  Calendar,
  MessageSquare,
  Eye,
  EyeOff,
  Lock,
  Globe,
  Mail,
  Phone,
  Building,
  GraduationCap,
  Briefcase,
  Star,
  AlertTriangle,
  CheckCircle,
  X,
  Plus,
  Edit,
  Trash2,
  Save,
  Upload,
  Palette,
  Languages,
  Monitor,
  Smartphone,
  Tablet
} from 'lucide-react';

const SettingsPage = () => {
  // Teaching Settings state
  const [teachingSettings, setTeachingSettings] = useState({
    autoGradeAssignments: true,
    showStudentProgress: true,
    allowLateSubmissions: false,
    enablePeerReview: true,
    showAttendanceToStudents: true,
    enableDiscussionForums: true,
    allowStudentQuestions: true,
    autoScheduleReminders: true,
    enableGroupWork: true,
    showGradeDistribution: false,
  });
  const [teachingSaved, setTeachingSaved] = useState(false);

  // Classroom Settings state
  const [classroomSettings, setClassroomSettings] = useState({
    maxStudentsPerGroup: 4,
    defaultAssignmentDuration: 7,
    gradingScale: 'percentage',
    attendanceMethod: 'manual',
    allowAbsenceNotes: true,
    enableParentCommunication: true,
    showClassAverage: true,
    enableStudentFeedback: true,
    autoArchiveOldAssignments: true,
    enableClassAnnouncements: true,
  });
  const [classroomSaved, setClassroomSaved] = useState(false);

  // Notification state
  const [notifications, setNotifications] = useState({
    email: true,
    sms: false,
    inApp: true,
    assignmentSubmissions: true,
    studentQuestions: true,
    attendanceAlerts: true,
    gradeUpdates: true,
    parentMessages: true,
    adminAnnouncements: true,
    professionalDevelopment: true,
    meetingReminders: true,
    deadlineReminders: true,
  });
  const [notifSaved, setNotifSaved] = useState(false);

  // Professional Development state
  const [professionalSettings, setProfessionalSettings] = useState({
    autoEnrollWorkshops: false,
    showTrainingOpportunities: true,
    enableMentorship: true,
    allowResearchTime: true,
    enableConferenceAttendance: true,
    showCareerAdvancement: true,
    enablePeerCollaboration: true,
    allowPublicationSupport: true,
  });
  const [professionalSaved, setProfessionalSaved] = useState(false);

  // Appearance state
  const [appearanceSettings, setAppearanceSettings] = useState({
    theme: 'light',
    fontSize: 'medium',
    colorScheme: 'blue',
    compactMode: false,
    showAnimations: true,
    highContrast: false,
  });
  const [appearanceSaved, setAppearanceSaved] = useState(false);

  // Password state
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordChanged, setPasswordChanged] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Privacy state
  const [profilePublic, setProfilePublic] = useState(false);
  const [showContactInfo, setShowContactInfo] = useState(true);
  const [allowStudentContact, setAllowStudentContact] = useState(true);
  const [allowParentContact, setAllowParentContact] = useState(true);

  // Handlers
  const handlePasswordChange = (e) => {
    e.preventDefault();
    if (newPassword && newPassword === confirmPassword) {
      setPasswordChanged(true);
      setCurrentPassword(''); 
      setNewPassword(''); 
      setConfirmPassword('');
      setTimeout(() => setPasswordChanged(false), 3000);
    }
  };
  
  const handleTeachingSave = () => {
    setTeachingSaved(true);
    setTimeout(() => setTeachingSaved(false), 3000);
  };
  
  const handleClassroomSave = () => {
    setClassroomSaved(true);
    setTimeout(() => setClassroomSaved(false), 3000);
  };
  
  const handleNotifSave = () => {
    setNotifSaved(true);
    setTimeout(() => setNotifSaved(false), 3000);
  };

  const handleProfessionalSave = () => {
    setProfessionalSaved(true);
    setTimeout(() => setProfessionalSaved(false), 3000);
  };

  const handleAppearanceSave = () => {
    setAppearanceSaved(true);
    setTimeout(() => setAppearanceSaved(false), 3000);
  };

  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold tracking-tight mb-2">Teacher Settings</h1>
          <p className="text-muted-foreground">Manage your teaching preferences, classroom settings, and professional development options.</p>
        </div>

        <Tabs defaultValue="teaching" className="w-full">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="teaching">Teaching</TabsTrigger>
            <TabsTrigger value="classroom">Classroom</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="professional">Professional</TabsTrigger>
            <TabsTrigger value="appearance">Appearance</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
          </TabsList>
          
          <TabsContent value="teaching" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5" />
                  Teaching Preferences
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Auto-Grade Assignments</p>
                      <p className="text-sm text-muted-foreground">Automatically grade multiple choice and numerical questions</p>
                    </div>
                    <Switch checked={teachingSettings.autoGradeAssignments} onCheckedChange={v => setTeachingSettings(s => ({ ...s, autoGradeAssignments: v }))} />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Show Student Progress</p>
                      <p className="text-sm text-muted-foreground">Display individual student progress and analytics</p>
                    </div>
                    <Switch checked={teachingSettings.showStudentProgress} onCheckedChange={v => setTeachingSettings(s => ({ ...s, showStudentProgress: v }))} />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Allow Late Submissions</p>
                      <p className="text-sm text-muted-foreground">Accept assignments after the due date with penalty</p>
                    </div>
                    <Switch checked={teachingSettings.allowLateSubmissions} onCheckedChange={v => setTeachingSettings(s => ({ ...s, allowLateSubmissions: v }))} />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Enable Peer Review</p>
                      <p className="text-sm text-muted-foreground">Allow students to review each other's work</p>
                    </div>
                    <Switch checked={teachingSettings.enablePeerReview} onCheckedChange={v => setTeachingSettings(s => ({ ...s, enablePeerReview: v }))} />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Show Attendance to Students</p>
                      <p className="text-sm text-muted-foreground">Allow students to view their attendance records</p>
                    </div>
                    <Switch checked={teachingSettings.showAttendanceToStudents} onCheckedChange={v => setTeachingSettings(s => ({ ...s, showAttendanceToStudents: v }))} />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Enable Discussion Forums</p>
                      <p className="text-sm text-muted-foreground">Create and manage class discussion forums</p>
                    </div>
                    <Switch checked={teachingSettings.enableDiscussionForums} onCheckedChange={v => setTeachingSettings(s => ({ ...s, enableDiscussionForums: v }))} />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Allow Student Questions</p>
                      <p className="text-sm text-muted-foreground">Students can ask questions during class</p>
                    </div>
                    <Switch checked={teachingSettings.allowStudentQuestions} onCheckedChange={v => setTeachingSettings(s => ({ ...s, allowStudentQuestions: v }))} />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Auto Schedule Reminders</p>
                      <p className="text-sm text-muted-foreground">Automatically send reminders for upcoming deadlines</p>
                    </div>
                    <Switch checked={teachingSettings.autoScheduleReminders} onCheckedChange={v => setTeachingSettings(s => ({ ...s, autoScheduleReminders: v }))} />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Enable Group Work</p>
                      <p className="text-sm text-muted-foreground">Allow students to work in groups on assignments</p>
                    </div>
                    <Switch checked={teachingSettings.enableGroupWork} onCheckedChange={v => setTeachingSettings(s => ({ ...s, enableGroupWork: v }))} />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Show Grade Distribution</p>
                      <p className="text-sm text-muted-foreground">Display class grade distribution to students</p>
                    </div>
                    <Switch checked={teachingSettings.showGradeDistribution} onCheckedChange={v => setTeachingSettings(s => ({ ...s, showGradeDistribution: v }))} />
                  </div>
                  <Button onClick={handleTeachingSave} className="mt-4">
                    <Save className="h-4 w-4 mr-2" />
                    Save Teaching Settings
                  </Button>
                  {teachingSaved && <div className="text-green-600 text-sm mt-2 flex items-center gap-2"><CheckCircle className="h-4 w-4" /> Teaching settings saved!</div>}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="classroom" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Classroom Settings
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium">Max Students Per Group</label>
                      <Select value={classroomSettings.maxStudentsPerGroup.toString()} onValueChange={(v) => setClassroomSettings(s => ({ ...s, maxStudentsPerGroup: parseInt(v) }))}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="2">2 students</SelectItem>
                          <SelectItem value="3">3 students</SelectItem>
                          <SelectItem value="4">4 students</SelectItem>
                          <SelectItem value="5">5 students</SelectItem>
                          <SelectItem value="6">6 students</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <label className="text-sm font-medium">Default Assignment Duration (days)</label>
                      <Select value={classroomSettings.defaultAssignmentDuration.toString()} onValueChange={(v) => setClassroomSettings(s => ({ ...s, defaultAssignmentDuration: parseInt(v) }))}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">1 day</SelectItem>
                          <SelectItem value="3">3 days</SelectItem>
                          <SelectItem value="7">1 week</SelectItem>
                          <SelectItem value="14">2 weeks</SelectItem>
                          <SelectItem value="30">1 month</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <label className="text-sm font-medium">Grading Scale</label>
                      <Select value={classroomSettings.gradingScale} onValueChange={(v) => setClassroomSettings(s => ({ ...s, gradingScale: v }))}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="percentage">Percentage</SelectItem>
                          <SelectItem value="letter">Letter Grade</SelectItem>
                          <SelectItem value="points">Points</SelectItem>
                          <SelectItem value="custom">Custom Scale</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <label className="text-sm font-medium">Attendance Method</label>
                      <Select value={classroomSettings.attendanceMethod} onValueChange={(v) => setClassroomSettings(s => ({ ...s, attendanceMethod: v }))}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="manual">Manual Entry</SelectItem>
                          <SelectItem value="qr">QR Code</SelectItem>
                          <SelectItem value="biometric">Biometric</SelectItem>
                          <SelectItem value="auto">Auto-detect</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Allow Absence Notes</p>
                        <p className="text-sm text-muted-foreground">Students can submit absence explanations</p>
                      </div>
                      <Switch checked={classroomSettings.allowAbsenceNotes} onCheckedChange={v => setClassroomSettings(s => ({ ...s, allowAbsenceNotes: v }))} />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Enable Parent Communication</p>
                        <p className="text-sm text-muted-foreground">Allow direct communication with parents</p>
                      </div>
                      <Switch checked={classroomSettings.enableParentCommunication} onCheckedChange={v => setClassroomSettings(s => ({ ...s, enableParentCommunication: v }))} />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Show Class Average</p>
                        <p className="text-sm text-muted-foreground">Display class average to students</p>
                      </div>
                      <Switch checked={classroomSettings.showClassAverage} onCheckedChange={v => setClassroomSettings(s => ({ ...s, showClassAverage: v }))} />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Enable Student Feedback</p>
                        <p className="text-sm text-muted-foreground">Allow students to provide feedback</p>
                      </div>
                      <Switch checked={classroomSettings.enableStudentFeedback} onCheckedChange={v => setClassroomSettings(s => ({ ...s, enableStudentFeedback: v }))} />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Auto Archive Old Assignments</p>
                        <p className="text-sm text-muted-foreground">Automatically archive completed assignments</p>
                      </div>
                      <Switch checked={classroomSettings.autoArchiveOldAssignments} onCheckedChange={v => setClassroomSettings(s => ({ ...s, autoArchiveOldAssignments: v }))} />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Enable Class Announcements</p>
                        <p className="text-sm text-muted-foreground">Send announcements to all students</p>
                      </div>
                      <Switch checked={classroomSettings.enableClassAnnouncements} onCheckedChange={v => setClassroomSettings(s => ({ ...s, enableClassAnnouncements: v }))} />
                    </div>
                  </div>
                </div>
                
                <Button onClick={handleClassroomSave} className="mt-6">
                  <Save className="h-4 w-4 mr-2" />
                  Save Classroom Settings
                </Button>
                {classroomSaved && <div className="text-green-600 text-sm mt-2 flex items-center gap-2"><CheckCircle className="h-4 w-4" /> Classroom settings saved!</div>}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="notifications" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="h-5 w-5" />
                  Notification Preferences
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="font-medium">Delivery Methods</h4>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Email Notifications</p>
                        <p className="text-sm text-muted-foreground">Receive notifications via email</p>
                      </div>
                      <Switch checked={notifications.email} onCheckedChange={v => setNotifications(n => ({ ...n, email: v }))} />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">SMS Notifications</p>
                        <p className="text-sm text-muted-foreground">Receive notifications via SMS</p>
                      </div>
                      <Switch checked={notifications.sms} onCheckedChange={v => setNotifications(n => ({ ...n, sms: v }))} />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">In-App Notifications</p>
                        <p className="text-sm text-muted-foreground">Receive notifications in the app</p>
                      </div>
                      <Switch checked={notifications.inApp} onCheckedChange={v => setNotifications(n => ({ ...n, inApp: v }))} />
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h4 className="font-medium">Notification Types</h4>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Assignment Submissions</p>
                        <p className="text-sm text-muted-foreground">When students submit assignments</p>
                      </div>
                      <Switch checked={notifications.assignmentSubmissions} onCheckedChange={v => setNotifications(n => ({ ...n, assignmentSubmissions: v }))} />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Student Questions</p>
                        <p className="text-sm text-muted-foreground">When students ask questions</p>
                      </div>
                      <Switch checked={notifications.studentQuestions} onCheckedChange={v => setNotifications(n => ({ ...n, studentQuestions: v }))} />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Attendance Alerts</p>
                        <p className="text-sm text-muted-foreground">For attendance issues</p>
                      </div>
                      <Switch checked={notifications.attendanceAlerts} onCheckedChange={v => setNotifications(n => ({ ...n, attendanceAlerts: v }))} />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Grade Updates</p>
                        <p className="text-sm text-muted-foreground">When grades are updated</p>
                      </div>
                      <Switch checked={notifications.gradeUpdates} onCheckedChange={v => setNotifications(n => ({ ...n, gradeUpdates: v }))} />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Parent Messages</p>
                        <p className="text-sm text-muted-foreground">Messages from parents</p>
                      </div>
                      <Switch checked={notifications.parentMessages} onCheckedChange={v => setNotifications(n => ({ ...n, parentMessages: v }))} />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Admin Announcements</p>
                        <p className="text-sm text-muted-foreground">Important announcements from admin</p>
                      </div>
                      <Switch checked={notifications.adminAnnouncements} onCheckedChange={v => setNotifications(n => ({ ...n, adminAnnouncements: v }))} />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Professional Development</p>
                        <p className="text-sm text-muted-foreground">Training and workshop opportunities</p>
                      </div>
                      <Switch checked={notifications.professionalDevelopment} onCheckedChange={v => setNotifications(n => ({ ...n, professionalDevelopment: v }))} />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Meeting Reminders</p>
                        <p className="text-sm text-muted-foreground">Staff meetings and conferences</p>
                      </div>
                      <Switch checked={notifications.meetingReminders} onCheckedChange={v => setNotifications(n => ({ ...n, meetingReminders: v }))} />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Deadline Reminders</p>
                        <p className="text-sm text-muted-foreground">Important deadlines and due dates</p>
                      </div>
                      <Switch checked={notifications.deadlineReminders} onCheckedChange={v => setNotifications(n => ({ ...n, deadlineReminders: v }))} />
                    </div>
                  </div>
                </div>
                
                <Button onClick={handleNotifSave} className="mt-6">
                  <Save className="h-4 w-4 mr-2" />
                  Save Notification Preferences
                </Button>
                {notifSaved && <div className="text-green-600 text-sm mt-2 flex items-center gap-2"><CheckCircle className="h-4 w-4" /> Notification preferences saved!</div>}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="professional" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5" />
                  Professional Development
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Auto-Enroll Workshops</p>
                      <p className="text-sm text-muted-foreground">Automatically enroll in relevant workshops</p>
                    </div>
                    <Switch checked={professionalSettings.autoEnrollWorkshops} onCheckedChange={v => setProfessionalSettings(s => ({ ...s, autoEnrollWorkshops: v }))} />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Show Training Opportunities</p>
                      <p className="text-sm text-muted-foreground">Display available training programs</p>
                    </div>
                    <Switch checked={professionalSettings.showTrainingOpportunities} onCheckedChange={v => setProfessionalSettings(s => ({ ...s, showTrainingOpportunities: v }))} />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Enable Mentorship</p>
                      <p className="text-sm text-muted-foreground">Participate in mentorship programs</p>
                    </div>
                    <Switch checked={professionalSettings.enableMentorship} onCheckedChange={v => setProfessionalSettings(s => ({ ...s, enableMentorship: v }))} />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Allow Research Time</p>
                      <p className="text-sm text-muted-foreground">Allocate time for research activities</p>
                    </div>
                    <Switch checked={professionalSettings.allowResearchTime} onCheckedChange={v => setProfessionalSettings(s => ({ ...s, allowResearchTime: v }))} />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Enable Conference Attendance</p>
                      <p className="text-sm text-muted-foreground">Attend educational conferences</p>
                    </div>
                    <Switch checked={professionalSettings.enableConferenceAttendance} onCheckedChange={v => setProfessionalSettings(s => ({ ...s, enableConferenceAttendance: v }))} />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Show Career Advancement</p>
                      <p className="text-sm text-muted-foreground">Display career growth opportunities</p>
                    </div>
                    <Switch checked={professionalSettings.showCareerAdvancement} onCheckedChange={v => setProfessionalSettings(s => ({ ...s, showCareerAdvancement: v }))} />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Enable Peer Collaboration</p>
                      <p className="text-sm text-muted-foreground">Collaborate with other teachers</p>
                    </div>
                    <Switch checked={professionalSettings.enablePeerCollaboration} onCheckedChange={v => setProfessionalSettings(s => ({ ...s, enablePeerCollaboration: v }))} />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Allow Publication Support</p>
                      <p className="text-sm text-muted-foreground">Support for research publications</p>
                    </div>
                    <Switch checked={professionalSettings.allowPublicationSupport} onCheckedChange={v => setProfessionalSettings(s => ({ ...s, allowPublicationSupport: v }))} />
                  </div>
                  <Button onClick={handleProfessionalSave} className="mt-4">
                    <Save className="h-4 w-4 mr-2" />
                    Save Professional Settings
                  </Button>
                  {professionalSaved && <div className="text-green-600 text-sm mt-2 flex items-center gap-2"><CheckCircle className="h-4 w-4" /> Professional settings saved!</div>}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="appearance" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Palette className="h-5 w-5" />
                  Appearance Settings
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium">Theme</label>
                      <Select value={appearanceSettings.theme} onValueChange={(v) => setAppearanceSettings(s => ({ ...s, theme: v }))}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="light">Light</SelectItem>
                          <SelectItem value="dark">Dark</SelectItem>
                          <SelectItem value="auto">Auto</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <label className="text-sm font-medium">Font Size</label>
                      <Select value={appearanceSettings.fontSize} onValueChange={(v) => setAppearanceSettings(s => ({ ...s, fontSize: v }))}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="small">Small</SelectItem>
                          <SelectItem value="medium">Medium</SelectItem>
                          <SelectItem value="large">Large</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <label className="text-sm font-medium">Color Scheme</label>
                      <Select value={appearanceSettings.colorScheme} onValueChange={(v) => setAppearanceSettings(s => ({ ...s, colorScheme: v }))}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="blue">Blue</SelectItem>
                          <SelectItem value="green">Green</SelectItem>
                          <SelectItem value="purple">Purple</SelectItem>
                          <SelectItem value="orange">Orange</SelectItem>
                          <SelectItem value="red">Red</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Compact Mode</p>
                        <p className="text-sm text-muted-foreground">Reduce spacing for more content</p>
                      </div>
                      <Switch checked={appearanceSettings.compactMode} onCheckedChange={v => setAppearanceSettings(s => ({ ...s, compactMode: v }))} />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Show Animations</p>
                        <p className="text-sm text-muted-foreground">Enable smooth transitions</p>
                      </div>
                      <Switch checked={appearanceSettings.showAnimations} onCheckedChange={v => setAppearanceSettings(s => ({ ...s, showAnimations: v }))} />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">High Contrast</p>
                        <p className="text-sm text-muted-foreground">Increase contrast for better visibility</p>
                      </div>
                      <Switch checked={appearanceSettings.highContrast} onCheckedChange={v => setAppearanceSettings(s => ({ ...s, highContrast: v }))} />
                    </div>
                  </div>
                </div>
                
                <Button onClick={handleAppearanceSave} className="mt-6">
                  <Save className="h-4 w-4 mr-2" />
                  Save Appearance Settings
                </Button>
                {appearanceSaved && <div className="text-green-600 text-sm mt-2 flex items-center gap-2"><CheckCircle className="h-4 w-4" /> Appearance settings saved!</div>}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="security" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Security Settings
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h3 className="font-medium mb-3">Change Password</h3>
                    <form className="space-y-3" onSubmit={handlePasswordChange}>
                      <Input 
                        type={showPassword ? 'text' : 'password'} 
                        value={currentPassword} 
                        onChange={e => setCurrentPassword(e.target.value)} 
                        placeholder="Current Password" 
                        required 
                      />
                      <Input 
                        type={showPassword ? 'text' : 'password'} 
                        value={newPassword} 
                        onChange={e => setNewPassword(e.target.value)} 
                        placeholder="New Password" 
                        required 
                      />
                      <Input 
                        type={showPassword ? 'text' : 'password'} 
                        value={confirmPassword} 
                        onChange={e => setConfirmPassword(e.target.value)} 
                        placeholder="Confirm New Password" 
                        required 
                      />
                      <div className="flex items-center gap-2">
                        <Switch checked={showPassword} onCheckedChange={setShowPassword} />
                        <span className="text-sm">Show Passwords</span>
                      </div>
                      <Button type="submit" size="sm">
                        <Lock className="h-4 w-4 mr-2" />
                        Change Password
                      </Button>
                      {passwordChanged && <div className="text-green-600 text-sm mt-2 flex items-center gap-2"><CheckCircle className="h-4 w-4" /> Password changed successfully!</div>}
                    </form>
                  </div>
                  
                  <div>
                    <h3 className="font-medium mb-3">Privacy Settings</h3>
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <Switch checked={profilePublic} onCheckedChange={setProfilePublic} />
                        <span>Profile is {profilePublic ? 'Public' : 'Private'}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Switch checked={showContactInfo} onCheckedChange={setShowContactInfo} />
                        <span>Show contact information to students</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Switch checked={allowStudentContact} onCheckedChange={setAllowStudentContact} />
                        <span>Allow students to contact me</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Switch checked={allowParentContact} onCheckedChange={setAllowParentContact} />
                        <span>Allow parents to contact me</span>
                      </div>
                    </div>
                    
                    <div className="flex gap-2 mt-4">
                      <Button size="sm" variant="outline" className="flex items-center gap-2">
                        <Download className="h-4 w-4" />
                        Download Profile Data
                      </Button>
                      <Button size="sm" variant="outline" className="flex items-center gap-2">
                        <FileText className="h-4 w-4" />
                        Download Teaching Records
                      </Button>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-medium mb-3 text-red-600 flex items-center gap-2">
                      <AlertTriangle className="h-4 w-4" />
                      Danger Zone
                    </h3>
                    <div className="space-y-2">
                      <Button size="sm" variant="destructive" className="flex items-center gap-2">
                        <Trash2 className="h-4 w-4" />
                        Delete Account
                      </Button>
                      <p className="text-sm text-muted-foreground">This action cannot be undone. All your data will be permanently deleted.</p>
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

export default SettingsPage; 