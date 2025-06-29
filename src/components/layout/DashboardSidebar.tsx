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
  GraduationCap
} from 'lucide-react';
import { useAuth } from '@/backend/contexts/AuthContext';
import { cn } from '@/frontend/lib/utils';

const DashboardSidebar = () => {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const location = useLocation();
  const { user } = useAuth();
  
  const isPathActive = (path: string) => location.pathname === path;
  const isGroupExpanded = (paths: string[]) => paths.some(path => location.pathname.startsWith(path));
  
  const getLinkClass = ({ isActive }: { isActive: boolean }) => 
    cn("flex items-center py-2 px-3 rounded-md transition-colors", {
      "bg-sidebar-accent text-sidebar-accent-foreground font-medium": isActive,
      "text-sidebar-foreground hover:bg-sidebar-accent/50": !isActive
    });

  return (
    <Sidebar 
      className={cn(
        "border-r bg-sidebar", 
        collapsed ? "w-14" : "w-64"
      )}
      collapsible="icon"
    >
      <SidebarContent>
        {/* Common Navigation for All Users */}
        <SidebarGroup>
          <SidebarGroupLabel>Dashboard</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <NavLink to="/dashboard" className={getLinkClass}>
                    <School className="mr-2 h-4 w-4" />
                    {!collapsed && <span>Dashboard</span>}
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Admin Navigation */}
        {user?.role === 'admin' && (
          <>
            <SidebarGroup>
              <SidebarGroupLabel>Administration</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <NavLink to="/users" className={getLinkClass}>
                        <Users className="mr-2 h-4 w-4" />
                        {!collapsed && <span>Users</span>}
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <NavLink to="/departments" className={getLinkClass}>
                        <Building className="mr-2 h-4 w-4" />
                        {!collapsed && <span>Departments</span>}
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <NavLink to="/staff" className={getLinkClass}>
                        <Users className="mr-2 h-4 w-4" />
                        {!collapsed && <span>Staff</span>}
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </>
        )}
        
        {/* Teacher Navigation */}
        {(user?.role === 'admin' || user?.role === 'teacher') && (
          <SidebarGroup>
            <SidebarGroupLabel>Academic</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <NavLink to="/courses" className={getLinkClass}>
                      <BookOpen className="mr-2 h-4 w-4" />
                      {!collapsed && <span>Courses</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <NavLink to="/students" className={getLinkClass}>
                      <Users className="mr-2 h-4 w-4" />
                      {!collapsed && <span>Students</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <NavLink to="/attendance" className={getLinkClass}>
                      <ClipboardList className="mr-2 h-4 w-4" />
                      {!collapsed && <span>Attendance</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <NavLink to="/calendar" className={getLinkClass}>
                      <Calendar className="mr-2 h-4 w-4" />
                      {!collapsed && <span>Calendar</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}
        
        {/* Finance Navigation */}
        {(user?.role === 'admin') && (
          <SidebarGroup>
            <SidebarGroupLabel>Finance</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <NavLink to="/fees" className={getLinkClass}>
                      <CreditCard className="mr-2 h-4 w-4" />
                      {!collapsed && <span>Fee Management</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <NavLink to="/fee-structure" className={getLinkClass}>
                      <FileText className="mr-2 h-4 w-4" />
                      {!collapsed && <span>Fee Structure</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}
        
        {/* Student Navigation */}
        {user?.role === 'student' && (
          <SidebarGroup>
            <SidebarGroupLabel>My Education</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <NavLink to="/my-courses" className={getLinkClass}>
                      <BookOpen className="mr-2 h-4 w-4" />
                      {!collapsed && <span>My Courses</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <NavLink to="/grades" className={getLinkClass}>
                      <ClipboardList className="mr-2 h-4 w-4" />
                      {!collapsed && <span>Grades</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <NavLink to="/my-fees" className={getLinkClass}>
                      <CreditCard className="mr-2 h-4 w-4" />
                      {!collapsed && <span>Fee Details</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}
        
        {/* Alumni Navigation */}
        {user?.role === 'alumni' && (
          <SidebarGroup>
            <SidebarGroupLabel>Alumni</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <NavLink to="/alumni-profile" className={getLinkClass}>
                      <GraduationCap className="mr-2 h-4 w-4" />
                      {!collapsed && <span>My Profile</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}
        
        {/* Common User Access */}
        <SidebarGroup>
          <SidebarGroupLabel>User</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <NavLink to="/profile" className={getLinkClass}>
                    <User className="mr-2 h-4 w-4" />
                    {!collapsed && <span>Profile</span>}
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <NavLink to="/messages" className={getLinkClass}>
                    <MessageSquare className="mr-2 h-4 w-4" />
                    {!collapsed && <span>Messages</span>}
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <NavLink to="/notifications" className={getLinkClass}>
                    <Bell className="mr-2 h-4 w-4" />
                    {!collapsed && <span>Notifications</span>}
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <NavLink to="/settings" className={getLinkClass}>
                    <Settings className="mr-2 h-4 w-4" />
                    {!collapsed && <span>Settings</span>}
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

export default DashboardSidebar;
