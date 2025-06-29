
import React from 'react';
import DashboardLayout from '@/frontend/components/layout/DashboardLayout';

const NotificationsPage = () => {
  return (
    <DashboardLayout>
      <div className="space-y-4">
        <h1 className="text-2xl font-bold tracking-tight">Notifications</h1>
        <p className="text-muted-foreground">View and manage your notifications.</p>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <p>Notifications content will be displayed here.</p>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default NotificationsPage;
