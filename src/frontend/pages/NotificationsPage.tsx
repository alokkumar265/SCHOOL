import React from 'react';
import DashboardLayout from '@/frontend/components/layout/DashboardLayout';
import { useAuth } from '@/backend/contexts/AuthContext';

const NotificationsPage = () => {
  const { user } = useAuth();
  const isStaff = user?.role === 'staff';

  // Mock notifications for staff and teachers
  const staffNotifications = [
    {
      id: 1,
      title: 'Staff Meeting Scheduled',
      content: 'A staff meeting is scheduled for Friday at 3:00 PM in the conference room. Attendance is mandatory.',
      date: '2024-06-25',
      read: false,
    },
    {
      id: 2,
      title: 'HR Policy Update',
      content: 'Please review the updated HR policies sent to your email. Contact HR for any questions.',
      date: '2024-06-24',
      read: true,
    },
    {
      id: 3,
      title: 'Facility Maintenance',
      content: 'The staff lounge will be closed for maintenance on June 28th.',
      date: '2024-06-23',
      read: false,
    },
  ];

  const teacherNotifications = [
    {
      id: 1,
      title: 'Parent-Teacher Meeting Reminder',
      content: 'Don’t forget the parent-teacher meetings scheduled for July 5th and 6th.',
      date: '2024-06-25',
      read: false,
    },
    {
      id: 2,
      title: 'Exam Paper Submission',
      content: 'Submit your exam papers to the exam cell by June 30th.',
      date: '2024-06-24',
      read: true,
    },
  ];

  const notifications = isStaff ? staffNotifications : teacherNotifications;

  return (
    <DashboardLayout>
      <div className="space-y-4">
        <h1 className="text-2xl font-bold tracking-tight">Notifications</h1>
        <p className="text-muted-foreground">View and manage your notifications.</p>
        <div className="bg-white p-6 rounded-lg shadow space-y-4">
          {notifications.length === 0 ? (
            <p>No notifications.</p>
          ) : (
            notifications.map((n) => (
              <div key={n.id} className={`border-l-4 pl-4 py-2 ${n.read ? 'border-gray-300 bg-gray-50' : 'border-blue-500 bg-blue-50'}`}>
                <div className="flex justify-between items-center">
                  <span className="font-semibold">{n.title}</span>
                  <span className="text-xs text-gray-500">{n.date}</span>
                </div>
                <div className="text-gray-700 text-sm">{n.content}</div>
              </div>
            ))
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default NotificationsPage;
