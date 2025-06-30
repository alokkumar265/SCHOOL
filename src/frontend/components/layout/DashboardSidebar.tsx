import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { 
  Sidebar, 
  SidebarContent, 
  SidebarMenu, 
  SidebarMenuItem, 
  SidebarMenuButton, 
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  useSidebar
} from '@/components/ui/sidebar';
import { 
  User, 
  Users, 
  BookOpen, 
  Calendar, 
  Settings,
  Bell,
  MessageSquare,
  Building,
  School,
  CreditCard,
  ClipboardList,
  FileText,
  GraduationCap,
  Award,
  Briefcase,
  Mail,
  Image,
  BookMarked,
  Clock,
  Library,
  Trophy,
  Home,
  Activity,
  Package,
  Bot,
  Heart
} from 'lucide-react';
import { useAuth } from '@/backend/contexts/AuthContext';
import { cn } from '@/lib/utils';

const DashboardSidebar = () => {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const location = useLocation();
  const { user, loading } = useAuth();
  
  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }
  
  const isPathActive = (path: string) => location.pathname === path;
  const isGroupExpanded = (paths: string[]) => paths.some(path => location.pathname.startsWith(path));
  
  const getLinkClass = ({ isActive }: { isActive: boolean }) => 
    cn("flex items-center py-3 px-4 rounded-lg transition-all duration-200 font-medium", {
      "bg-sidebar-accent text-sidebar-accent-foreground shadow-sm": isActive,
      "text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground": !isActive
    });

  // Student-specific navigation
  const getStudentNavigation = () => (
    <SidebarMenu className="space-y-2">
      {/* Standalone Dashboard */}
      <SidebarMenuItem>
        <SidebarMenuButton asChild>
          <NavLink to="/dashboard" className={getLinkClass}>
            <div className="flex items-center">
              <Home className="mr-3 h-5 w-5" />
              {!collapsed && <span className="text-sm">Dashboard</span>}
            </div>
          </NavLink>
        </SidebarMenuButton>
      </SidebarMenuItem>

      {/* Academic Management Group */}
      <SidebarGroup>
        <SidebarGroupLabel>Academic Management</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <NavLink to="/my-courses" className={getLinkClass}>
                <div className="flex items-center">
                  <BookOpen className="mr-3 h-5 w-5" />
                  {!collapsed && <span className="text-sm">My Courses</span>}
                </div>
              </NavLink>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <NavLink to="/assignments" className={getLinkClass}>
                <div className="flex items-center">
                  <ClipboardList className="mr-3 h-5 w-5" />
                  {!collapsed && <span className="text-sm">Assignments</span>}
                </div>
              </NavLink>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <NavLink to="/study-resources" className={getLinkClass}>
                <div className="flex items-center">
                  <BookMarked className="mr-3 h-5 w-5" />
                  {!collapsed && <span className="text-sm">Study Resources</span>}
                </div>
              </NavLink>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <NavLink to="/grades" className={getLinkClass}>
                <div className="flex items-center">
                  <Trophy className="mr-3 h-5 w-5" />
                  {!collapsed && <span className="text-sm">Grades</span>}
                </div>
              </NavLink>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <NavLink to="/exams" className={getLinkClass}>
                <div className="flex items-center">
                  <FileText className="mr-3 h-5 w-5" />
                  {!collapsed && <span className="text-sm">Exams</span>}
                </div>
              </NavLink>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <NavLink to="/exam-preparation" className={getLinkClass}>
                <div className="flex items-center">
                  <BookOpen className="mr-3 h-5 w-5" />
                  {!collapsed && <span className="text-sm">Exam Preparation</span>}
                </div>
              </NavLink>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <NavLink to="/study-schedule" className={getLinkClass}>
                <div className="flex items-center">
                  <Clock className="mr-3 h-5 w-5" />
                  {!collapsed && <span className="text-sm">Study Schedule</span>}
                </div>
              </NavLink>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarGroupContent>
      </SidebarGroup>

      {/* Class Management Group */}
      <SidebarGroup>
        <SidebarGroupLabel>Class Management</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <NavLink to="/timetable" className={getLinkClass}>
                <div className="flex items-center">
                  <Calendar className="mr-3 h-5 w-5" />
                  {!collapsed && <span className="text-sm">Timetable</span>}
                </div>
              </NavLink>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <NavLink to="/attendance" className={getLinkClass}>
                <div className="flex items-center">
                  <Clock className="mr-3 h-5 w-5" />
                  {!collapsed && <span className="text-sm">Attendance</span>}
                </div>
              </NavLink>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <NavLink to="/attendance-management" className={getLinkClass}>
                <div className="flex items-center">
                  <Clock className="mr-3 h-5 w-5" />
                  {!collapsed && <span className="text-sm">Attendance Management</span>}
                </div>
              </NavLink>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <NavLink to="/progress-tracking" className={getLinkClass}>
                <div className="flex items-center">
                  <Trophy className="mr-3 h-5 w-5" />
                  {!collapsed && <span className="text-sm">Progress Tracking</span>}
                </div>
              </NavLink>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <NavLink to="/reports" className={getLinkClass}>
                <div className="flex items-center">
                  <FileText className="mr-3 h-5 w-5" />
                  {!collapsed && <span className="text-sm">Reports</span>}
                </div>
              </NavLink>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarGroupContent>
      </SidebarGroup>

      {/* Activities & Development Group */}
      <SidebarGroup>
        <SidebarGroupLabel>Activities & Development</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <NavLink to="/extracurricular" className={getLinkClass}>
                <div className="flex items-center">
                  <Activity className="mr-3 h-5 w-5" />
                  {!collapsed && <span className="text-sm">Extracurricular</span>}
                </div>
              </NavLink>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <NavLink to="/study-groups" className={getLinkClass}>
                <div className="flex items-center">
                  <Users className="mr-3 h-5 w-5" />
                  {!collapsed && <span className="text-sm">Study Groups</span>}
                </div>
              </NavLink>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <NavLink to="/achievements" className={getLinkClass}>
                <div className="flex items-center">
                  <Award className="mr-3 h-5 w-5" />
                  {!collapsed && <span className="text-sm">Achievements</span>}
                </div>
              </NavLink>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <NavLink to="/career-guidance" className={getLinkClass}>
                <div className="flex items-center">
                  <GraduationCap className="mr-3 h-5 w-5" />
                  {!collapsed && <span className="text-sm">Career Guidance</span>}
                </div>
              </NavLink>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <NavLink to="/health-wellness" className={getLinkClass}>
                <div className="flex items-center">
                  <Heart className="mr-3 h-5 w-5" />
                  {!collapsed && <span className="text-sm">Health & Wellness</span>}
                </div>
              </NavLink>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarGroupContent>
      </SidebarGroup>

      {/* Communication Group */}
      <SidebarGroup>
        <SidebarGroupLabel>Communication</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <NavLink to="/communication-hub" className={getLinkClass}>
                <div className="flex items-center">
                  <MessageSquare className="mr-3 h-5 w-5" />
                  {!collapsed && <span className="text-sm">Communication Hub</span>}
                </div>
              </NavLink>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <NavLink to="/messages" className={getLinkClass}>
                <div className="flex items-center">
                  <MessageSquare className="mr-3 h-5 w-5" />
                  {!collapsed && <span className="text-sm">Messages</span>}
                </div>
              </NavLink>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <NavLink to="/notifications" className={getLinkClass}>
                <div className="flex items-center">
                  <Bell className="mr-3 h-5 w-5" />
                  {!collapsed && <span className="text-sm">Notifications</span>}
                </div>
              </NavLink>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <NavLink to="/announcements" className={getLinkClass}>
                <div className="flex items-center">
                  <Bell className="mr-3 h-5 w-5" />
                  {!collapsed && <span className="text-sm">Announcements</span>}
                </div>
              </NavLink>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <NavLink to="/events" className={getLinkClass}>
                <div className="flex items-center">
                  <Calendar className="mr-3 h-5 w-5" />
                  {!collapsed && <span className="text-sm">School Events</span>}
                </div>
              </NavLink>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarGroupContent>
      </SidebarGroup>

      {/* Services & Support Group */}
      <SidebarGroup>
        <SidebarGroupLabel>Services & Support</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <NavLink to="/services" className={getLinkClass}>
                <div className="flex items-center">
                  <Package className="mr-3 h-5 w-5" />
                  {!collapsed && <span className="text-sm">Services</span>}
                </div>
              </NavLink>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <NavLink to="/ai-assistant" className={getLinkClass}>
                <div className="flex items-center">
                  <Bot className="mr-3 h-5 w-5" />
                  {!collapsed && <span className="text-sm">AI Assistant</span>}
                </div>
              </NavLink>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <NavLink to="/library" className={getLinkClass}>
                <div className="flex items-center">
                  <Library className="mr-3 h-5 w-5" />
                  {!collapsed && <span className="text-sm">Library</span>}
                </div>
              </NavLink>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <NavLink to="/parent-portal" className={getLinkClass}>
                <div className="flex items-center">
                  <User className="mr-3 h-5 w-5" />
                  {!collapsed && <span className="text-sm">Parent Portal</span>}
                </div>
              </NavLink>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <NavLink to="/leave-management" className={getLinkClass}>
                <div className="flex items-center">
                  <Calendar className="mr-3 h-5 w-5" />
                  {!collapsed && <span className="text-sm">Leave Management</span>}
                </div>
              </NavLink>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <NavLink to="/fee-management" className={getLinkClass}>
                <div className="flex items-center">
                  <CreditCard className="mr-3 h-5 w-5" />
                  {!collapsed && <span className="text-sm">Fee Management</span>}
                </div>
              </NavLink>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarGroupContent>
      </SidebarGroup>

      {/* Account Group */}
      <SidebarGroup>
        <SidebarGroupLabel>Account</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <NavLink to="/profile" className={getLinkClass}>
                <div className="flex items-center">
                  <User className="mr-3 h-5 w-5" />
                  {!collapsed && <span className="text-sm">My Profile</span>}
                </div>
              </NavLink>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <NavLink to="/settings" className={getLinkClass}>
                <div className="flex items-center">
                  <Settings className="mr-3 h-5 w-5" />
                  {!collapsed && <span className="text-sm">Settings</span>}
                </div>
              </NavLink>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarGroupContent>
      </SidebarGroup>
    </SidebarMenu>
  );

  // Alumni-specific navigation
  const getAlumniNavigation = () => (
    <SidebarMenu className="space-y-2">
      {/* Standalone Dashboard */}
      <SidebarMenuItem>
        <SidebarMenuButton asChild>
          <NavLink to="/dashboard" className={getLinkClass}>
            <div className="flex items-center">
              <School className="mr-3 h-5 w-5" />
              {!collapsed && <span className="text-sm">Dashboard</span>}
            </div>
          </NavLink>
        </SidebarMenuButton>
      </SidebarMenuItem>

      {/* Standalone Donation */}
      <SidebarMenuItem>
        <SidebarMenuButton asChild>
          <NavLink to="/donation" className={getLinkClass}>
            <div className="flex items-center">
              <CreditCard className="mr-3 h-5 w-5" />
              {!collapsed && <span className="text-sm">Donation</span>}
            </div>
          </NavLink>
        </SidebarMenuButton>
      </SidebarMenuItem>

      {/* Account Group */}
      <SidebarGroup>
        <SidebarGroupLabel>Account</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <NavLink to="/alumni-profile" className={getLinkClass}>
                <div className="flex items-center">
                  <GraduationCap className="mr-3 h-5 w-5" />
                  {!collapsed && <span className="text-sm">My Profile</span>}
                </div>
              </NavLink>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <NavLink to="/profile" className={getLinkClass}>
                <div className="flex items-center">
                  <User className="mr-3 h-5 w-5" />
                  {!collapsed && <span className="text-sm">Profile</span>}
                </div>
              </NavLink>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <NavLink to="/settings" className={getLinkClass}>
                <div className="flex items-center">
                  <Settings className="mr-3 h-5 w-5" />
                  {!collapsed && <span className="text-sm">Settings</span>}
                </div>
              </NavLink>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarGroupContent>
      </SidebarGroup>

      {/* Achievements & Recognition Group */}
      <SidebarGroup>
        <SidebarGroupLabel>Achievements & Recognition</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <NavLink to="/achievements" className={getLinkClass}>
                <div className="flex items-center">
                  <Award className="mr-3 h-5 w-5" />
                  {!collapsed && <span className="text-sm">Achievements</span>}
                </div>
              </NavLink>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <NavLink to="/achievements-spotlight" className={getLinkClass}>
                <div className="flex items-center">
                  <Award className="mr-3 h-5 w-5" />
                  {!collapsed && <span className="text-sm">Achievements & Spotlights</span>}
                </div>
              </NavLink>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <NavLink to="/badges" className={getLinkClass}>
                <div className="flex items-center">
                  <Award className="mr-3 h-5 w-5" />
                  {!collapsed && <span className="text-sm">Badges</span>}
                </div>
              </NavLink>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarGroupContent>
      </SidebarGroup>

      {/* Community & Network Group */}
      <SidebarGroup>
        <SidebarGroupLabel>Community & Network</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <NavLink to="/alumni-directory" className={getLinkClass}>
                <div className="flex items-center">
                  <Users className="mr-3 h-5 w-5" />
                  {!collapsed && <span className="text-sm">Alumni Directory</span>}
                </div>
              </NavLink>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <NavLink to="/events" className={getLinkClass}>
                <div className="flex items-center">
                  <Calendar className="mr-3 h-5 w-5" />
                  {!collapsed && <span className="text-sm">Events & Reunions</span>}
                </div>
              </NavLink>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <NavLink to="/job-board" className={getLinkClass}>
                <div className="flex items-center">
                  <Briefcase className="mr-3 h-5 w-5" />
                  {!collapsed && <span className="text-sm">Job Board</span>}
                </div>
              </NavLink>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <NavLink to="/mentorship" className={getLinkClass}>
                <div className="flex items-center">
                  <Users className="mr-3 h-5 w-5" />
                  {!collapsed && <span className="text-sm">Mentorship</span>}
                </div>
              </NavLink>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <NavLink to="/gallery" className={getLinkClass}>
                <div className="flex items-center">
                  <Image className="mr-3 h-5 w-5" />
                  {!collapsed && <span className="text-sm">Gallery</span>}
                </div>
              </NavLink>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarGroupContent>
      </SidebarGroup>

      {/* Communication Group */}
      <SidebarGroup>
        <SidebarGroupLabel>Communication</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <NavLink to="/messages" className={getLinkClass}>
                <div className="flex items-center">
                  <MessageSquare className="mr-3 h-5 w-5" />
                  {!collapsed && <span className="text-sm">Messages</span>}
                </div>
              </NavLink>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <NavLink to="/notifications" className={getLinkClass}>
                <div className="flex items-center">
                  <Bell className="mr-3 h-5 w-5" />
                  {!collapsed && <span className="text-sm">Notifications</span>}
                </div>
              </NavLink>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <NavLink to="/announcements" className={getLinkClass}>
                <div className="flex items-center">
                  <Bell className="mr-3 h-5 w-5" />
                  {!collapsed && <span className="text-sm">Announcements</span>}
                </div>
              </NavLink>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <NavLink to="/newsletter" className={getLinkClass}>
                <div className="flex items-center">
                  <Mail className="mr-3 h-5 w-5" />
                  {!collapsed && <span className="text-sm">Newsletter</span>}
                </div>
              </NavLink>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <NavLink to="/feedback" className={getLinkClass}>
                <div className="flex items-center">
                  <MessageSquare className="mr-3 h-5 w-5" />
                  {!collapsed && <span className="text-sm">Feedback</span>}
                </div>
              </NavLink>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarGroupContent>
      </SidebarGroup>
    </SidebarMenu>
  );

  // Admin-specific navigation
  const getAdminNavigation = () => (
    <SidebarMenu className="space-y-2">
      {/* Dashboard */}
      <SidebarMenuItem>
        <SidebarMenuButton asChild>
          <NavLink to="/dashboard" className={getLinkClass}>
            <div className="flex items-center">
              <Home className="mr-3 h-5 w-5" />
              {!collapsed && <span className="text-sm">Dashboard</span>}
            </div>
          </NavLink>
        </SidebarMenuButton>
      </SidebarMenuItem>

      {/* Profile Management */}
      <SidebarMenuItem>
        <SidebarMenuButton asChild>
          <NavLink to="/profile" className={getLinkClass}>
            <div className="flex items-center">
              <User className="mr-3 h-5 w-5" />
              {!collapsed && <span className="text-sm">My Profile</span>}
            </div>
          </NavLink>
        </SidebarMenuButton>
      </SidebarMenuItem>

      {/* Communication */}
      <SidebarMenuItem>
        <SidebarMenuButton asChild>
          <NavLink to="/messages" className={getLinkClass}>
            <div className="flex items-center">
              <MessageSquare className="mr-3 h-5 w-5" />
              {!collapsed && <span className="text-sm">Messages</span>}
            </div>
          </NavLink>
        </SidebarMenuButton>
      </SidebarMenuItem>
      <SidebarMenuItem>
        <SidebarMenuButton asChild>
          <NavLink to="/notifications" className={getLinkClass}>
            <div className="flex items-center">
              <Bell className="mr-3 h-5 w-5" />
              {!collapsed && <span className="text-sm">Notifications</span>}
            </div>
          </NavLink>
        </SidebarMenuButton>
      </SidebarMenuItem>
      <SidebarMenuItem>
        <SidebarMenuButton asChild>
          <NavLink to="/announcements" className={getLinkClass}>
            <div className="flex items-center">
              <Bell className="mr-3 h-5 w-5" />
              {!collapsed && <span className="text-sm">Announcements</span>}
            </div>
          </NavLink>
        </SidebarMenuButton>
      </SidebarMenuItem>

      {/* Achievements & Recognition */}
      <SidebarMenuItem>
        <SidebarMenuButton asChild>
          <NavLink to="/achievements" className={getLinkClass}>
            <div className="flex items-center">
              <Award className="mr-3 h-5 w-5" />
              {!collapsed && <span className="text-sm">Achievements</span>}
            </div>
          </NavLink>
        </SidebarMenuButton>
      </SidebarMenuItem>

      {/* Alumni Management */}
      <SidebarMenuItem>
        <SidebarMenuButton asChild>
          <NavLink to="/donation" className={getLinkClass}>
            <div className="flex items-center">
              <CreditCard className="mr-3 h-5 w-5" />
              {!collapsed && <span className="text-sm">Donation</span>}
            </div>
          </NavLink>
        </SidebarMenuButton>
      </SidebarMenuItem>
      <SidebarMenuItem>
        <SidebarMenuButton asChild>
          <NavLink to="/alumni-directory" className={getLinkClass}>
            <div className="flex items-center">
              <Users className="mr-3 h-5 w-5" />
              {!collapsed && <span className="text-sm">Alumni Directory</span>}
            </div>
          </NavLink>
        </SidebarMenuButton>
      </SidebarMenuItem>
      <SidebarMenuItem>
        <SidebarMenuButton asChild>
          <NavLink to="/events" className={getLinkClass}>
            <div className="flex items-center">
              <Calendar className="mr-3 h-5 w-5" />
              {!collapsed && <span className="text-sm">Events & Reunions</span>}
            </div>
          </NavLink>
        </SidebarMenuButton>
      </SidebarMenuItem>
      <SidebarMenuItem>
        <SidebarMenuButton asChild>
          <NavLink to="/job-board" className={getLinkClass}>
            <div className="flex items-center">
              <Briefcase className="mr-3 h-5 w-5" />
              {!collapsed && <span className="text-sm">Job Board</span>}
            </div>
          </NavLink>
        </SidebarMenuButton>
      </SidebarMenuItem>
      <SidebarMenuItem>
        <SidebarMenuButton asChild>
          <NavLink to="/achievements-spotlight" className={getLinkClass}>
            <div className="flex items-center">
              <Award className="mr-3 h-5 w-5" />
              {!collapsed && <span className="text-sm">Achievements & Spotlights</span>}
            </div>
          </NavLink>
        </SidebarMenuButton>
      </SidebarMenuItem>
      <SidebarMenuItem>
        <SidebarMenuButton asChild>
          <NavLink to="/mentorship" className={getLinkClass}>
            <div className="flex items-center">
              <Users className="mr-3 h-5 w-5" />
              {!collapsed && <span className="text-sm">Mentorship</span>}
            </div>
          </NavLink>
        </SidebarMenuButton>
      </SidebarMenuItem>
      <SidebarMenuItem>
        <SidebarMenuButton asChild>
          <NavLink to="/newsletter" className={getLinkClass}>
            <div className="flex items-center">
              <Mail className="mr-3 h-5 w-5" />
              {!collapsed && <span className="text-sm">Newsletter</span>}
            </div>
          </NavLink>
        </SidebarMenuButton>
      </SidebarMenuItem>
      <SidebarMenuItem>
        <SidebarMenuButton asChild>
          <NavLink to="/badges" className={getLinkClass}>
            <div className="flex items-center">
              <Award className="mr-3 h-5 w-5" />
              {!collapsed && <span className="text-sm">Badges</span>}
            </div>
          </NavLink>
        </SidebarMenuButton>
      </SidebarMenuItem>
      <SidebarMenuItem>
        <SidebarMenuButton asChild>
          <NavLink to="/gallery" className={getLinkClass}>
            <div className="flex items-center">
              <Image className="mr-3 h-5 w-5" />
              {!collapsed && <span className="text-sm">Gallery</span>}
            </div>
          </NavLink>
        </SidebarMenuButton>
      </SidebarMenuItem>
      <SidebarMenuItem>
        <SidebarMenuButton asChild>
          <NavLink to="/feedback" className={getLinkClass}>
            <div className="flex items-center">
              <MessageSquare className="mr-3 h-5 w-5" />
              {!collapsed && <span className="text-sm">Feedback</span>}
            </div>
          </NavLink>
        </SidebarMenuButton>
      </SidebarMenuItem>

      {/* Administration Group */}
      <SidebarGroup>
        <SidebarGroupLabel className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
          {!collapsed && "Administration"}
        </SidebarGroupLabel>
        <SidebarGroupContent className="space-y-1">
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <NavLink to="/users" className={getLinkClass}>
                <div className="flex items-center">
                  <Users className="mr-3 h-5 w-5" />
                  {!collapsed && <span className="text-sm">Users Management</span>}
                </div>
              </NavLink>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <NavLink to="/departments" className={getLinkClass}>
                <div className="flex items-center">
                  <Building className="mr-3 h-5 w-5" />
                  {!collapsed && <span className="text-sm">Departments</span>}
                </div>
              </NavLink>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <NavLink to="/students" className={getLinkClass}>
                <div className="flex items-center">
                  <Users className="mr-3 h-5 w-5" />
                  {!collapsed && <span className="text-sm">Students Management</span>}
                </div>
              </NavLink>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <NavLink to="/staff" className={getLinkClass}>
                <div className="flex items-center">
                  <Users className="mr-3 h-5 w-5" />
                  {!collapsed && <span className="text-sm">Staff Management</span>}
                </div>
              </NavLink>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarGroupContent>
      </SidebarGroup>

      {/* Academic Management Group */}
      <SidebarGroup>
        <SidebarGroupLabel className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
          {!collapsed && "Academic Management"}
        </SidebarGroupLabel>
        <SidebarGroupContent className="space-y-1">
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <NavLink to="/courses" className={getLinkClass}>
                <div className="flex items-center">
                  <BookOpen className="mr-3 h-5 w-5" />
                  {!collapsed && <span className="text-sm">Courses</span>}
                </div>
              </NavLink>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <NavLink to="/attendance" className={getLinkClass}>
                <div className="flex items-center">
                  <Clock className="mr-3 h-5 w-5" />
                  {!collapsed && <span className="text-sm">Attendance</span>}
                </div>
              </NavLink>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <NavLink to="/calendar" className={getLinkClass}>
                <div className="flex items-center">
                  <Calendar className="mr-3 h-5 w-5" />
                  {!collapsed && <span className="text-sm">Calendar</span>}
                </div>
              </NavLink>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarGroupContent>
      </SidebarGroup>

      {/* Finance Management Group */}
      <SidebarGroup>
        <SidebarGroupLabel className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
          {!collapsed && "Finance Management"}
        </SidebarGroupLabel>
        <SidebarGroupContent className="space-y-1">
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <NavLink to="/fees" className={getLinkClass}>
                <div className="flex items-center">
                  <CreditCard className="mr-3 h-5 w-5" />
                  {!collapsed && <span className="text-sm">Fee Management</span>}
                </div>
              </NavLink>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <NavLink to="/fee-structure" className={getLinkClass}>
                <div className="flex items-center">
                  <FileText className="mr-3 h-5 w-5" />
                  {!collapsed && <span className="text-sm">Fee Structure</span>}
                </div>
              </NavLink>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <NavLink to="/salary-management" className={getLinkClass}>
                <div className="flex items-center">
                  <CreditCard className="mr-3 h-5 w-5" />
                  {!collapsed && <span className="text-sm">Salary Management</span>}
                </div>
              </NavLink>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarGroupContent>
      </SidebarGroup>

      {/* Settings */}
      <SidebarMenuItem>
        <SidebarMenuButton asChild>
          <NavLink to="/settings" className={getLinkClass}>
            <div className="flex items-center">
              <Settings className="mr-3 h-5 w-5" />
              {!collapsed && <span className="text-sm">Settings</span>}
            </div>
          </NavLink>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );

  // Teacher-specific navigation
  const getTeacherNavigation = () => (
    <SidebarMenu className="space-y-2">
      {/* Dashboard */}
      <SidebarMenuItem>
        <SidebarMenuButton asChild>
          <NavLink to="/dashboard" className={getLinkClass}>
            <div className="flex items-center">
              <Home className="mr-3 h-5 w-5" />
              {!collapsed && <span className="text-sm">Dashboard</span>}
            </div>
          </NavLink>
        </SidebarMenuButton>
      </SidebarMenuItem>

      {/* Class Management Group */}
      <SidebarGroup>
        <SidebarGroupLabel className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
          {!collapsed && "Class Management"}
        </SidebarGroupLabel>
        <SidebarGroupContent className="space-y-1">
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <NavLink to="/teacher-classes" className={getLinkClass}>
                <div className="flex items-center">
                  <Users className="mr-3 h-5 w-5" />
                  {!collapsed && <span className="text-sm">My Classes</span>}
                </div>
              </NavLink>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <NavLink to="/attendance-management" className={getLinkClass}>
                <div className="flex items-center">
                  <Clock className="mr-3 h-5 w-5" />
                  {!collapsed && <span className="text-sm">Attendance</span>}
                </div>
              </NavLink>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <NavLink to="/timetable" className={getLinkClass}>
                <div className="flex items-center">
                  <Calendar className="mr-3 h-5 w-5" />
                  {!collapsed && <span className="text-sm">Timetable</span>}
                </div>
              </NavLink>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <NavLink to="/lecture-schedule" className={getLinkClass}>
                <div className="flex items-center">
                  <Calendar className="mr-3 h-5 w-5" />
                  {!collapsed && <span className="text-sm">Lecture Schedule</span>}
                </div>
              </NavLink>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarGroupContent>
      </SidebarGroup>

      {/* Academic Management Group */}
      <SidebarGroup>
        <SidebarGroupLabel className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
          {!collapsed && "Academic Management"}
        </SidebarGroupLabel>
        <SidebarGroupContent className="space-y-1">
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <NavLink to="/teacher-assignments" className={getLinkClass}>
                <div className="flex items-center">
                  <ClipboardList className="mr-3 h-5 w-5" />
                  {!collapsed && <span className="text-sm">Assignments</span>}
                </div>
              </NavLink>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <NavLink to="/gradebook" className={getLinkClass}>
                <div className="flex items-center">
                  <Trophy className="mr-3 h-5 w-5" />
                  {!collapsed && <span className="text-sm">Gradebook</span>}
                </div>
              </NavLink>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <NavLink to="/syllabus" className={getLinkClass}>
                <div className="flex items-center">
                  <BookOpen className="mr-3 h-5 w-5" />
                  {!collapsed && <span className="text-sm">Syllabus</span>}
                </div>
              </NavLink>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarGroupContent>
      </SidebarGroup>

      {/* Finance Group */}
      <SidebarGroup>
        <SidebarGroupLabel className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
          {!collapsed && "Finance"}
        </SidebarGroupLabel>
        <SidebarGroupContent className="space-y-1">
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <NavLink to="/my-salary" className={getLinkClass}>
                <div className="flex items-center">
                  <CreditCard className="mr-3 h-5 w-5" />
                  {!collapsed && <span className="text-sm">My Salary</span>}
                </div>
              </NavLink>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <NavLink to="/attendance-history" className={getLinkClass}>
                <div className="flex items-center">
                  <Clock className="mr-3 h-5 w-5" />
                  {!collapsed && <span className="text-sm">Attendance History</span>}
                </div>
              </NavLink>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <NavLink to="/salary-history" className={getLinkClass}>
                <div className="flex items-center">
                  <FileText className="mr-3 h-5 w-5" />
                  {!collapsed && <span className="text-sm">Salary History</span>}
                </div>
              </NavLink>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarGroupContent>
      </SidebarGroup>

      {/* Communication Group */}
      <SidebarGroup>
        <SidebarGroupLabel className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
          {!collapsed && "Communication"}
        </SidebarGroupLabel>
        <SidebarGroupContent className="space-y-1">
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <NavLink to="/communication-hub" className={getLinkClass}>
                <div className="flex items-center">
                  <MessageSquare className="mr-3 h-5 w-5" />
                  {!collapsed && <span className="text-sm">Communication Hub</span>}
                </div>
              </NavLink>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <NavLink to="/announcements" className={getLinkClass}>
                <div className="flex items-center">
                  <Bell className="mr-3 h-5 w-5" />
                  {!collapsed && <span className="text-sm">Announcements</span>}
                </div>
              </NavLink>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <NavLink to="/events" className={getLinkClass}>
                <div className="flex items-center">
                  <Calendar className="mr-3 h-5 w-5" />
                  {!collapsed && <span className="text-sm">Events</span>}
                </div>
              </NavLink>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarGroupContent>
      </SidebarGroup>

      {/* Profile & Settings */}
      <SidebarGroup>
        <SidebarGroupLabel className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
          {!collapsed && "Account"}
        </SidebarGroupLabel>
        <SidebarGroupContent className="space-y-1">
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <NavLink to="/profile" className={getLinkClass}>
                <div className="flex items-center">
                  <User className="mr-3 h-5 w-5" />
                  {!collapsed && <span className="text-sm">Profile</span>}
                </div>
              </NavLink>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <NavLink to="/settings" className={getLinkClass}>
                <div className="flex items-center">
                  <Settings className="mr-3 h-5 w-5" />
                  {!collapsed && <span className="text-sm">Settings</span>}
                </div>
              </NavLink>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarGroupContent>
      </SidebarGroup>
    </SidebarMenu>
  );

  // Staff-specific navigation
  const getStaffNavigation = () => (
    <SidebarMenu className="space-y-2">
      {/* Dashboard */}
      <SidebarMenuItem>
        <SidebarMenuButton asChild>
          <NavLink to="/dashboard" className={getLinkClass}>
            <div className="flex items-center">
              <Home className="mr-3 h-5 w-5" />
              {!collapsed && <span className="text-sm">Dashboard</span>}
            </div>
          </NavLink>
        </SidebarMenuButton>
      </SidebarMenuItem>

      {/* Salary Group */}
      <SidebarGroup>
        <SidebarGroupLabel>Salary</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <NavLink to="/my-salary" className={getLinkClass}>
                <div className="flex items-center">
                  <CreditCard className="mr-3 h-5 w-5" />
                  {!collapsed && <span className="text-sm">My Salary</span>}
                </div>
              </NavLink>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <NavLink to="/salary-history" className={getLinkClass}>
                <div className="flex items-center">
                  <FileText className="mr-3 h-5 w-5" />
                  {!collapsed && <span className="text-sm">Salary History</span>}
                </div>
              </NavLink>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarGroupContent>
      </SidebarGroup>

      {/* Communication Group */}
      <SidebarGroup>
        <SidebarGroupLabel>Communication</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <NavLink to="/announcements" className={getLinkClass}>
                <div className="flex items-center">
                  <Bell className="mr-3 h-5 w-5" />
                  {!collapsed && <span className="text-sm">Announcements</span>}
                </div>
              </NavLink>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <NavLink to="/feedback" className={getLinkClass}>
                <div className="flex items-center">
                  <MessageSquare className="mr-3 h-5 w-5" />
                  {!collapsed && <span className="text-sm">Feedback</span>}
                </div>
              </NavLink>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <NavLink to="/notifications" className={getLinkClass}>
                <div className="flex items-center">
                  <Bell className="mr-3 h-5 w-5" />
                  {!collapsed && <span className="text-sm">Notifications</span>}
                </div>
              </NavLink>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarGroupContent>
      </SidebarGroup>

      {/* Account Group */}
      <SidebarGroup>
        <SidebarGroupLabel>Account</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <NavLink to="/profile" className={getLinkClass}>
                <div className="flex items-center">
                  <User className="mr-3 h-5 w-5" />
                  {!collapsed && <span className="text-sm">Profile</span>}
                </div>
              </NavLink>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <NavLink to="/settings" className={getLinkClass}>
                <div className="flex items-center">
                  <Settings className="mr-3 h-5 w-5" />
                  {!collapsed && <span className="text-sm">Settings</span>}
                </div>
              </NavLink>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarGroupContent>
      </SidebarGroup>
    </SidebarMenu>
  );

  // Get navigation based on user role
  const getNavigation = () => {
    switch (user?.role) {
      case 'student':
        return getStudentNavigation();
      case 'alumni':
        return getAlumniNavigation();
      case 'admin':
        return getAdminNavigation();
      case 'teacher':
        return getTeacherNavigation();
      case 'staff':
        return getStaffNavigation();
      default:
        return getStudentNavigation(); // Default to student navigation
    }
  };

  return (
    <Sidebar 
      className={cn(
        "relative border-r bg-sidebar/95 backdrop-blur-sm rounded-tl-2xl shadow-lg h-full min-h-0",
        "md:relative md:top-0 md:left-0 md:h-full md:min-h-0 md:rounded-tl-none md:shadow-none",
        collapsed ? "w-14" : "w-64",
        "w-full md:w-64 z-30 md:z-auto"
      )}
      collapsible="icon"
    >
      <SidebarContent className="p-2 h-full min-h-0" style={{ maxHeight: 'calc(100vh - 4rem)', overflowY: 'auto' }}>
        {getNavigation()}
      </SidebarContent>
    </Sidebar>
  );
};

export default DashboardSidebar;
