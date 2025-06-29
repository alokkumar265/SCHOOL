import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/backend/contexts/AuthContext";

// Pages
import Login from "@/frontend/pages/Login";
import Index from "@/pages/Index";
import Dashboard from "@/pages/Dashboard";
import UsersManagement from "@/pages/UsersManagement";
import DepartmentsManagement from "@/pages/DepartmentsManagement";
import StudentsManagement from "@/pages/StudentsManagement";
import FeeManagement from "@/pages/FeeManagement";
import FeeStructure from "@/pages/FeeStructure";
import SalaryManagement from "@/pages/SalaryManagement";
import AdmissionEnquiry from "@/frontend/pages/AdmissionEnquiry";
import FeePayment from "@/pages/FeePayment";
import NotFound from "@/frontend/pages/NotFound";
import Unauthorized from "@/frontend/pages/Unauthorized";
import MyCourses from "@/frontend/pages/MyCourses";

// New pages
import About from "@/frontend/pages/About";
import Academics from "@/frontend/pages/Academics";
import Sports from "@/pages/Sports";
import Alumni from "@/pages/Alumni";
import Admission from "@/pages/Admission";
import Career from "@/pages/Career";

// Additional pages
import StaffPage from "@/frontend/pages/StaffPage";
import CoursesPage from "@/frontend/pages/CoursesPage";
import AttendancePage from "@/frontend/pages/AttendancePage";
import CalendarPage from "@/frontend/pages/CalendarPage";
import ProfilePage from "@/frontend/pages/ProfilePage";
import MessagesPage from "@/frontend/pages/MessagesPage";
import NotificationsPage from "@/frontend/pages/NotificationsPage";
import SettingsPage from "@/frontend/pages/SettingsPage";

// Student pages
import GradesPage from "@/frontend/pages/GradesPage";
import MyFeesPage from "@/frontend/pages/MyFeesPage";
import AssignmentsPage from "@/frontend/pages/AssignmentsPage";
import LibraryPage from "@/frontend/pages/LibraryPage";

// Enhanced Student pages
import TimetablePage from "@/frontend/pages/TimetablePage";
import StudyResourcesPage from "@/frontend/pages/StudyResourcesPage";
import CommunicationHubPage from "@/frontend/pages/CommunicationHubPage";
import ProgressTrackingPage from "@/frontend/pages/ProgressTrackingPage";
import AttendanceManagementPage from "@/frontend/pages/AttendanceManagementPage";
import ExtracurricularPage from "@/frontend/pages/ExtracurricularPage";
import ServicesPage from "@/frontend/pages/ServicesPage";
import AIAssistantPage from "@/frontend/pages/AIAssistantPage";

// Alumni pages
import AlumniProfile from "@/pages/AlumniProfile";

// Protected route
import ProtectedRoute from "@/frontend/components/ProtectedRoute";

// New pages
import AnnouncementsPage from '@/frontend/pages/AnnouncementsPage';
import AchievementsPage from '@/frontend/pages/AchievementsPage';
import DonationPage from '@/frontend/pages/DonationPage';
import AlumniDirectoryPage from '@/frontend/pages/AlumniDirectoryPage';
import EventsPage from '@/frontend/pages/EventsPage';
import JobBoardPage from '@/frontend/pages/JobBoardPage';
import AchievementsSpotlightPage from '@/frontend/pages/AchievementsSpotlightPage';
import MentorshipPage from '@/frontend/pages/MentorshipPage';
import NewsletterPage from '@/frontend/pages/NewsletterPage';
import BadgesPage from '@/frontend/pages/BadgesPage';
import GalleryPage from '@/frontend/pages/GalleryPage';
import FeedbackPage from '@/frontend/pages/FeedbackPage';
import ExamsPage from '@/frontend/pages/ExamsPage';

// Additional missing pages
import ExamPreparationPage from '@/frontend/pages/ExamPreparationPage';
import StudyGroupsPage from '@/frontend/pages/StudyGroupsPage';
import ParentPortalPage from '@/frontend/pages/ParentPortalPage';
import CareerGuidancePage from '@/frontend/pages/CareerGuidancePage';
import HealthWellnessPage from '@/frontend/pages/HealthWellnessPage';
import LeaveManagementPage from '@/frontend/pages/LeaveManagementPage';
import FeeManagementPage from '@/frontend/pages/FeeManagementPage';
import StudySchedulePage from '@/frontend/pages/StudySchedulePage';
import ReportsPage from '@/frontend/pages/ReportsPage';
import MyClassesPage from '@/frontend/pages/MyClassesPage';
import SyllabusPage from '@/frontend/pages/SyllabusPage';
import GradebookPage from '@/frontend/pages/GradebookPage';
import LectureSchedulePage from '@/frontend/pages/LectureSchedulePage';
import TeacherClassesPage from '@/frontend/pages/TeacherClassesPage';
import TeacherAssignmentsPage from '@/frontend/pages/TeacherAssignmentsPage';

// Finance section pages
import MySalaryPage from '@/frontend/pages/MySalaryPage';
import AttendanceHistoryPage from '@/frontend/pages/AttendanceHistoryPage';
import SalaryHistoryPage from '@/frontend/pages/SalaryHistoryPage';

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AuthProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <Routes>
              {/* Public routes */}
              <Route path="/" element={<Index />} />
              <Route path="/login" element={<Login />} />
              <Route path="/unauthorized" element={<Unauthorized />} />
              <Route path="/admission-enquiry" element={<AdmissionEnquiry />} />
              <Route path="/fee-payment" element={<FeePayment />} />
              
              {/* New public routes */}
              <Route path="/about" element={<About />} />
              <Route path="/academics" element={<Academics />} />
              <Route path="/sports" element={<Sports />} />
              <Route path="/alumni" element={<Alumni />} />
              <Route path="/admission" element={<Admission />} />
              <Route path="/career" element={<Career />} />
              
              {/* Protected routes */}
              <Route 
                path="/dashboard" 
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                } 
              />
              
              {/* Alumni routes */}
              <Route 
                path="/alumni-profile" 
                element={
                  <ProtectedRoute allowedRoles={['alumni']}>
                    <AlumniProfile />
                  </ProtectedRoute>
                } 
              />
              
              {/* Student routes */}
              <Route 
                path="/my-courses" 
                element={
                  <ProtectedRoute allowedRoles={['student', 'teacher']}>
                    <MyCourses />
                  </ProtectedRoute>
                } 
              />
              
              <Route 
                path="/assignments" 
                element={
                  <ProtectedRoute allowedRoles={['student', 'teacher']}>
                    <AssignmentsPage />
                  </ProtectedRoute>
                } 
              />
              
              <Route 
                path="/grades" 
                element={
                  <ProtectedRoute allowedRoles={['student', 'parent', 'teacher']}>
                    <GradesPage />
                  </ProtectedRoute>
                } 
              />
              
              <Route 
                path="/attendance" 
                element={
                  <ProtectedRoute allowedRoles={['student', 'teacher']}>
                    <AttendancePage />
                  </ProtectedRoute>
                } 
              />
              
              <Route 
                path="/library" 
                element={
                  <ProtectedRoute allowedRoles={['student', 'teacher']}>
                    <LibraryPage />
                  </ProtectedRoute>
                } 
              />
              
              <Route 
                path="/my-fees" 
                element={
                  <ProtectedRoute allowedRoles={['student', 'parent']}>
                    <MyFeesPage />
                  </ProtectedRoute>
                } 
              />
              {/* Alternate route to handle /myfee URL */}
              <Route 
                path="/myfee" 
                element={
                  <ProtectedRoute allowedRoles={['student', 'parent']}>
                    <MyFeesPage />
                  </ProtectedRoute>
                } 
              />
              
              {/* Admin routes */}
              <Route 
                path="/users" 
                element={
                  <ProtectedRoute allowedRoles={['admin']}>
                    <UsersManagement />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/departments" 
                element={
                  <ProtectedRoute allowedRoles={['admin']}>
                    <DepartmentsManagement />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/students" 
                element={
                  <ProtectedRoute allowedRoles={['admin', 'teacher']}>
                    <StudentsManagement />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/fees" 
                element={
                  <ProtectedRoute allowedRoles={['admin']}>
                    <FeeManagement />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/salary-management" 
                element={
                  <ProtectedRoute allowedRoles={['admin']}>
                    <SalaryManagement />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/fee-structure" 
                element={
                  <ProtectedRoute allowedRoles={['admin', 'teacher', 'student', 'parent']}>
                    <FeeStructure />
                  </ProtectedRoute>
                } 
              />

              {/* Additional routes */}
              <Route 
                path="/staff" 
                element={
                  <ProtectedRoute allowedRoles={['admin', 'teacher']}>
                    <StaffPage />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/courses" 
                element={
                  <ProtectedRoute allowedRoles={['admin', 'teacher']}>
                    <CoursesPage />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/calendar" 
                element={
                  <ProtectedRoute allowedRoles={['student', 'teacher', 'admin', 'parent', 'alumni']}>
                    <CalendarPage />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/profile" 
                element={
                  <ProtectedRoute allowedRoles={['student', 'teacher', 'admin', 'parent', 'alumni']}>
                    <ProfilePage />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/messages" 
                element={
                  <ProtectedRoute allowedRoles={['student', 'teacher', 'admin', 'parent', 'alumni']}>
                    <MessagesPage />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/notifications" 
                element={
                  <ProtectedRoute allowedRoles={['student', 'teacher', 'admin', 'parent', 'alumni']}>
                    <NotificationsPage />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/settings" 
                element={
                  <ProtectedRoute allowedRoles={['student', 'teacher', 'admin', 'parent', 'alumni']}>
                    <SettingsPage />
                  </ProtectedRoute>
                } 
              />
              
              {/* Teacher-specific routes */}
              <Route 
                path="/my-classes" 
                element={
                  <ProtectedRoute allowedRoles={['teacher']}>
                    <MyClassesPage />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/teacher-classes" 
                element={
                  <ProtectedRoute allowedRoles={['teacher']}>
                    <TeacherClassesPage />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/teacher-assignments" 
                element={
                  <ProtectedRoute allowedRoles={['teacher']}>
                    <TeacherAssignmentsPage />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/syllabus" 
                element={
                  <ProtectedRoute allowedRoles={['teacher']}>
                    <SyllabusPage />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/gradebook" 
                element={
                  <ProtectedRoute allowedRoles={['teacher']}>
                    <GradebookPage />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/lecture-schedule" 
                element={
                  <ProtectedRoute allowedRoles={['teacher']}>
                    <LectureSchedulePage />
                  </ProtectedRoute>
                } 
              />
              
              {/* Finance section routes */}
              <Route 
                path="/my-salary" 
                element={
                  <ProtectedRoute allowedRoles={['teacher']}>
                    <MySalaryPage />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/attendance-history" 
                element={
                  <ProtectedRoute allowedRoles={['teacher']}>
                    <AttendanceHistoryPage />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/salary-history" 
                element={
                  <ProtectedRoute allowedRoles={['teacher']}>
                    <SalaryHistoryPage />
                  </ProtectedRoute>
                } 
              />
              
              {/* Shared routes for teachers and students */}
              <Route 
                path="/announcements" 
                element={
                  <ProtectedRoute allowedRoles={['student', 'teacher', 'admin', 'parent']}>
                    <AnnouncementsPage />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/events" 
                element={
                  <ProtectedRoute allowedRoles={['student', 'teacher', 'admin', 'parent', 'alumni']}>
                    <EventsPage />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/communication-hub" 
                element={
                  <ProtectedRoute allowedRoles={['student', 'teacher', 'admin', 'parent']}>
                    <CommunicationHubPage />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/reports" 
                element={
                  <ProtectedRoute allowedRoles={['teacher', 'admin']}>
                    <ReportsPage />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/attendance-management" 
                element={
                  <ProtectedRoute allowedRoles={['student', 'teacher']}>
                    <AttendanceManagementPage />
                  </ProtectedRoute>
                } 
              />
              
              {/* Student-specific routes */}
              <Route 
                path="/achievements" 
                element={
                  <ProtectedRoute allowedRoles={['student', 'alumni']}>
                    <AchievementsPage />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/donation" 
                element={
                  <ProtectedRoute allowedRoles={['alumni']}>
                    <DonationPage />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/alumni-directory" 
                element={
                  <ProtectedRoute allowedRoles={['alumni']}>
                    <AlumniDirectoryPage />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/job-board" 
                element={
                  <ProtectedRoute allowedRoles={['alumni']}>
                    <JobBoardPage />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/achievements-spotlight" 
                element={
                  <ProtectedRoute allowedRoles={['alumni']}>
                    <AchievementsSpotlightPage />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/mentorship" 
                element={
                  <ProtectedRoute allowedRoles={['alumni']}>
                    <MentorshipPage />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/newsletter" 
                element={
                  <ProtectedRoute allowedRoles={['alumni']}>
                    <NewsletterPage />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/badges" 
                element={
                  <ProtectedRoute allowedRoles={['alumni']}>
                    <BadgesPage />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/gallery" 
                element={
                  <ProtectedRoute allowedRoles={['alumni']}>
                    <GalleryPage />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/feedback" 
                element={
                  <ProtectedRoute allowedRoles={['student', 'teacher', 'admin', 'parent', 'alumni']}>
                    <FeedbackPage />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/exams" 
                element={
                  <ProtectedRoute allowedRoles={['student', 'teacher']}>
                    <ExamsPage />
                  </ProtectedRoute>
                } 
              />
              
              {/* Enhanced Student routes */}
              <Route 
                path="/timetable" 
                element={
                  <ProtectedRoute allowedRoles={['student', 'teacher']}>
                    <TimetablePage />
                  </ProtectedRoute>
                } 
              />
              
              <Route 
                path="/study-resources" 
                element={
                  <ProtectedRoute allowedRoles={['student', 'teacher']}>
                    <StudyResourcesPage />
                  </ProtectedRoute>
                } 
              />
              
              <Route 
                path="/progress-tracking" 
                element={
                  <ProtectedRoute allowedRoles={['student', 'teacher']}>
                    <ProgressTrackingPage />
                  </ProtectedRoute>
                } 
              />
              
              <Route 
                path="/extracurricular" 
                element={
                  <ProtectedRoute allowedRoles={['student']}>
                    <ExtracurricularPage />
                  </ProtectedRoute>
                } 
              />
              
              <Route 
                path="/services" 
                element={
                  <ProtectedRoute allowedRoles={['student', 'teacher']}>
                    <ServicesPage />
                  </ProtectedRoute>
                } 
              />
              
              {/* AI Assistant - available to all authenticated users */}
              <Route 
                path="/ai-assistant" 
                element={
                  <ProtectedRoute allowedRoles={['student', 'teacher', 'admin', 'parent', 'alumni']}>
                    <AIAssistantPage />
                  </ProtectedRoute>
                } 
              />
              
              {/* Additional routes */}
              <Route 
                path="/exam-preparation" 
                element={
                  <ProtectedRoute allowedRoles={['student', 'teacher']}>
                    <ExamPreparationPage />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/study-groups" 
                element={
                  <ProtectedRoute allowedRoles={['student', 'teacher']}>
                    <StudyGroupsPage />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/parent-portal" 
                element={
                  <ProtectedRoute allowedRoles={['parent']}>
                    <ParentPortalPage />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/career-guidance" 
                element={
                  <ProtectedRoute allowedRoles={['student', 'teacher']}>
                    <CareerGuidancePage />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/health-wellness" 
                element={
                  <ProtectedRoute allowedRoles={['student', 'teacher']}>
                    <HealthWellnessPage />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/leave-management" 
                element={
                  <ProtectedRoute allowedRoles={['student', 'teacher']}>
                    <LeaveManagementPage />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/fee-management" 
                element={
                  <ProtectedRoute allowedRoles={['admin', 'teacher']}>
                    <FeeManagementPage />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/study-schedule" 
                element={
                  <ProtectedRoute allowedRoles={['student', 'teacher']}>
                    <StudySchedulePage />
                  </ProtectedRoute>
                } 
              />
              
              {/* Catch-all route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </TooltipProvider>
        </AuthProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;
