
import React from 'react';
import DashboardLayout from '@/frontend/components/layout/DashboardLayout';

const CoursesPage = () => {
  return (
    <DashboardLayout>
      <div className="space-y-4">
        <h1 className="text-2xl font-bold tracking-tight">Course Management</h1>
        <p className="text-muted-foreground">Manage school courses and curriculum.</p>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <p>Course management content will be displayed here.</p>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default CoursesPage;
