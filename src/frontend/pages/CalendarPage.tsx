
import React from 'react';
import DashboardLayout from '@/frontend/components/layout/DashboardLayout';

const CalendarPage = () => {
  return (
    <DashboardLayout>
      <div className="space-y-4">
        <h1 className="text-2xl font-bold tracking-tight">School Calendar</h1>
        <p className="text-muted-foreground">View and manage academic calendar events.</p>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <p>Calendar content will be displayed here.</p>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default CalendarPage;
